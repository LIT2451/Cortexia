import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { imageCredits } from "@/content/image-credits";
import { home, serviceList } from "@/content/pages";
import { aiCases, featuredCase, portfolioCases, serviceCases } from "@/content/digital";

const contentImages = [
  ...home.services.items.map((i) => i.image),
  home.about.image,
  ...serviceList.map((s) => s.image),
  ...[featuredCase, ...portfolioCases, ...serviceCases, ...aiCases].flatMap((c) => (c.image ? [c.image] : [])),
];

describe("Nguồn ảnh (1.2)", () => {
  const credited = new Set(imageCredits.map((c) => c.file));

  it("mọi ảnh nội dung đều có nguồn", () => {
    expect(contentImages.length).toBeGreaterThan(0);
    for (const img of contentImages) expect(credited, img.src).toContain(img.src);
  });

  it("file ghi trong nguồn tồn tại, mỗi file một lần", () => {
    expect(credited.size).toBe(imageCredits.length);
    // Content images live in public/, the Open Graph image in app/.
    const exists = (f: string) => ["public", "app"].some((dir) => existsSync(join(process.cwd(), dir, f)));
    for (const c of imageCredits) expect(exists(c.file), c.file).toBe(true);
  });

  it("ảnh Open Graph có nguồn", () => {
    expect(credited).toContain("/opengraph-image.jpg");
  });

  it("nguồn là ảnh Unsplash, có tác giả", () => {
    for (const c of imageCredits) {
      expect(c.source).toMatch(/^https:\/\/unsplash\.com\/photos\/[\w-]+$/);
      expect(c.author.trim()).not.toBe("");
    }
  });
});
