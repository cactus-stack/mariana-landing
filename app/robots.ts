import type { MetadataRoute } from "next";
import { getSitemapUrl } from "@/src/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const sitemap = getSitemapUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(sitemap ? { sitemap } : {}),
  };
}
