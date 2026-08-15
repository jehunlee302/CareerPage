/**
 * CareerPage 체류 분석 수집처 — Cloudflare Worker.
 * assets/js/analytics.js 의 sendBeacon(POST)를 받아 Analytics Engine에 데이터포인트 1개 기록.
 * 저장: path(index/blob) · dwell_ms · scroll_pct. PII·식별자·IP 저장 안 함(집계 전용).
 * 조회: CF 대시보드 GraphQL(Analytics Engine) 또는 wrangler.
 */

const ALLOWED_ORIGIN = 'https://jehun-lee.work';
const MAX_BODY = 512; // bytes — 체류 페이로드는 작다

function cors(origin) {
  // 사이트 출처만 허용(그 외는 CORS 헤더 없이 거부되도록)
  const allow = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function clamp(n, lo, hi) {
  return typeof n === 'number' && Number.isFinite(n) ? Math.min(Math.max(n, lo), hi) : 0;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = cors(origin);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'POST') return new Response(null, { status: 405, headers });

    const len = Number(request.headers.get('content-length') || '0');
    if (len > MAX_BODY) return new Response(null, { status: 413, headers });

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(null, { status: 400, headers });
    }

    const path = typeof body.path === 'string' ? body.path.slice(0, 200) : '/';
    const dwellMs = clamp(body.dwell_ms, 0, 86400000);
    const scrollPct = clamp(body.scroll_pct, 0, 100);

    // Analytics Engine 미바인딩(로컬 dev 등)이면 조용히 통과 — best-effort
    if (env && env.AE && typeof env.AE.writeDataPoint === 'function') {
      env.AE.writeDataPoint({
        indexes: [path],            // 페이지별 집계 키
        blobs: [path],
        doubles: [dwellMs, scrollPct],
      });
    }

    return new Response(null, { status: 204, headers });
  },
};
