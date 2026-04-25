export interface FullWidthImageProps {
  title?: string;
  image?: string;
  titleField?: string;
  imageField?: string;
}

export default function FullWidthImage({ title, image, titleField, imageField }: FullWidthImageProps) {
  return (
    <section
      className="relative w-full h-80 flex items-center justify-center"
      style={{ backgroundImage: image ? `url(${image})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
      data-tina-field={imageField}
    >
      <div className="absolute inset-0 bg-black/30" />
      {title && (
        <div className="relative z-10 text-center text-white">
          <h2 className="text-4xl font-bold" data-tina-field={titleField}>{title}</h2>
        </div>
      )}
    </section>
  );
}
