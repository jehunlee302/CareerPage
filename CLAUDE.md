# CareerPage

Jehun Lee's professional portfolio. https://jehun-lee.work

## Stack

Vanilla HTML/CSS/JS, GitHub Pages, no build step, no framework.

## Data Flow

```
data/career/*.yaml → scripts/yaml-to-json.js → data/portfolio.json → assets/js/main.js → index.html
```

## Key Commands

```bash
node scripts/yaml-to-json.js            # Build JSON from YAML (English)
node scripts/yaml-to-json.js --lang ko  # Build JSON (Korean)
deploy.bat                               # Build + commit + push
```

## File Map

| Path | Purpose |
|------|---------|
| `data/career/` | Source of truth (YAML, bilingual en/ko) |
| `data/portfolio.json` | Generated — do not edit directly |
| `assets/js/main.js` | All rendering logic |
| `assets/css/style.css` | All styles |
| `index.html` | Shell (no hardcoded content) |
| `docs/` | Full documentation |
| `docs/index.md` | Docs file map |

## Rules

- Read `docs/rules/coding.md` before editing JS/HTML/CSS
- Read `docs/ui/design-system.md` before changing visual design
- Read `docs/engine/schema.md` before modifying YAML structure
- All user strings must pass through `esc()` sanitizer
- No external JS/CSS libraries (Google Fonts only)
