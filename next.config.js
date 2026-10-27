/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export to out/ for GitHub Pages (no Node.js at runtime).
  output: "export",
  // next/image optimization needs a server; serve images as-is.
  images: { unoptimized: true },
};

module.exports = nextConfig;
