export interface CardButton { label?: string | null; url?: string | null }

export interface CardItem {
  mediaType?:   string | null;
  icon?:        string | null;
  image?:       string | null;
  title?:       string | null;
  titleLink?:   string | null;
  description?: string | null;
  button?:      CardButton | null;
}

export interface InfoBoxesProps {
  title?:      string | null;
  columns?:    string | null;
  cards?:      Array<CardItem | null> | null;
  titleField?: string;
}

const colMap: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export default function InfoBoxes({ title, columns = '3', cards, titleField }: InfoBoxesProps) {
  const gridClass = colMap[columns ?? '3'] ?? colMap['3'];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-tina-field={titleField}>
          {title}
        </h2>
      )}
      <div className={`grid gap-8 ${gridClass}`}>
        {cards?.map((card, i) => {
          if (!card) return null;
          return (
            <div key={i} className="flex flex-col p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              {card.mediaType === 'image' && card.image && (
                <img src={card.image} alt={card.title ?? ''} className="w-full h-48 object-cover rounded-lg mb-5" />
              )}
              {card.mediaType === 'icon' && card.icon && (
                <div className="text-4xl mb-4 leading-none">{card.icon}</div>
              )}
              {card.title && (
                <h3 className="text-xl font-semibold mb-2">
                  {card.titleLink
                    ? <a href={card.titleLink} className="hover:underline">{card.title}</a>
                    : card.title}
                </h3>
              )}
              {card.description && (
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{card.description}</p>
              )}
              {card.button?.label && (
                <a href={card.button.url ?? '#'}
                  className="mt-5 self-start inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                  {card.button.label}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
