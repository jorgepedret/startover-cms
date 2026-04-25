export interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
}

export default function Hero({ title, subtitle, image }: HeroProps) {
  return (
    <section className="relative w-full h-96 flex items-center justify-center"
      style={{ backgroundImage: image ? `url(${image})` : undefined, backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative text-center text-white z-10 px-4">
        {title && <h1 className="text-5xl font-bold mb-4">{title}</h1>}
        {subtitle && <p className="text-xl">{subtitle}</p>}
      </div>
    </section>
  );
}
