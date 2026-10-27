import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));

describe("package.json", () => {
  it("ghim chính xác mọi phiên bản dependency (NFR 5)", () => {
    const all: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies };
    const ranged = Object.entries(all).filter(([, v]) => /^[\^~]/.test(v));
    expect(ranged).toEqual([]);
  });
});
