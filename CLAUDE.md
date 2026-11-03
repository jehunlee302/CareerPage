# CareerPage — Jehun Lee portfolio static site

Rules not visible in the code. Live: https://jehun-lee.work. Requirements: [docs/PRD.md](docs/PRD.md). File map: [docs/INDEX.md](docs/INDEX.md).

- Vanilla HTML/CSS/JS + GitHub Pages, **no build step, no framework**.
- **Every user string goes through the `esc()` sanitizer** (XSS; no inline rendering).
- **No external JS/CSS libraries** (Google Fonts only).
- SSOT = `data/career/*.yaml`. **Never edit generated files directly**: `data/portfolio.json` and `latex/sections/*.tex` come only from editing YAML and building. Flow and commands: `docs/pipeline.md`.
- After a data change, run `deploy.bat` or `node scripts/yaml-to-json.js` before committing.
- No backlog file; track work as PRD rows. Human to-dos: `docs/user-actions.md`.
- `docs/_old/` is history: do not read by default, do not delete.
