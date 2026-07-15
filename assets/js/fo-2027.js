/* ════════════════════════════════════════════════════════════
   FO GRDF 2027 — Interactivité Wow
   ════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── 1. Navigation scrollée ───
  const nav = document.querySelector('.top-nav');
  const navProgress = document.querySelector('.nav-progress');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    if (navProgress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      navProgress.style.width = p + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── 2. Reveal-on-scroll (IntersectionObserver) ───
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ─── 3. Compteur animé sur les stats ───
  const counters = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.counter);
        const duration = parseInt(el.dataset.duration || '1400', 10);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const start = performance.now();
        function step(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = (target * eased).toFixed(decimals);
          el.textContent = val;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => co.observe(c));
  }

  // ─── 4. Curseur personnalisé ───
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let rx = 0, ry = 0, dx = 0, dy = 0;
    document.addEventListener('mousemove', (e) => {
      dx = e.clientX; dy = e.clientY;
      dot.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
    });
    function loop() {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ─── 5. Carte de France interactive ───
  const mapZones = document.querySelectorAll('.map-zone, .map-fc');
  const mpEyebrow = document.querySelector('[data-mp="eyebrow"]');
  const mpName = document.querySelector('[data-mp="name"]');
  const mpDesc = document.querySelector('[data-mp="desc"]');
  const mpStats = document.querySelector('[data-mp="stats"]');
  const mpCta = document.querySelector('[data-mp="cta"]');
  const chips = document.querySelectorAll('.region-chip');

  const REGIONS = {
    'nord-ouest': {
      name: 'Nord-Ouest', eyebrow: 'Région GRDF · Hauts-de-France & Normandie',
      desc: 'De Lille au Havre, une équipe ancrée dans le tissu industriel et portuaire du Grand Nord.',
      militants: 9, sites: 7, perm: 3, link: 'regions/region.html?r=nord-ouest'
    },
    'idf': {
      name: 'Île-de-France', eyebrow: 'Région GRDF · Paris & Couronne',
      desc: 'Cœur d\'activité GRDF, l\'IDF concentre les enjeux les plus stratégiques pour les salariés.',
      militants: 15, sites: 11, perm: 4, link: 'regions/region.html?r=idf'
    },
    'est': {
      name: 'Est', eyebrow: 'Région GRDF · Grand Est & Bourgogne-Franche-Comté',
      desc: 'De Nancy à Dijon, une région transfrontalière, des métiers techniques exigeants et des combats sociaux structurants.',
      militants: 11, sites: 9, perm: 3, link: 'regions/region.html?r=est'
    },
    'centre-ouest': {
      name: 'Centre-Ouest', eyebrow: 'Région GRDF · Bretagne, Pays de la Loire & Centre-Val de Loire',
      desc: 'De Brest à Orléans autour de Nantes, une dynamique de proximité et un attachement fort au service public.',
      militants: 12, sites: 9, perm: 3, link: 'regions/region.html?r=centre-ouest'
    },
    'sud-ouest': {
      name: 'Sud-Ouest', eyebrow: 'Région GRDF · Nouvelle-Aquitaine & Occitanie',
      desc: 'Des territoires étendus, de Bordeaux à Toulouse et jusqu\'à la Méditerranée, une équipe mobile et engagée.',
      militants: 10, sites: 8, perm: 3, link: 'regions/region.html?r=sud-ouest'
    },
    'sud-est': {
      name: 'Sud-Est', eyebrow: 'Région GRDF · Auvergne-Rhône-Alpes & PACA',
      desc: 'De Lyon à Nice, une équipe ancrée sur le terrain : montagnes, vallées et grandes métropoles.',
      militants: 12, sites: 8, perm: 3, link: 'regions/region.html?r=sud-est'
    },
    'fc': {
      name: 'Fonctions Centrales', eyebrow: 'Siège · Saint-Denis — rayonnement national',
      desc: 'Basés à Saint-Denis, les militants des Fonctions Centrales rayonnent sur toute la France : SI, RH, achats, finances, communication.',
      militants: 7, sites: 1, perm: 2, link: 'regions/region.html?r=fc'
    }
  };

  function setActiveRegion(key) {
    const r = REGIONS[key];
    if (!r) return;
    if (mpEyebrow) mpEyebrow.textContent = r.eyebrow;
    if (mpName) mpName.textContent = r.name;
    if (mpDesc) mpDesc.textContent = r.desc;
    if (mpStats) {
      mpStats.innerHTML = `
        <div class="mp-stat"><span class="mp-stat-val">${r.militants}</span><span class="mp-stat-lbl">Militants</span></div>
        <div class="mp-stat"><span class="mp-stat-val">${r.sites}</span><span class="mp-stat-lbl">Sites</span></div>
        <div class="mp-stat"><span class="mp-stat-val">${r.perm}</span><span class="mp-stat-lbl">Permanences</span></div>
      `;
    }
    if (mpCta) mpCta.setAttribute('href', r.link);

    mapZones.forEach((z) => z.classList.remove('is-active'));
    const active = document.querySelector(`[data-region="${key}"]`);
    if (active) active.classList.add('is-active');

    chips.forEach((c) => c.classList.toggle('is-active', c.dataset.region === key));
  }

  mapZones.forEach((zone) => {
    const key = zone.dataset.region;
    if (!key) return;
    zone.addEventListener('mouseenter', () => setActiveRegion(key));
    zone.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveRegion(key);
      const r = REGIONS[key];
      if (r) window.location.href = r.link;
    });
  });
  chips.forEach((c) => {
    c.addEventListener('mouseenter', () => setActiveRegion(c.dataset.region));
    c.addEventListener('click', (e) => {
      e.preventDefault();
      const r = REGIONS[c.dataset.region];
      if (r) window.location.href = r.link;
    });
  });

  // Initial : Sud-Est sélectionné
  if (mpName) setActiveRegion('sud-est');

  // ─── 6. Compte à rebours élections 2027 ───
  const targetDate = new Date('2027-11-15T00:00:00').getTime();
  const cdDays = document.querySelector('[data-cd="days"]');
  const cdHours = document.querySelector('[data-cd="hours"]');
  const cdMins = document.querySelector('[data-cd="mins"]');
  const cdSecs = document.querySelector('[data-cd="secs"]');
  function tickCountdown() {
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    if (cdDays) cdDays.textContent = String(days).padStart(3, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMins) cdMins.textContent = String(mins).padStart(2, '0');
    if (cdSecs) cdSecs.textContent = String(secs).padStart(2, '0');
  }
  if (cdDays) { tickCountdown(); setInterval(tickCountdown, 1000); }

  // ─── 7. Mode a11y (issu du template FO d'origine) ───
  window.toggleA11y = function () {
    const body = document.body;
    const btn = document.getElementById('a11yToggle');
    const on = body.classList.toggle('a11y-mode');
    if (btn) btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { localStorage.setItem('fo-a11y', on ? '1' : '0'); } catch (e) {}
  };
  try {
    if (localStorage.getItem('fo-a11y') === '1') {
      document.body.classList.add('a11y-mode');
      const btn = document.getElementById('a11yToggle');
      if (btn) btn.setAttribute('aria-pressed', 'true');
    }
  } catch (e) {}

  // ─── 8. Smooth scroll pour les liens internes ───
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ─── 9. Tilt 3D sur les why-card ───
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    const max = 8;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-8px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // ─── 10. Burger menu ───
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('is-open');
      const links = document.querySelector('.nav-links');
      if (links) {
        if (open) {
          links.style.cssText = 'display:flex;position:absolute;top:100%;left:0;right:0;background:white;flex-direction:column;padding:20px;border-top:1px solid rgba(10,37,64,0.08);box-shadow:0 8px 24px rgba(10,37,64,0.1);gap:16px;';
        } else {
          links.style.cssText = '';
        }
      }
    });
  }
})();

/* ════════════════════════════════════════════════════════════
   V2 — Carte réelle (tooltip + clavier), candidats (flip + filtres)
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ─── Tooltip carte ───
  var tip = document.getElementById('mapTip');
  var frame = document.querySelector('.map-frame');
  var TIP_DATA = {
    'nord-ouest':   { name: 'Nord-Ouest',          meta: 'Syndicat FO régional · Lille' },
    'idf':          { name: 'Île-de-France',       meta: 'Syndicat FO régional · Paris' },
    'est':          { name: 'Est',                 meta: 'Syndicat FO régional · Nancy' },
    'centre-ouest': { name: 'Centre-Ouest',        meta: 'Syndicat FO régional · Nantes' },
    'sud-ouest':    { name: 'Sud-Ouest',           meta: 'Syndicat FO régional · Toulouse' },
    'sud-est':      { name: 'Sud-Est',             meta: 'Syndicat FO régional · Lyon' },
    'fc':           { name: 'Fonctions Centrales', meta: 'Saint-Denis · rayonnement national' }
  };
  if (tip && frame) {
    var tipName = tip.querySelector('[data-tip="name"]');
    var tipMeta = tip.querySelector('[data-tip="meta"]');
    document.querySelectorAll('.map-svg .map-zone').forEach(function (zone) {
      var key = zone.dataset.region;
      var d = TIP_DATA[key];
      if (!d) return;
      zone.addEventListener('mousemove', function (e) {
        var r = frame.getBoundingClientRect();
        tipName.textContent = d.name;
        tipMeta.textContent = d.meta;
        tip.style.left = (e.clientX - r.left) + 'px';
        tip.style.top = (e.clientY - r.top) + 'px';
        tip.classList.add('is-visible');
      });
      zone.addEventListener('mouseleave', function () {
        tip.classList.remove('is-visible');
      });
    });
  }

  // ─── Carte au clavier (Entrée / Espace) ───
  document.querySelectorAll('.map-svg .map-zone').forEach(function (zone) {
    zone.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        zone.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
    zone.addEventListener('focus', function () {
      zone.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    });
  });

  // ─── Filtres par collège ───
  var tabs = document.querySelectorAll('.college-tab');
  var cards = document.querySelectorAll('.cand-card');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var college = tab.dataset.college;
      tabs.forEach(function (t) {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      cards.forEach(function (card) {
        var show = college === 'all' || card.dataset.college === college;
        card.classList.toggle('is-hidden', !show);
        if (show) {
          card.classList.remove('is-visible');
          void card.offsetWidth; // relance l'animation reveal
          card.classList.add('is-visible');
        }
      });
    });
  });

  // ─── Flip des cartes candidats (clic + clavier) ───
  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // laisser vivre les liens du verso
      card.classList.toggle('is-flipped');
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('a')) return;
        e.preventDefault();
        card.classList.toggle('is-flipped');
      }
      if (e.key === 'Escape') card.classList.remove('is-flipped');
    });
    card.addEventListener('mouseleave', function () {
      // repli doux au départ de la souris (desktop uniquement)
      if (window.matchMedia('(pointer: fine)').matches) {
        setTimeout(function () { card.classList.remove('is-flipped'); }, 350);
      }
    });
  });
})();

/* ════════════════════════════════════════════════════════════
   V3 — Rayonnement national des Fonctions Centrales
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var svg = document.querySelector('.map-svg');
  if (!svg) return;
  var fcTriggers = document.querySelectorAll('[data-region="fc"]');
  function fcOn()  { svg.classList.add('fc-mode'); }
  function fcOff() { svg.classList.remove('fc-mode'); }
  fcTriggers.forEach(function (el) {
    el.addEventListener('mouseenter', fcOn);
    el.addEventListener('mouseleave', fcOff);
    el.addEventListener('focus', fcOn);
    el.addEventListener('blur', fcOff);
  });
})();
