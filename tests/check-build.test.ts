import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const script = join(process.cwd(), "scripts/check-build.mjs");
const fixtures = join(process.cwd(), "tests/fixtures");

// --root points at the fixture itself so the source scan does not read the real repo.
function run(name: string) {
  const dir = join(fixtures, name);
  const r = spawnSync(process.execPath, [script, dir, "--root", dir], { encoding: "utf8" });
  return { code: r.status, output: r.stdout + r.stderr };
}

describe("scripts/check-build.mjs", () => {
  it("bản đúng thoát mã 0", () => {
    const r = run("build-good");
    expect(r.output).toContain("check-build: OK");
    expect(r.code).toBe(0);
  });

  it("bản lỗi thoát mã 1 và liệt kê từng lỗi", () => {
    const r = run("build-bad");
    expect(r.code).toBe(1);
    expect(r.output).toContain("index.html: tài nguyên nội bộ không tồn tại: /images/missing.png");
    expect(r.output).toContain("index.html: có 2 thẻ h1 (cần đúng 1)");
    expect(r.output).toMatch(/index\.html: chứa chuỗi cấm "dvtechnic"/);
    expect(r.output).toContain("index.html: og:url không tuyệt đối trên https://digitalcortexia.com: /about");
  });

  it("thư mục không tồn tại thì thoát mã 1", () => {
    expect(run("does-not-exist").code).toBe(1);
  });
});
