import { TinaMarkdown } from 'tinacms/dist/rich-text';

export interface HtmlEmbedProps {
  title?:      string | null;
  intro?:      any;
  width?:      string | null;
  heightType?: string | null;
  heightPx?:   number | null;
  html?:       string | null;
  titleField?: string;
  introField?: string;
}

export default function HtmlEmbed({
  title,
  intro,
  width      = 'contained',
  heightType = 'auto',
  heightPx,
  html,
  titleField,
  introField,
}: HtmlEmbedProps) {
  const wrapClass = width === 'full-width' ? 'w-full' : 'max-w-4xl mx-auto';
  const embedStyle: React.CSSProperties =
    heightType === 'fixed' && heightPx ? { height: `${heightPx}px`, overflow: 'hidden' } : {};

  return (
    <section className="py-12 px-4">
      <div className={wrapClass}>
        {title && (
          <h2 className="text-3xl font-bold mb-3" data-tina-field={titleField}>{title}</h2>
        )}
        {intro && (
          <div className="prose text-gray-600 mb-8" data-tina-field={introField}>
            {typeof intro === 'string' ? <p>{intro}</p> : <TinaMarkdown content={intro} />}
          </div>
        )}
        {html && (
          <div style={embedStyle} dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </section>
  );
}
