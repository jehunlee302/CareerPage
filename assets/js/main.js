/**
 * Jehun Lee Portfolio — main.js v4.0 (i18n)
 */
let LANG = localStorage.getItem('lang') || 'en';
const DATA_URLS = { en: 'data/portfolio.json', ko: 'data/portfolio.ko.json' };
const RESEARCH_INTERESTS = {
  en: [
    { icon: '🤖', title: 'Autonomous Scheduling', desc: 'AI-driven dynamic scheduling for real-time manufacturing environments' },
    { icon: '🧠', title: 'Reinforcement & Imitation Learning', desc: 'Graph-based RL/IL algorithms for real-time industrial decision-making' },
    { icon: '🏭', title: 'Digital Twin & Simulation', desc: 'Production-logistics simulation platforms for semiconductor fabs' },
    { icon: '💾', title: 'Semiconductor Fab Optimization', desc: 'Real-time scheduling and operation planning for advanced semiconductor manufacturing' },
    { icon: '📐', title: 'Meta-Scheduling Architecture', desc: 'Generalizable agent architectures adaptable to diverse manufacturing environments' },
    { icon: '🔗', title: 'AI-Native Manufacturing', desc: 'End-to-end AI integration in smart factory systems and SaaS platforms' },
  ],
  ko: [
    { icon: '🤖', title: '자율 스케줄링', desc: '실시간 제조 환경을 위한 AI 기반 동적 스케줄링' },
    { icon: '🧠', title: '강화학습 & 모방학습', desc: '실시간 산업 의사결정을 위한 그래프 기반 RL/IL 알고리즘' },
    { icon: '🏭', title: '디지털 트윈 & 시뮬레이션', desc: '반도체 팹 생산-물류 시뮬레이션 플랫폼' },
    { icon: '💾', title: '반도체 팹 최적화', desc: '첨단 반도체 제조의 실시간 스케줄링 및 운영 계획' },
    { icon: '📐', title: '메타 스케줄링 아키텍처', desc: '다양한 제조 환경에 적응 가능한 범용 에이전트 아키텍처' },
    { icon: '🔗', title: 'AI 네이티브 제조', desc: '스마트 팩토리 시스템 및 SaaS 플랫폼의 End-to-End AI 통합' },
  ],
};
const FEATURED_PROJECT_INDICES = [25, 23, 21];
const SOCIAL = { linkedin: 'https://www.linkedin.com/in/jehun-lee/', scholar: 'https://scholar.google.com/citations?user=C7ekyjEAAAAJ' };
const HERO_TAGS = {
  en: ['Autonomous Scheduling','Digital Twin','Reinforcement Learning','Semiconductor Fab','AI-Native Manufacturing','KAIST Ph.D.'],
  ko: ['자율 스케줄링','디지털 트윈','강화학습','반도체 팹','AI 네이티브 제조','KAIST 박사'],
};
const THESIS_FALLBACK = { 'Ph.D.': 'Learning Schedulers for Job Shop Scheduling Problems', 'M.S.': '' };

