import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { navLinks } from "@/config/site";
import { isActive } from "@/lib/nav";

const HREFS = navLinks.map((l) => l.href as string);
// Valid forms of each page: the URL itself, plus a trailing slash for non-home pages.
const VALID = new Set(HREFS.flatMap((h) => (h === "/" ? [h] : [h, h + "/"])));

describe("P3: Đúng một liên kết đang hoạt động", () => {
  it("pathname thuộc 5 URL (có thể thêm / cuối) chỉ khớp đúng trang tương ứng", () => {
    const known = fc
      .tuple(fc.constantFrom(...HREFS), fc.boolean())
      .map(([href, slash]) => ({ href, pathname: slash && href !== "/" ? href + "/" : href }));

    fc.assert(
      fc.property(known, ({ href, pathname }) => {
        const active = navLinks.filter((l) => isActive(pathname, l.href));
        expect(active.map((l) => l.href)).toEqual([href]);
      }),
      { numRuns: 100 },
    );
  });

  it("pathname ngẫu nhiên khác 5 URL không làm link nào active", () => {
    const other = fc
      .oneof(
        fc.string().map((s) => "/" + s),
        fc.constantFrom(...HREFS).chain((h) => fc.string({ minLength: 1 }).map((s) => h + s)),
        fc.string(),
      )
      .filter((p) => !VALID.has(p));

    fc.assert(
      fc.property(other, (pathname) => {
        expect(navLinks.some((l) => isActive(pathname, l.href))).toBe(false);
      }),
      { numRuns: 100 },
    );
  });
});
