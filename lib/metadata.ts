import type { Metadata } from "next";
import { site } from "@/config/site";

// Per-page metadata with absolute canonical and og:url on the brand domain.
export function pageMetadata(p: { path: string; title: string; description: string }): Metadata {
  const url = site.url + p.path;
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: p.title,
      description: p.description,
      siteName: site.name,
    },
  };
}
