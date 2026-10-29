# site — 사이트 구성 (L2)

원본 제품 명세(영문)는 [_old/prod.md](../_old/prod.md).

<a id="site-01"></a>
## site-01 · 한 페이지 섹션 구성
이유: 이제훈의 경력·연구 성과·직업 철학을 AI 연구 협력자, 채용 담당자(산업·학계), 시스템 컨설팅 고객(반도체·제조)에게 한 페이지로 보여 준다.
- 주소: https://jehun-lee.work (GitHub Pages + GoDaddy CNAME).
- 섹션과 데이터 출처:

| 섹션 | 데이터 출처 | 핵심 기능 |
|---|---|---|
| Hero | basic.yaml | 타이프라이터 직함, 프로필 사진, 소셜 링크 |
| Impact Strip | 프로젝트·논문에서 계산 | 자동 집계 통계 |
| Philosophy | philosophy.yaml | "Systemic Excellence" + 기둥 3개 |
| Research Focus | main.js 하드코딩 | 연구 관심사 카드 6개 |
| Education | education.yaml | 타임라인 + 펼치는 학위논문 상세 |
| Experience | work.yaml | 타임라인 + 책임 목록 |
| Featured Projects | projects-*.yaml (번호 25, 23, 21) | 카드 3개 그리드, 클릭 → 모달 |
| All Projects | projects-*.yaml | 페이지 그리드, 주제/PM/정부과제 필터 |
| Publications | publications-*.yaml | 페이지 목록, 유형 필터, 논문 링크 |
| Awards | honors.yaml | 페이지 3열 그리드 |
| Patents | patents.yaml | 카드 목록 |
| Activities | activities.yaml | 페이지 그리드 |
| Skills | skills.yaml | 분류 카드 |
| Contact | basic.yaml | 이메일, LinkedIn, Scholar, Google Site |

- 이력: v1.0.0 첫 공개 2026-03-29, v3.0–v3.2 (2026-03-31) 타임라인·페이지·필터·모달 ([_old/dev-history](../_old/dev-history/summary-2026-03.md)).
- 섹션 배치는 [ui/sections.md](../ui/sections.md), 화면 계약은 [ui/screen-contracts.md](../ui/screen-contracts.md).
- QA: [qa/user-scenarios.md](../qa/user-scenarios.md) UC-2 ~ UC-14가 통과한다.
- Status: done

<a id="site-02"></a>
## site-02 · 비기능 요구
이유: 유지비 없이 오래 가는 정적 사이트.
- 빌드 단계 없음: vanilla HTML/CSS/JS만.
- 프레임워크 의존 없음.
- 정적 호스팅 (GitHub Pages).
- 외부 의존은 Google Fonts뿐.
- 첫 폰트 로드 뒤에는 오프라인에서도 동작 (우아한 저하).
- WCAG AA 대비 (4.5:1).
- 데이터 구조 요약: `data/career/*.yaml` → `yaml-to-json.js` → `portfolio.json` → `git push` → GitHub Pages. 상세는 [pipeline.md](../pipeline.md).
- QA: 외부 스크립트는 Google Fonts뿐 (`index.html` 검사), 대비 4.5:1 이상.
- Status: done
