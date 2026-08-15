# user-actions (CareerPage) — 사람이 직접 해야 할 일

> 에이전트가 낸 "사람이 직접 해야 할 일"(계정·배포·설정). 시크릿 값 기록 금지(DONT 14).

## 보류

- [ ] **방문 분석 배포 (방문수 + 페이지별 체류)** — 2026-08-15
      코드는 완료(`assets/js/analytics.js`·`workers/analytics-collector/`). 활성화만 남음:
      1. `jehun-lee.work`를 **Cloudflare로 프론팅**(무료 플랜, DNS를 CF 네임서버로) → 대시보드 **Web Analytics** 활성화(방문·페이지·referrer, 쿠키리스, 스니펫 불필요).
      2. Worker 배포: `cd workers/analytics-collector && npx wrangler deploy` → 출력된 URL(`https://cp-analytics.<계정>.workers.dev`) 획득. (Analytics Engine은 무료 티어, wrangler.toml에 바인딩 있음 — CF 계정에서 Analytics Engine 활성 필요 시 대시보드 확인.)
      3. `assets/js/analytics.js`의 `WORKER_URL`에 그 URL 기입 → 커밋·푸시(빌드 없음, 푸시로 반영). 이때부터 체류 수집 시작.
      막힘: CF 계정·도메인 네임서버 변경(사람).
      우선순위: 낮 (쿠키리스·PII 없음 → 동의 절차 불필요)
      조회: 방문/페이지=CF Web Analytics 대시보드 · 체류/스크롤=Analytics Engine(GraphQL/wrangler).

## 완료
<!-- 처리된 항목을 날짜와 함께 이동. -->
