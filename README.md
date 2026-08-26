# Aloha Escapes

Aloha Escapes is a boutique luxury Hawaiian travel agency website. This repo is a static site built from a main landing page in `index.html` with supplemental detail pages under `pages/`.

## Project overview

- Static site written as a single `index.html` file.
- No build step or framework required.
- Designed for high-end Hawaiian travel clients with premium, restrained visuals and accessible interactions.
- Uses inline CSS and JavaScript for layout, animation, responsive behavior, and a lazy-loading ambient audio player.

## Repo structure

- `index.html` — main website file containing HTML, CSS, and JavaScript.
- `pages/*.html` — auxiliary static pages (destinations, privacy, terms, accessibility).
- `404.html`, `favicon.svg`, `robots.txt`, `sitemap.xml` — the rest of the deployed site.
  The Pages workflow publishes only these files; everything else in the repo stays private.
- `PLAYWRIGHT` tests in `tests/`:
  - `accessibility.spec.js`
  - `navigation.spec.js`
  - `ui.spec.js`
- `package.json` — scripts and dev dependencies for linting, formatting, serving, and Playwright.
- `CLAUDE.md` — internal guidance for editing the site.
- `PRODUCT.md` — product brief, brand voice, design constraints, and audience profile.

## Local development

Install dependencies once if needed:

```bash
npm install
```

Start a local server:

```bash
npm run serve
```

Then open:

```text
http://localhost:3456
```

## Scripts

- `npm run serve` — start a local static server.
- `npm run lint` — run HTMLHint and ESLint against `index.html` and `pages/*.html`.
- `npm run lint:html` — run HTMLHint.
- `npm run lint:js` — run ESLint.
- `npm run format` — format `index.html` with Prettier.
- `npm run format:check` — check Prettier formatting.
- `npm test` — run Playwright tests.
- `npm run test:ui` — run Playwright with the UI test runner.

## Design and editing notes

- Preserve the single-page, single-file structure of `index.html`.
- Keep brand voice intimate, elemental, and unhurried.
- Avoid generic superlatives like “stunning,” “breathtaking,” “world-class,” or “paradise awaits.”
- Use specific place names and detailed alt text for imagery.
- Respect WCAG 2.1 AA accessibility requirements.
- `index.html` uses `data-src` on the ambient audio element; replace it with a real URL to activate audio.

## Testing

Run Playwright tests with:

```bash
npm test
```

For UI mode:

```bash
npm run test:ui
```

## Notes

This project is intended as a polished marketing landing page rather than a multi-page application. Keep interactions light, navigation simple, and visuals spacious.

## Security headers

Each page ships a Content-Security-Policy, a `referrer` policy, and a small
clickjacking guard in `<head>`. Four protections cannot be delivered from
markup — browsers honour them only as HTTP response headers — so they are the
host's job. GitHub Pages sends `X-Content-Type-Options: nosniff` and HSTS on
`*.github.io` but nothing else, and it cannot be configured. If the site moves
behind a host that supports custom headers (Netlify `_headers`, Cloudflare,
CloudFront), add:

```text
Content-Security-Policy: frame-ancestors 'none'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Two known, accepted gaps:

- `script-src` keeps `'unsafe-inline'` because every page's JS is inline and the
  site has no build step to maintain per-script hashes. Nothing on the site
  renders user- or URL-supplied content, so there is no injection source to pair
  it with — but this is the policy's weakest point, and moving the JS to hashed
  or external files would close it.
- `upgrade-insecure-requests` is deliberately absent. No page references an
  `http://` URL, and WebKit breaks same-page fragment navigation under that
  directive when the page itself is served over plain http (local dev and CI).

Report vulnerabilities per `.github/SECURITY.md` — do not open a public issue.
