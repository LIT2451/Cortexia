import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { featuredCase, portfolioCases, serviceCases } from "@/content/digital";

const all = [featuredCase, ...portfolioCases, ...serviceCases];

describe("P5: Case study đủ trường", () => {
  it("số lượng case study đúng như Site cũ", () => {
    expect(portfolioCases).toHaveLength(6);
    expect(serviceCases).toHaveLength(2);
  });

  it("mọi case study có tên, ngành, mô tả, công nghệ và kết quả định lượng", () => {
    fc.assert(
      fc.property(fc.constantFrom(...all), (c) => {
        expect(c.name.trim()).not.toBe("");
        expect(c.industry.trim()).not.toBe("");
        expect(c.summary.trim()).not.toBe("");
        expect(c.technologies.length).toBeGreaterThanOrEqual(1);
        expect(c.results.length).toBeGreaterThanOrEqual(1);
        for (const r of c.results) expect(r.metric).toMatch(/\d/);
      }),
      { numRuns: 100 },
    );
  });
});
