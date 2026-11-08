# tech — CareerPage 기술·실행

## 구성
| 기술 | 고른 이유 | 쓰는 곳·단계 | 바꾼다면(대안 · 고칠 파일) |
|---|---|---|---|
| Vanilla HTML5 · CSS3 · ES2020+ JavaScript | 빌드 단계 · 프레임워크 없이 유지비 없이 오래 간다([site-02](site.md#site-02)) | 화면 전부 · `index.html` · `assets/js/main.js` · `assets/css/style.css` | 정적 사이트 생성기 · 위 세 파일 전부와 `deploy.yml` 조립 단계 |
| YAML (`data/career/*.yaml`) | 한 곳만 고치면 사이트 · 이력서가 같이 바뀐다(정본 하나) | 데이터 입력 | JSON 직접 편집 · `scripts/yaml-to-json.js` · `scripts/yaml-to-latex.js` |
| Node.js 20 + `js-yaml` 4 (유일한 npm 의존성) | YAML을 JSON · LaTeX로 바꾸는 빌드 스크립트 | 개발 PC와 CI 빌드 · `scripts/*.js` | 다른 YAML 변환기 · `scripts/yaml-to-*.js` · `package.json` |
| XeLaTeX (`xu-cheng/latex-action@v3`) | `latex/fonts/` 글꼴로 영·한 이력서 PDF를 만든다 | CI 빌드 · `latex/` · `scripts/build-resume.bat` | 다른 PDF 생성기 · `latex/` 전부 · `scripts/yaml-to-latex.js` |
| GitHub Pages + GitHub Actions | 무료 정적 호스팅, `main` 푸시로 배포 | 배포 · `.github/workflows/deploy.yml` | Cloudflare Pages 등 · `deploy.yml` · `CNAME` · DNS 레코드 |
| GoDaddy DNS | `jehun-lee.work` 도메인 관리 | 주소 · `CNAME` | Cloudflare DNS(방문 분석 [ops-01](ops.md#ops-01)이 앞에 둘 예정) · DNS 레코드 |
| Pretendard 글꼴(jsdelivr CDN) | 영·한 글꼴 | `index.html` `<link>` | 다른 웹 글꼴 · `index.html` · `assets/css/style.css` |
| Cloudflare Web Analytics · Worker · Analytics Engine | 쿠키 · 개인정보 없이 방문 · 체류를 잰다, 외부 JS 라이브러리 금지를 지킨다 | 방문 분석 · `assets/js/analytics.js` · `workers/analytics-collector/` | 다른 분석 수집처 · 위 두 곳 |
| `deploy.bat` (Windows 배치) | 주인 PC에서 명령 하나로 빌드 · 푸시 | 개발 PC 배포 | 셸 스크립트 · `deploy.bat` |

- 대상 플랫폼: ES2020+를 돌리는 데스크톱 · 모바일 브라우저. 최소 버전: [미정].
- 런타임 버전 파일: 없음. CI Node 버전은 `.github/workflows/deploy.yml`의 `node-version: 20`.
- 외부 의존은 글꼴만 허용, 외부 JS · CSS 라이브러리 금지([site-02](site.md#site-02), [common/coding.md](../common/coding.md)). 파일 지도는 [contributing.md](../contributing.md).

## 외부 연동
- GitHub Pages · GoDaddy DNS: [deploy.md](../deploy.md).
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
