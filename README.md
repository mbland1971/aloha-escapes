
# Aloha Escapes

Aloha Escapes is a boutique luxury Hawaiian travel agency website. This repo is a static site built from a main landing page in `index.html` with supplemental detail pages under `pages/`.

## Project overview

- Static site written as a single `index.html` file.
- No build step or framework required.
- Designed for high-end Hawaiian travel clients with premium, restrained visuals and accessible interactions.
- Uses inline CSS and JavaScript for layout, animation, responsive behavior, and a lazy-loading ambient audio player.

## Repo structure

- `index.html` — main website file containing HTML, CSS, and JavaScript.
- `pages/accessibility.html`, `pages/diving.html`, `pages/privacy.html`, `pages/terms.html` — auxiliary static pages.
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
