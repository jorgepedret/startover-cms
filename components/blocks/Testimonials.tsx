'use client';
import { useState, useEffect } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export interface TestimonialItem {
  quote?:       any;
  authorName?:  string | null;
  authorTitle?: string | null;
  authorPhoto?: string | null;
  companyLogo?: string | null;
  rating?:      number | null;
}

export interface TestimonialsProps {
  layout?:     string | null;
  title?:      string | null;
  intro?:      any;
  items?:      Array<TestimonialItem | null> | null;
  titleField?: string;
  introField?: string;
}

function Stars({ rating }: { rating?: number | null }) {
  if (!rating) return null;
  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} className={`w-4 h-4 ${n <= rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteText({ quote }: { quote: any }) {
  if (!quote) return null;
  return (
    <div className="prose text-gray-700 text-sm leading-relaxed">
      {typeof quote === 'string'
        ? <p>"{quote}"</p>
        : <TinaMarkdown content={quote} />}
    </div>
  );
}

function Author({ item }: { item: TestimonialItem }) {
  return (
    <div className="flex items-center gap-3 mt-4">
      {item.authorPhoto && (
        <img src={item.authorPhoto} alt={item.authorName ?? ''}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        {item.authorName  && <p className="font-semibold text-sm truncate">{item.authorName}</p>}
        {item.authorTitle && <p className="text-xs text-gray-500 truncate">{item.authorTitle}</p>}
      </div>
      {item.companyLogo && (
        <img src={item.companyLogo} alt="Company logo" className="h-6 object-contain opacity-60 flex-shrink-0" />
      )}
    </div>
  );
}

function SectionHeader({ title, intro, titleField, introField }: Pick<TestimonialsProps, 'title' | 'intro' | 'titleField' | 'introField'>) {
  if (!title && !intro) return null;
  return (
    <div className="text-center mb-12">
      {title && <h2 className="text-3xl md:text-4xl font-bold mb-4" data-tina-field={titleField}>{title}</h2>}
      {intro && (
        <div className="prose text-gray-600 mx-auto max-w-2xl" data-tina-field={introField}>
          {typeof intro === 'string' ? <p>{intro}</p> : <TinaMarkdown content={intro} />}
        </div>
      )}
    </div>
  );
}

export default function Testimonials({ layout = 'cards-grid', title, intro, items, titleField, introField }: TestimonialsProps) {
  const valid = items?.filter((t): t is TestimonialItem => !!t) ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance centered carousel
  useEffect(() => {
    if (layout !== 'centered-carousel' || valid.length < 2) return;
    const t = setInterval(() => setActiveIndex(i => (i + 1) % valid.length), 5000);
    return () => clearInterval(t);
  }, [layout, valid.length]);

  // ── Cards grid ──────────────────────────────────────────────────────────────
  if (layout === 'cards-grid') return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <SectionHeader title={title} intro={intro} titleField={titleField} introField={introField} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {valid.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col">
            <Stars rating={item.rating} />
            <QuoteText quote={item.quote} />
            <Author item={item} />
          </div>
        ))}
      </div>
    </section>
  );

  // ── Centered carousel ───────────────────────────────────────────────────────
  if (layout === 'centered-carousel') {
    const item = valid[activeIndex];
    return (
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <SectionHeader title={title} intro={intro} titleField={titleField} introField={introField} />
        {item && (
          <div className="min-h-40 transition-all">
            <Stars rating={item.rating} />
            <QuoteText quote={item.quote} />
            <Author item={item} />
          </div>
        )}
        {valid.length > 1 && (
          <div className="flex gap-2 justify-center mt-8">
            {valid.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? 'bg-gray-900' : 'bg-gray-300'}`} />
            ))}
          </div>
        )}
      </section>
    );
  }

  // ── Horizontal ticker ───────────────────────────────────────────────────────
  if (layout === 'horizontal-ticker') return (
    <section className="py-16 overflow-hidden">
      {(title || intro) && (
        <div className="px-4 max-w-7xl mx-auto mb-12">
          <SectionHeader title={title} intro={intro} titleField={titleField} introField={introField} />
        </div>
      )}
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div style={{ display: 'flex', animation: 'ticker 40s linear infinite', width: 'max-content' }}>
        {[...valid, ...valid].map((item, i) => (
          <div key={i} className="w-80 mx-3 bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex-shrink-0 inline-block align-top">
            <Stars rating={item.rating} />
            <QuoteText quote={item.quote} />
            <Author item={item} />
          </div>
        ))}
      </div>
    </section>
  );

  // ── Stacked (one per row) ───────────────────────────────────────────────────
  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <SectionHeader title={title} intro={intro} titleField={titleField} introField={introField} />
      <div className="space-y-6">
        {valid.map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-6 border-l-4 border-gray-900">
            <Stars rating={item.rating} />
            <QuoteText quote={item.quote} />
            <Author item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
