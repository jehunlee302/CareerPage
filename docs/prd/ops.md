# ops — 운영·분석 (L2)

예전 백로그·감사·병합 보고서 원문은 [_old/backlog.md](../_old/backlog.md), [_old/backlog/](../_old/backlog/merge-2026-10.md).

<a id="ops-01"></a>
## ops-01 · 방문 분석
이유 (2026-08-15, 사용자 요청 — 방문수 + 페이지별 체류): 어느 페이지를 유심히 봤는지 안다. 자생 생태계(feedback 루프·events·retention·로그인)는 해당 없음 (포트폴리오, 제품 아님).
- 2계층:
  1. Cloudflare Web Analytics (방문·페이지·referrer, 쿠키리스, 코드 0).
  2. 자체 체류 비콘 `assets/js/analytics.js` (같은 출처 로컬 스크립트 = 규칙 준수, 체류시간·스크롤깊이 → `sendBeacon` → CF Worker `workers/analytics-collector/` → Analytics Engine).
- 쿠키·PII 없음 → 동의 불필요. OFF 안전 (`WORKER_URL` 미설정 = no-op; 현재 비어 있음).
- 상세 [common/analytics.md](../common/analytics.md). 배포(도메인 CF 프론팅·Web Analytics 활성화·Worker deploy·`WORKER_URL` 기입)는 사람 → [user-actions.md](../user-actions.md).
- QA: 배포 후 CF 대시보드에 방문이 보이고, Analytics Engine `careerpage_dwell`에 데이터포인트가 쌓인다.

<a id="ops-02"></a>
## ops-02 · 레거시 스크립트 정리
이유 (2026-04-24): `sync-sheets.js`, `json-to-yaml.js`, `split-yaml.js`, `fill-ko.js`가 git에 추적된다.
- 단계: repo에서 제거하거나 legacy 브랜치로 보관.
- `fix/scripts-cleanup` (01E4Rw, 레거시 변환 스크립트 4개 삭제): 2026-10-04 git이 병합 거부 — 다른 세션 미커밋 파일 `data/portfolio.json`·`docs/pipeline.md`·`index.html`과 겹침. 그 변경 정리 후 병합하고, 이 행을 done으로.
- QA: `scripts/`에 네 파일이 없고 `deploy.bat`·`build-resume.bat`가 그대로 동작.

<a id="ops-03"></a>
## ops-03 · 미머지 브랜치 정리
이유: 감사 (2026-10-04) 🔴0 🟡2 🟢1.
- 🟡 미머지 브랜치 6개:

| 브랜치 | 분류 | 고유 커밋 | 마지막 | 권장 조치 |
|---|---|---|---|---|
| `docs/analytics-naming-consistency` | 충돌 (docs/backlog.md) | 1 | 2026-08-20 | 장기 분기 — 폐기 or rebase |
| `docs/structure-audit` | 충돌 (docs/backlog.md) | 1 | 2026-08-20 | 장기 분기 — 폐기 or rebase |
| `fix/scripts-cleanup` | 충돌 (docs/backlog.md) | 4 | 2026-10-04 | ops-02 참조 |
| `integration/r6b` | 깨끗 | 1 | 2026-05-27 | 이미 반영됐는지 확인 → 머지 or 폐기 |
| `fix/dev-loop-r5-data` | 깨끗 | 1 | 2026-09-03 | 이미 반영됐는지 확인 → 머지 or 폐기 |
| `integration/r6` | 깨끗 | 2 | 2026-09-03 | 이미 반영됐는지 확인 → 머지 or 폐기 |

- 🟡 14일 넘은 미커밋 변경 2개 — 커밋/폐기 결정 (보존 브랜치 `wip/orphan-*` 있으면 참고).
- 🟢 docs/review/ 단일자식 폴더 → 상위 평탄화 (2026-10-30 현재 폴더 없음).
- `docs/backlog.md`는 이제 `_old/`에 있으므로 충돌 브랜치는 rebase 시 PRD.md 행으로 옮긴다.
- QA: `git branch` 미머지 목록이 비거나 남길 이유가 행에 적혀 있다. 브랜치 삭제는 사람 승인.

<a id="ops-04"></a>
## ops-04 · dev-history 카테고리 재편
- flat → `{ui}/` 이관 완료 2026-07-18, 월별 summary는 루트 정위치 (카테고리 폴더 완비, 루트 flat은 README + 월별 summary뿐).
- 2026-10-30 ops-06에서 `docs/_old/dev-history/`로 보관.
- Status: done

<a id="ops-05"></a>
## ops-05 · dev-loop 1회전
이유: 사이클 = 페르소나 리뷰(3렌즈 → 종합) → 시나리오 자동검증(표면별 러너) + 자체 검토 → 갭 → 백로그 → 저위험 묶음 우선 개발 → 재검증 반복 → HTML 리포트.
- 회전 1: P2 완료 (2026-09-03) — verdict PASS: 링크 404 0 · 콘솔 에러 0 · 모바일 375px 정상 · 전 섹션 렌더 OK.
- 경미 4건 등록 → data-07 (수치 3건), ux-04 (회귀 기록 권고).
- Status: done

<a id="ops-06"></a>
## ops-06 · 문서 구조 이전 (do-03/do-05)
이유: agent-ops do-03 (첫 접촉 시 이전) + do-05 (PRD 카테고리·한글).
- `docs/index.md` → `docs/INDEX.md`; `prod.md`·`backlog.md`·`backlog/` 내용 → PRD.md + `prd/*.md` (원문은 `docs/_old/`); `dev-history/` → `docs/_old/dev-history/`; `inbox/user-actions.md` → `docs/user-actions.md`.
- CLAUDE.md는 영어, PRD.md·INDEX.md를 가리킨다.
- QA: 이동 파일마다 `check-split.py` missing=0; `gen-status.py --check` exit 0.
