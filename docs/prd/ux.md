# ux — 화면·사용성 (L2)

디자인 규칙은 [ui/design-system.md](../ui/design-system.md), 성능 예산은 [common/coding.md](../common/coding.md).

<a id="ux-01"></a>
## ux-01 · 에셋 예산
이유: 에셋 예산 초과 (2026-07-16 등록, 부분 수정).
- 완료: `jehun.jpg` 압축 993 KB → 104 KB (1200px q82) → images ~319 KB ✓, page weight ~490 KB ✓.
- 남음: `portfolio.json` ~74 KB (목표 60), `style.css` ~51 KB (목표 40) — minify/split 검토.
- 참조: assets/css/style.css, data/portfolio.json, docs/common/coding.md
- QA: 두 파일 크기가 목표 이하, 화면 회귀 없음 (UC-2 ~ UC-14).

<a id="ux-02"></a>
## ux-02 · 검색 기능
이유 (2026-04-24): 프로젝트 25+·논문 26+ — 키워드 검색이 UX를 개선한다.
- 단계: portfolio.json 대상 클라이언트사이드 검색 검토 (외부 라이브러리 금지).
- QA: 키워드 입력 시 일치하는 프로젝트·논문만 보인다.

<a id="ux-03"></a>
## ux-03 · 페이지 번호 직접 이동
이유 (2026-04-24): 현재 페이저는 prev/next만 지원한다.
- 단계: 3페이지 이상이면 페이지 번호 버튼 추가.
- QA: 번호를 누르면 해당 페이지로 간다 (UC-9, UC-11, UC-12 확장).

<a id="ux-04"></a>
## ux-04 · 핵심 인터랙션 회귀 기록
이유: dev-loop 1회전 (2026-09-03) 권고 — 핵심 인터랙션(언어 전환·논문 필터·모달)을 user-scenarios에 경량 기록해 회귀를 막는다.
- 이미 있는 정본: [qa/user-scenarios.md](../qa/user-scenarios.md) (2026-08-11, UC-4 언어 토글, UC-9/UC-10 모달, UC-11 논문 필터).
- 단계: 위 UC를 자동으로 다시 돌릴 수 있는 경량 점검으로 묶는다.
- QA: 점검 하나가 세 인터랙션을 통과/실패로 보고한다.
