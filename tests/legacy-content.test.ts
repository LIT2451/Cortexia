import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import legacy from "./fixtures/legacy-text.json";

const out = join(process.cwd(), "out");
const files: Record<keyof typeof legacy, string> = {
  home: "index.html",
  about: "about.html",
  services: "services.html",
  portfolio: "portfolio.html",
  contact: "contact.html",
};

/** Visible text of an exported page: drop head/scripts/tags, decode entities, collapse whitespace. */
function pageText(html: string): string {
  return html
    .replace(/<head[\s\S]*?<\/head>/i, " ")
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ");
}

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

describe.skipIf(!existsSync(out))("Nội dung Site cũ có trong bản build", () => {
  for (const [page, strings] of Object.entries(legacy) as [keyof typeof legacy, string[]][]) {
    it(`${files[page]} chứa mọi chuỗi của trang ${page}`, () => {
      const text = pageText(readFileSync(join(out, files[page]), "utf8"));
      const missing = strings.filter((s) => !text.includes(norm(s)));
      expect(missing).toEqual([]);
    });
  }
});
