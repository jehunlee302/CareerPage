# Docs Index

Master file map for the CareerPage project.
Start at `CLAUDE.md` for quick start, then drill into specific topics below.

## Architecture & Product

| File | Content | Audience |
|------|---------|----------|
| [prod.md](prod.md) | Product spec, site sections, target audience | All |
| [pipeline.md](pipeline.md) | Data pipeline: YAML → JSON → Web, update rules | Engine, Deploy |
| [backlog.md](backlog.md) | Pending items | All |

## Rules

| File | Content | Audience |
|------|---------|----------|
| [contributing.md](contributing.md) | Folder/file/doc structure rules, naming, sync obligations | All |
| [coding.md](coding.md) | JS/HTML/CSS conventions, sanitization, performance | Frontend |

## UI & Design

| File | Content | Audience |
|------|---------|----------|
| [ui/design-system.md](ui/design-system.md) | Colors, typography, spacing, breakpoints, grid rules | UI |
| [ui/components.md](ui/components.md) | Component catalog: cards, timeline, tags, modal, pager | UI |
| [ui/sections.md](ui/sections.md) | Section layout map, light/dark alternation | UI |

## Data (Schema & Pipeline)

| File | Content | Audience |
|------|---------|----------|
| [data/schema.md](data/schema.md) | YAML schema + JSON contract | Engine, Frontend |
| [data/converter.md](data/converter.md) | yaml-to-json.js architecture, bilingual extraction | Engine |

## Deploy

| File | Content | Audience |
|------|---------|----------|
| [deploy.md](deploy.md) | Deploy pipeline, DNS, GitHub Pages, security | Deploy |

## History

| File | Content |
|------|---------|
| [history/summary-2026-03.md](history/summary-2026-03.md) | v1.0-v3.2: Initial launch through style polish |
| [history/summary-2026-04.md](history/summary-2026-04.md) | YAML migration, bilingual pipeline, docs restructure |

## Document Hierarchy

```
CLAUDE.md (entry point: quick start + file map + rules links)
  └── docs/index.md (this file: full doc map)
        ├── contributing.md (structure rules, naming, sync obligations)
        ├── prod.md (what the site does)
        ├── pipeline.md (how data flows + update rules)
        ├── coding.md (how to write code)
        ├── ui/
        │     ├── design-system.md (visual rules: colors, spacing, fonts)
        │     ├── components.md (component patterns + CSS)
        │     └── sections.md (section order + backgrounds)
        ├── data/
        │     ├── schema.md (YAML schema + JSON contract)
        │     └── converter.md (pipeline script internals)
        ├── deploy.md (deploy process + DNS)
        └── history/ (changelog)
```
