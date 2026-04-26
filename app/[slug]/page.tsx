import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Hero from '@/components/blocks/Hero';
import TextSection from '@/components/blocks/TextSection';
import Gallery from '@/components/blocks/Gallery';
import BigMedia from '@/components/blocks/BigMedia';
import FullWidthImage from '@/components/blocks/FullWidthImage';
import VideoBlock from '@/components/blocks/VideoBlock';
import NavBar from '@/components/blocks/NavBar';
import EditButton from '@/components/EditButton';

interface Block {
  _template: string;
  title?: string;
  subtitle?: string;
  image?: string;
  body?: string;
  images?: Array<{ src?: string; alt?: string }>;
  layout?: string;
  videoUrl?: string;
  showInNav?: boolean;
  navLabel?: string;
  blockId?: string;
}

function toId(block: Block, i: number): string {
  if (block.blockId) return block.blockId;
  if (block.title) return block.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `block-${i}`;
}

function buildNavItems(blocks: Block[]) {
  return blocks.flatMap((block, i) => {
    if (!block.showInNav) return [];
    return [{ label: block.navLabel || block.title || `Section ${i + 1}`, target: toId(block, i) }];
  });
}

export default async function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content/sites', `${slug}.md`);

  if (!fs.existsSync(filePath)) notFound();

  const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
  const blocks = (data.blocks || []) as Block[];
  const navItems = buildNavItems(blocks);

  return (
    <div className="min-h-screen bg-white">
      <EditButton href={`/admin/index.html#/~/${slug}`} />
      <NavBar items={navItems} />
      <main>
        {blocks.map((block, i) => {
          const id = toId(block, i);
          switch (block._template) {
            case 'hero':
              return (
                <div key={i} id={id}>
                  <Hero title={block.title} subtitle={block.subtitle} image={block.image ?? ''} />
                </div>
              );
            case 'textSection':
              return (
                <div key={i} id={id}>
                  <TextSection title={block.title} body={block.body} />
                </div>
              );
            case 'gallery':
              return (
                <div key={i} id={id}>
                  <Gallery title={block.title} images={block.images} />
                </div>
              );
            case 'bigMedia':
              return (
                <div key={i} id={id}>
                  <BigMedia title={block.title} image={block.image ?? ''} layout={block.layout ?? 'center'} />
                </div>
              );
            case 'fullWidthImage':
              return (
                <div key={i} id={id}>
                  <FullWidthImage title={block.title} image={block.image ?? ''} />
                </div>
              );
            case 'videoBlock':
              return (
                <div key={i} id={id}>
                  <VideoBlock title={block.title} videoUrl={block.videoUrl ?? ''} />
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
