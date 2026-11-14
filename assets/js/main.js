/**
 * Jehun Lee Portfolio — main.js v4.0 (i18n)
 */
let LANG = localStorage.getItem('lang') || 'en';
const DATA_VER = '20261114c';
const DATA_URLS = { en: `data/portfolio.json?v=${DATA_VER}`, ko: `data/portfolio.ko.json?v=${DATA_VER}` };
const RESEARCH_INTERESTS = {
  en: [
    { title: 'Autonomous Scheduling', desc: 'AI-driven dynamic scheduling for real-time manufacturing environments' },
    { title: 'Reinforcement & Imitation Learning', desc: 'Graph-based RL/IL algorithms for real-time industrial decision-making' },
    { title: 'Digital Twin & Simulation', desc: 'Production-logistics simulation platforms for semiconductor fabs' },
    { title: 'Semiconductor Fab Optimization', desc: 'Real-time scheduling and operation planning for advanced semiconductor manufacturing' },
    { title: 'Meta-Architecture for Scheduling', desc: 'Generalizable agent architectures adaptable to diverse manufacturing environments' },
    { title: 'AI-Native Manufacturing', desc: 'End-to-end AI integration in smart factory systems and SaaS platforms' },
    { title: 'AI Agent Systems', desc: 'Efficient agent architectures built on AI-ready data, LLM wikis and ontologies' },
    { title: 'AI Agent Services', desc: 'Production AI agents: backend, operational stability and deployment' },
  ],
  ko: [
    { title: '자율 스케줄링', desc: '실시간 제조 환경을 위한 AI 기반 동적 스케줄링' },
    { title: '강화학습 & 모방학습', desc: '실시간 산업 의사결정을 위한 그래프 기반 RL/IL 알고리즘' },
    { title: '디지털 트윈 & 시뮬레이션', desc: '반도체 팹 생산-물류 시뮬레이션 플랫폼' },
    { title: '반도체 팹 최적화', desc: '첨단 반도체 제조의 실시간 스케줄링 및 운영 계획' },
    { title: '스케줄링 메타 아키텍처', desc: '다양한 제조 환경에 적응 가능한 범용 에이전트 아키텍처' },
    { title: 'AI 네이티브 제조', desc: '스마트 팩토리 시스템 및 SaaS 플랫폼의 End-to-End AI 통합' },
    { title: 'AI 에이전트 시스템', desc: 'AI-ready 데이터, LLM 위키, 온톨로지를 바탕으로 한 효율적인 에이전트 구조' },
    { title: 'AI 에이전트 서비스', desc: '백엔드, 운영 안정성, 배포까지 갖춘 실서비스 AI 에이전트' },
  ],
};
const FEATURED_PROJECT_INDICES = [25, 23, 21];
const SOCIAL = { linkedin: 'https://www.linkedin.com/in/jehun-lee/', scholar: 'https://scholar.google.com/citations?user=C7ekyjEAAAAJ' };
const RESUME_URLS = { en: 'data/resume-en.pdf', ko: 'data/resume-ko.pdf' };
const THESIS_FALLBACK = { 'Ph.D.': 'Learning Schedulers for Job Shop Scheduling Problems', 'M.S.': '' };

/* ─── i18n UI Strings ─── */
const I18N = {
  en: {
    nav: { philosophy:'Philosophy', education:'Education', experience:'Experience', projects:'Projects', publications:'Publications', awards:'Awards', contact:'Contact' },
    label: { corePhilosophy:'Core Philosophy', expertise:'Expertise', researchFocus:'Research Focus', academicBg:'Academic Background', education:'Education', career:'Career', workExp:'Work Experience', highlights:'Highlights', featuredProj:'Featured Projects', featuredSub:'Industry-defining programs across semiconductor & smart manufacturing', portfolio:'Portfolio', allProjects:'All Projects', researchOutput:'Research Output', academicWorks:'Academic Works', recognition:'Recognition', honorsAwards:'Honors & Awards', ip:'Intellectual Property', patents:'Patents', leadership:'Leadership & Service', activities:'Activities & Leadership', capabilities:'Capabilities', skills:'Skills', connect:'Let\'s Connect', getInTouch:'Get in Touch', contactIntro:'Open to AI research partnerships, industry consulting engagements, and strategic collaborations in intelligent manufacturing.' },
    ui: { contactMe:'Contact Me', resumeEn:'Resume (EN)', resumeKo:'Resume (KO)', all:'All', pmLead:'PM Lead', planning:'Planning', teamSize:'Team Size', govt:"Gov't", detailsHint:'Details ↗', viewPaper:'View Paper ↗', thesis:'Thesis:', prev:'Previous', next:'Next', period:'Period', role:'Role', client:'Client', partners:'Partners', partner:'Partner', affiliated:'Affiliated', situation:'Situation', purpose:'Objective', keyTasks:'Actions', achievements:'Results', notes:'Notes', remarks:'Remarks', intlJournal:'Intl. Journal', domJournal:'Dom. Journal', intlConf:'Intl. Conference', domConf:'Dom. Conference', poster:'Poster', allRights:'All rights reserved', updated:'Updated:', topic:'Topic', priorLimitations:'Prior Limitations', methodology:'Methodology', performance:'Performance', patNo:'No.', patFiled:'Filed', patApplicant:'Applicant', patAuthority:'Authority', email:'Email', location:'Location', intlJournalBadge:'Intl. Journal', domJournalBadge:'Dom. Journal', intlConfBadge:'Intl. Conf.', domConfBadge:'Dom. Conf.', firstAuthor:'1st Author', altServiceLabel:'Alternative military service (technical research personnel)', patStatus:'Status', granted:'Granted', patInventors:'Inventors' },
    impact: { projects:'Major Projects', pm:'PM Roles', journals:'SCI Journal Papers', intlConf:'Intl. Conf. Papers', patent:'Granted Patent' },
  },
  ko: {
    nav: { philosophy:'철학', education:'교육', experience:'경력', projects:'프로젝트', publications:'논문', awards:'수상', contact:'연락처' },
    label: { corePhilosophy:'핵심 철학', expertise:'전문성', researchFocus:'연구 분야', academicBg:'학력', education:'학력', career:'경력', workExp:'경력 사항', highlights:'하이라이트', featuredProj:'주요 프로젝트', featuredSub:'반도체 & 스마트 제조 분야의 대표 프로그램', portfolio:'포트폴리오', allProjects:'전체 프로젝트', researchOutput:'연구 성과', academicWorks:'학술 논문', recognition:'수상 내역', honorsAwards:'수상 및 성과', ip:'지식재산', patents:'특허', leadership:'리더십 & 봉사', activities:'활동 및 리더십', capabilities:'역량', skills:'기술', connect:'연락하기', getInTouch:'연락처', contactIntro:'AI 연구 파트너십, 산업 컨설팅, 지능형 제조 분야의 전략적 협업에 열려 있습니다.' },
    ui: { contactMe:'연락하기', resumeEn:'이력서 (EN)', resumeKo:'이력서 (KO)', all:'전체', pmLead:'PM 수행', planning:'기획', teamSize:'규모', govt:'정부과제', detailsHint:'상세 ↗', viewPaper:'논문 보기 ↗', thesis:'논문:', prev:'이전', next:'다음', period:'기간', role:'역할', client:'고객사', partners:'협력사', partner:'협력기관', affiliated:'소속기관', situation:'상황', purpose:'목표', keyTasks:'수행 내용', achievements:'성과', notes:'비고', remarks:'비고', intlJournal:'국제 저널', domJournal:'국내 저널', intlConf:'국제 학회', domConf:'국내 학회', poster:'포스터', allRights:'All rights reserved', updated:'업데이트:', topic:'주제', priorLimitations:'기존 연구 한계', methodology:'방법론', performance:'성능', patNo:'출원번호', patFiled:'출원일', patApplicant:'출원인', patAuthority:'출원국', email:'이메일', location:'위치', intlJournalBadge:'국제 저널', domJournalBadge:'국내 저널', intlConfBadge:'국제 학회', domConfBadge:'국내 학회', firstAuthor:'1저자', altServiceLabel:'전문연구요원 (병역 대체 복무)', patStatus:'상태', granted:'등록', patInventors:'발명자' },
    impact: { projects:'주요 프로젝트', pm:'PM 수행', journals:'SCI 저널 논문', intlConf:'국제 학회 논문', patent:'등록 특허' },
  },
};
function t(key) { const parts = key.split('.'); let obj = I18N[LANG]; for (const p of parts) { obj = obj?.[p]; } return obj || key; }

