# Section Layout Map

Sections alternate light/dark for visual rhythm.

## Order (top to bottom)

| # | Section | ID | Background | Key Element |
|---|---------|----|-----------:|-------------|
| 1 | Hero | `#hero` | Dark (navy + bg image) | Typewriter, photo orbit, CTA |
| 2 | Impact Strip | `#impact` | Blue gradient | Auto-counted stats |
| 3 | Philosophy | `#philosophy` | Light | Headline, lead, body, 3 pillars |
| 4 | Research Focus | `#research` | Light | 6 research cards |
| 5 | Education | `#education` | Light | Timeline + thesis expand |
| 6 | Experience | `#experience` | Alt (slate) | Timeline + responsibilities |
| 7 | Featured Projects | `#featured` | Dark (navy) | 3 highlight cards |
| 8 | All Projects | `#projects` | Light | Filtered/paged grid |
| 9 | Publications | `#publications` | Alt (slate) | Filtered/paged list |
| 10 | Awards | `#awards` | Light | Paged 3-col grid |
| 11 | Patents | `#patents` | Alt (slate) | Card list |
| 12 | Activities | `#activities` | Light | Paged grid |
| 13 | Skills | `#skills` | Alt (slate) | Category card cloud |
| 14 | Contact | `#contact` | Dark (navy) | Email, social links |
| 15 | Footer | `footer` | Dark (navy) | Name, copyright, updated |

## Navigation

Nav bar: `Philosophy → Education → Experience → Projects → Publications → Awards → Contact`

- Sticky header with scroll shadow
- Active section highlighted via `IntersectionObserver`
- Mobile: hamburger toggle → dropdown
