'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTina, tinaField } from 'tinacms/dist/react';
import { client } from '@/tina/__generated__/client';
import { useIsEditor } from '@/hooks/useIsEditor';
import Hero from '@/components/blocks/Hero';
import TextSection from '@/components/blocks/TextSection';
import Gallery from '@/components/blocks/Gallery';
import BigMedia from '@/components/blocks/BigMedia';
import FullWidthImage from '@/components/blocks/FullWidthImage';
import VideoBlock from '@/components/blocks/VideoBlock';
import NavBar from '@/components/blocks/NavBar';

type SiteQueryResult = Awaited<ReturnType<typeof client.queries.site>>;
type AnyBlock = { blockId?: string | null; showInNav?: boolean | null; navLabel?: string | null; title?: string | null };

function toId(block: AnyBlock, i: number): string {
  if (block.blockId) return block.blockId;
  if (block.title) return block.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `block-${i}`;
}

function buildNavItems(blocks: (AnyBlock | null)[]): { label: string; target: string }[] {
  return blocks.flatMap((block, i) => {
    if (!block || !block.showInNav) return [];
    return [{ label: block.navLabel || block.title || `Section ${i + 1}`, target: toId(block, i) }];
  });
}

function SiteContent({ result, slug }: { result: SiteQueryResult; slug: string }) {
  const { data } = useTina(result);
  const site = data.site;
  const navItems = buildNavItems((site.blocks ?? []) as AnyBlock[]);
  const isEditor = useIsEditor();

  return (
    <div className="min-h-screen bg-white">
      {isEditor && (
        <a
          href={`/admin/index.html#/~/${slug}`}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit page
        </a>
      )}
      <NavBar items={navItems} />
      <main>
        {site.blocks?.map((block, i) => {
          if (!block) return null;
          const id = toId(block as AnyBlock, i);

          switch (block.__typename) {
            case 'SiteBlocksHero':
              return (
                <div key={i} id={id} data-tina-field={tinaField(block)}>
                  <Hero title={block.title ?? ''} subtitle={block.subtitle ?? ''} image={block.image ?? ''}
                    titleField={tinaField(block, 'title')}
                    subtitleField={tinaField(block, 'subtitle')}
                    imageField={tinaField(block, 'image')} />
                </div>
              );
            case 'SiteBlocksTextSection':
              return (
                <div key={i} id={id} data-tina-field={tinaField(block)}>
                  <TextSection title={block.title ?? ''} body={block.body}
                    titleField={tinaField(block, 'title')}
                    bodyField={tinaField(block, 'body')} />
                </div>
              );
            case 'SiteBlocksGallery':
              return (
                <div key={i} id={id} data-tina-field={tinaField(block)}>
                  <Gallery title={block.title ?? ''} images={block.images?.map(img => ({ src: img?.src ?? '', alt: img?.alt ?? '' })) ?? []}
                    titleField={tinaField(block, 'title')} />
                </div>
              );
            case 'SiteBlocksBigMedia':
              return (
                <div key={i} id={id} data-tina-field={tinaField(block)}>
                  <BigMedia title={block.title ?? ''} image={block.image ?? ''} layout={block.layout ?? 'center'}
                    titleField={tinaField(block, 'title')}
                    imageField={tinaField(block, 'image')} />
                </div>
              );
            case 'SiteBlocksFullWidthImage':
              return (
                <div key={i} id={id} data-tina-field={tinaField(block)}>
                  <FullWidthImage title={block.title ?? ''} image={block.image ?? ''}
                    titleField={tinaField(block, 'title')}
                    imageField={tinaField(block, 'image')} />
                </div>
              );
            case 'SiteBlocksVideoBlock':
              return (
                <div key={i} id={id} data-tina-field={tinaField(block)}>
                  <VideoBlock title={block.title ?? ''} videoUrl={block.videoUrl ?? ''}
                    titleField={tinaField(block, 'title')}
                    videoUrlField={tinaField(block, 'videoUrl')} />
                </div>
              );
            default:
              return null;
          }
        })}
      </main>
    </div>
  );
}

export default function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [result, setResult] = useState<SiteQueryResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    client.queries.site({ relativePath: `${slug}.md` })
      .then(setResult)
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Site Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">← Back to sites</Link>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading…</p>
      </div>
    );
  }

  return <SiteContent result={result} slug={slug} />;
}
