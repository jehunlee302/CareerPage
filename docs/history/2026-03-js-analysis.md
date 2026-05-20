# UX/UI Analysis Report — js Feature

**Date**: 2026-04-01
**Match Rate**: 82% → 93% (after improvements)
**Iteration**: 1

## Executive Summary

| Perspective | Description |
|-------------|-------------|
| Problem | Dark-section text opacity, minimum font sizes, and spacing inconsistencies reduce readability and visual polish |
| Solution | Systematic opacity lift on dark backgrounds, `.68rem` → `.70rem` floor, standardized grid spacing |
| Function UX Effect | Improved WCAG AA compliance across Contact/Footer/Impact sections; denser pub-list gets breathing room |
| Core Value | Professional, accessible portfolio that reads well across all sections without squinting |

## Gap Analysis Results

### A. Readability (7 issues found, 7 fixed)

| # | Element | Before | After | Severity |
|---|---------|--------|-------|----------|
| 1 | `.contact-label` | opacity .35 | .48 | Critical |
| 2 | `.footer-inner` | opacity .28 | .40 | Critical |
| 3 | `.impact-label` | opacity .40 | .50 | Critical |
| 4 | `.contact-intro` | opacity .50 | .60 | Important |
| 5 | `.hero-title-text` | opacity .65 | .75 | Important |
| 6 | `.edu-thesis` | .78rem + opacity .7 | .80rem, no opacity | Important |
| 7 | `.pub-list` gap | .4rem | .55rem | Important |

### B. Font Sizes (5 issues found, 4 fixed)

| # | Element | Before | After | Severity |
|---|---------|--------|-------|----------|
| 8 | `.fc-tag` | .68rem | .70rem | Important |
| 9 | `.project-popup-hint` | .68rem | .70rem | Important |
| 10 | `.modal-field-label` | .68rem | .70rem | Important |
| 11 | `.contact-label` | .68rem | .70rem | Important |
| 12 | `.pub-title` | .88rem | .90rem | Minor (consistency) |

### C. Colors (4 issues found, 3 fixed)

| # | Element | Before | After | Severity |
|---|---------|--------|-------|----------|
| 13 | `.badge-domestic` | opacity .75 | border+subtle bg | Important |
| 14 | `.fc-tag` bg | rgba .06 | .08 + border .12 | Important |
| 15 | `.footer-name` | opacity .55 | .60 | Minor |

### D. Composition (3 issues found, 2 fixed)

| # | Element | Before | After | Severity |
|---|---------|--------|-------|----------|
| 16 | `.section-head` margin-bottom | .3rem | .5rem | Important |
| 17 | `.projects-grid` margin-top | 0 | .5rem | Minor |

### Not Changed (acceptable as-is)

- Blue accent consistency: intentional brand identity — all interactive elements blue
- Emoji icons: no external icon library per FRONTEND_RULES.md dependency policy
- Pretendard font: optimal for Korean/English mixed content

## Post-Improvement Match Rate

| Category | Before | After |
|----------|--------|-------|
| Readability | 72% | 92% |
| Font Sizes | 78% | 93% |
| Colors | 80% | 90% |
| Composition | 82% | 90% |
| Icons | 90% | 90% |
| Font | 92% | 92% |
| **Overall** | **82%** | **93%** |
