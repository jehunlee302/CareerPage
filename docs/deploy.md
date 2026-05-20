# Deployment

## Pre-Deploy Checklist

Before pushing to production, verify:

- [ ] `node scripts/yaml-to-json.js` runs without errors (both en and ko)
- [ ] **Hyperlink verification**: All publication links point to correct papers
- [ ] **EN/KO toggle**: Switch language and verify all sections render correctly
- [ ] **Modal links**: Click featured projects and project cards, verify modal opens with correct data
- [ ] **Pagination**: Navigate through project/publication/award/activity pages
- [ ] **Mobile**: Test on mobile viewport (hamburger nav, single-column grids, lang toggle)
- [ ] **Images**: Profile photo and background load correctly from `assets/img/`
- [ ] **Resume PDF**: Both EN and KO PDFs download correctly

## Pipeline

```
data/career/*.yaml  →  yaml-to-json.js  →  portfolio.json  →  git push  →  GitHub Pages
```

## Deploy Commands

```bash
# Windows: deploy.bat (recommended — handles en+ko build + resume PDF + git push)
deploy.bat

# Manual
node scripts/yaml-to-json.js
node scripts/yaml-to-json.js --lang ko
git add data/portfolio.json data/portfolio.ko.json
git commit -m "build: update portfolio data"
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
- HTTPS enforced via GitHub Pages settings
