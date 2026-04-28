'use client';
import { useState, useEffect } from 'react';

export interface GalleryImage {
  src?:          string | null;
  alt?:          string | null;
  caption?:      string | null;
  titleOverlay?: string | null;
  linkUrl?:      string | null;
}

export interface GalleryProps {
  title?:       string | null;
  displayMode?: string | null;
  columns?:     string | null;
  autoplay?:    boolean | null;
  navigation?:  string | null;
  images?:      Array<GalleryImage | null> | null;
  titleField?:  string;
}

const colMap: Record<string, string> = {
  '2':    'grid-cols-1 sm:grid-cols-2',
  '3':    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4':    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  'auto': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
};

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowLeft')   onPrev();
      if (e.key === 'ArrowRight')  onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  const img = images[index];
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-4 right-5 text-white text-4xl hover:text-gray-300 leading-none z-10">✕</button>
      <button onClick={e => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-gray-300 px-2 z-10">‹</button>
      <div className="max-w-5xl max-h-[90vh] px-16" onClick={e => e.stopPropagation()}>
        <img src={img.src!} alt={img.alt ?? ''} className="max-h-[80vh] max-w-full object-contain mx-auto rounded-lg" />
        {img.caption && <p className="text-white/70 text-center mt-3 text-sm">{img.caption}</p>}
      </div>
      <button onClick={e => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:text-gray-300 px-2 z-10">›</button>
    </div>
  );
}

// ── Image tile ────────────────────────────────────────────────────────────────
function Tile({ img, onClick, masonry }: { img: GalleryImage; onClick: () => void; masonry?: boolean }) {
  return (
    <div
      className={`relative group overflow-hidden rounded-xl cursor-pointer ${masonry ? 'mb-4 break-inside-avoid' : 'aspect-square'}`}
      onClick={onClick}
    >
      <img src={img.src!} alt={img.alt ?? ''}
        className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${masonry ? '' : 'h-full'}`} />
      {img.titleOverlay && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end p-3 opacity-0 group-hover:opacity-100">
          <span className="text-white font-medium text-sm">{img.titleOverlay}</span>
        </div>
      )}
    </div>
  );
}

export default function Gallery({
  title,
  displayMode = 'grid',
  columns     = 'auto',
  autoplay    = false,
  navigation  = 'both',
  images,
  titleField,
}: GalleryProps) {
  const valid  = images?.filter((img): img is GalleryImage => !!img?.src) ?? [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prev = () => setLightboxIndex(i => i !== null ? (i - 1 + valid.length) % valid.length : null);
  const next = () => setLightboxIndex(i => i !== null ? (i + 1) % valid.length : null);

  // Carousel autoplay
  useEffect(() => {
    if (displayMode !== 'carousel' || !autoplay || valid.length < 2) return;
    const t = setInterval(() => setCarouselIndex(i => (i + 1) % valid.length), 4000);
    return () => clearInterval(t);
  }, [displayMode, autoplay, valid.length]);

  const gridClass = colMap[columns ?? 'auto'] ?? colMap['auto'];
  const showArrows = navigation === 'arrows' || navigation === 'both';
  const showDots   = navigation === 'dots'   || navigation === 'both';

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {title && (
        <h2 className="text-3xl font-bold text-center mb-10" data-tina-field={titleField}>{title}</h2>
      )}

      {/* Grid */}
      {displayMode === 'grid' && (
        <div className={`grid gap-4 ${gridClass}`}>
          {valid.map((img, i) => <Tile key={i} img={img} onClick={() => setLightboxIndex(i)} />)}
        </div>
      )}

      {/* Masonry */}
      {displayMode === 'masonry' && (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {valid.map((img, i) => <Tile key={i} img={img} onClick={() => setLightboxIndex(i)} masonry />)}
        </div>
      )}

      {/* Carousel */}
      {displayMode === 'carousel' && (
        <div className="relative overflow-hidden rounded-2xl">
          <div className="aspect-video relative cursor-pointer" onClick={() => setLightboxIndex(carouselIndex)}>
            {valid.map((img, i) => (
              <img key={i} src={img.src!} alt={img.alt ?? ''}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === carouselIndex ? 'opacity-100' : 'opacity-0'}`} />
            ))}
            {valid[carouselIndex]?.titleOverlay && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <span className="text-white font-semibold">{valid[carouselIndex].titleOverlay}</span>
              </div>
            )}
          </div>
          {showArrows && (
            <>
              <button onClick={() => setCarouselIndex(i => (i - 1 + valid.length) % valid.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-2xl transition-colors">‹</button>
              <button onClick={() => setCarouselIndex(i => (i + 1) % valid.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-2xl transition-colors">›</button>
            </>
          )}
          {showDots && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {valid.map((_, i) => (
                <button key={i} onClick={() => setCarouselIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === carouselIndex ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </div>
          )}
          {valid[carouselIndex]?.caption && (
            <p className="text-center text-sm text-gray-500 mt-3">{valid[carouselIndex].caption}</p>
          )}
        </div>
      )}

      {/* Lightbox-only */}
      {displayMode === 'lightbox' && (
        <div className={`grid gap-4 ${gridClass}`}>
          {valid.map((img, i) => (
            <div key={i} className="relative group overflow-hidden rounded-xl cursor-pointer aspect-square"
              onClick={() => setLightboxIndex(i)}>
              <img src={img.src!} alt={img.alt ?? ''} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity">⊕</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox modal — active across all display modes */}
      {lightboxIndex !== null && (
        <Lightbox
          images={valid}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
