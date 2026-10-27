"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "@/components/ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respect the OS "reduce motion" setting by turning animations off entirely.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({
      once: true,
      disable: reduceMotion ? true : "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  }, []);

  return (
    <>
      <main className="relative flex grow flex-col">{children}</main>

      <Footer />
    </>
  );
}
