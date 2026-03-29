/**
 * ═══════════════════════════════════════════════════════════
 *  Google Apps Script — Portfolio Sheet → GitHub Sync
 *
 *  SETUP INSTRUCTIONS:
 *  1. Open your Google Sheet
 *  2. Click Extensions > Apps Script
 *  3. Paste this entire file into the editor
 *  4. Set script properties:
 *     - GITHUB_TOKEN  : your GitHub Personal Access Token (repo scope)
 *     - GITHUB_REPO   : "your-username/your-repo-name"
 *  5. Save and run "setupTrigger()" once to install the auto-trigger
 *
 *  HOW IT WORKS:
 *  - Any edit to the sheet triggers syncToGitHub()
 *  - It reads all tabs, builds portfolio.json, commits to GitHub
 *  - GitHub Actions deploys the updated site automatically
 * ═══════════════════════════════════════════════════════════
 */

/* ─── Configuration ─── */
const CONFIG = {
  FILE_PATH: 'data/portfolio.json',
  COMMIT_MESSAGE: '📊 Auto-update: portfolio data from Google Sheets',
  BRANCH: 'main',
  // Sheet tab names — must match exactly what you named them
  SHEETS: {
    BASIC:       'basic',
    EDUCATION:   'education',
    WORK:        'work experience',
    PROJECTS:    'projects',
    PUBLICATIONS:'academic works',
    SKILLS:      'skills',
    HONORS:      'honors and awards',
    PATENTS:     'patents',
    ACTIVITIES:  'activities and leadership',
  }
};

/* ─── Main Entry Point ─── */
function syncToGitHub() {
  try {
    const props = PropertiesService.getScriptProperties();
    const GITHUB_TOKEN = props.getProperty('GITHUB_TOKEN');
    const GITHUB_REPO  = props.getProperty('GITHUB_REPO');

    if (!GITHUB_TOKEN || !GITHUB_REPO) {
      throw new Error('Missing GITHUB_TOKEN or GITHUB_REPO in Script Properties');
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = buildPortfolioData(ss);
    const jsonStr = JSON.stringify(data, null, 2);

    commitToGitHub(jsonStr, GITHUB_TOKEN, GITHUB_REPO);
    Logger.log('✅ Portfolio synced to GitHub successfully');
  } catch (e) {
    Logger.log('❌ Sync failed: ' + e.message);
    throw e;
  }
}

/* ─── Build Portfolio JSON ─── */
function buildPortfolioData(ss) {
  return {
    lastUpdated: Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd'),
    basic:        parseBasic(ss),
    philosophy:   getPhilosophy(),
    stats:        getStats(),
    education:    parseEducation(ss),
    workExperience: parseWorkExperience(ss),
    projects:     parseProjects(ss),
    publications: parsePublications(ss),
    skills:       parseSkills(ss),
    honors:       parseHonors(ss),
    patents:      parsePatents(ss),
    activities:   parseActivities(ss),
  };
}

/* ─── Sheet Parsers ─── */

function parseBasic(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.BASIC);
  if (!sheet) return {};
  const rows = sheet.getDataRange().getValues();
  const map = {};
  rows.slice(1).forEach(r => {
    if (r[0]) map[r[0]] = r[1];
  });
  return {
    name: 'Jehun Lee',
    nameKr: '이제훈',
    titles: (map['Professional Title'] || '').split('/').map(s => s.trim()).filter(Boolean),
    email: (map['Email'] || '').split('/').map(s => s.trim()).filter(Boolean),
    website: (map['Website'] || '').trim(),
    location: (map['Location'] || '').trim(),
    googleSite: 'https://sites.google.com/view/jehun-lee',
  };
}

function parseEducation(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.EDUCATION);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  const header = rows[0]; // Degree, Institution, Period, Major, Region, Remarks
  return rows.slice(1).filter(r => r[0]).map(r => ({
    degree: r[0] || '',
    institution: r[1] || '',
    period: r[2] || '',
    major: r[3] || '',
    region: r[4] || '',
    remarks: r[5] || '',
  }));
}

function parseWorkExperience(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.WORK);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  // Position, Organization, Division, Period, Roles & Responsibilities, Performance, Region
  return rows.slice(1).filter(r => r[0]).map(r => ({
    position: r[0] || '',
    organization: r[1] || '',
    division: r[2] || '',
    period: r[3] || '',
    roles: r[4] || '',
    performance: r[5] || '',
    region: r[6] || '',
  }));
}

function parseProjects(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.PROJECTS);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  // Index, Period, n(entire), Project title, Client, Partner Institution, Affiliated Institution, ...skill cols..., Remarks
  const lastCol = rows[0].length;
  return rows.slice(1).filter(r => r[0]).map(r => ({
    index: r[0] || 0,
    period: r[1] || '',
    duration: r[2] || '',
    title: r[3] || '',
    client: r[4] || '',
    partnerInstitution: r[5] || '',
    affiliatedInstitution: r[6] || '',
    remarks: r[lastCol - 1] || '',
  })).sort((a, b) => (b.index || 0) - (a.index || 0));
}

function parsePublications(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.PUBLICATIONS);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  // Index, Materials, Type, Paper(bool), Paper Link, Role, Remarks, Year, Global
  return rows.slice(1).filter(r => r[0]).map(r => ({
    index: r[0] || 0,
    authors: extractAuthors(r[1] || ''),
    title: extractTitle(r[1] || ''),
    fullCitation: r[1] || '',
    type: r[2] || '',
    hasPaper: r[3] === 'O',
    link: r[4] || '',
    role: r[5] || '',
    remarks: r[6] || '',
    year: r[7] || '',
    global: r[8] === 'O' || r[8] === 'o',
    venue: extractVenue(r[1] || ''),
  })).sort((a, b) => (b.index || 0) - (a.index || 0));
}

