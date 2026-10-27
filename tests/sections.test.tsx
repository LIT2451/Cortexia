import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PageHero from "@/components/sections/page-hero";
import FeatureGrid from "@/components/sections/feature-grid";
import CaseStudies from "@/components/sections/case-studies";
import ImageSplit from "@/components/sections/image-split";
import Cta from "@/components/sections/cta";
import Testimonials from "@/components/sections/testimonials";
import { home, serviceList } from "@/content/pages";
import { aiCases, featuredCase, portfolioCases, serviceCases, testimonials } from "@/content/digital";

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

  it("PageHero chỉ render ảnh khi có prop image, kèm alt", () => {
    const image = { src: "/images/home/home-hero.jpg", alt: "Global technology network" };
    const without = render(<PageHero title="Title" />);
    expect(without.container.querySelectorAll("img")).toHaveLength(0);
    without.unmount();
    const { container } = render(<PageHero title="Title" image={image} />);
    const imgs = container.querySelectorAll("img");
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute("alt")).toBe(image.alt);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("FeatureGrid hiển thị ảnh cho thẻ có image, thẻ không có thì không", () => {
    const { container } = render(
      <FeatureGrid
        title="Services"
        items={[
          { title: "With image", text: "a", image: { src: "/images/home/service-custom-software.jpg", alt: "Engineers writing code" } },
          { title: "Without image", text: "b" },
        ]}
      />,
    );
    const [withImg, withoutImg] = Array.from(container.querySelectorAll("article"));
    expect(withImg.querySelector("img")?.getAttribute("alt")).toBe("Engineers writing code");
    expect(withoutImg.querySelector("img")).toBeNull();
  });

  it("CaseStudies hiển thị ảnh của case nếu có", () => {
    const base = { industry: "AI", summary: "s", technologies: ["Python"], results: [{ metric: "1", label: "l" }] };
    const { container } = render(
      <CaseStudies
        title="Cases"
        items={[
          { ...base, slug: "a", name: "A", image: { src: "/images/home/ai-support-copilot.jpg", alt: "AI assistant dashboard" } },
          { ...base, slug: "b", name: "B" },
        ]}
      />,
    );
    expect(container.querySelector("#a img")?.getAttribute("alt")).toBe("AI assistant dashboard");
    expect(container.querySelector("#b img")).toBeNull();
  });

  it("ImageSplit có h2, đoạn văn, danh sách điểm mạnh, ảnh có alt và link", () => {
    const { container } = render(
      <ImageSplit
        title="About Cortexia"
        text={["First paragraph.", "Second paragraph."]}
        points={["One", "Two", "Three"]}
        image={{ src: "/images/home/about-engineering-team.jpg", alt: "Cortexia engineering team" }}
        link={{ label: "Discover Our Story", href: "/about" }}
      />,
    );
    expect(container.querySelector("h2")?.textContent).toBe("About Cortexia");
    expect(container.querySelectorAll("p")).toHaveLength(2);
    expect(container.querySelectorAll("li")).toHaveLength(3);
    expect(container.querySelector("img")?.getAttribute("alt")).toBe("Cortexia engineering team");
    expect(container.querySelector('a[href="/about"]')?.textContent).toContain("Discover Our Story");
  });

  it("mọi ảnh jpg/png trong public/images ≤ 300 KB", () => {
    const root = join(process.cwd(), "public/images");
    const files = readdirSync(root, { recursive: true, encoding: "utf8" }).filter((f) => /\.(jpe?g|png)$/i.test(f));
    expect(files.length).toBeGreaterThan(0);
    for (const f of files) expect(statSync(join(root, f)).size, f).toBeLessThanOrEqual(300 * 1024);
  });

  it("không ảnh nội dung nào được khai báo ở hai vị trí", () => {
    const srcs = [
      home.hero.image.src,
      ...home.services.items.map((i) => i.image.src),
      home.about.image.src,
      ...serviceList.map((s) => s.image.src),
      ...[featuredCase, ...portfolioCases, ...serviceCases, ...aiCases].flatMap((c) => (c.image ? [c.image.src] : [])),
    ];
    expect(new Set(srcs).size).toBe(srcs.length);
  });

  it("ảnh trang trí trong Cta có alt rỗng", () => {
    const { container } = render(<Cta {...home.cta} />);
    for (const img of Array.from(container.querySelectorAll("img"))) expect(img.getAttribute("alt")).toBe("");
  });
});
