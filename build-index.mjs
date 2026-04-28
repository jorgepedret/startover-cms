#!/usr/bin/env node
/**
 * build-index.mjs
 * Generates /var/www/startover/index.html from crawl-progress.json + domains file
 *
 * Usage: node build-index.mjs all_links.md
 * Output: index.html  (copy this to /var/www/startover/index.html on the server)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const domainsFile = process.argv[2] || 'all_links.md';

  // Format "20250908094125" → "September 8th, 2025"
  function formatTimestamp(ts) {
    if (!ts) return null;
    const y = parseInt(ts.slice(0, 4));
    const m = parseInt(ts.slice(4, 6)) - 1; // 0-indexed
    const d = parseInt(ts.slice(6, 8));
    const date = new Date(y, m, d);
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const v = d % 100;
    const suffix = (v >= 11 && v <= 13) ? 'th'
      : ['th','st','nd','rd'][d % 10] || 'th';
    return `${month} ${d}${suffix}, ${y}`;
  }

  // Load titles from domains file
  const raw = await fs.readFile(domainsFile, 'utf-8');
  const titleMap = {};
  raw.split('\n').forEach(l => {
    const parts = l.trim().split(/\s[—|]\s|\t/);
    if (parts.length < 2) return;
    const urlPart = parts[0].trim();
    const title = parts[1]?.trim() || '';
    let domain;
    try { domain = new URL(urlPart).hostname; } catch { domain = urlPart; }
    if (domain) titleMap[domain] = title;
  });

  // Load crawl progress
  let progress = {};
  try {
    progress = JSON.parse(await fs.readFile('crawl-progress.json', 'utf-8'));
  } catch {
    console.error('crawl-progress.json not found — run crawl.mjs first');
    process.exit(1);
  }

  // Build site list — recovered
  const sites = Object.entries(progress)
    .filter(([, v]) => v.status === 'ok')
    .map(([domain, v]) => ({
      slug: v.slug,
      domain,
      title: titleMap[domain] || v.slug,
      url: `https://startover.world/${v.slug}`,
      timestamp: v.timestamp,
      captured: formatTimestamp(v.timestamp),
      status: 'ok',
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  // Build uncaptured list — all domains not in progress OR with error/no_snapshot
  const allDomains = Object.keys(titleMap);
  const uncaptured = allDomains
    .filter(domain => !progress[domain] || progress[domain].status !== 'ok')
    .map(domain => {
      const slug = domain.split('.')[0];
      return {
        slug,
        domain,
        title: titleMap[domain] || slug,
        status: progress[domain]?.status || 'pending',
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const total = Object.keys(titleMap).length;
  const ok = sites.length;
  const errors = Object.values(progress).filter(v => v.status === 'error').length;
  const noSnap = Object.values(progress).filter(v => v.status === 'no_snapshot').length;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StartOver.world — Spaceport</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Barlow+Condensed:wght@400;600;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <header>
      <div class="eyebrow">StartOver.xyz — Index</div>
      <h1>
        <span class="dim">Start</span><span class="bright">Over</span><span class="dim">.world</span>
      </h1>
      <p class="subtitle">
        StartOver.xyz is a massive multiplayer online-and-offline matrix-building thoughtware-upgrade context-shift personal-transformation game.
        <br>
        <br>
        This is a searchable index of all the websites.
      </p>
    </header>

    <div class="stats">
      <div class="stat">
        <div class="stat-number">${ok}</div>
        <div class="stat-label">Sites Restored</div>
      </div>
      <div class="stat">
        <div class="stat-number">${total}</div>
        <div class="stat-label">Total Domains</div>
      </div>
      <div class="stat">
        <div class="stat-number">${errors + noSnap}</div>
        <div class="stat-label">Missing</div>
      </div>
    </div>

    <div class="search-wrap">
      <div class="container" style="padding:0">
        <div class="search-inner">
          <span class="search-icon">⌕</span>
          <input
            type="search"
            id="search"
            placeholder="Search sites..."
            autocomplete="off"
            autofocus
          >
        </div>
        <div class="results-count" id="count">${ok} recovered · ${uncaptured.length} missing</div>
      </div>
    </div>

    <div class="grid" id="grid">
      ${sites.map(s => `
      <a class="card" href="${s.url}" target="_blank"
         data-title="${s.title.toLowerCase()}"
         data-slug="${s.slug.toLowerCase()}">
        <div class="card-title">${s.title}</div>
        <div class="card-slug"><span>${s.slug}</span>.startover.world</div>
        <div class="card-date">Last captured ${s.captured}</div>
      </a>`).join('')}
      
      ${uncaptured.length > 0 ? `
      <div class="section-label">Not yet recovered — ${uncaptured.length} sites</div>
      ${uncaptured.map(s => `
      <a class="card uncaptured" href="https://${s.slug}.mystrikingly.com" target="_blank"
         data-title="${s.title.toLowerCase()}"
         data-slug="${s.slug.toLowerCase()}">
        <div class="card-title">${s.title}</div>
        <div class="card-slug"><span style="color:var(--muted)">${s.slug}</span>.mystrikingly.com</div>
        <div class="card-date">No capture recorded</div>
      </a>`).join('')}` : ''}
    </div>

    <div class="no-results" id="no-results">No sites match your search.</div>

    <footer>
      <div class="container" style="padding:0">
        STARTOVER.WORLD — Recovered from archive.org —
        ${new Date().getFullYear()}
      </div>
    </footer>
  </div>

  <script>
    const search = document.getElementById('search');
    const cards = document.querySelectorAll('.card');
    const count = document.getElementById('count');
    const noResults = document.getElementById('no-results');
    const recoveredTotal = ${ok};
    const missingTotal = ${uncaptured.length};

    search.addEventListener('input', () => {
      const q = search.value.toLowerCase().trim();
      let visibleRecovered = 0;
      let visibleMissing = 0;

      cards.forEach(card => {
        const match = !q ||
          card.dataset.title.includes(q) ||
          card.dataset.slug.includes(q);
        card.classList.toggle('hidden', !match);
        if (match) {
          if (card.classList.contains('uncaptured')) visibleMissing++;
          else visibleRecovered++;
        }
      });

      if (q) {
        count.textContent = \`\${visibleRecovered} recovered · \${visibleMissing} missing\`;
      } else {
        count.textContent = \`\${recoveredTotal} recovered · \${missingTotal} missing\`;
      }

      noResults.style.display = (visibleRecovered + visibleMissing) === 0 ? 'block' : 'none';
    });
  </script>
</body>
</html>`;

  const outPath = path.join(__dirname, 'index.html');
  await fs.writeFile(outPath, html, 'utf-8');
  console.log(`✓ Generated index.html with ${ok} sites`);
  console.log(`  Copy to server: scp index.html hostinger:/var/www/startover/index.html`);
}

main().catch(err => { console.error(err); process.exit(1); });
