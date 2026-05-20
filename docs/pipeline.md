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

## Quick Deploy

```bash
# Option 1: deploy.bat (Windows) — builds en+ko JSON + resume PDFs + git push
deploy.bat

# Option 2: Manual
node scripts/yaml-to-json.js
git add data/portfolio.json
git commit -m "build: update portfolio data"
git push origin main
```

## Bilingual Build

```bash
node scripts/yaml-to-json.js            # English (default)
node scripts/yaml-to-json.js --lang ko  # Korean
```

## Active Scripts

| Script | Purpose | When to use |
|--------|---------|-------------|
| `scripts/yaml-to-json.js` | YAML → JSON converter | Every deploy |
| `scripts/yaml-to-latex.js` | YAML → LaTeX for PDF | Resume rebuild |
| `scripts/build-resume.bat` | LaTeX → en/ko PDFs | Resume rebuild |

## Legacy Scripts (do not use for new work)

| Script | Original Purpose | Status |
|--------|-----------------|--------|
| `scripts/sync-sheets.js` | Google Sheets → JSON | Superseded by YAML pipeline |
| `scripts/json-to-yaml.js` | JSON → YAML migration | One-time use, completed |
| `scripts/split-yaml.js` | Split projects/pubs by year | One-time use, completed |
| `scripts/fill-ko.js` | Korean translation helper | One-time use |

---

## Data Update Rules

Non-periodic data updates require discipline to avoid breaking the live site.
Follow these rules whenever modifying YAML data.

### Pre-Update Checklist

1. **Identify scope** — Which YAML file(s) will change?
2. **Backup** — Ensure git working tree is clean (`git status`)
3. **Edit YAML** — Follow schema in [data/schema.md](data/schema.md)
4. **Build** — Run `node scripts/yaml-to-json.js` (check for errors)
5. **Verify locally** — Open `index.html` in browser, check affected sections
6. **Build Korean** — Run `node scripts/yaml-to-json.js --lang ko`
7. **Toggle EN/KO** — Verify both languages render correctly
8. **Commit** — `git add data/portfolio.json data/portfolio.ko.json`

### YAML Editing Rules

| Rule | Detail |
|------|--------|
| Bilingual fields | Always fill both `en:` and `ko:`. Leave `ko: ""` if translation pending |
| Ordering | Newest entry at **top** of array |
| New year range | Create new file (e.g., `projects-2026-2027.yaml`) |
| Index numbers | Must be unique and sequential. New project = max(existing) + 1 |
| Required fields | See [data/schema.md](data/schema.md) for each section |
| Dates | Format: `YYYY.MM - YYYY.MM` (period), `Nm` (duration) |

### Common Update Scenarios

#### Adding a new project
1. Open `data/career/projects-YYYY-YYYY.yaml` (create new file if needed)
2. Insert at top with next index number
3. Fill all required fields: `index`, `period`, `title`, `client`, `affiliated_institution`, `is_pm`
4. Optionally add `details:` block (purpose, role, tasks, achievements)
5. Build and verify

#### Adding a new publication
1. Open `data/career/publications-YYYY-YYYY.yaml`
2. Insert at top with next index number
3. Required: `index`, `year`, `type`, `global`, `role`, `authors`, `title`, `venue`
4. Add `link:` if paper URL available

#### Updating personal info
1. Edit `data/career/basic.yaml`
2. Update both `en:` and `ko:` values
3. Build and verify hero section renders correctly

### Rollback

If a deploy breaks the site:
```bash
git revert HEAD          # Revert last commit
git push origin main     # Push revert to trigger re-deploy
```

### Validation

The pipeline currently has no schema validation.
Manually verify after each build:
- Console shows correct item counts (education, projects, publications, etc.)
- No `⚠ not found` warnings
- Output file size is reasonable (~50KB for English)

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
