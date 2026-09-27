import type { MetadataRoute } from "next";
import { getAbsoluteAssetUrl, getCanonicalUrl, getSitemapEntries } from "@/src/lib/site";
import { bodyworks, photos, seats, uses } from "@/src/lib/content";
import { legal } from "@/src/lib/legal";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const images = Array.from(new Set([
    photos.hero,
    photos.retratoMariana,
    photos.accesibilidad,
    ...uses.flatMap((use) => use.images.map((image) => image.src)),
    ...bodyworks.map((bodywork) => bodywork.image),
    ...seats.map((seat) => seat.image),
  ])).map((path) => getAbsoluteAssetUrl(path));
  const home = getCanonicalUrl();

  // Only the landing carries the photo list; the legal page has no images.
  return getSitemapEntries(["/", legal.path]).map((entry) => (
    entry.url === home ? { url: entry.url, images } : { url: entry.url }
  ));
}
