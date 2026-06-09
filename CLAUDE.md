# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aloha Escapes is a boutique luxury Hawaiian travel agency. This repo is a static website built around a main landing page in `index.html` with supplemental detail pages in `pages/*.html`. There is no build step, no bundler, and no framework.

## Running Locally

```bash
npx serve -l 3456 .
```

Then open `http://localhost:3456`. The launch config in `.claude/launch.json` documents this.

## Architecture

Everything lives in `index.html`:

- **Design tokens** — CSS custom properties on `:root` at the top of the `<style>` block. All colors use `oklch()`. Typography uses two Google Fonts: `Gloock` (display/serif, headings) and `Jost` (body/sans). Fluid sizing via `clamp()` throughout (`--tx-xs` through `--tx-hero`).
- **Layout** — `.wrap` container (`min(1340px, 100% - 3rem)`) used in every section. Responsive breakpoints at 1080px, 720px, and 480px.
- **Sections in order** — Nav (fixed, scroll-blur), Hero (Ken Burns bg animation, staggered fade-up), Intro (stats grid), Islands (asymmetric photo grid with hover reveals), Experiences (3-col card grid), How We Work (sticky aside + steps), Testimonials (IntersectionObserver scroll reveal), CTA (email capture form), Footer.
- **Ambient audio player** — Fixed bottom bar (`.aplayer`). The `<audio>` element uses `data-src` for lazy loading; the real URL is set on first play to avoid autoload. Currently contains placeholder `YOUR_SUNO_AUDIO_URL_HERE` — replace `data-src` on the `<audio#ambient-audio>` element with the actual audio URL to activate.
- **JS** — Three vanilla JS blocks at the bottom: nav scroll state, testimonial IntersectionObserver reveal, and the audio player IIFE.

## Brand & Design Constraints

See `PRODUCT.md` for the full brief. Key constraints when making changes:

- **No superlatives** — avoid "stunning", "breathtaking", "world-class", "unforgettable", "paradise awaits"
- **Specificity** — name the beach, crater, or dive site; don't use generic category adjectives
- **Restraint signals premium** — whitespace, pacing, and specificity over badges, ratings, or social proof widgets
- **Images on CloudFront** — all `src` URLs point to `d8j0ntlcm91z4.cloudfront.net`; don't swap them for placeholder images
- **Accessibility** — WCAG 2.1 AA minimum; `prefers-reduced-motion` is handled in CSS; all images need descriptive alt text naming the specific place and scene
