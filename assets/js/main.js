/**
 * Jehun Lee Portfolio — main.js
 * Fetches data/portfolio.json and renders all sections dynamically.
 */

const DATA_URL = 'data/portfolio.json';

/* ─── Fetch & Bootstrap ─── */
async function init() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    render(data);
    setupNav();
    setupScrollReveal();
    setupFilterButtons();
  } catch (err) {
    console.error('Portfolio data load failed:', err);
  }
}

function render(data) {
  renderHero(data);
  renderPhilosophy(data.philosophy);
  renderStats(data.stats);
  renderExperience(data.workExperience);
  renderProjects(data.projects);
  renderPublications(data.publications);
  renderEducation(data.education);
  renderSkills(data.skills);
  renderAwards(data.honors);
  renderPatents(data.patents);
  renderActivities(data.activities);
  renderContact(data.basic);
  renderFooter(data);
}

/* ─── Hero ─── */
function renderHero(data) {
  const { basic, stats } = data;

  // Animated title typewriter
  const titleEl = document.getElementById('hero-title-text');
  if (titleEl && basic.titles) {
    titleEl.textContent = basic.titles.join(' · ');
  }

  // Stats card
  const statsEl = document.getElementById('hero-stats');
  if (statsEl && stats) {
    statsEl.innerHTML = stats.map(s => `
      <div class="stat-box">
        <span class="stat-value">${esc(s.value)}</span>
        <span class="stat-label">${esc(s.label)}</span>
      </div>
    `).join('');
  }
}

/* ─── Philosophy ─── */
function renderPhilosophy(p) {
  if (!p) return;
  set('philosophy-headline', p.headline);
  set('philosophy-lead', p.lead);

  const bodyEl = document.getElementById('philosophy-body');
  if (bodyEl) {
    bodyEl.innerHTML = p.body.split('\n\n').map(para => `<p>${esc(para)}</p>`).join('');
  }

  const pillarsEl = document.getElementById('philosophy-pillars');
  if (pillarsEl && p.pillars) {
    pillarsEl.innerHTML = p.pillars.map(pl => `
      <div class="pillar reveal">
        <div class="pillar-icon">${pl.icon}</div>
        <h3>${esc(pl.title)}</h3>
        <p>${esc(pl.desc)}</p>
      </div>
    `).join('');
  }
}

/* ─── Stats ─── */
function renderStats(stats) {
  const el = document.getElementById('stats-row');
  if (!el || !stats) return;
  el.innerHTML = stats.map(s => `
    <div class="stat-item reveal">
      <span class="stat-num">${esc(s.value)}</span>
      <span class="stat-desc">${esc(s.label)}</span>
    </div>
  `).join('');
}

/* ─── Work Experience ─── */
function renderExperience(items) {
  const el = document.getElementById('experience-timeline');
  if (!el || !items) return;
  el.innerHTML = items.map(item => `
    <div class="timeline-item reveal">
      <div class="tl-header">
        <span class="tl-title">${esc(item.position)}</span>
        <span class="tl-period">${esc(item.period)}</span>
      </div>
      <div class="tl-org">${esc(item.organization)}</div>
      ${item.division ? `<div class="tl-div">${esc(item.division)}</div>` : ''}
      <div class="tl-roles">${esc(item.roles)}</div>
      <div class="tl-region">📍 ${esc(item.region)}</div>
    </div>
  `).join('');
}

