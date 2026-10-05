/**
 * main.js 렌더 XSS 회귀 테스트 (node --test, 의존성 0).
 * main.js를 vm + 최소 DOM 스텁에 올려 render()를 악성 데이터로 돌리고 innerHTML 결과를 검사한다.
 * 실행: npm run verify (또는 node --test tests/)
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'main.js'), 'utf8');

function makeEl() {
  return {
    innerHTML: '', textContent: '', className: '', id: '', href: '',
    style: {}, dataset: {}, disabled: false,
    parentNode: { insertBefore() {} }, nextSibling: null,
    setAttribute() {}, getAttribute() { return null; }, addEventListener() {},
    querySelector() { return makeEl(); }, querySelectorAll() { return []; },
    classList: { add() {}, remove() {}, toggle() {} },
  };
}

function loadMain() {
  const els = new Map();
  const document = {
    documentElement: { setAttribute() {}, getAttribute() { return 'light'; }, lang: 'en' },
    body: { style: {} },
    getElementById(id) { if (!els.has(id)) els.set(id, makeEl()); return els.get(id); },
    createElement() { return makeEl(); },
    querySelector() { return makeEl(); },
    querySelectorAll() { return []; },
    addEventListener() {},
  };
  const ctx = {
    document, console,
    localStorage: { getItem() { return null; }, setItem() {} },
    window: { addEventListener() {}, scrollY: 0 },
    IntersectionObserver: class { observe() {} unobserve() {} },
    setTimeout() { return 0; }, clearTimeout() {},
  };
  vm.createContext(ctx);
  vm.runInContext(SRC, ctx, { filename: 'main.js' });
  return { ctx, html: () => [...els.values()].map(e => e.innerHTML).join('\n') };
}

const P = '"><script>alert(1)</script><img src=x onerror=alert(1)>';
const BAD_URL = 'javascript:alert(1)';

function evilData() {
  const proj = (index) => ({
    index, isPM: true, client: P, title: P, remarks: P, period: P, duration: P,
    partners: [P, P], affiliatedInstitution: P, partnerInstitution: P,
    details: { situation: P, purpose: P, role: P, tasks: [P], achievements: P, notes: P },
  });
  return {
    lastUpdated: P,
    basic: { summary: P, location: P, email: [P], googleSite: BAD_URL, titles: [P] },
    philosophy: { headline: P, lead: P, body: P, pillars: [{ icon: P, title: P, desc: P }] },
    education: [
      { degree: P, major: P, period: P, institution: P, advisor: `Prof (${BAD_URL})`,
        thesis: { title: P, topic: P, priorLimitations: P, methodology: `1. ${P}`, performance: P } },
      { degree: P, major: P, period: P, institution: P, advisor: 'Advisor: X, https://a.example/"onmouseover="alert(1)' },
    ],
    workExperience: [{ position: P, organization: P, division: P, period: P, region: P, roles: P,
      alt_service: P, responsibilities: [P], highlights: [P] }],
    projects: [proj(25), proj(P)],
    publications: [
      { index: P, type: 'Journal', global: true, role: '1st Author', venue: P, year: P, remarks: P, link: BAD_URL, authors: P, title: P },
      { index: 2, type: 'Poster', link: ' JaVaScRiPt:alert(1)', authors: P, title: P },
      { index: 3, type: 'Conference', link: 'data:text/html,<script>alert(1)</script>', authors: P, title: P },
    ],
    honors: [{ date: P, title: P, description: P, organization: P, remarks: P }],
    patents: [{ title: P, description: P, applicationNumber: P, applicationDate: P, applicant: P, authority: P }],
    activities: [{ role: P, organization: `${P} (${P})`, period: P, location: P }],
    skills: { [P]: [P] },
  };
}

test('악성 문자열은 전 필드에서 이스케이프된다 (<script>·태그·속성 탈출 없음)', () => {
  const { ctx, html } = loadMain();
  ctx.render(evilData());
  const out = html();
  assert.ok(out.length > 0, 'render가 아무것도 쓰지 않음');
  assert.ok(out.includes('&lt;script&gt;'), '페이로드가 이스케이프된 형태로 보여야 함');
  assert.doesNotMatch(out, /<script/i);
  assert.doesNotMatch(out, /<img/i);
  assert.doesNotMatch(out, /"\s*onmouseover=/i);
  assert.doesNotMatch(out, /"><(?!\/?(?:div|span|a|p|h3|ul|ol|li|strong|button|section|header|article)\b)/);
});

test('href는 http(s)/mailto만 — javascript:/data: 는 링크가 안 된다 (대소문자·앞 공백 우회 포함)', () => {
  const { ctx, html } = loadMain();
  ctx.render(evilData());
  const out = html();
  const hrefs = [...out.matchAll(/href="([^"]*)"/g)].map(m => m[1]);
  assert.ok(hrefs.length > 0, 'href가 하나도 없음 (mailto·LinkedIn은 있어야 함)');
  for (const h of hrefs) assert.match(h, /^(?:https?:|mailto:)/i, `허용목록 밖 href: ${h}`);
  assert.doesNotMatch(out, /href="\s*javascript:/i);
  assert.doesNotMatch(out, /href="data:/i);
});

test('safeHref·esc 단위', () => {
  const { ctx } = loadMain();
  assert.equal(ctx.safeHref('javascript:alert(1)'), '');
  assert.equal(ctx.safeHref('  JAVASCRIPT:alert(1)'), '');
  assert.equal(ctx.safeHref('java\tscript:alert(1)'), '');
  assert.equal(ctx.safeHref('/relative'), '');
  assert.equal(ctx.safeHref(null), '');
  assert.equal(ctx.safeHref('https://a.example/?q="x"'), 'https://a.example/?q=&quot;x&quot;');
  assert.equal(ctx.safeHref('mailto:a@b.c'), 'mailto:a@b.c');
  assert.equal(ctx.esc('<script>'), '&lt;script&gt;');
  assert.equal(ctx.esc(0), '0');
  assert.equal(ctx.esc(false), 'false');
  assert.equal(ctx.esc(null), '');
  assert.equal(ctx.esc(undefined), '');
});

test('실데이터(data/portfolio*.json)가 예외 없이 렌더된다', () => {
  for (const f of ['portfolio.json', 'portfolio.ko.json']) {
    const fp = path.join(ROOT, 'data', f);
    if (!fs.existsSync(fp)) { console.log(`skip: ${f} 없음`); continue; }
    const { ctx, html } = loadMain();
    ctx.render(JSON.parse(fs.readFileSync(fp, 'utf8')));
    assert.match(html(), /impact-item/);
  }
});
