import type { MetadataRoute } from "next";
import { navLinks, site } from "@/config/site";

export const dynamic = "force-static";

// One entry per page in navLinks, on the brand domain ("/" stays as the bare origin).
export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((l) => ({
    url: l.href === "/" ? site.url : site.url + l.href,
    changeFrequency: "monthly",
    priority: l.href === "/" ? 1 : 0.8,
  }));
}
