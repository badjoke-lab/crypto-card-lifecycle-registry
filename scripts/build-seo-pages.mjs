import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SITE_URL = 'https://badjoke-lab.github.io/crypto-card-lifecycle-registry';
const SITE_NAME = 'Crypto Card Lifecycle Registry';

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
    <p><a href="${SITE_URL}/">Back to CCLR</a></p>
  </main>
</body>
</html>`;
}

const urls = [
  `${SITE_URL}/`,
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

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
await fs.writeFile(path.join(ROOT, 'sitemap.xml'), sitemap);
await fs.writeFile(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`SEO build complete: ${programs.length} program pages, ${providers.length} provider pages, ${urls.length} sitemap URLs.`);
