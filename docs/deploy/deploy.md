# Deployment

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
