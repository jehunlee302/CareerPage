# Data Pipeline

## Current Pipeline (v2 — YAML-based)

```
data/career/*.yaml          ← Edit here (single source of truth)
       │
       ▼  node scripts/yaml-to-json.js
       │
data/portfolio.json         ← Website reads this
       │
       ▼  git push origin main
       │
GitHub Pages                ← Auto-deploy (~30s)
       │
       ▼  GoDaddy CNAME
       │
https://jehun-lee.work
```

### Quick Deploy

```bash
# Option 1: deploy.bat (Windows)
deploy.bat

# Option 2: Manual
node scripts/yaml-to-json.js
git add data/portfolio.json
git commit -m "update: portfolio data"
git push origin main
```

### Bilingual Build

```bash
node scripts/yaml-to-json.js            # English (default)
node scripts/yaml-to-json.js --lang ko  # Korean
```

## Scripts

| Script | Purpose | When to use |
|--------|---------|-------------|
| `scripts/yaml-to-json.js` | YAML → JSON converter | Every deploy |
| `scripts/sync-sheets.js` | Google Sheets → JSON (legacy) | If Sheets still used |
| `scripts/json-to-yaml.js` | JSON → YAML (one-time) | Initial migration only |
| `scripts/split-yaml.js` | Split projects/pubs by year | Reorganization only |

## Legacy Pipeline (v1 — Google Sheets)

```
Google Sheets → sync-sheets.js → portfolio.json → git push → GitHub Pages
```

Still functional via `node scripts/sync-sheets.js` but YAML is now the canonical source.

## File Organization

### data/career/ (Source YAML)

```
basic.yaml              Personal info
philosophy.yaml         Philosophy + stats
education.yaml          Education (4 records)
work.yaml               Work experience (5 records)
projects-2024-2025.yaml Projects by end year (7)
projects-2022-2023.yaml (7)
projects-2020-2021.yaml (3)
projects-2017-2019.yaml (8)
publications-2023-2024.yaml Publications by year (4)
publications-2021-2022.yaml (9)
publications-2019-2020.yaml (7)
publications-2017-2018.yaml (6)
skills.yaml             Skills (3 categories)
honors.yaml             Honors & Awards (10)
patents.yaml            Patents (1)
activities.yaml         Activities (14)
```

### Ordering Convention

- **Newest first** (top of file)
- New entries: insert at the **top** of the list
- New year range: create new file (e.g., `projects-2026-2027.yaml`)
