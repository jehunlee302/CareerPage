# Design System

## Aesthetic

Professional, data-dense, confident. Every element has a purpose.
Dark navy anchors the brand; electric blue highlights interaction.

---

## Color System

| Token | Hex | Usage |
|-------|-----|-------|
| `--navy` | `#0A192F` | Hero, Philosophy, Contact, Footer backgrounds |
| `--navy-mid` | `#112240` | Secondary dark surfaces |
| `--navy-light` | `#1D3461` | Hover states on dark surfaces |
| `--blue` | `#007AFF` | Primary accent: CTAs, active states, badges |
| `--blue-light` | `#4DA3FF` | Hover on dark backgrounds |
| `--blue-dim` | `rgba(0,122,255,.12)` | Badge/tag backgrounds, focus rings |
| `--bg` | `#F8FAFC` | Primary light background |
| `--bg-alt` | `#EEF2F7` | Alternate section background |
| `--white` | `#FFFFFF` | Cards, clean surfaces |
| `--text` | `#0A192F` | Primary body text |
| `--text-mid` | `#334155` | Secondary text (labels, subtitles) |
| `--text-muted` | `#64748B` | Tertiary text (dates, metadata) |
| `--border` | `#E2E8F0` | Card/divider borders |

### Color Rules

- Never use colors outside this palette
- `--blue` is reserved for **interactive** elements only (links, buttons, hover states)
- Dark sections: body text `rgba(255,255,255, >= .55)` for WCAG AA compliance
- Never use pure black (`#000`) — use `--navy` instead
- Badge colors: PM=green(`#047857`), Gov't=purple(`#7C3AED`), Topic=navy-dim

---

## Typography

**Font:** Pretendard (CDN, loaded in `index.html`)
**Fallback:** `system-ui, sans-serif`

### Size Scale (All Roles)

| Role | Size | Weight | Where Used |
|------|------|--------|------------|
| Hero H1 | `clamp(2.8rem, 5.5vw, 4.2rem)` | 800 | Hero name |
| Philosophy headline | `clamp(3rem, 7vw, 5.5rem)` | 800 | "Systemic Excellence" |
| Section title (H2) | `clamp(1.75rem, 3vw, 2.5rem)` | 700 | Every section heading |
| Card title (H3) | `0.9-0.97rem` | 600-700 | Project, award, skill cards |
| Body | `1rem` (16px) | 400 | General text |
| Small / meta | `0.77-0.84rem` | 500 | Dates, metadata, descriptions |
| Badge / label | `0.7-0.75rem` | 700 | Tags, badges, section labels |
| Minimum size | `0.70rem` | — | Nothing smaller than this |

### Typography Rules

- Display headings: `letter-spacing: -0.02em` to `-0.04em`
- Line height: `1.15` headings, `1.7` body, `1.6` lead text
- Section labels: `text-transform: uppercase`, `letter-spacing: 0.1-0.15em`
- Never use `font-size` below `0.70rem` (readability floor)
- Korean text renders well at same sizes due to Pretendard optimization

---

## Spacing System

**Base unit:** 8px (`0.5rem`)
**Grid:** 8-point grid — all spacing values are multiples of 8px.

### Spacing Scale

| Token | rem | px | Common Use |
|-------|-----|-----|------------|
| `xs` | `0.25rem` | 4px | Icon gaps, badge padding-y |
| `sm` | `0.5rem` | 8px | Inline gaps, tag margins |
| `md` | `0.75rem` | 12px | Small card padding |
| `base` | `1rem` | 16px | Standard gap |
| `lg` | `1.25rem` | 20px | Grid gaps |
| `xl` | `1.5rem` | 24px | Card padding |
| `2xl` | `2rem` | 32px | Container side padding |
| `3xl` | `2.5rem` | 40px | Timeline left padding |
| `4xl` | `4rem` | 64px | Mobile section padding-y |
| `6xl` | `6rem` | 96px | Desktop section padding-y (not used currently; sections use 4.5rem) |

### Section Spacing

| Context | Desktop | Mobile (< 768px) |
|---------|---------|-------------------|
| Section padding-y | `4.5rem` | `4rem` |
| Container padding-x | `2rem` | `1.25rem` |
| Card inner padding | `1.4-1.75rem` | Same |
| Grid gap | `1-1.25rem` | Same |
| Badge padding | `0.2rem 0.6rem` | Same |

### Spacing Rules

- Always use the 8-point scale. No arbitrary values like `13px` or `1.3rem`
- Closest values: `1.25rem` (20px) or `1.5rem` (24px) — pick one, not `1.3rem`
- Between sections: use only `section { padding: 4.5rem 0 }` (desktop) or `4rem 0` (mobile)
- Inside cards: use `1.4-1.75rem` padding consistently

