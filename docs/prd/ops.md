# ops — 운영·분석 (L2)
목차: [ops-01](#ops-01) 방문 분석 · [ops-02](#ops-02) 레거시 스크립트 정리 · [ops-03](#ops-03) 미머지 브랜치 정리 · [ops-04](#ops-04) dev-history 카테고리 재편 · [ops-05](#ops-05) dev-loop 1회전 · [ops-06](#ops-06) 문서 구조 이전 (do-03/do-05)

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

<a id="ops-08"></a>
## ops-08 · 코드 위생 (설정·경로·비밀·주석)

### 무엇·왜
사이트·빌드 스크립트·Worker 코드와 문서가 한 가지 위생 규칙을 따른다. 이유: 같은 값이 여러 파일에 있으면 하나만 고쳐져 화면·이력서·Worker가 서로 달라지고, 공개 저장소에 비밀이나 개인 PC 경로가 실려 나간다.

### 규칙
1. 사이트 주소·프로필 링크·허용 출처·수집 주소 같은 설정 값은 저장소에 한 번만 적는다. 다른 파일은 그 한 곳을 읽거나 빌드가 채운다.
2. 코드·스크립트에 저장소 밖 절대 경로(`C:\…`, `/Users/…`, `/home/…`)를 적지 않는다. 저장소 안 위치는 그 파일 기준 상대 경로로 쓴다.
3. 비밀 값(키·토큰·비밀번호)은 코드·문서·커밋에 없다. 비밀이 생기면 git이 무시하는 env 파일에서만 읽고, 이름만 적은 `.env.example`을 같이 둔다.
4. `.gitignore`는 `.env`와 `.env.*`를 무시하고 `.env.example`만 예외로 둔다.
5. 주석은 전역 규칙을 따른다: 파일마다 목적 한 줄, 이름이 말해 주지 않는 함수만 한 줄, 묶음을 가르는 구역 머리말. 코드를 다시 말하는 주석·코드에 있는 값·이력·주석 처리한 코드는 두지 않는다. 코드와 주석은 영어.
6. 함수 하나는 한 가지 일을 하고 입력은 4개까지다(넘으면 객체 하나로 묶는다).
7. 사람이 읽는 문서(`docs/`, `README.md`)는 되어야 할 모습과 이유만 적는다. 날짜·이력은 git과 `docs/_old/`에만.

### 차이
- 1: LinkedIn·Scholar 주소가 `index.html`, `assets/js/main.js`, `scripts/yaml-to-latex.js` 세 곳에, 사이트 주소가 `index.html`, `scripts/yaml-to-latex.js`, `workers/analytics-collector/src/index.js`에 따로 있다.
- 4: `.gitignore`가 `.env`만 무시한다.
- 5: `scripts/*.js`, `assets/js/analytics.js`, `workers/analytics-collector/src/index.js`, `wrangler.toml`, `deploy.bat`의 머리 주석이 여러 줄이고 사용법·동작을 되풀이한다. 일부 주석이 한국어다.
- 6: `assets/js/main.js`의 `createCarousel`이 입력 5개다.
- 7: `docs/prd/ops.md`·`data.md`·`ux.md`에 날짜와 진행 이력이 있다.

### QA
- `python agent-ops/scripts/sec-scan.py projects/CareerPage` · 표시 없는 걸림 0.
- `git grep -nE "[A-Za-z]:\\\\|/Users/|/home/" -- scripts assets workers index.html` · 0줄.
- `git check-ignore .env .env.local` 두 줄 출력, `git check-ignore .env.example` 출력 없음.
- `npm test` · 통과.
- 수동: 바뀐 파일마다 머리 주석 한 줄, 한국어 주석 없음.
- 반영: 차이
