'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTina, tinaField } from 'tinacms/dist/react';
import { client } from '@/tina/__generated__/client';
import { useIsEditor } from '@/hooks/useIsEditor';

import NavBar       from '@/components/blocks/NavBar';
import Hero         from '@/components/blocks/Hero';
import TextSection  from '@/components/blocks/TextSection';
import InfoBoxes    from '@/components/blocks/InfoBoxes';
import FeatureList  from '@/components/blocks/FeatureList';
import Gallery      from '@/components/blocks/Gallery';
import BigMedia     from '@/components/blocks/BigMedia';
import Testimonials from '@/components/blocks/Testimonials';
import SignupForm   from '@/components/blocks/SignupForm';
import Stats        from '@/components/blocks/Stats';
import HtmlEmbed    from '@/components/blocks/HtmlEmbed';
import ContactForm  from '@/components/blocks/ContactForm';

type SiteQueryResult = Awaited<ReturnType<typeof client.queries.site>>;

// Minimal shape used only for nav-building — all blocks have these fields
type AnyBlock = {
  blockId?:    string | null;
  showInNav?:  boolean | null;
  navLabel?:   string | null;
  title?:      string | null;
};

function toId(block: AnyBlock, i: number): string {
  if (block.blockId) return block.blockId;
  if (block.title)   return block.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `block-${i}`;
}

function buildNavItems(blocks: (AnyBlock | null)[]): { label: string; target: string }[] {
  return blocks.flatMap((block, i) => {
    if (!block?.showInNav) return [];
    return [{ label: block.navLabel || block.title || `Section ${i + 1}`, target: toId(block, i) }];
  });
}

