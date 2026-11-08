# tech — CareerPage 기술·실행

## 구성
| 기술 | 고른 이유 | 쓰는 곳·단계 | 바꾼다면(대안 · 고칠 파일) |
|---|---|---|---|
| Vanilla HTML5 · CSS3 · ES2020+ JavaScript | 서비스 기준 배포 형태 "공개 웹 정적 사이트, 로그인 없음" · 판단표 화면 "웹, 정적 콘텐츠(로그인 없음)". 두 언어지만 판단표 "두 언어 이상 → next-intl" 대신 언어별 JSON(`portfolio.json` · `portfolio.ko.json`)을 `main.js`가 바꿔 읽는다 — 프레임워크 금지([site-02](site.md#site-02)) | 화면 전부 · `index.html` · `assets/js/main.js` · `assets/css/style.css` | 로그인 · 개인화가 생기면 판단표 화면 다음 행 Next.js App Router · React 19 · Tailwind v4(+ next-intl) · 위 세 파일 전부와 `deploy.yml` 조립 단계 |
| YAML (`data/career/*.yaml`) | 서비스 기준 데이터 양 목표 "YAML 1 MB 이하" · 판단표 DB 해당 없음 — 데이터가 작고 고치는 사람이 하나라 DB 없이 파일 정본 하나로 빌드 때 JSON · LaTeX를 만든다 | 데이터 입력 | JSON 직접 편집 · `scripts/yaml-to-json.js` · `scripts/yaml-to-latex.js` |
| Node.js 20 + `js-yaml` 4 (유일한 npm 의존성) | 서비스 기준 백그라운드 작업 "없음, 푸시 때 빌드" — YAML을 JSON · LaTeX로 바꾸는 빌드 스크립트. 판단표 공통 "패키지는 pnpm"과 달리 npm(`package-lock.json` · CI `npm ci`) — 의존성 하나라 바꿀 이득이 적다 (추정) | 개발 PC와 CI 빌드 · `scripts/*.js` | 다른 YAML 변환기 · `scripts/yaml-to-*.js` · `package.json` |
| XeLaTeX (`xu-cheng/latex-action@v3`) | 서비스 기준 데이터 양 "이력서 PDF 4개" · 판단표 층 없음 — `latex/fonts/` 글꼴로 영·한 이력서 PDF를 만든다 | CI 빌드 · `latex/` · `scripts/build-resume.bat` | 다른 PDF 생성기 · `latex/` 전부 · `scripts/yaml-to-latex.js` |
| GitHub Pages + GitHub Actions | 서비스 기준 배포 형태 "공개 웹 정적 사이트" · 한계 "월 전송량 100 GB" · 판단표 배포 "정적 · ISR 위주 → Cloudflare Pages"와 다르다 — 저장소 · 빌드(Actions) · 호스팅이 한곳이라 `main` 푸시 하나로 배포된다 (추정). 판단표 백그라운드 작업 "필요 없음" | 배포 · `.github/workflows/deploy.yml` | 한계(월 전송량)를 넘으면 판단표 기본 Cloudflare Pages, 서버 기능이 늘 필요하면 Vercel · `deploy.yml` · `CNAME` · DNS 레코드 |
| GoDaddy DNS | 서비스 기준 배포 형태 "공개 웹, https://jehun-lee.work" · 판단표 층 없음 — 도메인을 산 곳에서 관리한다 (추정) | 주소 · `CNAME` | Cloudflare DNS(방문 분석 [ops-01](ops.md#ops-01)이 앞에 둔다) · DNS 레코드 |
| Pretendard 글꼴(jsdelivr CDN) | 서비스 기준 사용 환경 "영·한 두 언어 브라우저" · 판단표 화면 정적 행 안의 글꼴. [site-02](site.md#site-02)는 외부 의존을 Google Fonts로 적지만 실제는 jsdelivr의 Pretendard — 한글 글꼴이 필요해서 (추정) | `index.html` `<link>` | 다른 웹 글꼴 · `index.html` · `assets/css/style.css` |
| Cloudflare Web Analytics · Worker · Analytics Engine | 서비스 기준 지금 · 목표 방문 수 "[ops-01](ops.md#ops-01) 전이라 못 잼"을 잰다 · 판단표 서버 "서버 없음" 행과 다르게 수집용 Worker 하나를 둔다 — 쿠키 · 개인정보 없이, 외부 JS 라이브러리 없이 체류를 잰다 | 방문 분석 · `assets/js/analytics.js` · `workers/analytics-collector/` | 다른 분석 수집처 · `assets/js/analytics.js`(Worker를 부르는 유일한 파일) · `workers/analytics-collector/` |
| `deploy.bat` (Windows 배치) | 서비스 기준 사용 환경 "주인이 Windows PC에서 고친다"(product.md `## 제품`) · 판단표 층 없음 — 명령 하나로 빌드 · 푸시 | 개발 PC 배포 | 셸 스크립트 · `deploy.bat` |

- 대상 플랫폼: ES2020+를 돌리는 데스크톱 · 모바일 브라우저. 최소 버전: [미정].
- 런타임 버전 파일: 없음. CI Node 버전은 `.github/workflows/deploy.yml`의 `node-version: 20`.
- 외부 의존은 글꼴만 허용, 외부 JS · CSS 라이브러리 금지([site-02](site.md#site-02), [common/coding.md](../common/coding.md)). 파일 지도는 [contributing.md](../contributing.md).

## 외부 연동
- GitHub Pages · GoDaddy DNS: [deploy.md](../deploy.md).
- 외부 서비스마다 부르는 파일은 하나: Worker `cp-analytics` → `assets/js/analytics.js` · Pretendard CDN → `index.html` · Google Sheets(레거시, [ops-02](ops.md#ops-02)) → `scripts/sync-sheets.js`. Web Analytics는 Cloudflare 프록시가 넣어 코드가 없다.
- Cloudflare Worker `cp-analytics` · Analytics Engine `careerpage_dwell`: [common/analytics.md](../common/analytics.md), 설정 `workers/analytics-collector/wrangler.toml`.

## 권한·보안
- 로그인 없음. 손님은 공개 경력 정보만 본다. 클라이언트 JS에 API 키 없음. 상세는 [deploy.md](../deploy.md) Security.

## 설정
- 비밀 값 없음. 체류 수집 주소는 `assets/js/analytics.js`의 `WORKER_URL`(비면 아무것도 보내지 않음).

## 실행·시험·배포
- 명령 · 흐름: [pipeline.md](../pipeline.md). 배포 점검표 · DNS: [deploy.md](../deploy.md).
- 운영 주소: https://jehun-lee.work.

## 로깅
- 서버 로그 없음(정적 사이트). 방문 지표만 [common/analytics.md](../common/analytics.md) 방식으로 모은다.
