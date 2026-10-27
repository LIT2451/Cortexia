import { existsSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import HomePage from "@/app/(default)/page";
import { home } from "@/content/pages";
import { aiCases } from "@/content/digital";

afterEach(cleanup);

const publicFile = (src: string) => existsSync(join(process.cwd(), "public", src));

describe("Trang Home", () => {
  it("có đúng 1 h1 và ảnh hero kèm alt", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByAltText(home.hero.image.alt)).toBeTruthy();
    expect(publicFile(home.hero.image.src)).toBe(true);
  });

  it("mỗi thẻ dịch vụ có ảnh", () => {
    render(<HomePage />);
    for (const item of home.services.items) {
      expect(screen.getByAltText(item.image.alt)).toBeTruthy();
      expect(publicFile(item.image.src)).toBe(true);
    }
  });

  it("có khối giới thiệu công ty: h2, đoạn văn, điểm mạnh, ảnh, link /about", () => {
    const { container } = render(<HomePage />);
    const h2 = screen.getByRole("heading", { level: 2, name: home.about.title });
    const block = h2.closest("section")!;
    for (const p of home.about.text) expect(block.textContent).toContain(p);
    for (const point of home.about.points) expect(block.textContent).toContain(point);
    expect(block.querySelector("img")?.getAttribute("alt")).toBe(home.about.image.alt);
    expect(block.querySelector('a[href="/about"]')).not.toBeNull();
    expect(publicFile(home.about.image.src)).toBe(true);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("có khối Automation & AI với ít nhất 3 dự án đủ thông tin và ảnh", () => {
    render(<HomePage />);
    const block = screen.getByRole("heading", { level: 2, name: home.automation.title }).closest("section")!;
    expect(aiCases.length).toBeGreaterThanOrEqual(3);
    for (const c of aiCases) {
      const card = block.querySelector(`#${c.slug}`)!;
      expect(card.querySelector("h3")?.textContent).toBe(c.name);
      expect(card.textContent).toContain(c.industry);
      expect(card.textContent).toContain(c.summary);
      for (const r of c.results) expect(card.textContent).toContain(r.metric);
      for (const t of c.technologies) expect(card.textContent).toContain(t);
      expect(c.image).toBeDefined();
      expect(card.querySelector("img")?.getAttribute("alt")).toBe(c.image!.alt);
      expect(publicFile(c.image!.src)).toBe(true);
    }
  });

  it("mọi ảnh trên trang có thuộc tính alt", () => {
    const { container } = render(<HomePage />);
    for (const img of Array.from(container.querySelectorAll("img"))) expect(img.hasAttribute("alt")).toBe(true);
  });
});
