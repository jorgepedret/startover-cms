import { TinaMarkdown } from 'tinacms/dist/rich-text';

export interface FeatureItem {
  mediaType?:   string | null;
  icon?:        string | null;
  image?:       string | null;
  title?:       string | null;
  description?: string | null;
}

export interface FeatureListProps {
  layout?:     string | null;
  title?:      string | null;
  intro?:      any;
  items?:      Array<FeatureItem | null> | null;
  titleField?: string;
  introField?: string;
}

function ItemMedia({ item }: { item: FeatureItem }) {
  if (item.mediaType === 'image' && item.image)
    return <img src={item.image} alt={item.title ?? ''} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />;
  if (item.mediaType === 'icon' && item.icon)
    return <span className="text-3xl leading-none flex-shrink-0 w-10 text-center">{item.icon}</span>;
  return null;
}

export default function FeatureList({ layout = 'vertical', title, intro, items, titleField, introField }: FeatureListProps) {
  const valid = items?.filter((i): i is FeatureItem => !!i) ?? [];

  const Header = () => (
    <>
      {title && <h2 className="text-3xl font-bold mb-4" data-tina-field={titleField}>{title}</h2>}
      {intro && (
        <div className="prose prose-lg text-gray-600 mb-10" data-tina-field={introField}>
          {typeof intro === 'string' ? <p>{intro}</p> : <TinaMarkdown content={intro} />}
        </div>
      )}
    </>
  );

  // ── Horizontal ─────────────────────────────────────────────────────────────
  if (layout === 'horizontal') return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <Header />
      <div className="space-y-4">
        {valid.map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl">
            <ItemMedia item={item} />
            <div>
              {item.title       && <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>}
              {item.description && <p className="text-gray-600 mt-1 text-sm">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // ── Two-column checklist ───────────────────────────────────────────────────
  if (layout === 'two-column-checklist') return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {valid.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              {item.title       && <h3 className="font-semibold">{item.title}</h3>}
              {item.description && <p className="text-gray-600 text-sm mt-0.5">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // ── Numbered ───────────────────────────────────────────────────────────────
  if (layout === 'numbered') return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <Header />
      <div className="space-y-8">
        {valid.map((item, i) => (
          <div key={i} className="flex items-start gap-6">
            <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
              {i + 1}
            </div>
            <div className="pt-1">
              {item.title       && <h3 className="font-semibold text-lg">{item.title}</h3>}
              {item.description && <p className="text-gray-600 mt-1">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // ── Vertical stacked (default) ─────────────────────────────────────────────
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {valid.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-3">
            <ItemMedia item={item} />
            {item.title       && <h3 className="font-semibold text-lg">{item.title}</h3>}
            {item.description && <p className="text-gray-600 text-sm">{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
