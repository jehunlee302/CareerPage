# 문서↔코드 정합 점검 (2026-10-05 — 거버넌스 세션, 읽기 전용)

↑ [backlog](../backlog.md)
> **언제**: 이 프로젝트 작업 착수 시 🔴부터. 문서(spec·🔒·why)가 정한 규칙을 코드가 지키는지 arch-reviewer(Opus)가 대조한 결과. 수정·규칙 개정 결정은 이 프로젝트 세션(🔒 완화는 사람). 추정 표기 항목은 확인 후 처리.
> verdict: VIOLATION (규칙 문자 위반 확인 · 데이터가 주인 작성 YAML이라 실제 XSS 위험은 낮음 — 추정 · 문서 6 · 도구 18)

| 심각 | 코드 ↔ 문서 — 차이 (근거) | 고칠 방향 |
|---|---|---|
| 🔴 | `assets/js/main.js:243,250,464,616,303,355,411,661,670` ↔ `CLAUDE.md:8`·`docs/common/coding.md:11` 🔒(미esc 문자열 innerHTML 금지) — YAML 값(icon·link·email·advisor URL·index·period·duration)이 esc 없이 innerHTML, href는 스킴 검사 없음(`javascript:` 미차단) (확인) | 전부 esc + href는 http(s)/mailto 허용 헬퍼 1개 |
| 🟡 | `assets/js/analytics.js:1-17,64`·`index.html:265`·`workers/analytics-collector/` ↔ `coding.md:11,94` 🔒(analytics 없음) vs `docs/common/analytics.md`·`docs/backlog.md:63`(same-origin 허용) — 두 정본 모순. 현재 `WORKER_URL=''`이라 비동작 (확인) | 🔒 문구 개정(사용자 승인) |
| 🟡 | `.github/workflows/deploy.yml:33-80` CI 빌드·commit-back ↔ `docs/deploy.md:26`(빌드 없음)·`docs/pipeline.md:28`(deploy.bat=SSOT) — 빌드 2곳, CI는 brief PDF 미생성 (확인) | 빌드 정본 1개(CI 권장)·문서 갱신 |
| 🟡 | `deploy.bat:72` add 목록에 `assets/js/analytics.js` 없음 ↔ `pipeline.md:28`·`analytics.md:20` (확인) | add 목록 보강 |
| 🟡 | `main.js:233` 루프 내 `innerHTML +=` ↔ `coding.md:51`(1회 대입) | map().join 1회 대입 |
| 🟡 | `main.js:708` esc가 0·false를 빈 문자열로 ↔ `coding.md:36-40` 정의 | `s == null`만 처리 |
| 🟡 | 에셋 예산 `coding.md:112-114` — style.css 52KB(한도 40)·portfolio.json 78KB(한도 60), 표 값 낡음·초과 확대 | backlog 실측 갱신 |
| 🟢 | `main.js:6` en은 `portfolio.json` fetch ↔ `pipeline.md:28,35`(portfolio.en.json) — en.json 고아 · 수동 PDF 사본 git 추적 | 경로 통일·사본 정리 판단 |

잘 지켜짐: 외부 JS 0·eval 없음 · passive 리스너 · 본문 필드 대부분 esc · 공개 basic 키에 전화·생년 없음.
