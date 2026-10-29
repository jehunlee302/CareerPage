# data — 데이터·파이프라인 (L2)

정본(SSOT) = `data/career/*.yaml`. 생성 파일 (`data/portfolio.json`, `latex/sections/*.tex`)은 직접 고치지 않는다. 흐름은 [pipeline.md](../pipeline.md), 스키마는 [data/schema.md](../data/schema.md).

<a id="data-01"></a>
## data-01 · YAML 파이프라인 v2
이유: Google Sheets 동기화 대신 이중 언어(en/ko) YAML 한 곳에서 사이트와 이력서 PDF를 만든다 (2026-04-20).
- `data/career/*.yaml` 신설, 프로젝트(4개 파일)·논문(4개 파일)은 연도 구간별 분할.
- `scripts/yaml-to-json.js` 변환기, `--lang en|ko` 지원. `deploy.bat`이 YAML 파이프라인을 쓴다.
- QA: `node scripts/yaml-to-json.js`가 오류 없이 `data/portfolio.json`을 만든다.
- Status: done

<a id="data-02"></a>
## data-02 · YAML 한국어 번역
이유 (2026-04-20): 대부분의 `ko: ""` 필드가 아직 비어 있다.
- 단계: 프로젝트 제목 · 경력 직위 · 수상 채우기.
- 참조: data/career/*.yaml
- QA: `--lang ko` 빌드 결과에 빈 ko 필드가 없다.

<a id="data-03"></a>
## data-03 · 연구 관심사·Hero 태그 → YAML
이유 (2026-04-24): `RESEARCH_INTERESTS`·`HERO_TAGS`가 main.js에 하드코딩되어 SSOT 원칙과 어긋난다.
- 단계: YAML로 옮기고 main.js는 JSON에서 읽는다.
- 참조: assets/js/main.js 6–30행
- QA: main.js에 두 상수가 없고 Research Focus·Hero 태그가 그대로 렌더된다 (UC-2 S-2.4).

<a id="data-04"></a>
## data-04 · 대표 프로젝트 번호 → YAML
이유 (2026-04-24): `FEATURED_PROJECT_INDICES = [25, 23, 21]`가 main.js에 하드코딩됨.
- 단계: basic.yaml 또는 config.yaml에서 설정할 수 있게.
- 참조: assets/js/main.js 24행
- QA: YAML 값만 바꿔 대표 카드가 바뀐다 (UC-10).

<a id="data-05"></a>
## data-05 · YAML 스키마 검증
이유 (2026-04-24): yaml-to-json.js에 스키마 검증이 없어 필수 필드가 빠지면 조용히 실패한다.
- 단계: 명확한 오류 메시지를 내는 검증 단계 추가.
- 참조: scripts/yaml-to-json.js
- QA: 필수 필드를 뺀 YAML로 빌드하면 필드 이름이 담긴 오류로 실패한다.

<a id="data-06"></a>
## data-06 · 한국어 홈페이지 토글
이유 (2026-04-20): 변환기에서 `--lang ko`는 동작하나 사이트 토글은 portfolio.ko.json을 fetch한다.
- 단계: 한국어 방문자 기본값으로 켜기 전에 모든 ko 필드가 채워졌는지 확인 (data-02 다음).
- 참조: [pipeline.md](../pipeline.md)
- QA: UC-4 언어 토글 통과, ko 화면에 빈 문자열 없음.

<a id="data-07"></a>
## data-07 · 데이터 수치 불일치
이유: dev-loop 1회전 (2026-09-03) 경미 발견.
- `data/career/basic.yaml` 수정 후 `node scripts/yaml-to-json.js` 재빌드 (generated 직접 수정 금지).
  1. Hero 요약 "25 projects(PM 12)" → 실제 26(PM 13).
  2. meta description·stats "24+" → 26.
  3. "Intl. conf 6" vs 실제 11 — 의도적 선별인지 사용자 확인.
- QA: 화면 수치가 `portfolio.json` 집계와 같다.
