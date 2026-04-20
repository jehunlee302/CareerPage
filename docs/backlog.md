# Backlog

Session-persistent pending items. Move to dev_his/ on completion.

## High Priority

(none)

## Medium Priority

- **Korean translations for YAML** (2026-04-20)
  Most `ko: ""` fields still empty. Fill in project titles, work positions, honors.
  Ref: data/career/*.yaml

- **yaml-to-json Korean site build** (2026-04-20)
  `--lang ko` works in converter but no Korean homepage URL or toggle yet.
  Ref: docs/pipeline.md

## Low Priority

- **Google Sheets → YAML auto-sync** (2026-04-20)
  Consider a script that fetches Sheets and updates YAML files directly, preserving bilingual structure.
  Ref: scripts/sync-sheets.js (legacy)

- **Additional export formats** (2026-04-20)
  YAML → DOCX, YAML → LaTeX/PDF converters for resume/CV generation.
  Ref: docs/pipeline.md