/* ─── Localized labels for fixed-key data fields ─── */
const DEGREE_KO = { 'Ph.D.': '공학박사 (Ph.D.)', 'M.S.': '석사', 'B.S.': '학사', 'High School': '고등학교' };
const REGION_KO = {
  'Yongin, South Korea': '경기 용인',
  'Daejeon, South Korea': '대전',
  'Suwon, South Korea': '경기 수원',
  'Seoul, South Korea': '서울',
};
function locDegree(d) { return LANG === 'ko' ? (DEGREE_KO[d] || d) : d; }
function locRegion(r) { return LANG === 'ko' ? (REGION_KO[r] || r) : r; }
function locPeriod(p) { return (LANG === 'ko' && typeof p === 'string') ? p.replace(/\bPresent\b/i, '현재') : p; }

let _allProjects = [];
let _projPager, _pubPager, _awardPager, _activityPager;
let _typewriterTimer = null;

/* ─── Project Classification (methodology + domain) ─── */
function getProjectTags(p) {
  const text = ((p?.title || '') + ' ' + (p?.remarks || '')).toLowerCase();
  const methods = [];
  const domains = [];

  // Methodology
  if (/reinforcement|imitation|\brl\b|강화학습|모방학습/.test(text)) methods.push('AI(RL)');
  if (/genetic|heuristic|\bga\b|메타휴리스틱|유전 알고리즘|휴리스틱/.test(text)) methods.push('AI(heuristic)');
  if (/machine learning|deep learning|neural|\bgnn\b|\blstm\b|prediction|forecast|머신러닝|딥러닝|학습 기반|예측|수요|ai[\s-]?(?:agent|model|predict|learn|sched|engine)/.test(text)) methods.push('AI(ML)');
  if (/optimization|\bmip\b|cplex|gurobi|integer programm|mathematical programm|최적화|수리/.test(text)) methods.push('Opt');

  // Domain
  if (/3d print|적층|3d 프린/.test(text)) domains.push('3D Printing');
  if (/assembly|조립/.test(text)) domains.push('Assembly Line');
  if (/schedul|dispatch|스케줄|디스패칭/.test(text)) domains.push('Scheduling');
  if (/plann|계획/.test(text)) domains.push('Planning');
  if (/manufactur|factory|fab|production|제조|생산|팩토리|팹/.test(text)) domains.push('Manufacturing');

  return { methods, domains };
}
/* team_size is a bucket like "5+"; client staff are not counted */
function teamLabel(size) { return LANG === 'ko' ? `${size}명` : `${size} people`; }
/* "5m (5y)" = took part 5 months of a 5-year project → "5개월 (전체 5년)" */
function durLabel(d) {
  const unit = s => s.replace(/(\d+)y/g, LANG === 'ko' ? '$1년 ' : '$1 yr ').replace(/(\d+)m/g, LANG === 'ko' ? '$1개월' : '$1 mo').replace(/\s+/g, ' ').trim();
  const m = String(d || '').match(/^(.+?)\s*\((.+)\)$/);
  if (!m) return unit(String(d || ''));
  return LANG === 'ko' ? `${unit(m[1])} (전체 ${unit(m[2])})` : `${unit(m[1])} (of ${unit(m[2])})`;
}
function isGov(client) { return /NRF|MOTIE|MSIP|Ministry/i.test(client || ''); }

