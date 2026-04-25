export interface BigMediaProps {
  title?: string;
  image?: string;
  layout?: string;
  titleField?: string;
  imageField?: string;
}

export default function BigMedia({ title, image, layout = 'center', titleField, imageField }: BigMediaProps) {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      {title && <h2 className="text-3xl font-bold mb-8 text-center" data-tina-field={titleField}>{title}</h2>}
      {image && (
        <div className="w-full h-96 rounded-lg overflow-hidden" data-tina-field={imageField}>
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
    </section>
  );
}
