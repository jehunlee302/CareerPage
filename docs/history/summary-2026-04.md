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

### Docs Restructure (2026-04-20)
- Created structured `docs/` following docs-sample format
- Migrated FRONTEND_RULES.md → docs/coding.md
- Migrated WEBUI_RULES.md → docs/ui/design-system.md
- Migrated BACKEND_RULES.md → docs/deploy.md
- Added: index.md, prod.md, pipeline.md, backlog.md
- Added: ui/components.md, ui/sections.md
- Added: data/schema.md, data/converter.md
- Moved images to assets/img/
- Created minimal CLAUDE.md

### Docs & Structure Audit (2026-04-24)
- Renamed `docs/engine/` → `docs/data/` (intuitive naming)
- Renamed `docs/dev_his/` → `docs/history/` (no abbreviation)
- Flattened `docs/deploy/deploy.md` → `docs/deploy.md` (remove single-file folder)
- Flattened `docs/rules/coding.md` → `docs/coding.md` (remove single-file folder)
- Strengthened design-system.md: spacing scale, grid system, chart rules, responsive rules
- Added performance optimization rules to coding.md
- Enhanced pipeline.md: data update rules, YAML editing rules, rollback procedure
- Improved CSS: 3-col → 2-col at 768px tablet breakpoint (progressive collapse)
- Updated all cross-references across docs
