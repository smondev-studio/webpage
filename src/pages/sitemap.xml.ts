import type { APIRoute } from "astro";
import { execSync } from "node:child_process";

// lastmod = fecha del último commit (el último cambio real), no la del build.
function lastModified(): string {
  try {
    return execSync("git log -1 --format=%cI", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim()
      .slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL("https://smondevstudio.com")).origin;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${lastModified()}</lastmod>
  </url>
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