function SiteContent({ result, slug }: { result: SiteQueryResult; slug: string }) {
  const { data } = useTina(result);
  const site     = data.site;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blocks   = (site.blocks ?? []) as any[];
  const navItems = buildNavItems(blocks as AnyBlock[]);
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
        {blocks.map((block, i) => {
          if (!block) return null;
          const id = toId(block as AnyBlock, i);
          const wrap = (children: React.ReactNode) => (
            <div key={i} id={id} data-tina-field={tinaField(block)}>{children}</div>
          );

          switch (block.__typename) {

            case 'SiteBlocksHero':
              return wrap(
                <Hero
                  layout={block.layout}
                  height={block.height}
                  backgroundType={block.backgroundType}
                  image={block.image}
                  videoUrl={block.videoUrl}
                  backgroundColor={block.backgroundColor}
                  overlayColor={block.overlayColor}
                  overlayOpacity={block.overlayOpacity}
                  title={block.title}
                  subtitle={block.subtitle}
                  primaryButton={block.primaryButton}
                  secondaryButton={block.secondaryButton}
                  titleField={tinaField(block, 'title')}
                  subtitleField={tinaField(block, 'subtitle')}
                  imageField={tinaField(block, 'image')}
                />
              );

            case 'SiteBlocksTextSection':
              return wrap(
                <TextSection
                  layout={block.layout}
                  title={block.title}
                  subtitle={block.subtitle}
                  body={block.body}
                  images={block.images}
                  primaryButton={block.primaryButton}
                  secondaryButton={block.secondaryButton}
                  titleField={tinaField(block, 'title')}
                  subtitleField={tinaField(block, 'subtitle')}
                  bodyField={tinaField(block, 'body')}
                />
              );

            case 'SiteBlocksInfoBoxes':
              return wrap(
                <InfoBoxes
                  title={block.title}
                  columns={block.columns}
                  cards={block.cards}
                  titleField={tinaField(block, 'title')}
                />
              );

            case 'SiteBlocksFeatureList':
              return wrap(
                <FeatureList
                  layout={block.layout}
                  title={block.title}
                  intro={block.intro}
                  items={block.items}
                  titleField={tinaField(block, 'title')}
                  introField={tinaField(block, 'intro')}
                />
              );

            case 'SiteBlocksGallery':
              return wrap(
                <Gallery
                  title={block.title}
                  displayMode={block.displayMode}
                  columns={block.columns}
                  autoplay={block.autoplay}
                  navigation={block.navigation}
                  images={block.images}
                  titleField={tinaField(block, 'title')}
                />
              );

            case 'SiteBlocksBigMedia':
              return wrap(
                <BigMedia
                  mediaType={block.mediaType}
                  image={block.image}
                  videoUrl={block.videoUrl}
                  backgroundColor={block.backgroundColor}
                  height={block.height}
                  heightPx={block.heightPx}
                  overlayColor={block.overlayColor}
                  overlayOpacity={block.overlayOpacity}
                  title={block.title}
                  subtitle={block.subtitle}
                  primaryButton={block.primaryButton}
                  secondaryButton={block.secondaryButton}
                  titleField={tinaField(block, 'title')}
                  imageField={tinaField(block, 'image')}
                />
              );

            case 'SiteBlocksTestimonials':
              return wrap(
                <Testimonials
                  layout={block.layout}
                  title={block.title}
                  intro={block.intro}
                  items={block.items}
                  titleField={tinaField(block, 'title')}
                  introField={tinaField(block, 'intro')}
                />
              );

            case 'SiteBlocksSignupForm':
              return wrap(
                <SignupForm
                  title={block.title}
                  intro={block.intro}
                  showNameField={block.showNameField}
                  nameFieldLabel={block.nameFieldLabel}
                  emailFieldLabel={block.emailFieldLabel}
                  submitLabel={block.submitLabel}
                  submitColor={block.submitColor}
                  submitStyle={block.submitStyle}
                  successAction={block.successAction}
                  successMessage={block.successMessage}
                  redirectUrl={block.redirectUrl}
                  titleField={tinaField(block, 'title')}
                  introField={tinaField(block, 'intro')}
                />
              );

            case 'SiteBlocksStats':
              return wrap(
                <Stats
                  layout={block.layout}
                  columns={block.columns}
                  title={block.title}
                  intro={block.intro}
                  items={block.items}
                  titleField={tinaField(block, 'title')}
                  introField={tinaField(block, 'intro')}
                />
              );

            case 'SiteBlocksHtmlEmbed':
              return wrap(
                <HtmlEmbed
                  title={block.title}
                  intro={block.intro}
                  width={block.width}
                  heightType={block.heightType}
                  heightPx={block.heightPx}
                  html={block.html}
                  titleField={tinaField(block, 'title')}
                  introField={tinaField(block, 'intro')}
                />
              );

            case 'SiteBlocksContactForm':
              return wrap(
                <ContactForm
                  title={block.title}
                  intro={block.intro}
                  showNameField={block.showNameField}
                  nameRequired={block.nameRequired}
                  nameFieldLabel={block.nameFieldLabel}
                  emailFieldLabel={block.emailFieldLabel}
                  showSubjectField={block.showSubjectField}
                  subjectRequired={block.subjectRequired}
                  subjectFieldLabel={block.subjectFieldLabel}
                  subjectType={block.subjectType}
                  subjectOptions={block.subjectOptions}
                  messageFieldLabel={block.messageFieldLabel}
                  submitLabel={block.submitLabel}
                  submitColor={block.submitColor}
                  submitStyle={block.submitStyle}
                  successAction={block.successAction}
                  successMessage={block.successMessage}
                  redirectUrl={block.redirectUrl}
                  titleField={tinaField(block, 'title')}
                  introField={tinaField(block, 'intro')}
                />
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
  const [result,   setResult]   = useState<SiteQueryResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    client.queries.site({ relativePath: `${slug}.md` })
      .then(setResult)
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Site Not Found</h1>
        <Link href="/" className="text-blue-600 hover:underline">← Back to sites</Link>
      </div>
    </div>
  );

  if (!result) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-slate-500">Loading…</p>
    </div>
  );

  return <SiteContent result={result} slug={slug} />;
}
