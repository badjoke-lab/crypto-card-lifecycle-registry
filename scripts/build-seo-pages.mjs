import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SITE_URL = 'https://cclr.badjoke-lab.com';
const SITE_NAME = 'Crypto Card Lifecycle Registry';
const GA4_ID = 'G-GC3PS5DW5M';
const RECORDS_URL = `${SITE_URL}/records/`;

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const readJson = async (file) => JSON.parse(await fs.readFile(path.join(ROOT, file), 'utf8'));
const ensureDir = async (dir) => fs.mkdir(dir, { recursive: true });

const programs = await readJson('data/programs.json');
const providers = await readJson('data/providers.json');

function page({ kind, slug, name, summary, status, officialUrl }) {
  const canonical = `${SITE_URL}/${kind}/${encodeURIComponent(slug)}/`;
  const interactive = `${SITE_URL}/#/${kind}/${encodeURIComponent(slug)}`;
  const description = summary || `${name} record in the Crypto Card Lifecycle Registry.`;
  const typeLabel = kind === 'program' ? 'Crypto card program' : 'Infrastructure provider';
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${name} — ${SITE_NAME}`,
    description,
    url: canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`
    },
    about: {
      '@type': 'Thing',
      name,
      description
    }
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(name)} — ${SITE_NAME}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="ga4-measurement-id" content="${GA4_ID}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:title" content="${escapeHtml(name)} — ${SITE_NAME}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(name)} — ${SITE_NAME}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <script type="application/ld+json">${JSON.stringify(structured).replaceAll('<', '\\u003c')}</script>
  <link rel="stylesheet" href="${SITE_URL}/styles.css">
  <link rel="stylesheet" href="${SITE_URL}/info.css">
</head>
<body>
  <main class="info-page">
    <p class="eyebrow">${escapeHtml(typeLabel.toUpperCase())}</p>
    <h1>${escapeHtml(name)}</h1>
    <p>${escapeHtml(description)}</p>
    ${status ? `<p><strong>Status:</strong> ${escapeHtml(status)}</p>` : ''}
    <p><a href="${interactive}">Open this record in the interactive registry →</a></p>
    ${officialUrl ? `<p><a href="${escapeHtml(officialUrl)}" rel="external nofollow">Official source ↗</a></p>` : ''}
    <p><a href="${RECORDS_URL}">Browse all CCLR records</a></p>
    <p><a href="${SITE_URL}/">Back to CCLR</a></p>
  </main>
  <script src="${SITE_URL}/analytics.js" defer></script>
</body>
</html>`;
}

function directoryPage() {
  const programLinks = programs
    .filter((item) => item?.slug && item?.canonical_name)
    .sort((a, b) => a.canonical_name.localeCompare(b.canonical_name))
    .map((item) => `<li><a href="${SITE_URL}/program/${encodeURIComponent(item.slug)}/">${escapeHtml(item.canonical_name)}</a>${item.status ? ` <small>— ${escapeHtml(item.status)}</small>` : ''}</li>`)
    .join('\n');
  const providerLinks = providers
    .filter((item) => item?.slug && item?.canonical_name)
    .sort((a, b) => a.canonical_name.localeCompare(b.canonical_name))
    .map((item) => `<li><a href="${SITE_URL}/provider/${encodeURIComponent(item.slug)}/">${escapeHtml(item.canonical_name)}</a>${item.status ? ` <small>— ${escapeHtml(item.status)}</small>` : ''}</li>`)
    .join('\n');
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `All records — ${SITE_NAME}`,
    description: 'Browse all public crypto card program and infrastructure provider records in CCLR.',
    url: RECORDS_URL,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` }
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>All records — ${SITE_NAME}</title>
  <meta name="description" content="Browse all public crypto card program and infrastructure provider records in CCLR.">
  <link rel="canonical" href="${RECORDS_URL}">
  <meta name="robots" content="index,follow">
  <script type="application/ld+json">${JSON.stringify(structured).replaceAll('<', '\\u003c')}</script>
  <link rel="stylesheet" href="${SITE_URL}/styles.css">
  <link rel="stylesheet" href="${SITE_URL}/info.css">
</head>
<body>
  <main class="info-page">
    <p class="eyebrow">PUBLIC RECORD DIRECTORY</p>
    <h1>All CCLR records</h1>
    <p>This static directory provides a crawlable path to every public card-program and infrastructure-provider record. Use the interactive registry for relationship exploration.</p>
    <p><a href="${SITE_URL}/">Open the CCLR overview</a></p>
    <section aria-labelledby="programs-heading">
      <h2 id="programs-heading">Card programs (${programs.length})</h2>
      <ul>${programLinks}</ul>
    </section>
    <section aria-labelledby="providers-heading">
      <h2 id="providers-heading">Infrastructure providers (${providers.length})</h2>
      <ul>${providerLinks}</ul>
    </section>
  </main>
  <script src="${SITE_URL}/analytics.js" defer></script>
</body>
</html>`;
}

const urls = [
  `${SITE_URL}/`,
  RECORDS_URL,
  `${SITE_URL}/methodology.html`,
  `${SITE_URL}/corrections.html`,
  `${SITE_URL}/contact.html`,
  `${SITE_URL}/support.html`
];

for (const item of programs) {
  if (!item?.slug || !item?.canonical_name) continue;
  const dir = path.join(ROOT, 'program', item.slug);
  await ensureDir(dir);
  await fs.writeFile(path.join(dir, 'index.html'), page({
    kind: 'program',
    slug: item.slug,
    name: item.canonical_name,
    summary: item.summary,
    status: item.status,
    officialUrl: item.official_url
  }));
  urls.push(`${SITE_URL}/program/${encodeURIComponent(item.slug)}/`);
}

for (const item of providers) {
  if (!item?.slug || !item?.canonical_name) continue;
  const dir = path.join(ROOT, 'provider', item.slug);
  await ensureDir(dir);
  await fs.writeFile(path.join(dir, 'index.html'), page({
    kind: 'provider',
    slug: item.slug,
    name: item.canonical_name,
    summary: item.summary,
    status: item.status,
    officialUrl: item.official_url
  }));
  urls.push(`${SITE_URL}/provider/${encodeURIComponent(item.slug)}/`);
}

const recordsDir = path.join(ROOT, 'records');
await ensureDir(recordsDir);
await fs.writeFile(path.join(recordsDir, 'index.html'), directoryPage());

const homePath = path.join(ROOT, 'index.html');
let homeHtml = await fs.readFile(homePath, 'utf8');
const crawlLinkMarker = 'data-crawl-directory="records"';
if (!homeHtml.includes(crawlLinkMarker)) {
  homeHtml = homeHtml.replace(
    '</main>',
    `  <aside ${crawlLinkMarker} aria-label="Public record directory"><p><a href="${RECORDS_URL}">Browse all card-program and provider records</a></p></aside>\n  </main>`
  );
  await fs.writeFile(homePath, homeHtml);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
await fs.writeFile(path.join(ROOT, 'sitemap.xml'), sitemap);
await fs.writeFile(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`SEO build complete: ${programs.length} program pages, ${providers.length} provider pages, ${urls.length} sitemap URLs, crawlable record directory enabled.`);
