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

  /* logo officiel : utilisé seulement si les fichiers existent, sinon le logo actuel reste */
  var LG = { s: null, f: null, c: null };
  function probe(base, k) {
    var ex = ['png', 'jpg', 'jpeg', 'webp'], n = 0;
    (function next() {
      if (n >= ex.length) return;
      var im = new Image(), src = base + '.' + ex[n];
      im.onload = function () { LG[k] = src; queue(); };
      im.onerror = function () { n++; next(); };
      im.src = src;
    })();
  }
  probe('logo-symbole', 's'); probe('logo-complet', 'f'); probe('logo-clair', 'c');
  function logos() {
    if (LG.s) {
      Array.prototype.forEach.call(app.querySelectorAll('.logo svg'), function (v) {
        var im = document.createElement('img'); im.src = LG.s; im.alt = ''; im.className = 'lf-logo'; v.parentNode.replaceChild(im, v);
      });
    }
    if (LG.f || LG.c) {
      var f = app.querySelector('.foot .wrap>div:first-child');
      if (f && !f.querySelector('.lf-flogo')) {
        var d = document.createElement('div'); d.className = 'lf-flogo' + (LG.c ? ' lf-dark' : '');
        d.innerHTML = '<img src="' + (LG.c || LG.f) + '" alt="AURIAM HOME">';
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

  function scan() {
    strip(); quoteBtn(); gallery(); logos();
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
