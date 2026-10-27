import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PageHero from "@/components/sections/page-hero";
import Cta from "@/components/sections/cta";
import Testimonials from "@/components/sections/testimonials";
import { home } from "@/content/pages";
import { testimonials } from "@/content/digital";

afterEach(cleanup);

describe("components/sections", () => {
  it("PageHero render đúng 1 h1, kể cả khi tiêu đề nhiều dòng", () => {
    const { container } = render(
      <PageHero title={home.hero.titleLines} text={home.hero.text} primary={home.hero.primary} secondary={home.hero.secondary} />,
    );
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    for (const line of home.hero.titleLines) expect(h1s[0].textContent).toContain(line);
  });

  it("Cta có link tới /contact", () => {
    const { container } = render(<Cta {...home.cta} />);
    const link = container.querySelector('a[href="/contact"]');
    expect(link).not.toBeNull();
    expect(link?.textContent).toContain(home.cta.label);
    expect(container.querySelector("h2")?.textContent).toBe(home.cta.title);
  });

  it("Testimonials không render <img>", () => {
    const { container } = render(<Testimonials title="What Our Clients Say" items={testimonials} />);
    expect(container.querySelectorAll("img")).toHaveLength(0);
    expect(container.querySelectorAll("figure")).toHaveLength(testimonials.length);
  });

  it("ảnh trang trí trong Cta có alt rỗng", () => {
    const { container } = render(<Cta {...home.cta} />);
    for (const img of Array.from(container.querySelectorAll("img"))) expect(img.getAttribute("alt")).toBe("");
  });
});
