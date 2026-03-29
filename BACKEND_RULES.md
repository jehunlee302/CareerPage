# Backend / Automation Rules
**Project:** Jehun Lee's Professional Portfolio
**Site:** https://jehun-lee.work

---

## 1. Architecture Overview

```
Google Sheets (content source)
    ↓  onEdit trigger
Google Apps Script (scripts/google-apps-script.js)
    ↓  GitHub REST API (PUT /contents)
GitHub Repository (data/portfolio.json updated)
    ↓  push to main
GitHub Actions (.github/workflows/deploy.yml)
    ↓  upload-pages-artifact + deploy-pages
GitHub Pages → jehun-lee.work (via GoDaddy CNAME)
```

**There is no server.** The backend is entirely event-driven automation.

---

## 2. Google Sheets — Schema Rules

### Tab Naming (must match CONFIG.SHEETS in Apps Script)
| Tab Name | Section |
|----------|---------|
| `basic` | Personal info |
| `education` | Degrees |
| `work experience` | Jobs |
| `projects` | Research/industry projects |
| `academic works` | Publications |
| `skills` | Technical skills |
| `honors and awards` | Recognition |
| `patents` | IP |
| `activities and leadership` | Service & activities |

### General Schema Rules
1. Row 1 is always the **header row** — never delete it
2. Column order must not change — Apps Script uses positional index (`r[0]`, `r[1]`, etc.)
3. Empty rows between data are ignored (`filter(r => r[0])`) — safe to leave
4. Dates: use `YYYY.MM` or `YYYY.MM.DD` format for consistent parsing
5. Multiple values in one cell: separate with ` / ` (space-slash-space)

### Per-Tab Column Rules

**basic** — Column A: Category name, Column B: Value
- `Name`, `Professional Title`, `Email`, `Website`, `Location` must all be present

**education** — `Degree | Institution | Period | Major | Region | Remarks`

**work experience** — `Position | Organization | Division | Period | Roles & Responsibilities | Performance | Region`

**projects** — `Index | Period | n(entire) | Project title | Client | Partner Institution | Affiliated Institution | [skill cols...] | Remarks`
- Index must be a unique integer (used for sorting)
- Last column is always Remarks

**academic works** — `Index | Materials (full citation) | Type | Paper(O/X) | Paper Link | Role | Remarks | Year | Global(O/X)`
- Type must be one of: `Journal`, `Conference`, `Poster`
- Role must be one of: `1st Author`, `Co-Author`
- Global: `O` = international, blank = domestic

**skills** — Column A: Category, Column B: comma-separated values

**honors and awards** — `Date | Award Title | Description | Awarding Organization | Location | Remarks`

**patents** — `Patent Title | Description | Application date | Application number | Applicant | Authority`

**activities and leadership** — `Role | Organization | Location | Period`

---

## 3. Google Apps Script — Rules

### Secrets Management
- GitHub Token stored in **Script Properties** only (`Properties Service`)
- Never hardcode credentials in the script body
- Never log the token value
- Token requires `repo` scope (or `public_repo` if repo is public)

### Function Rules
- `syncToGitHub()` — main entry; must complete in < 30s (Apps Script timeout)
- `setupTrigger()` — run once manually; idempotent (removes existing before creating)
- `testSync()` — manual test alias; must not be registered as a trigger
- All parser functions must be pure: `parseX(ss) → data`

### Error Handling
- Wrap GitHub API call in try/catch; log response code on failure
- If sheet tab not found, return empty array/object (do not crash)
- Log all successes and failures via `Logger.log()`

### Trigger Type
- Use `onEdit()` trigger (not `onChange()`) for immediate sync on cell edit
- If the sheet has large data and sync is slow, switch to time-based trigger (every 5 min)

---

## 4. data/portfolio.json — Data Contract

### Required Top-Level Keys
```json
{
  "lastUpdated": "YYYY-MM-DD",
  "basic": { ... },
  "philosophy": { ... },
  "stats": [ ... ],
  "education": [ ... ],
  "workExperience": [ ... ],
  "projects": [ ... ],
  "publications": [ ... ],
  "skills": { ... },
  "honors": [ ... ],
  "patents": [ ... ],
  "activities": [ ... ]
}
```

### Rules
1. `lastUpdated` must be ISO date string `YYYY-MM-DD`
2. Arrays must never be `null` — use empty array `[]` instead
3. Objects must never be `null` — use empty object `{}` instead
4. All string values must be safe to render after HTML escaping
5. `philosophy` and `stats` are static (managed in Apps Script `getPhilosophy()` / `getStats()`) — update Apps Script to change them
6. Do not remove any top-level key — UI sections will silently skip missing data, but the key should remain for clarity

---

## 5. GitHub Actions — Rules

### Workflow File: `.github/workflows/deploy.yml`
- Trigger: `push` to `main` branch only
- Permissions: `pages: write`, `id-token: write` (required for OIDC deployment)
- Concurrency group: `"pages"` with `cancel-in-progress: true`
- No build step — site is deployed as-is from the repo root

### Repository Settings Required
1. GitHub Pages source: **GitHub Actions** (not branch)
2. `CNAME` file at repo root (already created)
3. Do NOT add other `*.yml` workflows that deploy to Pages

### Secrets Required
- None for GitHub Actions itself (uses OIDC)
- `GITHUB_TOKEN` and `GITHUB_REPO` must be set in **Google Apps Script Properties** (not GitHub Secrets)

---

## 6. GoDaddy → GitHub Pages DNS Setup

In GoDaddy DNS management for `jehun-lee.work`:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| CNAME | www | `your-username.github.io` | 3600 |

After DNS propagates (up to 24h), enable HTTPS in GitHub repo Settings > Pages.

---

## 7. Security Rules

- No API keys in client-side JavaScript
- `data/portfolio.json` contains only public professional information
- External links use `rel="noopener noreferrer"` to prevent tab-napping
- GitHub Personal Access Token must be a **fine-grained PAT** with minimum permissions:
  - Repository: `Contents: Read and write`
  - No other permissions needed

---

## 8. Content Update Workflow

1. Open Google Sheet → Edit content → Save
2. Apps Script auto-triggers → parses all tabs → commits `data/portfolio.json` to GitHub
3. GitHub Actions detects push → deploys updated site to GitHub Pages
4. `jehun-lee.work` shows updated content within ~2 minutes

**Manual override:** Run `testSync()` in Apps Script editor to force a sync without editing the sheet.