/* ─── i18n UI Strings ─── */
const I18N = {
  en: {
    nav: { philosophy:'Philosophy', education:'Education', experience:'Experience', projects:'Projects', publications:'Publications', awards:'Awards', contact:'Contact' },
    label: { corePhilosophy:'Core Philosophy', expertise:'Expertise', researchFocus:'Research Focus', academicBg:'Academic Background', education:'Education', career:'Career', workExp:'Work Experience', highlights:'Highlights', featuredProj:'Featured Projects', featuredSub:'Industry-defining programs across semiconductor & smart manufacturing', portfolio:'Portfolio', allProjects:'All Projects', researchOutput:'Research Output', academicWorks:'Academic Works', recognition:'Recognition', honorsAwards:'Honors & Awards', ip:'Intellectual Property', patents:'Patents', leadership:'Leadership & Service', activities:'Activities & Leadership', capabilities:'Capabilities', skills:'Skills', connect:'Let\'s Connect', getInTouch:'Get in Touch', contactIntro:'Open to AI research partnerships, industry consulting engagements, and strategic collaborations in intelligent manufacturing.' },
    ui: { contactMe:'Contact Me', all:'All', pmLead:'PM Lead', govt:"Gov't", detailsHint:'Details ↗', viewPaper:'View Paper ↗', thesis:'Thesis:', details:'▸ Details', collapse:'▾ Collapse', period:'Period', role:'Role', client:'Client', partners:'Partners', partner:'Partner', affiliated:'Affiliated', purpose:'Purpose', keyTasks:'Key Tasks', achievements:'Achievements', notes:'Notes', remarks:'Remarks', intlJournal:'Intl. Journal', domJournal:'Dom. Journal', intlConf:'Intl. Conference', domConf:'Dom. Conference', poster:'Poster', allRights:'All rights reserved', updated:'Updated:', topic:'Topic', priorLimitations:'Prior Limitations', methodology:'Methodology', performance:'Performance', patNo:'No.', patFiled:'Filed', patApplicant:'Applicant', patAuthority:'Authority', email:'Email', location:'Location', intlJournalBadge:'Intl. Journal', domJournalBadge:'Dom. Journal', intlConfBadge:'Intl. Conf.', domConfBadge:'Dom. Conf.', firstAuthor:'1st Author' },
    impact: { projects:'Major Projects', pm:'PM Roles', pubs:'Publications', honors:'Honors & Prizes', patent:'Patent' },
  },
  ko: {
    nav: { philosophy:'철학', education:'교육', experience:'경력', projects:'프로젝트', publications:'논문', awards:'수상', contact:'연락처' },
    label: { corePhilosophy:'핵심 철학', expertise:'전문성', researchFocus:'연구 분야', academicBg:'학력', education:'학력', career:'경력', workExp:'경력 사항', highlights:'하이라이트', featuredProj:'주요 프로젝트', featuredSub:'반도체 & 스마트 제조 분야의 대표 프로그램', portfolio:'포트폴리오', allProjects:'전체 프로젝트', researchOutput:'연구 성과', academicWorks:'학술 논문', recognition:'수상 내역', honorsAwards:'수상 및 성과', ip:'지식재산', patents:'특허', leadership:'리더십 & 봉사', activities:'활동 및 리더십', capabilities:'역량', skills:'기술', connect:'연락하기', getInTouch:'연락처', contactIntro:'AI 연구 파트너십, 산업 컨설팅, 지능형 제조 분야의 전략적 협업에 열려 있습니다.' },
    ui: { contactMe:'연락하기', all:'전체', pmLead:'PM 수행', govt:'정부과제', detailsHint:'상세 ↗', viewPaper:'논문 보기 ↗', thesis:'논문:', details:'▸ 상세', collapse:'▾ 접기', period:'기간', role:'역할', client:'고객사', partners:'협력사', partner:'협력기관', affiliated:'소속기관', purpose:'목적', keyTasks:'주요 업무', achievements:'성과', notes:'비고', remarks:'비고', intlJournal:'국제 저널', domJournal:'국내 저널', intlConf:'국제 학회', domConf:'국내 학회', poster:'포스터', allRights:'All rights reserved', updated:'업데이트:', topic:'주제', priorLimitations:'기존 연구 한계', methodology:'방법론', performance:'성능', patNo:'출원번호', patFiled:'출원일', patApplicant:'출원인', patAuthority:'출원국', email:'이메일', location:'위치', intlJournalBadge:'국제 저널', domJournalBadge:'국내 저널', intlConfBadge:'국제 학회', domConfBadge:'국내 학회', firstAuthor:'1저자' },
    impact: { projects:'주요 프로젝트', pm:'PM 수행', pubs:'논문', honors:'수상', patent:'특허' },
  },
};
function t(key) { const parts = key.split('.'); let obj = I18N[LANG]; for (const p of parts) { obj = obj?.[p]; } return obj || key; }
const PROJ_PER_PAGE = 9;
const PUB_PER_PAGE = 8;
const AWARD_PER_PAGE = 6;
const ACTIVITY_PER_PAGE = 6;

let _allProjects = [];
let _projPager, _pubPager, _awardPager, _activityPager;
let _typewriterTimer = null;

