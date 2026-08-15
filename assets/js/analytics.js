/**
 * 방문 체류 분석 — first-party(같은 출처) 경량 비콘. 외부 라이브러리 아님(규칙 준수).
 *
 * 무엇: 페이지별 "활성 체류시간"(탭 숨김 시 일시정지) + 최대 스크롤 깊이(%)를 측정해
 *       navigator.sendBeacon으로 CF Worker 수집처에 1회 전송.
 * 프라이버시: 쿠키·localStorage·식별자 미사용, PII 미전송(경로·체류·스크롤만) → 동의 불필요.
 * OFF 안전: WORKER_URL 미설정이면 아무것도 전송 안 함(no-op). 배포 시 URL만 채우면 활성화.
 *
 * 방문 수·페이지·referrer 집계는 Cloudflare Web Analytics(쿠키리스, 대시보드)가 담당 — 이 파일은 체류 전용.
 */
(function () {
  'use strict';

  // 배포 시 CF Worker 엔드포인트로 교체(예: 'https://cp-analytics.<계정>.workers.dev').
  // 비어 있으면 no-op — 수집 안 함.
  var WORKER_URL = '';

  if (!WORKER_URL || typeof navigator === 'undefined' || !navigator.sendBeacon) return;

  var path = location.pathname || '/';
  var activeMs = 0;            // 화면에 보인 누적 시간(ms)
  var lastResume = Date.now(); // 마지막으로 visible 된 시각
  var visible = document.visibilityState === 'visible';
  var maxScroll = 0;           // 최대 스크롤 깊이(%)
  var sent = false;

  function updateScroll() {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    var pct = scrollable > 0 ? Math.round((doc.scrollTop / scrollable) * 100) : 100;
    if (pct > maxScroll) maxScroll = Math.min(pct, 100);
  }

  function accumulate() {
    if (visible) {
      activeMs += Date.now() - lastResume;
      lastResume = Date.now();
    }
  }

  function onVisibility() {
    if (document.visibilityState === 'visible') {
      visible = true;
      lastResume = Date.now();
    } else {
      accumulate();
      visible = false;
      send(); // 탭 전환/이탈 시점에 전송(pagehide가 안 올 수 있어 여기서도)
    }
  }

  function send() {
    if (sent) return;
    accumulate();
    // 24h 상한(비정상 값 방어), 0~100 클램프는 측정에서 보장.
    var dwellMs = Math.min(Math.max(activeMs, 0), 86400000);
    var payload = { path: String(path).slice(0, 200), dwell_ms: dwellMs, scroll_pct: maxScroll };
    try {
      var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      if (navigator.sendBeacon(WORKER_URL, blob)) sent = true;
    } catch (e) { /* 계측 실패는 페이지에 영향 없음 */ }
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', send);
  updateScroll();
})();
