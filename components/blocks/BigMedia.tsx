function getEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&mute=1&loop=1&controls=0&playlist=${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&muted=1&loop=1&background=1`;
  return '';
}

export interface ButtonShape { label?: string | null; url?: string | null }

export interface BigMediaProps {
  mediaType?:       string | null;
  image?:           string | null;
  videoUrl?:        string | null;
  backgroundColor?: string | null;
  height?:          string | null;
  heightPx?:        number | null;
  overlayColor?:    string | null;
  overlayOpacity?:  number | null;
  title?:           string | null;
  subtitle?:        string | null;
  primaryButton?:   ButtonShape | null;
  secondaryButton?: ButtonShape | null;
  titleField?:      string;
  imageField?:      string;
}

export default function BigMedia({
  mediaType       = 'image',
  image,
  videoUrl,
  backgroundColor,
  height          = 'natural',
  heightPx,
  overlayColor    = '#000000',
  overlayOpacity  = 0,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  titleField,
  imageField,
}: BigMediaProps) {
  const embedUrl = mediaType === 'video' && videoUrl ? getEmbedUrl(videoUrl) : '';
  const hasText  = !!(title || subtitle || primaryButton?.label || secondaryButton?.label);

  const heightStyle: React.CSSProperties =
    height === 'fixed' && heightPx   ? { height: `${heightPx}px` } :
    height === '100vh'               ? { minHeight: '100vh' } :
    height === '75vh'                ? { minHeight: '75vh' } :
    height === '50vh'                ? { minHeight: '50vh' } :
    {};                               // natural → no height constraint

  const bgStyle: React.CSSProperties =
    mediaType === 'color' ? { backgroundColor: backgroundColor ?? '#f3f4f6' } : {};

  const isConstrained = height !== 'natural';

  return (
    <section
      className={`relative w-full overflow-hidden ${isConstrained ? 'flex items-center justify-center' : ''}`}
      style={{ ...heightStyle, ...bgStyle }}
      data-tina-field={imageField}
    >
      {/* Media layer */}
      {mediaType === 'image' && image && (
        isConstrained
          ? <img src={image} alt={title ?? ''} className="absolute inset-0 w-full h-full object-cover" />
          : <img src={image} alt={title ?? ''} className="w-full block" />
      )}
      {mediaType === 'video' && embedUrl && (
        <iframe src={embedUrl}
          className="absolute inset-0 w-full h-full pointer-events-none scale-150"
          style={{ border: 0 }} allow="autoplay" />
      )}

      {/* Colour overlay */}
      {(mediaType === 'image' || mediaType === 'video') && (overlayOpacity ?? 0) > 0 && (
        <div className="absolute inset-0"
          style={{ backgroundColor: overlayColor ?? '#000', opacity: (overlayOpacity ?? 0) / 100 }} />
      )}

      {/* Text overlay — only rendered when content exists */}
      {hasText && (
        <div className={`${isConstrained ? 'relative' : 'absolute inset-0 flex items-center justify-center'} z-10`}>
          <div className="text-center text-white px-6 py-12">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-md"
                data-tina-field={titleField}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto drop-shadow">
                {subtitle}
              </p>
            )}
            {(primaryButton?.label || secondaryButton?.label) && (
              <div className="flex flex-wrap gap-4 justify-center">
                {primaryButton?.label && (
                  <a href={primaryButton.url ?? '#'}
                    className="inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    {primaryButton.label}
                  </a>
                )}
                {secondaryButton?.label && (
                  <a href={secondaryButton.url ?? '#'}
                    className="inline-block px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                    {secondaryButton.label}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
