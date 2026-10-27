import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const dynamic = "force-static";
export const alt = `${site.name} - Enterprise Software, Telecom, Automation & AI Solutions`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same icon as the favicon (app/icon.png, resized from Logo/Favicon.png).
const icon = `data:image/png;base64,${readFileSync(join(process.cwd(), "app/icon.png")).toString("base64")}`;

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
          <img src={icon} width={160} height={160} alt="" />
          <div style={{ fontSize: 112, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ fontSize: 40, color: "#c7d2fe" }}>Software, Telecom, Automation &amp; AI Solutions</div>
      </div>
    ),
    size,
  );
}
