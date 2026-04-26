import { TinaMarkdown } from 'tinacms/dist/rich-text';

export interface TextSectionProps {
  title?: string;
  body?: any;
  titleField?: string;
  bodyField?: string;
}

export default function TextSection({ title, body, titleField, bodyField }: TextSectionProps) {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      {title && <h2 className="text-3xl font-bold mb-4" data-tina-field={titleField}>{title}</h2>}
      {body && (
        <div className="text-lg text-gray-700 prose prose-lg" data-tina-field={bodyField}>
          {typeof body === 'string'
            ? body.split('\n\n').map((p, i) => <p key={i}>{p.trim()}</p>)
            : <TinaMarkdown content={body} />}
        </div>
      )}
    </section>
  );
}
