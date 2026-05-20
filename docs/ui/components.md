# Component Catalog

Quick reference for all reusable UI components.
See [design-system.md](design-system.md) for colors, spacing, and typography tokens.

## Cards

### Base Card Pattern

All cards share this foundation:

```css
background: var(--bg);        /* or var(--white) on alt sections */
border: 1px solid var(--border);
border-radius: var(--r-lg);   /* 16px */
padding: 1.4-1.75rem;
transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
```

Hover: `border-color: var(--blue)` + `translateY(-2px to -4px)` + subtle shadow.

### Featured Card (dark surface)

- Class: `.featured-card`
- Background: `rgba(255,255,255,.04)` on navy
- Text: white
- Click opens project modal
- Badge: PM indicator + project index
- Grid: 3-col (`.featured-grid`)

### Project Card

- Class: `.project-card`
- Background: `var(--bg)` (light)
- Grid: 3-col (`.projects-grid`), 9 per page
- Footer: PM/Gov't/Topic tags + client
- Click opens project modal
- Meta: `#index` + period + "Details ↗" hint

### Award Card

- Class: `.award-card`
- Date badge (blue text or blue pill for ranges)
- Title, description, organization
- Grid: 3-col (`.awards-list`), 6 per page

### Activity Card

- Class: `.activity-card`
- Role (blue uppercase), org, period, location
- Grid: 3-col (`.activities-grid`), 6 per page

### Skill Card

- Class: `.skill-card`
- Category label (blue uppercase) + tag cloud
- Grid: auto-fill `minmax(220px, 1fr)`

---

## Timeline

Used for Education and Experience sections.

```css
.timeline {
  position: relative;
  padding-left: 2.5rem;
}
/* Vertical blue gradient line */
.timeline::before {
  left: 0.5rem; width: 2px;
  background: linear-gradient(to bottom, var(--blue), rgba(0,122,255,.08));
}
/* Blue dot for each item */
.timeline-item::before {
  width: 10px; height: 10px;
  background: var(--blue);
  border: 3px solid var(--bg);
  border-radius: 50%;
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
- Expandable: Responsibilities (bullet list) + Highlights (tag badges)

---

## Tags / Badges

| Class | Style | Usage |
|-------|-------|-------|
| `.tag` | `--blue-dim` bg, `--blue` text | Default (client, tech) |
| `.tag.pm` | Green bg (`#047857`) | PM indicator |
| `.tag.gov` | Purple bg (`#7C3AED`) | Government project |
| `.tag.topic` | Navy-dim bg, `--text-mid` | Topic classification |
| `.badge-journal` | `--blue-dim` bg | Journal publications |
| `.badge-conf` | Navy-dim bg | Conference publications |
| `.badge-poster` | Orange-dim bg | Poster presentations |
| `.badge-1st` | Green-dim bg | 1st author |
| `.badge-domestic` | Subtle border + bg | Domestic publication |

All badges: `font-size: 0.7rem`, `font-weight: 700`, `border-radius: 4px` (rectangular) or `20px` (pill).

---

## Buttons

| Class | Style | Usage |
|-------|-------|-------|
| `.btn-primary` | Blue bg, white text | Primary CTAs (Contact Me) |
| `.btn-outline-white` | Transparent, white border | Hero action buttons |
| `.btn-ghost` | No border, muted text | De-emphasized links |

All buttons: `padding: 0.65rem 1.35rem`, `border-radius: 7px`, `font-weight: 600`.
Hover: lift (`translateY(-2px)`) + glow shadow.

---

## Filter Buttons

```css
.filter-btn {
  padding: 0.35rem 0.85rem;
  border-radius: 20px;           /* pill shape */
  font-size: 0.76rem;
  font-weight: 600;
  border: 1.5px solid var(--border);
  color: var(--text-muted);
}
.filter-btn.active, .filter-btn:hover {
  border-color: var(--blue);
  color: var(--blue);
  background: var(--blue-dim);
}
```

Used in: Projects (topic/PM/Gov't), Publications (type).

---

## Modal

### Project Detail Modal

- `.modal-overlay` — dark backdrop (`rgba(10,25,47,.82)` + `backdrop-filter: blur(4px)`)
- `.modal-content` — white card, `max-width: 580px`, `max-height: 85vh`, scrollable
- Close: X button (`.modal-close`), Escape key, backdrop click
- Sections: Badge → Title → Topics → Fields → Situation → Purpose → Tasks → Achievements → Notes

```css
.modal-overlay.open { opacity: 1; pointer-events: all; }
.modal-overlay.open .modal-content { transform: translateY(0); }
```

---

## Pager

Inline pagination for Projects, Publications, Awards, Activities.

```
[← prev] [page / total] [next →]
```

- Top pager in section header (`.paged-nav-inline`)
- Bottom pager auto-generated below grid (`.paged-nav-bottom`)
- Filter bar + pager work together: filtering resets to page 1
- `data-paged` attribute on each item
- `data-filtered="1"` hides from pagination count

---

## Publication Item

- `.pub-item` — horizontal layout: number | body | side
- Body: authors, title (quoted), venue
- Side: paper link + type/role badges
- At mobile (< 768px): body and side stack vertically

---

## Adding New Components

When creating a new component:

1. Follow the base card pattern (border, radius, hover, transition)
2. Use design system tokens for colors and spacing
3. Add responsive behavior at 768px breakpoint
4. Add `reveal` class for scroll animation
5. Document the component in this file
