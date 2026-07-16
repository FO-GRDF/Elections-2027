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
      militants: 9, sites: 8, perm: 3, link: 'regions/region.html?r=nord-ouest'
    },
    'idf': {
      name: 'Île-de-France', eyebrow: 'Région GRDF · Paris & Couronne',
      desc: 'Cœur d\'activité GRDF, l\'IDF concentre les enjeux les plus stratégiques pour les salariés.',
      militants: 15, sites: 7, perm: 4, link: 'regions/region.html?r=idf'
    },
    'est': {
      name: 'Est', eyebrow: 'Région GRDF · Grand Est & Bourgogne-Franche-Comté',
      desc: 'De Nancy à Dijon, une région transfrontalière, des métiers techniques exigeants et des combats sociaux structurants.',
      militants: 11, sites: 8, perm: 3, link: 'regions/region.html?r=est'
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
      militants: 12, sites: 12, perm: 3, link: 'regions/region.html?r=sud-est'
    },
    'fc': {
      name: 'Fonctions Centrales', eyebrow: 'Siège · Saint-Denis — rayonnement national',
      desc: 'Basés à Saint-Denis, les militants des Fonctions Centrales rayonnent sur toute la France : SI, RH, achats, finances, communication.',
      militants: 7, sites: 52, perm: 2, link: 'regions/region.html?r=fc'
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
    'nord-ouest':   { name: 'Nord-Ouest',          meta: '8 sites · 107 salariés FC' },
    'idf':          { name: 'Île-de-France',       meta: '7 sites · 1 346 salariés FC' },
    'est':          { name: 'Est',                 meta: '8 sites · 92 salariés FC' },
    'centre-ouest': { name: 'Centre-Ouest',        meta: '9 sites · 233 salariés FC' },
    'sud-ouest':    { name: 'Sud-Ouest',           meta: '8 sites · 168 salariés FC' },
    'sud-est':      { name: 'Sud-Est',             meta: '12 sites · 258 salariés FC' },
    'fc':           { name: 'Fonctions Centrales', meta: '52 sites partout en France · 2 204 salariés' }
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

/* ════════════════════════════════════════════════════════════
   V4 — Sites réels sur la carte (fichier NTIC mars 2026)
   Au survol/clic d'une région, ses sites apparaissent ;
   Fonctions Centrales = les 52 sites de France.
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var layer = document.getElementById('mapSites');
  var svg = document.querySelector('.map-svg');
  if (!layer || !svg || !window.FO_SITES) return;
  var NS = 'http://www.w3.org/2000/svg';
  var tip = document.getElementById('mapTip');
  var frame = document.querySelector('.map-frame');
  var tipName = tip ? tip.querySelector('[data-tip="name"]') : null;
  var tipMeta = tip ? tip.querySelector('[data-tip="meta"]') : null;

  function radius(n) { return Math.max(3.2, Math.min(8, 2.6 + Math.sqrt(n) * 0.55)); }

  function renderSites(key) {
    while (layer.firstChild) layer.removeChild(layer.firstChild);
    var groups = key === 'fc' ? Object.keys(window.FO_SITES) : [key];
    var delay = 0;
    groups.forEach(function (g) {
      (window.FO_SITES[g] || []).forEach(function (s) {
        var c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', s.x);
        c.setAttribute('cy', s.y);
        c.setAttribute('r', radius(s.n));
        c.setAttribute('class', 'map-site');
        c.style.animationDelay = (delay * 0.03) + 's';
        delay++;
        c.addEventListener('mousemove', function (e) {
          if (!tip || !frame) return;
          var r = frame.getBoundingClientRect();
          tipName.textContent = s.name;
          tipMeta.textContent = (s.n >= 3 ? s.n + ' salariés' : 'Salariés') + ' · Fonctions Centrales';
          tip.style.left = (e.clientX - r.left) + 'px';
          tip.style.top = (e.clientY - r.top) + 'px';
          tip.classList.add('is-visible');
        });
        c.addEventListener('mouseleave', function () {
          if (tip) tip.classList.remove('is-visible');
        });
        layer.appendChild(c);
      });
    });
  }

  document.querySelectorAll('.map-svg .map-zone, .region-chip').forEach(function (el) {
    var key = el.dataset.region;
    if (!key) return;
    el.addEventListener('mouseenter', function () { renderSites(key); });
    el.addEventListener('focus', function () { renderSites(key); });
  });

  // État initial : région active par défaut
  renderSites('sud-est');
})();

/* ════════════════════════════════════════════════════════════
   V5 — « Trouve ton élection » (recommandations du conseil des 5)
   Wizard 2 questions + recherche par site + mémorisation + partage
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var card = document.getElementById('finderCard');
  if (!card) return;

  var PERIMS = {
    'fc':           { name: 'Fonctions Centrales', color: '#c0303a', syndicat: 'Syndicat FO GRDF Fonctions Centrales', extra: 'Où que tu sois en France : ton élection, c\'est celle du siège et des directions nationales.' },
    'nord-ouest':   { name: 'Nord-Ouest',    color: '#29b0d5', syndicat: 'Syndicat FO GRDF Nord-Ouest' },
    'idf':          { name: 'Île-de-France', color: '#e8c93f', syndicat: 'Syndicat FO GRDF Île-de-France' },
    'est':          { name: 'Est',           color: '#b81f6e', syndicat: 'Syndicat FO GRDF Est' },
    'centre-ouest': { name: 'Centre-Ouest',  color: '#6b2d8b', syndicat: 'Syndicat FO GRDF Centre-Ouest' },
    'sud-ouest':    { name: 'Sud-Ouest',     color: '#3aa544', syndicat: 'Syndicat FO GRDF Sud-Ouest' },
    'sud-est':      { name: 'Sud-Est',       color: '#f39b1d', syndicat: 'Syndicat FO GRDF Sud-Est' }
  };
  var ORDER = ['nord-ouest', 'idf', 'est', 'centre-ouest', 'sud-ouest', 'sud-est'];
  var MAIL = 'syndicat-fo_grdf-delegations-nationales@grdf.fr';

  function goto(step) {
    card.querySelectorAll('.finder-step').forEach(function (s) {
      s.classList.toggle('is-active', s.dataset.step === String(step));
    });
  }

  // Boutons régions (étape 2)
  var regionsEl = document.getElementById('finderRegions');
  if (regionsEl) {
    regionsEl.innerHTML = ORDER.map(function (k) {
      return '<button class="finder-rbtn" type="button" data-perim="' + k + '"><span class="rdot" style="background:' + PERIMS[k].color + '"></span>' + PERIMS[k].name + '</button>';
    }).join('');
  }

  // Confettis sobres (or / bleu / blanc)
  function confetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var cv = document.getElementById('finderConfetti');
    if (!cv) return;
    var ctx = cv.getContext('2d');
    cv.width = card.offsetWidth; cv.height = card.offsetHeight;
    var colors = ['#f7dd5c', '#019cda', '#ffffff', '#e8c93f'];
    var parts = [];
    for (var i = 0; i < 60; i++) {
      parts.push({ x: cv.width / 2, y: cv.height * 0.35,
        vx: (Math.random() - 0.5) * 11, vy: -Math.random() * 9 - 3,
        s: Math.random() * 6 + 3, c: colors[i % colors.length], r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3 });
    }
    var t0 = performance.now();
    (function tick(now) {
      var dt = (now - t0) / 1000;
      ctx.clearRect(0, 0, cv.width, cv.height);
      parts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.32; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.globalAlpha = Math.max(0, 1.4 - dt);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
        ctx.restore();
      });
      if (dt < 1.6) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, cv.width, cv.height);
    })(t0);
  }

  function showResult(key, save) {
    var p = PERIMS[key];
    if (!p) return;
    if (save !== false) { try { localStorage.setItem('fo-perimetre', key); } catch (e) {} }
    var link = 'regions/region.html?r=' + key;
    var el = document.getElementById('finderResult');
    el.innerHTML =
      '<div class="fr-badge" style="background:' + p.color + '22;border:1px solid ' + p.color + '88;color:#fff;">🎉 Ton périmètre</div>' +
      '<h3 style="color:' + (key === 'idf' ? '#f7dd5c' : '#fff') + ';">' + p.name + '</h3>' +
      '<div class="fr-syndicat">' + p.syndicat + (p.extra ? '<br>' + p.extra : '') + '</div>' +
      '<div class="fr-ctas">' +
        '<a class="fr-cta" href="' + link + '">Découvrir mon équipe et mes candidats →</a>' +
        (navigator.share ? '<button class="fr-cta ghost" type="button" id="frShare">📤 Partager à un collègue</button>' : '') +
      '</div>' +
      '<p class="fr-note">En cas de doute, ta <b>fiche de paie</b> fait foi (le périmètre définitif sera fixé par le protocole préélectoral). Besoin d\'aide ? <a href="mailto:' + MAIL + '?subject=' + encodeURIComponent('Quel est mon périmètre ? — ' + p.name) + '">Un militant FO te répond</a>.</p>' +
      '<button class="fr-restart" type="button" id="frRestart">↺ Recommencer / changer de périmètre</button>';
    goto('result');
    confetti();
    var share = document.getElementById('frShare');
    if (share) share.addEventListener('click', function () {
      navigator.share({ title: 'FO GRDF — Élections 2027', text: 'Trouve ton élection en 10 secondes 👇', url: window.location.origin + window.location.pathname + '#trouve' }).catch(function () {});
    });
    document.getElementById('frRestart').addEventListener('click', function () {
      try { localStorage.removeItem('fo-perimetre'); } catch (e) {}
      var b = document.getElementById('perimBanner'); if (b) b.remove();
      goto('1');
    });
  }

  // Navigation du wizard
  card.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-goto]');
    if (nav) { goto(nav.dataset.goto); if (nav.dataset.goto === 'search') { var i = document.getElementById('finderInput'); if (i) setTimeout(function () { i.focus(); }, 200); } return; }
    var ans = e.target.closest('.finder-btn');
    if (ans) { ans.dataset.answer === 'fc' ? showResult('fc') : goto('2'); return; }
    var reg = e.target.closest('.finder-rbtn');
    if (reg) { showResult(reg.dataset.perim); return; }
  });

  // Recherche par site (aide secondaire — avertissement UM affiché)
  var input = document.getElementById('finderInput');
  var results = document.getElementById('finderResults');
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  if (input && results && window.FO_SITES) {
    var ALL = [];
    Object.keys(window.FO_SITES).forEach(function (reg) {
      window.FO_SITES[reg].forEach(function (s) { ALL.push({ name: s.name, n: s.n, reg: reg }); });
    });
    input.addEventListener('input', function () {
      var q = norm(input.value.trim());
      results.innerHTML = '';
      if (q.length < 2) return;
      var found = ALL.filter(function (s) { return norm(s.name).indexOf(q) !== -1; }).slice(0, 4);
      if (!found.length) {
        results.innerHTML = '<div class="finder-site">Site introuvable dans notre liste — pas de panique : réponds à la <button type="button" class="fs-q1" style="background:none;border:none;color:#f7dd5c;cursor:pointer;font-family:inherit;text-decoration:underline;padding:0;">question sur ton entité</button>, ou <a href="mailto:' + MAIL + '?subject=' + encodeURIComponent('Quel est mon périmètre ?') + '" style="color:#f7dd5c;">écris-nous</a>.</div>';
        var q1 = results.querySelector('.fs-q1');
        if (q1) q1.addEventListener('click', function () { goto('1'); });
        return;
      }
      results.innerHTML = found.map(function (s, i) {
        var effectif = s.n >= 3 ? s.n + ' salariés des Fonctions Centrales y travaillent' : 'des salariés des Fonctions Centrales y travaillent';
        return '<div class="finder-site"><b>' + s.name + '</b> — ' + effectif + '.<br>Ton périmètre dépend de ton entité :' +
          '<div class="fs-actions">' +
          '<button type="button" data-pick="fc">Je dépends d\'une direction nationale → FC</button>' +
          '<button type="button" class="alt" data-pick="' + s.reg + '">Je dépends de la région → ' + PERIMS[s.reg].name + '</button>' +
          '</div></div>';
      }).join('');
    });
    results.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pick]');
      if (b) showResult(b.dataset.pick);
    });
  }

  // Retour d'un visiteur : bandeau périmètre mémorisé
  try {
    var saved = localStorage.getItem('fo-perimetre');
    if (saved && PERIMS[saved]) {
      var nav2 = document.querySelector('.top-nav');
      var banner = document.createElement('div');
      banner.className = 'perim-banner';
      banner.id = 'perimBanner';
      banner.innerHTML = '👋 Ton périmètre : <b>' + PERIMS[saved].name + '</b>' +
        '<a href="regions/region.html?r=' + saved + '">Mes candidats</a>' +
        '<button type="button" id="perimChange">changer</button>';
      nav2.insertAdjacentElement('afterend', banner);
      document.getElementById('perimChange').addEventListener('click', function () {
        try { localStorage.removeItem('fo-perimetre'); } catch (e) {}
        banner.remove();
        var t = document.getElementById('trouve');
        if (t) t.scrollIntoView({ behavior: 'smooth' });
      });
      // pré-afficher le résultat dans le wizard
      showResult(saved, false);
    }
  } catch (e) {}
})();
