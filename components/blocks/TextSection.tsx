import { TinaMarkdown } from 'tinacms/dist/rich-text';

export interface ButtonShape { label?: string | null; url?: string | null }
export interface ImageShape  { src?: string | null; alt?: string | null }

export interface TextSectionProps {
  layout?:          string | null;
  title?:           string | null;
  subtitle?:        string | null;
  body?:            any;
  images?:          Array<ImageShape | null> | null;
  primaryButton?:   ButtonShape | null;
  secondaryButton?: ButtonShape | null;
  titleField?:      string;
  subtitleField?:   string;
  bodyField?:       string;
}

function RichBody({ body, bodyField }: { body: any; bodyField?: string }) {
  return (
    <div className="prose prose-lg text-gray-700 mb-6" data-tina-field={bodyField}>
      {typeof body === 'string'
        ? body.split('\n\n').map((p: string, i: number) => <p key={i}>{p.trim()}</p>)
        : <TinaMarkdown content={body} />}
    </div>
  );
}

function Buttons({ primary, secondary }: { primary?: ButtonShape | null; secondary?: ButtonShape | null }) {
  if (!primary?.label && !secondary?.label) return null;
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {primary?.label && (
        <a href={primary.url ?? '#'}
          className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
          {primary.label}
        </a>
      )}
      {secondary?.label && (
        <a href={secondary.url ?? '#'}
          className="inline-block px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
          {secondary.label}
        </a>
      )}
    </div>
  );
}

function ImageGrid({ images }: { images: Array<ImageShape | null> }) {
  const valid = images.filter((i): i is ImageShape => !!i?.src);
  if (!valid.length) return null;
  return (
    <div className={`grid gap-4 ${valid.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {valid.map((img, i) => (
        <img key={i} src={img.src!} alt={img.alt ?? ''} className="w-full rounded-xl object-cover aspect-video" />
      ))}
    </div>
  );
}

export default function TextSection({
  layout         = 'centered',
  title, subtitle, body, images,
  primaryButton, secondaryButton,
  titleField, subtitleField, bodyField,
}: TextSectionProps) {
  const hasImages = !!images?.some(i => i?.src);

  // ── Split layouts ───────────────────────────────────────────────────────────
  if (layout === 'text-left' || layout === 'text-right') {
    const textFirst = layout === 'text-left';
    return (
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className={`flex flex-col md:flex-row gap-12 items-center ${textFirst ? '' : 'md:flex-row-reverse'}`}>
          <div className="flex-1">
            {title    && <h2 className="text-3xl md:text-4xl font-bold mb-3" data-tina-field={titleField}>{title}</h2>}
            {subtitle && <p className="text-lg text-gray-500 mb-4" data-tina-field={subtitleField}>{subtitle}</p>}
            {body     && <RichBody body={body} bodyField={bodyField} />}
            <Buttons primary={primaryButton} secondary={secondaryButton} />
          </div>
          {hasImages && (
            <div className="flex-1">
              <ImageGrid images={images!} />
            </div>
          )}
        </div>
      </section>
    );
  }

  // ── Centered ────────────────────────────────────────────────────────────────
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto text-center">
      {title    && <h2 className="text-3xl md:text-4xl font-bold mb-3" data-tina-field={titleField}>{title}</h2>}
      {subtitle && <p className="text-lg text-gray-500 mb-4" data-tina-field={subtitleField}>{subtitle}</p>}
      {body     && <RichBody body={body} bodyField={bodyField} />}
      {hasImages && <div className="mt-8"><ImageGrid images={images!} /></div>}
      <Buttons primary={primaryButton} secondary={secondaryButton} />
    </section>
  );
}