/* ─── Topic Classification ─── */
function getTopics(title) {
  const s = (title || '').toLowerCase();
  const tags = [];
  if (/schedul|dispatch|스케줄|디스패칭/.test(s)) tags.push('Scheduling');
  if (/digital twin|simulat|디지털 트윈|시뮬레이션/.test(s)) tags.push('Simulation');
  if (/plann|계획/.test(s)) tags.push('Planning');
  if (/reinforcement|machine learning|ai[\s-]|learning|강화학습|모방학습/.test(s)) tags.push('AI/RL');
  if (/optim|최적화/.test(s)) tags.push('Optimization');
  if (/forecast|demand|예측|수요/.test(s)) tags.push('Forecast');
  if (/manufactur|factory|fab|assembly|logistic|제조|팩토리|팹|조립|물류/.test(s)) tags.push('Manufacturing');
  if (/platform|saas|iot|플랫폼/.test(s)) tags.push('Platform');
  return tags;
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
  } catch (err) { console.error('Portfolio load error:', err); }
}

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
  const el = document.getElementById('heroTags');
  if (el) el.innerHTML = (HERO_TAGS[LANG]||HERO_TAGS.en).map(tag => `<span class="hero-tag">${esc(tag)}</span>`).join('');
  const heroBtn = document.getElementById('heroContactBtn');
  if (heroBtn) heroBtn.textContent = t('ui.contactMe');
  const locEl = document.getElementById('heroLocationText');
  if (locEl && data.basic?.location) locEl.textContent = `${data.basic.location} · VMS Solutions Inc.`;
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
  const pm = (data.projects||[]).filter(p => p.isPM).length;
  const prizes = (data.honors||[]).filter(h => /prize|first|second|third|등상/i.test(h.title||'')).length;
  [{v:`${(data.projects||[]).length}+`,l:t('impact.projects')},{v:`${pm}+`,l:t('impact.pm')},{v:`${(data.publications||[]).length}+`,l:t('impact.pubs')},{v:prizes,l:t('impact.honors')},{v:`${(data.patents||[]).length}`,l:t('impact.patent')}]
    .forEach(it => el.innerHTML += `<div class="impact-item"><span class="impact-num">${esc(String(it.v))}</span><span class="impact-label">${esc(it.l)}</span></div>`);
}

/* ─── Philosophy ─── */
function renderPhilosophy(p) {
  if (!p) return;
  setText('philosophyHeadline', p.headline); setText('philosophyLead', p.lead);
  const b = document.getElementById('philosophyBody');
  if (b) b.innerHTML = p.body.split('\n\n').map(para => `<p>${esc(para)}</p>`).join('');
  const pl = document.getElementById('philosophyPillars');
  if (pl && p.pillars) pl.innerHTML = p.pillars.map(x => `<div class="pillar reveal"><div class="pillar-icon">${x.icon}</div><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p></div>`).join('');
}

/* ─── Research ─── */
function renderResearchFocus() {
  const el = document.getElementById('researchGrid'); if (!el) return;
  const items = RESEARCH_INTERESTS[LANG] || RESEARCH_INTERESTS.en;
  el.innerHTML = items.map(r => `<div class="research-card reveal"><div class="rc-icon">${r.icon}</div><div class="rc-title">${esc(r.title)}</div><div class="rc-desc">${esc(r.desc)}</div></div>`).join('');
}

/* ─── Education ─── */
function renderEducation(items) {
  const el = document.getElementById('educationTimeline'); if (!el || !items) return;
  el.innerHTML = items.map(item => {
    const thesisTitle = item.thesis?.title || THESIS_FALLBACK[item.degree] || '';
    const hasDetails = item.thesis?.topic || item.thesis?.methodology || item.thesis?.performance;
    const advisorHtml = item.advisor ? parseAdvisor(item.advisor) : (item.remarks ? parseAdvisor(item.remarks) : '');
    return `<div class="timeline-item reveal">
      <div class="tl-header"><span class="tl-title">${esc(item.degree)} — ${esc(item.major)}</span><span class="tl-period">${esc(item.period)}</span></div>
      <div class="tl-org">${esc(item.institution)}</div>
      ${advisorHtml ? `<div class="tl-remarks">${advisorHtml}</div>` : ''}
      ${thesisTitle ? `<div class="edu-thesis${hasDetails ? ' edu-thesis-expandable' : ''}"${hasDetails ? ' tabindex="0" role="button"' : ''}>
        <span class="edu-thesis-label">${t('ui.thesis')}</span> ${esc(thesisTitle)}${hasDetails ? ` <span class="edu-expand-hint">${t('ui.details')}</span>` : ''}
      </div>` : ''}
      ${hasDetails ? `<div class="edu-thesis-details" style="display:none">
        ${item.thesis.topic ? `<div class="edu-detail-section"><span class="edu-detail-label">${t('ui.topic')}</span><p>${esc(item.thesis.topic)}</p></div>` : ''}
        ${item.thesis.priorLimitations ? `<div class="edu-detail-section"><span class="edu-detail-label">${t('ui.priorLimitations')}</span><p>${esc(item.thesis.priorLimitations)}</p></div>` : ''}
        ${item.thesis.methodology ? `<div class="edu-detail-section"><span class="edu-detail-label">${t('ui.methodology')}</span><div class="edu-methodology">${formatMethodology(item.thesis.methodology)}</div></div>` : ''}
        ${item.thesis.performance ? `<div class="edu-detail-section"><span class="edu-detail-label">${t('ui.performance')}</span><p>${esc(item.thesis.performance)}</p></div>` : ''}
      </div>` : ''}
    </div>`;
  }).join('');

  /* Thesis expand/collapse */
  el.querySelectorAll('.edu-thesis-expandable').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      const hint = btn.querySelector('.edu-expand-hint');
      if (!details) return;
      const open = details.style.display !== 'none';
      details.style.display = open ? 'none' : 'block';
      if (hint) hint.textContent = open ? t('ui.details') : t('ui.collapse');
    });
  });
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
  const m = r.match(/^(Advisor:\s*[^,]+),\s*(https?:\/\/\S+)$/i);
  return m ? `${esc(m[1].trim())} — <a href="${m[2].trim()}" target="_blank" rel="noopener" class="tl-link">Homepage ↗</a>` : esc(r);
}

