↑ [문서 인덱스](../index.md)

# code-structure.md — CareerPage 파일 위치맵

> 아키타입 E (정적 사이트). 실트리 기반 — 추측 없음. 파일 추가 시 갱신.
> 빌드 없음 · 프레임워크 없음 · GitHub Pages 직배포.

## 파일 위치맵

### 페이지 (root)

| 경로 | 역할 |
|------|------|
| `index.html` | 메인 포트폴리오 페이지 (유일한 공개 HTML) |

> `korea-economy-dashboard.html` — gitignored (stray), 사이트와 무관.

---

### assets/css

| 경로 | 역할 |
|------|------|
| `assets/css/style.css` | 전체 스타일 SSOT. 디자인 토큰(CSS 변수)·컴포넌트·다크모드 포함. 단일 파일 정책. |

---

### assets/js

| 경로 | 역할 |
|------|------|
| `assets/js/main.js` | 런타임 SSOT. 데이터 fetch·i18n·전 섹션 렌더·테마·언어 토글·네비·모달·페이저. 단일 파일 정책. |

내부 함수 맵 (main.js):

| 함수 | 역할 |
|------|------|
| `init()` | 부트스트랩: fetch → render → setup 체인. fetch 실패 시 `<main>`에 에러 메시지 표시 |
| `render(data)` | 전 섹션 렌더 디스패처 |
| `t(key)` | i18n 조회 (`I18N[LANG]` 경로 탐색) |
| `esc(s)` | XSS 방지 HTML 이스케이프 (모든 사용자 문자열 필수 경유) |
| `setText(id, val)` | getElementById + textContent 단축 |
| `applyTheme(theme)` / `setupThemeToggle()` | 다크/라이트 토글 |
| `applyLangUI()` / `setupLangToggle()` | EN/KO 언어 전환 |
| `renderHero(data)` | 히어로 섹션 (이름·태그·요약·버튼) |
| `setupTitleTypewriter(titles)` | 타이틀 타이프라이터 애니메이션 |
| `renderImpactStrip(data)` | 임팩트 수치 스트립 |
| `renderPhilosophy(p)` | 철학 섹션 (헤드라인·리드·바디·필라) |
| `renderResearchFocus()` | 연구 관심 그리드 (상수 `RESEARCH_INTERESTS`) |
| `renderEducation(items)` | 교육 타임라인 + 논문 확장/축소 |
| `formatMethodology(text)` | 논문 방법론 ol/p 포매터 |
| `parseAdvisor(r)` | 지도교수 링크 파서 |
| `renderExperience(items)` | 경력 타임라인 + 상세 확장/축소 |
| `renderFeaturedProjects(projects)` | 주요 프로젝트 카드 (인덱스 고정: 25·23·21) |
| `renderProjects(items)` | 전체 프로젝트 그리드 + 필터 + 페이저 |
| `getProjectTags(p)` | 프로젝트 분류 태그 추출 (methodology·domain) |
| `isGov(client)` | 정부과제 여부 판별 |
| `renderPublications(items)` | 논문 목록 + 필터 + 페이저 |
| `renderAwards(items)` | 수상 카드 + 페이저 |
| `renderPatents(items)` | 특허 카드 |
| `renderActivities(items)` | 활동/리더십 카드 + 페이저 |
| `activityIcons(role, org)` | 활동 아이콘 선택 |
| `formatOrg(s)` | 기관명 + 괄호 분리 포맷 |
| `renderSkills(skills)` | 기술 카드 |
| `renderContact(basic)` | 연락처 카드 |
| `renderFooter(data)` | 푸터 연도·업데이트 날짜 |
| `setupProjectModal()` / `openProjectModal(p)` / `closeModal()` | 프로젝트 상세 모달 |
| `setupNav()` / `highlightNav()` | 네비바 스크롤·활성 링크 |
| `setupScrollReveal()` / `reReveal(container)` | IntersectionObserver 스크롤 리빌 |
| `createPager(gridEl, perPage, navId)` | 범용 페이저 (상하 네비 포함) |
| `setupPhotoFallback()` | 프로필 이미지 에러 폴백 |

---

### assets/img

| 경로 | 역할 |
|------|------|
| `assets/img/jehun.jpg` | 프로필 사진 (LaTeX resume에도 참조) |
| `assets/img/background.jpg` | 히어로 배경 이미지 |

---

### data

| 경로 | 역할 |
|------|------|
| `data/portfolio.json` | EN 포트폴리오 JSON (site fetch 대상, YAML 빌드 산출) |
| `data/portfolio.ko.json` | KO 포트폴리오 JSON (site fetch 대상, YAML 빌드 산출) |
| `data/portfolio.en.json` | EN 빌드 백업 (deploy.bat이 생성; site가 직접 참조하지 않음) |
| `data/resume-en.pdf` | 영문 이력서 PDF (히어로 다운로드 링크) |
| `data/resume-ko.pdf` | 국문 이력서 PDF (히어로 다운로드 링크) |
| `data/resume-en-brief.pdf` | 영문 약식 이력서 PDF |
| `data/resume-ko-brief.pdf` | 국문 약식 이력서 PDF |

