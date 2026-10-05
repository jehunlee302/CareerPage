#!/usr/bin/env node
/**
 * check-invariants.js — 금지 패턴 grep (0건이어야 통과). `npm run verify`에 포함.
 *
 * 대상: assets/js/main.js 의 HTML 템플릿 줄(`<태그`가 있는 줄)
 *   1. `${obj.prop}` / `${a[0].trim()}` 같은 멤버식 보간이 esc()/safeHref()/t()로 감싸지지 않음
 *      (단순 식별자 `${i}`·`${advisorHtml}` 같은 지역 변수·숫자, 삼항식은 이 grep이 못 본다
 *       → tests/main-render.test.js 가 악성 데이터 전 필드 렌더로 잡는다)
 *   2. `href="${...}"` 값이 safeHref 결과(`${href}` 또는 `${safeHref(...)}`)가 아님
 *   3. `x => `...${x}...`` map 콜백 인자를 그대로 보간
 *   4. `innerHTML +=` (루프 내 누적 대입 금지 — 1회 대입)
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'assets', 'js', 'main.js');

const RULES = [
  {
    name: 'esc 없는 멤버식 보간 (esc/safeHref/t로 감쌀 것)',
    re: /\$\{\s*(?!(?:esc|safeHref|t)\()[A-Za-z_$][\w$]*(?:\??\.[\w$]+|\[[^\]]*\]|\([^()]*\))*(?:\??\.[\w$]+|\[[^\]]*\])(?:\??\.[\w$]+|\[[^\]]*\]|\([^()]*\))*\s*\}/,
    htmlOnly: true,
  },
  {
    name: 'map 콜백 인자 raw 보간 (x => `${x}` 대신 ${esc(x)})',
    re: /\b([A-Za-z_$][\w$]*)\s*=>\s*`[^`]*\$\{\s*\1\s*\}/,
    htmlOnly: true,
  },
  {
    name: 'href 값은 safeHref 결과만',
    re: /href="\$\{(?!href\}|safeHref\()/,
    htmlOnly: false,
  },
  {
    name: 'innerHTML += 금지 (map().join 후 1회 대입)',
    re: /\.innerHTML\s*\+=/,
    htmlOnly: false,
  },
];

const HTML_LINE = /<[a-zA-Z/]/;

function scan(lines) {
  const hits = [];
  lines.forEach((line, i) => {
    for (const r of RULES) {
      if (r.htmlOnly && !HTML_LINE.test(line)) continue;
      if (r.re.test(line)) hits.push(`${i + 1}: [${r.name}] ${line.trim().slice(0, 160)}`);
    }
  });
  return hits;
}

/* 셀프체크: 규칙이 실제로 잡는지(약화되면 여기서 실패) */
function selfCheck() {
  const mustHit = [
    '<div>${x.icon}</div>',
    '<a href="${pub.link}">',
    '<a href="${m[2].trim()}">',
    '<span>#${p.index}</span>',
    '<span>${p.partners.join(", ")}</span>',
    'el.innerHTML += `<b>`',
    'tags.map(m=>`<span class="tag">${m}</span>`)',
  ];
  const mustPass = [
    '<div>${esc(x.icon)}</div>',
    '<a href="${href}">',
    '<span>${t(\'ui.all\')}</span>',
    '<span style="--i:${i}">',
    'tags.map(m=>`<span class="tag">${esc(m)}</span>`)',
    '<div>${advisorHtml}</div>',
    '<b>${esc(p.partners.join(" · "))}</b>',
    'el.textContent = `${data.basic.location} · x`',
  ];
  const bad = [];
  mustHit.forEach(s => { if (!scan([s]).length) bad.push(`잡아야 하는데 통과: ${s}`); });
  mustPass.forEach(s => { if (scan([s]).length) bad.push(`통과해야 하는데 잡힘: ${s}`); });
  return bad;
}

const self = selfCheck();
if (self.length) {
  console.error('check-invariants 셀프체크 실패:\n  ' + self.join('\n  '));
  process.exit(2);
}

const hits = scan(fs.readFileSync(FILE, 'utf8').split(/\r?\n/));
if (hits.length) {
  console.error(`check-invariants FAIL — assets/js/main.js ${hits.length}건:\n  ` + hits.join('\n  '));
  process.exit(1);
}
console.log('check-invariants OK (main.js: 멤버식 보간 esc·href safeHref·innerHTML += 0건)');
