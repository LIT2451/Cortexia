import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { pageMetadata } from "@/lib/metadata";

const path = fc.string().map((s) => "/" + s);

describe("P4: Metadata tuyệt đối", () => {
  it("canonical và og:url tuyệt đối trên digitalcortexia.com, og:type website", () => {
    fc.assert(
      fc.property(path, fc.string(), fc.string(), (p, title, description) => {
        const m = pageMetadata({ path: p, title, description });
        const canonical = String(m.alternates?.canonical);
        const og = m.openGraph as { url?: unknown; type?: unknown; images?: { url: string }[] } | undefined;
        const ogUrl = String(og?.url);

        expect(canonical.startsWith("https://digitalcortexia.com")).toBe(true);
        expect(canonical.endsWith(p)).toBe(true);
        expect(ogUrl.startsWith("https://digitalcortexia.com")).toBe(true);
        expect(ogUrl.endsWith(p)).toBe(true);
        expect(og?.type).toBe("website");
        expect(og?.images?.[0]?.url).toBe("/opengraph-image.jpg");
      }),
      { numRuns: 100 },
    );
  });
});
