/**
 * sync-sheets.js
 * 구글 시트 → data/portfolio.json 동기화 스크립트
 *
 * 사용법:
 *   node scripts/sync-sheets.js
 *
 * 사전 조건:
 *   구글 시트를 "링크가 있는 모든 사용자(뷰어)" 로 공유 설정 필요
 *   (시트 우측 상단 공유 → 링크 복사 → 뷰어)
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ════════════════════════════════════════
//  ★ 여기에 구글 시트 ID를 입력하세요 ★
//  URL 예: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
// ════════════════════════════════════════
const SHEET_ID = '1PM15NIZml_i96kSzhVbnP7i4PTiUiZkXqztDW-pzAS4';

const SHEETS = {
  basic:        'basic',
  education:    'education',
  work:         'work experience',
  projects:     'projects',
  publications: 'academic works',
  skills:       'skills',
  honors:       'honors and awards',
  patents:      'patents',
  activities:   'activities and leadership',
};

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'portfolio.json');

// ─── 메인 실행 ────────────────────────────
async function main() {
  if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID') {
    console.error('❌ SHEET_ID를 설정하세요. sync-sheets.js 상단을 확인하세요.');
    process.exit(1);
  }

  console.log('📊 구글 시트에서 데이터를 가져오는 중...');

  try {
    const [basic, education, work, projects, publications, skills, honors, patents, activities] =
      await Promise.all([
        fetchCSV(SHEET_ID, SHEETS.basic),
        fetchCSV(SHEET_ID, SHEETS.education),
        fetchCSV(SHEET_ID, SHEETS.work),
        fetchCSV(SHEET_ID, SHEETS.projects),
        fetchCSV(SHEET_ID, SHEETS.publications),
        fetchCSV(SHEET_ID, SHEETS.skills),
        fetchCSV(SHEET_ID, SHEETS.honors),
        fetchCSV(SHEET_ID, SHEETS.patents),
        fetchCSV(SHEET_ID, SHEETS.activities),
      ]);

    const portfolio = {
      lastUpdated:    today(),
      basic:          parseBasic(basic),
      philosophy:     getPhilosophy(),
      stats:          getStats(),
      education:      parseEducation(education),
      workExperience: parseWork(work),
      projects:       parseProjects(projects),
      publications:   parsePublications(publications),
      skills:         parseSkills(skills),
      honors:         parseHonors(honors),
      patents:        parsePatents(patents),
      activities:     parseActivities(activities),
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(portfolio, null, 2), 'utf8');
    console.log(`✅ data/portfolio.json 업데이트 완료 (${today()})`);
    console.log('');
    console.log('다음 단계:');
    console.log('  git add data/portfolio.json');
    console.log('  git commit -m "update: portfolio data"');
    console.log('  git push origin main');
  } catch (err) {
    console.error('❌ 오류:', err.message);
    process.exit(1);
  }
}

// ─── CSV 파싱 ──────────────────────────────
function fetchCSV(sheetId, sheetName) {
  return new Promise((resolve, reject) => {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, handleResponse(resolve, reject));
        return;
      }
      handleResponse(resolve, reject)(res);
    }).on('error', reject);
  });
}

function handleResponse(resolve, reject) {
  return (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) resolve(parseCSV(data));
      else reject(new Error(`HTTP ${res.statusCode} — 시트 공유 설정을 확인하세요`));
    });
  };
}

function parseCSV(text) {
  const rows = [];
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const row = [];
    let inQuote = false, field = '';
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuote && line[i + 1] === '"') { field += '"'; i++; }
        else inQuote = !inQuote;
      } else if (ch === ',' && !inQuote) {
        row.push(field.trim()); field = '';
      } else {
        field += ch;
      }
    }
    row.push(field.trim());
    rows.push(row);
  }
  return rows;
}

// ─── 섹션별 파서 ───────────────────────────
function parseBasic(rows) {
  const map = {};
  rows.slice(1).forEach(r => { if (r[0]) map[r[0]] = r[1] || ''; });
  return {
    name:       'Jehun Lee',
    nameKr:     '이제훈',
    titles:     (map['Professional Title'] || '').split('/').map(s => s.trim()).filter(Boolean),
    email:      (map['Email'] || '').split('/').map(s => s.trim()).filter(Boolean),
    website:    (map['Website'] || '').trim(),
    location:   (map['Location'] || '').trim(),
    googleSite: 'https://sites.google.com/view/jehun-lee',
  };
}

function parseEducation(rows) {
  return rows.slice(1).filter(r => r[0]).map(r => ({
    degree:      r[0] || '',
    institution: r[1] || '',
    period:      r[2] || '',
    major:       r[3] || '',
    region:      r[4] || '',
    remarks:     r[5] || '',
  }));
}

function parseWork(rows) {
  return rows.slice(1).filter(r => r[0]).map(r => ({
    position:     r[0] || '',
    organization: r[1] || '',
    division:     r[2] || '',
    period:       r[3] || '',
    roles:        r[4] || '',
    performance:  r[5] || '',
    region:       r[6] || '',
  }));
}

function parseProjects(rows) {
  const lastCol = (rows[0] || []).length - 1;
  return rows.slice(1).filter(r => r[0]).map(r => ({
    index:               Number(r[0]) || 0,
    period:              r[1] || '',
    duration:            r[2] || '',
    title:               r[3] || '',
    client:              r[4] || '',
    partnerInstitution:  r[5] || '',
    affiliatedInstitution: r[6] || '',
    remarks:             r[lastCol] || '',
  })).sort((a, b) => b.index - a.index);
}

function parsePublications(rows) {
  return rows.slice(1).filter(r => r[0]).map(r => ({
    index:    Number(r[0]) || 0,
    authors:  extractAuthors(r[1] || ''),
    title:    extractTitle(r[1] || ''),
    fullCitation: r[1] || '',
    type:     r[2] || '',
    link:     r[4] || '',
    role:     r[5] || '',
    remarks:  r[6] || '',
    year:     Number(r[7]) || 0,
    global:   (r[8] || '').toUpperCase() === 'O',
    venue:    extractVenue(r[1] || ''),
  })).sort((a, b) => b.index - a.index);
}

function parseSkills(rows) {
  const result = {};
  rows.slice(1).forEach(r => {
    if (r[0] && r[1]) {
      result[r[0]] = r[1].split(',').map(s => s.trim()).filter(Boolean);
    }
  });
  return result;
}

function parseHonors(rows) {
  return rows.slice(1).filter(r => r[1]).map(r => ({
    date:         r[0] || '',
    title:        r[1] || '',
    description:  r[2] || '',
    organization: r[3] || '',
    location:     r[4] || '',
    remarks:      r[5] || '',
  }));
}

function parsePatents(rows) {
  return rows.slice(1).filter(r => r[0]).map(r => ({
    title:             r[0] || '',
    description:       r[1] || '',
    applicationDate:   r[2] || '',
    applicationNumber: r[3] || '',
    applicant:         r[4] || '',
    authority:         r[5] || '',
  }));
}

function parseActivities(rows) {
  return rows.slice(1).filter(r => r[0]).map(r => ({
    role:         r[0] || '',
    organization: r[1] || '',
    location:     r[2] || '',
    period:       r[3] || '',
  }));
}

// ─── 인용 파싱 헬퍼 ─────────────────────────
function extractAuthors(citation) {
  const qi = citation.indexOf('"');
  return qi > 0 ? citation.substring(0, qi).trim().replace(/,\s*$/, '') : citation;
}
function extractTitle(citation) {
  const m = citation.match(/"([^"]+)"/);
  return m ? m[1] : citation;
}
function extractVenue(citation) {
  const last = citation.lastIndexOf('"');
  if (last < 0) return '';
  const rest = citation.substring(last + 1).replace(/^[,\s]+/, '');
  const ci = rest.indexOf(',');
  return ci > 0 ? rest.substring(0, ci).trim() : rest.trim();
}

// ─── 정적 데이터 ─────────────────────────────
function getPhilosophy() {
  return {
    headline: 'Systemic Excellence',
    lead: "AI-native engineering — not for marginal efficiency, but to liberate human potential from repetitive complexity.",
    body: "I am a proactive Ph.D. leader and AI strategist who bridges the gap between academic depth and industrial execution. My work is fundamentally rooted in the philosophy of 'Systemic Excellence', where AI-native engineering is utilized not just for marginal efficiency, but to liberate human potential from repetitive complexity.\n\nAs an AI Engineer and Scheduling Solution Consultant, I have led high-impact programs, including the Digital Twin platform construction for SK Hynix and real-time scheduling systems for Micron. These experiences, along with my leadership in over 24 major projects, have sharpened my ability to translate intricate industrial constraints into robust, scalable technical requirements. I possess a global perspective on the semiconductor market and a proven capacity to deliver measurable business impact through technical mastery.\n\nBeyond my technical background in Systems and Industrial Engineering, I am committed to a leadership style that fosters both individual growth and meaningful social contribution. My ultimate goal is to guide the industry toward an intelligent, purposeful future where technological innovation serves as a catalyst for a more advanced and human-centric industrial ecosystem.",
    pillars: [
      { icon: '⚡', title: 'AI-Native Engineering', desc: 'Deploying intelligent systems that transform industrial operations from the ground up — not as a tool, but as a foundational shift.' },
      { icon: '🎯', title: 'Industrial Execution',  desc: 'Translating academic depth into measurable, scalable business impact across semiconductor, logistics, and manufacturing domains.' },
      { icon: '🌐', title: 'Human-Centric Future',  desc: 'Technology as a catalyst for a purposeful industrial ecosystem where human potential is amplified, not replaced.' },
    ],
  };
}

function getStats() {
  return [
    { value: '24+', label: 'Major Projects' },
    { value: '26+', label: 'Publications' },
    { value: '4+',  label: 'Years at KAIST' },
    { value: '1',   label: 'Patent' },
  ];
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

main();
