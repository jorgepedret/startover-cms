'use client';
import { useEffect, useRef, useState } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export interface StatItem {
  number?:    string | null;
  label?:     string | null;
  mediaType?: string | null;
  icon?:      string | null;
  image?:     string | null;
}

export interface StatsProps {
  layout?:     string | null;
  columns?:    string | null;
  title?:      string | null;
  intro?:      any;
  items?:      Array<StatItem | null> | null;
  titleField?: string;
  introField?: string;
}

// Parses "500+" → { prefix: '', num: 500, suffix: '+' }
function parse(val: string) {
  const m = val.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], num: parseFloat(m[2]), suffix: m[3] };
}

function StatCard({ item }: { item: StatItem }) {
  const ref    = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [disp, setDisp] = useState('0');

  // Trigger count-up when card enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLive(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    const raw = item.number ?? '0';
    const parsed = parse(raw);
    if (!parsed) { setDisp(raw); return; }
    const { prefix, num, suffix } = parsed;
    const duration = 1600;
    const start    = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);        // ease-out cubic
      setDisp(`${prefix}${Math.round(eased * num)}${suffix}`);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [live, item.number]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-4 py-8">
      {item.mediaType === 'icon'  && item.icon  && <div className="text-4xl mb-3 leading-none">{item.icon}</div>}
      {item.mediaType === 'image' && item.image && <img src={item.image} alt={item.label ?? ''} className="w-12 h-12 object-cover rounded-lg mb-3" />}
      <div className="text-4xl md:text-5xl font-bold tabular-nums mb-2">{disp}</div>
      {item.label && <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">{item.label}</p>}
    </div>
  );
}

const colMap: Record<string, string> = {
  '2':    'grid-cols-2',
  '3':    'grid-cols-1 sm:grid-cols-3',
  '4':    'grid-cols-2 lg:grid-cols-4',
  'auto': 'grid-cols-2 md:grid-cols-4',
};

export default function Stats({ layout = 'row', columns = 'auto', title, intro, items, titleField, introField }: StatsProps) {
  const valid      = items?.filter((s): s is StatItem => !!s) ?? [];
  const gridClass  = colMap[columns ?? 'auto'] ?? colMap['auto'];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      {title && (
        <h2 className="text-3xl font-bold text-center mb-4" data-tina-field={titleField}>{title}</h2>
      )}
      {intro && (
        <div className="prose text-gray-600 text-center mx-auto mb-10 max-w-2xl" data-tina-field={introField}>
          {typeof intro === 'string' ? <p>{intro}</p> : <TinaMarkdown content={intro} />}
        </div>
      )}
      <div className={`grid ${gridClass} divide-x divide-gray-100`}>
        {valid.map((item, i) => <StatCard key={i} item={item} />)}
      </div>
    </section>
  );
}
