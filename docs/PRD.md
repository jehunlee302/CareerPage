# CareerPage 요구사항 (PRD)

목표: 이제훈(Jehun Lee)의 경력·연구·철학을 한 페이지로 보여 주는 데이터 기반 정적 포트폴리오 (https://jehun-lee.work). YAML 한 곳(SSOT)만 고치면 사이트가 갱신된다.

한 줄 = L4 묶음 = 검사 하나. ID 앞부분 = 영역 = `prd/<area>.md`. 상태: todo | dev | done (`feat/<id>-*` 브랜치가 있으면 dev로도 표시). 사람이 할 일은 [user-actions.md](user-actions.md).

## 지금 진행 중

- ops-06 — `feat/do-05-ko-prd`: 문서를 do-01/do-05 구조(PRD.md·prd/·INDEX.md, 한글)로 이전. 원본은 `docs/_old/`.
- ops-01 — 브랜치 없음: 방문 분석 코드는 완료, 배포(Cloudflare 프론팅·Worker 배포·`WORKER_URL` 기입)는 사람 몫.
- ux-01 — 브랜치 없음: 에셋 예산 일부 남음 (`portfolio.json` ~74 KB, `style.css` ~51 KB).
- ops-03 — 브랜치 없음: 미머지 브랜치 6개 살릴지·폐기할지 결정 대기.

## 사이트 구성 (site)

| 묶음 (L4) | 상태 | 단계 (L5) | ID |
|---|---|---|---|
| 한 페이지 섹션 구성 | done | Hero · Impact Strip · Philosophy · Research Focus · Education · Experience · 프로젝트 · 논문 · 수상 · 특허 · 활동 · 기술 · 연락처 | [site-01](prd/site.md#site-01) |
| 비기능 요구 | done | 빌드 단계 없음 · 프레임워크 없음 · 정적 호스팅 · 외부 의존은 Google Fonts만 · 오프라인 우아한 저하 · WCAG AA 대비 | [site-02](prd/site.md#site-02) |

## 데이터·파이프라인 (data)

| 묶음 (L4) | 상태 | 단계 (L5) | ID |
|---|---|---|---|
| YAML 파이프라인 v2 | done | `data/career/*.yaml` SSOT · 연도별 분할 · `yaml-to-json.js --lang en/ko`\|ko` · `deploy.bat` 연결 | [data-01](prd/data.md#data-01) |
| YAML 한국어 번역 | todo | 비어 있는 `ko: ""` 채우기 · 프로젝트 제목 · 경력 직위 · 수상 | [data-02](prd/data.md#data-02) |
| 연구 관심사·Hero 태그 → YAML | todo | `RESEARCH_INTERESTS`·`HERO_TAGS`를 YAML로 · main.js 하드코딩 제거 | [data-03](prd/data.md#data-03) |
| 대표 프로젝트 번호 → YAML | todo | `FEATURED_PROJECT_INDICES` 설정화 · basic.yaml 또는 config.yaml | [data-04](prd/data.md#data-04) |
| YAML 스키마 검증 | todo | 필수 필드 검사 · 명확한 오류 메시지 · 조용한 실패 제거 | [data-05](prd/data.md#data-05) |
| 한국어 홈페이지 토글 | todo | ko 필드 채움 확인 · `portfolio.ko.json` 확인 · 한국어 방문자 기본값 | [data-06](prd/data.md#data-06) |
| 데이터 수치 불일치 | todo | 프로젝트 수 26(PM 13) · 메타 "24+" → 26 · 국제학회 6 vs 11 사용자 확인 · YAML 수정 후 재빌드 | [data-07](prd/data.md#data-07) |

## 화면·사용성 (ux)

| 묶음 (L4) | 상태 | 단계 (L5) | ID |
|---|---|---|---|
| 에셋 예산 | dev | 사진 압축 (완료) · `portfolio.json` ≤ 60 KB · `style.css` ≤ 40 KB · minify/분할 검토 | [ux-01](prd/ux.md#ux-01) |
| 검색 기능 | todo | `portfolio.json` 대상 클라이언트 검색 · 프로젝트·논문 키워드 | [ux-02](prd/ux.md#ux-02) |
| 페이지 번호 직접 이동 | todo | 3페이지 이상에 번호 버튼 · 이전/다음 유지 | [ux-03](prd/ux.md#ux-03) |
| 핵심 인터랙션 회귀 기록 | todo | 언어 전환 · 논문 필터 · 모달 · user-scenarios 경량 기록 | [ux-04](prd/ux.md#ux-04) |

## 운영·분석 (ops)

| 묶음 (L4) | 상태 | 단계 (L5) | ID |
|---|---|---|---|
| 방문 분석 | dev | CF Web Analytics · 체류 비콘 `analytics.js` · Worker `analytics-collector` · 배포·`WORKER_URL` (사람) | [ops-01](prd/ops.md#ops-01) |
| 레거시 스크립트 정리 | todo | `sync-sheets.js` · `json-to-yaml.js` · `split-yaml.js` · `fill-ko.js` 제거 또는 legacy 브랜치 · `fix/scripts-cleanup` 병합 | [ops-02](prd/ops.md#ops-02) |
| 미머지 브랜치 정리 | todo | 브랜치 6개 분류 · 살릴지·폐기 결정 · 14일 넘은 미커밋 변경 2개 결정 | [ops-03](prd/ops.md#ops-03) |
| dev-history 카테고리 재편 | done | flat → `{ui}/` · 월별 summary 루트 유지 | [ops-04](prd/ops.md#ops-04) |
| dev-loop 1회전 | done | 페르소나 리뷰 · 시나리오 자동 검증 · 갭 → 백로그 · verdict PASS | [ops-05](prd/ops.md#ops-05) |
| 문서 구조 이전 (do-03/do-05) | dev | index.md → INDEX.md · prod·backlog → PRD + 상세 · 이력·보고서 → `_old/` · `gen-status --check` | [ops-06](prd/ops.md#ops-06) |
