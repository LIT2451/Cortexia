import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { init } = vi.hoisted(() => ({ init: vi.fn() }));
vi.mock("aos", () => ({ default: { init } }));
vi.mock("aos/dist/aos.css", () => ({}));
vi.mock("@/components/ui/footer", () => ({ default: () => null }));

import DefaultLayout from "@/app/(default)/layout";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

beforeEach(() => init.mockClear());
afterEach(cleanup);

describe("DefaultLayout AOS", () => {
  it("tắt AOS khi người dùng bật reduce motion", () => {
    mockMatchMedia(true);
    render(<DefaultLayout>x</DefaultLayout>);
    expect(init).toHaveBeenCalledWith(expect.objectContaining({ disable: true }));
  });

  it("giữ cấu hình Template khi không reduce motion", () => {
    mockMatchMedia(false);
    render(<DefaultLayout>x</DefaultLayout>);
    expect(init).toHaveBeenCalledWith(expect.objectContaining({ disable: "phone" }));
  });
});
