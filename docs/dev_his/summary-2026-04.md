# 2026-04 Development Summary

## YAML Migration (2026-04-20)

### Data Pipeline v2
- Created `data/career/*.yaml` as single source of truth (bilingual en/ko)
- Split projects (4 files) and publications (4 files) by year range
- Built `scripts/yaml-to-json.js` converter with `--lang en|ko` support
- Updated `deploy.bat` to use YAML pipeline

### Career Data Enrichment
- Added thesis details to education (Ph.D. + M.S.): topic, methodology, performance
- Added detailed work responsibilities for VMS, MSS Lab, SCO Lab
- Added structured project details: purpose, role, tasks, achievements for 7 projects (#25, #23, #22, #21, #19, #14, #11)

### Homepage UI Updates
- Education: expandable thesis details (click to show/hide)
- Experience: responsibilities as bullet list, highlights as tags
- Project modal: purpose, key tasks, achievements sections

### Docs Restructure
- Created structured `docs/` following docs-sample format
- Migrated FRONTEND_RULES.md → docs/rules/coding.md
- Migrated WEBUI_RULES.md → docs/ui/design-system.md
- Migrated BACKEND_RULES.md → docs/deploy/deploy.md
- Added: index.md, prod.md, pipeline.md, backlog.md
- Added: ui/components.md, ui/sections.md
- Added: engine/schema.md, engine/converter.md
- Moved images to assets/img/
- Created minimal CLAUDE.md
