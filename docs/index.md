# Docs Index

Master file map for the CareerPage project.
Start at `CLAUDE.md` for quick start, then drill into specific topics below.

## Architecture & Product

| File | Content | Audience |
|------|---------|----------|
| [stack.md](common/stack.md) | Tech stack: runtime, build tooling, dependencies, SSOT | All |
| [prod.md](prod.md) | Product spec, site sections, target audience | All |
| [pipeline.md](pipeline.md) | Data pipeline: YAML → JSON → Web, update rules | Engine, Deploy |
| [backlog.md](backlog.md) | Pending items | All |

## Rules

| File | Content | Audience |
|------|---------|----------|
| [contributing.md](contributing.md) | Static-site file map, source-file rules, YAML split (doc governance inherits global doc.md) | All |
| [coding.md](common/coding.md) | Vanilla JS/HTML/CSS specifics: esc(), no external JS, performance (general rules inherit global code.md) | Frontend |

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

Changelog and analysis logs. Browse `ls docs/dev-history/` (monthly summaries `summary-YYYY-MM.md` + dated detail notes). Not hand-listed here — the folder is the index.

## Document Hierarchy

```
CLAUDE.md (entry point: quick start + file map + rules links)
  └── docs/index.md (this file: full doc map)
        └── common/stack.md (tech stack + dependencies)
        ├── contributing.md (static-site file map + source/YAML rules)
        ├── prod.md (what the site does)
        ├── pipeline.md (how data flows + update rules)
        └── common/coding.md (how to write code)
        ├── ui/
        │     ├── design-system.md (visual rules: colors, spacing, fonts)
        │     ├── components.md (component patterns + CSS)
        │     └── sections.md (section order + backgrounds)
        ├── data/
        │     ├── schema.md (YAML schema + JSON contract)
        │     └── converter.md (pipeline script internals)
        ├── deploy.md (deploy process + DNS)
        └── dev-history/ (changelog)
```
