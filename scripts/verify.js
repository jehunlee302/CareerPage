#!/usr/bin/env node
/**
 * verify.js — 검증 단일 진입점 (`npm run verify`, CI verify.yml도 이것만 호출).
 * 산출물(data/*.json·latex·pdf)을 저장소에 쓰지 않는다 — JSON 빌드는 OS 임시 폴더로.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'careerpage-verify-'));

const steps = [
  ['불변식 grep', ['scripts/check-invariants.js']],
  ['main.js 렌더 XSS 테스트', ['--test', 'tests/main-render.test.js']],
  ['YAML→JSON 빌드 (en)', ['scripts/yaml-to-json.js', '--out', path.join(tmp, 'portfolio.json')]],
  ['YAML→JSON 빌드 (ko)', ['scripts/yaml-to-json.js', '--lang', 'ko', '--out', path.join(tmp, 'portfolio.ko.json')]],
];

let failed = 0;
for (const [name, args] of steps) {
  console.log(`\n── ${name}`);
  const r = spawnSync(process.execPath, args, { cwd: ROOT, stdio: 'inherit' });
  if (r.status !== 0) { failed++; console.error(`✖ ${name} (exit ${r.status})`); }
}
fs.rmSync(tmp, { recursive: true, force: true });

console.log('\n── skip: LaTeX/PDF 빌드 — xelatex 필요 + 산출물(latex/sections·data/*.pdf)이 추적 파일이라 verify에서 돌리지 않음 (deploy.yml이 빌드)');
console.log(failed ? `\nverify FAIL — ${failed}/${steps.length} 단계 실패` : `\nverify OK — ${steps.length}/${steps.length} 단계 통과`);
process.exit(failed ? 1 : 0);
