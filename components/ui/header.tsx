"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { navLinks } from "@/config/site";
import { isActive } from "@/lib/nav";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400";

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (href: string) =>
    `rounded-md px-3 py-1.5 text-sm transition-colors hover:text-indigo-300 ${focusRing} ${
      isActive(pathname, href) ? "text-indigo-400" : "text-gray-300"
    }`;

  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="max-md:hidden">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={linkClass(l.href)}
                    aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <Link
              href="/contact"
              className={`btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] max-sm:hidden ${focusRing}`}
            >
              Contact Us
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 hover:text-indigo-300 md:hidden ${focusRing}`}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                {open ? (
                  <path d="M4.3 4.3a1 1 0 0 1 1.4 0L10 8.6l4.3-4.3a1 1 0 1 1 1.4 1.4L11.4 10l4.3 4.3a1 1 0 0 1-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 0 1-1.4-1.4L8.6 10 4.3 5.7a1 1 0 0 1 0-1.4Z" />
                ) : (
                  <path d="M3 5h14a1 1 0 1 1 0 2H3a1 1 0 0 1 0-2Zm0 4h14a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2Zm0 4h14a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2Z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation panel */}
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="mt-2 rounded-2xl bg-gray-900/95 p-3 md:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block ${linkClass(l.href)}`}
                    aria-current={isActive(pathname, l.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