/* ─── Bootstrap ─── */
async function init() {
  try {
    applyLangUI();
    const res = await fetch(DATA_URLS[LANG] || DATA_URLS.en);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    render(data);
    setupNav(); setupScrollReveal(); setupPhotoFallback();
    setupTitleTypewriter(data.basic?.titles || []);
    setupLangToggle();
    setupThemeToggle();
  } catch (err) {
    console.error('Portfolio load error:', err);
    const main = document.querySelector('main');
    if (main) main.innerHTML = '<p style="padding:4rem 2rem;text-align:center;color:var(--text-muted)">Failed to load portfolio data. Please refresh the page.</p>';
  }
}

/* ─── Theme Toggle ─── */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}
function setupThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn || btn.dataset.ready) return;
  btn.dataset.ready = '1';
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
}
applyTheme(localStorage.getItem('theme') || 'light');

/* ─── Language Toggle ─── */
let _switching = false;
function setupLangToggle() {
  const btn = document.getElementById('langToggle');
  if (!btn || btn.dataset.ready) return;
  btn.dataset.ready = '1';
  btn.addEventListener('click', async () => {
    if (_switching) return;
    _switching = true;
    const prevLang = LANG;
    LANG = LANG === 'en' ? 'ko' : 'en';
    localStorage.setItem('lang', LANG);
    applyLangUI();
    try {
      const res = await fetch(DATA_URLS[LANG]);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      render(data);
      setupTitleTypewriter(data.basic?.titles || []);
      setupScrollReveal();
    } catch (err) {
      console.error('Language switch error:', err);
      LANG = prevLang;
      localStorage.setItem('lang', LANG);
      applyLangUI();
    } finally { _switching = false; }
  });
}

function applyLangUI() {
  /* Toggle button label */
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.querySelector('.lang-current').textContent = LANG.toUpperCase();
    btn.querySelector('.lang-label').textContent = LANG === 'en' ? 'KO' : 'EN';
    btn.setAttribute('aria-label', LANG === 'en' ? 'Switch to Korean' : 'Switch to English');
  }
  /* Nav links */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val && val !== key) el.textContent = val;
  });
  /* HTML lang attribute */
  document.documentElement.lang = LANG;
}

function render(data) {
  renderHero(data); renderImpactStrip(data); renderPhilosophy(data.philosophy); renderResearchFocus();
  renderEducation(data.education); renderExperience(data.workExperience);
  renderFeaturedProjects(data.projects); renderProjects(data.projects);
  renderPublications(data.publications); renderAwards(data.honors);
  renderPatents(data.patents); renderActivities(data.activities); renderSkills(data.skills);
  renderContact(data.basic); renderFooter(data);
}

/* ─── Hero ─── */
function renderHero(data) {
  const heroBtn = document.getElementById('heroContactBtn');
  if (heroBtn) heroBtn.textContent = t('ui.contactMe');
  const locEl = document.getElementById('heroLocationText');
  if (locEl && data.basic?.location) locEl.textContent = [data.basic.location, data.workExperience?.[0]?.organization].filter(Boolean).join(' · ');
  const sumEl = document.getElementById('heroSummary');
  if (sumEl) {
    const lines = (data.basic?.summary || '').split('\n').filter(Boolean);
    sumEl.innerHTML = lines.map((line, i) => {
      const body = esc(line).replace(/(\d+\+?)(?![a-zA-Z])/g, '<strong>$1</strong>');
      return `<span class="hero-summary-line" style="--i:${i}"><span class="hero-summary-bullet">●</span>${body}</span>`;
    }).join('');
  }
  const resBtnEn = document.getElementById('heroResumeBtnEn');
  const resBtnKo = document.getElementById('heroResumeBtnKo');
  if (resBtnEn) { resBtnEn.href = RESUME_URLS.en; resBtnEn.querySelector('span').textContent = t('ui.resumeEn'); }
  if (resBtnKo) { resBtnKo.href = RESUME_URLS.ko; resBtnKo.querySelector('span').textContent = t('ui.resumeKo'); }
}

/* ─── Typewriter ─── */
function setupTitleTypewriter(titles) {
  if (_typewriterTimer) clearTimeout(_typewriterTimer);
  if (!titles.length) return;
  const el = document.getElementById('heroTitleText'); if (!el) return;
  el.textContent = '';
  let ti = 0, ci = 0, del = false;
  function tick() {
    const c = titles[ti];
    if (!del) { el.textContent = c.slice(0, ++ci); if (ci === c.length) { del = true; _typewriterTimer = setTimeout(tick, 2200); return; } }
    else { el.textContent = c.slice(0, --ci); if (ci === 0) { del = false; ti = (ti + 1) % titles.length; _typewriterTimer = setTimeout(tick, 350); return; } }
    _typewriterTimer = setTimeout(tick, del ? 40 : 65);
  }
  _typewriterTimer = setTimeout(tick, 800);
}

/* ─── Impact Strip ─── */
function renderImpactStrip(data) {
  const el = document.getElementById('impactStrip'); if (!el) return;
  el.innerHTML = '';
  const c = data.counts || {};
  [{v:c.projects,l:t('impact.projects'),h:'projects'},{v:c.pm,l:t('impact.pm'),h:'projects'},{v:c.journals,l:t('impact.journals'),h:'publications'},{v:c.intl_conf,l:t('impact.intlConf'),h:'publications'},{v:c.patents,l:t('impact.patent'),h:'patents'}]
    .filter(it => it.v != null).forEach(it => el.innerHTML += `<a class="impact-item" href="#${it.h}"><span class="impact-num">${esc(String(it.v))}</span><span class="impact-label">${esc(it.l)}</span></a>`);
}