---

## Grid System

### 3-Column Grid (Primary Pattern)

Most content sections use a 3-column grid on desktop.

```css
.grid-3col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

**Sections using 3-col grid:**
- Featured Projects (`.featured-grid`)
- All Projects (`.projects-grid`)
- Research Focus (`.research-grid`)
- Awards (`.awards-list`)
- Activities (`.activities-grid`)
- Philosophy Pillars (`.philosophy-pillars`)

### Auto-Fill Grid (for variable-count items)

```css
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.1rem;
}
```

**Used by:** Skills (`.skills-grid`), Contact (`.contact-cards`)

### Responsive Grid Behavior

| Breakpoint | Grid Columns | Applies To |
|------------|-------------|------------|
| Desktop (>= 960px) | 3 columns | All grids |
| Tablet (< 768px) | 2 columns | Projects, awards, activities, research, featured |
| Small (< 480px) | 1 column | Everything stacks vertically |

### Grid Rules for New Components

1. Default to `repeat(3, 1fr)` for card-based sections
2. Use `repeat(auto-fill, minmax(Xpx, 1fr))` for variable-count items
3. Gap: `1rem` for dense grids (projects), `1.25rem` for spacious grids (research)
4. At `< 768px`, collapse to `1fr` (single column)
5. At `< 480px`, ensure CTAs and actions are `width: 100%`

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--r-sm` | `6px` | Tags, small badges, skill tags |
| `--r` | `10px` | Pub items, activity cards |
| `--r-md` | `12px` | Inputs, detail panels, expandable sections |
| `--r-lg` | `16px` | Main cards, modals |
| `20px` | — | Pill-shaped badges, filter buttons, period tags |

### Radius Rules

- Cards: always `--r-lg` (16px)
- Badges/pills: always `20px` border-radius
- Detail panels (expandable): `--r-md` (12px)
- Never use `50%` except for circles (photo, timeline dots)

---

## Responsive Breakpoints

| Name | Max-Width | Key Changes |
|------|-----------|-------------|
| Desktop | >= 960px | 2-col hero, 3-col grids |
| Tablet | < 960px | 1-col hero, photo moves to top |
| Mobile | < 768px | Mobile nav, 2-col grids, reduced padding |
| Small | < 480px | 1-col grids, full-width CTAs, stacked actions |

### Responsive Rules

1. **Mobile-first mindset** — design the mobile layout first, then add columns for desktop
2. **Breakpoint media queries** — always use `max-width`, never `min-width`
3. **Grid collapse** — 3-col → 2-col at 768px → 1-col at 480px
4. **Navigation** — Hamburger menu below 768px, sticky header at all sizes
5. **Font sizes** — Use `clamp()` for headings; body text stays `1rem` at all sizes
6. **Touch targets** — Minimum 44x44px for all interactive elements on mobile
7. **Padding** — Container padding reduces from `2rem` to `1.25rem` at mobile

---

## Animation

| Type | Duration | Easing | Trigger |
|------|----------|--------|---------|
| Scroll reveal | `0.6s` | `cubic-bezier(.4,0,.2,1)` | IntersectionObserver (threshold 0.1) |
| Hover | `0.3s` | `cubic-bezier(.4,0,.2,1)` | CSS `:hover` |
| Hero fade-up | `0.8s` | `cubic-bezier(.4,0,.2,1)` | Page load |
| Modal open/close | `0.3s` | `cubic-bezier(.4,0,.2,1)` | JS class toggle |
| Expandable panels | `0.25s` | `ease` | Click |

### Animation Rules

- Entry animation: `opacity 0→1` + `translateY(18-28px → 0)`
- Always use `IntersectionObserver` for scroll-based animations (never scroll listeners)
- Max animation duration: `1s` (hero only)
- Icons: Unicode emoji only (no icon library)
- Photo ring: `3.5s linear infinite` rotation (hero only — exception to max duration)
- Hover lift: `translateY(-2px to -4px)` + subtle box-shadow

---

## Chart/Visualization Rules

If adding charts or data visualizations in the future:

1. **Colors** — Use palette tokens only: `--blue` for primary data, `--navy` for secondary, `--text-muted` for axis/grid
2. **Text** — Chart labels use `0.75rem` weight 600, axis labels use `0.7rem` weight 500
3. **No external libraries** — Use SVG or Canvas, consistent with no-dependency rule
4. **Responsive** — Charts must collapse gracefully on mobile (consider hiding complex charts below 480px)
5. **Animation** — Entrance animation matches scroll-reveal pattern (0.6s ease)
6. **Accessibility** — Provide alt text or `aria-label` for data visualizations
7. **Grid lines** — Use `--border` color (`#E2E8F0`) for grid lines, 1px solid
