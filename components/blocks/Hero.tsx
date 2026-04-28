'use client';

function getEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&mute=1&loop=1&controls=0&playlist=${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&muted=1&loop=1&background=1`;
  return '';
}

const heightMap: Record<string, string> = {
  '100vh': 'min-h-screen',
  '75vh':  'min-h-[75vh]',
  '50vh':  'min-h-[50vh]',
};

export interface ButtonShape { label?: string | null; url?: string | null }

export interface HeroProps {
  layout?:          string | null;
  height?:          string | null;
  backgroundType?:  string | null;
  image?:           string | null;
  videoUrl?:        string | null;
  backgroundColor?: string | null;
  overlayColor?:    string | null;
  overlayOpacity?:  number | null;
  title?:           string | null;
  subtitle?:        string | null;
  primaryButton?:   ButtonShape | null;
  secondaryButton?: ButtonShape | null;
  // tina field refs
  titleField?:    string;
  subtitleField?: string;
  imageField?:    string;
}

export default function Hero({
  layout          = 'centered',
  height          = '100vh',
  backgroundType  = 'image',
  image,
  videoUrl,
  backgroundColor,
  overlayColor    = '#000000',
  overlayOpacity  = 40,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  titleField,
  subtitleField,
  imageField,
}: HeroProps) {
  const heightClass = heightMap[height ?? '100vh'] ?? 'min-h-screen';
  const isSplit     = layout === 'split-left' || layout === 'split-right';
  const isMinimal   = layout === 'minimal';
  const embedUrl    = backgroundType === 'video' && videoUrl ? getEmbedUrl(videoUrl) : '';

  const bgStyle: React.CSSProperties =
    backgroundType === 'image' && image
      ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : backgroundType === 'color' && backgroundColor
        ? { backgroundColor }
        : {};

  const overlayStyle: React.CSSProperties = {
    backgroundColor: overlayColor ?? '#000',
    opacity: ((overlayOpacity ?? 0) / 100),
  };

  const Buttons = () => (
    <div className="flex flex-wrap gap-4 mt-2">
      {primaryButton?.label && (
        <a href={primaryButton.url ?? '#'}
          className={`inline-block px-8 py-3 font-semibold rounded-lg transition-colors
            ${isMinimal ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100'}`}>
          {primaryButton.label}
        </a>
      )}
      {secondaryButton?.label && (
        <a href={secondaryButton.url ?? '#'}
          className={`inline-block px-8 py-3 border-2 font-semibold rounded-lg transition-colors
            ${isMinimal ? 'border-gray-900 text-gray-900 hover:bg-gray-100' : 'border-white text-white hover:bg-white/10'}`}>
          {secondaryButton.label}
        </a>
      )}
    </div>
  );

  // ── Split layout ────────────────────────────────────────────────────────────
  if (isSplit) {
    const imageRight = layout === 'split-left'; // text left → image right
    return (
      <section className={`relative flex ${heightClass} overflow-hidden`} style={bgStyle} data-tina-field={imageField}>
        {backgroundType === 'video' && embedUrl && (
          <iframe src={embedUrl} className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ border: 0 }} allow="autoplay" />
        )}
        <div className="absolute inset-0" style={overlayStyle} />
        <div className={`relative z-10 flex w-full flex-col md:flex-row ${imageRight ? '' : 'md:flex-row-reverse'}`}>
          {/* Text side */}
          <div className="flex flex-1 items-center px-10 py-16">
            <div className="max-w-xl text-white">
              {title && <h1 className="text-4xl md:text-5xl font-bold mb-4" data-tina-field={titleField}>{title}</h1>}
              {subtitle && <p className="text-lg md:text-xl opacity-90 mb-6" data-tina-field={subtitleField}>{subtitle}</p>}
              <Buttons />
            </div>
          </div>
          {/* Image side (only in split + image background) */}
          {backgroundType === 'image' && image && (
            <div className="flex-1 relative overflow-hidden min-h-64">
              <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          )}
        </div>
      </section>
    );
  }

  // ── Centered / Minimal ──────────────────────────────────────────────────────
  return (
    <section
      className={`relative flex items-center justify-center ${heightClass} overflow-hidden`}
      style={bgStyle}
      data-tina-field={imageField}
    >
      {backgroundType === 'video' && embedUrl && (
        <iframe src={embedUrl} className="absolute inset-0 w-full h-full pointer-events-none scale-150"
          style={{ border: 0 }} allow="autoplay" />
      )}
      {(backgroundType === 'image' || backgroundType === 'video') && (
        <div className="absolute inset-0" style={overlayStyle} />
      )}
      <div className={`relative z-10 text-center px-6 ${isMinimal ? 'text-gray-900' : 'text-white'}`}>
        {title && (
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight" data-tina-field={titleField}>
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto" data-tina-field={subtitleField}>
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          <Buttons />
        </div>
      </div>
    </section>
  );
}
