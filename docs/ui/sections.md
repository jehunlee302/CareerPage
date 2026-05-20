# Section Layout Map

Sections alternate light/dark for visual rhythm.

## Order (top to bottom)

| # | Section | ID | Background | Key Element |
|---|---------|----|-----------:|-------------|
| 1 | Hero | `#hero` | Dark (navy + bg image) | Typewriter, photo orbit, CTA |
| 2 | Impact Strip | `#impact` | Navy | Auto-counted stats |
| 3 | Philosophy | `#philosophy` | Dark (navy) | Headline, lead, body, 3 pillars |
| 4 | Research Focus | `#research` | White | 6 research cards (3-col) |
| 5 | Education | `#education` | Light (bg) | Timeline + thesis expand |
| 6 | Experience | `#experience` | Alt (bg-alt) | Timeline + responsibilities |
| 7 | Featured Projects | `#featured` | Dark (navy) | 3 highlight cards |
| 8 | All Projects | `#projects` | White | Filtered/paged grid (3-col) |
| 9 | Publications | `#publications` | Alt (bg-alt) | Filtered/paged list |
| 10 | Awards | `#awards` | White | Paged 3-col grid |
| 11 | Patents | `#patents` | Alt (bg-alt) | Card list |
| 12 | Activities | `#activities` | White | Paged 3-col grid |
| 13 | Skills | `#skills` | Alt (bg-alt) | Category card cloud |
| 14 | Contact | `#contact` | Dark (navy) | Email, social links |
| 15 | Footer | `footer` | Dark (navy) | Name, copyright, updated |

## Navigation

Nav bar: `Philosophy → Education → Experience → Projects → Publications → Awards → Contact`

- Sticky header with scroll shadow
- Active section highlighted via `IntersectionObserver`
- Mobile: hamburger toggle → dropdown

## Responsive Grid Behavior

| Breakpoint | Grid Layout | Notes |
|------------|------------|-------|
| Desktop (>= 960px) | 3 columns | Default for all card grids |
| Tablet (< 768px) | 2 columns | Projects, awards, activities, research, featured |
| Small (< 480px) | 1 column | Everything stacks vertically |
