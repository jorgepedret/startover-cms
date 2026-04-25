export interface GalleryProps {
  title?: string;
  images?: Array<{ src?: string; alt?: string }>;
}

export default function Gallery({ title, images }: GalleryProps) {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images?.map((img, i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-lg">
            {img?.src && <img src={img.src} alt={img.alt || ''} className="w-full h-full object-cover" />}
          </div>
        ))}
      </div>
    </section>
  );
}
