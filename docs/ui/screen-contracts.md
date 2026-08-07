↑ [문서 인덱스](../index.md)

> **UI 화면계약 (수용 기준 — 회귀·범위이탈 판정 baseline).** 핵심 화면만, 각 필수 요소 1줄. 변경 후 이 요소가 살아있는지가 회귀 판정 기준(design-workflow §2). 근거: `~/.claude/docs/agents/design-workflow.md`(§2 화면계약)·`~/.claude/docs/rules/ui.md`. 현행 정본화(신규 설계 아님) — 대상은 단일 페이지 `index.html` 섹션·모달. 전 섹션(15개)은 `sections.md` 참조.

# Screen Contracts (수용 기준)

단일 페이지 정적 포트폴리오 — "화면"은 `index.html`의 스크롤 섹션 + 전역 요소. 방문자 시나리오(첫인상 → 신뢰 형성 → 검증 → 연락)를 관통하는 핵심만 등록.

## 핵심 화면

| 화면 | ID | 필수 요소 (수용 기준) |
|------|----|------------------------|
| 전역 내비 | `#navbar` | 로고(JH) + 섹션 앵커 링크(Philosophy·Education·Experience·Projects·Publications·Awards·Contact) + 테마 토글 + 언어 토글(EN/KO) + 모바일 햄버거 |
| Hero(랜딩) | `#hero` | 이름(EN/KR) + 타이핑 타이틀 + 위치 + 요약 + 태그 + CTA(Contact·Resume EN/KO·LinkedIn·Scholar) + 프로필 사진 |
| Impact Strip | `#impact` | 자동 카운트되는 핵심 통계 수치 스트립 |
| Philosophy(철학) | `#philosophy` | 헤드라인 + 리드 + 본문 + 3개 pillar(제품이 무엇을 믿는지 전달 — ui-quality 철학전달 축) |
| Experience(경력) | `#experience` | 회사·역할 타임라인 + 책임/성과 상세 |
| Featured Projects | `#featured` | 대표 프로젝트 3개 하이라이트 카드 |
| All Projects | `#projects` | 필터 바 + 페이지네이션 그리드 + 카드 클릭 시 상세 모달 진입 |
| Publications | `#publications` | 유형 필터(Journal/Conference/Poster) + 페이지네이션 목록 |
| Contact(연락) | `#contact` | 이메일·소셜 링크 연락 카드 |
| 프로젝트 상세 모달 | `#projectModal` | 오버레이 + 닫기 버튼 + 프로젝트 상세 본문(All/Featured 카드 진입점) |

## 웹앱 필수 화면 (ui.md) — 해당 없음 사유

- **로그인**: 해당 없음 — 인증 없는 공개 정적 포트폴리오(1인 소유, 사용자 계정 없음).
- **개선사항 보드(`/feedback`)**: 해당 없음 — 단일 소유자 개인 포트폴리오, 사용자 피드백 등록 대상 아님(연락은 Contact 섹션으로 대체).
- **철학 화면**: 대상 — `#philosophy` 섹션으로 구현됨(위 표 등록).

> `korea-economy-dashboard.html`은 nav에 연결되지 않은 독립 실험 페이지 — 포트폴리오 제품 핵심 화면 아님(계약 대상 외).
