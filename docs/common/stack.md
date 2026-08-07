# Tech Stack

> 골격 필수문서(project-structure.md §3). 스택 상세값은 아래, 규칙은 참조로 연결.

## Runtime

- **웹**: Vanilla HTML5 / CSS3 / ES2020+ JavaScript. 빌드 스텝·번들러·프레임워크 없음.
- **호스팅**: GitHub Pages (GitHub Actions 배포). CDN = Fastly.
- **도메인**: `jehun-lee.work` (GoDaddy DNS → GitHub Pages CNAME).

## Build tooling (dev only)

- **Node.js**: 빌드 스크립트 실행 (`scripts/*.js`).
- **js-yaml**: YAML 파싱 (유일한 npm 런타임 의존성 — `package.json` 참조).
- **XeLaTeX**: 이력서 PDF 빌드 (`latex/`).

## External dependencies

- **허용**: Google Fonts (Pretendard, jsdelivr CDN)만.
- **금지**: jQuery·외부 JS 라이브러리·CSS 프레임워크·분석/추적 스크립트. (근거: `coding.md` Dependencies)

## Source of truth

- 데이터 SSOT = `data/career/*.yaml`. 파이프라인은 [../pipeline.md](../pipeline.md).
- 파일 맵·폴더 구조는 [../contributing.md](../contributing.md).
- 코딩 규칙(정적사이트 특화)은 [coding.md](coding.md); 일반 규칙은 전역 `~/.claude/docs/rules/code.md` 상속.
