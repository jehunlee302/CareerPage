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

- **dev-history 카테고리 재편** (flat → {ui}/) — ✅ 이관 완료 2026-07-18, summary는 root 정위치 확인 (docs/dev-history/ — 카테고리 폴더 완비, 루트 flat은 README+월별 summary뿐).

## 유저분석·성장 계측 (출처 analytics-2026-08 · 전역 rules/analytics.md)
- **자생 생태계(feedback 루프·events·retention·로그인) = 해당 없음**(포트폴리오, 제품 아님).
- ✅ **방문 분석 도입 (2026-08-15, 사용자 요청 — 방문수 + 페이지별 체류)**: 2계층 — ① Cloudflare Web Analytics(방문·페이지·referrer, 쿠키리스, 코드 0) ② 자체 체류 비콘 `assets/js/analytics.js`(같은-출처 로컬 스크립트=규칙 준수, 체류시간·스크롤깊이 → `sendBeacon` → CF Worker `workers/analytics-collector/` → Analytics Engine). 쿠키·PII 없음 → 동의 불필요. **OFF 안전**(WORKER_URL 미설정=no-op). 상세 `docs/common/analytics.md`. 🚨 **배포(도메인 CF 프론팅·Web Analytics 활성화·Worker deploy·WORKER_URL 기입)는 사람** → `docs/inbox/user-actions.md`.

## 개발 기본 루프 (dev-loop — loop-patterns §7 · 실행 스킬 `/dev-loop CareerPage`)
> 사이클: 페르소나 리뷰(3렌즈→종합) → 시나리오 자동검증(표면별 러너)+자체 검토 → 갭→백로그 → 저위험 묶음 우선 개발 → 재검증 반복 → HTML 리포트. 상태는 이 절이 저장.

| 회전 | 상태 | 다음 액션 |
|---|---|---|
| 1 | **P2 완료(2026-09-03)** — verdict **PASS**: 링크 404 0·콘솔 에러 0·모바일 375px 정상·전 섹션 렌더 OK | 경미 4건만 등록(하단) |

- 경미(데이터 수치 불일치 — `data/career/basic.yaml` 수정 후 `node scripts/yaml-to-json.js` 재빌드, generated 직접 수정 금지): ①hero summary "25 projects(PM 12)"→실제 26(PM 13) ②meta description·stats "24+"→26 ③"Intl. conf 6" vs 실제 11 — 의도적 선별인지 사용자 확인.
- 권고: 핵심 인터랙션(언어 전환·논문 필터·모달) user-scenarios 경량 기록(회귀 방지).
