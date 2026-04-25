export interface TextSectionProps {
  title?: string;
  body?: string;
}

export default function TextSection({ title, body }: TextSectionProps) {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
      {body && <div className="text-lg text-gray-700 prose prose-lg" dangerouslySetInnerHTML={{ __html: body }} />}
    </section>
  );
}
