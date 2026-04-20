# Design System

## Aesthetic

Professional, data-dense, confident. Every element has a purpose.
Dark navy anchors the brand; electric blue highlights interaction.

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

### Rules
- Never use colors outside this palette
- `--blue` is reserved for **interactive** elements only
- Dark sections: body text `rgba(255,255,255, >= .55)`

## Typography

| Role | Weight | Size |
|------|--------|------|
| Hero H1 | 800 | `clamp(2.8rem, 5.5vw, 4.2rem)` |
| Philosophy headline | 800 | `clamp(3rem, 7vw, 5.5rem)` |
| Section title H2 | 700 | `clamp(1.75rem, 3vw, 2.5rem)` |
| Card title H3 | 700 | `0.9–0.97rem` |
| Body | 400 | `1rem` (16px) |
| Small / meta | 500 | `0.77–0.84rem` |
| Badge / label | 700 | `0.7–0.75rem`, `letter-spacing: 0.1em` |

- Font: **Pretendard** (CDN: `cdn.jsdelivr.net/gh/orioncactus/pretendard`)
- Display headings: `letter-spacing: -0.02em` to `-0.04em`
- Line height: `1.2` headings, `1.7` body, `1.6` lead
- Minimum size: `0.68rem`

## Spacing

8-point grid: `0.25 · 0.5 · 0.75 · 1 · 1.25 · 1.5 · 2 · 2.5 · 3 · 4 · 6 rem`

| Context | Padding |
|---------|---------|
| Section | `6rem 0` desktop, `4rem 0` mobile |
| Container | `0 2rem` desktop, `0 1.25rem` mobile |
| Card | `1.5–1.75rem` |
| Badge | `0.2rem 0.6rem` |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--r-sm` | `6px` | Tags, small badges |
| `--r-md` | `12px` | Inputs, small cards |
| `--r-lg` | `16px` | Main cards, modals |

## Responsive Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | >= 900px | 2-col hero, 3-col grids |
| Tablet | < 900px | 1-col hero, 2-col grids |
| Mobile | < 768px | Mobile nav, reduced padding |
| Small | < 480px | Full-width CTAs |

## Animation

- Entry: `opacity 0→1` + `translateY(20px→0)`, `0.6s ease`
- Trigger: `IntersectionObserver` threshold `0.12`
- Hover: `0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- Max duration: `1s` (hero only)
- Icons: Unicode emoji (no icon library)
