/* AURIAM HOME – animation d'en-tête : dessin « en direct » d'une maison mobile, bandeau défilant, livraison, logo. */
(function () {
  'use strict';
  var TOTAL = 19.4, played = false, HA = window.HA = {};
  function cl(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function sm(x) { x = cl(x, 0, 1); return x * x * x * (x * (6 * x - 15) + 10); }
  function seg(t, a, b) { return sm((t - a) / (b - a)); }
  function lp(a, b, u) { return a + (b - a) * u; }
  var NAVY = '#14263F', CU = '#d99a45', CH = '#e9eef7';

  function ln(d, t, a, dur, w, op) {
    var p = seg(t, a, a + dur); if (p <= 0) return '';
    var o = (op == null ? 1 : op), w2 = w || 3;
    return '<path d="' + d + '" pathLength="1" stroke-dasharray="1" stroke-dashoffset="' + (1 - p) + '" stroke="' + CH + '" stroke-width="' + w2 + '" opacity="' + o + '"/>' +
      '<path d="' + d + '" pathLength="1" stroke-dasharray="1" stroke-dashoffset="' + (1 - p) + '" stroke="' + CH + '" stroke-width="1.2" opacity="' + (o * .5) + '" transform="translate(2,1.5)"/>';
  }
  var LAB = ['MAISONS MOBILES', 'CONTENEURS BUREAU', 'MAISONS MODULAIRES'], DIM = [['12 m', '3,5 m'], ['6 m', '2,6 m'], ['10 m', '3 m']];
  var TP = [0.4, 4.3, 8.2], S = 6.2;
  function R(x, y, w, h, f, o) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + f + '"' + (o ? ' ' + o : '') + '/>'; }
  function prod(k, t, t0) {
    var fp = seg(t, t0 + 2.2, t0 + 2.9), lo = lp(1, .28, fp), s = '', i, x;
    function L(d, off, dur, w, op) { return ln(d, t, t0 + off, dur, w, op); }
    if (fp > 0) {
      s += '<g opacity="' + fp + '">';
      if (k === 0) {
        s += R(760, 290, 600, 210, '#c8935c');
        for (i = 790; i < 1360; i += 30) s += R(i, 290, 4, 210, '#a8773f', 'opacity=".5"');
        s += R(748, 272, 624, 18, '#3a3f4a', 'rx="3"') + R(760, 500, 600, 16, '#2a3142') +
          R(790, 330, 130, 100, '#9fd0ef') + R(1200, 330, 130, 100, '#9fd0ef') + R(855, 330, 4, 100, '#1d2330') + R(1265, 330, 4, 100, '#1d2330') +
          R(1010, 350, 100, 150, '#2f3647') + R(1094, 420, 5, 30, CU) + R(985, 500, 150, 10, '#b98c5a');
      } else if (k === 1) {
        s += R(760, 270, 600, 230, '#3d6d8c');
        for (i = 784; i < 1340; i += 24) s += R(i, 294, 6, 194, '#2f566f');
        s += R(760, 282, 600, 12, '#2f566f') + R(760, 488, 600, 12, '#2f566f') + R(760, 500, 600, 16, '#2a3142');
        [[760, 270], [1336, 270], [760, 476], [1336, 476]].forEach(function (c) { s += R(c[0], c[1], 24, 24, '#26384d'); });
        s += R(800, 340, 140, 90, '#9fd0ef') + R(800, 384, 140, 4, '#1d2330') + R(1000, 340, 90, 148, '#e4e7ec') + R(1074, 410, 5, 26, CU) +
          R(1180, 330, 110, 60, '#e6e9ee') + '<circle cx="1235" cy="360" r="20" fill="#9aa0ab"/><circle cx="1235" cy="360" r="6" fill="#4b4f5a"/>';
      } else {
        s += R(700, 310, 700, 190, '#8d939c') + R(1050, 310, 350, 190, '#c8935c');
        for (i = 1066; i < 1400; i += 26) s += R(i, 310, 4, 190, '#a8773f', 'opacity=".55"');
        s += R(680, 290, 740, 20, '#2f3440', 'rx="3"') + R(700, 500, 700, 16, '#2a3142') + R(600, 500, 100, 10, '#b98c5a') +
          R(740, 340, 170, 148, '#9fd0ef') + R(1190, 340, 170, 148, '#9fd0ef') + R(825, 340, 4, 148, '#1d2330') + R(1275, 340, 4, 148, '#1d2330') +
          R(960, 340, 140, 160, '#2f3647') + R(1080, 410, 5, 30, CU);
      }
      s += '</g>';
    }
    s += '<g fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="' + lo + '">';
    if (k === 0) {
      s += L('M760 500 H1360 V516 H760 Z', 0, .5) + L('M760 500 V290 H1360 V500', .3, .8) + L('M748 290 V272 H1372 V290 Z', .9, .5) +
        L('M790 330 h130 v100 h-130 Z M1200 330 h130 v100 h-130 Z', 1.3, .5) + L('M855 330 V430 M1265 330 V430', 1.6, .2, 2.5) +
        L('M1010 500 V350 H1110 V500 M1094 420 V450', 1.6, .4) + L('M985 500 H1135', 1.9, .2);
      for (i = 0, x = 790; x < 1360; x += 30, i++) s += L('M' + x + ' 292 V498', 1.7 + i * .02, .3, 1.6, .35);
    } else if (k === 1) {
      s += L('M760 500 H1360 V516 H760 Z', 0, .4) + L('M760 500 V270 H1360 V500', .2, .8) + L('M760 282 H1360 M760 488 H1360', .8, .4, 2, .8);
      for (i = 0, x = 784; x < 1340; x += 24, i++) s += L('M' + x + ' 294 V488', .8 + i * .02, .3, 1.6, .4);
      s += L('M760 270 h24 v24 h-24z M1336 270 h24 v24 h-24z M760 476 h24 v24 h-24z M1336 476 h24 v24 h-24z', 1.4, .3, 2.2) +
        L('M800 340 h140 v90 h-140z M800 384 h140', 1.5, .4) + L('M1000 340 h90 v148 h-90z', 1.7, .4) + L('M1180 330 h110 v60 h-110z M1255 360 a20 20 0 1 0 -40 0 a20 20 0 1 0 40 0', 1.9, .3);
    } else {
      s += L('M700 500 H1400 V516 H700 Z', 0, .5) + L('M700 500 V310 H1400 V500', .3, .9) + L('M680 310 V290 H1420 V310 Z', .9, .5) +
        L('M740 340 h170 v148 h-170z M1190 340 h170 v148 h-170z', 1.3, .5) + L('M825 340 V488 M1275 340 V488', 1.6, .2, 2.5) +
        L('M960 500 V340 H1100 V500 M1080 410 V440', 1.6, .4) + L('M600 500 H700 M600 450 V500 M600 450 H700', 1.9, .3);
      for (i = 0, x = 1066; x < 1400; x += 26, i++) s += L('M' + x + ' 312 V498', 1.7 + i * .02, .3, 1.6, .35);
    }
    s += '</g>';
    var da = seg(t, t0 + 1.0, t0 + 1.8) * (1 - seg(t, t0 + 2.9, t0 + 3.3));
    if (da > 0) {
      s += '<g fill="none" stroke="' + CU + '" stroke-width="2" opacity="' + da + '"><path d="M760 236 H1360 M760 226 V246 M1360 226 V246 M1404 272 V516 M1394 272 H1414 M1394 516 H1414"/></g>' +
        '<g fill="' + CU + '" font-size="22" font-weight="600" text-anchor="middle" opacity="' + da + '"><text x="1060" y="226">' + DIM[k][0] + '</text><text x="1434" y="400" transform="rotate(90 1434 400)">' + DIM[k][1] + '</text></g>';
    }
    var la = seg(t, t0 + 1.2, t0 + 1.9) * (1 - seg(t, t0 + 2.9, t0 + 3.3));
    if (la > 0) s += '<text x="1060" y="190" text-anchor="middle" font-size="30" font-weight="700" letter-spacing="7" fill="#fff" opacity="' + la + '">' + LAB[k] + '</text>';
    return s;
  }
  function products(t) {
    var s = '', e1 = seg(t, 4.0, 4.6), e2 = seg(t, 7.9, 8.5);
    if (t >= TP[0] && e1 < 1) s += '<g transform="translate(' + (-1500 * e1 * e1) + ',0)">' + prod(0, t, TP[0]) + '</g>';
    if (t >= TP[1] && e2 < 1) s += '<g transform="translate(' + (-1500 * e2 * e2) + ',0)">' + prod(1, t, TP[1]) + '</g>';
    return s;
  }
  function vehicle(t) {
    var sc = lp(1, .5, seg(t, S + 5.6, S + 6.5)), u = cl((t - S - 6.5) / 1.5, 0, 1), tx = 760 * u * u;
    var cab = seg(t, S + 5.8, S + 6.4), s = '';
    s += '<g transform="translate(' + tx + ',0) translate(1060,516) scale(' + sc + ') translate(-1060,-516)">';
    s += prod(2, t, TP[2]);
    if (t > S + 5.2) {
      s += '<g opacity="' + cab + '" transform="translate(' + (40 + (1 - cab) * 40) + ',0)">' +
        '<rect x="1372" y="500" width="130" height="16" rx="3" fill="#2a3142"/>' +
        '<path d="M1380 500 V380 Q1380 360 1400 360 H1450 Q1470 360 1482 390 L1506 440 V500 Z" fill="#f2f2f2"/>' +
        '<path d="M1420 380 H1452 L1478 436 H1420 Z" fill="#9fd0ef"/><rect x="1380" y="468" width="126" height="10" fill="' + CU + '"/></g>';
      var wa = t * 560;
      [780, 1330, 1460, 1510].forEach(function (cx) {
        var op = (cx > 1400 ? cab : 1);
        s += '<g opacity="' + op + '"><circle cx="' + cx + '" cy="490" r="28" fill="#15161c"/><circle cx="' + cx + '" cy="490" r="14" fill="#9aa0ab"/><g transform="rotate(' + wa + ' ' + cx + ' 490)"><rect x="' + (cx - 2) + '" y="466" width="4" height="48" fill="#4b4f5a"/></g></g>';
      });
    }
    s += '</g>';
    if (u > 0 && u < 1) {
      for (var i = 0; i < 6; i++) {
        var y = 430 + i * 14, L = 120 + (i * 53) % 90, x = 1060 + tx - 190 - ((i * 37 + t * 900) % 80);
        s += '<rect x="' + (x - L) + '" y="' + y + '" width="' + L + '" height="3" rx="1.5" fill="#fff" opacity="' + (.5 * Math.sin(Math.PI * u)) + '"/>';
      }
    }
    return s;
  }
  function band(t) {
    var w = 5600 * seg(t, S + 5.0, S + 5.8), sy = lp(1, .05, seg(t, S + 8.3, S + 8.9)), sx = 1 - seg(t, S + 8.9, S + 9.3);
    if (w <= 1 || sx <= 0.005) return '';
    var TXT = 'NEUF &amp; OCCASION   ◆   LIVRAISON EN EUROPE   ◆   PAIEMENT ÉCHELONNÉ   ◆   MAISONS MOBILES   ◆   CONTENEURS   ◆   ';
    var off = ((t - S - 5.0) * (t > S + 6.3 ? 980 : 520)) % 2600, one = '';
    for (var i = 0; i < 4; i++) one += TXT;
    return '<g transform="translate(1060,558) scale(' + sx + ',' + sy + ') translate(-1060,-558)"><clipPath id="hbc"><rect x="-2200" y="516" width="' + w + '" height="84"/></clipPath>' +
      '<g clip-path="url(#hbc)"><rect x="-2200" y="516" width="5600" height="84" fill="' + CU + '"/><rect x="-2200" y="516" width="5600" height="4" fill="#fff" opacity=".35"/>' +
      '<text x="' + (-2600 - off) + '" y="571" font-size="34" font-weight="700" fill="' + NAVY + '" textLength="10400" lengthAdjust="spacing" xml:space="preserve">' + one + '</text></g></g>';
  }
  function finale(t) {
    var s = '', d = seg(t, S + 9.2, S + 9.7), r = seg(t, S + 9.5, S + 10.3), li = seg(t, S + 10.0, S + 10.7), tx = seg(t, S + 10.7, S + 11.5), tg = seg(t, S + 11.2, S + 11.8);
    if (t > S + 9.2 && t < S + 9.8) s += '<circle cx="1060" cy="' + lp(558, 330, d) + '" r="7" fill="' + CU + '"/>';
    if (r > 0) s += '<circle cx="1060" cy="330" r="86" fill="none" stroke="' + CU + '" stroke-width="5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="' + (1 - r) + '" transform="rotate(-90 1060 330)"/>';
    s += '<clipPath id="htc"><rect x="760" y="395" width="' + (600 * tx) + '" height="80"/></clipPath>' +
      '<text x="1060" y="448" text-anchor="middle" font-size="46" font-weight="700" letter-spacing="9" fill="#fff" clip-path="url(#htc)">AURIAM HOME</text>' +
      '<text x="1060" y="490" text-anchor="middle" font-size="19" font-weight="500" letter-spacing="5" fill="' + CU + '" opacity="' + tg + '">MAISONS MOBILES · CONTENEURS</text>';
    return { s: s, li: li };
  }
  HA.draw = function (t) {
    if (!HA.svg) return;
    var f = finale(t), a = HA.dyn;
    var grid = '<rect x="-2200" y="-200" width="5600" height="1100" fill="url(#hgr)" opacity="' + (.9 * seg(t, 0, .8)) + '"/>';
    a.innerHTML = grid + '<g>' + products(t) + vehicle(t) + '</g>' + band(t) + f.s;
    HA.logo.setAttribute('opacity', f.li);
    HA.logo.setAttribute('transform', 'translate(1060,330) scale(' + lp(.7, 1, f.li) + ') translate(-1060,-330)');
    HA.root.style.opacity = 1 - seg(t, S + 12.1, S + 13.0);
  };
  function vb() { return window.innerWidth < 1000 ? '700 170 780 450' : '0 0 1440 640'; }
  function mount() {
    var hero = document.querySelector('#app .hero');
    if (!hero || played || hero.querySelector('.ha')) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { played = true; return; }
    played = true;
    var css = document.createElement('style');
    css.textContent = '.hero .ha{position:absolute;inset:0;z-index:1;background:' + NAVY + ';overflow:hidden;pointer-events:none}' +
      '.hero .ha svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}' +
      '@media(max-width:1000px){.hero .ha svg{height:240px;top:auto;bottom:0}.hero .wrap{padding-bottom:270px!important}}';
    document.head.appendChild(css);
    var d = document.createElement('div'); d.className = 'ha';
    d.innerHTML = '<svg viewBox="' + vb() + '" preserveAspectRatio="xMaxYMax meet" font-family="Poppins,Arial,sans-serif"><defs><pattern id="hgr" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".07"/></pattern></defs><g id="hd"></g><image id="hlg" href="logo-symbole.webp" x="1000" y="270" width="120" height="120" opacity="0"/></svg>';
    hero.insertBefore(d, hero.firstChild);
    HA.root = d; HA.svg = d.querySelector('svg'); HA.dyn = d.querySelector('#hd'); HA.logo = d.querySelector('#hlg');
    addEventListener('resize', function () { if (HA.svg) HA.svg.setAttribute('viewBox', vb()); });
    if (window.__HA_MANUAL) { HA.draw(0); return; }
    var t0 = null;
    (function loop(ts) {
      if (t0 === null) t0 = ts; var t = (ts - t0) / 1000;
      if (t >= TOTAL) { d.remove(); css.remove(); HA.svg = null; return; }
      HA.draw(t); requestAnimationFrame(loop);
    })(performance.now());
  }
  function init() {
    mount();
    var app = document.getElementById('app'); if (!app) return;
    var mo = new MutationObserver(function () { if (played) mo.disconnect(); else mount(); });
    mo.observe(app, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
