# Web UI Rules
**Project:** Jehun Lee's Professional Portfolio
**Site:** https://jehun-lee.work

---

## 1. Color System

| Token | Hex | Usage |
|-------|-----|-------|
| `--navy` | `#0A192F` | Hero, Philosophy, Contact, Footer backgrounds |
| `--navy-mid` | `#112240` | Hero card, secondary dark surfaces |
| `--navy-light` | `#1D3461` | Hover states on dark surfaces |
| `--blue` | `#007AFF` | Primary accent: CTAs, active states, badges, stat values |
| `--blue-light` | `#4DA3FF` | Hover state for blue elements on dark backgrounds |
| `--blue-dim` | `rgba(0,122,255,.12)` | Badge backgrounds, tag fills, focus rings |
| `--bg` | `#F8FAFC` | Primary light background |
| `--bg-alt` | `#EEF2F7` | Alternate section background |
| `--white` | `#FFFFFF` | Cards, clean surfaces |
| `--text` | `#0A192F` | Primary body text |
| `--text-mid` | `#334155` | Secondary text (labels, sub-titles) |
| `--text-muted` | `#64748B` | Tertiary text (dates, metadata) |
| `--border` | `#E2E8F0` | Card and divider borders |

### Rules
- Never use colors outside this palette without updating the table
- All dark sections (`section-dark`) must use the navy set
- Electric Blue (`#007AFF`) is reserved for **active/interactive** elements only — not decorative
- Body text on dark backgrounds: `rgba(255,255,255, ≥ .55)` for readable content

## 2. Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Hero H1 | Space Grotesk | 800 | `clamp(2.5rem, 5vw, 4rem)` |
| Philosophy headline | Space Grotesk | 800 | `clamp(2.5rem, 6vw, 5rem)` |
| Section title H2 | Space Grotesk | 700 | `clamp(1.75rem, 3vw, 2.5rem)` |
| Card title H3 | Space Grotesk | 700 | `1rem` – `1.05rem` |
| Body | Inter | 400 | `1rem` (16px base) |
| Small / meta | Inter | 500 | `0.75rem` – `0.85rem` |
| Badge / label | Inter | 700 | `0.68rem` – `0.75rem`, `letter-spacing: 0.1em` |

### Rules
- `letter-spacing: -0.02em` to `-0.04em` on display headings (Space Grotesk)
- Line height: `1.2` for headings, `1.7` for body, `1.6` for lead text
- No text smaller than `0.68rem`

## 3. Spacing System

Uses an 8-point grid. Standard values: `0.25rem · 0.5rem · 0.75rem · 1rem · 1.25rem · 1.5rem · 2rem · 2.5rem · 3rem · 4rem · 6rem`

| Context | Padding |
|---------|---------|
| Section | `6rem 0` (desktop), `4rem 0` (mobile) |
| Container | `0 2rem` (desktop), `0 1.25rem` (mobile) |
| Card | `1.5rem` – `1.75rem` |
| Badge / tag | `0.2rem 0.6rem` |

## 4. Section Layout Pattern

Sections alternate between light and dark to create visual rhythm:

```
Hero            → Dark (Navy)
Philosophy      → Dark (Navy)   ← brand continuity with hero
About/Stats     → White
Experience      → Slate Gray (alt)
Projects        → White
Publications    → Slate Gray (alt)
Education       → White
Skills          → Slate Gray (alt)
Awards          → White
Patents         → Slate Gray (alt)
Activities      → White
Contact         → Dark (Navy)   ← bookend
Footer          → Dark (Navy)
```

## 5. Component Patterns

### Cards
```css
background: var(--bg);          /* or white */
border: 1px solid var(--border);
border-radius: var(--radius-lg); /* 16px */
padding: 1.5rem;
transition: border-color, transform, box-shadow — 0.3s cubic-bezier
```
Hover state: `border-color: var(--blue)` + `translateY(-2px)` to `-4px` + shadow

### Timeline Items
```css
position: relative;
padding-left: 2.5rem;
/* ::before dot: 12px circle, var(--blue) fill */
/* ::before line: 2px vertical, blue gradient */
```

### Tags / Badges
- `tag`: blue-dim bg, blue text — primary context (client, tech)
- `tag.org`: near-black transparent bg, mid text — secondary org context
- `badge-journal`: blue-dim — journal publications
- `badge-conf`: navy-dim — conference publications
- `badge-1st`: green-dim — first-author credit
- `badge-global`: purple-dim — international venue

### Buttons
| Class | Style |
|-------|-------|
| `.btn-primary` | Blue bg, white text, lift on hover |
| `.btn-outline` | Transparent, white border → blue border on hover |
| `.btn-ghost` | Text only, muted white → white on hover |

## 6. Animation Guidelines

- Entry animation: `opacity 0→1` + `translateY(20px→0)`, duration `0.6s`, easing `ease`
- Trigger: `IntersectionObserver` at threshold `0.12`
- Hero fade-in: `animation: fadeInUp 0.8s ease both`
- Hero card staggered: `animation-delay: 0.3s`
- All hover transitions: `0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- No animation duration > 1s (except page-load hero)
- Respect `prefers-reduced-motion` (add to future iterations)

## 7. Responsive Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Desktop | ≥ 900px | Full two-column hero, 3-col philosophy pillars |
| Tablet | < 900px | Single-column hero, hide hero card, 1-col pillars |
| Mobile | < 768px | Mobile nav, reduced section padding |
| Small | < 480px | Full-width CTAs, reduced container padding |

### Mobile Navigation
- Toggle button: 3-bar hamburger (`span` elements)
- Dropdown: absolute, full-width, navy bg, `border-bottom`
- Closes automatically on link click

## 8. Icon Convention

- Use Unicode emoji for section icons (pillars, contact cards, location) — no icon library dependency
- SVG inline only for the location pin in hero (single usage)
- Emoji font rendering varies — always test on target platforms

## 9. Image Guidelines (future)
- Profile photo: square, minimum 400×400px, placed in `assets/img/`
- Compress to WebP; provide JPG fallback
- `loading="lazy"` for all below-fold images

## 10. Accessibility Compliance

- Focus ring: 2px `var(--blue)` outline, not hidden
- Color is not the sole indicator of state (use text labels alongside color badges)
- All filter buttons maintain clear active/inactive visual distinction beyond color
