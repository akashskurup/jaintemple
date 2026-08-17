/* =============================================================
   Shree Munisuvrat Swami Jain Derasar — site behaviour
   Vanilla JS, no dependencies. Everything degrades: with JS off
   the page is still complete, just static.
   ============================================================= */
(function () {
  'use strict';

  const D  = window.DERASAR || {};
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ---------- icon set ------------------------------------------------ */
  const ICONS = {
    phone:   '<path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1z"/>',
    pin:     '<path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.6"/>',
    clock:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    star:    '<path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.1 6.2L12 17.1 6.5 20l1.1-6.2L3 9.5l6.3-.8L12 3z"/>',
    diya:    '<path d="M4 14h16c0 3.3-3.6 6-8 6s-8-2.7-8-6z"/><path class="flame" d="M12 11c1.7-1.2 2-2.6 1-4.6 2.6.9 3.6 3 2.4 5"/>',
    lamp:    '<path class="flame" d="M12 3v3M8.5 9h7l1.5 4a5 5 0 0 1-10 0z"/><path d="M12 17v4M9 21h6"/>',
    sunrise: '<path d="M12 3v4M5 9 3.5 7.5M19 9l1.5-1.5M2 17h20M6 17a6 6 0 0 1 12 0"/>',
    sun:     '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"/>',
    moon:    '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
    door:    '<path d="M5 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17M3 21h16M12 12h.01"/>',
    kalash:  '<path d="M9 4h6M8 7h8l-1 4a5 5 0 0 1 3 4.6V20H6v-4.4A5 5 0 0 1 9 11L8 7z"/>',
    lotus:   '<path d="M12 4c1.8 2 2.6 4 2.6 6C14.6 12 13.5 14 12 15c-1.5-1-2.6-3-2.6-5 0-2 .8-4 2.6-6z"/><path d="M6 8c2.3.9 3.6 2.3 4.2 4M18 8c-2.3.9-3.6 2.3-4.2 4M3 13c3.3 0 6 2.7 9 7 3-4.3 5.7-7 9-7"/>',
    book:    '<path d="M4 4h6a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H20z"/>',
    hand:    '<path d="M9 12V5.5a1.5 1.5 0 0 1 3 0V11m0 0V4.5a1.5 1.5 0 0 1 3 0V12m0-1V6.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-6-6v-4a1.5 1.5 0 0 1 3 0"/>',
    heart:   '<path d="M12 20s-7-4.4-7-9.4A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 7 3.6c0 5-7 9.4-7 9.4z"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    check:   '<path d="m4 12.5 5 5L20 6.5"/>',
    info:    '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.6v.6"/>',
    arrow:   '<path d="M5 12h14M13 6l6 6-6 6"/>',
    up:      '<path d="M12 19V5M6 11l6-6 6 6"/>',
    down:    '<path d="M12 5v14M18 13l-6 6-6-6"/>',
    left:    '<path d="M15 5l-7 7 7 7"/>',
    right:   '<path d="M9 5l7 7-7 7"/>',
    close:   '<path d="M6 6l12 12M18 6 6 18"/>',
    menu:    '<path d="M4 7h16M4 12h16M4 17h16"/>',
    expand:  '<path d="M9 3H3v6M15 21h6v-6M21 9V3h-6M3 15v6h6"/>',
    share:   '<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.4 10.8 7.2-4.2M8.4 13.2l7.2 4.2"/>',
    whatsapp:'<path d="M20 11.8A8 8 0 0 1 8.7 19L4 20.5l1.6-4.6A8 8 0 1 1 20 11.8z"/><path d="M8.8 9.2c0 3 2.2 5.2 5.2 5.2l1-1.4-2-1-.9.9c-1-.5-1.7-1.2-2.2-2.2l.9-.9-1-2-1 1z"/>',
    mail:    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
    dharma:  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.4"/><path d="M12 3v6.6M12 14.4V21M3 12h6.6M14.4 12H21M5.6 5.6l4.7 4.7M13.7 13.7l4.7 4.7M18.4 5.6l-4.7 4.7M10.3 13.7l-4.7 4.7"/>',
    route:   '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M15.5 5H10a4 4 0 0 0 0 8h4a4 4 0 0 1 0 8H8.5"/>'
  };
  function svg(name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
           'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
           (ICONS[name] || '') + '</svg>';
  }
  function paintIcons(root) {
    $$('[data-icon]', root || document).forEach(el => {
      if (el.dataset.painted) return;
      el.innerHTML = svg(el.dataset.icon);
      el.dataset.painted = '1';
    });
  }

  /* ---------- shared chrome, injected once ---------------------------- */
  function initChrome() {
    const wa = D.info.phoneRaw.replace(/\D/g, '');
    const frag = document.createElement('div');
    frag.innerHTML =
      '<div class="scroll-progress" aria-hidden="true"></div>' +
      '<div class="toasts" role="status" aria-live="polite"></div>' +
      '<button class="to-top" type="button" aria-label="Back to top">' + svg('up') + '</button>' +
      '<nav class="dock" aria-label="Quick actions"><ul>' +
        '<li><a href="tel:' + D.info.phoneRaw + '">' + svg('phone') + '<span>Call</span></a></li>' +
        '<li><a href="' + D.info.directionsUrl + '" target="_blank" rel="noopener">' + svg('route') + '<span>Directions</span></a></li>' +
        '<li><a href="darshan.html">' + svg('diya') + '<span>Darshan</span></a></li>' +
        '<li><a href="seva.html">' + svg('kalash') + '<span>Seva</span></a></li>' +
      '</ul></nav>' +
      '<div class="lbox" role="dialog" aria-modal="true" aria-label="Photograph viewer">' +
        '<div class="lbox__stage"><img alt=""></div>' +
        '<div class="lbox__strip"></div>' +
        '<div class="lbox__bar"><span class="lbox__count"></span><span class="lbox__cap"></span></div>' +
        '<button class="lbox__btn lbox__prev" type="button" aria-label="Previous photograph">' + svg('left') + '</button>' +
        '<button class="lbox__btn lbox__next" type="button" aria-label="Next photograph">' + svg('right') + '</button>' +
        '<button class="lbox__btn lbox__close" type="button" aria-label="Close viewer">' + svg('close') + '</button>' +
      '</div>';
    while (frag.firstChild) document.body.appendChild(frag.firstChild);
    void wa;
  }

  /* ---------- toasts -------------------------------------------------- */
  function toast(msg, kind) {
    const host = $('.toasts');
    if (!host) return;
    const el = document.createElement('div');
    el.className = 'toast' + (kind === 'gold' ? ' toast--gold' : '');
    el.innerHTML = svg(kind === 'gold' ? 'diya' : 'check') + '<p>' + msg + '</p>';
    host.appendChild(el);
    setTimeout(() => {
      el.dataset.leaving = 'true';
      setTimeout(() => el.remove(), 320);
    }, 4600);
  }

  /* ---------- header: sticky state, drawer, sliding pill -------------- */
  function initHeader() {
    const head = $('.site-head');
    if (head) {
      const onScroll = () => head.classList.toggle('is-stuck', scrollY > 8);
      onScroll();
      addEventListener('scroll', onScroll, { passive: true });
    }

    const nav = $('.nav'), toggle = $('.nav-toggle'), scrim = $('.nav-scrim');
    if (nav && toggle) {
      const setOpen = open => {
        nav.dataset.open = open;
        if (scrim) scrim.dataset.open = open;
        toggle.setAttribute('aria-expanded', String(open));
        toggle.innerHTML = svg(open ? 'close' : 'menu');
        document.body.style.overflow = open ? 'hidden' : '';
      };
      toggle.addEventListener('click', () => setOpen(nav.dataset.open !== 'true'));
      if (scrim) scrim.addEventListener('click', () => setOpen(false));
      $$('a', nav).forEach(a => a.addEventListener('click', () => setOpen(false)));
      addEventListener('keydown', e => { if (e.key === 'Escape' && nav.dataset.open === 'true') setOpen(false); });
    }

    /* Pill that glides to whatever nav item you are on or hovering */
    const list = $('.nav ul');
    if (!list || matchMedia('(max-width: 1040px)').matches) return;
    const pill = document.createElement('span');
    pill.className = 'nav__pill';
    pill.setAttribute('aria-hidden', 'true');
    list.appendChild(pill);
    const current = $('.nav a[aria-current="page"]');
    const move = el => {
      if (!el) { pill.dataset.on = 'false'; return; }
      pill.style.setProperty('--pill-x', (el.offsetLeft) + 'px');
      pill.style.setProperty('--pill-w', el.offsetWidth + 'px');
      pill.dataset.on = 'true';
    };
    $$('.nav a').forEach(a => {
      a.addEventListener('pointerenter', () => move(a));
      a.addEventListener('focus', () => move(a));
    });
    list.addEventListener('pointerleave', () => move(current));
    addEventListener('resize', () => move(current));
    requestAnimationFrame(() => move(current));
  }

  /* ---------- language & diya mode ------------------------------------ */
  function initLang() {
    const btn = $('.lang-btn');
    const apply = lang => {
      document.documentElement.dataset.lang = lang;
      document.documentElement.lang = lang === 'gu' ? 'gu' : 'en';
      if (btn) {
        btn.textContent = lang === 'gu' ? 'EN' : 'ગુજ';
        btn.setAttribute('aria-label', lang === 'gu' ? 'Switch to English' : 'ગુજરાતીમાં જુઓ');
      }
      try { localStorage.setItem('derasar.lang', lang); } catch (e) {}
    };
    let saved = 'en';
    try { saved = localStorage.getItem('derasar.lang') || 'en'; } catch (e) {}
    apply(saved);
    if (btn) btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.lang === 'gu' ? 'en' : 'gu';
      apply(next);
      toast(next === 'gu' ? 'ગુજરાતીમાં' : 'Switched to English');
    });
  }

  function initMode() {
    const btn = $('.mode-btn');
    const apply = mode => {
      document.documentElement.dataset.mode = mode;
      if (btn) {
        btn.innerHTML = svg(mode === 'night' ? 'sun' : 'lamp');
        const label = mode === 'night' ? 'Switch to day view' : 'Switch to diya view';
        btn.setAttribute('aria-label', label);
        btn.setAttribute('title', label);
      }
      try { localStorage.setItem('derasar.mode', mode); } catch (e) {}
    };
    let saved = null;
    try { saved = localStorage.getItem('derasar.mode'); } catch (e) {}
    apply(saved === 'night' ? 'night' : 'day');
    if (btn) btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.mode === 'night' ? 'day' : 'night';
      apply(next);
      if (next === 'night') toast('Diya view — the derasar after the evening aarti.', 'gold');
    });
  }

  /* ---------- IST clock helpers --------------------------------------- */
  function istNow() {
    const p = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata', hour12: false,
      year: 'numeric', month: 'long', day: '2-digit',
      hour: '2-digit', minute: '2-digit', weekday: 'short'
    }).formatToParts(new Date()).reduce((o, x) => (o[x.type] = x.value, o), {});
    const h = +p.hour % 24;
    return {
      mins: h * 60 + +p.minute,
      dateLabel: p.weekday + ', ' + p.day + ' ' + p.month + ' ' + p.year
    };
  }
  const toMins = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const pretty = t => {
    const [h, m] = t.split(':').map(Number);
    return (h % 12 === 0 ? 12 : h % 12) + ':' + String(m).padStart(2, '0') + ' ' + (h >= 12 ? 'pm' : 'am');
  };
  const keyMins = k => { const s = D.schedule.find(x => x.key === k); return s ? toMins(s.t) : 0; };

  function openState(mins) {
    const open = keyMins('open'), noon = keyMins('noon'), reopen = keyMins('reopen'), close = keyMins('close');
    if (mins >= open && mins < noon + 30) return { open: true };
    if (mins >= reopen && mins < close)   return { open: true };
    return { open: false };
  }
  function nextEvent(mins) {
    for (const s of D.schedule) if (toMins(s.t) > mins) return { s, in: toMins(s.t) - mins };
    return { s: D.schedule[0], in: toMins(D.schedule[0].t) + 1440 - mins };
  }

  /* ---------- live status & date -------------------------------------- */
  function initStatus() {
    const pills = $$('[data-status-pill]'), dates = $$('[data-today]');
    if (!pills.length && !dates.length) return;
    const tick = () => {
      const n = istNow(), st = openState(n.mins), nx = nextEvent(n.mins);
      pills.forEach(p => {
        p.dataset.state = st.open ? 'open' : 'closed';
        p.innerHTML = '<span class="status__dot"></span><span>' +
          (st.open ? 'Open for darshan' : 'Sanctum resting') +
          ' &middot; ' + esc(nx.s.name) + ' at ' + pretty(nx.s.t) + '</span>';
      });
      dates.forEach(d => { d.textContent = n.dateLabel; });
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- timings table & countdown ------------------------------- */
  function initTimings() {
    const host = $('[data-timings]');
    if (!host) return;
    host.innerHTML = D.schedule.map(s =>
      '<div class="timings__row" data-key="' + s.key + '">' +
        '<span class="timings__ico">' + svg(s.icon) + '</span>' +
        '<span><span class="timings__name">' +
          '<span data-en>' + esc(s.name) + '</span><span data-gu class="gu">' + esc(s.nameGu) + '</span>' +
          '<span class="timings__badge">Next</span>' +
        '</span><br><span class="timings__desc">' + esc(s.desc) + '</span></span>' +
        '<span class="timings__time">' + pretty(s.t) + '</span>' +
      '</div>').join('') +
      '<div class="countdown"><span class="countdown__label">Next in the derasar</span>' +
      '<span class="countdown__val" data-countdown>&mdash;</span></div>';

    const out = $('[data-countdown]', host);
    const tick = () => {
      const nx = nextEvent(istNow().mins);
      $$('.timings__row', host).forEach(r => r.classList.toggle('is-next', r.dataset.key === nx.s.key));
      const h = Math.floor(nx.in / 60), m = nx.in % 60;
      out.textContent = nx.s.name + ' — in ' + (h ? h + ' hr ' : '') + m + ' min';
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- hero slideshow ------------------------------------------ */
  function initHero() {
    const media = $('.hero__media');
    if (!media) return;
    const slides = $$('img', media), dots = $('.hero__dots');
    if (slides.length < 2) { slides.forEach(s => s.classList.add('is-active')); return; }
    let i = 0, timer;
    if (dots) dots.innerHTML = slides.map((_, k) =>
      '<button type="button" role="tab" aria-selected="' + (k === 0) + '" aria-label="Photograph ' + (k + 1) + '"></button>').join('');
    const go = k => {
      i = (k + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
      if (dots) $$('button', dots).forEach((b, n) => b.setAttribute('aria-selected', String(n === i)));
    };
    const play = () => { clearInterval(timer); if (!REDUCED) timer = setInterval(() => go(i + 1), 7200); };
    if (dots) $$('button', dots).forEach((b, k) => b.addEventListener('click', () => { go(k); play(); }));
    go(0); play();
  }

  /* ---------- gallery + lightbox -------------------------------------- */
  let lbItems = [];
  function initGallery() {
    const host = $('[data-gallery]');
    if (!host) return;
    const limit = parseInt(host.dataset.limit || '0', 10);
    const items = limit ? D.gallery.slice(0, limit) : D.gallery;
    lbItems = items;

    host.innerHTML = items.map((g, i) =>
      '<figure class="shot' + (g.tall && !limit ? ' is-tall' : '') + '" data-cat="' + g.cat + '" data-i="' + i + '"' +
        ' role="button" tabindex="0" aria-label="Open photograph: ' + esc(g.cap) + '">' +
        '<img src="assets/img/thumb/' + g.f + '.jpg" alt="' + esc(g.cap) + '" loading="lazy" decoding="async" width="720" height="540">' +
        '<span class="zoom-hint">' + svg('expand') + '</span>' +
        '<figcaption>' + esc(g.cap) + '</figcaption>' +
      '</figure>').join('');

    $$('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      $$('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      $$('.shot', host).forEach(f => { f.hidden = !(cat === 'all' || f.dataset.cat === cat); });
    }));

    const box = $('.lbox');
    if (!box) return;
    const img = $('.lbox__stage img', box), cap = $('.lbox__cap', box),
          cnt = $('.lbox__count', box), strip = $('.lbox__strip', box);
    let cur = 0, opener = null;

    strip.innerHTML = items.map((g, k) =>
      '<button type="button" data-k="' + k + '" aria-label="Photograph ' + (k + 1) + '">' +
      '<img src="assets/img/thumb/' + g.f + '.jpg" alt="" loading="lazy"></button>').join('');

    const show = k => {
      cur = (k + items.length) % items.length;
      const g = items[cur];
      img.src = 'assets/img/' + g.f + '.jpg';
      img.alt = g.cap;
      cap.textContent = g.cap;
      cnt.textContent = (cur + 1) + ' / ' + items.length;
      $$('button', strip).forEach((b, n) => b.setAttribute('aria-current', String(n === cur)));
      const active = strip.children[cur];
      if (active) active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: REDUCED ? 'auto' : 'smooth' });
    };
    const open = k => {
      opener = document.activeElement;
      show(k);
      box.dataset.open = 'true';
      document.body.style.overflow = 'hidden';
      $('.lbox__close', box).focus();
    };
    const close = () => {
      box.dataset.open = 'false';
      document.body.style.overflow = '';
      if (opener && opener.focus) opener.focus();
    };

    $$('.shot', host).forEach(f => {
      f.addEventListener('click', () => open(+f.dataset.i));
      f.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(+f.dataset.i); }
      });
    });
    $$('button', strip).forEach(b => b.addEventListener('click', () => show(+b.dataset.k)));
    $('.lbox__close', box).addEventListener('click', close);
    $('.lbox__prev', box).addEventListener('click', () => show(cur - 1));
    $('.lbox__next', box).addEventListener('click', () => show(cur + 1));
    box.addEventListener('click', e => {
      if (e.target === box || e.target.classList.contains('lbox__stage')) close();
    });
    addEventListener('keydown', e => {
      if (box.dataset.open !== 'true') return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
    /* swipe */
    let x0 = null;
    box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 46) show(cur + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  /* ---------- data-driven blocks -------------------------------------- */
  function initReviews() {
    const host = $('[data-reviews]');
    if (!host) return;
    host.innerHTML = D.reviews.map((r, i) =>
      '<article class="review" data-reveal style="--d:' + (i * 80) + 'ms">' +
        '<div class="review__stars" aria-label="' + r.stars + ' out of 5">' + '★'.repeat(r.stars) + '</div>' +
        '<blockquote>' + esc(r.text) + '</blockquote>' +
        '<div class="review__who"><span class="review__av">' + esc(r.who.charAt(0)) + '</span>' +
        '<span><strong>' + esc(r.who) + '</strong><br>' + esc(r.meta) + '</span></div>' +
      '</article>').join('');
  }

  function initFestivals() {
    const host = $('[data-festivals]');
    if (!host) return;
    host.innerHTML = D.festivals.map(f =>
      '<li data-reveal="left"><span class="timeline__dot">' + svg('lotus') + '</span>' +
        '<span class="timeline__when">' + esc(f.when) + '</span>' +
        '<h3>' + esc(f.name) + '</h3><p>' + esc(f.note) + '</p></li>').join('');

    /* Fill the spine as the list scrolls past */
    const tl = host;
    const onScroll = () => {
      const r = tl.getBoundingClientRect();
      const mid = innerHeight * 0.62;
      const pct = Math.max(0, Math.min(1, (mid - r.top) / r.height));
      tl.style.setProperty('--tl', (pct * 100).toFixed(1) + '%');
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  function initSevas() {
    const host = $('[data-sevas]');
    if (host) {
      host.innerHTML = D.sevas.map((s, i) =>
        '<article class="card card--lift card--tilt" data-reveal style="--d:' + (i % 3 * 90) + 'ms">' +
          '<span class="card__ico">' + svg(s.icon || 'kalash') + '</span>' +
          '<h3>' + esc(s.name) + '</h3>' +
          '<p class="card__gu gu">' + esc(s.gu) + '</p>' +
          '<p>' + esc(s.note) + '</p></article>').join('');
    }
    const sel = $('[data-seva-options]');
    if (sel) D.sevas.forEach(s => {
      const o = document.createElement('option');
      o.value = s.name; o.textContent = s.name;
      sel.appendChild(o);
    });
  }

  function initMarquee() {
    $$('[data-marquee]').forEach(host => {
      const key = host.dataset.marquee;
      const items = (D[key] || []).map(t =>
        '<span class="marquee__item">' + svg('lotus') + esc(t) + '</span>').join('');
      if (!items) return;
      host.innerHTML = '<div class="marquee__track">' + items + items + '</div>';
    });
  }

  /* ---------- Navkar japa counter ------------------------------------- */
  function initJapa() {
    const root = $('[data-japa]');
    if (!root) return;
    const KEY = 'derasar.japa', BEADS = 108;
    let count = 0;
    try { count = parseInt(localStorage.getItem(KEY) || '0', 10) || 0; } catch (e) {}

    const prog = $('.japa__prog', root), num = $('.japa__num b', root), mala = $('.japa__mala', root);
    const C = 2 * Math.PI * 92;
    prog.style.strokeDasharray = C;

    const draw = () => {
      const inMala = count % BEADS;
      prog.style.strokeDashoffset = C - (C * inMala / BEADS);
      num.textContent = inMala;
      const malas = Math.floor(count / BEADS);
      mala.innerHTML = malas
        ? '<strong>' + malas + '</strong> mala' + (malas > 1 ? 's' : '') + ' complete &middot; ' + count + ' japa in all'
        : 'Tap the bead for each Navkar. One mala is 108.';
      try { localStorage.setItem(KEY, String(count)); } catch (e) {}
    };
    $('.japa__tap', root).addEventListener('click', () => {
      count++;
      draw();
      if (count % BEADS === 0) {
        toast('One mala complete — ' + Math.floor(count / BEADS) + ' so far.', 'gold');
        if (navigator.vibrate) navigator.vibrate(120);
      }
    });
    const reset = $('[data-japa-reset]', root);
    if (reset) reset.addEventListener('click', () => { count = 0; draw(); toast('Mala reset.'); });
    draw();
  }

  /* ---------- segmented tabs ----------------------------------------- */
  function initTabs() {
    $$('.tabs').forEach(tabs => {
      const list = $('.tabs__list', tabs);
      const btns = $$('button', list);
      if (!btns.length) return;
      const glider = document.createElement('span');
      glider.className = 'tabs__glider';
      glider.setAttribute('aria-hidden', 'true');
      list.insertBefore(glider, list.firstChild);

      const slide = b => {
        glider.style.setProperty('--tab-x', b.offsetLeft + 'px');
        glider.style.setProperty('--tab-w', b.offsetWidth + 'px');
      };
      const select = b => {
        btns.forEach(x => {
          const on = x === b;
          x.setAttribute('aria-selected', String(on));
          x.tabIndex = on ? 0 : -1;
          const panel = $('#' + x.getAttribute('aria-controls'), tabs);
          if (panel) panel.hidden = !on;
        });
        slide(b);
      };
      btns.forEach((b, i) => {
        b.addEventListener('click', () => select(b));
        b.addEventListener('keydown', e => {
          const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          e.preventDefault();
          const n = btns[(i + d + btns.length) % btns.length];
          n.focus(); select(n);
        });
      });
      select(btns.find(b => b.getAttribute('aria-selected') === 'true') || btns[0]);
      addEventListener('resize', () => {
        const on = btns.find(b => b.getAttribute('aria-selected') === 'true');
        if (on) slide(on);
      });
    });
  }

  /* ---------- accordion ---------------------------------------------- */
  function initAccordion() {
    $$('.acc').forEach(acc => {
      const heads = $$('.acc__head', acc);
      heads.forEach(h => {
        h.insertAdjacentHTML('beforeend', '<span class="chev">' + svg('down') + '</span>');
        h.addEventListener('click', () => {
          const open = h.getAttribute('aria-expanded') === 'true';
          if (acc.dataset.single !== 'false') {
            heads.forEach(o => o.setAttribute('aria-expanded', 'false'));
          }
          h.setAttribute('aria-expanded', String(!open));
        });
      });
    });
  }

  /* ---------- forms -------------------------------------------------- */
  function initForms() {
    $$('form[data-handoff]').forEach(form => {
      const ok = $('.form-ok', form.closest('.card') || form.parentElement);
      form.addEventListener('submit', e => {
        e.preventDefault();
        let bad = null;
        $$('.field', form).forEach(f => {
          const input = $('input, select, textarea', f);
          if (!input) return;
          const v = String(input.value).trim();
          const invalid =
            (input.required && !v) ||
            (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) ||
            (input.type === 'tel'   && v && !/^[0-9+\-\s()]{7,}$/.test(v));
          f.dataset.invalid = String(!!invalid);
          if (invalid && !bad) bad = input;
        });
        if (bad) { bad.focus(); toast('Please check the highlighted fields.'); return; }

        const lines = [form.dataset.subject || 'Enquiry from the derasar website'];
        for (const [k, v] of new FormData(form).entries()) {
          if (String(v).trim()) lines.push(k.replace(/_/g, ' ') + ': ' + v);
        }
        const body = lines.join('\n');
        const via = (e.submitter && e.submitter.dataset.via) || form.dataset.handoff;
        const url = via === 'mail'
          ? 'mailto:?subject=' + encodeURIComponent(lines[0]) + '&body=' + encodeURIComponent(body)
          : 'https://wa.me/' + D.info.phoneRaw.replace(/\D/g, '') + '?text=' + encodeURIComponent(body);

        window.open(url, '_blank', 'noopener');
        toast('Your message is ready to send — check the ' + (via === 'mail' ? 'e-mail' : 'WhatsApp') + ' window.');
        if (ok) {
          ok.hidden = false;
          ok.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'center' });
        }
        form.reset();
      });
    });
  }

  /* ---------- kinetic headlines --------------------------------------- */
  function splitText() {
    $$('.kinetic').forEach(el => {
      if (el.dataset.split) return;
      const words = el.textContent.trim().split(/\s+/);
      el.textContent = '';
      words.forEach((w, i) => {
        const span = document.createElement('span');
        span.className = 'w';
        const inner = document.createElement('i');
        inner.textContent = w;
        inner.style.setProperty('--wd', (i * 55) + 'ms');
        span.appendChild(inner);
        el.appendChild(span);
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      });
      el.dataset.split = '1';
    });
  }

  /* ---------- reveal on scroll ---------------------------------------- */
  function initReveal() {
    const targets = $$('[data-reveal], .kinetic, .divider, .timeline > li, .framed, .reveal-img');
    if (!targets.length || !('IntersectionObserver' in window) || REDUCED) {
      targets.forEach(t => t.classList.add('is-in'));
      return;
    }
    document.documentElement.classList.add('js-motion');
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.05 });
    targets.forEach(t => io.observe(t));

    /* Safety net — if nothing has fired, stop hiding things. */
    setTimeout(() => {
      if (!$('.is-in')) document.documentElement.classList.remove('js-motion');
    }, 4000);
  }

  /* ---------- count-up stats ----------------------------------------- */
  function initCounters() {
    const nums = $$('[data-count]');
    if (!nums.length) return;
    const run = el => {
      const target = parseFloat(el.dataset.count);
      const dec = (el.dataset.count.split('.')[1] || '').length;
      const suffix = el.dataset.suffix || '';
      if (REDUCED) { el.textContent = target.toFixed(dec) + suffix; return; }
      const t0 = performance.now(), dur = 1400;
      const step = now => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    }), { threshold: 0.5 });
    nums.forEach(n => { n.textContent = '0'; io.observe(n); });
  }

  /* ---------- card tilt + spotlight ---------------------------------- */
  function initTilt() {
    if (REDUCED || matchMedia('(hover: none)').matches) return;
    $$('.card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        if (card.classList.contains('card--tilt')) {
          card.style.setProperty('--ry', ((px - .5) * 7).toFixed(2) + 'deg');
          card.style.setProperty('--rx', ((.5 - py) * 5).toFixed(2) + 'deg');
          card.classList.add('is-tilting');
        }
      });
      card.addEventListener('pointerleave', () => {
        card.classList.remove('is-tilting');
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
      });
    });
  }

  /* ---------- parallax media ----------------------------------------- */
  function initParallax() {
    const els = $$('.parallax');
    if (!els.length || REDUCED) return;
    let queued = false;
    const apply = () => {
      queued = false;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const mid = r.top + r.height / 2 - innerHeight / 2;
        const shift = Math.max(-46, Math.min(46, -mid * 0.075));
        el.style.setProperty('--par', shift.toFixed(1) + 'px');
      });
    };
    addEventListener('scroll', () => {
      if (!queued) { queued = true; requestAnimationFrame(apply); }
    }, { passive: true });
    apply();
  }

  /* ---------- ripple on buttons -------------------------------------- */
  function initRipple() {
    if (REDUCED) return;
    document.addEventListener('pointerdown', e => {
      const b = e.target.closest('.btn, .japa__tap, .icon-btn');
      if (!b) return;
      const r = b.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const s = document.createElement('span');
      s.className = 'ripple';
      s.style.width = s.style.height = size + 'px';
      s.style.left = (e.clientX - r.left - size / 2) + 'px';
      s.style.top  = (e.clientY - r.top  - size / 2) + 'px';
      b.appendChild(s);
      setTimeout(() => s.remove(), 640);
    });
  }

  /* ---------- scroll progress, to-top, share ------------------------- */
  function initScrollChrome() {
    const bar = $('.scroll-progress');
    const cssScroll = CSS && CSS.supports && CSS.supports('animation-timeline: scroll()');
    if (bar && cssScroll) {
      document.documentElement.classList.add('css-scroll');
    } else if (bar) {
      const upd = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
      };
      upd();
      addEventListener('scroll', upd, { passive: true });
      addEventListener('resize', upd);
    }

    const top = $('.to-top');
    if (top) {
      const upd = () => { top.dataset.show = String(scrollY > 700); };
      upd();
      addEventListener('scroll', upd, { passive: true });
      top.addEventListener('click', () => scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }));
    }

    $$('[data-share]').forEach(btn => btn.addEventListener('click', async () => {
      const payload = { title: D.info.name, text: D.info.name + ' — ' + D.info.address, url: location.href };
      try {
        if (navigator.share) { await navigator.share(payload); return; }
        await navigator.clipboard.writeText(location.href);
        toast('Link copied to your clipboard.');
      } catch (e) { /* dismissed */ }
    }));

    $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- boot ---------------------------------------------------- */
  function boot() {
    initChrome();
    initLang(); initMode(); initHeader();
    initTimings(); initStatus(); initHero();
    initGallery(); initReviews(); initFestivals(); initSevas(); initMarquee();
    initJapa(); initTabs(); initAccordion(); initForms();
    paintIcons(document);
    splitText();
    initReveal(); initCounters(); initTilt(); initParallax(); initRipple();
    initScrollChrome();
  }
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
  else boot();
})();
