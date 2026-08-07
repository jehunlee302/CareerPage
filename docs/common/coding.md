# Coding Rules

## Architecture

- **Single-page app** — one `index.html`, all content rendered by `assets/js/main.js`
- **No build step** — vanilla HTML/CSS/JS; no bundler, no framework
- **Data-driven** — all content from `data/portfolio.json`; HTML shell has no hardcoded content
- **Static hosting** — deploys to GitHub Pages with no server-side logic

## File Structure

See `CLAUDE.md` for full file map. Key files for frontend development:

- `index.html` — Shell (no inline content)
- `assets/css/style.css` — All styles (single file)
- `assets/js/main.js` — All logic (single file)
- `data/portfolio.json` — Generated from YAML (do not edit directly)

## JavaScript

### Conventions
- `const` by default; `let` only when reassignment is required
- Variable names: `camelCase`; constants: `UPPER_SNAKE_CASE`
- Functions under 40 lines; extract helpers if longer
- No commented-out code in production
- Each render function is pure: receives data, writes HTML

### Sanitization (mandatory)
All user-sourced strings must pass through `esc()`:
```js
function esc(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
```

### DOM
- Use `innerHTML` only with `esc()` sanitizer
- Never use `eval()` or `innerHTML` with raw external data
- Check element existence before writing: `if (!el) return;`
- Gracefully skip missing data: `if (!data.section) return;`

### Performance
- `IntersectionObserver` for animations (not scroll events)
- Scroll listeners: `{ passive: true }`
- Batch DOM reads before writes
- Use event delegation (`onclick` on parent) instead of per-element listeners

## HTML

- Semantic HTML5: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- Every `<section>` has a unique `id` matching nav anchor
- External links: `rel="noopener noreferrer"` + `target="_blank"`
- Icon-only buttons: `aria-label` required

## Accessibility

- Contrast: 4.5:1 minimum (WCAG AA)
- All interactive elements keyboard-focusable
- Focus ring: 2px `var(--blue)` outline
- Color not sole state indicator

## SEO

- `<title>`: `Jehun Lee | [Theme]`
- `<meta description>`: max 160 chars
- Open Graph tags in `<head>`
- One `<h1>` per page

## Dependencies

- **Allowed**: Google Fonts (Pretendard CDN)
- **Forbidden**: jQuery, external JS libraries, CSS frameworks
- **Node.js** (dev only): `js-yaml` for YAML parsing in build scripts

---

## Performance Optimization

This site is static HTML/CSS/JS on GitHub Pages CDN.
These rules ensure fast loading even under traffic spikes.

### Asset Budget

| Asset | Max Size | Current |
|-------|----------|---------|
| `style.css` | 40 KB | ~33 KB |
| `main.js` | 45 KB | ~37 KB |
| `portfolio.json` | 60 KB | ~52 KB |
| Images (total) | 500 KB | ~350 KB |
| **Total page weight** | **< 700 KB** | ~470 KB |

### Loading Rules

1. **CSS in `<head>`** — `style.css` loaded synchronously (render-blocking is OK for single file)
2. **JS at end of `<body>`** — `main.js` loads after HTML parsed
3. **Font: preload** — Pretendard loaded via `<link rel="stylesheet">` with CDN (jsdelivr)
4. **Images: lazy load** — Background image via CSS `url()`, profile photo loads with page
5. **No external JS** — Zero third-party scripts (no analytics, no tracking, no chat widgets)
6. **JSON fetch** — Single `fetch()` call on DOMContentLoaded; browser caches after first load

### Rendering Rules

1. **No layout thrashing** — Each render function builds HTML string, then assigns `innerHTML` once
2. **IntersectionObserver only** — No `scroll` event listeners for animations (except navbar with `{ passive: true }`)
3. **Event delegation** — `onclick` on grid containers, not individual cards
4. **Minimal reflows** — Use `transform` and `opacity` for animations (GPU-composited)
5. **`display: none`** for pagination — Hidden items removed from layout, not just invisible

### Caching Strategy

GitHub Pages serves with:
- Strong CDN caching (Fastly)
- `Cache-Control` for static assets
- HTTPS enforced

To bust cache after deploy, users may need hard-refresh (`Ctrl+Shift+R`).
Consider adding version query strings to CSS/JS if cache issues arise:
```html
<link rel="stylesheet" href="assets/css/style.css?v=4.0">
```

### Image Optimization

- `background.jpg`: JPEG, compressed, served via CSS background
- `jehun.jpg`: JPEG, profile photo, max 200KB recommended
- Fallback: `photo-fallback` div with initials if image fails
- No SVG sprites — inline SVG for icons (small footprint)

### What NOT to Do

- Do not add Google Analytics or third-party scripts
- Do not lazy-load the single CSS file
- Do not split JS into multiple files (single file is faster for this scale)
- Do not use `requestAnimationFrame` loops for animations (CSS transitions are sufficient)
- Do not load fonts via `@import` in CSS (use `<link>` in HTML head)
