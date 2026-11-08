# product — CareerPage 제품

## 제품
- 배경: 이제훈의 경력 · 연구 성과 · 일하는 철학이 이력서 PDF · 논문 목록 · 프로젝트 기록에 흩어져 있다. 한 페이지에 모아 보여 주고, 정보는 YAML 한 곳(`data/career/*.yaml`)만 고치면 사이트와 이력서 PDF가 함께 갱신되게 한다.
- 목적: [PRD.md](../PRD.md) 목표 한 줄.
- 사용자(보는 쪽): AI 연구 협력자 · 채용 담당자(산업·학계) · 시스템 컨설팅 고객(반도체·제조) ([site-01](site.md#site-01)). 데스크톱과 모바일 브라우저에서 보고, 영어 · 한국어를 전환한다. 로그인 · 계정 없음. 다시 오는 빈도: [미정].
- 사용자(고치는 쪽): 사이트 주인 한 명이 Windows PC에서 YAML을 고치고 `deploy.bat`이나 `git push`로 올린다.
- 규모: 방문자 수 · 동시 접속 [미정](방문 분석 [ops-01](ops.md#ops-01)이 켜지면 잰다). 서버가 없는 정적 사이트라 동시 접속은 GitHub Pages가 감당한다.
- 주요 흐름: YAML 수정 → `node scripts/yaml-to-json.js`(영·한) → `main` 푸시 → GitHub Actions가 JSON · 이력서 PDF를 만들어 GitHub Pages에 올린다 → https://jehun-lee.work. 상세는 [pipeline.md](../pipeline.md).
- 하지 않을 것: 로그인 · 피드백 · 이벤트 기록 · 재방문 추적 — 계정과 반복 행동이 없는 포트폴리오라서([common/analytics.md](../common/analytics.md) 비대상).

## 도메인 규칙
- 정본은 `data/career/*.yaml` 하나. `data/portfolio*.json` · `latex/sections/*.tex`는 빌드가 만들고 손으로 고치지 않는다. 스키마는 [data/schema.md](../data/schema.md).
- 화면에 넣는 모든 사용자 문자열은 `esc()`를 거친다.

## 품질 조건
- 접근성 · 외부 의존 조건은 [site-02](site.md#site-02), 에셋 크기 목표는 [ux-01](ux.md#ux-01)이 정본.
- 응답 시간 목표: [미정].