/* ─── Experience ─── */
function renderExperience(items) {
  const el = document.getElementById('experienceTimeline'); if (!el || !items) return;
  el.innerHTML = items.map(item => {
    const hasResp = item.responsibilities && item.responsibilities.length > 0;
    const hasHighlights = item.highlights && item.highlights.length > 0;
    return `
    <div class="timeline-item reveal">
      <div class="tl-header">
        <div class="tl-header-left">
          <span class="tl-title">${esc(item.position)}</span>
          <span class="tl-org">${esc(item.organization)}${item.division ? ` <span class="tl-sep">|</span> ${esc(item.division)}` : ''}</span>
        </div>
        <div class="tl-header-right">
          <span class="tl-period">${esc(item.period)}</span>
          <span class="tl-region-sm">📍 ${esc(item.region)}</span>
        </div>
      </div>
      <div class="tl-roles">${esc(item.roles)}</div>
      ${hasResp ? `<ul class="tl-responsibilities">${item.responsibilities.map(r => `<li>${esc(r)}</li>`).join('')}</ul>` : ''}
      ${hasHighlights ? `<div class="tl-highlights">${item.highlights.map(h => `<div class="tl-highlight-item">${esc(h)}</div>`).join('')}</div>` : ''}
    </div>`;
  }).join('');
}

/* ─── Featured Projects ─── */
function renderFeaturedProjects(projects) {
  const el = document.getElementById('featuredGrid'); if (!el || !projects) return;
  const featured = FEATURED_PROJECT_INDICES.map(i => projects.find(p => p.index === i)).filter(Boolean);
  el.innerHTML = featured.map(p => `
    <div class="featured-card reveal" data-proj-index="${p.index}">
      <div class="fc-badge">${p.isPM ? '👑 PM · ' : ''}#${p.index}</div>
      <div class="fc-client">${esc(p.client)}${p.affiliatedInstitution ? ` · ${esc(p.affiliatedInstitution)}` : ''}</div>
      <div class="fc-title">${esc(p.title)}</div>
      ${p.remarks ? `<div class="fc-period">${esc(p.remarks)}</div>` : ''}
      <div class="fc-tags"><span class="fc-tag">${esc(p.period)}</span>${p.duration ? `<span class="fc-tag">${esc(p.duration)}</span>` : ''}</div>
    </div>`).join('');

  const sub = document.getElementById('projectSubtitle');
  if (sub) sub.textContent = LANG === 'ko' ? `${projects.length}개 프로젝트 · PM ${projects.filter(p => p.isPM).length}건+` : `${projects.length} projects · ${projects.filter(p => p.isPM).length}+ PM roles`;

  /* featured click → modal (delegated, safe to rebind) */
  el.onclick = e => {
    const card = e.target.closest('.featured-card');
    if (!card) return;
    const p = _allProjects.find(x => x.index === parseInt(card.dataset.projIndex));
    if (p) openProjectModal(p);
  };
}

