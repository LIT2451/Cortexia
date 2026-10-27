import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const dynamic = "force-static";
export const alt = `${site.name} - Enterprise Software Outsourcing & Telecom Solutions`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          background: "linear-gradient(135deg, #030712 0%, #1e1b4b 100%)",
          color: "#e5e7eb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <svg width="128" height="128" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="c" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#818CF8" />
                <stop offset="1" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="url(#c)" />
            <path d="M21.5 11.2A7 7 0 1 0 21.5 20.8" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
          </svg>
          <div style={{ fontSize: 112, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ fontSize: 40, color: "#c7d2fe" }}>Enterprise Software Outsourcing &amp; Telecom Solutions</div>
      </div>
    ),
    size,
  );
}
