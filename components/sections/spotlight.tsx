"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useMousePosition from "@/utils/useMousePosition";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Spotlight({
  children,
  className = "",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([]);

  useEffect(() => {
    if (containerRef.current) {
      setBoxes(
        Array.from(containerRef.current.children).map(
          (el) => el as HTMLElement,
        ),
      );
    }
  }, []);

  const initContainer = useCallback(() => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  }, []);

  useEffect(() => {
    initContainer();
    window.addEventListener("resize", initContainer);

    return () => {
      window.removeEventListener("resize", initContainer);
    };
  }, [boxes, initContainer]);

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const { w, h } = containerSize.current;
    const x = mousePosition.x - rect.left;
    const y = mousePosition.y - rect.top;
    const inside = x < w && x > 0 && y < h && y > 0;
    if (!inside) return;
    boxes.forEach((box) => {
      const boxRect = box.getBoundingClientRect();
      box.style.setProperty("--mouse-x", `${x - (boxRect.left - rect.left)}px`);
      box.style.setProperty("--mouse-y", `${y - (boxRect.top - rect.top)}px`);
    });
  }, [mousePosition, boxes]);

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
}
