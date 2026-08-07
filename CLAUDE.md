# CareerPage — Jehun Lee 포트폴리오 정적사이트

> 전역 규칙·에이전트 팀·리뷰 스켈레톤·라우팅·문서거버넌스(rules/doc.md)는 ~/.claude/ 상속 (건드리지 않음).
> 이 파일 ≲30줄. 전역과 다른 것·구체값만. 전역 복붙 금지(DONT 10). https://jehun-lee.work

## 고유 규칙 (전역과 다른 것만)
- 도메인: 포트폴리오 정적사이트. Vanilla HTML/CSS/JS + GitHub Pages, **빌드 스텝·프레임워크 없음**.
- **모든 사용자 문자열은 `esc()` 새니타이저 통과 필수**(XSS 방지, 인라인 렌더 금지).
- **외부 JS/CSS 라이브러리 금지** (Google Fonts만 허용).
- **generated 파일 직접 수정 금지**: `data/portfolio.json`·`latex/sections/*.tex` 는 YAML 편집 후 빌드로만 생성.
- 데이터 변경 후 커밋 전 `deploy.bat` 또는 `node scripts/yaml-to-json.js` 실행.
- 문서거버넌스(2파일규칙·약어금지·SSOT·동기화표)는 전역 rules/doc.md 상속.

## 데이터 파이프라인 (SSOT = `data/career/*.yaml`)
- 흐름·빌드 명령·업데이트 규칙: docs/pipeline.md.
- 편집 가능: `data/career/*.yaml`·`assets/js/main.js`·`assets/css/style.css`·`index.html`·`scripts/*.js`.

## 주 lead / 하위
- ui-lead: 화면·디자인 시스템(fe-dev·fe-qa). dev-lead: 파이프라인 스크립트(js-yaml)·main.js 렌더.

## 사용 스킬
- write-report · code-review · qa(브라우저) · design-taste-frontend. (발동 주체·상황은 전역 skill-routing)

## 주요 docs (에이전트 진입점)
- 스택 docs/common/stack.md · 코딩 docs/common/coding.md · 파일맵·구조 docs/contributing.md · 배포 docs/deploy.md · 파이프라인 docs/pipeline.md
- UI docs/ui/{design-system,components,sections}.md · 데이터 docs/data/{schema,converter}.md
- 이력 docs/dev-history/ · 백로그 docs/backlog.md · 문서맵 docs/index.md · 전역 팀·규칙 ~/.claude/
