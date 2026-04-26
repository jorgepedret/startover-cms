'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useIsEditor } from '@/hooks/useIsEditor';

interface SiteItem {
  title: string;
  slug: string;
}

export default function HomeContent({
  title,
  subtitle,
  sites,
}: {
  title: string;
  subtitle: string;
  sites: SiteItem[];
}) {
  const [query, setQuery] = useState('');
  const isEditor = useIsEditor();

  const filtered = sites.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.slug.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {isEditor && (
        <a
          href="/admin/index.html#/~/"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit page
        </a>
      )}

      <header className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">{title}</h1>
          <p className="text-slate-500 mb-6">{subtitle}</p>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sites…"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {filtered.length === 0 && sites.length > 0 && (
          <p className="text-slate-400 text-sm">No sites match &ldquo;{query}&rdquo;</p>
        )}
        <ul className="divide-y divide-slate-200 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {filtered.map((site) => (
            <li key={site.slug}>
              <Link
                href={`/${site.slug}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors group"
              >
                <span className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                  {site.title}
                </span>
                <span className="text-slate-400 text-sm font-mono">/{site.slug}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