/* ─── Philosophy ─── */
function renderPhilosophy(p) {
  if (!p) return;
  setText('philosophyHeadline', p.headline); setText('philosophyLead', p.lead);
  const btn = document.getElementById('philosophyMore');
  if (btn) {
    btn.textContent = t('ui.detailsHint');
    btn.hidden = !p.body;
    btn.onclick = () => openModal(`<div class="modal-title" id="modalTitle">${esc(p.headline)}</div>${p.body.split('\n\n').filter(Boolean).map(para => `<p class="modal-section-text">${esc(para)}</p>`).join('')}`);
  }
  const pl = document.getElementById('philosophyPillars');
  if (pl && p.pillars) pl.innerHTML = p.pillars.map(x => `<div class="pillar reveal"><div class="pillar-head"><div class="pillar-icon">${esc(x.icon)}</div><h3>${esc(x.title)}</h3></div><p>${esc(x.desc)}</p></div>`).join('');
}

/* ─── Research ─── */
function renderResearchFocus() {
  const el = document.getElementById('researchGrid'); if (!el) return;
  const items = RESEARCH_INTERESTS[LANG] || RESEARCH_INTERESTS.en;
  el.innerHTML = items.map(r => `<div class="research-card reveal"><div class="rc-title">${esc(r.title)}</div><div class="rc-desc">${esc(r.desc)}</div></div>`).join('');
}

/* ─── Education ─── */
function renderEducation(items) {
  const el = document.getElementById('educationTimeline'); if (!el || !items) return;
  const bodies = [];
  el.innerHTML = items.filter(item => item.degree !== 'High School').map(item => {
    const th = item.thesis || {};
    const thesisTitle = th.title || THESIS_FALLBACK[item.degree] || '';
    const title = `${esc(locDegree(item.degree))} — ${esc(item.major)}`;
    const advisorHtml = item.advisor ? parseAdvisor(item.advisor) : (item.remarks ? parseAdvisor(item.remarks) : '');
    const section = (label, html) => html ? `<div class="modal-section"><div class="modal-section-label">${label}</div>${html}</div>` : '';
    const para = v => v ? `<p class="modal-section-text">${esc(v)}</p>` : '';
    const di = thesisTitle ? bodies.push(`<div class="modal-title" id="modalTitle">${title}</div>
      <div class="modal-field"><span class="modal-field-label">${esc(item.institution)}</span></div>
      ${section(t('ui.thesis'), para(thesisTitle))}
      ${section(t('ui.topic'), para(th.topic))}
      ${section(t('ui.priorLimitations'), para(th.priorLimitations))}
      ${section(t('ui.methodology'), th.methodology ? `<div class="edu-methodology">${formatMethodology(th.methodology)}</div>` : '')}
      ${section(t('ui.performance'), para(th.performance))}`) - 1 : -1;
    return `<div class="timeline-item reveal"${di >= 0 ? ` data-detail="${di}"` : ''}>
      <div class="tl-header"><span class="tl-title">${title}</span><div class="tl-header-right"><span class="tl-period">${esc(locPeriod(item.period))}</span>${di >= 0 ? detailHint(`${locDegree(item.degree)} — ${item.major}`) : ''}</div></div>
      <div class="tl-org"><span class="org-name">${esc(item.institution)}</span></div>
      ${advisorHtml ? `<div class="tl-remarks">${advisorHtml}</div>` : ''}
    </div>`;
  }).join('');
  bindDetails(el, bodies);
}
function formatMethodology(text) {
  if (!text) return '';
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.some(l => /^\d+\./.test(l.trim()))) {
    return `<ol>${lines.filter(l => /^\d+\./.test(l.trim())).map(l => `<li>${esc(l.replace(/^\d+\.\s*/, ''))}</li>`).join('')}</ol>`;
  }
  return lines.map(l => `<p>${esc(l)}</p>`).join('');
}
function parseAdvisor(r) {
  const m = r.match(/^(Advisor:\s*[^,]+),\s*(https?:\/\/\S+)$/i)
         || r.match(/^(.+?)\s*\(\s*(https?:\/\/\S+?)\s*\)$/);
  if (!m) return esc(r);
  const name = m[1].trim();
  const label = LANG === 'ko' ? '지도교수' : 'Advisor';
  const prof = name.startsWith('Prof.') ? name : `Prof. ${name}`;
  return `${label}: ${esc(prof)} <a href="${safeUrl(m[2].trim())}" target="_blank" rel="noopener noreferrer" class="tl-link" aria-label="${LANG === 'ko' ? '지도교수 홈페이지' : 'Advisor homepage'}">🔗</a>`;
}

/* ─── Experience ─── */
function renderExperience(items) {
  const el = document.getElementById('experienceTimeline'); if (!el || !items) return;
  const bodies = [];
  el.innerHTML = items.map(item => {
    const hasResp = item.responsibilities && item.responsibilities.length > 0;
    const hasHighlights = item.highlights && item.highlights.length > 0;
    const di = hasResp || hasHighlights ? bodies.push(`<div class="modal-title" id="modalTitle">${esc(item.position)}</div>
      <div class="modal-field"><span class="modal-field-label">${esc(item.organization)}${item.division ? ` · ${esc(item.division)}` : ''}</span><span class="modal-field-value">${esc(locPeriod(item.period))}</span></div>
      ${hasResp ? `<ul class="modal-task-list">${item.responsibilities.map(r => `<li>${esc(r)}</li>`).join('')}</ul>` : ''}
      ${hasHighlights ? `<div class="tl-highlights">${item.highlights.map(h => `<div class="tl-highlight-item">${esc(h)}</div>`).join('')}</div>` : ''}`) - 1 : -1;
    return `
    <div class="timeline-item reveal"${di >= 0 ? ` data-detail="${di}"` : ''}>
      <div class="tl-header">
        <div class="tl-header-left">
          <span class="tl-title">${esc(item.position)}</span>
          <span class="tl-org"><span class="org-name">${esc(item.organization)}</span>${item.division ? ` <span class="tl-sep">|</span> <span class="tl-division">${esc(item.division)}</span>` : ''}</span>
        </div>
        <div class="tl-header-right">
          <span class="tl-period">${esc(locPeriod(item.period))}</span>
          <span class="tl-region-sm">${esc(locRegion(item.region))}</span>
          ${di >= 0 ? detailHint(item.position) : ''}
        </div>
      </div>
      <div class="tl-roles">${esc(item.roles)}</div>
      ${item.alt_service ? `<div class="tl-alt-service"><span class="alt-badge">${esc(t('ui.altServiceLabel'))} · ${esc(item.alt_service)}</span></div>` : ''}
    </div>`;
  }).join('');
  bindDetails(el, bodies);
}