function parseSkills(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.SKILLS);
  if (!sheet) return {};
  const rows = sheet.getDataRange().getValues();
  const result = {};
  rows.slice(1).forEach(r => {
    if (r[0] && r[1]) {
      result[r[0]] = r[1].toString().split(',').map(s => s.trim()).filter(Boolean);
    }
  });
  return result;
}

function parseHonors(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.HONORS);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  // Date, Award Title, Description, Awarding Organization, Location, Remarks
  return rows.slice(1).filter(r => r[1]).map(r => ({
    date: r[0] ? String(r[0]) : '',
    title: r[1] || '',
    description: r[2] || '',
    organization: r[3] || '',
    location: r[4] || '',
    remarks: r[5] || '',
  }));
}

function parsePatents(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.PATENTS);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  // Patent Title, Description, Application date, Application number, Applicant, Authority
  return rows.slice(1).filter(r => r[0]).map(r => ({
    title: r[0] || '',
    description: r[1] || '',
    applicationDate: r[2] ? String(r[2]) : '',
    applicationNumber: r[3] || '',
    applicant: r[4] || '',
    authority: r[5] || '',
  }));
}

function parseActivities(ss) {
  const sheet = ss.getSheetByName(CONFIG.SHEETS.ACTIVITIES);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  // Role, Organization, Location, Period
  return rows.slice(1).filter(r => r[0]).map(r => ({
    role: r[0] || '',
    organization: r[1] || '',
    location: r[2] || '',
    period: r[3] || '',
  }));
}

/* ─── Static Data (not in sheet) ─── */
function getPhilosophy() {
  return {
    headline: 'Systemic Excellence',
    lead: "AI-native engineering — not for marginal efficiency, but to liberate human potential from repetitive complexity.",
    body: "I am a proactive Ph.D. leader and AI strategist who bridges the gap between academic depth and industrial execution. My work is fundamentally rooted in the philosophy of 'Systemic Excellence', where AI-native engineering is utilized not just for marginal efficiency, but to liberate human potential from repetitive complexity.\n\nAs an AI Engineer and Scheduling Solution Consultant, I have led high-impact programs, including the Digital Twin platform construction for SK Hynix and real-time scheduling systems for Micron. These experiences, along with my leadership in over 24 major projects, have sharpened my ability to translate intricate industrial constraints into robust, scalable technical requirements. I possess a global perspective on the semiconductor market and a proven capacity to deliver measurable business impact through technical mastery.\n\nBeyond my technical background in Systems and Industrial Engineering, I am committed to a leadership style that fosters both individual growth and meaningful social contribution. My ultimate goal is to guide the industry toward an intelligent, purposeful future where technological innovation serves as a catalyst for a more advanced and human-centric industrial ecosystem.",
    pillars: [
      { icon: '⚡', title: 'AI-Native Engineering', desc: 'Deploying intelligent systems that transform industrial operations from the ground up — not as a tool, but as a foundational shift.' },
      { icon: '🎯', title: 'Industrial Execution', desc: 'Translating academic depth into measurable, scalable business impact across semiconductor, logistics, and manufacturing domains.' },
      { icon: '🌐', title: 'Human-Centric Future', desc: 'Technology as a catalyst for a purposeful industrial ecosystem where human potential is amplified, not replaced.' },
    ]
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

/* ─── Citation Helpers ─── */
function extractAuthors(citation) {
  const quoteIdx = citation.indexOf('"');
  if (quoteIdx > 0) return citation.substring(0, quoteIdx).trim().replace(/,$/, '');
  return citation.split(',').slice(0, 3).join(',').trim();
}

function extractTitle(citation) {
  const m = citation.match(/"([^"]+)"/);
  return m ? m[1] : citation;
}

function extractVenue(citation) {
  const afterQuote = citation.lastIndexOf('"');
  if (afterQuote >= 0) {
    const rest = citation.substring(afterQuote + 1).replace(/^[,\s]+/, '');
    const comma = rest.indexOf(',');
    return comma > 0 ? rest.substring(0, comma).trim() : rest.trim();
  }
  return '';
}

/* ─── GitHub API ─── */
function commitToGitHub(content, token, repo) {
  const apiBase = `https://api.github.com/repos/${repo}/contents/${CONFIG.FILE_PATH}`;
  const headers  = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  // Step 1: Get current file SHA
  let sha = null;
  try {
    const getRes = UrlFetchApp.fetch(apiBase, { headers, muteHttpExceptions: true });
    if (getRes.getResponseCode() === 200) {
      sha = JSON.parse(getRes.getContentText()).sha;
    }
  } catch (e) {
    Logger.log('File not found yet — will create new');
  }

  // Step 2: Put (create or update) file
  const payload = {
    message: CONFIG.COMMIT_MESSAGE,
    content: Utilities.base64Encode(content),
    branch:  CONFIG.BRANCH,
  };
  if (sha) payload.sha = sha;

  const putRes = UrlFetchApp.fetch(apiBase, {
    method: 'put',
    headers,
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  const code = putRes.getResponseCode();
  if (code !== 200 && code !== 201) {
    throw new Error(`GitHub API error ${code}: ${putRes.getContentText()}`);
  }
}

/* ─── Trigger Setup ─── */
/**
 * Run this function ONCE manually to install the onEdit trigger.
 * Go to: Run > setupTrigger
 */
function setupTrigger() {
  // Remove existing triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'syncToGitHub') {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Install new onEdit trigger
  ScriptApp.newTrigger('syncToGitHub')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onEdit()
    .create();

  Logger.log('✅ Trigger installed: syncToGitHub will run on every sheet edit');
}

/**
 * Run manually to test the sync without editing the sheet.
 */
function testSync() {
  syncToGitHub();
}
