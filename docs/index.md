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
| [common/code-structure.md](common/code-structure.md) | File location map: task → file, main.js helpers | All |
| [common/gotchas.md](common/gotchas.md) | Pitfalls actually hit (symptom → cause → fix) | All |
| [common/analytics.md](common/analytics.md) | Visit analytics delta (Cloudflare Web Analytics + same-origin dwell beacon) | Frontend, Deploy |

## QA & Backlog

| File | Content | Audience |
|------|---------|----------|
| [qa/user-scenarios.md](qa/user-scenarios.md) | User scenarios (given → action → expect) | QA |
| [ui/screen-contracts.md](ui/screen-contracts.md) | Screen acceptance contracts (regression baseline) | UI, QA |
| [inbox/user-actions.md](inbox/user-actions.md) | Things only the human can do (accounts, deploy, settings) | All |
| `backlog/` | Dated audit / conformance / merge leaves (`ls docs/backlog/`) | All |

## 공통 개념 → 이 프로젝트 위치 (전역 가이드의 `<proj>/…` 기본 경로보다 이 표가 우선)
> 칸은 자유 서술, **행 이름은 고정**(훅·검사가 읽음).

| 개념 | 이 프로젝트 위치 |
|---|---|
| 기능 spec | `docs/prod.md` · `docs/data/schema.md` · `docs/ui/screen-contracts.md` |
| 리뷰 기준 | 없음 (전역 `~/.claude/docs/review/*` 상속) |
| 검증 명령 | `npm run verify` (`scripts/verify.js` — `scripts/check-invariants.js` + `tests/main-render.test.js` + YAML→JSON en/ko 임시 경로 빌드. CI `.github/workflows/verify.yml`) |
| 코드 지도 | `docs/common/code-structure.md` · `docs/contributing.md` |
| 불변식·금지(why) | `CLAUDE.md` 고유 규칙 · `docs/common/coding.md` Sanitization |
| 코딩 규칙 | `docs/common/coding.md` |
| 함정(gotchas) | `docs/common/gotchas.md` |
| 사용자 시나리오 | `docs/qa/user-scenarios.md` |
| 배포 분류·절차 | `docs/deploy.md` · 단독/공동 분류 = 단독 |
| 결정·이력 | `docs/dev-history/` · `docs/backlog.md` |
| 에이전트별 추가(스킬·가이드) | 없음 (같은 작업이 2회+ 반복되면 `.claude/skills/<이름>/SKILL.md` 만들고 `에이전트: 스킬·가이드` 형식으로 여기 등록) |

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
