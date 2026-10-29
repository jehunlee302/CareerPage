# 문서 지도 (INDEX)

CareerPage 프로젝트의 파일 지도. 먼저 [CLAUDE.md](../CLAUDE.md)와 [PRD.md](PRD.md)를 읽고, 필요한 주제만 아래에서 찾는다.

## 요구사항

| 파일 | 내용 | 대상 |
|------|------|------|
| [PRD.md](PRD.md) | 목표, 지금 진행 중, 영역별 묶음 표 (site · data · ux · ops) | 전체 |
| [prd/site.md](prd/site.md) | 사이트 섹션 구성, 비기능 요구 (예전 prod.md) | 전체 |
| [prd/data.md](prd/data.md) | YAML 파이프라인, 번역, 하드코딩 → YAML, 스키마 검증 | Engine |
| [prd/ux.md](prd/ux.md) | 에셋 예산, 검색, 페이지 이동, 회귀 기록 | Frontend |
| [prd/ops.md](prd/ops.md) | 방문 분석, 스크립트·브랜치 정리, dev-loop, 문서 이전 | 전체 |
| [user-actions.md](user-actions.md) | 사람이 직접 해야 할 일 (계정·배포·설정) | 사람 |

## 구조·스택

| 파일 | 내용 | 대상 |
|------|------|------|
| [common/stack.md](common/stack.md) | 기술 스택: 런타임, 빌드 도구, 의존성, SSOT | 전체 |
| [common/code-structure.md](common/code-structure.md) | 코드 구조 | 전체 |
| [pipeline.md](pipeline.md) | 데이터 파이프라인: YAML → JSON → Web, 갱신 규칙 | Engine, Deploy |

## 규칙

| 파일 | 내용 | 대상 |
|------|------|------|
| [contributing.md](contributing.md) | 정적 사이트 파일 지도, 소스 파일 규칙, YAML 분할 (문서 규칙은 전역 doc.md 상속) | 전체 |
| [common/coding.md](common/coding.md) | Vanilla JS/HTML/CSS 세부: esc(), 외부 JS 금지, 성능 (일반 규칙은 전역 code.md 상속) | Frontend |

## UI·디자인

| 파일 | 내용 | 대상 |
|------|------|------|
| [ui/design-system.md](ui/design-system.md) | 색, 타이포그래피, 간격, breakpoint, 그리드 규칙 | UI |
| [ui/components.md](ui/components.md) | 컴포넌트 목록: 카드, 타임라인, 태그, 모달, 페이저 | UI |
| [ui/sections.md](ui/sections.md) | 섹션 배치 지도, 밝음/어두움 교차 | UI |
| [ui/screen-contracts.md](ui/screen-contracts.md) | 화면 계약 | UI |

## 데이터 (스키마·파이프라인)

| 파일 | 내용 | 대상 |
|------|------|------|
| [data/schema.md](data/schema.md) | YAML 스키마 + JSON 계약 | Engine, Frontend |
| [data/converter.md](data/converter.md) | yaml-to-json.js 구조, 이중 언어 추출 | Engine |

## 품질·분석

| 파일 | 내용 | 대상 |
|------|------|------|
| [qa/user-scenarios.md](qa/user-scenarios.md) | 사용자 시나리오 UC-1 ~ UC-14 (QA 수용 기준, E2E 대상) | QA |
| [common/analytics.md](common/analytics.md) | 방문 분석 2계층 (CF Web Analytics + 체류 비콘) | 전체 |

## 배포

| 파일 | 내용 | 대상 |
|------|------|------|
| [deploy.md](deploy.md) | 배포 파이프라인, DNS, GitHub Pages, 보안 | Deploy |

## 이력 (_old)

예전 문서 보관 (do-03, 2026-10-30). 정본은 PRD.md + prd/.
- [_old/prod.md](_old/prod.md) — 예전 제품 명세 (→ prd/site.md)
- [_old/backlog.md](_old/backlog.md) — 예전 백로그 (→ PRD.md 행)
- [_old/backlog/](_old/backlog/audit-2026-10.md) — 2026-10-04 감사·병합 보고서 (→ prd/ops.md#ops-03)
- [_old/dev-history/](_old/dev-history/summary-2026-04.md) — 변경 기록과 분석 노트 (월별 `summary-YYYY-MM.md` + 날짜별 상세). 목록은 손으로 적지 않고 폴더가 곧 색인.

## 문서 계층

```
CLAUDE.md (진입점: 규칙 + PRD/INDEX 링크)
  └── docs/PRD.md (목표 + 진행 중 + 묶음 표)
        └── prd/{site,data,ux,ops}.md (묶음 상세)
  └── docs/INDEX.md (이 파일: 전체 문서 지도)
        ├── common/stack.md (기술 스택 + 의존성)
        ├── contributing.md (정적 사이트 파일 지도 + 소스/YAML 규칙)
        ├── pipeline.md (데이터 흐름 + 갱신 규칙)
        ├── common/coding.md (코드 작성법)
        ├── ui/
        │     ├── design-system.md (시각 규칙: 색, 간격, 폰트)
        │     ├── components.md (컴포넌트 패턴 + CSS)
        │     └── sections.md (섹션 순서 + 배경)
        ├── data/
        │     ├── schema.md (YAML 스키마 + JSON 계약)
        │     └── converter.md (파이프라인 스크립트 내부)
        ├── deploy.md (배포 절차 + DNS)
        └── _old/ (보관: prod, backlog, dev-history)
```

## Glossary
- PRD — 요구사항 문서. [PRD.md](PRD.md) 표 한 행 = 묶음 하나, 상세는 `prd/<area>.md#<id>`
- ID (`site-01`, `data-02` …) — PRD 행 식별자. 접두어 = 영역, 숫자 = 순번
- SSOT — single source of truth, 정본이 한 곳뿐. 이 프로젝트는 `data/career/*.yaml`
- generated 파일 — 빌드가 만드는 파일 (`data/portfolio.json`, `latex/sections/*.tex`). 직접 고치지 않는다
- esc() — 모든 사용자 문자열을 거치는 HTML 새니타이저 (XSS 방지)
- CNAME — GoDaddy DNS 별칭. `jehun-lee.work` → GitHub Pages
- CF — Cloudflare. Web Analytics, Worker, Analytics Engine 제공
- 비콘 (beacon) — `navigator.sendBeacon`으로 체류시간·스크롤 깊이를 한 번 보내는 요청
- UC / S-n.m — 사용자 시나리오 / 그 안의 원자 동작 (given → action → expect)
- dev-loop — 페르소나 리뷰 → 시나리오 검증 → 갭 → 개발 → 재검증 반복 사이클
- WCAG AA — 웹 접근성 기준. 글자 대비 4.5:1 이상
- PM — 프로젝트 책임자로 참여한 과제
