# CareerPage — Jehun Lee portfolio static site

Global rules live in `~/.claude/` (do not copy them here). Live: https://jehun-lee.work

Read first: `docs/PRD.md` (goal, in progress, rows) → linked `docs/prd/<area>.md#<id>` → file map `docs/INDEX.md`.

## Project rules (only what differs from global)
- Portfolio static site. Vanilla HTML/CSS/JS + GitHub Pages, **no build step, no framework**.
- **Every user string goes through the `esc()` sanitizer** (XSS; no inline rendering).
- **No external JS/CSS libraries** (Google Fonts only).
- **Never edit generated files directly**: `data/portfolio.json` and `latex/sections/*.tex` come only from editing YAML and building.
- After a data change, run `deploy.bat` or `node scripts/yaml-to-json.js` before committing.
- Docs: Korean for humans (PRD, prd/, INDEX), English for agent files. No backlog file; track work as PRD rows.

## Data pipeline (SSOT = `data/career/*.yaml`)
- Flow, build commands, update rules: `docs/pipeline.md`.
- Editable: `data/career/*.yaml`, `assets/js/main.js`, `assets/css/style.css`, `index.html`, `scripts/*.js`.

## Key docs
- Stack `docs/common/stack.md` · coding `docs/common/coding.md` · file map/structure `docs/contributing.md` · deploy `docs/deploy.md` · pipeline `docs/pipeline.md`
- UI `docs/ui/{design-system,components,sections}.md` · data `docs/data/{schema,converter}.md` · QA `docs/qa/user-scenarios.md`
- Human to-dos `docs/user-actions.md` · archive (history, old backlog/spec) `docs/_old/`
