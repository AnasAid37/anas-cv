/* ── CURSOR ── */
const cursor = document.getElementById('cursor'), ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
(function a() { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(a); })();
document.querySelectorAll('a,button,.skill-card,.edu-card,.contact-card-item,.project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width = '24px'; cursor.style.height = '24px'; ring.style.width = '60px'; ring.style.height = '60px'; ring.style.borderColor = 'rgba(0,229,255,.5)'; });
  el.addEventListener('mouseleave', () => { cursor.style.width = '12px'; cursor.style.height = '12px'; ring.style.width = '40px'; ring.style.height = '40px'; ring.style.borderColor = 'rgba(255,45,107,.4)'; });
});

/* ── 3D TILT EFFECT ── */
function init3DTilt() {
  document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -10;
      const rotateY = (x - centerX) / centerX * 10;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
      card.style.transition = 'transform 0.5s ease';
    });
  });

  // Make overlay pass mouse events to card
  document.querySelectorAll('.proj-hover-cta').forEach(overlay => {
    overlay.style.pointerEvents = 'none';
  });
}

/* ── SCROLL ── */
const prog = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  prog.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ── SCROLL REVEAL ── */
const allReveal = document.querySelectorAll('.reveal,.reveal-clip-left,.reveal-clip-right,.reveal-right,.skill-card.from-left,.skill-card.from-right,.edu-card.from-left,.edu-card.from-right,.project-card,.exp-card');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('active');
      const bar = e.target.querySelector('.skill-bar-fill');
      if (bar) { const p = e.target.dataset.pct; setTimeout(() => { bar.style.width = p + '%'; }, 350); }
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
allReveal.forEach(el => obs.observe(el));

/* ── FLOATING DOTS ── */
const fc = document.getElementById('float-dots-container');
fc.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;';
for (let i = 0; i < 30; i++) {
  const d = document.createElement('div'), s = Math.random() * 3 + 1;
  const c = ['rgba(255,45,107,.3)', 'rgba(0,229,255,.2)', 'rgba(255,224,51,.15)'];
  d.style.cssText = `position:absolute;border-radius:50%;width:${s}px;height:${s}px;background:${c[Math.floor(Math.random() * 3)]};left:${Math.random() * 100}%;bottom:-10px;animation:floatAnim ${15 + Math.random() * 20}s ${Math.random() * 15}s linear infinite;`;
  fc.appendChild(d);
}

/* ── SMOOTH ANCHOR ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); const t = document.querySelector(a.getAttribute('href')); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
});

/* ══════════════════════════════════════════════
   PROJECT DATA
   ══════════════════════════════════════════════ */
