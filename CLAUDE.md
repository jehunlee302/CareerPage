# CareerPage

Jehun Lee's professional portfolio. https://jehun-lee.work

## Stack

Vanilla HTML/CSS/JS, GitHub Pages, no build step, no framework.

## Data Flow

```
data/career/*.yaml → scripts/yaml-to-json.js → data/portfolio.json → assets/js/main.js → index.html
data/career/*.yaml → scripts/yaml-to-latex.js → latex/sections/*.tex → xelatex → data/resume-{en,ko}.pdf
```

## Key Commands

```bash
node scripts/yaml-to-json.js            # Build JSON from YAML (English)
node scripts/yaml-to-json.js --lang ko  # Build JSON (Korean)
node scripts/yaml-to-latex.js           # Build LaTeX from YAML (English)
node scripts/yaml-to-latex.js --lang ko # Build LaTeX (Korean)
scripts/build-resume.bat                 # Build resume PDFs (en + ko)
deploy.bat                               # Build all + commit + push
```

## File Map

| Path | Purpose |
|------|---------|
| `data/career/` | Source of truth (YAML, bilingual en/ko) |
| `data/portfolio.json` | Generated — do not edit directly |
| `data/resume-en.pdf` | Generated EN resume PDF |
| `data/resume-ko.pdf` | Generated KO resume PDF |
| `latex/resume.cls` | LaTeX resume template class |
| `latex/fonts/` | Pretendard font files for PDF |
| `latex/sections/*.tex` | Generated LaTeX sections — do not edit directly |
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
