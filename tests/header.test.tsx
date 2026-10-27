import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/about" }));

import Header from "@/components/ui/header";

afterEach(cleanup);

describe("Header", () => {
  it("render Logo Cortexia", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Cortexia home" }).getAttribute("href")).toBe("/");
  });

  it("đánh dấu trang đang xem bằng aria-current", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    const current = within(nav).getAllByRole("link").filter((a) => a.getAttribute("aria-current") === "page");
    expect(current.map((a) => a.getAttribute("href"))).toEqual(["/about"]);
  });

  it("nút menu mở panel đủ 5 link, Escape đóng", () => {
    render(<Header />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    const panel = screen.getByRole("navigation", { name: "Mobile" });
    expect(within(panel).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual([
      "/",
      "/about",
      "/services",
      "/portfolio",
      "/contact",
    ]);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).toBeNull();
  });
});