/* ─── Featured Projects ─── */
function renderFeaturedProjects(projects) {
  const el = document.getElementById('featuredGrid'); if (!el || !projects) return;
  const featured = FEATURED_PROJECT_INDICES.map(i => projects.find(p => p.index === i)).filter(Boolean);
  el.innerHTML = featured.map(p => projectCard(p, p.details?.achievements)).join('');

  const sub = document.getElementById('projectSubtitle');
  if (sub) sub.textContent = LANG === 'ko' ? `${projects.length}개 프로젝트 · PM ${projects.filter(p => p.isPM).length}건` : `${projects.length} projects · ${projects.filter(p => p.isPM).length} PM roles`;

  /* featured click → modal (delegated, safe to rebind) */
  el.onclick = e => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    const p = _allProjects.find(x => x.index === parseInt(card.dataset.projIndex));
    if (p) openProjectModal(p);
  };
}

/* ─── Project card (Featured + All Projects) ─── */
function projectCard(p, result) {
  const tags = getProjectTags(p);
  const gov = isGov(p.client);
  const orgs = [
    [t('ui.affiliated'), p.affiliatedInstitution],
    [t('ui.partners'), (p.partners || []).join(' · ')],
    [t('ui.client'), p.client],
  ].filter(([, v]) => v);
  const orgList = orgs.length ? `<dl class="project-org">${orgs.map(([l, v]) => `<dt>${esc(l)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>` : '';
  const when = [locPeriod(p.period), durLabel(p.duration)].filter(Boolean).join(' · ');
  return `
    <div class="project-card reveal" data-paged data-proj-index="${p.index}" data-proj-pm="${p.isPM?'1':'0'}" data-proj-gov="${gov?'1':'0'}" data-proj-methods="${esc(tags.methods.join(','))}" data-proj-domains="${esc(tags.domains.join(','))}">
      <div class="project-meta">
        <span class="project-period"><span class="project-num">[${p.index}]</span>${esc(when)}</span>
        ${detailHint(p.title)}
      </div>
      <div class="project-title${(p.title || '').length > 60 ? ' long' : ''}">${esc(p.title)}</div>
      ${orgList}
      ${result?`<div class="project-result">${esc(result)}</div>`:''}
      <div class="project-footer">
        ${p.isPM?'<span class="tag pm">PM</span>':''}
        ${p.isPL?'<span class="tag pm">PL</span>':''}
        ${p.isPlanning?`<span class="tag plan">${t('ui.planning')}</span>`:''}
        ${p.teamSize?`<span class="tag">${esc(teamLabel(p.teamSize))}</span>`:''}
        ${gov?'<span class="tag gov">Gov\'t</span>':''}
        ${tags.methods.map(m=>`<span class="tag method">${esc(m)}</span>`).join('')}
        ${tags.domains.map(d=>`<span class="tag domain">${esc(d)}</span>`).join('')}
      </div>
    </div>`;
}

/* ─── All Projects (carousel + topic filter) ─── */
function renderProjects(items) {
  _allProjects = items || [];
  const el = document.getElementById('projectsGrid'); if (!el || !items) return;
  const sorted = [...items].sort((a, b) => b.index - a.index);

  /* Collect all method + domain tags */
  const methodSet = new Set(), domainSet = new Set();
  sorted.forEach(p => {
    const tg = getProjectTags(p);
    tg.methods.forEach(m => methodSet.add(m));
    tg.domains.forEach(d => domainSet.add(d));
  });

  /* Filter bar */
  const fb = document.getElementById('projFilterBar');
  if (fb) fb.innerHTML = [
    `<button class="filter-btn active" data-proj-filter="all">${t('ui.all')}</button>`,
    `<button class="filter-btn" data-proj-filter="pm">${t('ui.pmLead')}</button>`,
    `<button class="filter-btn" data-proj-filter="gov">${t('ui.govt')}</button>`,
    ...[...methodSet].sort().map(m => `<button class="filter-btn" data-proj-filter="method:${esc(m)}">${esc(m)}</button>`),
    ...[...domainSet].sort().map(d => `<button class="filter-btn" data-proj-filter="domain:${esc(d)}">${esc(d)}</button>`)
  ].join('');

  el.innerHTML = sorted.map(p => projectCard(p)).join('');

  _projPager = createCarousel(el, 'projectsPager', 4, 2);
  setupProjectModal();

  /* filter click */
  const handler = e => {
    const btn = e.target.closest('#projFilterBar .filter-btn'); if (!btn) return;
    document.querySelectorAll('#projFilterBar .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.projFilter;
    el.querySelectorAll('[data-paged]').forEach(c => {
      let show = true;
      if (f === 'pm') show = c.dataset.projPm === '1';
      else if (f === 'gov') show = c.dataset.projGov === '1';
      else if (f.startsWith('method:')) show = (c.dataset.projMethods||'').split(',').includes(f.slice(7));
      else if (f.startsWith('domain:')) show = (c.dataset.projDomains||'').split(',').includes(f.slice(7));
      else show = f === 'all';
      c.dataset.filtered = show ? '' : '1';
    });
    _projPager.reset();
  };
  const filterBar = document.getElementById('projFilterBar');
  if (filterBar) filterBar.onclick = handler;
}

/* ─── Publications (paged) ─── */
function renderPublications(items) {
  const el = document.getElementById('pubList'); if (!el || !items) return;
  const sorted = [...items].sort((a, b) => b.index - a.index);
  el.innerHTML = sorted.map(pub => {
    const isIntl = pub.global;
    let dt, tb;
    if (pub.type === 'Poster') { dt='Poster'; tb=`<span class="badge badge-poster">${t('ui.poster')}</span>`; }
    else if (pub.type === 'Journal') { dt=isIntl?'Journal-International':'Journal-Domestic'; tb=isIntl?`<span class="badge badge-journal">${t('ui.intlJournalBadge')}</span>`:`<span class="badge badge-journal badge-domestic">${t('ui.domJournalBadge')}</span>`; }
    else { dt=isIntl?'Conference-International':'Conference-Domestic'; tb=isIntl?`<span class="badge badge-conf">${t('ui.intlConfBadge')}</span>`:`<span class="badge badge-conf badge-domestic">${t('ui.domConfBadge')}</span>`; }
    const fb = pub.role==='1st Author'?`<span class="badge badge-1st">${t('ui.firstAuthor')}</span>`:'';
    const venue = [pub.venue,pub.year,pub.remarks].filter(Boolean).join(' · ');
    const href = safeUrl(pub.link), link = href?`<a href="${href}" target="_blank" rel="noopener noreferrer" class="pub-link detail-hint">${t('ui.viewPaper')}</a>`:'';
    return `<div class="pub-item reveal" data-paged data-type="${dt}">
      ${link}
      <span class="pub-num">[${pub.index}]</span>
      <div class="pub-body">
        <div class="pub-main">
          <div class="pub-authors">${esc(pub.authors)}</div>
          <div class="pub-title">"${esc(pub.title)}"</div>
          <div class="pub-venue">${esc(venue)}</div>
        </div>
        <div class="pub-side"><div class="pub-badges">${fb}${tb}</div></div>
      </div>
    </div>`;
  }).join('');

  _pubPager = createCarousel(el, 'pubPager', 2, 3);

  const pubFilterBar = document.querySelector('.pub-filter-bar');
  if (pubFilterBar) pubFilterBar.onclick = e => {
    const btn = e.target.closest('.filter-btn'); if (!btn) return;
    document.querySelectorAll('.pub-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    el.querySelectorAll('[data-paged]').forEach(item => { item.dataset.filtered = (f!=='all' && item.dataset.type!==f) ? '1' : ''; });
    _pubPager.reset();
  };
}

/* ─── Awards (paged) ─── */
function renderAwards(items) {
  const el = document.getElementById('awardsList'); if (!el || !items) return;
  el.innerHTML = items.map(a => {
    const isRange = a.date && a.date.includes(' - ');
    const dateCls = !a.date ? 'award-date award-date-unknown' : isRange ? 'award-date-range' : 'award-date';
    const dateText = a.date ? esc(a.date) : '—';
    return `
    <div class="award-card reveal" data-paged>
      <div class="${dateCls}">${dateText}</div>
      <div class="award-title">${esc(a.title)}</div>
      ${a.description?`<div class="award-desc">${esc(a.description)}</div>`:''}
      <div class="award-org">${esc(a.organization)}</div>
      ${a.remarks?`<span class="award-remarks">${esc(a.remarks)}</span>`:''}
    </div>`;
  }).join('');
  _awardPager = createCarousel(el, 'awardsPager', 3, 2);
}

/* ─── Carousel: cards split into pages of cols × rows; swipe or arrows, page number above and below ─── */
function createCarousel(gridEl, navId, cols, rows) {
  gridEl.classList.add('carousel');
  const top = document.getElementById(navId);
  if (!top) return { reset(){} };
  let bottom = gridEl.nextElementSibling?.classList.contains('paged-nav-bottom') ? gridEl.nextElementSibling : null;
  if (!bottom) { bottom = document.createElement('div'); gridEl.after(bottom); }
  top.className = 'paged-nav-inline';
  bottom.className = 'paged-nav-inline paged-nav-bottom';
  const navs = [top, bottom];
  navs.forEach(n => n.innerHTML = `<button class="paged-btn paged-prev" aria-label="${t('ui.prev')}">←</button><span class="paged-info"></span><button class="paged-btn paged-next" aria-label="${t('ui.next')}">→</button>`);
  const cards = [...gridEl.querySelectorAll('[data-paged]')];
  const hidden = document.createElement('div');
  hidden.className = 'carousel-hidden';
  const colsNow = () => innerWidth < 768 ? 1 : innerWidth < 1024 ? Math.min(cols, 2) : cols;
  let shownCols = 0;
  const pages = () => gridEl.querySelectorAll('.carousel-page');
  const current = () => Math.round(gridEl.scrollLeft / (gridEl.clientWidth || 1));
  const go = i => gridEl.scrollTo({ left: i * gridEl.clientWidth, behavior: 'smooth' });

  function update() {
    const n = pages().length, i = Math.min(current(), Math.max(n - 1, 0));
    navs.forEach(nav => {
      nav.querySelector('.paged-info').textContent = n ? `${i + 1} / ${n}` : '0 / 0';
      nav.querySelector('.paged-prev').disabled = i <= 0;
      nav.querySelector('.paged-next').disabled = i >= n - 1;
    });
  }
  function layout() {
    shownCols = colsNow();
    const per = shownCols * rows;
    const vis = cards.filter(c => !c.dataset.filtered);
    hidden.replaceChildren(...cards.filter(c => c.dataset.filtered));
    const pageEls = [];
    for (let i = 0; i < vis.length; i += per) {
      const pg = document.createElement('div');
      pg.className = 'carousel-page';
      pg.style.gridTemplateColumns = `repeat(${shownCols}, minmax(0, 1fr))`;
      pg.append(...vis.slice(i, i + per));
      pageEls.push(pg);
    }
    gridEl.replaceChildren(...pageEls, hidden);
    gridEl.scrollLeft = 0;
    update();
    reReveal(gridEl);
  }
  navs.forEach(nav => {
    nav.querySelector('.paged-prev').onclick = () => go(current() - 1);
    nav.querySelector('.paged-next').onclick = () => go(current() + 1);
  });
  gridEl.onscroll = update;
  removeEventListener('resize', gridEl._onResize);
  gridEl._onResize = () => { if (colsNow() !== shownCols) layout(); };
  addEventListener('resize', gridEl._onResize);
  layout();
  return { reset: layout };
}

function reReveal(container) {
  container.querySelectorAll('.reveal:not(.visible):not([data-observed])').forEach(el => {
    el.dataset.observed = '1';
    const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.05 });
    io.observe(el);
  });
}

/* ─── Skills ─── */
function renderSkills(skills) {
  const el = document.getElementById('skillsGrid'); if (!el || !skills) return;
  const card = s => `<div class="skill-card reveal"><div class="skill-category">${esc(s.label)}</div><div class="skill-tags">${s.items.map(x=>`<span class="skill-tag">${esc(x)}</span>`).join('')}</div></div>`;
  const cols = [...new Set(skills.map(s => +s.column))].sort((a, b) => a - b);
  el.innerHTML = cols.map(c => `<div class="skill-col">${skills.filter(s => +s.column === c).map(card).join('')}</div>`).join('');
}

/* ─── Patents ─── */
function renderPatents(items) {
  const el = document.getElementById('patentsList'); if (!el || !items) return;
  el.innerHTML = items.map(p => `<div class="patent-card reveal"><div class="patent-title">${esc(p.title)}</div><div class="patent-desc">${esc(p.description)}</div><div class="patent-meta">${p.status === 'granted' ? `<span><strong>${t('ui.patStatus')}</strong> ${t('ui.granted')}</span>` : ''}<span><strong>${t('ui.patNo')}</strong> ${esc(p.applicationNumber)}</span><span><strong>${t('ui.patFiled')}</strong> ${esc(p.applicationDate)}</span><span><strong>${t('ui.patApplicant')}</strong> ${esc(p.applicant)}</span>${p.inventors ? `<span><strong>${t('ui.patInventors')}</strong> ${esc(String(p.inventors))}</span>` : ''}<span><strong>${t('ui.patAuthority')}</strong> ${esc(p.authority)}</span></div></div>`).join('');
}

/* ─── Activities ─── */
function activityIcons(role, org) {
  const r = (role || '').toLowerCase();
  const o = (org || '').toLowerCase();
  const icons = [];
  // Primary by role
  if (/teaching assistant|\bta\b|조교|mentor|멘토/.test(r)) icons.push('🎓');
  else if (/president|회장|부회장|representative|대표|working group|운영위원|member/.test(r)) icons.push('👥');
  else icons.push('⭐');
  // Secondary by context (role/org keywords)
  if (/researcher representative|연구실 대표/.test(r)) icons.push('🔬');
  if (/teaching assistant|\bta\b|조교/.test(r)) icons.push('🏫');
  if (/student council|학생회/.test(o)) icons.push('🏫');
  if (/basketball|농구/.test(o)) icons.push('🏀');
  return icons;
}
function formatOrg(s) {
  if (!s) return '';
  const m = s.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (m) return `<span class="org-main">${esc(m[1])}</span><span class="org-inst">${esc(m[2])}</span>`;
  return `<span class="org-main">${esc(s)}</span>`;
}
function renderActivities(items) {
  const el = document.getElementById('activitiesGrid'); if (!el || !items) return;
  el.innerHTML = items.map(a => {
    const icons = activityIcons(a.role, a.organization).map(i => `<span class="activity-icon">${i}</span>`).join('');
    return `<div class="activity-card reveal" data-paged><div class="activity-head">${icons}<span class="activity-role">${esc(a.role)}</span></div><span class="activity-org">${formatOrg(a.organization)}</span><div class="activity-meta"><span class="activity-period">${esc(a.period)}</span><span class="activity-location">${esc(a.location)}</span></div></div>`;
  }).join('');
  _activityPager = createCarousel(el, 'activitiesPager', 3, 2);
}

/* ─── Contact ─── */
function renderContact(basic) {
  const el = document.getElementById('contactCards'); if (!el || !basic) return;
  const cs = [];
  if (basic.email) basic.email.forEach(em => cs.push({i:'✉️',l:t('ui.email'),v:em,h:`mailto:${em}`}));
  cs.push({i:'💼',l:'LinkedIn',v:'linkedin.com/in/jehun-lee',h:SOCIAL.linkedin});
  cs.push({i:'📚',l:'Google Scholar',v:'scholar.google.com',h:SOCIAL.scholar});
  if (basic.googleSite) cs.push({i:'🌐',l:'Google Site',v:'sites.google.com/view/jehun-lee',h:basic.googleSite});
  if (basic.location) cs.push({i:'📍',l:t('ui.location'),v:basic.location,h:null});
  el.innerHTML = cs.map(c => {
    const inn = `<div class="contact-icon">${c.i}</div><div class="contact-info"><span class="contact-label">${esc(c.l)}</span><span class="contact-value">${esc(c.v)}</span></div>`;
    return safeUrl(c.h) ? `<a href="${safeUrl(c.h)}" target="${c.h.startsWith('mailto')?'_self':'_blank'}" rel="noopener noreferrer" class="contact-card">${inn}</a>` : `<div class="contact-card">${inn}</div>`;
  }).join('');
}

/* ─── Footer ─── */
function renderFooter(data) {
  const y = document.getElementById('footerYear'); if (y) y.textContent = new Date().getFullYear();
  const u = document.getElementById('lastUpdated'); if (u && data.lastUpdated) u.textContent = data.lastUpdated;
  const ul = document.getElementById('updatedLabel'); if (ul) ul.textContent = t('ui.updated');
}

/* ─── Photo Fallback ─── */
function setupPhotoFallback() {
  const img = document.getElementById('profileImg'), fb = document.getElementById('photoFallback');
  if (!img || !fb) return;
  img.addEventListener('error', () => { img.style.display='none'; fb.style.display='flex'; });
  img.addEventListener('load', () => { fb.style.display='none'; });
  if (img.complete && !img.naturalWidth) { img.style.display='none'; fb.style.display='flex'; }
}

/* ─── Project Modal ─── */
function setupProjectModal() {
  const grid = document.getElementById('projectsGrid'), modal = document.getElementById('projectModal');
  if (!grid || !modal) return;
  /* Use onclick to prevent listener accumulation on re-renders */
  grid.onclick = e => {
    const card = e.target.closest('.project-card'); if (!card) return;
    const p = _allProjects.find(x => x.index === parseInt(card.dataset.projIndex));
    if (p) openProjectModal(p);
  };
}
function openProjectModal(p) {
  const tags = getProjectTags(p);
  const d = p.details || {};

  /* Basic fields */
  const fields = [
    [t('ui.period'), `${locPeriod(p.period)}${p.duration ? ' · ' + durLabel(p.duration) : ''}`],
    d.role && [t('ui.role'), d.role],
    p.teamSize && [t('ui.teamSize'), teamLabel(p.teamSize)],
    p.client && [t('ui.client'), p.client],
    p.partners && p.partners.length && [t('ui.partners'), p.partners.join(', ')],
    p.partnerInstitution && [t('ui.partner'), p.partnerInstitution],
    p.affiliatedInstitution && [t('ui.affiliated'), p.affiliatedInstitution],
  ].filter(Boolean);

  openModal(`
    <div class="modal-badge">${p.isPM ? '👑 PM · ' : ''}${LANG === 'ko' ? `프로젝트 #${p.index}` : `Project #${p.index}`}${isGov(p.client) ? ` · ${t('ui.govt')}` : ''}</div>
    <div class="modal-title" id="modalTitle">${esc(p.title)}</div>
    ${(tags.methods.length||tags.domains.length) ? `<div style="display:flex;gap:.3rem;margin-bottom:.8rem;flex-wrap:wrap">${tags.methods.map(m => `<span class="tag method">${esc(m)}</span>`).join('')}${tags.domains.map(dm => `<span class="tag domain">${esc(dm)}</span>`).join('')}</div>` : ''}
    ${fields.map(([l, v]) => `<div class="modal-field"><span class="modal-field-label">${esc(l)}</span><span class="modal-field-value">${esc(v)}</span></div>`).join('')}
    ${d.situation ? `<div class="modal-section"><div class="modal-section-label">${t('ui.situation')}</div><p class="modal-section-text">${esc(d.situation)}</p></div>` : ''}
    ${d.purpose ? `<div class="modal-section"><div class="modal-section-label">${t('ui.purpose')}</div><p class="modal-section-text">${esc(d.purpose)}</p></div>` : ''}
    ${d.tasks && d.tasks.length ? `<div class="modal-section"><div class="modal-section-label">${t('ui.keyTasks')}</div><ul class="modal-task-list">${d.tasks.map(tk => `<li>${esc(tk)}</li>`).join('')}</ul></div>` : ''}
    ${d.achievements ? `<div class="modal-section"><div class="modal-section-label">${t('ui.achievements')}</div><p class="modal-section-text modal-achievement">${esc(d.achievements)}</p></div>` : ''}
    ${d.notes ? `<div class="modal-section"><div class="modal-section-label">${t('ui.notes')}</div><p class="modal-section-text">${esc(d.notes)}</p></div>` : ''}
    ${!d.purpose && p.remarks ? `<div class="modal-field"><span class="modal-field-label">${t('ui.remarks')}</span><span class="modal-field-value">${esc(p.remarks)}</span></div>` : ''}`);
}

/* ─── Details popup (shared by philosophy, education, experience, projects) ─── */
let _modalReturnFocus = null;
function openModal(html) {
  const body = document.getElementById('modalBody'), modal = document.getElementById('projectModal');
  if (!body || !modal) return;
  if (!modal.dataset.ready) {
    modal.dataset.ready = '1';
    document.getElementById('modalClose')?.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      /* The close button is the popup's only focusable element, so Tab stays on it */
      if (e.key === 'Tab') { e.preventDefault(); document.getElementById('modalClose')?.focus(); }
    });
  }
  body.innerHTML = html;
  _modalReturnFocus = document.activeElement;
  modal.classList.add('open'); document.body.style.overflow = 'hidden';
  document.getElementById('modalClose')?.focus();
}
function closeModal() {
  const modal = document.getElementById('projectModal');
  if (!modal?.classList.contains('open')) return;
  modal.classList.remove('open'); document.body.style.overflow = '';
  _modalReturnFocus?.focus?.();
}
function detailHint(name) { return `<button type="button" class="detail-hint" aria-label="${t('ui.detailsHint')}: ${esc(name)}">${t('ui.detailsHint')}</button>`; }
/* Card click (or its Details button) opens bodies[data-detail]; links inside the card keep working */
function bindDetails(el, bodies) {
  el.onclick = e => {
    if (e.target.closest('a') || String(getSelection())) return;
    const item = e.target.closest('[data-detail]');
    if (item) openModal(bodies[item.dataset.detail]);
  };
}

/* ─── Navigation ─── */
function setupNav() {
  const nb = document.getElementById('navbar'), tg = document.getElementById('navToggle'), lk = document.getElementById('navLinks');
  window.addEventListener('scroll', () => { nb.classList.toggle('scrolled', window.scrollY > 40); highlightNav(); }, { passive: true });
  tg?.addEventListener('click', () => lk?.classList.toggle('open'));
  lk?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => lk.classList.remove('open')));
}
function highlightNav() {
  const y = window.scrollY + 80;
  document.querySelectorAll('main section[id]').forEach(s => {
    if (s.offsetTop <= y && s.offsetTop + s.offsetHeight > y)
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${s.id}`));
  });
}

/* ─── Scroll Reveal ─── */
function setupScrollReveal() {
  const io = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.1 });
  const obs = () => document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
  obs(); setTimeout(obs, 400);
}

/* ─── Helpers ─── */
function setText(id, val) { const e = document.getElementById(id); if (e) e.textContent = val || ''; }
// Escaped URL for href attributes; anything but http(s) or mailto becomes empty.
function safeUrl(u) { return /^(https?:|mailto:)/i.test(u || '') ? esc(u) : ''; }
function esc(s) { if (!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

document.addEventListener('DOMContentLoaded', init);