#### data/career/ (YAML SSOT — 편집 원본)

| 경로 | 역할 |
|------|------|
| `data/career/basic.yaml` | 이름·이메일·타이틀·위치 |
| `data/career/philosophy.yaml` | 철학·필라·통계 |
| `data/career/education.yaml` | 학력 (최신순) |
| `data/career/work.yaml` | 경력 (최신순) |
| `data/career/skills.yaml` | 기술 카테고리·항목 |
| `data/career/honors.yaml` | 수상·성과 |
| `data/career/patents.yaml` | 특허 |
| `data/career/activities.yaml` | 활동·리더십 |
| `data/career/projects-2024-2025.yaml` | 프로젝트 2024-2025 |
| `data/career/projects-2022-2023.yaml` | 프로젝트 2022-2023 |
| `data/career/projects-2020-2021.yaml` | 프로젝트 2020-2021 |
| `data/career/projects-2017-2019.yaml` | 프로젝트 2017-2019 |
| `data/career/publications-2023-2024.yaml` | 논문 2023-2024 |
| `data/career/publications-2021-2022.yaml` | 논문 2021-2022 |
| `data/career/publications-2019-2020.yaml` | 논문 2019-2020 |
| `data/career/publications-2017-2018.yaml` | 논문 2017-2018 |

---

### scripts (빌드·변환)

| 경로 | 역할 | 상태 |
|------|------|------|
| `scripts/yaml-to-json.js` | YAML → portfolio.json (EN 또는 KO) | 활성 (매 배포) |
| `scripts/yaml-to-latex.js` | YAML → latex/resume.tex + sections/*.tex | 활성 (이력서 재빌드) |
| `scripts/build-resume.bat` | LaTeX → en/ko PDF 생성 | 활성 (이력서 재빌드) |
| `scripts/sync-sheets.js` | Google Sheets → portfolio.json | 레거시 (YAML 파이프라인으로 대체) |
| `scripts/json-to-yaml.js` | portfolio.json → data/career/*.yaml | 레거시 (1회성 마이그레이션 완료) |
| `scripts/split-yaml.js` | projects/publications YAML 연도별 분할 | 레거시 (1회성 완료) |
| `scripts/fill-ko.js` | YAML KO 번역 자동완성 | 레거시 (1회성 완료) |

---

### latex (이력서 LaTeX 소스)

| 경로 | 역할 |
|------|------|
| `latex/resume.cls` | 커스텀 LaTeX 클래스 |
| `latex/fonts/` | Pretendard 폰트 (Bold·Light·Medium·Regular) |

> `latex/resume.tex`, `latex/sections/*.tex`, `latex/*.pdf` — gitignored (빌드 산출).

---

### 기타 루트 파일

| 경로 | 역할 |
|------|------|
| `deploy.bat` | 전체 배포 시퀀스 (EN+KO 빌드 → rename → commit → push) |
| `CNAME` | GitHub Pages 커스텀 도메인 (`jehun-lee.work`) |
| `.nojekyll` | GitHub Pages Jekyll 비활성화 |
| `package.json` / `package-lock.json` | js-yaml 의존성 (스크립트 전용) |
| `.github/workflows/deploy.yml` | GitHub Pages 자동 배포 워크플로 |

---

## 아키타입 E 감사 (C1~C7)

| 항목 | 상태 | 비고 |
|------|------|------|
| C2 아키타입 정합 | 정상 | 정적사이트 E 골격 준수 |
| C5 code-structure 지도 | 생성됨 | 이 파일 |
| C6 빌드산출 비커밋 | 정상 | latex/*.tex·pdf gitignored |

### 플래그

| 항목 | 내용 |
|------|------|
| `data/portfolio.en.json` | site가 직접 fetch하지 않음 (`portfolio.json` + `portfolio.ko.json`만 사용). deploy.bat이 생성하는 중간산출. 불필요하면 gitignore 추가 가능 — 판단은 owner. |
| `scripts/` 중복 헬퍼 | `yaml-to-json.js`와 `yaml-to-latex.js`가 `load`, `loadMerged`, `extractLang`, `locDegree`, `locRegion`, `locPeriod`를 각자 정의. 공통 추출 시 별도 파일 필요 — 지금은 각 스크립트가 독립 실행이므로 YAGNI. |
| `debug/` 폴더 | 빈 폴더(git 미추적). 잔존 이유 불명 — 불필요하면 삭제 가능. |