/* ─── All Projects (paged + topic filter) ─── */
function renderProjects(items) {
  _allProjects = items || [];
  const el = document.getElementById('projectsGrid'); if (!el || !items) return;
  const sorted = [...items].sort((a, b) => b.index - a.index);

  /* Collect all topics */
  const topicSet = new Set();
  sorted.forEach(p => getTopics(p.title).forEach(tp => topicSet.add(tp)));

  /* Filter bar */
  const fb = document.getElementById('projFilterBar');
  if (fb) fb.innerHTML = [
    `<button class="filter-btn active" data-proj-filter="all">${t('ui.all')}</button>`,
    `<button class="filter-btn" data-proj-filter="pm">${t('ui.pmLead')}</button>`,
    `<button class="filter-btn" data-proj-filter="gov">${t('ui.govt')}</button>`,
    ...[...topicSet].sort().map(tp => `<button class="filter-btn" data-proj-filter="topic:${tp}">${tp}</button>`)
  ].join('');

  /* Cards */
  el.innerHTML = sorted.map(p => {
    const topics = getTopics(p.title);
    const gov = isGov(p.client);
    return `
    <div class="project-card reveal" data-paged data-proj-index="${p.index}" data-proj-pm="${p.isPM?'1':'0'}" data-proj-gov="${gov?'1':'0'}" data-proj-topics="${topics.join(',')}">
      <div class="project-meta">
        <div><span class="project-index">#${p.index}</span>
        <span class="project-period">${esc(p.period)}${p.duration?` · ${esc(p.duration)}`:''}</span></div>
        <span class="project-popup-hint">${t('ui.detailsHint')}</span>
      </div>
      <div class="project-title">${esc(p.title)}</div>
      <div class="project-footer">
        ${p.isPM?'<span class="tag pm">PM</span>':''}
        ${gov?'<span class="tag gov">Gov\'t</span>':''}
        ${topics.map(tp=>`<span class="tag topic">${tp}</span>`).join('')}
        ${p.client?`<span class="tag">${esc(p.client)}</span>`:''}
      </div>
    </div>`;
  }).join('');

  _projPager = createPager(el, PROJ_PER_PAGE, 'projectsPager');
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
      else if (f.startsWith('topic:')) show = (c.dataset.projTopics||'').split(',').includes(f.slice(6));
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
    const link = pub.link?`<a href="${pub.link}" target="_blank" rel="noopener" class="pub-link">${t('ui.viewPaper')}</a>`:'';
    return `<div class="pub-item reveal" data-paged data-type="${dt}">
      <span class="pub-num">[${pub.index}]</span>
      <div class="pub-body">
        <div class="pub-main">
          <div class="pub-authors">${esc(pub.authors)}</div>
          <div class="pub-title">"${esc(pub.title)}"</div>
          <div class="pub-venue">${esc(venue)}</div>
        </div>
        <div class="pub-side">${link}<div class="pub-badges">${tb}${fb}</div></div>
      </div>
    </div>`;
  }).join('');

  _pubPager = createPager(el, PUB_PER_PAGE, 'pubPager');

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
  _awardPager = createPager(el, AWARD_PER_PAGE, 'awardsPager');
}

/* ─── Reusable Pager ─── */
function createPager(gridEl, perPage, navId) {
  let page = 0;
  const nav = document.getElementById(navId);
  if (!nav) return { show(){}, reset(){} };
  nav.className = 'paged-nav-inline';
  nav.innerHTML = `<button class="paged-btn paged-prev" disabled>←</button><span class="paged-info"></span><button class="paged-btn paged-next">→</button>`;
  const prev = nav.querySelector('.paged-prev'), next = nav.querySelector('.paged-next'), info = nav.querySelector('.paged-info');
  prev.addEventListener('click', () => { page--; show(); });
  next.addEventListener('click', () => { page++; show(); });

  function show() {
    const all = [...gridEl.querySelectorAll('[data-paged]')];
    const vis = all.filter(el => !el.dataset.filtered);
    const total = Math.ceil(vis.length / perPage) || 1;
    page = Math.max(0, Math.min(page, total - 1));
    all.forEach(el => el.style.display = 'none');
    vis.slice(page * perPage, (page + 1) * perPage).forEach(el => el.style.display = '');
    info.textContent = `${page+1} / ${total}`;
    prev.disabled = page === 0; next.disabled = page >= total - 1;
    reReveal(gridEl);
  }
  show();
  return { show, reset() { page = 0; show(); } };
}

function reReveal(container) {
  container.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.05 });
    io.observe(el);
  });
}

/* ─── Skills ─── */
function renderSkills(skills) {
  const el = document.getElementById('skillsGrid'); if (!el || !skills) return;
  el.innerHTML = Object.entries(skills).map(([c,items]) => `<div class="skill-card reveal"><div class="skill-category">${esc(c)}</div><div class="skill-tags">${items.map(x=>`<span class="skill-tag">${esc(x)}</span>`).join('')}</div></div>`).join('');
}

