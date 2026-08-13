↑ [문서 인덱스](index.md)

# 백로그

보류 항목. 완료 시 dev-history/로 이동.

## 높음 우선순위

- **YAML 한국어 번역** (2026-04-20)
  대부분의 `ko: ""` 필드가 아직 비어 있음. 프로젝트 제목·경력 직위·수상 채우기.
  Ref: data/career/*.yaml

- **Research interests → YAML** (2026-04-24)
  `RESEARCH_INTERESTS`·`HERO_TAGS`가 main.js에 하드코딩됨.
  SSOT 원칙 일관성을 위해 YAML로 이동해야 함.
  Ref: assets/js/main.js lines 6-30

- **Featured project indices → YAML** (2026-04-24)
  `FEATURED_PROJECT_INDICES = [25, 23, 21]`가 main.js에 하드코딩됨.
  basic.yaml 또는 config.yaml로 설정 가능하게 해야 함.
  Ref: assets/js/main.js line 24

## 중간 우선순위

- **에셋 예산 초과** (2026-07-16, 부분 수정)
  `jehun.jpg` 압축 993 KB→104 KB (1200px q82) → images ~319 KB ✓, page weight ~490 KB ✓.
  남은 것: `portfolio.json` ~74 KB (목표 60), `style.css` ~51 KB (목표 40) — minify/split 검토.
  Ref: assets/css/style.css, data/portfolio.json, docs/common/coding.md

- **YAML 스키마 검증** (2026-04-24)
  yaml-to-json.js에 스키마 검증 없음 — 필수 필드 누락 시 침묵 실패.
  명확한 에러 메시지와 함께 검증 단계 추가.
  Ref: scripts/yaml-to-json.js

- **한국어 홈페이지 토글** (2026-04-20)
  변환기에서 `--lang ko`는 동작하나, 사이트 토글은 portfolio.ko.json을 fetch함.
  한국어 방문자 기본값으로 켜기 전 모든 ko 필드가 채워졌는지 확인.
  Ref: docs/pipeline.md

## 낮음 우선순위

- **검색 기능** (2026-04-24)
  프로젝트 25+·논문 26+ — 키워드 검색이 UX를 개선함.
  portfolio.json 대상 클라이언트사이드 검색 검토.

- **페이지 번호 직접 이동** (2026-04-24)
  현재 페이저는 prev/next만 지원. 3+ 페이지에 페이지 번호 버튼 추가.

- **레거시 스크립트 정리** (2026-04-24)
  `sync-sheets.js`, `json-to-yaml.js`, `split-yaml.js`, `fill-ko.js`가 git에 추적됨.
  repo에서 제거하거나 legacy 브랜치로 아카이브 검토.

- **dev-history 카테고리 재편** (flat → {ui}/) — ✅ 이관 완료 2026-07-18, summary는 root 정위치 확인 (docs/dev-history/ — 카테고리 폴더 완비, 루트 flat은 README+월별 summary뿐).

## 유저분석·성장 계측 (출처 analytics-2026-08 · 전역 rules/analytics.md)
- **해당 없음** (사용자 결정 2026-08-14): CareerPage는 **개인 포트폴리오**로 목적이 제품이 아니다 → 자생 생태계(feedback 루프·유저 분석·events·retention) **일절 도입 안 함**. 방문 지표조차 자생 환경 목적으론 안 만든다. (필요 시 사용자가 별도 요청.)
