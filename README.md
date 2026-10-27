# Cortexia

Marketing website for Cortexia, a software engineering company offering custom software, dedicated offshore teams, carrier telecom solutions, mobile apps, cloud/DevOps and security services.

Live at https://digitalcortexia.com. The site is built with Next.js (App Router), React and Tailwind CSS, and is exported as plain static files for GitHub Pages.

## Requirements

- Node.js 20.19 or newer
- pnpm 10 (the exact version is pinned in `package.json`; run `corepack enable` to use it)

## Commands

```bash
pnpm install   # install dependencies
pnpm dev       # start the dev server at http://localhost:3000
pnpm build     # static export into out/
pnpm check     # validate out/ (links, assets, metadata, sitemap, forbidden names)
pnpm test      # unit and property tests (vitest)
pnpm lint      # ESLint
```

Run `pnpm build` before `pnpm check`, since the check reads `out/`. To preview the export locally, serve it with any static server, for example `pnpm dlx serve@14.2.4 out`.

## Project layout

- `app/`: routes (`/`, `/about`, `/services`, `/portfolio`, `/contact`), 404 page, sitemap, robots and Open Graph image
- `components/`: layout, header/footer and page sections
- `config/site.ts`: brand information (name, domain, address, email, phone, social links, navigation)
- `content/pages.ts`: page copy
- `content/digital.ts`: stats, case studies and testimonials
- `lib/`: metadata helper and contact form validation
- `public/`: images, fonts, `CNAME` and `.nojekyll`
- `scripts/check-build.mjs`: post-build checks
- `tests/`: vitest tests and fixtures

## Editing content

- Brand details (company name, contact info, social links) live in `config/site.ts`. Every page, the footer and the metadata read from there.
- `content/digital.ts` contains sample content: stats, case studies and testimonials. Its first line marks it as sample content. Confirm or replace every item with real data before relying on it publicly.
- The contact form only validates input in the browser and shows a confirmation message. It does not send data anywhere yet.

## Deploying to GitHub Pages

1. Run `pnpm build && pnpm check`.
2. Publish the contents of `out/` to the branch or artifact that GitHub Pages serves, for example with the `actions/upload-pages-artifact` and `actions/deploy-pages` actions, or by pushing `out/` to a `gh-pages` branch.
3. In the repository settings under Pages, set the custom domain to `digitalcortexia.com` and enable "Enforce HTTPS". `out/CNAME` already contains the domain.
4. Point DNS at GitHub Pages: `A` records for the apex domain to GitHub's Pages IPs, or a `CNAME` for `www` to `<user>.github.io`.

`out/.nojekyll` stops GitHub Pages from running Jekyll, which would otherwise skip the `_next/` folder.

## Manual checks before release

- [ ] Lighthouse (mobile) on every page: Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 95
- [ ] Widths 360, 768, 1280 and 1920px: no horizontal scrollbar, no clipped text
- [ ] Keyboard only: every link, menu and form field is reachable with Tab, focus is visible, the mobile menu opens and closes with the keyboard
- [ ] Reduced motion: with "Reduce motion" enabled in the OS, scroll animations are off
- [ ] Contact form: empty or invalid fields show errors and focus the first invalid field; a valid submission shows the thank-you message
- [ ] An unknown URL shows the 404 page with a link back home