/* ─── Projects ─── */
function renderProjects(items) {
  const el = document.getElementById('projects-grid');
  if (!el || !items) return;
  // Sort by index descending (most recent first)
  const sorted = [...items].sort((a, b) => b.index - a.index);
  el.innerHTML = sorted.map(p => `
    <div class="project-card reveal">
      <div class="project-meta">
        <span class="project-index">PROJECT #${p.index}</span>
        <span class="project-period">${esc(p.period)}${p.duration ? ` · ${esc(p.duration)}` : ''}</span>
      </div>
      <div class="project-title">${esc(p.title)}</div>
      ${p.remarks ? `<div class="project-remarks">${esc(p.remarks)}</div>` : ''}
      <div class="project-footer">
        ${p.client ? `<span class="tag">${esc(p.client)}</span>` : ''}
        ${p.affiliatedInstitution ? `<span class="tag org">${esc(p.affiliatedInstitution)}</span>` : ''}
        ${p.partnerInstitution && p.partnerInstitution !== p.affiliatedInstitution ? `<span class="tag org">${esc(p.partnerInstitution)}</span>` : ''}
      </div>
    </div>
  `).join('');
}

/* ─── Publications ─── */
function renderPublications(items) {
  const el = document.getElementById('pub-list');
  if (!el || !items) return;
  const sorted = [...items].sort((a, b) => b.index - a.index);
  el.innerHTML = sorted.map(pub => {
    const typeBadge = pub.type === 'Journal'
      ? `<span class="badge badge-journal">${esc(pub.type)}</span>`
      : pub.type === 'Poster'
        ? `<span class="badge badge-poster">${esc(pub.type)}</span>`
        : `<span class="badge badge-conf">${esc(pub.type)}</span>`;
    const firstBadge = pub.role === '1st Author' ? `<span class="badge badge-1st">1st Author</span>` : '';
    const globalBadge = pub.global ? `<span class="badge badge-global">International</span>` : '';
    const linkHtml = pub.link ? `<a href="${pub.link}" target="_blank" rel="noopener" class="pub-link">View Paper ↗</a>` : '';
    const venue = [pub.venue, pub.year, pub.remarks].filter(Boolean).join(' · ');
    return `
    <div class="pub-item reveal" data-type="${esc(pub.type)}">
      <span class="pub-num">[${pub.index}]</span>
      <div class="pub-body">
        <div class="pub-authors">${esc(pub.authors)}</div>
        <div class="pub-title">"${esc(pub.title)}"</div>
        <div class="pub-venue">${esc(venue)}</div>
        <div class="pub-badges">${typeBadge}${firstBadge}${globalBadge}</div>
        ${linkHtml}
      </div>
    </div>`;
  }).join('');
}

/* ─── Education ─── */
function renderEducation(items) {
  const el = document.getElementById('education-timeline');
  if (!el || !items) return;
  el.innerHTML = items.map(item => `
    <div class="timeline-item reveal">
      <div class="tl-header">
        <span class="tl-title">${esc(item.degree)} — ${esc(item.major)}</span>
        <span class="tl-period">${esc(item.period)}</span>
      </div>
      <div class="tl-org">${esc(item.institution)}</div>
      <div class="tl-region">📍 ${esc(item.region)}</div>
      ${item.remarks ? `<div class="tl-remarks">${
        item.labUrl
          ? `${esc(item.remarks.split('·')[0])} · <a href="${item.labUrl}" target="_blank" rel="noopener" class="tl-link">MSS Lab ↗</a>`
          : esc(item.remarks)
      }</div>` : ''}
    </div>
  `).join('');
}