const PROJECTS = {
  smarttrip: {
    year: '2025', star: true,
    title: { fr: 'SmartTrip AI — Application de Voyages Intelligente', en: 'SmartTrip AI — Smart Travel Application' },
    sub: { fr: 'Projet Personnel · Full Stack Web · React + Laravel', en: 'Personal Project · Full Stack Web · React + Laravel' },
    badges: ['Laravel 11', 'React.js', 'Vite', 'PostgreSQL', 'JWT', 'i18n', 'RTL', 'Leaflet Maps', 'Claude API', 'Laravel Mail'],
    url: null,
    desc: {
      fr: 'Application web complète de recommandations de voyages intelligentes. Interface moderne multilingue (EN/FR/AR) avec support RTL automatique, cartes interactives Leaflet, chatbot IA Claude et emails automatiques de bienvenue.',
      en: 'Full-featured smart travel recommendation web platform. Modern multilingual interface (EN/FR/AR) with automatic RTL support, interactive Leaflet maps, Claude AI chatbot and automated welcome emails.'
    },
    features: {
      fr: [
        { ic: 'fa-lock', cl: 'fi-r', tx: 'API REST sécurisée avec authentification JWT et routes protégées' },
        { ic: 'fa-database', cl: 'fi-c', tx: 'Base de données PostgreSQL avec relations complexes et seeders' },
        { ic: 'fa-brain', cl: 'fi-p', tx: 'Moteur de recommandations IA basé sur budget et préférences' },
        { ic: 'fa-map-marked-alt', cl: 'fi-g', tx: 'Leaflet Maps intégré pour explorer les destinations' },
        { ic: 'fa-robot', cl: 'fi-p', tx: 'AI Chatbot via Claude API pour suggestions personnalisées' },
        { ic: 'fa-envelope', cl: 'fi-o', tx: 'Laravel Mail — Email de bienvenue automatique HTML' },
        { ic: 'fa-language', cl: 'fi-c', tx: 'Interface trilingue EN/FR/AR avec gestion RTL automatique' },
        { ic: 'fa-chart-bar', cl: 'fi-y', tx: 'Dashboard utilisateur : CRUD voyages, stats, historique' },
      ],
      en: [
        { ic: 'fa-lock', cl: 'fi-r', tx: 'Secure REST API with JWT authentication and protected routes' },
        { ic: 'fa-database', cl: 'fi-c', tx: 'PostgreSQL database with complex relations and seeders' },
        { ic: 'fa-brain', cl: 'fi-p', tx: 'AI recommendation engine based on budget and preferences' },
        { ic: 'fa-map-marked-alt', cl: 'fi-g', tx: 'Integrated Leaflet Maps for destination exploration' },
        { ic: 'fa-robot', cl: 'fi-p', tx: 'AI Chatbot via Claude API for personalized suggestions' },
        { ic: 'fa-envelope', cl: 'fi-o', tx: 'Laravel Mail — Automated HTML welcome email' },
        { ic: 'fa-language', cl: 'fi-c', tx: 'Trilingual interface EN/FR/AR with automatic RTL' },
        { ic: 'fa-chart-bar', cl: 'fi-y', tx: 'User dashboard: travel CRUD, stats, history' },
      ]
    }
  },
  stockpro: {
    year: '2025', star: true,
    title: { fr: 'StockPro — SaaS Gestion de Stock & Crédits', en: 'StockPro — Stock & Credit Management SaaS' },
    sub: { fr: 'Projet Personnel · SaaS pour PME Marocaines', en: 'Personal Project · SaaS for Moroccan SMBs' },
    badges: ['Laravel 11', 'MySQL', 'Sanctum', 'Bootstrap 5', 'Chart.js', 'DomPDF', 'WhatsApp API', '2FA', 'i18n FR/AR/EN'],
    url: null,
    desc: {
      fr: 'SaaS complet de gestion de stock et crédits clients pour les PME marocaines. Système multi-utilisateurs avec abonnements, rapports PDF professionnels, rappels WhatsApp, portail client sécurisé, 2FA et interface trilingue FR/AR/EN avec Dark Mode.',
      en: 'Complete stock and client credit management SaaS for Moroccan SMBs. Multi-user system with subscriptions, professional PDF reports, WhatsApp reminders, secure client portal, 2FA and trilingual FR/AR/EN interface with Dark Mode.'
    },
    features: {
      fr: [
        { ic: 'fa-boxes', cl: 'fi-c', tx: 'Gestion stock temps réel avec alertes, import/export CSV et seuils d\'alerte' },
        { ic: 'fa-hand-holding-usd', cl: 'fi-r', tx: 'Crédits clients : paiements partiels, portail client sécurisé, rappels auto' },
        { ic: 'fa-file-pdf', cl: 'fi-o', tx: 'Rapports PDF multi-pages avec KPIs, graphiques et analyse financière' },
        { ic: 'fab fa-whatsapp', cl: 'fi-g', tx: 'Rappels WhatsApp et envoi RIB automatique aux clients débiteurs' },
        { ic: 'fa-shield-alt', cl: 'fi-p', tx: 'Sécurité : 2FA, Sanctum, rate limiting, security logs, input sanitization' },
        { ic: 'fa-globe', cl: 'fi-c', tx: 'Interface trilingue FR/AR/EN avec RTL automatique et Dark/Light mode' },
        { ic: 'fa-crown', cl: 'fi-y', tx: 'Système d\'abonnement avec plans, limites et panel super-admin' },
        { ic: 'fa-truck', cl: 'fi-o', tx: 'Modules fournisseurs, entrées, catégories, corbeille et compte démo' },
      ],
      en: [
        { ic: 'fa-boxes', cl: 'fi-c', tx: 'Real-time stock management with alerts, CSV import/export and thresholds' },
        { ic: 'fa-hand-holding-usd', cl: 'fi-r', tx: 'Client credits: partial payments, secure client portal, auto reminders' },
        { ic: 'fa-file-pdf', cl: 'fi-o', tx: 'Multi-page PDF reports with KPIs, charts and financial analysis' },
        { ic: 'fab fa-whatsapp', cl: 'fi-g', tx: 'WhatsApp reminders and automatic bank details sent to debtors' },
        { ic: 'fa-shield-alt', cl: 'fi-p', tx: 'Security: 2FA, Sanctum, rate limiting, security logs, input sanitization' },
        { ic: 'fa-globe', cl: 'fi-c', tx: 'Trilingual FR/AR/EN interface with automatic RTL and Dark/Light mode' },
        { ic: 'fa-crown', cl: 'fi-y', tx: 'Subscription system with plans, limits and super-admin panel' },
        { ic: 'fa-truck', cl: 'fi-o', tx: 'Suppliers, entries, categories, trash and interactive demo account' },
      ]
    }
  },
  pneumatique: {
    year: '2025', star: false,
    title: { fr: 'Pneumatique Aqabli — Site & RDV en Ligne', en: 'Pneumatique Aqabli — Website & Online Appointments' },
    sub: { fr: 'Client : Pneumatique Aqabli · Ourika, Marrakech', en: 'Client: Pneumatique Aqabli · Ourika, Marrakech' },
    badges: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript', 'Admin Panel', 'RDV System'],
    url: null,
    desc: {
      fr: 'Site officiel vitrine moderne avec système complet de prise de rendez-vous en ligne. Le client réserve un créneau et choisit son service, l\'administrateur gère tout depuis un panel dédié.',
      en: 'Modern showcase website with complete online appointment booking system. Customers book a slot and choose their service, the admin manages everything from a dedicated panel.'
    },
    features: {
      fr: [
        { ic: 'fa-calendar-check', cl: 'fi-c', tx: 'Système de prise de RDV en ligne : créneaux, services, confirmation' },
        { ic: 'fa-cogs', cl: 'fi-r', tx: 'Espace admin : gestion des rendez-vous, commandes et disponibilités' },
        { ic: 'fa-th', cl: 'fi-y', tx: 'Catalogue produits dynamique géré depuis le panel admin' },
        { ic: 'fa-mobile-alt', cl: 'fi-g', tx: 'Design responsive mobile, tablette et desktop' },
      ],
      en: [
        { ic: 'fa-calendar-check', cl: 'fi-c', tx: 'Online appointment system: slots, services, confirmation' },
        { ic: 'fa-cogs', cl: 'fi-r', tx: 'Admin panel: manage appointments, orders and availability' },
        { ic: 'fa-th', cl: 'fi-y', tx: 'Dynamic product catalog managed from admin panel' },
        { ic: 'fa-mobile-alt', cl: 'fi-g', tx: 'Responsive design for mobile, tablet and desktop' },
      ]
    }
  },
  food: {
    year: '2024', star: false,
    title: { fr: 'Food Project — Livraison en Ligne', en: 'Food Project — Online Delivery' },
    sub: { fr: 'Projet Académique · Groupe · ISTA NTIC SYBA', en: 'Academic Project · Group · ISTA NTIC SYBA' },
    badges: ['React', 'Laravel', 'REST API', 'MySQL', 'Context API'],
    url: null,
    desc: {
      fr: 'Application de livraison de nourriture full stack. React pour l\'interface utilisateur, Laravel pour l\'API REST back-end. Projet de groupe avec collaboration Git.',
      en: 'Full stack food delivery app. React for the user interface, Laravel for the REST API back-end. Group project with Git collaboration.'
    },
    features: {
      fr: [
        { ic: 'fa-utensils', cl: 'fi-o', tx: 'Catalogue restaurants avec menus, photos et filtres' },
        { ic: 'fa-shopping-cart', cl: 'fi-r', tx: 'Panier dynamique avec Context API React' },
        { ic: 'fa-server', cl: 'fi-c', tx: 'API REST Laravel : auth, commandes, produits' },
        { ic: 'fa-users', cl: 'fi-g', tx: 'Projet de groupe avec Git et méthodologie Agile' },
      ],
      en: [
        { ic: 'fa-utensils', cl: 'fi-o', tx: 'Restaurant catalog with menus, photos and filters' },
        { ic: 'fa-shopping-cart', cl: 'fi-r', tx: 'Dynamic cart with React Context API' },
        { ic: 'fa-server', cl: 'fi-c', tx: 'Laravel REST API: auth, orders, products' },
        { ic: 'fa-users', cl: 'fi-g', tx: 'Group project with Git and Agile methodology' },
      ]
    }
  },
  autoentrepreneur: {
    year: '2023',
    title: { fr: 'Auto-entrepreneur — Digital & E-commerce', en: 'Freelancer — Digital & E-commerce' },
    sub: { fr: 'Projets personnels · Maroc', en: 'Personal projects · Morocco' },
    badges: ['WordPress', 'Node.js', 'Python', 'SEO', 'E-commerce', 'Affiliation'],
    url: null,
    desc: {
      fr: 'Plusieurs projets entrepreneuriaux dans le digital : vente d\'abonnements IPTV, plateforme d\'affiliation et exploration de technologies back-end variées.',
      en: 'Several entrepreneurial digital projects: IPTV subscription sales, affiliate platform and exploration of various back-end technologies.'
    },
    features: {
      fr: [
        { ic: 'fa-tv', cl: 'fi-p', tx: 'FleetIPTV — Site WordPress pour vente d\'abonnements IPTV' },
        { ic: 'fa-link', cl: 'fi-y', tx: 'Tsyshoop — Plateforme d\'affiliation avec stratégie SEO' },
        { ic: 'fa-code', cl: 'fi-g', tx: 'Projets Node.js pour automatisations et API' },
        { ic: 'fa-cog', cl: 'fi-c', tx: 'Mini-projet Odoo en Python pour gestion commerciale' },
      ],
      en: [
        { ic: 'fa-tv', cl: 'fi-p', tx: 'FleetIPTV — WordPress site for IPTV subscriptions' },
        { ic: 'fa-link', cl: 'fi-y', tx: 'Tsyshoop — Affiliate platform with SEO strategy' },
        { ic: 'fa-code', cl: 'fi-g', tx: 'Node.js projects for automation and APIs' },
        { ic: 'fa-cog', cl: 'fi-c', tx: 'Odoo mini-project in Python for business management' },
      ]
    }
  }
};

