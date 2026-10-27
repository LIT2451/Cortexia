import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Logo from "@/components/ui/logo";

afterEach(cleanup);

describe("Logo", () => {
  it("là link về / với aria-label và có ảnh logo kèm alt mô tả", () => {
    render(<Logo />);
    const link = screen.getByRole("link", { name: "Cortexia home" });
    expect(link.getAttribute("href")).toBe("/");
    const img = link.querySelector("img");
    expect(img).not.toBeNull();
    // vitest does not load next.config, so next/image may wrap the src in /_next/image?url=...
    expect(decodeURIComponent(img!.getAttribute("src")!)).toContain("/images/logo/cortexia-logo.png");
    expect(img!.getAttribute("alt")).toBe("Cortexia logo");
  });

  it("file logo đã thu nhỏ, ≤ 300 KB", () => {
    const file = join(process.cwd(), "public/images/logo/cortexia-logo.png");
    expect(existsSync(file)).toBe(true);
    expect(statSync(file).size).toBeLessThanOrEqual(300 * 1024);
  });
});
