/* =============================================================
   Site behaviour — navigation, language, diya mode, live aarti
   clock, hero slideshow, gallery lightbox, japa counter, forms.
   No dependencies.
   ============================================================= */
(function () {
  'use strict';

  const D  = window.DERASAR || {};
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------- inline icon set ---------------------------------------- */
  const ICONS = {
    phone:   '<path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1z"/>',
    pin:     '<path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.6"/>',
    clock:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    star:    '<path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.1 6.2L12 17.1 6.5 20l1.1-6.2L3 9.5l6.3-.8L12 3z"/>',
    diya:    '<path d="M4 14h16c0 3.3-3.6 6-8 6s-8-2.7-8-6z"/><path d="M12 11c1.7-1.2 2-2.6 1-4.6 2.6.9 3.6 3 2.4 5"/>',
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
    cross:   '<path d="M6 6l12 12M18 6 6 18"/>',
    info:    '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.6v.6"/>',
    arrow:   '<path d="M5 12h14M13 6l6 6-6 6"/>',
    up:      '<path d="M12 19V5M6 11l6-6 6 6"/>',
    left:    '<path d="M15 5l-7 7 7 7"/>',
    right:   '<path d="M9 5l7 7-7 7"/>',
    close:   '<path d="M6 6l12 12M18 6 6 18"/>',
    menu:    '<path d="M4 7h16M4 12h16M4 17h16"/>',
    lamp:    '<path d="M12 3v3M8.5 9h7l1.5 4a5 5 0 0 1-10 0z"/><path d="M12 17v4M9 21h6"/>',
    share:   '<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.4 10.8 7.2-4.2M8.4 13.2l7.2 4.2"/>',
    whatsapp:'<path d="M20 11.8A8 8 0 0 1 8.7 19L4 20.5l1.6-4.6A8 8 0 1 1 20 11.8z"/><path d="M8.8 9.2c0 3 2.2 5.2 5.2 5.2l1-1.4-2-1-.9.9c-1-.5-1.7-1.2-2.2-2.2l.9-.9-1-2-1 1z"/>',
    mail:    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
    swastik: '<path d="M12 3v18M3 12h18M12 3H7v0M21 12v5M12 21h5M3 12V7"/><path d="M12 3H7M21 12v5M12 21h5M3 12V7"/>',
    dharma:  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.4"/><path d="M12 3v6.6M12 14.4V21M3 12h6.6M14.4 12H21M5.6 5.6l4.7 4.7M13.7 13.7l4.7 4.7M18.4 5.6l-4.7 4.7M10.3 13.7l-4.7 4.7"/>'
  };
  function svg(name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
           'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
           (ICONS[name] || '') + '</svg>';
  }
  window.tIcon = svg;

  /* Fill any <i data-icon="pin"></i> placeholder */
  function paintIcons(root) {
    $$('[data-icon]', root).forEach(el => {
      if (el.dataset.painted) return;
      el.innerHTML = svg(el.dataset.icon);
      el.dataset.painted = '1';
    });
  }

  /* ---------- header: sticky shadow + mobile drawer ------------------- */
  function initHeader() {
    const head = $('.site-head');
    if (head) {
      const onScroll = () => head.classList.toggle('is-stuck', window.scrollY > 8);
      onScroll();
      addEventListener('scroll', onScroll, { passive: true });
    }
    const toggle = $('.nav-toggle');
    const nav    = $('.nav');
    const scrim  = $('.nav-scrim');
    if (!toggle || !nav) return;
    const setOpen = open => {
      nav.dataset.open = open;
      if (scrim) scrim.dataset.open = open;
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', () => setOpen(nav.dataset.open !== 'true'));
    if (scrim) scrim.addEventListener('click', () => setOpen(false));
    $$('a', nav).forEach(a => a.addEventListener('click', () => setOpen(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------- language toggle (EN / ગુજરાતી) -------------------------- */
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
    if (btn) btn.addEventListener('click', () =>
      apply(document.documentElement.dataset.lang === 'gu' ? 'en' : 'gu'));
  }

  /* ---------- diya mode (light / night) ------------------------------- */
  function initMode() {
    const btn = $('.mode-btn');
    const apply = mode => {
      document.documentElement.dataset.mode = mode;
      if (btn) {
        btn.innerHTML = svg(mode === 'night' ? 'sun' : 'lamp');
        btn.setAttribute('aria-label', mode === 'night' ? 'Switch to day view' : 'Switch to diya (night) view');
        btn.setAttribute('title', mode === 'night' ? 'Day view' : 'Diya view');
      }
      try { localStorage.setItem('derasar.mode', mode); } catch (e) {}
    };
    let saved = null;
    try { saved = localStorage.getItem('derasar.mode'); } catch (e) {}
    apply(saved || 'day');
    if (btn) btn.addEventListener('click', () =>
      apply(document.documentElement.dataset.mode === 'night' ? 'day' : 'night'));
  }

  /* ---------- time helpers (all in IST, wherever the visitor is) ------ */
  function istNow() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata', hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', weekday: 'short'
    }).formatToParts(new Date()).reduce((o, p) => (o[p.type] = p.value, o), {});
    return {
      h: +parts.hour % 24, m: +parts.minute, s: +parts.second,
      mins: (+parts.hour % 24) * 60 + +parts.minute,
      dateLabel: parts.weekday + ', ' + parts.day + ' ' +
        new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', month: 'long' }).format(new Date()) +
        ' ' + parts.year
    };
  }
  const toMins = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const pretty = t => {
    const [h, m] = t.split(':').map(Number);
    const ap = h >= 12 ? 'pm' : 'am';
    const hh = h % 12 === 0 ? 12 : h % 12;
    return hh + ':' + String(m).padStart(2, '0') + ' ' + ap;
  };

  /* Is the derasar open right now, per the indicative schedule? */
  function openState(mins) {
    const open   = toMins(D.schedule[0].t);
    const noon   = toMins(D.schedule.find(s => s.key === 'noon').t);
    const reopen = toMins(D.schedule.find(s => s.key === 'reopen').t);
    const close  = toMins(D.schedule.find(s => s.key === 'close').t);
    if (mins >= open && mins < noon + 30) return { open: true,  until: noon + 30 };
    if (mins >= reopen && mins < close)   return { open: true,  until: close };
    if (mins < open)                      return { open: false, until: open };
    if (mins < reopen)                    return { open: false, until: reopen };
    return { open: false, until: open + 1440 };
  }

  function nextEvent(mins) {
    for (const s of D.schedule) if (toMins(s.t) > mins) return { s, in: toMins(s.t) - mins };
    return { s: D.schedule[0], in: toMins(D.schedule[0].t) + 1440 - mins };
  }

  /* ---------- live status pill --------------------------------------- */
  function initStatus() {
    const pills = $$('[data-status-pill]');
    const dates = $$('[data-today]');
    if (!pills.length && !dates.length) return;
    const tick = () => {
      const n = istNow();
      const st = openState(n.mins);
      const nx = nextEvent(n.mins);
      pills.forEach(p => {
        p.dataset.state = st.open ? 'open' : 'closed';
        p.innerHTML = '<span class="status__dot"></span><span>' +
          (st.open ? 'Open now' : 'Closed now') +
          ' &middot; ' + nx.s.name + ' at ' + pretty(nx.s.t) + '</span>';
      });
      dates.forEach(d => { d.textContent = n.dateLabel; });
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- timings table + countdown ------------------------------ */
  function initTimings() {
    const host = $('[data-timings]');
    if (!host) return;
    host.innerHTML =
      D.schedule.map(s =>
        '<div class="timings__row" data-key="' + s.key + '">' +
          '<span class="timings__ico">' + svg(s.icon) + '</span>' +
          '<span><span class="timings__name">' +
            '<span data-en>' + s.name + '</span><span data-gu class="gu">' + s.nameGu + '</span>' +
          '</span><br><span class="timings__desc">' + s.desc + '</span></span>' +
          '<span class="timings__time">' + pretty(s.t) + '</span>' +
        '</div>'
      ).join('') +
      '<div class="countdown">' +
        '<span class="countdown__label">Next in the derasar</span>' +
        '<span class="countdown__val" data-countdown>—</span>' +
      '</div>';

    const out = $('[data-countdown]', host);
    const tick = () => {
      const n = istNow();
      const nx = nextEvent(n.mins);
      $$('.timings__row', host).forEach(r => r.classList.toggle('is-next', r.dataset.key === nx.s.key));
      const h = Math.floor(nx.in / 60), m = nx.in % 60;
      out.textContent = nx.s.name + ' — in ' + (h ? h + ' hr ' : '') + m + ' min';
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- hero slideshow ----------------------------------------- */
  function initHero() {
    const media = $('.hero__media');
    if (!media) return;
    const slides = $$('img', media);
    const dots   = $('.hero__dots');
    if (slides.length < 2) { slides.forEach(s => s.classList.add('is-active')); return; }
    let i = 0, timer;
    if (dots) {
      dots.innerHTML = slides.map((_, k) =>
        '<button type="button" role="tab" aria-selected="' + (k === 0) +
        '" aria-label="Photograph ' + (k + 1) + '"></button>').join('');
    }
    const go = k => {
      i = (k + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
      if (dots) $$('button', dots).forEach((b, n) => b.setAttribute('aria-selected', String(n === i)));
    };
    const play = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 7000); };
    if (dots) $$('button', dots).forEach((b, k) => b.addEventListener('click', () => { go(k); play(); }));
    go(0); play();
  }

  /* ---------- gallery + lightbox ------------------------------------- */
  function initGallery() {
    const host = $('[data-gallery]');
    if (!host) return;
    const limit = parseInt(host.dataset.limit || '0', 10);
    const items = limit ? D.gallery.slice(0, limit) : D.gallery;

    host.innerHTML = items.map((g, i) =>
      '<figure class="shot' + (g.tall && !limit ? ' is-tall' : '') + '" data-cat="' + g.cat + '" data-i="' + i + '">' +
        '<img src="assets/img/thumb/' + g.f + '.jpg" alt="' + g.cap.replace(/"/g, '&quot;') + '" loading="lazy" decoding="async" width="720" height="540">' +
        '<figcaption>' + g.cap + '</figcaption>' +
      '</figure>').join('');

    /* filters */
    $$('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      $$('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      $$('.shot', host).forEach(f => { f.hidden = !(cat === 'all' || f.dataset.cat === cat); });
    }));

    /* lightbox */
    const box = $('.lbox');
    if (!box) return;
    const img  = $('.lbox__stage img', box);
    const cap  = $('.lbox__cap', box);
    const cnt  = $('.lbox__count', box);
    let cur = 0, opener = null;

    const show = k => {
      cur = (k + items.length) % items.length;
      const g = items[cur];
      img.src = 'assets/img/' + g.f + '.jpg';
      img.alt = g.cap;
      cap.textContent = g.cap;
      cnt.textContent = (cur + 1) + ' / ' + items.length;
    };
    const open = k => {
      opener = document.activeElement;
      show(k); box.dataset.open = 'true';
      document.body.style.overflow = 'hidden';
      $('.lbox__close', box).focus();
    };
    const close = () => {
      box.dataset.open = 'false';
      document.body.style.overflow = '';
      if (opener) opener.focus();
    };
    $$('.shot', host).forEach(f => {
      f.tabIndex = 0;
      f.setAttribute('role', 'button');
      f.addEventListener('click', () => open(+f.dataset.i));
      f.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(+f.dataset.i); }
      });
    });
    $('.lbox__close', box).addEventListener('click', close);
    $('.lbox__prev',  box).addEventListener('click', () => show(cur - 1));
    $('.lbox__next',  box).addEventListener('click', () => show(cur + 1));
    box.addEventListener('click', e => { if (e.target === box || e.target.classList.contains('lbox__stage')) close(); });
    addEventListener('keydown', e => {
      if (box.dataset.open !== 'true') return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  /* ---------- reviews ------------------------------------------------ */
  function initReviews() {
    const host = $('[data-reviews]');
    if (!host) return;
    host.innerHTML = D.reviews.map(r =>
      '<article class="review">' +
        '<div class="review__stars" aria-label="' + r.stars + ' out of 5">' + '★'.repeat(r.stars) + '</div>' +
        '<blockquote>“' + r.text + '”</blockquote>' +
        '<div class="review__who"><span class="review__av">' + r.who.charAt(0) + '</span>' +
          '<span><strong>' + r.who + '</strong><br>' + r.meta + '</span></div>' +
      '</article>').join('');
  }

  /* ---------- festivals timeline ------------------------------------- */
  function initFestivals() {
    const host = $('[data-festivals]');
    if (!host) return;
    host.innerHTML = D.festivals.map(f =>
      '<li><span class="timeline__dot">' + svg('lotus') + '</span>' +
        '<span class="timeline__when">' + f.when + '</span>' +
        '<h3>' + f.name + '</h3><p>' + f.note + '</p></li>').join('');
  }

  /* ---------- seva cards -------------------------------------------- */
  function initSevas() {
    const host = $('[data-sevas]');
    if (!host) return;
    host.innerHTML = D.sevas.map(s =>
      '<article class="card card--lift">' +
        '<span class="card__ico">' + svg('kalash') + '</span>' +
        '<h3>' + s.name + '</h3>' +
        '<p class="gu" style="color:var(--ink-faint);margin-bottom:.5em;font-size:.95rem">' + s.gu + '</p>' +
        '<p>' + s.note + '</p></article>').join('');
    const sel = $('[data-seva-options]');
    if (sel) {
      D.sevas.forEach(s => {
        const o = document.createElement('option');
        o.value = s.name; o.textContent = s.name;
        sel.appendChild(o);
      });
    }
  }

  /* ---------- Navkar Mantra japa counter ----------------------------- */
  function initJapa() {
    const root = $('[data-japa]');
    if (!root) return;
    const KEY = 'derasar.japa';
    const BEADS = 108;
    let count = 0;
    try { count = parseInt(localStorage.getItem(KEY) || '0', 10) || 0; } catch (e) {}

    const prog = $('.japa__prog', root);
    const num  = $('.japa__num b', root);
    const mala = $('.japa__mala', root);
    const C    = 2 * Math.PI * 92;
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
      if (navigator.vibrate && count % BEADS === 0) navigator.vibrate(120);
    });
    const reset = $('[data-japa-reset]', root);
    if (reset) reset.addEventListener('click', () => { count = 0; draw(); });
    draw();
  }

  /* ---------- forms: validate, then hand off to WhatsApp / e-mail ---- */
  function initForms() {
    $$('form[data-handoff]').forEach(form => {
      const ok = $('.form-ok', form.parentElement) || $('.form-ok', form);
      form.addEventListener('submit', e => {
        e.preventDefault();
        let bad = null;
        $$('.field', form).forEach(f => {
          const input = $('input, select, textarea', f);
          if (!input) return;
          const invalid = input.required && !String(input.value).trim() ||
                          (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value)) ||
                          (input.type === 'tel'   && input.value && !/^[0-9+\-\s()]{7,}$/.test(input.value));
          f.dataset.invalid = String(!!invalid);
          if (invalid && !bad) bad = input;
        });
        if (bad) { bad.focus(); return; }

        const data = new FormData(form);
        const lines = [];
        lines.push(form.dataset.subject || 'Enquiry from the derasar website');
        for (const [k, v] of data.entries()) {
          if (String(v).trim()) lines.push(k.replace(/_/g, ' ') + ': ' + v);
        }
        const body = lines.join('\n');
        /* A form may offer more than one route out — the button that was
           pressed decides, falling back to the form's own default. */
        const via = (e.submitter && e.submitter.dataset.via) || form.dataset.handoff;
        const url = via === 'mail'
          ? 'mailto:?subject=' + encodeURIComponent(lines[0]) + '&body=' + encodeURIComponent(body)
          : 'https://wa.me/' + D.info.phoneRaw.replace(/\D/g, '') + '?text=' + encodeURIComponent(body);

        if (ok) {
          ok.dataset.show = 'true';
          $('[data-ok-text]', ok).innerHTML =
            'Thank you. Your message is ready to send — the ' +
            (via === 'mail' ? 'e-mail' : 'WhatsApp') + ' window should have opened. ' +
            'If it did not, please call <a href="tel:' + D.info.phoneRaw + '">' + D.info.phone + '</a>.';
          ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        window.open(url, '_blank', 'noopener');
        form.reset();
      });
    });
  }

  /* ---------- scroll reveal ----------------------------------------- */
  function initReveal() {
    const els = $$('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) ||
        matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    els.forEach((e, i) => { e.style.transitionDelay = Math.min(i % 4, 3) * 90 + 'ms'; io.observe(e); });

    /* Safety net: if nothing has been revealed a few seconds in — a hidden
       tab, a throttled observer — stop hiding and show everything. */
    setTimeout(() => {
      if (!document.querySelector('.reveal.is-in')) {
        document.documentElement.classList.remove('js-reveal');
      }
    }, 4000);
  }

  /* ---------- back to top + share ----------------------------------- */
  function initMisc() {
    const top = $('.to-top');
    if (top) {
      const onScroll = () => { top.dataset.show = String(window.scrollY > 700); };
      onScroll();
      addEventListener('scroll', onScroll, { passive: true });
      top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
    }
    $$('[data-share]').forEach(btn => btn.addEventListener('click', async () => {
      const payload = { title: D.info.name, text: D.info.name + ' — ' + D.info.address, url: location.href };
      try {
        if (navigator.share) { await navigator.share(payload); return; }
        await navigator.clipboard.writeText(location.href);
        btn.setAttribute('title', 'Link copied');
      } catch (e) { /* user dismissed */ }
    }));
    /* stamp the year */
    $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- boot --------------------------------------------------- */
  function boot() {
    initLang(); initMode(); initHeader();
    initTimings(); initStatus(); initHero();
    initGallery(); initReviews(); initFestivals(); initSevas();
    initJapa(); initForms(); initMisc();
    paintIcons(document);
    initReveal();
  }
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
  else boot();
})();
