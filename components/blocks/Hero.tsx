export interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
  titleField?: string;
  subtitleField?: string;
  imageField?: string;
}

export default function Hero({ title, subtitle, image, titleField, subtitleField, imageField }: HeroProps) {
  return (
    <section
      className="relative w-full h-96 flex items-center justify-center"
      style={{ backgroundImage: image ? `url(${image})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
      data-tina-field={imageField}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative text-center text-white z-10 px-4">
        {title && <h1 className="text-5xl font-bold mb-4" data-tina-field={titleField}>{title}</h1>}
        {subtitle && <p className="text-xl" data-tina-field={subtitleField}>{subtitle}</p>}
      </div>
    </section>
  );
}
