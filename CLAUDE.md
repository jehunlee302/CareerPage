# CareerPage

Jehun Lee's professional portfolio. https://jehun-lee.work

## Stack

Vanilla HTML/CSS/JS, GitHub Pages, no build step, no framework.

## Quick Start

```bash
npm install                              # First time only (js-yaml)
node scripts/yaml-to-json.js            # Build JSON (English)
node scripts/yaml-to-json.js --lang ko  # Build JSON (Korean)
deploy.bat                               # Full build + commit + push
```

## Data Flow

```
data/career/*.yaml  →  yaml-to-json.js  →  portfolio.json  →  main.js  →  index.html
data/career/*.yaml  →  yaml-to-latex.js  →  latex/sections/*.tex  →  xelatex  →  resume-{en,ko}.pdf
```

## File Map

| Path | Purpose | Editable? |
|------|---------|-----------|
| `data/career/*.yaml` | Source of truth (bilingual en/ko) | Yes |
| `data/portfolio.json` | Generated JSON for website | No (generated) |
| `data/resume-{en,ko}.pdf` | Generated resume PDFs | No (generated) |
| `assets/js/main.js` | All rendering logic | Yes |
| `assets/css/style.css` | All styles | Yes |
| `index.html` | Shell (no hardcoded content) | Yes |
| `scripts/yaml-to-json.js` | YAML → JSON pipeline | Yes |
| `scripts/yaml-to-latex.js` | YAML → LaTeX pipeline | Yes |

## Rules (Must Read Before Editing)

| What you're doing | Read first |
|-------------------|------------|
| **Any contribution** | [docs/contributing.md](docs/contributing.md) |
| JS / HTML / CSS | [docs/coding.md](docs/coding.md) |
| Visual design | [docs/ui/design-system.md](docs/ui/design-system.md) |
| Components | [docs/ui/components.md](docs/ui/components.md) |
| YAML data structure | [docs/data/schema.md](docs/data/schema.md) |
| Deploy process | [docs/deploy.md](docs/deploy.md) |
| Data pipeline | [docs/pipeline.md](docs/pipeline.md) |

## Critical Constraints

- All user strings must pass through `esc()` sanitizer
- No external JS/CSS libraries (Google Fonts only)
- Never edit `data/portfolio.json` directly — edit YAML, then build
- Never edit `latex/sections/*.tex` directly — edit YAML, then build

## Git Conventions

- Branch naming: `feat/`, `fix/`, `docs/`, `refactor/`
- Commit message: `type: short description` (e.g., `feat: add search filter`)
- Types: `feat`, `fix`, `refactor`, `docs`, `build`, `style`
- Always run `deploy.bat` or `node scripts/yaml-to-json.js` before committing data changes

## Documentation

Full docs at [docs/index.md](docs/index.md).
