export interface VideoBlockProps {
  title?: string;
  videoUrl?: string;
}

export default function VideoBlock({ title, videoUrl }: VideoBlockProps) {
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube')) {
      const id = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes('vimeo')) {
      const id = url.split('/').pop();
      return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  };

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}
      {videoUrl && (
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <iframe
            src={getEmbedUrl(videoUrl)}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )}
    </section>
  );
}
