# Component Catalog

## Cards

### Base Card
```css
background: var(--bg);
border: 1px solid var(--border);
border-radius: var(--r-lg);  /* 16px */
padding: 1.5rem;
transition: border-color, transform, box-shadow ��� 0.3s cubic-bezier
```
Hover: `border-color: var(--blue)` + `translateY(-2px to -4px)` + shadow

### Featured Card (dark surface)
- `.featured-card` — navy bg, white text
- Click opens project modal
- Badge: PM indicator + project index

### Project Card
- `.project-card` — light surface, 3-col grid (9 per page)
- Footer: PM/Gov't/Topic tags + client
- Click opens project modal

### Award Card
- `.award-card` — date badge, title, description, org
- 3-col grid (6 per page)

### Activity Card
- `.activity-card` — role, org, period, location
- 3-col grid (6 per page)

### Skill Card
- `.skill-card` — category label + tag cloud

## Timeline

Used for Education and Experience sections.

```css
.timeline-item {
  position: relative;
  padding-left: 2.5rem;
  /* ::before — 12px blue dot */
  /* ::after — 2px vertical blue gradient line */
}
```

### Education Timeline Item
- Degree + Major | Period
- Institution
- Advisor link (optional)
- Thesis title (expandable → topic, methodology, performance)

### Experience Timeline Item
- Position | Period
- Organization | Division | Region
- Roles (summary text)
- Responsibilities (bullet list, optional)
- Highlights (tag badges, optional)

## Tags / Badges

| Class | Style | Usage |
|-------|-------|-------|
| `.tag` | blue-dim bg | Default (client, tech) |
| `.tag.pm` | blue bg, white text | PM indicator |
| `.tag.gov` | green-dim | Government project |
| `.tag.topic` | navy-dim | Topic classification |
| `.badge-journal` | blue-dim | Journal publications |
| `.badge-conf` | navy-dim | Conference publications |
| `.badge-poster` | orange-dim | Poster presentations |
| `.badge-1st` | green-dim | 1st author |
| `.badge-domestic` | muted style | Domestic publication |

## Buttons

| Class | Style |
|-------|-------|
| `.btn-primary` | Blue bg, white text, lift on hover |
| `.btn-outline-white` | Transparent, white border → blue on hover |

## Modal

### Project Detail Modal
- `.modal-overlay` — dark backdrop, click-outside closes
- `.modal-content` — white card, max-width 640px
- Sections: Badge, Title, Topics, Fields, Purpose, Tasks, Achievements, Notes
- Close: X button, Escape key, backdrop click

## Pager

Inline pagination for Projects, Publications, Awards, Activities.

```
[← prev] [page / total] [next →]
```

- Filter bar + pager work together
- Filtering resets to page 1
- `data-paged` attribute on each item
- `data-filtered="1"` hides from pagination

## Publication Item

- `.pub-item` — horizontal layout: number | body | side
- Body: authors, title (quoted), venue
- Side: paper link + type/role badges
- Filter by Journal/Conference/Poster + International/Domestic
