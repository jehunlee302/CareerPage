# Coding Rules

## Architecture

- **Single-page app** — one `index.html`, all content rendered by `assets/js/main.js`
- **No build step** — vanilla HTML/CSS/JS; no bundler, no framework
- **Data-driven** — all content from `data/portfolio.json`; HTML shell has no hardcoded content
- **Static hosting** — deploys to GitHub Pages with no server-side logic

## File Structure

```
index.html              Shell (no inline content)
CNAME                   Custom domain
assets/
  css/style.css         All styles (single file)
  js/main.js            All logic (single file)
  img/                  Images (background.jpg, jehun.jpg)
data/
  portfolio.json        Generated from YAML
  career/               Source YAML (single source of truth)
scripts/
  yaml-to-json.js       Pipeline converter
  sync-sheets.js        Legacy Google Sheets sync
```

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
