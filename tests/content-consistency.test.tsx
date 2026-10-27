import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import HomePage from "@/app/(default)/page";
import AboutPage from "@/app/(default)/about/page";
import { about, home, portfolio, services } from "@/content/pages";
import { aiCases, featuredCase, portfolioCases, serviceCases, stats, testimonials } from "@/content/digital";

afterEach(cleanup);

const allCases = [featuredCase, ...portfolioCases, ...serviceCases, ...aiCases];

describe("Nội dung thống nhất giữa các trang (1.5)", () => {
  it("không còn nhắc sản phẩm AI agent đã bỏ", () => {
    const text = JSON.stringify({ home, about, services, portfolio, allCases });
    expect(text).not.toMatch(/autonomous AI agent/i);
  });

  it("không có hai case study trùng slug hay trùng tên", () => {
    expect(new Set(allCases.map((c) => c.slug)).size).toBe(allCases.length);
    expect(new Set(allCases.map((c) => c.name)).size).toBe(allCases.length);
  });

  it("chỉ một case trợ lý/chatbot AI và một case dự báo nhu cầu", () => {
    const text = (re: RegExp) => allCases.filter((c) => re.test(`${c.name} ${c.summary}`));
    expect(text(/chatbot|assistant|copilot/i)).toHaveLength(1);
    expect(text(/forecast/i)).toHaveLength(1);
  });

  it("độ sẵn sàng ghi cùng một giá trị ở Stats và About", () => {
    const uptime = stats.find((s) => /uptime/i.test(s.label))!.value;
    const reliability = about.whoWeAre.items.find((i) => /reliability/i.test(i.title))!.title;
    expect(reliability).toContain(uptime);
  });

  it("Home chỉ có một link Discover Our Story", () => {
    const { container } = render(<HomePage />);
    const links = Array.from(container.querySelectorAll("a")).filter((a) => a.textContent?.includes("Discover Our Story"));
    expect(links).toHaveLength(1);
  });

  it("About không lặp số liệu và lời chứng thực của Home", () => {
    const { container } = render(<AboutPage />);
    const text = container.textContent ?? "";
    for (const s of stats) expect(text).not.toContain(s.label);
    for (const t of testimonials) expect(text).not.toContain(t.quote);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });

  it("meta của Home nhắc tới mảng AI & automation", () => {
    expect(home.meta.description).toMatch(/AI and process automation/);
  });
});
