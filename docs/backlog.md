# Backlog

Pending items. Move to history/ on completion.

## High Priority

- **Korean translations for YAML** (2026-04-20)
  Most `ko: ""` fields still empty. Fill in project titles, work positions, honors.
  Ref: data/career/*.yaml

- **Research interests → YAML** (2026-04-24)
  `RESEARCH_INTERESTS` and `HERO_TAGS` are hardcoded in main.js.
  Should be moved to YAML for consistency with source-of-truth principle.
  Ref: assets/js/main.js lines 6-30

- **Featured project indices → YAML** (2026-04-24)
  `FEATURED_PROJECT_INDICES = [25, 23, 21]` is hardcoded in main.js.
  Should be configurable via basic.yaml or a config.yaml.
  Ref: assets/js/main.js line 24

## Medium Priority

- **YAML schema validation** (2026-04-24)
  yaml-to-json.js has no schema validation — required field omission causes silent failure.
  Add validation step with clear error messages.
  Ref: scripts/yaml-to-json.js

- **Korean homepage toggle** (2026-04-20)
  `--lang ko` works in converter but toggling on the site fetches portfolio.ko.json.
  Verify all ko fields populated before enabling as default for Korean visitors.
  Ref: docs/pipeline.md

## Low Priority

- **Search functionality** (2026-04-24)
  25+ projects, 26+ publications — keyword search would improve UX.
  Consider client-side search over portfolio.json.

- **Page number direct navigation** (2026-04-24)
  Current pager only supports prev/next. Add page number buttons for 3+ pages.

- **Legacy script cleanup** (2026-04-24)
  `sync-sheets.js`, `json-to-yaml.js`, `split-yaml.js`, `fill-ko.js` are tracked in git.
  Consider removing from repo or archiving to a legacy branch.
