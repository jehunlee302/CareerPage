# Deployment

## Pre-Deploy Checklist

Before pushing to production, verify:

- [ ] `node scripts/yaml-to-json.js` runs without errors (both en and ko)
- [ ] **Hyperlink verification**: All publication links point to correct papers
  - Open each `View Paper` link and confirm the paper title matches
  - Check IEEE Xplore links (`ieeexplore.ieee.org/document/XXXXXXX`)
  - Check Springer links (`link.springer.com/...`)
  - Check for any remaining page-title-as-URL values (not actual URLs)
- [ ] **EN/KO toggle**: Switch language and verify all sections render correctly
  - Section labels, nav, filter buttons switch language
  - Data content (projects, experience, education) switches language
  - No mixed-language content (English data with Korean labels or vice versa)
- [ ] **Modal links**: Click featured projects and project cards, verify modal opens with correct data
- [ ] **Pagination**: Navigate through project/publication/award/activity pages
- [ ] **Mobile**: Test on mobile viewport (hamburger nav, single-column grids, lang toggle)
- [ ] **Images**: Profile photo and background load correctly from `assets/img/`
- [ ] **Resume PDF**: If `data/resume.pdf` exists, download button works

## Pipeline

```
data/career/*.yaml  →  yaml-to-json.js  →  portfolio.json  →  git push  →  GitHub Pages
```

## Deploy Commands

```bash
# Windows: double-click
deploy.bat

# Manual
node scripts/yaml-to-json.js
git add data/portfolio.json
git commit -m "update: portfolio data"
git push origin main
```

## GitHub Pages

- Source: **GitHub Actions** (not branch deploy)
- Trigger: push to `main`
- No build step — site deployed as-is from repo root
- Permissions: `pages: write`, `id-token: write`
- CNAME: `jehun-lee.work`

## DNS (GoDaddy)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| CNAME | www | `jehunlee302.github.io` | 3600 |

## Security

- No API keys in client-side JS
- `data/portfolio.json` — public professional info only
- External links: `rel="noopener noreferrer"`
- GitHub PAT (for legacy Sheets sync): fine-grained, `Contents: Read and write` only
- HTTPS enforced via GitHub Pages settings

## Google Sheets (Legacy)

Still functional if needed:
```bash
node scripts/sync-sheets.js
```
Sheet ID: `1PM15NIZml_i96kSzhVbnP7i4PTiUiZkXqztDW-pzAS4`
Requires: sheet shared as "Anyone with link (Viewer)"
