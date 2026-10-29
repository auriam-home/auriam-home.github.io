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
  var heroEl = null, heroIO = null, heroVis = false;
  function heroWatch() {
    var h = app.querySelector('.hero');
    if (h === heroEl) return;
    heroEl = h;
    if (heroIO) heroIO.disconnect();
    if (!h) { document.body.classList.remove('lf-hero'); return; }
    if (!('IntersectionObserver' in window)) return;
    heroIO = new IntersectionObserver(function (es) {
      heroVis = es[0].isIntersecting;
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

  /* bande 3D : maison mobile, conteneur maritime, conteneur bureau (un tour chacun) */
  var M3 = {
    fr: ['Maison mobile', 'Conteneur maritime', 'Conteneur bureau'],
    en: ['Mobile home', 'Shipping container', 'Office container']
  };
  var b3 = { i: 0, t: 0, drag: 0, dragging: false, vis: false, built: -1, last: 0, el: null };
  function sh(hex, k) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function c(v) { return Math.max(0, Math.min(255, Math.round(v * k))); }
    return 'rgb(' + c(r) + ',' + c(g) + ',' + c(b) + ')';
  }
  function fc(w, h, tf, css, inner) {
    return '<div class="f" style="width:' + w + 'px;height:' + h + 'px;margin:' + (-h / 2) + 'px 0 0 ' + (-w / 2) + 'px;transform:' + tf + ';' + (css || '') + '">' + (inner || '') + '</div>';
  }
  function box(w, h, d, pos, o) {
    o = o || {};
    function g(k) { return o[k] || {}; }
    function f(k, W, H, tf) { var x = g(k); return fc(W, H, tf, x.css || '', x.inner || ''); }
    return '<div class="g" style="transform:' + pos + '">' +
      f('front', w, h, 'translateZ(' + d / 2 + 'px)') + f('back', w, h, 'rotateY(180deg) translateZ(' + d / 2 + 'px)') +
      f('right', d, h, 'rotateY(90deg) translateZ(' + w / 2 + 'px)') + f('left', d, h, 'rotateY(-90deg) translateZ(' + w / 2 + 'px)') +
      f('top', w, d, 'rotateX(90deg) translateZ(' + h / 2 + 'px)') + f('bottom', w, d, 'rotateX(-90deg) translateZ(' + h / 2 + 'px)') + '</div>';
  }
  function win(x, y, w, h) {
    return '<i class="lw" style="left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px"></i>';
  }
  function mobileHome() {
    var L = 300, W = 112, H = 98, P = 30, B = '#B98F66', Y = -(8 + H / 2);
    var cl = function (k) { return 'background:repeating-linear-gradient(180deg,rgba(0,0,0,.16) 0 1.5px,transparent 1.5px 9px),' + sh(B, k) + ';'; };
    var skirt = '<i style="position:absolute;left:0;right:0;bottom:0;height:9px;background:rgba(40,30,20,.45)"></i>';
    var door = '<i class="ld" style="left:36px;top:24px;width:34px;height:74px"></i>';
    var front = { css: cl(1), inner: door + win(100, 22, 54, 46) + win(180, 22, 54, 46) + win(252, 22, 34, 46) + skirt };
    var back = { css: cl(.9), inner: win(30, 22, 54, 46) + win(122, 22, 54, 46) + win(214, 22, 54, 46) + skirt };
    var end1 = { css: cl(.8), inner: win(36, 22, 40, 46) + skirt }, end2 = { css: cl(.78), inner: win(36, 22, 40, 46) + skirt };
    var roofC = '#58626E', ph = Math.sqrt(W * W / 4 + P * P), a = Math.atan(P / (W / 2)) * 180 / Math.PI, ry = -(8 + H + P / 2);
    var seam = function (k) { return 'background:repeating-linear-gradient(90deg,rgba(255,255,255,.1) 0 2px,transparent 2px 16px),' + sh(roofC, k) + ';'; };
    var tri = function (k) { return 'background:' + sh(B, k) + ';clip-path:polygon(50% 0,100% 100%,0 100%);'; };
    return box(L - 24, 8, W - 28, 'translate3d(0,-4px,0)', { all: 1, front: { css: 'background:#2b3038' }, back: { css: 'background:#2b3038' }, right: { css: 'background:#22262c' }, left: { css: 'background:#22262c' }, top: { css: 'background:#22262c' }, bottom: { css: 'background:#111' } }) +
      box(L, H, W, 'translate3d(0,' + Y + 'px,0)', { front: front, back: back, right: end1, left: end2, top: { css: 'background:' + sh(B, .7) }, bottom: { css: 'background:#222' } }) +
      '<div class="g" style="transform:translate3d(0,' + ry + 'px,' + W / 4 + 'px) rotateX(' + a + 'deg)">' + fc(L + 10, ph, '', seam(1)) + '</div>' +
      '<div class="g" style="transform:translate3d(0,' + ry + 'px,' + -W / 4 + 'px) rotateY(180deg) rotateX(' + a + 'deg)">' + fc(L + 10, ph, '', seam(.78)) + '</div>' +
      '<div class="g" style="transform:translate3d(' + (L / 2) + 'px,' + ry + 'px,0) rotateY(90deg)">' + fc(W, P, '', tri(.8)) + '</div>' +
      '<div class="g" style="transform:translate3d(' + (-L / 2) + 'px,' + ry + 'px,0) rotateY(-90deg)">' + fc(W, P, '', tri(.78)) + '</div>' +
      box(44, 8, 24, 'translate3d(' + (-L / 2 + 53) + 'px,-4px,' + (W / 2 + 12) + 'px)', { all: 1, front: { css: 'background:#8a8f96' }, back: { css: 'background:#6e737a' }, right: { css: 'background:#7a7f86' }, left: { css: 'background:#7a7f86' }, top: { css: 'background:#a5aab1' }, bottom: { css: 'background:#444' } });
  }
  function cont(office) {
    var L = 300, W = 120, H = 128, C = office ? '#E4E8EC' : '#A8452F';
    var rib = function (k) {
      return office
        ? 'background:linear-gradient(180deg,transparent calc(100% - 14px),#1d3556 calc(100% - 14px)),repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 1px,transparent 1px 50px),' + sh(C, k) + ';'
        : 'background:repeating-linear-gradient(90deg,rgba(0,0,0,.26) 0 2px,rgba(255,255,255,.07) 2px 4px,transparent 4px 10px),' + sh(C, k) + ';box-shadow:inset 0 0 0 5px rgba(0,0,0,.28);';
    };
    var logo = '<b class="lg">AURIAM HOME</b>';
    var front, back, rt, lf;
    if (office) {
      front = { css: rib(1), inner: win(34, 28, 78, 52) + win(134, 28, 78, 52) + '<i class="ld" style="left:238px;top:30px;width:44px;height:94px"></i>' };
      back = { css: rib(.92), inner: win(34, 28, 78, 52) + win(134, 28, 78, 52) + win(232, 28, 50, 52) };
      rt = { css: rib(.8), inner: win(30, 34, 60, 50) }; lf = { css: rib(.78), inner: '' };
    } else {
      front = { css: rib(1), inner: logo }; back = { css: rib(.9), inner: logo };
      var dr = function (x) { return '<i class="dr" style="left:' + x + 'px"><u></u></i>'; };
      rt = { css: rib(.8).replace(/background:[^;]+;/, 'background:' + sh(C, .8) + ';'), inner: dr(5) + dr(63) };
      lf = { css: 'background:' + sh(C, .78) + ';box-shadow:inset 0 0 0 5px rgba(0,0,0,.28);' };
    }
    var topC = office ? sh('#C9CFD6', .95) : sh(C, .85);
    var s = box(L, H, W, 'translate3d(0,' + (-H / 2) + 'px,0)', { front: front, back: back, right: rt, left: lf, top: { css: (office ? 'background:' + topC : 'background:repeating-linear-gradient(90deg,rgba(0,0,0,.2) 0 2px,transparent 2px 10px),' + topC) + ';' }, bottom: { css: 'background:#222' } });
    if (office) {
      s += box(74, 4, 30, 'translate3d(' + (L / 2 - 65) + 'px,' + (-H + 28) + 'px,' + (W / 2 + 15) + 'px)', { front: { css: 'background:#1d3556' }, back: { css: 'background:#1d3556' }, right: { css: 'background:#14263F' }, left: { css: 'background:#14263F' }, top: { css: 'background:#2b4a75' }, bottom: { css: 'background:#0d1a2c' } });
      s += box(50, 8, 24, 'translate3d(' + (L / 2 - 65) + 'px,-4px,' + (W / 2 + 12) + 'px)', { front: { css: 'background:#8a8f96' }, back: { css: 'background:#6e737a' }, right: { css: 'background:#7a7f86' }, left: { css: 'background:#7a7f86' }, top: { css: 'background:#a5aab1' }, bottom: { css: 'background:#444' } });
      s += box(14, 30, 36, 'translate3d(' + (-L / 2 - 7) + 'px,' + (-H + 50) + 'px,0)', { front: { css: 'background:#cfd5dc' }, back: { css: 'background:#b9c0c8' }, right: { css: 'background:#aab1ba' }, left: { css: 'background:#9aa2ac;background-image:repeating-linear-gradient(180deg,rgba(0,0,0,.25) 0 2px,transparent 2px 5px)' }, top: { css: 'background:#dfe4ea' }, bottom: { css: 'background:#555' } });
    }
    return s;
  }
  function build3d(st, i) {
    var sc = st.querySelector('.ro');
    sc.innerHTML = [mobileHome, function () { return cont(false); }, function () { return cont(true); }][i]();
    b3.built = i;
  }
  function band3d() {
    var hero = app.querySelector('.hero');
    if (!hero || app.querySelector('.lf-3d')) return;
    var l = document.documentElement.lang === 'en' ? 'en' : 'fr';
    var s = document.createElement('section');
    s.className = 'lf-3d';
    s.setAttribute('aria-label', l === 'en' ? 'Our models in 3D' : 'Nos modèles en 3D');
    s.innerHTML = '<div class="b3w">' +
      '<div class="st"><div class="fl"></div><div class="sc"><div class="sd"></div><div class="ro"></div></div></div>' +
      '<p class="b3n" aria-live="polite"></p><div class="b3d">' + M3[l].map(function (n, k) { return '<button type="button" data-k="' + k + '" aria-label="' + n + '"></button>'; }).join('') + '</div>' +
      '<a class="b3a" href="#/all">' + (l === 'en' ? 'See all products' : 'Voir tous les produits') + ' →</a></div>';
    var st = app.querySelector('.lf-strip');
    (st || hero).parentNode.insertBefore(s, (st || hero).nextSibling);
    b3.built = -1;
    b3io && b3io.observe(s);
  }
  var b3io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { b3.vis = es[0].isIntersecting; }) : null;
  if (!b3io) b3.vis = true;
  var CYC = 8600, INT = 700, OUT = 600;
  function frame3d(now) {
    requestAnimationFrame(frame3d);
    var dt = Math.min(80, now - (b3.last || now)); b3.last = now;
    var s = app.querySelector('.lf-3d'); if (!s) return;
    var st = s.querySelector('.st'), ro = s.querySelector('.ro'), sc = s.querySelector('.sc');
    var w = st.clientWidth; sc.style.setProperty('--k', Math.min(1.15, w / 470).toFixed(3));
    if (!b3.vis && b3.built >= 0) return;
    if (!reduce && !b3.dragging) b3.t += dt;
    if (b3.t >= CYC) { b3.t = 0; b3.i = (b3.i + 1) % 3; }
    if (b3.built !== b3.i) { build3d(st, b3.i); s.querySelector('.b3n').textContent = M3[document.documentElement.lang === 'en' ? 'en' : 'fr'][b3.i]; Array.prototype.forEach.call(s.querySelectorAll('.b3d button'), function (b, k) { b.classList.toggle('on', k === b3.i); }); }
    var t = reduce ? 0.35 * CYC : b3.t, ang, sca = 1, op = 1;
    ang = 25 + 360 * Math.min(1, t / (CYC - OUT)) * 1 + b3.drag;
    var e = Math.min(1, t / INT); sca = 0.78 + 0.22 * (1 - Math.pow(1 - e, 3)); op = e;
    if (t > CYC - OUT) { var o = (t - (CYC - OUT)) / OUT; op = 1 - o; sca = 1 - 0.1 * o; }
    ro.style.transform = 'rotateY(' + ang.toFixed(2) + 'deg) scale(' + sca.toFixed(3) + ')';
    ro.style.opacity = op.toFixed(3);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.lf-3d .b3d button'); if (!b) return;
    b3.i = +b.dataset.k; b3.t = 0; b3.drag = 0;
  });
  (function () {
    var x0 = null;
    document.addEventListener('pointerdown', function (e) { var s = e.target.closest && e.target.closest('.lf-3d .st'); if (!s) return; x0 = e.clientX; b3.dragging = true; });
    addEventListener('pointermove', function (e) { if (x0 === null) return; b3.drag += (e.clientX - x0) * 0.7; x0 = e.clientX; });
    addEventListener('pointerup', function () { x0 = null; b3.dragging = false; });
    addEventListener('pointercancel', function () { x0 = null; b3.dragging = false; });
  })();
  requestAnimationFrame(frame3d);

  /* frise « de l'achat à la livraison » */
  var TL = {
    fr: ['De l’achat à la livraison', [['Choix du modèle', 'Neuf ou d’occasion, maison mobile ou conteneur.'], ['Devis gratuit', 'Valable 30 jours.'], ['Financement', 'Paiement échelonné possible.'], ['Livraison', 'Partout en Europe.'], ['Installation', 'Déchargement et installation offerts.']]],
    en: ['From purchase to delivery', [['Choose your model', 'New or used, mobile home or container.'], ['Free quote', 'Valid for 30 days.'], ['Financing', 'Instalment payment available.'], ['Delivery', 'Across Europe.'], ['Installation', 'Free unloading and installation.']]]
  };
  var TRUCK = '<svg viewBox="0 0 48 28" width="40" height="23" aria-hidden="true"><rect x="1" y="4" width="28" height="15" rx="2" fill="#C98A3D"/><path d="M30 8h9l7 6v5H30z" fill="#14263F"/><path d="M33 10h5l4 4h-9z" fill="#BFD8EA"/><circle cx="10" cy="21" r="4" fill="#14263F" stroke="#fff" stroke-width="1.5"/><circle cx="38" cy="21" r="4" fill="#14263F" stroke="#fff" stroke-width="1.5"/></svg>';
  function timeline() {
    var why = app.querySelector('.why');
    if (!why || app.querySelector('.lf-tl')) return;
    var sec = why.closest('section'); if (!sec) return;
    var l = document.documentElement.lang === 'en' ? 'en' : 'fr', d = TL[l];
    var s = document.createElement('section');
    s.className = 'wrap sec lf-tl';
    s.innerHTML = '<h2>' + d[0] + '</h2><ol class="tl"><li class="tr" aria-hidden="true"><span class="tk">' + TRUCK + '</span></li>' +
      d[1].map(function (x, i) { return '<li style="--i:' + i + '"><b>' + (i + 1) + '</b><div><strong>' + x[0] + '</strong><span>' + x[1] + '</span></div></li>'; }).join('') + '</ol>';
    sec.parentNode.insertBefore(s, sec);
  }
  /* cartes qui s'inclinent */
  (function () {
    var cur = null, rst = 0;
    function tilt(e, el) {
      var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.classList.add('lf-tilt');
      el.style.setProperty('--ry', ((x - .5) * 9).toFixed(2) + 'deg');
      el.style.setProperty('--rx', ((.5 - y) * 9).toFixed(2) + 'deg');
      el.style.setProperty('--gx', (x * 100).toFixed(0) + '%'); el.style.setProperty('--gy', (y * 100).toFixed(0) + '%');
    }
    function off(el) { if (!el) return; el.classList.remove('lf-tilt'); el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); }
    if (reduce) return;
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var el = e.target.closest && e.target.closest('.card,.tile'); if (el && el.closest('.lf-ring')) el = null;
      if (el !== cur) { off(cur); cur = el; }
      if (el) tilt(e, el);
    }, { passive: true });
    document.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse') return;
      var el = e.target.closest && e.target.closest('.card,.tile'); if (!el) return;
      clearTimeout(rst); cur = el; tilt(e, el); rst = setTimeout(function () { off(el); }, 380);
    }, { passive: true });
    document.addEventListener('pointerleave', function () { off(cur); cur = null; });
  })();

  var tlio = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var t = e.target, tl = t.querySelector('.tl');
      if (tl) { t.style.setProperty('--th', (tl.offsetHeight - 36) + 'px'); t.style.setProperty('--tw', (tl.offsetWidth - 44) + 'px'); }
      t.classList.add('lf-go'); tlio.unobserve(t);
    });
  }, { threshold: 0.35 }) : null;
  function tlWatch() {
    var t = app.querySelector('.lf-tl'); if (!t || t.__w) return; t.__w = 1;
    if (tlio) tlio.observe(t); else t.classList.add('lf-go');
  }
  /* chiffres qui défilent (uniquement ceux déjà annoncés sur le site) */
  var CT = {
    fr: [[36, 0, 'mois', 'Financement échelonné jusqu’à'], [30, 0, 'jours', 'Validité de votre devis gratuit'], [7, 10, 'jours', 'En livraison dédiée'], [2, 3, 'semaines', 'En livraison groupée, tarif avantageux']],
    en: [[36, 0, 'months', 'Instalment financing up to'], [30, 0, 'days', 'Validity of your free quote'], [7, 10, 'days', 'With dedicated delivery'], [2, 3, 'weeks', 'With grouped delivery, better rate']]
  };
  function counters() {
    var tl = app.querySelector('.lf-tl');
    if (!tl || app.querySelector('.lf-ct')) return;
    var l = document.documentElement.lang === 'en' ? 'en' : 'fr';
    var s = document.createElement('section');
    s.className = 'lf-ct';
    s.innerHTML = '<div class="ctw">' + CT[l].map(function (c) {
      return '<div><p class="cl">' + c[3] + '</p><p class="cn"><b data-a="' + c[0] + '" data-b="' + c[1] + '">' + (c[1] ? c[0] + '–' + c[1] : c[0]) + '</b> <span>' + c[2] + '</span></p></div>';
    }).join('') + '</div>';
    tl.parentNode.insertBefore(s, tl.nextSibling);
    if (reduce || !('IntersectionObserver' in window)) return;
    Array.prototype.forEach.call(s.querySelectorAll('b'), function (b) { b.textContent = b.dataset.b > 0 ? '0–0' : '0'; });
    var io2 = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      io2.disconnect();
      var t0 = performance.now(), D = 1700;
      (function step(now) {
        var p = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - p, 3);
        Array.prototype.forEach.call(s.querySelectorAll('b'), function (b) {
          var a = +b.dataset.a, c = +b.dataset.b;
          b.textContent = c ? Math.round(a * e) + '–' + Math.round(c * e) : Math.round(a * e);
        });
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }, { threshold: 0.5 });
    io2.observe(s);
  }

  /* catégories en carrousel 3D que l'on fait tourner du doigt */
  var RG = { el: null, tiles: [], pos: 0, vel: 0, drag: false, x0: 0, p0: 0, moved: 0, idle: 0, vis: false, snap: null, hint: null };
  var rgio = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { RG.vis = es[0].isIntersecting; }, { threshold: 0.05 }) : null;
  function catRing() {
    var el = app.querySelector('.tiles');
    if (!el || el.__ring) return;
    var tiles = Array.prototype.slice.call(el.querySelectorAll('.tile'));
    if (tiles.length < 2) return;
    el.__ring = 1; el.classList.add('lf-ring');
    var g = document.createElement('div'); g.className = 'rg';
    tiles.forEach(function (t) { g.appendChild(t); });
    el.appendChild(g);
    var h = document.createElement('p'); h.className = 'rh';
    h.textContent = document.documentElement.lang === 'en' ? 'Drag to rotate' : 'Glissez pour faire tourner';
    el.parentNode.insertBefore(h, el.nextSibling);
    var en = document.documentElement.lang === 'en', ui = document.createElement('div');
    ui.className = 'c3ui';
    ui.innerHTML = '<button type="button" class="c3b" data-d="-1" aria-label="' + (en ? 'Previous' : 'Précédent') + '">‹</button><div class="c3d">' + tiles.map(function () { return '<i></i>'; }).join('') + '</div><button type="button" class="c3b" data-d="1" aria-label="' + (en ? 'Next' : 'Suivant') + '">›</button>';
    el.parentNode.insertBefore(ui, h);
    ui.addEventListener('click', function (e) {
      var b = e.target.closest('.c3b'); if (!b) return;
      RG.vel = 0; RG.snap = Math.round(RG.pos) + (+b.dataset.d); RG.idle = -3; if (RG.hint) RG.hint.style.opacity = '0';
    });
    RG.ui = ui;
    RG.el = el; RG.tiles = tiles; RG.hint = h; RG.pos = 0; RG.vel = 0; RG.snap = null; RG.idle = 0;
    if (rgio) rgio.observe(el); else RG.vis = true;
    ringDraw();
  }
  function ringDraw() {
    var n0 = RG.tiles.length, cu = ((Math.round(RG.pos) % n0) + n0) % n0;
    if (RG.ui) Array.prototype.forEach.call(RG.ui.querySelectorAll('.c3d i'), function (d, i) { d.className = i === cu ? 'on' : ''; });
    var n = RG.tiles.length, fe = Math.min(n / 2, 2.2), w = RG.el.clientWidth, R = Math.max(300, Math.min(520, w * 0.62));
    RG.tiles.forEach(function (t, i) {
      var d = ((i - RG.pos) % n + n) % n; if (d > n / 2) d -= n;
      var a = Math.abs(d), op = Math.max(0, Math.min(1, (fe - a) / (fe - 1)));
      t.style.transform = 'translateX(' + (d * (w < 520 ? 150 : 250)).toFixed(1) + 'px) translateZ(' + (-a * 90).toFixed(1) + 'px) rotateY(' + (-d * 28).toFixed(2) + 'deg) scale(' + (1 - Math.min(a, 1.5) * 0.06).toFixed(3) + ')';
      t.style.opacity = op.toFixed(3);
      t.style.zIndex = String(Math.round(100 - a * 10));
      t.style.filter = a > 0.05 ? 'brightness(' + (1 - Math.min(a, 1) * 0.22).toFixed(2) + ')' : 'none';
      t.style.pointerEvents = op < 0.2 ? 'none' : '';
    });
  }
  function ringLoop(now) {
    requestAnimationFrame(ringLoop);
    if (!RG.el || !RG.el.isConnected) { RG.el = null; return; }
    if (!RG.vis) return;
    var dt = Math.min(50, now - (RG.last || now)) / 1000; RG.last = now;
    var n = RG.tiles.length;
    if (!RG.drag) {
      if (RG.snap !== null) {
        RG.pos += (RG.snap - RG.pos) * Math.min(1, dt * 9);
        if (Math.abs(RG.snap - RG.pos) < 0.002) { RG.pos = RG.snap; RG.snap = null; }
      } else if (Math.abs(RG.vel) > 0.05) {
        RG.pos += RG.vel * dt; RG.vel *= Math.pow(0.04, dt);
        if (Math.abs(RG.vel) <= 0.35) RG.snap = Math.round(RG.pos);
      } else if (!reduce) {
        RG.idle += dt;
        if (RG.idle > 3.6) { RG.idle = 0; RG.snap = Math.round(RG.pos) + 1; }
      }
    }
    RG.pos = ((RG.pos % n) + n) % n === RG.pos ? RG.pos : RG.pos;
    ringDraw();
  }
  (function () {
    function down(e) {
      var el = e.target.closest && e.target.closest('.tiles.lf-ring'); if (!el || (e.pointerType === 'mouse' && e.button !== 0)) return;
      RG.drag = true; RG.x0 = e.clientX; RG.p0 = RG.pos; RG.moved = 0; RG.vel = 0; RG.snap = null; RG.lx = e.clientX; RG.lt = performance.now(); RG.idle = 0;
      el.classList.add('lf-grab');
    }
    function move(e) {
      if (!RG.drag) return;
      var step = RG.el.clientWidth < 520 ? 110 : 170, dx = e.clientX - RG.x0;
      RG.moved = Math.max(RG.moved, Math.abs(dx));
      var np = RG.p0 - dx / step, now = performance.now(), dtm = Math.max(8, now - RG.lt) / 1000;
      RG.vel = RG.vel * 0.6 + ((np - RG.pos) / dtm) * 0.4; RG.pos = np; RG.lt = now;
      if (RG.hint) RG.hint.style.opacity = '0';
    }
    function up() {
      if (!RG.drag) return; RG.drag = false;
      if (RG.el) RG.el.classList.remove('lf-grab');
      if (RG.moved > 8) { RG.snap = null; if (Math.abs(RG.vel) < 0.6) RG.snap = Math.round(RG.pos); }
      RG.idle = -3;
    }
    document.addEventListener('pointerdown', down, { passive: true });
    addEventListener('pointermove', move, { passive: true });
    addEventListener('pointerup', up); addEventListener('pointercancel', up);
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('.tiles.lf-ring .tile'); if (!t) return;
      if (RG.moved > 8) { e.preventDefault(); e.stopPropagation(); RG.moved = 0; return; }
      var i = RG.tiles.indexOf(t), n = RG.tiles.length, d = ((i - RG.pos) % n + n) % n; if (d > n / 2) d -= n;
      if (Math.abs(d) > 0.4) { e.preventDefault(); e.stopPropagation(); RG.vel = 0; RG.snap = Math.round(RG.pos + d); RG.idle = -3; }
    }, true);
    requestAnimationFrame(ringLoop);
  })();

  function scan() {
    strip(); band3d(); timeline(); counters(); catRing(); tlWatch(); quoteBtn(); panel(); gallery(); logos(); heroWatch(); mailBtn(); menu();
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

  /* profondeur de l'en-tête : 3 plans (photo au fond, texte au milieu, panneau devant) */
  var tgt = { x: 0, y: 0 }, cur3 = { x: 0, y: 0 }, loop3 = 0;
  function setPtr(cx, cy) {
    if (!heroEl) return;
    var r = heroEl.getBoundingClientRect();
    tgt.x = Math.max(-1, Math.min(1, (cx - r.left) / r.width * 2 - 1));
    tgt.y = Math.max(-1, Math.min(1, (cy - r.top) / r.height * 2 - 1));
  }
  if (!reduce) {
    addEventListener('mousemove', function (e) { setPtr(e.clientX, e.clientY); }, { passive: true });
    addEventListener('touchmove', function (e) { if (heroVis && e.touches[0]) setPtr(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    addEventListener('touchend', function () { tgt.x = 0; tgt.y = 0; }, { passive: true });
    var asked = false;
    addEventListener('touchend', function () {
      if (asked) return; asked = true;
      try { if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') DeviceOrientationEvent.requestPermission().catch(function () {}); } catch (e) {}
    }, { passive: true });
    addEventListener('deviceorientation', function (e) {
      if (e.gamma == null || !heroVis) return;
      tgt.x = Math.max(-1, Math.min(1, e.gamma / 22));
      tgt.y = Math.max(-1, Math.min(1, ((e.beta || 50) - 50) / 22));
    }, { passive: true });
    (function frame() {
      loop3 = requestAnimationFrame(frame);
      if (!heroEl || !heroVis) return;
      cur3.x += (tgt.x - cur3.x) * 0.08; cur3.y += (tgt.y - cur3.y) * 0.08;
      var H = heroEl.offsetHeight, p = Math.max(0, Math.min(H, -heroEl.getBoundingClientRect().top));
      var back = heroEl.querySelector('.im'), mid = heroEl.querySelector('.t'), front = heroEl.querySelector('.cta');
      var sy = Math.min(p * 0.12, H * 0.05);
      if (back) back.style.translate = (-cur3.x * 12).toFixed(2) + 'px ' + (sy - cur3.y * 8).toFixed(2) + 'px';
      if (mid) mid.style.translate = (cur3.x * 5).toFixed(2) + 'px ' + (cur3.y * 3 - p * 0.03).toFixed(2) + 'px';
      if (front) {
        front.style.translate = (cur3.x * 12).toFixed(2) + 'px ' + (cur3.y * 8 - p * 0.05).toFixed(2) + 'px';
        front.style.setProperty('--gx', ((cur3.x + 1) * 50).toFixed(1) + '%');
        front.style.setProperty('--gy', ((cur3.y + 1) * 50).toFixed(1) + '%');
      }
    })();
  }

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
