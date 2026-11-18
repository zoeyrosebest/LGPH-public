import type { APIRoute } from 'astro';

// Every page a search engine should know about. The 404 and the hidden Art
// Store are deliberately absent.
const paths = [
  '/',
  '/services/',
  '/video-portfolio/',
  '/copy-of-film-portfolio/',
  '/copy-of-film-portfolio-1/',
  '/photography-portfolio/',
  '/design-portfolio/',
  '/praise-and-results/',
  '/about/',
  '/contact/',
];

export const GET: APIRoute = ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? '';
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map(
      (p) =>
        `  <url>\n    <loc>${base}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n  </url>`
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
};
