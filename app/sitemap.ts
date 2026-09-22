import type { MetadataRoute } from "next";
import { getAbsoluteAssetUrl, getSitemapEntries } from "@/src/lib/site";
import { bodyworks, photos, seats, uses } from "@/src/lib/content";

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

  return getSitemapEntries(["/"]).map((entry) => ({
    url: entry.url,
    images,
  }));
}