/* ── MODAL ── */
const modal = document.getElementById('project-modal');
const modalBox = modal.querySelector('.modal-box');

function openModal(key) {
  const p = PROJECTS[key]; if (!p) return;
  const lang = currentLang || 'fr';
  document.getElementById('modal-year').textContent = p.year;
  document.getElementById('modal-star').style.display = p.star ? 'inline-flex' : 'none';
  document.getElementById('modal-title').textContent = typeof p.title === 'object' ? p.title[lang] : p.title;
  document.getElementById('modal-sub').textContent = typeof p.sub === 'object' ? p.sub[lang] : p.sub;
  document.getElementById('modal-badges').innerHTML = p.badges.map(b => `<span class="modal-badge">${b}</span>`).join('');

  const desc = typeof p.desc === 'object' ? p.desc[lang] : p.desc;
  const feats = typeof p.features === 'object' && Array.isArray(p.features) ? p.features : (p.features[lang] || p.features.fr);
  const urlBtn = p.url ? `<a href="${p.url}" target="_blank" class="modal-link-btn"><i class="fas fa-external-link-alt"></i> ${lang === 'fr' ? 'Voir le site' : 'Visit site'}</a>` : `<div class="modal-url-placeholder"><i class="fas fa-clock"></i> ${lang === 'fr' ? 'URL disponible après déploiement' : 'URL available after deployment'}</div>`;

  document.getElementById('modal-body').innerHTML =
    urlBtn
    + `<p class="modal-section-title">${lang === 'fr' ? 'Description' : 'Description'}</p>
    <p class="modal-desc">${desc}</p>
    <p class="modal-section-title">${lang === 'fr' ? 'Fonctionnalités clés' : 'Key Features'}</p>
    <div class="modal-features">
      ${feats.map(f => `<div class="modal-feature"><div class="mfi ${f.cl}"><i class="fas ${f.ic}"></i></div><span>${f.tx}</span></div>`).join('')}
    </div>`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalBox.scrollTop = 0;
}

function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.project));
});
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

/* ── THEME TOGGLE ── */
const themeBtn = document.getElementById('themeToggle');
let isDark = true;
themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('light-mode', !isDark);
  themeBtn.textContent = isDark ? '🌙' : '☀️';
});

/* ── LANGUAGE SWITCHER ── */
let currentLang = 'fr';
function setLang(lang) {
  currentLang = lang;
  document.getElementById('btnFR').classList.toggle('active', lang === 'fr');
  document.getElementById('btnEN').classList.toggle('active', lang === 'en');
  document.querySelectorAll('[data-fr][data-en]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val !== null) el.innerHTML = val;
  });
  document.querySelectorAll('.proj-cta-btn').forEach(btn => {
    btn.innerHTML = '<i class="fas fa-eye"></i> ' + (lang === 'fr' ? 'Voir le projet' : 'View project');
  });
  document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';
}

/* ── INIT 3D TILT AFTER DOM READY ── */
document.addEventListener('DOMContentLoaded', init3DTilt);