import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { getRawStoreImage, getStores } from "../../lib/projects";

/**
 * Sirve el logo de cada tienda como archivo WebP optimizado (en vez de incrustar
 * el base64 de la API dentro del HTML). Si la imagen original no se puede leer,
 * devuelve la ilustración del estudio para que el build nunca falle.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const stores = await getStores();
  return stores
    .filter((s) => getRawStoreImage(s.id))
    .map((s) => ({ params: { id: s.id } }));
};

async function loadOriginal(raw: string): Promise<Buffer> {
  if (raw.startsWith("data:"))
    return Buffer.from(raw.slice(raw.indexOf(",") + 1), "base64");
  const res = await fetch(raw, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

export const GET: APIRoute = async ({ params }) => {
  const raw = getRawStoreImage(params.id!);
  try {
    const original = await loadOriginal(raw!);
    const webp = await sharp(original)
      .resize({
        width: 640,
        height: 384,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer();
    return new Response(new Uint8Array(webp), {
      headers: { "Content-Type": "image/webp" },
    });
  } catch (error) {
    console.warn(
      `Imagen de tienda ${params.id} no disponible, se usa la del estudio:`,
      (error as Error).message,
    );
    const fallback = await readFile(
      new URL("../../../public/images/hero-light.webp", import.meta.url),
    );
    return new Response(new Uint8Array(fallback), {
      headers: { "Content-Type": "image/webp" },
    });
  }
};
