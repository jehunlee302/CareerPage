# Product Spec

## Vision

Jehun Lee's professional portfolio — a single-page, data-driven website that presents career history, research output, and professional philosophy to recruiters, research partners, and consulting clients.

## Live URL

https://jehun-lee.work (GitHub Pages + GoDaddy CNAME)

## Target Audience

- AI research partners
- Recruiters (industry & academia)
- System consulting clients (semiconductor, manufacturing)

## Site Sections

| Section | Data Source | Key Feature |
|---------|-----------|-------------|
| Hero | basic.yaml | Typewriter titles, profile photo, social links |
| Impact Strip | Computed from projects/publications | Auto-counted stats |
| Philosophy | philosophy.yaml | "Systemic Excellence" + 3 pillars |
| Research Focus | Hardcoded in main.js | 6 research interest cards |
| Education | education.yaml | Timeline + expandable thesis details |
| Experience | work.yaml | Timeline + responsibilities bullet list |
| Featured Projects | projects-*.yaml (indices 25,23,21) | 3-card grid, click → modal |
| All Projects | projects-*.yaml | Paginated grid, topic/PM/Gov't filters |
| Publications | publications-*.yaml | Paginated list, type filters, paper links |
| Awards | honors.yaml | Paginated 3-col grid |
| Patents | patents.yaml | Card list |
| Activities | activities.yaml | Paginated grid |
| Skills | skills.yaml | Category cards |
| Contact | basic.yaml | Email, LinkedIn, Scholar, Google Site |

## Non-Functional Requirements

- No build step: vanilla HTML/CSS/JS only
- No framework dependencies
- Static hosting (GitHub Pages)
- Google Fonts is the only external dependency
- Must work offline after first font load (graceful degradation)
- WCAG AA contrast (4.5:1)

## Data Architecture

```
data/career/*.yaml   (Single Source of Truth, bilingual en/ko)
       │
       ▼  node scripts/yaml-to-json.js [--lang en|ko]
       │
data/portfolio.json  (Generated, consumed by main.js)
       │
       ▼  git push → GitHub Pages
       │
https://jehun-lee.work
```