/* ─── Patents ─── */
function renderPatents(items) {
  const el = document.getElementById('patentsList'); if (!el || !items) return;
  el.innerHTML = items.map(p => `<div class="patent-card reveal"><div class="patent-title">${esc(p.title)}</div><div class="patent-desc">${esc(p.description)}</div><div class="patent-meta"><span><strong>${t('ui.patNo')}</strong> ${esc(p.applicationNumber)}</span><span><strong>${t('ui.patFiled')}</strong> ${esc(p.applicationDate)}</span><span><strong>${t('ui.patApplicant')}</strong> ${esc(p.applicant)}</span><span><strong>${t('ui.patAuthority')}</strong> ${esc(p.authority)}</span></div></div>`).join('');
}

/* ─── Activities ─── */
function renderActivities(items) {
  const el = document.getElementById('activitiesGrid'); if (!el || !items) return;
  el.innerHTML = items.map(a => `<div class="activity-card reveal" data-paged><span class="activity-role">${esc(a.role)}</span><span class="activity-org">${esc(a.organization)}</span><span class="activity-period">${esc(a.period)}</span><span class="activity-location">📍 ${esc(a.location)}</span></div>`).join('');
  _activityPager = createPager(el, ACTIVITY_PER_PAGE, 'activitiesPager');
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
    return c.h ? `<a href="${c.h}" target="${c.h.startsWith('mailto')?'_self':'_blank'}" rel="noopener" class="contact-card">${inn}</a>` : `<div class="contact-card">${inn}</div>`;
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
  if (!modal.dataset.ready) {
    modal.dataset.ready = '1';
    document.getElementById('modalClose')?.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }
}
function openProjectModal(p) {
  const body = document.getElementById('modalBody'), modal = document.getElementById('projectModal');
  if (!body || !modal) return;
  const topics = getTopics(p.title);
  const d = p.details || {};

  /* Basic fields */
  const fields = [
    [t('ui.period'), `${p.period}${p.duration ? ' · ' + p.duration : ''}`],
    d.role && [t('ui.role'), d.role],
    p.client && [t('ui.client'), p.client],
    p.partners && p.partners.length && [t('ui.partners'), p.partners.join(', ')],
    p.partnerInstitution && [t('ui.partner'), p.partnerInstitution],
    p.affiliatedInstitution && [t('ui.affiliated'), p.affiliatedInstitution],
  ].filter(Boolean);

  body.innerHTML = `
    <div class="modal-badge">${p.isPM ? '👑 PM · ' : ''}${LANG === 'ko' ? `프로젝트 #${p.index}` : `Project #${p.index}`}${isGov(p.client) ? ` · ${t('ui.govt')}` : ''}</div>
    <div class="modal-title">${esc(p.title)}</div>
    ${topics.length ? `<div style="display:flex;gap:.3rem;margin-bottom:.8rem;flex-wrap:wrap">${topics.map(tp => `<span class="tag topic">${tp}</span>`).join('')}</div>` : ''}
    ${fields.map(([l, v]) => `<div class="modal-field"><span class="modal-field-label">${esc(l)}</span><span class="modal-field-value">${esc(v)}</span></div>`).join('')}
    ${d.purpose ? `<div class="modal-section"><div class="modal-section-label">${t('ui.purpose')}</div><p class="modal-section-text">${esc(d.purpose)}</p></div>` : ''}
    ${d.tasks && d.tasks.length ? `<div class="modal-section"><div class="modal-section-label">${t('ui.keyTasks')}</div><ul class="modal-task-list">${d.tasks.map(tk => `<li>${esc(tk)}</li>`).join('')}</ul></div>` : ''}
    ${d.achievements ? `<div class="modal-section"><div class="modal-section-label">${t('ui.achievements')}</div><p class="modal-section-text modal-achievement">${esc(d.achievements)}</p></div>` : ''}
    ${d.notes ? `<div class="modal-section"><div class="modal-section-label">${t('ui.notes')}</div><p class="modal-section-text">${esc(d.notes)}</p></div>` : ''}
    ${!d.purpose && p.remarks ? `<div class="modal-field"><span class="modal-field-label">${t('ui.remarks')}</span><span class="modal-field-value">${esc(p.remarks)}</span></div>` : ''}`;
  modal.classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeModal() { document.getElementById('projectModal')?.classList.remove('open'); document.body.style.overflow=''; }

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
function esc(s) { if (!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

document.addEventListener('DOMContentLoaded', init);
