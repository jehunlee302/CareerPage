↑ [문서 인덱스](../index.md)

> **사용자 시나리오 (QA 수용 기준 — browser MCP 자동 assert 대상).** 현행 구현(`index.html`·`assets/js/main.js`)에서 추출한 정본 — 신규 설계 아님. 근거: `~/.claude/docs/agents/qa-process.md`(§7 시나리오)·`../ui/screen-contracts.md`(화면계약)·`../ui/sections.md`(섹션맵). 각 유스케이스(UC-n) → 원자 동작(S-n.m)은 `given(상태) → action(조작) → expect(관측가능한 기대결과)` 형식. expect는 요소 존재·텍스트·URL 해시·display 상태 등 **관측·assert 가능**하게 기술.
>
> **대상**: 인증 없는 공개 정적 단일 페이지 포트폴리오(https://jehun-lee.work). 서버·계정·세션 없음 — 상태는 `localStorage`(theme·lang)만. 기능 플로우가 있으므로(토글·필터·페이지네이션·모달) UC→원자동작으로 정본화한다.

# User Scenarios (CareerPage)

## UC-1 로그인 — 해당 없음

**해당 없음** (사유: 인증 없는 공개 정적 포트폴리오. 사용자 계정·로그인·게스트·로그아웃·세션·보호 라우트 개념이 존재하지 않음. 1인 소유 SSOT `data/career/*.yaml` → 빌드 → 정적 렌더). 성공/잘못된PW/게스트/로그아웃/세션유지/보호라우트 리다이렉트 시나리오 전부 대상 아님.

---

## UC-2 최초 로드 · 첫인상 (Hero)

- **S-2.1** given(테마·언어 미저장의 새 브라우저) → action(`/` 방문) → expect(`<html data-theme>` = `light`, `<html lang>` = `en`; `#navbar .nav-logo` 텍스트 = `JH`).
- **S-2.2** given(페이지 로드 완료) → action(대기) → expect(`#hero .hero-name` 에 `Jehun Lee` 와 `이제훈` 포함; `#profileImg` 요소 존재).
- **S-2.3** given(로드 후 ~1초 경과) → action(타이핑 애니메이션 관찰) → expect(`#heroTitleText` 텍스트 길이 > 0, 시간에 따라 변함 — 타이프라이터 동작).
- **S-2.4** given(Hero 렌더) → action(태그·요약 확인) → expect(`#heroTags .hero-tag` 개수 ≥ 6; `#heroSummary` 텍스트 비어있지 않음).
- **S-2.5** given(Hero CTA) → action(요소 확인) → expect(`#heroContactBtn` href = `#contact`; `#heroResumeBtnEn` href = `data/resume-en.pdf`; `#heroResumeBtnKo` href = `data/resume-ko.pdf`; LinkedIn/Scholar 링크 `target="_blank"`).
- **S-2.6** given(정적 임팩트 스트립) → action(`#impactStrip` 확인) → expect(`.impact-item` 개수 = 5; 각 `.impact-num` 텍스트가 숫자 문자열).

## UC-3 테마 토글 (light ↔ dark, localStorage 유지)

- **S-3.1** given(`data-theme`=`light`) → action(`#themeToggle` 클릭) → expect(`<html data-theme>` = `dark`; `#themeToggle` aria-label = `Switch to light mode`).
- **S-3.2** given(`data-theme`=`dark`) → action(`#themeToggle` 재클릭) → expect(`<html data-theme>` = `light`; aria-label = `Switch to dark mode`).
- **S-3.3** given(dark로 토글 후) → action(페이지 새로고침) → expect(`<html data-theme>` = `dark` — `localStorage.theme` 유지; FOUC 없이 초기부터 dark).

## UC-4 언어 토글 (EN ↔ KO, localStorage 유지)

- **S-4.1** given(`lang`=`en`, 토글 라벨 `EN / KO`) → action(`#langToggle` 클릭) → expect(`<html lang>` = `ko`; `.lang-current` 텍스트 = `KO`; nav 링크 `#philosophy` 텍스트 = `철학`).
- **S-4.2** given(`lang`=`ko`) → action(`#langToggle` 재클릭) → expect(`<html lang>` = `en`; nav 링크 `#philosophy` 텍스트 = `Philosophy`).
- **S-4.3** given(KO 전환 완료) → action(섹션 제목 확인) → expect(`#experience .section-title` 텍스트 = `경력 사항`; `#contact .section-title` = `연락처`).
- **S-4.4** given(KO로 토글 후) → action(새로고침) → expect(`<html lang>` = `ko` — `localStorage.lang` 유지; `.lang-current` = `KO`).
- **S-4.5** given(전환 데이터 로드 실패 가정) → action(토글 후 fetch 실패) → expect(`LANG` 이전 값으로 롤백, `<html lang>` 원복 — `catch` 롤백 경로; 관측: 언어가 바뀌지 않고 콘솔에 `Language switch error` 기록).

## UC-5 내비게이션 · 앵커 스크롤

- **S-5.1** given(페이지 상단) → action(nav `#projects` 링크 클릭) → expect(URL 해시 = `#projects`; 뷰포트가 `#projects` 섹션으로 스크롤).
- **S-5.2** given(스크롤 위치 > 40px) → action(스크롤) → expect(`#navbar` 에 `scrolled` 클래스 부여 — 스크롤 섀도).
- **S-5.3** given(특정 섹션이 뷰포트 내) → action(스크롤 정지) → expect(해당 섹션의 nav 링크에 `active` 클래스 — IntersectionObserver 하이라이트).
- **S-5.4** given(모바일 폭, 햄버거 표시) → action(`#navToggle` 클릭) → expect(`#navLinks` 에 `open` 클래스 부여 — 드롭다운 표시).
- **S-5.5** given(모바일 드롭다운 열림) → action(드롭다운 내 링크 클릭) → expect(`#navLinks` 에서 `open` 클래스 제거 — 메뉴 닫힘).

## UC-6 스크롤 리빌 애니메이션

- **S-6.1** given(하단 `.reveal` 요소가 아직 뷰포트 밖) → action(요소가 뷰포트 진입하도록 스크롤) → expect(해당 `.reveal` 요소에 `visible` 클래스 부여).

## UC-7 Education — 논문 상세 확장/접기

- **S-7.1** given(`#educationTimeline` 렌더, thesis 상세 있는 항목) → action(초기 상태 확인) → expect(`.edu-thesis-details` 의 `display` = `none`; `.edu-expand-hint` 텍스트 = `▸ Details`(EN)).
- **S-7.2** given(접힘 상태) → action(`.edu-thesis-expandable` 클릭) → expect(`.edu-thesis-details` `display` = `block`; hint 텍스트 = `▾ Collapse`).
- **S-7.3** given(펼침 상태) → action(재클릭) → expect(`display` = `none`; hint = `▸ Details`).
- **S-7.4** given(`.edu-thesis-expandable` 포커스) → action(Enter 또는 Space 키) → expect(클릭과 동일하게 상세 토글 — 키보드 접근성).

## UC-8 Experience — 상세(책임/성과) 확장/접기

- **S-8.1** given(`#experienceTimeline` 렌더, responsibilities/highlights 있는 항목) → action(초기 확인) → expect(`.exp-details` `display` = `none`; `.exp-expand-hint` = `▸ Details`).
- **S-8.2** given(접힘) → action(`.exp-expand-btn` 클릭) → expect(`.exp-details` `display` = `block`; hint = `▾ Collapse`; `.tl-responsibilities li` 개수 ≥ 1).
- **S-8.3** given(펼침) → action(재클릭) → expect(`display` = `none`; hint = `▸ Details`).
- **S-8.4** given(`.exp-expand-btn` 포커스) → action(Enter/Space) → expect(상세 토글 — 키보드 접근성).

## UC-9 All Projects — 필터 · 페이지네이션 · 상세 모달

- **S-9.1** given(`#projectsGrid` 렌더) → action(초기 확인) → expect(`.project-card` 표시 개수 ≤ 9(`PROJ_PER_PAGE`); `#projectsPager .paged-info` 텍스트 = `1 / N` 형식; `#projFilterBar .filter-btn[data-proj-filter="all"]` 에 `active` 클래스).
- **S-9.2** given(1페이지) → action(`#projectsPager .paged-next` 클릭) → expect(`.paged-info` = `2 / N`; 표시 카드 세트 변경; `.paged-prev` `disabled` 해제).
- **S-9.3** given(마지막 페이지) → action(`.paged-next` 상태 확인) → expect(`.paged-next` `disabled` = true).
- **S-9.4** given(`all` 필터) → action(`data-proj-filter="pm"` 버튼 클릭) → expect(해당 버튼에 `active`; 표시 카드 전부 `.tag.pm` 포함; 페이저 `1 / M`으로 리셋).
- **S-9.5** given(`pm` 필터) → action(`data-proj-filter="gov"` 클릭) → expect(표시 카드 전부 `.tag.gov` 포함; 그 외 카드 `display:none`).
- **S-9.6** given(method/domain 필터 버튼 존재) → action(예 `data-proj-filter="method:AI(RL)"` 클릭) → expect(표시 카드의 `data-proj-methods` 에 `AI(RL)` 포함).
- **S-9.7** given(프로젝트 그리드) → action(임의 `.project-card` 클릭) → expect(`#projectModal` 에 `open` 클래스; `#modalBody .modal-title` 텍스트 비어있지 않음; `body` `overflow` = `hidden`).
- **S-9.8** given(모달 열림) → action(`#modalClose` 클릭) → expect(`#projectModal` 에서 `open` 제거; `body.overflow` 복원(빈 문자열)).
- **S-9.9** given(모달 열림) → action(오버레이(모달 바깥 `#projectModal` 영역) 클릭) → expect(모달 닫힘 — `open` 제거).
- **S-9.10** given(모달 열림) → action(Escape 키) → expect(모달 닫힘 — `open` 제거).

## UC-10 Featured Projects — 하이라이트 카드 → 모달

- **S-10.1** given(`#featuredGrid` 렌더) → action(초기 확인) → expect(`.featured-card` 개수 = 3(`FEATURED_PROJECT_INDICES`)).
- **S-10.2** given(featured 카드) → action(임의 `.featured-card` 클릭) → expect(`#projectModal` `open`; `.modal-title` 이 해당 프로젝트 제목).

## UC-11 Publications — 유형 필터 · 페이지네이션

- **S-11.1** given(`#pubList` 렌더) → action(초기 확인) → expect(`.pub-item` 표시 ≤ 6(`PUB_PER_PAGE`); `.pub-filter-bar .filter-btn[data-filter="all"]` 에 `active`; `#pubPager .paged-info` = `1 / N`).
- **S-11.2** given(`all` 필터) → action(`data-filter="Journal-International"` 클릭) → expect(해당 버튼 `active`; 표시 항목 전부 `data-type="Journal-International"`; 페이저 리셋 `1 / M`).
- **S-11.3** given(`all` 필터) → action(`data-filter="Poster"` 클릭) → expect(표시 항목 전부 `data-type="Poster"`).
- **S-11.4** given(필터 적용 목록) → action(`#pubPager .paged-next` 클릭) → expect(`.paged-info` 페이지 증가; 링크 있는 항목의 `.pub-link` href = `pub.link`, `target="_blank"`).

## UC-12 Awards / Activities — 페이지네이션

- **S-12.1** given(`#awardsList` 렌더) → action(초기 확인) → expect(`.award-card` 표시 ≤ 6(`AWARD_PER_PAGE`); `#awardsPager .paged-info` = `1 / N`).
- **S-12.2** given(1페이지) → action(`#awardsPager .paged-next` 클릭) → expect(`.paged-info` 페이지 증가; 표시 카드 세트 변경).
- **S-12.3** given(`#activitiesGrid` 렌더) → action(초기 확인) → expect(`.activity-card` 표시 ≤ 6(`ACTIVITY_PER_PAGE`); `#activitiesPager .paged-info` = `1 / N`).
- **S-12.4** given(activities 1페이지) → action(`#activitiesPager .paged-next` 클릭) → expect(`.paged-info` 페이지 증가).

## UC-13 Contact — 연락 링크

- **S-13.1** given(`#contactCards` 렌더) → action(카드 확인) → expect(`.contact-card` 개수 ≥ 3; 이메일 카드 href = `mailto:…`; LinkedIn 카드 href = SOCIAL.linkedin, `target="_blank"`).
- **S-13.2** given(위치 정보 존재) → action(위치 카드 확인) → expect(href 없는 `.contact-card`(div)로 위치 표시 — 클릭 불가 카드).

## UC-14 경계 · 에러 · 빈 상태

- **S-14.1** given(프로필 이미지 로드 실패) → action(`#profileImg` error 발생) → expect(`#profileImg` `display:none`; `#photoFallback` `display:flex`, 텍스트 = `JH`).
- **S-14.2** given(데이터 fetch 실패(`portfolio.json` 5xx/누락)) → action(초기 로드) → expect(`<main>` innerHTML 이 오류 메시지 `Failed to load portfolio data. Please refresh the page.` 로 대체; 콘솔에 `Portfolio load error` 기록).
- **S-14.3** given(필터 결과 0건 가정) → action(해당 없는 필터 선택) → expect(페이저 `.paged-info` = `1 / 1`; `.paged-prev`·`.paged-next` 모두 `disabled` — 빈 목록 안정 처리).
- **S-14.4** given(모든 사용자 문자열 렌더) → action(제목·저자 등에 `<`, `&`, `"` 포함 데이터) → expect(DOM 텍스트가 이스케이프되어 표시(`esc()` 통과) — 스크립트 실행/HTML 주입 없음, XSS 방지).

---

## 커버리지 요약

| 항목 | 값 |
|------|----|
| 유스케이스(UC) | 14 (UC-1 로그인 = 해당 없음) |
| 원자 동작(S-n.m) | 51 |
| UC-1 로그인 | 해당 없음 (인증 없는 공개 정적 포트폴리오 — 계정·세션·보호라우트 부재) |

> 미커버(의도적): 타이프라이터의 정확한 문자 시퀀스(타이밍 의존·비결정), 스크롤 위치 픽셀 정밀도, CDN 폰트 로드 지연 — 시각 회귀는 `screen-contracts.md` baseline에 위임.