/* ─── Skills ─── */
function renderSkills(skills) {
  const el = document.getElementById('skills-grid');
  if (!el || !skills) return;
  el.innerHTML = Object.entries(skills).map(([cat, tags]) => `
    <div class="skill-card reveal">
      <div class="skill-category">${esc(cat)}</div>
      <div class="skill-tags">
        ${tags.map(t => `<span class="skill-tag">${esc(t)}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ─── Awards ─── */
function renderAwards(items) {
  const el = document.getElementById('awards-list');
  if (!el || !items) return;
  el.innerHTML = items.map(a => `
    <div class="award-card reveal">
      <div class="award-date">${esc(a.date)}</div>
      <div class="award-title">${esc(a.title)}</div>
      ${a.description ? `<div class="award-desc">${esc(a.description)}</div>` : ''}
      <div class="award-org">${esc(a.organization)} · ${esc(a.location)}</div>
      ${a.remarks ? `<span class="award-remarks">${esc(a.remarks)}</span>` : ''}
    </div>
  `).join('');
}

/* ─── Patents ─── */
function renderPatents(items) {
  const el = document.getElementById('patents-list');
  if (!el || !items) return;
  el.innerHTML = items.map(p => `
    <div class="patent-card reveal">
      <div class="patent-title">${esc(p.title)}</div>
      <div class="patent-desc">${esc(p.description)}</div>
      <div class="patent-meta">
        <span><strong>No.</strong> ${esc(p.applicationNumber)}</span>
        <span><strong>Filed</strong> ${esc(p.applicationDate)}</span>
        <span><strong>Applicant</strong> ${esc(p.applicant)}</span>
        <span><strong>Authority</strong> ${esc(p.authority)}</span>
      </div>
    </div>
  `).join('');
}

/* ─── Activities ─── */
function renderActivities(items) {
  const el = document.getElementById('activities-grid');
  if (!el || !items) return;
  el.innerHTML = items.map(a => `
    <div class="activity-card reveal">
      <span class="activity-role">${esc(a.role)}</span>
      <span class="activity-org">${esc(a.organization)}</span>
      <span class="activity-period">${esc(a.period)}</span>
      <span class="activity-location">📍 ${esc(a.location)}</span>
    </div>
  `).join('');
}

/* ─── Contact ─── */
function renderContact(basic) {
  const el = document.getElementById('contact-cards');
  if (!el || !basic) return;
  const contacts = [];

  if (basic.email) {
    basic.email.forEach(em => {
      contacts.push({
        icon: '✉️',
        label: 'Email',
        value: em,
        href: `mailto:${em}`
      });
    });
  }
  if (basic.website) {
    contacts.push({
      icon: '🌐',
      label: 'Website',
      value: basic.website,
      href: `https://${basic.website}`
    });
  }
  if (basic.googleSite) {
    contacts.push({
      icon: '📄',
      label: 'Google Site',
      value: 'sites.google.com/view/jehun-lee',
      href: basic.googleSite
    });
  }
  if (basic.location) {
    contacts.push({
      icon: '📍',
      label: 'Location',
      value: basic.location,
      href: null
    });
  }

  el.innerHTML = contacts.map(c => {
    const inner = `
      <div class="contact-icon">${c.icon}</div>
      <div class="contact-info">
        <span class="contact-label">${esc(c.label)}</span>
        <span class="contact-value">${esc(c.value)}</span>
      </div>
    `;
    return c.href
      ? `<a href="${c.href}" target="${c.href.startsWith('mailto') ? '_self' : '_blank'}" rel="noopener" class="contact-card">${inner}</a>`
      : `<div class="contact-card">${inner}</div>`;
  }).join('');
}

/* ─── Footer ─── */
function renderFooter(data) {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const updEl = document.getElementById('last-updated');
  if (updEl && data.lastUpdated) updEl.textContent = data.lastUpdated;
}

/* ─── Navigation ─── */
function setupNav() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  // Scroll behaviour
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    highlightNavLink();
  }, { passive: true });

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    links?.classList.toggle('open');
  });

  // Close on link click (mobile)
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

function highlightNavLink() {
  const sections = document.querySelectorAll('section[id], main > section');
  const navLinks = document.querySelectorAll('.nav-links a');
  const scrollY = window.scrollY + 80;

  sections.forEach(sec => {
    if (sec.offsetTop <= scrollY && sec.offsetTop + sec.offsetHeight > scrollY) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${sec.id}`);
      });
    }
  });
}

/* ─── Scroll Reveal ─── */
function setupScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Re-run after dynamic render with small delay
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
  }, 300);
}

/* ─── Publication Filter ─── */
function setupFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.pub-item').forEach(item => {
        const match = filter === 'all' || item.dataset.type === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });
}

/* ─── Helpers ─── */
function set(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || '';
}

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ─── Start ─── */
document.addEventListener('DOMContentLoaded', init);
