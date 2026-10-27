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

  function scan() {
    strip(); quoteBtn();
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
