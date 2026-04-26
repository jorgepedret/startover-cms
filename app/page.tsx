import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import HomeContent from './HomeContent';

export default async function Home() {
  const homePath = path.join(process.cwd(), 'content/pages/home.md');
  const { data: homeData } = matter(fs.readFileSync(homePath, 'utf-8'));

  const sitesDir = path.join(process.cwd(), 'content/sites');
  const files = fs.readdirSync(sitesDir).filter((f) => f.endsWith('.md'));
  const sites = files.map((f) => {
    const { data } = matter(fs.readFileSync(path.join(sitesDir, f), 'utf-8'));
    return { title: (data.title as string) || f.replace('.md', ''), slug: path.basename(f, '.md') };
  });

  return (
    <HomeContent
      title={homeData.title || 'StartOver.xyz'}
      subtitle={homeData.subtitle || ''}
      sites={sites}
    />
  );
}
