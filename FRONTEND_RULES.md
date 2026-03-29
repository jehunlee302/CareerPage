# Frontend Development Rules
**Project:** Jehun Lee's Professional Portfolio
**Site:** https://jehun-lee.work

---

## 1. Architecture

- **Single-page application** — one `index.html`, all content rendered by `assets/js/main.js`
- **No build step** — vanilla HTML/CSS/JS only; no bundler, no framework dependency
- **Data-driven** — all content sourced from `data/portfolio.json`; the HTML shell contains no hardcoded content
- **Static hosting** — must deploy cleanly to GitHub Pages with no server-side logic

## 2. File Structure

```
/
├── index.html              # Shell only; no inline content
├── CNAME                   # Custom domain
├── assets/
│   ├── css/style.css       # All styles (single file)
│   └── js/main.js          # All logic (single file)
├── data/
│   └── portfolio.json      # Single source of truth (auto-updated by Google Apps Script)
├── scripts/
│   └── google-apps-script.js
└── .github/workflows/deploy.yml
```

## 3. JavaScript Conventions

### Module Pattern
```js
// Each render function is a pure function: receives data, returns or writes HTML
function renderSection(data) { ... }
```

### DOM Manipulation
- Use `innerHTML` only with the `esc()` sanitizer for user-sourced strings
- Never use `eval()` or `innerHTML` with raw external data
- Prefer `textContent` for plain text nodes

### Sanitization (mandatory)
```js
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
```

### Error Handling
- Wrap the `fetch` call in try/catch; log errors; do not crash the page
- Gracefully skip any missing section data (`if (!data.section) return;`)
- Always check element existence before writing (`if (!el) return;`)

### Performance
- All non-critical animations use `IntersectionObserver` (not scroll events)
- Scroll listeners must use `{ passive: true }`
- Avoid layout thrashing: batch DOM reads before writes

## 4. HTML Conventions

- Use semantic HTML5: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- Every `<section>` must have a unique `id` matching the nav anchor
- All external links must include `rel="noopener noreferrer"` and `target="_blank"`
- Add `aria-label` to icon-only buttons

## 5. Accessibility

- Minimum contrast ratio 4.5:1 (AA) for all text
- All interactive elements focusable via keyboard
- Navigation toggle button has `aria-label="Toggle menu"`
- Images (if added) must have meaningful `alt` attributes

## 6. SEO

- `<title>` format: `Jehun Lee | [Page Theme]`
- `<meta name="description">` ≤ 160 characters
- Open Graph tags (`og:title`, `og:description`, `og:url`) present in `<head>`
- No duplicate headings; one `<h1>` per page

## 7. Dependency Policy

- Google Fonts is the only allowed external dependency (fonts only)
- No jQuery, no external JS libraries
- No CSS frameworks (Bootstrap, Tailwind, etc.)
- Self-contained; must work offline after first font load (acceptable degradation)

## 8. Code Quality

- No commented-out code in production
- Functions under 40 lines; extract helpers if longer
- Variable names: `camelCase`; constants: `UPPER_SNAKE_CASE`
- Use `const` by default; `let` only when reassignment is required
