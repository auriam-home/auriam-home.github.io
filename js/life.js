/* AURIAM HOME : mouvement et vie. S'ajoute au site sans toucher à son code. */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var app = document.getElementById('app');
  if (!app) return;

  var STRIP = {
    fr: ['Livraison dans toute l’Europe', 'Installation et déchargement offerts', 'Financement échelonné jusqu’à 36 mois', 'Devis gratuit, valable 30 jours', 'Visites au parc d’exposition de Périgueux'],
    en: ['Delivery across Europe', 'Free unloading and installation', 'Instalment financing up to 36 months', 'Free quote, valid for 30 days', 'Showroom visits in Périgueux']
  };
  var SEL = '.sec>h2,.card,.tile,.why>div,details,.band,.vd,.steps>div,.tem,.doc h2,.spec,.lst-t';
  var io = null;
  if (!reduce && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('lf-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  }

  function strip() {
    var hero = app.querySelector('.hero');
    if (!hero || app.querySelector('.lf-strip')) return;
    var l = document.documentElement.lang === 'en' ? 'en' : 'fr';
    var items = STRIP[l].map(function (s) { return '<span>' + s + '</span>'; }).join('');
    var d = document.createElement('div');
    d.className = 'lf-strip'; d.setAttribute('aria-label', l === 'en' ? 'Our commitments' : 'Nos engagements');
    d.innerHTML = '<div class="lf-track">' + items + (reduce ? '' : items) + '</div>';
    hero.parentNode.insertBefore(d, hero.nextSibling);
  }

  function quoteBtn() {
    var b = app.querySelector('.hero .cta .btn.line');
    if (!b || b.__q) return;
    b.__q = 1;
    b.textContent = document.documentElement.lang === 'en' ? 'Request a quote' : 'Demander un devis';
    b.setAttribute('href', '#/contact');
    b.removeAttribute('target'); b.removeAttribute('rel');
  }
  function panel() {
    var cta = app.querySelector('.hero .cta');
    if (!cta || cta.querySelector('.lf-lb')) return;
    var en = document.documentElement.lang === 'en';
    var a = document.createElement('div'); a.className = 'lf-lb'; a.textContent = en ? 'New and used' : 'Neufs et d’occasion';
    var z = document.createElement('div'); z.className = 'lf-nt'; z.textContent = en ? 'Free quote, valid for 30 days' : 'Devis gratuit, valable 30 jours';
    cta.insertBefore(a, cta.firstChild); cta.appendChild(z);
  }

  /* logo officiel : utilisé seulement si les fichiers existent, sinon le logo actuel reste.
     Les marges vides sont rognées et le fond uni est retiré automatiquement. */
  var LG = { s: null, f: null, c: null };
  function dist(d, i, c) { return Math.abs(d[i] - c[0]) + Math.abs(d[i + 1] - c[1]) + Math.abs(d[i + 2] - c[2]); }
  function prep(im, key) {
    try {
      var sc = Math.min(1, 1400 / Math.max(im.naturalWidth, im.naturalHeight));
      var w = Math.round(im.naturalWidth * sc), h = Math.round(im.naturalHeight * sc);
      var cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      var cx = cv.getContext('2d'); cx.drawImage(im, 0, 0, w, h);
      var d = cx.getImageData(0, 0, w, h).data;
      var c = [d[0], d[1], d[2]], tr = d[3] < 20, x, y, i;
      var x0 = w, y0 = h, x1 = -1, y1 = -1;
      for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
        i = (y * w + x) * 4;
        var solid = tr ? d[i + 3] > 20 : dist(d, i, c) > 45;
        if (solid) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      }
      if (x1 < 0) return null;
      var ow = x1 - x0 + 1, oh = y1 - y0 + 1;
      function variant(keyBg, light) {
        var cp = new Uint8ClampedArray(d), j;
        for (j = 0; j < cp.length; j += 4) {
          if (keyBg && !tr) {
            var k = dist(cp, j, c);
            cp[j + 3] = k <= 40 ? 0 : k < 110 ? Math.round((k - 40) / 70 * 255) : 255;
          }
          if (light && cp[j + 3] > 0) {
            var r = cp[j], g = cp[j + 1], bl = cp[j + 2];
            if (!(r > 130 && r - bl > 35)) {
              var lum = 0.3 * r + 0.59 * g + 0.11 * bl;
              if (lum < 100) { cp[j] = 255; cp[j + 1] = 255; cp[j + 2] = 255; } else { cp[j] = 205; cp[j + 1] = 214; cp[j + 2] = 228; }
            }
          }
        }
        var t = document.createElement('canvas'); t.width = w; t.height = h;
        t.getContext('2d').putImageData(new ImageData(cp, w, h), 0, 0);
        var o = document.createElement('canvas'); o.width = ow; o.height = oh;
        o.getContext('2d').drawImage(t, x0, y0, ow, oh, 0, 0, ow, oh);
        return o.toDataURL('image/png');
      }
      return { url: variant(!!key, false), light: variant(true, true), transparent: tr || !!key, bg: tr ? null : 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')' };
    } catch (e) { return null; }
  }
  function probe(base, k) {
    var ex = ['png', 'jpg', 'jpeg', 'webp'], n = 0;
    (function next() {
      if (n >= ex.length) return;
      var im = new Image(), src = base + '.' + ex[n];
      im.onload = function () { var r = prep(im, k === 's'); LG[k] = r || { url: src, transparent: false, bg: null }; queue(); };
      im.onerror = function () { n++; next(); };
      im.src = src;
    })();
  }
  probe('logo-symbole', 's'); probe('logo-complet', 'f'); probe('logo-clair', 'c');
  function logos() {
    if (LG.s) {
      var lg = app.querySelector('.top .logo');
      if (lg && !lg.classList.contains('lf-st')) {
        var v = lg.querySelector('svg');
        if (v) {
          var im = document.createElement('img'); im.src = LG.s.url; im.alt = ''; im.className = 'lf-logo';
          lg.replaceChild(im, v); lg.classList.add('lf-st');
        }
      }
    }
    var src = null, dark = false, bg = null;
    if (LG.c && LG.c.transparent && LG.c.bg === null) { src = LG.c.url; dark = true; }
    else if (LG.f && LG.f.light) { src = LG.f.light; dark = true; }
    else if (LG.f || LG.c) { var q = LG.f || LG.c; src = q.url; bg = q.bg; }
    if (src) {
      var f = app.querySelector('.foot .wrap>div:first-child');
      if (f && !f.querySelector('.lf-flogo')) {
        var d = document.createElement('div'); d.className = 'lf-flogo' + (dark ? ' lf-dark' : '');
        if (bg) d.style.background = bg;
        d.innerHTML = '<img src="' + src + '" alt="AURIAM HOME">';
        f.insertBefore(d, f.firstChild);
      }
    }
  }

  function gallery() {
    var on = app.querySelector('.pd .th button.on');
    if (!on || on.__g) return;
    on.__g = 1;
    var c = on.parentNode;
    c.scrollLeft = on.offsetLeft - (c.clientWidth - on.offsetWidth) / 2;
  }

  /* le bouton WhatsApp flottant se met en retrait tant que l'accueil est à l'écran */
  var heroEl = null, heroIO = null;
  function heroWatch() {
    var h = app.querySelector('.hero');
    if (h === heroEl) return;
    heroEl = h;
    if (heroIO) heroIO.disconnect();
    if (!h) { document.body.classList.remove('lf-hero'); return; }
    if (!('IntersectionObserver' in window)) return;
    heroIO = new IntersectionObserver(function (es) {
      document.body.classList.toggle('lf-hero', es[0].intersectionRatio > 0.3);
    }, { threshold: [0, 0.3, 0.6, 1] });
    heroIO.observe(h);
  }

  /* bouton e-mail flottant, au-dessus de WhatsApp */
  function mailBtn() {
    var en = document.documentElement.lang === 'en';
    var a = app.querySelector('.lf-mail');
    if (!a) {
      a = document.createElement('a'); a.className = 'lf-mail';
      a.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
      app.appendChild(a);
    }
    var m = app.querySelector('.foot a[href^="mailto:"]');
    a.setAttribute('href', m ? m.getAttribute('href') : '#/contact');
    a.setAttribute('aria-label', en ? 'Email us' : 'Nous écrire par e-mail');
    a.setAttribute('title', en ? 'Email us' : 'Nous écrire par e-mail');
  }

  /* menu : langue en haut, rubriques regroupées, bouton devis en bas */
  function menu() {
    var dr = app.querySelector('.ov .dr');
    if (!dr || dr.__lm) return;
    dr.__lm = 1;
    var en = document.documentElement.lang === 'en';
    var head = dr.firstElementChild, lang = dr.querySelector('.lang'), lab = lang && lang.previousElementSibling;
    if (!head || !lang || !lab) return;
    dr.classList.add('lf-dr');
    var row = document.createElement('div'); row.className = 'lf-langrow';
    row.appendChild(lab); row.appendChild(lang);
    dr.insertBefore(row, head.nextSibling);
    function title(txt, before) { var t = document.createElement('div'); t.className = 'lf-mt'; t.textContent = txt; dr.insertBefore(t, before); }
    var firstProd = dr.querySelector('a.l[href^="#/c/"],a.l[href="#/all"]'), firstInfo = dr.querySelector('a.l[href="#/livraison"]');
    if (firstProd) title(en ? 'Our products' : 'Nos produits', firstProd);
    if (firstInfo) title(en ? 'Information' : 'Informations', firstInfo);
    var cta = document.createElement('a'); cta.className = 'lf-mcta'; cta.setAttribute('href', '#/contact'); cta.setAttribute('data-act', 'close');
    cta.textContent = en ? 'Request a quote' : 'Demander un devis';
    dr.appendChild(cta);
    Array.prototype.forEach.call(dr.querySelectorAll('a.l,.lf-mt'), function (el, i) { el.style.setProperty('--i', i); });
  }

  function scan() {
    strip(); quoteBtn(); panel(); gallery(); logos(); heroWatch(); mailBtn(); menu();
    if (!io) return;
    var list = app.querySelectorAll(SEL), n = 0;
    Array.prototype.forEach.call(list, function (el) {
      if (el.__lf) return;
      el.__lf = 1;
      var r = el.getBoundingClientRect();
      var near = r.top < innerHeight * 0.9 && r.bottom > 0;
      if (near && el.closest('.hero')) return;
      el.classList.add('lf-pre');
      el.style.transitionDelay = (n++ % 4) * 70 + 'ms';
      io.observe(el);
    });
  }

  var queued = false;
  function queue() { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; scan(); }); }
  new MutationObserver(queue).observe(app, { childList: true, subtree: true });
  queue();

  /* galerie : glisser le doigt pour changer de photo */
  var sx = null, sy = 0, zoom = false;
  document.addEventListener('touchstart', function (e) {
    var t = e.target.closest && e.target.closest('.box img,.pd .main');
    if (!t || e.touches.length !== 1) { sx = null; return; }
    zoom = !!t.closest('.box');
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    sx = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    var dir = dx < 0 ? 1 : -1, b;
    if (zoom) { b = document.querySelector(dir > 0 ? '.box .n' : '.box .p'); if (b) b.click(); return; }
    var th = Array.prototype.slice.call(document.querySelectorAll('.pd .th button'));
    var i = th.indexOf(document.querySelector('.pd .th button.on'));
    if (th.length > 1 && i > -1) th[(i + dir + th.length) % th.length].click();
  }, { passive: true });

  /* en-tête avec ombre au défilement */
  function sc() { document.body.classList.toggle('lf-scrolled', window.scrollY > 8); }
  addEventListener('scroll', sc, { passive: true }); sc();

  /* transition entre pages */
  addEventListener('hashchange', function () {
    if (reduce) return;
    var m = document.getElementById('main'); if (!m) return;
    m.classList.remove('lf-pg'); void m.offsetWidth; m.classList.add('lf-pg');
  });

  /* témoignages qui défilent d'eux-mêmes */
  if (!reduce) {
    var hover = false;
    app.addEventListener('mouseover', function (e) { if (e.target.closest && e.target.closest('#tm')) hover = true; });
    app.addEventListener('mouseout', function () { hover = false; });
    setInterval(function () {
      var tm = document.getElementById('tm'), nx = tm && tm.querySelector('[data-act="tnext"]');
      if (!nx || hover || document.hidden) return;
      var r = tm.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) nx.click();
    }, 8000);
  }
})();
