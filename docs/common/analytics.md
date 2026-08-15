> 목적: CareerPage 방문 분석. 원칙 = ~/.claude/docs/rules/analytics.md. (events 테이블·자생 생태계는 미도입 — 포트폴리오, 사용자 결정.)

# 방문 분석 (프로젝트 델타)

사용자 결정(2026-08-15): 자생 생태계(피드백 루프·retention)는 안 하되, **방문 지표 + 페이지별 체류("어느 페이지를 유심히 봤는지")**는 본다. 정적 GitHub Pages·백엔드 없음·"외부 JS 라이브러리 금지" 제약에 맞춘 2계층:

## 1) 방문 수·페이지·유입 — Cloudflare Web Analytics (코드 0)
- 쿠키리스·PII 없음·동의 배너 불필요. 방문수·고유방문·페이지뷰·top 페이지·referrer 제공.
- **전제**: 도메인 `jehun-lee.work`를 Cloudflare로 프론팅(무료) → 대시보드에서 Web Analytics 활성화(사이트가 CF 프록시면 스니펫 불필요, 서버측). 사람 작업(`docs/inbox/user-actions.md`).

## 2) 페이지별 체류시간·스크롤 — 자체 비콘 (우리 코드=규칙 준수)
- `assets/js/analytics.js`(같은 출처 로컬 스크립트, 외부 라이브러리 아님): **활성 체류시간**(탭 숨김 시 일시정지)+**최대 스크롤 깊이**를 측정 → `navigator.sendBeacon`으로 CF Worker에 1회 전송. 쿠키·식별자·PII 없음.
- 수집처 `workers/analytics-collector/`(CF Worker): POST 검증(출처 CORS·크기·클램프) 후 **Analytics Engine**(`careerpage_dwell`)에 데이터포인트(path·dwell_ms·scroll_pct) 기록. IP·식별자 저장 안 함.
- **OFF 안전**: `analytics.js`의 `WORKER_URL`이 비어 있으면 no-op(아무것도 전송 안 함). 배포 후 Worker URL을 채우면 활성화.
- 두 HTML(`index.html`·`korea-economy-dashboard.html`)에 `<script src="assets/js/analytics.js" defer>` 배선 완료.

## 배포 (사람 — inbox)
1. `jehun-lee.work` Cloudflare 프론팅 + Web Analytics 활성화.
2. `cd workers/analytics-collector && npx wrangler deploy` → Worker URL 획득.
3. `assets/js/analytics.js`의 `WORKER_URL`에 그 URL 기입(빌드 없음 → 커밋·푸시로 반영).
- 조회: 방문/페이지=CF Web Analytics 대시보드, 체류/스크롤=Analytics Engine(GraphQL/wrangler).

## 비대상
- events 테이블·로그인·feedback·아하·퍼널·retention = 해당 없음(계정·반복행동 없는 정적 포트폴리오).
