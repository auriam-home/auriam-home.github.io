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
  var LABS = { fr: ['MAISONS MOBILES', 'CONTENEURS BUREAU', 'MAISONS MODULAIRES'], en: ['MOBILE HOMES', 'OFFICE CONTAINERS', 'MODULAR HOMES'] };
  var DIMS = { fr: [['12 m', '3,5 m'], ['6 m', '2,6 m'], ['10 m', '3 m']], en: [['12 m', '3.5 m'], ['6 m', '2.6 m'], ['10 m', '3 m']] };
  function EN() { return (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0; }
  var LAB = { 0: 0 }, DIM = { 0: 0 };
  function langSync() { var l = EN() ? 'en' : 'fr'; LAB = LABS[l]; DIM = DIMS[l]; }
  langSync();
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
    if (t >= TP[0] && e1 < 1) s += '<g transform="translate(' + (-1500 * e1 * e1) + ',0)">' + prod(2, t, TP[0]) + '</g>';
    if (t >= TP[1] && e2 < 1) s += '<g transform="translate(' + (-1500 * e2 * e2) + ',0)">' + prod(1, t, TP[1]) + '</g>';
    return s;
  }
  function wheel(cx, cy, r, a) {
    var g = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#14151b"/><circle cx="' + cx + '" cy="' + cy + '" r="' + (r * .62) + '" fill="#aeb4be"/><circle cx="' + cx + '" cy="' + cy + '" r="' + (r * .2) + '" fill="#e6e9ee"/>';
    for (var i = 0; i < 5; i++) { var q = (a + i * 72) * Math.PI / 180; g += '<circle cx="' + (cx + Math.cos(q) * r * .42).toFixed(1) + '" cy="' + (cy + Math.sin(q) * r * .42).toFixed(1) + '" r="' + (r * .07).toFixed(1) + '" fill="#5a606b"/>'; }
    return g;
  }
  function truck(t, u, vis) {
    var a = t * 520, s = '', i, mv = u > 0 && u < 1;
    s += '<g opacity="' + vis + '">';
    // ombre
    s += '<ellipse cx="1130" cy="584" rx="470" ry="8" fill="#000" opacity=".28"/>';
    // semi-remorque surbaissée
    s += '<rect x="700" y="516" width="700" height="14" fill="#3a3f4a"/><rect x="700" y="530" width="700" height="8" fill="#2a3142"/>' +
      '<rect x="1296" y="538" width="7" height="40" fill="#4b4f5a"/><rect x="1288" y="574" width="23" height="5" fill="#4b4f5a"/>' +
      '<rect x="730" y="528" width="172" height="12" rx="4" fill="#2a3142"/>';
    for (i = 0; i < 3; i++) s += wheel(760 + i * 60, 556, 26, a);
    s += '<rect x="908" y="548" width="5" height="28" fill="#0e0f13"/><rect x="692" y="512" width="10" height="34" fill="#c93a2e"/><rect x="692" y="524" width="10" height="6" fill="#fff"/>';
    for (i = 0; i < 6; i++) s += '<circle cx="' + (930 + i * 80) + '" cy="523" r="3" fill="#f0a830"/>';
    s += '</g>';
    // chargement : la maison mobile sanglée
    s += prod(0, t, TP[2]);
    s += '<g opacity="' + vis + '">';
    s += '<rect x="846" y="272" width="9" height="244" fill="#f0a830" opacity=".9"/><rect x="1262" y="272" width="9" height="244" fill="#f0a830" opacity=".9"/><rect x="843" y="500" width="15" height="8" rx="2" fill="#2a3142"/><rect x="1259" y="500" width="15" height="8" rx="2" fill="#2a3142"/>';
    // tracteur routier
    s += '<rect x="1330" y="530" width="232" height="16" fill="#2a3142"/><rect x="1340" y="520" width="72" height="10" fill="#4b4f5a"/>' +
      '<rect x="1378" y="338" width="8" height="196" rx="3" fill="#aab0ba"/>' +
      '<path d="M1394 532 V404 Q1394 382 1416 382 H1478 Q1498 382 1508 402 L1540 470 Q1550 486 1550 504 V532 Z" fill="#f4f5f7"/>' +
      '<path d="M1396 382 V352 Q1396 342 1410 342 H1452 L1470 382 Z" fill="#dfe3e9"/>' +
      '<path d="M1428 398 H1478 Q1490 398 1497 412 L1520 458 H1428 Z" fill="#8fc4e6"/><path d="M1436 404 L1456 404 L1440 452 H1436Z" fill="#fff" opacity=".35"/>' +
      '<path d="M1428 462 V528" stroke="#c4c9d1" stroke-width="2" fill="none"/><rect x="1434" y="488" width="18" height="5" rx="2" fill="#9aa0ab"/>' +
      '<rect x="1394" y="478" width="156" height="8" fill="#d99a45"/><rect x="1394" y="506" width="156" height="26" fill="#14263F"/>' +
      '<rect x="1538" y="466" width="12" height="36" fill="#c9ced6"/><rect x="1538" y="474" width="12" height="3" fill="#6b7280"/><rect x="1538" y="484" width="12" height="3" fill="#6b7280"/>' +
      '<rect x="1539" y="458" width="11" height="10" rx="3" fill="#fff2c0"/><rect x="1536" y="520" width="28" height="12" rx="3" fill="#2a3142"/>' +
      '<rect x="1500" y="416" width="9" height="30" rx="3" fill="#14263F"/>';
    s += '<circle cx="1432" cy="336" r="6" fill="#f5a623" opacity="' + (.5 + .5 * Math.sin(t * 14)) + '"/>';
    s += '<rect x="1398" y="525" width="104" height="12" rx="5" fill="#2a3142"/>';
    s += wheel(1414, 556, 28, a) + wheel(1466, 556, 28, a) + wheel(1520, 556, 28, a);
    // fumée d'échappement
    for (i = 0; i < 6; i++) {
      var ag = (t * 1.3 + i / 6) % 1, dr = mv ? 90 : 36;
      s += '<circle cx="' + (1382 - ag * dr).toFixed(1) + '" cy="' + (334 - ag * 62).toFixed(1) + '" r="' + (6 + ag * 20).toFixed(1) + '" fill="#cfd5de" opacity="' + (.5 * (1 - ag)).toFixed(2) + '"/>';
    }
    // phares et poussière en roulant
    if (mv) {
      s += '<path d="M1550 462 L1720 430 L1720 510 Z" fill="#ffe9a8" opacity=".14"/>';
      for (i = 0; i < 5; i++) {
        var d = (t * 2.2 + i / 5) % 1;
        s += '<circle cx="' + (700 - d * 150).toFixed(1) + '" cy="' + (572 - d * 18).toFixed(1) + '" r="' + (8 + d * 22).toFixed(1) + '" fill="#e7dfd0" opacity="' + (.5 * (1 - d)).toFixed(2) + '"/>';
      }
    }
    return s + '</g>';
  }
  function vehicle(t) {
    var sc = lp(1, .66, seg(t, S + 5.6, S + 6.5)), u = cl((t - S - 6.5) / 1.6, 0, 1), tx = 800 * u * u;
    var vis = seg(t, S + 5.7, S + 6.4), yb = (u > 0 && u < 1) ? Math.sin(t * 40) * 1.6 : 0, s = '';
    if (vis <= 0) return prod(0, t, TP[2]);
    s += '<g transform="translate(' + tx + ',' + yb + ') translate(1060,582) scale(' + sc + ') translate(-1060,-582)">' + truck(t, u, vis) + '</g>';
    if (u > 0 && u < 1) {
      for (var i = 0; i < 6; i++) {
        var y = 440 + i * 20, L = 130 + (i * 53) % 100, x = 1060 + tx - 330 - ((i * 37 + t * 900) % 80);
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
      '</g></g>';
  }
  function finale(t) {
    var s = '', d = seg(t, S + 9.2, S + 9.7), r = seg(t, S + 9.5, S + 10.3), li = seg(t, S + 10.0, S + 10.7), tx = seg(t, S + 10.7, S + 11.5), tg = seg(t, S + 11.2, S + 11.8);
    if (t > S + 9.2 && t < S + 9.8) s += '<circle cx="1060" cy="' + lp(558, 330, d) + '" r="7" fill="' + CU + '"/>';
    if (r > 0) s += '<circle cx="1060" cy="330" r="86" fill="none" stroke="' + CU + '" stroke-width="5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="' + (1 - r) + '" transform="rotate(-90 1060 330)"/>';
    s += '<clipPath id="htc"><rect x="760" y="395" width="' + (600 * tx) + '" height="80"/></clipPath>' +
      '<text x="1060" y="448" text-anchor="middle" font-size="46" font-weight="700" letter-spacing="9" fill="#fff" clip-path="url(#htc)">AURIAM HOME</text>' +
      '<text x="1060" y="490" text-anchor="middle" font-size="19" font-weight="500" letter-spacing="5" fill="' + CU + '" opacity="' + tg + '">' + (EN() ? 'MOBILE HOMES · CONTAINERS' : 'MAISONS MOBILES · CONTENEURS') + '</text>';
    return { s: s, li: li };
  }
  HA.draw = function (t) {
    if (!HA.svg) return;
    langSync();
    var f = finale(t), a = HA.dyn;
    var grid = '<rect x="-2200" y="-200" width="5600" height="1100" fill="url(#hgr)" opacity="' + (.9 * seg(t, 0, .8)) + '"/>';
    a.innerHTML = grid + '<g>' + products(t) + '</g>' + band(t) + '<g>' + vehicle(t) + '</g>' + f.s;
    HA.logo.setAttribute('opacity', f.li);
    HA.logo.setAttribute('transform', 'translate(1060,330) scale(' + lp(.7, 1, f.li) + ') translate(-1060,-330)');
    HA.root.style.opacity = 1 - seg(t, S + 12.1, S + 13.0);
  };
  function words(hero) {
    var t = hero.querySelector('.t'), h = t && t.querySelector('h1');
    if (!t || !h || t.classList.contains('hx')) return;
    var parts = (h.textContent || '').trim().split(/\s+/), out = '', i;
    for (i = 0; i < parts.length; i++) {
      out += '<span class="hw"><i style="animation-delay:' + (0.55 + i * 0.13).toFixed(2) + 's"></i></span> ';
    }
    h.innerHTML = out;
    var is = h.querySelectorAll('.hw>i');
    for (i = 0; i < is.length; i++) is[i].textContent = parts[i];
    t.classList.add('hx');
  }
  function fixStrip() {
    return;
    var st = document.querySelector('#app .lf-strip'); if (!st) return;
    var b = document.querySelector('#app .lf-3d');
    if (b) {
      if (st.parentNode !== b) { b.appendChild(st); b.classList.add('hs'); }
      st.style.marginTop = '0';
      return;
    }
    st.style.marginTop = '-' + st.offsetHeight + 'px';
  }
  function vb() { return window.innerWidth < 1000 ? '700 170 780 450' : '0 0 1440 640'; }
  function mount() {
    var hero = document.querySelector('#app .hero');
    if (!hero || played || hero.querySelector('.ha')) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { played = true; return; }
    played = true;
    var css = document.createElement('style');
    css.textContent = '.hero .ha{position:absolute;inset:0;z-index:1;background:' + NAVY + ';overflow:hidden;pointer-events:none}' +
      '.hero .ha svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}' +
      '@media(max-width:1000px){.hero .ha svg{height:240px;top:auto;bottom:0}.hero .wrap{padding-bottom:270px!important}}' +
      '@media (prefers-reduced-motion:no-preference){' +
      '.hero .t.hx>.k{animation:hxk 1.1s .15s cubic-bezier(.2,.7,.2,1) both!important}' +
      '@keyframes hxk{from{opacity:0;letter-spacing:.9em}to{opacity:1}}' +
      '.hero .t.hx>h1{animation:none!important;opacity:1!important}' +
      '.hx .hw{display:inline-block;overflow:hidden;vertical-align:top;padding:0 .03em .16em;margin-bottom:-.16em}' +
      '.hx .hw>i{display:inline-block;font-style:normal;opacity:0;transform:translateY(118%) rotate(5deg);transform-origin:0 100%;animation:hxw .9s cubic-bezier(.2,.8,.2,1) forwards}' +
      '@keyframes hxw{to{opacity:1;transform:none}}' +
      '.hero .t.hx>p{animation:hxp 1.1s 1.7s cubic-bezier(.2,.7,.2,1) both!important}' +
      '@keyframes hxp{from{opacity:0;filter:blur(8px);transform:translateY(18px)}to{opacity:1;filter:blur(0);transform:none}}' +
      '.hero .t.hx>.cta{animation:none!important;opacity:1!important}' +
      '.hx .cta>*{animation:hxb .8s cubic-bezier(.2,.9,.3,1.25) both}' +
      '.hx .cta>*:nth-child(1){animation-delay:2.4s}.hx .cta>*:nth-child(2){animation-delay:2.65s}' +
      '@keyframes hxb{from{opacity:0;transform:translateY(18px) scale(.93)}to{opacity:1;transform:none}}}' +
      '.lf-strip{position:relative;z-index:3;background:rgba(20,38,63,.34)!important;-webkit-backdrop-filter:blur(9px) saturate(1.2);backdrop-filter:blur(9px) saturate(1.2);border-top:1px solid rgba(255,255,255,.2)!important;border-bottom:1px solid rgba(255,255,255,.12)}' +
      '.lf-3d>.lf-strip{position:absolute;left:0;right:0;bottom:0;z-index:2}.lf-3d.hs{padding-bottom:84px!important}' +
      '.lf-strip *{text-shadow:0 1px 8px rgba(10,20,36,.55)}';
    document.head.appendChild(css);
    HA.css = css;
    words(hero);
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
    mount(); fixStrip();
    var raf = 0, app = document.getElementById('app'); if (!app) return;
    var mo = new MutationObserver(function () {
      if (!played) mount();
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; fixStrip(); });
    });
    mo.observe(app, { childList: true, subtree: true });
    addEventListener('resize', fixStrip);
    addEventListener('load', fixStrip);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* AURIAM HOME – section « De votre premier appel à la livraison » (remplace la frise numérotée et les 4 tuiles de chiffres) */
(function () {
  'use strict';
  var FR = {
    k: 'Notre façon de travailler', h: 'De votre premier appel à la livraison chez vous',
    p: 'Un achat comme celui-ci se prépare. Voici comment ça se passe avec nous, de la première question jusqu’à l’installation.',
    st: [
      ['On choisit le bon modèle', 'Maison mobile ou conteneur, neuf ou d’occasion : parlez-nous de votre projet, de votre budget et de votre terrain, on vous oriente.', 'Neuf ou d’occasion'],
      ['Vous recevez votre devis', 'Il est gratuit et reste valable 30 jours, le temps d’y réfléchir tranquillement.', 'Gratuit · 30 jours'],
      ['On trouve la bonne façon de payer', 'Vous pouvez étaler le paiement sur la durée qui vous convient, jusqu’à 36 mois.', 'Jusqu’à 36 mois'],
      ['On vous livre, où que vous soyez en Europe', 'En livraison dédiée, comptez 7 à 10 jours. En livraison groupée, 2 à 3 semaines, à un tarif plus avantageux.', '7 à 10 jours'],
      ['On décharge et on installe', 'Le déchargement et l’installation sont offerts. Il ne vous reste plus qu’à emménager.', 'Offerts']
    ],
    n: 'En chiffres', e: 'Étape',
    c: [[36, 0, 'mois', 'de financement échelonné, au maximum'], [30, 0, 'jours', 'de validité pour votre devis gratuit'], [7, 10, 'jours', 'en livraison dédiée'], [2, 3, 'semaines', 'en livraison groupée']],
    q: 'Une question avant de vous décider\u00a0?', hrs: 'Du lundi au vendredi de 9 h à 18 h, le samedi de 9 h à 13 h. Route de Lyon, 24000 Périgueux.',
    b1: 'Demander un devis', b2: 'Voir les produits'
  };
  var EN = {
    k: 'How we work', h: 'From your first call to delivery at your door',
    p: 'A purchase like this takes preparation. Here is how it works with us, from your first question to installation.',
    st: [
      ['We pick the right model', 'Mobile home or container, new or used: tell us about your project, budget and land, and we will guide you.', 'New or used'],
      ['You receive your quote', 'It is free and stays valid for 30 days, so you can think it over calmly.', 'Free · 30 days'],
      ['We find the right way to pay', 'You can spread the payment over the period that suits you, up to 36 months.', 'Up to 36 months'],
      ['We deliver anywhere in Europe', 'With dedicated delivery, allow 7 to 10 days. With grouped delivery, 2 to 3 weeks at a better rate.', '7 to 10 days'],
      ['We unload and install', 'Unloading and installation are free. All that is left is moving in.', 'Free']
    ],
    n: 'In numbers', e: 'Step',
    c: [[36, 0, 'months', 'of instalment financing, at most'], [30, 0, 'days', 'validity of your free quote'], [7, 10, 'days', 'with dedicated delivery'], [2, 3, 'weeks', 'with grouped delivery']],
    q: 'A question before you decide?', hrs: 'Monday to Friday 9 am to 6 pm, Saturday 9 am to 1 pm. Route de Lyon, 24000 Périgueux.',
    b1: 'Request a quote', b2: 'See all products'
  };
  var CSS = '.pc{background:#fff;padding:56px max(16px,env(safe-area-inset-left,0px)) 60px;margin:8px 0;color:var(--navy,#14263F)}' +
    '.pc .pcw{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr;gap:34px}' +
    '.pc .pck{font-size:12px;font-weight:600;letter-spacing:2.2px;text-transform:uppercase;color:var(--cu-d,#9A6A27);margin:0 0 10px}' +
    '.pc h2{font-size:clamp(25px,5.4vw,36px);line-height:1.18;margin:0 0 14px;text-wrap:balance;font-weight:600;letter-spacing:-.01em;border:0;padding:0;display:block}' +
    '.pc h2:after{display:none}' +
    '.pc .pci{margin:0;color:var(--mut,#4C5A70);font-size:15.5px;line-height:1.65;max-width:520px}' +
    '.pc .pcp{margin-top:26px;position:relative;border-radius:14px;overflow:hidden;color:#fff;min-height:340px;background:#14263F}' +
    '.pc .pcg{position:absolute;inset:0;background-size:cover;background-position:50% 40%;filter:saturate(.9)}' +
    '.pc .pcp:before{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(20,38,63,.78),rgba(15,28,46,.93));z-index:1}' +
    '.pc .pcv{position:relative;z-index:2;padding:26px 22px 24px}' +
    '.pc .pcv .pck{color:#E0A55A;margin-bottom:6px}' +
    '.pc dl{margin:0;display:grid;grid-template-columns:1fr 1fr;gap:0 20px}' +
    '.pc dl>div{border-top:1px solid rgba(255,255,255,.22);padding:16px 0 18px}' +
    '.pc dt{font-size:12.5px;line-height:1.45;color:#C9D3E2;order:2;margin:6px 0 0}' +
    '.pc dd{margin:0;display:flex;flex-direction:column}' +
    '.pc dd b{font-size:clamp(34px,9vw,46px);line-height:1;font-weight:300;letter-spacing:-.02em;font-variant-numeric:tabular-nums}' +
    '.pc dd i{font-style:normal;font-size:14px;font-weight:600;color:#E0A55A;margin-top:4px}' +
    '.pc ol{list-style:none;margin:0;padding:0}' +
    '.pc li{display:grid;gap:4px;padding:22px 0;border-top:1px solid var(--line,#E4DED3)}' +
    '.pc li:first-child{border-top:0;padding-top:4px}' +
    '.pc li small{font-size:11.5px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:var(--cu-d,#9A6A27)}' +
    '.pc h3{font-size:19px;line-height:1.3;margin:2px 0 4px;font-weight:600;text-wrap:balance}' +
    '.pc li p{margin:0;font-size:15px;line-height:1.65;color:var(--mut,#4C5A70);max-width:520px}' +
    '.pc li em{justify-self:start;margin-top:10px;font-style:normal;font-size:12.5px;font-weight:600;padding:5px 12px;border:1px solid var(--cu,#C98A3D);border-radius:99px;color:var(--cu-d,#9A6A27);background:rgba(201,138,61,.08)}' +
    '.pc .pcc{margin-top:10px;padding:22px;border-radius:14px;background:var(--bg,#F6F3EE);display:grid;gap:14px}' +
    '.pc .pcc strong{font-size:17px;font-weight:600}.pc .pcc span{font-size:13.5px;color:var(--mut,#4C5A70);line-height:1.55}' +
    '.pc .pcr{display:flex;flex-wrap:wrap;gap:12px;align-items:center}' +
    '.pc .pcr a{font:inherit;font-weight:600;font-size:15px;text-decoration:none;min-height:46px;display:inline-flex;align-items:center;padding:0 22px;border-radius:10px}' +
    '.pc .pcr a.a{background:var(--cu,#C98A3D);color:#14263F}.pc .pcr a.b{color:#14263F;border:1.5px solid #14263F}' +
    '.pc a:focus-visible{outline:3px solid #14263F;outline-offset:2px}' +
    '@media(min-width:900px){.pc{padding-top:84px;padding-bottom:88px}.pc .pcw{grid-template-columns:5fr 6fr;gap:64px;align-items:start}.pc .pcl{position:sticky;top:96px}.pc .pcp{margin-top:28px;min-height:380px}.pc li{grid-template-columns:96px 1fr;column-gap:20px}.pc li small{grid-row:1/4;padding-top:6px}.pc li em{grid-column:2}}' +
    '@media(prefers-reduced-motion:no-preference){.pc.js li{opacity:0;transform:translateY(16px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:calc(var(--i)*.1s)}.pc.js.in li{opacity:1;transform:none}.pc.js .pcc{opacity:0;transition:opacity .8s .6s}.pc.js.in .pcc{opacity:1}}' +
    '.pc ~ .lf-tl,.pc ~ .lf-ct{display:none!important}';
  var styled = false;
  function build() {
    var app = document.getElementById('app'); if (!app) return;
    if (!styled) { var hs = document.createElement('style'); hs.textContent = '.lf-tl,.lf-ct,.pc{display:none!important}'; document.head.appendChild(hs); styled = true; }
    return;
    var tl = app.querySelector('.lf-tl'); if (!tl || app.querySelector('.pc')) return;
    if (!styled) { var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st); styled = true; }
    var en = document.documentElement.lang === 'en', D = en ? EN : FR, i;
    var img = app.querySelector('.hero .im img'), src = img && img.getAttribute('src');
    var sec = document.createElement('section'); sec.className = 'pc'; sec.setAttribute('aria-label', D.h);
    var steps = '', stats = '';
    for (i = 0; i < D.st.length; i++) steps += '<li style="--i:' + i + '"><small>' + D.e + ' ' + (i + 1) + '</small><h3>' + D.st[i][0] + '</h3><p>' + D.st[i][1] + '</p><em>' + D.st[i][2] + '</em></li>';
    for (i = 0; i < D.c.length; i++) { var c = D.c[i]; stats += '<div><dd><b data-a="' + c[0] + '" data-b="' + c[1] + '">' + (c[1] ? c[0] + '–' + c[1] : c[0]) + '</b><i>' + c[2] + '</i></dd><dt>' + c[3] + '</dt></div>'; }
    sec.innerHTML = '<div class="pcw"><div class="pcl"><p class="pck">' + D.k + '</p><h2>' + D.h + '</h2><p class="pci">' + D.p + '</p>' +
      '<div class="pcp"><div class="pcg"' + (src ? ' style="background-image:url(&quot;' + src.replace(/"/g, '%22') + '&quot;)"' : '') + '></div><div class="pcv"><p class="pck">' + D.n + '</p><dl>' + stats + '</dl></div></div></div>' +
      '<div class="pcm"><ol>' + steps + '</ol><div class="pcc"><strong>' + D.q + '</strong><span>' + D.hrs + '</span><div class="pcr"><a class="a" href="#/contact">' + D.b1 + '</a><a class="b" href="#/all">' + D.b2 + '</a></div></div></div></div>';
    tl.parentNode.insertBefore(sec, tl);
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    sec.classList.add('js');
    var bs = sec.querySelectorAll('dd b');
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      io.disconnect(); sec.classList.add('in');
      var t0 = performance.now(), Dm = 1600;
      (function step(now) {
        var p = Math.min(1, (now - t0) / Dm), e = 1 - Math.pow(1 - p, 3);
        for (var k = 0; k < bs.length; k++) { var a = +bs[k].dataset.a, b = +bs[k].dataset.b; bs[k].textContent = b ? Math.round(a * e) + '–' + Math.round(b * e) : Math.round(a * e); }
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }, { threshold: 0.18 });
    io.observe(sec);
  }
  function go() {
    build();
    var app = document.getElementById('app'); if (!app) return;
    var raf = 0;
    new MutationObserver(function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; build(); }); }).observe(app, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();

/* AURIAM HOME – habillage : titres tracés à la main, cartes, témoignages, FAQ, bloc « Parlons-en » avec maison en 3D, pied de page */
(function () {
  'use strict';
  var SQ = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 12'><path d='M3 8.5C20 3.5 38 10 62 5.5S104 3.5 127 7' fill='none' stroke='%23C98A3D' stroke-width='3.2' stroke-linecap='round'/></svg>\")";
  var PAPER = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .35  0 0 0 0 .28  0 0 0 0 .18  0 0 0 .07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
  var CSS = 
    '.sec>h2,.pc h2{font-size:clamp(28px,5.4vw,40px);line-height:1.12;letter-spacing:-.02em;font-weight:600;border-bottom:0!important;padding-bottom:0;margin:0 0 26px}' +
    '.sec>h2:after,.pc h2:after{display:none!important}' +
    '.eb{display:block;font-size:12px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--cu-d);margin:0 0 10px}' +
    '.sec{padding-top:60px}' +
    '.card{border:0;border-radius:16px;box-shadow:0 1px 2px rgba(20,38,63,.06),0 12px 28px rgba(20,38,63,.08)}' +
    '.card .cb{padding:16px 18px 20px}.card h3{font-size:17px;letter-spacing:.03em}' +
    '.card .pr{color:var(--cu-d);font-size:22px;letter-spacing:-.01em}' +
    '@media(min-width:900px){.hero .im img{animation:none!important;transform:none!important;will-change:auto;filter:url(#lkSharp) contrast(1.06) saturate(1.08);image-rendering:auto}}' +
    '@media(max-width:700px){#app .sec>.grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}' +
    '#app .sec>.grid>.card{padding:10px!important;border-radius:16px!important;background:#fff!important}' +
    '#app .sec>.grid>.card .ph{aspect-ratio:4/3!important;border-radius:8px!important;overflow:hidden}' +
    '#app .sec>.grid>.card .cb{padding:14px 4px 6px!important}' +
    '#app .sec>.grid>.card .badge,#app .sec>.grid>.card .sp,#app .sec>.grid>.card .lf-sp{display:none!important}' +
    '#app .sec>.grid>.card h3{font-size:12.5px!important;line-height:1.35!important;letter-spacing:.06em!important;text-transform:uppercase;font-weight:500!important;margin:0!important;min-height:2.7em}' +
    '#app .sec>.grid>.card .pr{font-size:15px!important;font-weight:600!important;margin:8px 0 0!important;letter-spacing:.02em}}' +
    '.why div{border:0;border-top:4px solid var(--cu);border-radius:3px 3px 18px 18px;box-shadow:0 12px 28px rgba(20,38,63,.08);padding:24px 22px}' +
    '.why b{font-size:18px;margin-bottom:8px}' +
    '.sec>.sub{font-size:17px;line-height:1.75;color:#2C3B55}' +
    'details{background:transparent;border:0;border-bottom:1px solid var(--line);border-radius:0;padding:20px 2px;margin:0}details[open]{box-shadow:none}' +
    'summary{font-size:17px;font-weight:600}' +
    'summary:after{width:32px;height:32px;border:1.5px solid var(--cu);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;padding-bottom:2px;box-sizing:border-box;transition:background .25s,color .25s}' +
    'details[open] summary:after{background:var(--cu);color:#14263F}' +
    'details p{font-size:15px;line-height:1.75;max-width:640px}' +
    '#tm .tem{position:relative;background:linear-gradient(155deg,#1f3a5f 0%,#14263F 70%);color:#fff;border:0;border-radius:22px;padding:52px 28px 32px;box-shadow:0 22px 48px rgba(20,38,63,.3);transition:transform .15s ease-out;will-change:transform}' +
    '#tm .tem img,#tm .tem .av{width:76px;height:76px;margin:-86px auto 18px;border:3px solid var(--cu);box-shadow:0 0 0 7px rgba(224,165,90,.18),0 10px 22px rgba(0,0,0,.3);position:relative}' +
    '#tm .tem blockquote{color:#E6ECF5;font-style:normal;font-size:16px;line-height:1.8;text-align:left}' +
    '#tm .tem .who,#tm .tem blockquote+*{color:#E0A55A}' +
    '#tm{padding-top:42px}' +
    '.band{position:relative;overflow:hidden;background:radial-gradient(120% 140% at 100% 0%,#26466f 0%,#14263F 55%,#0F1C2E 100%);border-radius:24px;padding:30px 26px 32px;gap:10px;box-shadow:0 24px 50px rgba(20,38,63,.28)}' +
    '.band:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:34px 34px;pointer-events:none;-webkit-mask-image:linear-gradient(90deg,transparent,#000 70%);mask-image:linear-gradient(90deg,transparent,#000 70%)}' +
    '.band>*{position:relative}.band h2{font-size:clamp(24px,6vw,32px);line-height:1.15}' +
    '.h3d{width:100%;height:210px;perspective:1000px;touch-action:pan-y;cursor:grab;order:-1;display:flex;align-items:center;justify-content:center}' +
    '.h3d .scn{position:relative;width:0;height:0;transform-style:preserve-3d}' +
    '.h3d .shd{position:absolute;left:-150px;top:62px;width:300px;height:70px;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.5),rgba(0,0,0,0));transform:translateZ(0)}' +
    '.h3d .hs{position:absolute;left:0;top:0;transform-style:preserve-3d}' +
    '.h3d .f{position:absolute;left:0;top:0;box-sizing:border-box}' +
    '.h3d .wd{background:repeating-linear-gradient(90deg,#c8935c 0 12px,#b5803f 12px 14px)}' +
    '.h3d .wn{position:absolute;top:18px;width:42px;height:34px;background:linear-gradient(135deg,#d9ecfa,#7fa8c6);border:3px solid #fff;box-sizing:border-box}' +
    '.h3d .dr{position:absolute;left:105px;top:16px;width:32px;height:58px;background:#2f3647;border:3px solid #fff;box-sizing:border-box}' +
    '.h3d .rf{background:repeating-linear-gradient(90deg,#444a57 0 13px,#343944 13px 15px)}' +
    '@media(min-width:760px){.band{padding:30px 40px;flex-wrap:nowrap;gap:34px}.h3d{width:320px;flex:none;order:2;height:220px}.band>div:not(.h3d){flex:1}.band .btn{order:3}}' +
    '.foot{background:linear-gradient(180deg,#14263F 0%,#0D1A2B 100%);border-top:4px solid var(--cu);position:relative}' +
    '.foot:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:38px 38px;pointer-events:none}' +
    '.foot .wrap{position:relative}.foot b{font-size:12px;letter-spacing:1.8px;text-transform:uppercase;color:#E0A55A;margin-bottom:4px}' +
    '.foot a:not(.lf-soc a){color:#D6DCE6;text-decoration:none;display:inline-block;transition:color .2s,transform .2s}.foot a:not(.lf-soc a):hover{color:#fff;transform:translateX(3px);text-decoration:none}';
  var styled = false;
  function house() {
    var W = 240, D = 100, H = 74;
    function win(x) { return '<i class="wn" style="left:' + x + 'px"></i>'; }
    var wall = '<div class="f wd" style="width:' + W + 'px;height:' + H + 'px;margin:-37px 0 0 -120px;transform:translateZ(' + D / 2 + 'px)">' + win(22) + win(176) + '<i class="dr"></i></div>' +
      '<div class="f wd" style="width:' + W + 'px;height:' + H + 'px;margin:-37px 0 0 -120px;transform:rotateY(180deg) translateZ(' + D / 2 + 'px)">' + win(22) + win(100) + win(176) + '</div>';
    var gab = 'clip-path:polygon(0 100%,100% 100%,100% 26%,50% 0,0 26%);background:#a97a45;';
    var ends = '<div class="f" style="width:' + D + 'px;height:100px;margin:-63px 0 0 -' + D / 2 + 'px;' + gab + 'transform:rotateY(90deg) translateZ(' + W / 2 + 'px)"></div>' +
      '<div class="f" style="width:' + D + 'px;height:100px;margin:-63px 0 0 -' + D / 2 + 'px;' + gab + 'transform:rotateY(-90deg) translateZ(' + W / 2 + 'px)"></div>';
    var roof = '<div class="f rf" style="width:256px;height:64px;margin:-32px 0 0 -128px;transform:translate3d(0,-50px,25px) rotateX(62.5deg)"></div>' +
      '<div class="f rf" style="width:256px;height:64px;margin:-32px 0 0 -128px;transform:translate3d(0,-50px,-25px) rotateX(-62.5deg)"></div>';
    return '<div class="h3d" aria-hidden="true"><div class="scn"><div class="shd"></div><div class="hs">' + wall + ends + roof + '</div></div></div>';
  }
  function sharpDef() {
    if (document.getElementById('lkSharpSvg')) return;
    var d = document.createElement('div'); d.id = 'lkSharpSvg'; d.setAttribute('aria-hidden', 'true');
    d.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><filter id="lkSharp" color-interpolation-filters="sRGB"><feConvolveMatrix order="3" preserveAlpha="true" kernelMatrix="0 -0.5 0 -0.5 3 -0.5 0 -0.5 0"/></filter></svg>';
    document.body.appendChild(d);
  }
  function build() {
    var app = document.getElementById('app'); if (!app) return;
    sharpDef();
    if (!styled) { var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); styled = true; }
    var en = document.documentElement.lang === 'en', hs = app.querySelectorAll('.sec>h2');
    for (var i = 0; i < hs.length; i++) {
      var h = hs[i], pv = h.previousElementSibling; if (pv && pv.classList.contains('eb')) continue;
      var t = h.textContent.toLowerCase(), e = '';
      if (/cat[ée]g|categor/.test(t)) e = en ? 'Our catalogue' : 'Notre catalogue';
      else if (/une|featured/.test(t)) e = en ? 'Our selection' : 'Notre sélection';
      else if (/t[ée]moign|testimon/.test(t)) e = en ? 'They trust us' : 'Ils nous font confiance';
      else if (/question|faq/.test(t)) e = en ? 'Good to know' : 'Bon à savoir';
      if (e) h.insertAdjacentHTML('beforebegin', '<span class="eb">' + e + '</span>');
    }
    var cg = app.querySelector('footer.foot a[href="#/cgv"]');
    if (cg && !app.querySelector('footer.foot a[href="/confidentialite/"]')) cg.insertAdjacentHTML('afterend', '<br><a href="/confidentialite/">' + (en ? 'Privacy &amp; cookies (FR)' : 'Confidentialité et cookies') + '</a>');
    var band = app.querySelector('.band');
    /* maison 3D du bloc supprimee */
    var tm = app.querySelector('#tm');
    if (tm && !tm.__t) {
      tm.__t = 1;
      tm.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var c = tm.querySelector('.tem'); if (!c) return;
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = 'perspective(900px) rotateX(' + (-y * 5).toFixed(2) + 'deg) rotateY(' + (x * 6).toFixed(2) + 'deg)';
      });
      tm.addEventListener('pointerleave', function () { var c = tm.querySelector('.tem'); if (c) c.style.transform = ''; });
    }
  }
  function spin(el) {
    var hs = el.querySelector('.hs'), a = -32, vis = true, drag = false, x0 = 0, a0 = 0, last = 0, k = 1,
      reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function set() { hs.style.transform = 'rotateX(-16deg) rotateY(' + a.toFixed(1) + 'deg) scale(' + k + ')'; }
    function fit() { k = Math.min(1.25, Math.max(.6, el.clientWidth / 330)); k = Math.min(k, el.clientHeight / 175); set(); }
    fit(); addEventListener('resize', fit);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(el);
    el.addEventListener('pointerdown', function (e) { drag = true; x0 = e.clientX; a0 = a; el.style.cursor = 'grabbing'; try { el.setPointerCapture(e.pointerId); } catch (z) {} });
    el.addEventListener('pointermove', function (e) { if (drag) { a = a0 + (e.clientX - x0) * .6; set(); } });
    function up() { drag = false; el.style.cursor = ''; }
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    if (reduce) return;
    (function loop(n) {
      requestAnimationFrame(loop);
      var dt = Math.min(60, n - (last || n)); last = n;
      if (!vis || drag || !document.body.contains(el)) return;
      a += dt * .022; set();
    })(performance.now());
  }
  function start() {
    build();
    var app = document.getElementById('app'); if (!app) return;
    var raf = 0;
    new MutationObserver(function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; build(); }); }).observe(app, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
/* AURIAM HOME – accueil moderne : photo d'en-tête révélée après l'animation, promesse + chiffres, grande photo, parc d'exposition. */
(function () {
  'use strict';
  var IMG = { hero: 'photos/maison-hero.jpg?v=2', big: 'photos/maison-grande.jpg?v=2', park: 'photos/parc-expo.jpg?v=2', cont: 'photos/conteneur-maritime.jpg?v=1' };
  var T = {
    fr: {
      k1: 'Notre promesse', h1: 'Un espace de vie confortable, <em>sans stress</em>, du premier appel jusqu’à l’installation.',
      s: [['36', '', 'mois', 'de paiement échelonné, selon votre budget'], ['7', '10', 'jours', 'pour une livraison dédiée en Europe'], ['30', '', 'jours', 'de validité de votre devis gratuit'], ['100', '', '%', 'déchargement et installation offerts']],
      k2: 'Neuf & occasion', h2: 'Des modèles pour chaque terrain.',
      k3: 'Parc d’exposition', h3: 'Venez les voir de vos propres yeux.',
      p3: 'Route de Lyon, à Périgueux. Du lundi au vendredi de 9 h à 18 h, le samedi de 9 h à 13 h. On vous montre, on vous conseille, sans pression.', l3: 'Préparer ma visite →',
      k4: 'Conteneurs maritimes', h4: 'Solides, prêts à être aménagés.', p4: '20 ou 40 pieds, neufs ou d’occasion. Livraison en Europe et paiement échelonné possible.', l4: 'Voir les conteneurs →'
    },
    en: {
      k1: 'Our promise', h1: 'A comfortable living space, <em>stress-free</em>, from the first call to installation.',
      s: [['36', '', 'months', 'of instalment payments to fit your budget'], ['7', '10', 'days', 'for dedicated delivery across Europe'], ['30', '', 'days', 'validity of your free quote'], ['100', '', '%', 'free unloading and installation']],
      k2: 'New & used', h2: 'A model for every plot of land.',
      k3: 'Show park', h3: 'Come and see them for yourself.',
      p3: 'Route de Lyon, Périgueux. Monday to Friday 9 am–6 pm, Saturday 9 am–1 pm. We show you around and advise you, no pressure.', l3: 'Plan my visit →',
      k4: 'Shipping containers', h4: 'Tough, ready to be fitted out.', p4: '20 or 40 ft, new or used. Delivery across Europe and instalment payments available.', l4: 'See containers →'
    }
  };
  var CSS = '' +
    '.hero .mh{position:absolute;inset:0;z-index:0;overflow:hidden}' +
    '.hero .mh img{width:100%;height:100%;object-fit:cover;object-position:60% 50%;display:block}' +
    '.hero .mh:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,20,36,.82) 0%,rgba(10,20,36,.52) 46%,rgba(10,20,36,.12) 100%),linear-gradient(180deg,rgba(10,20,36,.3),rgba(10,20,36,0) 30%,rgba(10,20,36,.5))}' +
    '@media(min-width:900px){.hero .mh img{filter:url(#lkSharp) contrast(1.05) saturate(1.06)}.hero{min-height:min(84vh,740px)}.hero .wrap{min-height:min(84vh,740px)}}' +
    '.hero h1{letter-spacing:-.03em;line-height:1.05}@media(min-width:900px){.hero h1{font-size:clamp(38px,4.8vw,62px)}}' +
    '.mo{padding:clamp(56px,9vw,120px) 20px}.mo .mw{max-width:1180px;margin:0 auto}' +
    '.mo-k{display:block;font-size:12px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--cu-d,#9A6A27)}' +
    '.mo-big{font-size:clamp(28px,4.8vw,56px);line-height:1.12;letter-spacing:-.03em;font-weight:500;margin:14px 0 0;max-width:22ch;text-wrap:balance}.mo-big em{font-style:normal;color:var(--cu-d,#9A6A27)}' +
    '.mo-st{display:grid;grid-template-columns:repeat(4,1fr);margin-top:clamp(36px,6vw,76px);border-top:1px solid var(--line,#E4DED3)}' +
    '.mo-st>div{padding:26px 16px 6px 18px;border-right:1px solid var(--line,#E4DED3)}.mo-st>div:first-child{padding-left:0}.mo-st>div:last-child{border-right:0}' +
    '.mo-st b{display:block;font-size:clamp(38px,5.6vw,80px);line-height:1;letter-spacing:-.04em;font-weight:500;white-space:nowrap}.mo-st b i{font-style:normal;font-size:.38em;color:var(--cu-d,#9A6A27);margin-left:6px;letter-spacing:0}' +
    '.mo-st span{display:block;margin-top:12px;color:var(--mut,#4C5A70);font-size:14px;line-height:1.5}' +
    '.mo-full{position:relative;height:min(88vh,780px);overflow:hidden;margin:clamp(40px,6vw,84px) clamp(0px,2vw,28px) 0;border-radius:clamp(0px,2vw,28px)}' +
    '.mo-full img{width:100%;height:112%;object-fit:cover;display:block;will-change:transform}' +
    '.mo-full:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(10,20,36,.74))}' +
    '.mo-full .cap{position:absolute;z-index:2;left:clamp(18px,4vw,56px);right:clamp(18px,4vw,56px);bottom:clamp(24px,5vw,56px);color:#fff}' +
    '.mo-full .cap .mo-k{color:#f0c27d}.mo-full .cap h2{font-size:clamp(30px,5.4vw,68px);line-height:1.05;letter-spacing:-.03em;font-weight:500;margin:10px 0 0;max-width:16ch}' +
    '.mo-sp{display:grid;grid-template-columns:1.1fr 1fr;gap:clamp(26px,6vw,88px);align-items:center}' +
    '.mo-im{border-radius:24px;overflow:hidden;aspect-ratio:4/3.3;box-shadow:0 24px 56px rgba(20,38,63,.16)}.mo-im img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.mo-c .mo-im{aspect-ratio:4/5}@media(min-width:821px){.mo-c .mo-sp{grid-template-columns:1fr 1fr}.mo-c .mo-im{order:2}}@media(max-width:820px){.mo-c .mo-sp{grid-template-columns:1fr!important}.mo-c .mo-im{order:-1;aspect-ratio:4/4.4}}' +
    '.lf-3d{display:none!important}.h3d{display:none!important}' +
    '.mo-sp h2{font-size:clamp(28px,4.2vw,50px);line-height:1.08;letter-spacing:-.03em;font-weight:500;margin:12px 0 16px}' +
    '.mo-sp p{color:var(--mut,#4C5A70);line-height:1.75;font-size:17px;margin:0 0 24px;max-width:46ch}' +
    '.mo-l{display:inline-flex;font-weight:600;border-bottom:1.5px solid var(--cu,#C98A3D);padding-bottom:4px;color:var(--navy,#14263F)}' +
    '@media(max-width:820px){.mo-st{grid-template-columns:1fr 1fr}.mo-st>div:nth-child(2){border-right:0}.mo-st>div:nth-child(3){padding-left:0;border-top:1px solid var(--line,#E4DED3)}.mo-st>div:nth-child(4){border-top:1px solid var(--line,#E4DED3)}.mo-sp{grid-template-columns:1fr}.mo-full{height:min(74vh,520px)}}' +
    '@media(prefers-reduced-motion:no-preference){.mo-rv{opacity:0;transform:translateY(30px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}.mo-rv.on{opacity:1;transform:none}}';
  var styled = false, io = null;
  function reveal(el) {
    var rv = el.querySelectorAll('.mo-rv');
    if (!('IntersectionObserver' in window)) { el.classList.add('on'); for (var i = 0; i < rv.length; i++) rv[i].classList.add('on'); return; }
    if (!io) io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; io.unobserve(e.target); e.target.classList.add('on');
        var bs = e.target.querySelectorAll('b[data-a]'); if (!bs.length) return;
        var t0 = performance.now();
        (function step(now) {
          var p = Math.min(1, (now - t0) / 1500), k = 1 - Math.pow(1 - p, 3);
          for (var j = 0; j < bs.length; j++) { var a = +bs[j].dataset.a, b = +bs[j].dataset.b, u = bs[j].dataset.u; bs[j].innerHTML = (b ? Math.round(a * k) + '–' + Math.round(b * k) : Math.round(a * k)) + '<i>' + u + '</i>'; }
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: .15 });
    for (var m = 0; m < rv.length; m++) io.observe(rv[m]);
    if (el.classList.contains('mo-rv')) io.observe(el);
  }
  function build() {
    var app = document.getElementById('app'); if (!app) return;
    var hero = app.querySelector('.hero'); if (!hero) return;
    if (!styled) { var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st); styled = true; }
    var D = T[(document.documentElement.lang || '').toLowerCase().indexOf('en') === 0 ? 'en' : 'fr'], i;
    if (!hero.querySelector('.mh')) {
      var mh = document.createElement('div'); mh.className = 'mh'; mh.setAttribute('aria-hidden', 'true');
      mh.innerHTML = '<img src="' + IMG.hero + '" alt="" decoding="async" onerror="this.parentNode.remove()">';
      hero.appendChild(mh);
    }
    var d3 = app.querySelector('.lf-3d'); if (!d3 || app.querySelector('.mo-p')) return;
    var cells = '';
    for (i = 0; i < D.s.length; i++) { var c = D.s[i]; cells += '<div><b data-a="' + c[0] + '" data-b="' + c[1] + '" data-u="' + c[2] + '">' + (c[1] ? c[0] + '–' + c[1] : c[0]) + '<i>' + c[2] + '</i></b><span>' + c[3] + '</span></div>'; }
    var p = document.createElement('section'); p.className = 'mo mo-p';
    p.innerHTML = '<div class="mw"><span class="mo-k mo-rv">' + D.k1 + '</span><p class="mo-big mo-rv">' + D.h1 + '</p><div class="mo-st mo-rv">' + cells + '</div></div>';
    d3.parentNode.insertBefore(p, d3.nextSibling);
    var feat = null, secs = app.querySelectorAll('main > .sec');
    for (i = 0; i < secs.length; i++) if (secs[i].querySelector('.grid')) { feat = secs[i]; break; }
    var anchor = feat || p;
    var f = document.createElement('section'); f.className = 'mo-full mo-rv mo-f';
    f.innerHTML = '<img src="' + IMG.big + '" alt="" loading="lazy" onerror="if(!this.dataset.r){this.dataset.r=1;var u=this;setTimeout(function(){u.src=\'photos/maison-grande.jpg?r=\'+Date.now()},1500)}else{this.closest(\'.mo-f\').remove()}"><div class="cap"><span class="mo-k">' + D.k2 + '</span><h2>' + D.h2 + '</h2></div>';
    var x = document.createElement('section'); x.className = 'mo mo-x';
    x.innerHTML = '<div class="mw mo-sp"><div class="mo-im mo-rv"><img src="' + IMG.park + '" alt="" loading="lazy" onerror="var g=this.closest(\'.mo-sp\');g.style.display=\'block\';this.closest(\'.mo-im\').remove()"></div><div class="mo-rv"><span class="mo-k">' + D.k3 + '</span><h2>' + D.h3 + '</h2><p>' + D.p3 + '</p><a class="mo-l" href="#/contact">' + D.l3 + '</a></div></div>';
    var cl = '#/all', ca = app.querySelectorAll('a[href^="#/c/"]');
    for (i = 0; i < ca.length; i++) if (/maritime|shipping/i.test(ca[i].textContent + ' ' + ca[i].getAttribute('href'))) { cl = ca[i].getAttribute('href'); break; }
    var c4 = document.createElement('section'); c4.className = 'mo mo-x mo-c';
    c4.innerHTML = '<div class="mw mo-sp"><div class="mo-rv"><span class="mo-k">' + D.k4 + '</span><h2>' + D.h4 + '</h2><p>' + D.p4 + '</p><a class="mo-l" href="' + cl + '">' + D.l4 + '</a></div><div class="mo-im mo-rv"><img src="' + IMG.cont + '" alt="" loading="lazy" onerror="var g=this.closest(\'.mo-sp\');g.style.display=\'block\';this.closest(\'.mo-im\').remove()"></div></div>';
    anchor.parentNode.insertBefore(f, anchor.nextSibling);
    f.parentNode.insertBefore(x, f.nextSibling);
    x.parentNode.insertBefore(c4, x.nextSibling);
    reveal(p); reveal(f); reveal(x); reveal(c4);
    var img = f.querySelector('img');
    if (img && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      addEventListener('scroll', function () {
        var r = f.getBoundingClientRect(), h = innerHeight; if (r.bottom < 0 || r.top > h) return;
        var k = (r.top + r.height / 2 - h / 2) / h; img.style.transform = 'translateY(' + (-k * 7).toFixed(2) + '%)';
      }, { passive: true });
    }
  }
  function go() {
    build();
    var app = document.getElementById('app'); if (!app) return;
    var raf = 0;
    new MutationObserver(function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; build(); }); }).observe(app, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
/* AURIAM HOME – touches modernes : menu plein écran, en-tête en verre, barre de progression, apparitions au défilement, boutons. */
(function () {
  'use strict';
  var CSS = '' +
    '.top{background:rgba(255,255,255,.82)!important;-webkit-backdrop-filter:saturate(1.5) blur(14px);backdrop-filter:saturate(1.5) blur(14px);border-bottom-color:rgba(228,222,211,.7)!important;transition:box-shadow .3s ease}' +
    '.top.sc{box-shadow:0 12px 32px rgba(20,38,63,.09)}' +
    '.hbtns .ib.dark{width:auto;padding:0 20px 0 16px;border-radius:99px;gap:10px;font-weight:600;font-size:14px;letter-spacing:.04em}.hbtns .ib.dark:after{content:"Menu"}' +
    '#tp{position:fixed;left:0;top:0;height:3px;width:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#C98A3D,#f0c27d);z-index:70;pointer-events:none}' +
    '.btn{border-radius:99px!important}.btn.cu{background:linear-gradient(135deg,#d49a4c,#C98A3D)!important;box-shadow:0 10px 24px rgba(201,138,61,.32)}.btn.cu:active{box-shadow:0 4px 10px rgba(201,138,61,.3)}' +
    'h1,h2,h3{text-wrap:balance}' +
    /* menu plein écran */
    '.ov>.dr.lf-dr{position:fixed;inset:0;width:auto;max-width:none;background:radial-gradient(120% 80% at 100% 0%,#24406a 0%,#14263F 55%,#0c1829 100%);color:#fff;padding:calc(env(safe-area-inset-top,0px) + 4px) 26px calc(env(safe-area-inset-bottom,0px) + 90px);counter-reset:mn;gap:0;box-shadow:none;animation:drIn .55s cubic-bezier(.7,0,.2,1) both}' +
    '@keyframes drIn{from{clip-path:circle(0 at calc(100% - 44px) 44px)}to{clip-path:circle(160% at calc(100% - 44px) 44px)}}' +
    '.ov>.dr.lf-dr:before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:44px 44px;pointer-events:none}' +
    '.ov>.dr.lf-dr>*{position:relative}' +
    '.ov>.dr.lf-dr>div:first-child{background:transparent;border:0;padding:12px 0!important;position:sticky;top:0;z-index:3;-webkit-backdrop-filter:none;backdrop-filter:none}' +
    '.ov>.dr.lf-dr>div:first-child b{font-size:13px;letter-spacing:.3em!important;color:#f0c27d}' +
    '.ov>.dr.lf-dr>div:first-child .ib{border-color:rgba(255,255,255,.4);background:rgba(255,255,255,.08);color:#fff}' +
    '.ov>.dr.lf-dr .lf-langrow{background:transparent;border:0;padding:6px 0 10px;justify-content:flex-start;gap:16px}' +
    '.ov>.dr.lf-dr .lf-langrow>div:first-child{color:#aab6c8!important}' +
    '.ov>.dr.lf-dr .lf-langrow .lang{background:transparent;border-color:rgba(255,255,255,.35)}.ov>.dr.lf-dr .lf-langrow .lang button{color:#fff;min-height:34px;padding:0 16px;font-size:13px}.ov>.dr.lf-dr .lf-langrow .lang button.on{background:#f0c27d;color:#14263F}' +
    '.ov>.dr.lf-dr .lf-mt{padding:22px 0 4px;color:#f0c27d;font-size:11px;letter-spacing:.28em}' +
    '.ov>.dr.lf-dr a.l{counter-increment:mn;justify-content:flex-start;gap:16px;font-size:clamp(21px,6.2vw,34px);font-weight:500;letter-spacing:-.02em;line-height:1.15;padding:12px 0;border-top:1px solid rgba(255,255,255,.14);border-left:0;color:#fff}' +
    '.ov>.dr.lf-dr a.l.f{font-weight:500;font-size:clamp(21px,6.2vw,34px);border-top:0}' +
    '.ov>.dr.lf-dr a.l:before{content:counter(mn,decimal-leading-zero);font-size:11px;font-weight:600;letter-spacing:.2em;color:#f0c27d;min-width:22px}' +
    '.ov>.dr.lf-dr a.l:after{content:"→";margin-left:auto;font-size:18px;color:#f0c27d;opacity:.85}' +
    '.ov>.dr.lf-dr a.l:active,.ov>.dr.lf-dr a.l:hover{background:transparent;color:#f0c27d}' +
    '.ov>.dr.lf-dr .lf-mcta{position:fixed;left:26px;right:26px;bottom:calc(env(safe-area-inset-bottom,0px) + 18px);margin:0;border-radius:99px;background:linear-gradient(135deg,#d49a4c,#C98A3D);box-shadow:0 12px 28px rgba(0,0,0,.35);z-index:4}' +
    '.ov>.dr.lf-dr .lf-soc-b{color:#aab6c8}.ov>.dr.lf-dr .lf-soc-b span{color:#aab6c8}' +
    /* apparitions au défilement + fondu de page */
    '@media(prefers-reduced-motion:no-preference){.tc-r:not(.on){opacity:0;transform:translateY(26px)}.tc-r.on{animation:tcIn .85s cubic-bezier(.2,.7,.2,1) backwards}@keyframes tcIn{from{opacity:0;transform:translateY(26px)}}main{animation:tcPg .5s ease backwards}@keyframes tcPg{from{opacity:0}}}';
  var io = null, styled = false;
  function mark() {
    var app = document.getElementById('app'); if (!app) return;
    if (!styled) { var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); styled = true; }
    if (!('IntersectionObserver' in window) || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    if (!io) io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); e.target.classList.add('on'); } });
    }, { threshold: .08, rootMargin: '0px 0px -6% 0px' });
    var q = app.querySelectorAll('main .sec>h2, main .sec>p, main .sec .why, main .sec .grid>.card, main .sec details, main .sec .tm, main .sec>ul');
    for (var i = 0; i < q.length; i++) {
      var n = q[i]; if (n.dataset.tc || n.closest('.lf-3d,.lf-ct,.lf-tl,.hero')) continue;
      n.dataset.tc = '1'; n.classList.add('tc-r');
      var idx = 0, sib = n; while ((sib = sib.previousElementSibling)) idx++;
      n.style.animationDelay = Math.min(idx, 5) * 70 + 'ms';
      io.observe(n);
    }
    setTimeout(function () { var r = document.querySelectorAll('.tc-r:not(.on)'); for (var j = 0; j < r.length; j++) { var b = r[j].getBoundingClientRect(); if (b.top < innerHeight && b.bottom > 0) r[j].classList.add('on'); } }, 2500);
  }
  var bar = null, tick = false;
  function onScroll() {
    if (tick) return; tick = true;
    requestAnimationFrame(function () {
      tick = false;
      var h = document.documentElement, max = h.scrollHeight - innerHeight, y = window.pageYOffset || h.scrollTop;
      if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
      var t = document.querySelector('.top'); if (t) t.classList.toggle('sc', y > 12);
    });
  }
  function go() {
    mark();
    bar = document.createElement('div'); bar.id = 'tp'; bar.setAttribute('aria-hidden', 'true'); document.body.appendChild(bar);
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();
    var app = document.getElementById('app'); if (!app) return; var raf = 0;
    new MutationObserver(function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; mark(); onScroll(); }); }).observe(app, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
/* AURIAM HOME – site clair + fond 3D : vue aerienne douce d'un petit village de maisons modulaires et de conteneurs, qui glisse doucement pendant le defilement. */
(function () {
  'use strict';
  var D = document, H = D.documentElement;
  var BG = 0xf4f1ec;
  var CSS = '' +
    'html.lt body{background:#f4f1ec}' +
    '#nvcv{position:fixed;left:0;top:0;width:100%;height:100vh;height:100lvh;z-index:0;display:block;pointer-events:none;opacity:0;transition:opacity 1.2s}' +
    'html.lt #nvcv{opacity:1}' +
    '#nvveil{position:fixed;left:0;top:0;width:100%;height:100vh;height:100lvh;z-index:0;pointer-events:none;background:linear-gradient(180deg,rgba(244,241,236,.72),rgba(244,241,236,.84))}' +
    'html.lt #app{position:relative;z-index:1}' +
    'html.lt .lf-strip{background:rgba(255,255,255,.7)!important;color:#0b1a38}' +
    '@media(prefers-reduced-motion:reduce){#nvcv{transition:none}}';

  function hasGL() { try { var c = D.createElement('canvas'); return !!(c.getContext('webgl') || c.getContext('experimental-webgl')); } catch (e) { return false; } }
  function off() { H.classList.remove('lt'); var a = D.getElementById('nvcv'), b = D.getElementById('nvveil'); if (a) a.remove(); if (b) b.remove(); }

  function start() {
    H.classList.add('lt');
    var st = D.createElement('style'); st.textContent = CSS; D.head.appendChild(st);
    if (!hasGL()) return;
    var cv = D.createElement('canvas'); cv.id = 'nvcv'; cv.setAttribute('aria-hidden', 'true');
    var vl = D.createElement('div'); vl.id = 'nvveil';
    D.body.insertBefore(vl, D.body.firstChild); D.body.insertBefore(cv, D.body.firstChild);
    if (window.THREE) return scene(cv);
    var s = D.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = function () { scene(cv); }; s.onerror = function () { var a = D.getElementById('nvcv'), b = D.getElementById('nvveil'); if (a) a.remove(); if (b) b.remove(); }; D.head.appendChild(s);
  }

  function scene(cv) {
    var T3 = window.THREE, ren;
    if (!T3) return off();
    try { ren = new T3.WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return off(); }
    var small = Math.min(innerWidth, innerHeight) < 700;
    ren.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
    ren.shadowMap.enabled = !small; ren.shadowMap.type = T3.PCFSoftShadowMap;
    var sc = new T3.Scene(); sc.background = new T3.Color(BG); sc.fog = new T3.Fog(BG, 22, 62);
    var cam = new T3.PerspectiveCamera(36, 1, .1, 120);
    sc.add(new T3.HemisphereLight(0xffffff, 0xd9d2c6, .85));
    var d = new T3.DirectionalLight(0xfff1dc, .85); d.position.set(10, 18, 8); d.castShadow = true; d.shadow.mapSize.set(2048, 2048);
    var sh = d.shadow.camera; sh.left = -30; sh.right = 30; sh.top = 30; sh.bottom = -30; sh.far = 70; d.shadow.radius = 4; sc.add(d);
    var gr = new T3.Mesh(new T3.PlaneGeometry(200, 200), new T3.MeshStandardMaterial({ color: 0xe9e5dc, roughness: 1 })); gr.rotation.x = -Math.PI / 2; gr.receiveShadow = true; sc.add(gr);
    function M(c, r, m) { return new T3.MeshStandardMaterial({ color: c, roughness: r == null ? .75 : r, metalness: m || 0 }); }
    var mWhite = M(0xfbfaf7), mCream = M(0xefe6d6), mDark = M(0x2a3345, .5), mGlass = M(0x8fa3bd, .25, .2), mWood = M(0xb98a5e),
      mRoad = M(0xd8d3c8, 1), mLot = M(0xf1eee7, 1), mGrass = M(0xcfd8c2, 1), mTree = M(0x9db38a, 1), mTrunk = M(0x8a7a66),
      cols = [M(0xe8793c, .55, .25), M(0x1f3a63, .55, .25), M(0xd9cdb6, .6, .2), M(0x6e8aa8, .55, .25), M(0xf0a066, .55, .2)];
    function bx(w, h, dd, mat, x, y, z) { var m = new T3.Mesh(new T3.BoxGeometry(w, h, dd), mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; return m; }
    function house(seed) {
      var g = new T3.Group(), w = 3.4 + (seed % 3) * .5, body = seed % 2 ? mWhite : mCream;
      g.add(bx(w, 1.25, 1.7, body, 0, .62, 0)); g.add(bx(w + .3, .12, 2, mDark, 0, 1.31, 0));
      g.add(bx(w * .42, .62, .05, mGlass, -w * .2, .75, .86)); g.add(bx(.46, .98, .05, mWood, w * .3, .5, .86));
      if (seed % 3 === 0) g.add(bx(w * .8, .05, 1.1, mWood, 0, .03, 1.5));
      return g;
    }
    function cont(seed) {
      var g = new T3.Group(), m = cols[seed % cols.length]; g.add(bx(4, 1.5, 1.6, m, 0, .75, 0));
      for (var i = 0; i < 9; i++) g.add(bx(.05, 1.4, .04, mDark, -1.75 + i * .44, .75, .81));
      return g;
    }
    function tree(x, z, s) { var g = new T3.Group(); g.add(bx(.14, .5 * s, .14, mTrunk, 0, .25 * s, 0)); var c = new T3.Mesh(new T3.IcosahedronGeometry(.55 * s, 0), mTree); c.position.y = .85 * s; c.castShadow = true; g.add(c); g.position.set(x, 0, z); return g; }
    var rnd = (function (s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })(7);
    var ROW = 6.4, COL = 7.4, i, j;
    for (i = -4; i <= 4; i++) { var rd = new T3.Mesh(new T3.PlaneGeometry(200, 1.4), mRoad); rd.rotation.x = -Math.PI / 2; rd.position.set(0, .012, i * ROW + ROW / 2); rd.receiveShadow = true; sc.add(rd); }
    for (j = -6; j <= 6; j++) { var rv = new T3.Mesh(new T3.PlaneGeometry(1.2, 200), mRoad); rv.rotation.x = -Math.PI / 2; rv.position.set(j * COL + COL / 2, .013, 0); rv.receiveShadow = true; sc.add(rv); }
    for (i = -4; i <= 4; i++) for (j = -6; j <= 6; j++) {
      var cx = j * COL, cz = i * ROW, r = rnd();
      var lot = new T3.Mesh(new T3.PlaneGeometry(COL - 1.6, ROW - 1.8), r < .22 ? mGrass : mLot); lot.rotation.x = -Math.PI / 2; lot.position.set(cx, .02, cz); lot.receiveShadow = true; sc.add(lot);
      var o;
      if (r < .22) { sc.add(tree(cx - 1.2, cz, 1.2 + rnd() * .5)); sc.add(tree(cx + 1.1, cz + .5, 1 + rnd() * .5)); sc.add(tree(cx, cz - 1, .9 + rnd() * .4)); continue; }
      if (r < .62) { o = house(Math.floor(rnd() * 9)); } else { o = cont(Math.floor(rnd() * 20)); if (rnd() < .35) { var o2 = cont(Math.floor(rnd() * 20)); o2.position.y = 1.5; o.add(o2); } }
      o.position.set(cx, .02, cz); o.rotation.y = rnd() < .5 ? 0 : Math.PI; sc.add(o);
      if (rnd() < .5) sc.add(tree(cx + (rnd() < .5 ? -2.4 : 2.4), cz + 1.2, .9 + rnd() * .4));
    }
    var CP = [[-16, 24, 28], [-6, 16, 20], [6, 12, 15], [16, 17, 20], [3, 27, 30]], CT = [[0, 0, 0], [-1, 0, -2], [4, 0, -3], [7, 0, -1], [0, 0, -3]];
    function sm(t) { return t * t * (3 - 2 * t); }
    function lk(k, s) { var n = Math.min(Math.floor(s), 3), f = sm(s - n), a = k[n], b = k[n + 1]; return a.map(function (v, q) { return v + (b[q] - v) * f; }); }
    var mx = 0, my = 0, cur = 0, rm = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches, t0 = performance.now(), lw = 0, lh = 0, forced = null;
    addEventListener('pointermove', function (e) { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
    function res() { var w = innerWidth, h = innerHeight; if (w === lw && h === lh) return; lw = w; lh = h; ren.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
    function stage() { var m = Math.max(1, D.documentElement.scrollHeight - innerHeight); return 4 * Math.max(0, Math.min(1, scrollY / m)); }
    function loop(now) {
      requestAnimationFrame(loop);
      if (D.hidden) return;
      res();
      var t = (now - t0) / 1000, tgt = forced == null ? stage() : forced;
      cur = rm ? tgt : cur + (tgt - cur) * .06;
      var mob = cam.aspect < .85, p = lk(CP, cur), q = lk(CT, cur), k = mob ? 1.35 : 1, dr = rm ? 0 : Math.sin(t * .12) * 1.2;
      cam.position.set(p[0] * k + dr + mx * .8, p[1] * (mob ? 1.15 : 1) + my * -.5, p[2] * k); cam.lookAt(q[0], q[1], q[2]);
      ren.render(sc, cam);
    }
    window.__NEO = { set: function (v) { forced = v; cur = v; } };
    requestAnimationFrame(loop);
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
/* AURIAM HOME – menu latéral en verre : icônes fines, rangées compactes, groupes séparés, bouton devis fixe en bas. */
(function () {
  'use strict';
  var CSS = '' +
    '.ov{background:rgba(3,9,22,.6)!important;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}' +
    '.ov>.dr.lf-dr{position:fixed!important;inset:0 0 0 auto!important;width:min(372px,90vw)!important;max-width:none!important;padding:0 0 calc(env(safe-area-inset-bottom,0px) + 14px)!important;display:flex!important;flex-direction:column;gap:0!important;counter-reset:none!important;' +
    'background:linear-gradient(158deg,rgba(46,196,241,.24) 0%,rgba(22,40,86,.8) 26%,rgba(14,16,24,.94) 60%)!important;-webkit-backdrop-filter:blur(26px) saturate(1.4);backdrop-filter:blur(26px) saturate(1.4);' +
    'border:1px solid rgba(255,255,255,.16);border-right:0;border-radius:20px 0 0 20px;box-shadow:-24px 0 60px rgba(0,0,0,.5);color:#fff;overflow-y:auto;overscroll-behavior:contain;animation:nmIn .4s cubic-bezier(.2,.7,.2,1) both!important}' +
    '@keyframes nmIn{from{transform:translateX(44px);opacity:0}to{transform:none;opacity:1}}' +
    '.ov>.dr.lf-dr:before{display:none!important}' +
    '.ov>.dr.lf-dr>div:first-child{display:flex!important;align-items:center;justify-content:space-between;padding:calc(env(safe-area-inset-top,0px) + 16px) 20px 14px!important;background:rgba(12,22,48,.55)!important;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:0!important;position:sticky;top:0;z-index:3}' +
    '.ov>.dr.lf-dr>div:first-child:after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)}' +
    '.ov>.dr.lf-dr>div:first-child b{font-size:17px!important;font-weight:800;letter-spacing:.2em!important;color:#fff!important;text-transform:uppercase}' +
    '.ov>.dr.lf-dr>div:first-child b i{font-style:normal;font-weight:300;color:#FF9A3C}' +
    '.ov>.dr.lf-dr>div:first-child .ib{width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.08);color:#fff}' +
    '.ov>.dr.lf-dr .lf-langrow{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 22px 12px;background:transparent!important;border:0!important}' +
    '.ov>.dr.lf-dr .lf-langrow>div:first-child{font-size:11px!important;font-weight:500;letter-spacing:.2em!important;color:rgba(255,255,255,.6)!important;margin:0!important}' +
    '.ov>.dr.lf-dr .lf-langrow .lang{background:rgba(255,255,255,.07)!important;border:1px solid rgba(255,255,255,.2)!important;border-radius:99px;padding:3px;margin:0;gap:0}' +
    '.ov>.dr.lf-dr .lf-langrow .lang button{min-height:32px;padding:0 16px;font-size:13px;border:0;border-radius:99px;background:transparent!important;color:rgba(255,255,255,.85)!important}' +
    '.ov>.dr.lf-dr .lf-langrow .lang button.on{background:linear-gradient(135deg,#FF9A3C,#FF4D1F)!important;color:#fff!important}' +
    '.ov>.dr.lf-dr .lf-mt{position:relative;margin-top:8px;padding:18px 22px 6px;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55)!important}' +
    '.ov>.dr.lf-dr .lf-mt:before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent)}' +
    '.ov>.dr.lf-dr a.l{position:relative;display:flex!important;align-items:center;justify-content:flex-start!important;gap:16px;padding:12px 22px!important;border:0!important;font-size:15.5px!important;font-weight:400!important;letter-spacing:0!important;line-height:1.3!important;color:rgba(255,255,255,.88)!important;text-align:left;transition:background .2s,color .2s}' +
    '.ov>.dr.lf-dr a.l:before,.ov>.dr.lf-dr a.l:after{content:none!important}' +
    '.ov>.dr.lf-dr a.l.f{font-weight:500!important}' +
    '.ov>.dr.lf-dr a.l:hover,.ov>.dr.lf-dr a.l:active,.ov>.dr.lf-dr a.l.on{background:rgba(255,255,255,.08)!important;color:#fff!important}' +
    '.ov>.dr.lf-dr a.l.on:after{content:""!important;position:absolute;left:0;top:8px;bottom:8px;width:3px;border-radius:0 3px 3px 0;background:#FF6B2C}' +
    '.ov>.dr.lf-dr a.l .nm-i{flex:none;width:22px;height:22px;display:block;color:rgba(255,255,255,.75);transition:color .2s}' +
    '.ov>.dr.lf-dr a.l:hover .nm-i,.ov>.dr.lf-dr a.l.on .nm-i{color:#FF9A3C}' +
    '.ov>.dr.lf-dr .lf-mcta{position:sticky!important;left:auto!important;right:auto!important;bottom:12px!important;margin:auto 18px 0!important;padding:14px 18px!important;border-radius:99px!important;background:linear-gradient(135deg,#FF9A3C,#FF4D1F)!important;color:#fff!important;font-weight:600;box-shadow:0 12px 28px rgba(255,77,31,.35)!important;z-index:4}' +
    '.ov>.dr.lf-dr .lf-soc-b,.ov>.dr.lf-dr .lf-soc-b span{color:rgba(255,255,255,.6)!important}' +
    '@media(prefers-reduced-motion:reduce){.ov>.dr.lf-dr{animation:none!important}}';
  var P = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17v4M17 19h4"/>',
    box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    ship: '<path d="M3 14h18l-2 5H5z"/><path d="M6 14V9h12v5M10 9V6h4v3"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2"/>',
    truck: '<path d="M2 6h11v10H2z"/><path d="M13 9h4l4 4v3h-8"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/>',
    book: '<path d="M4 5a2 2 0 012-2h13v17H6a2 2 0 00-2 2z"/><path d="M4 19a2 2 0 012-2h13"/>',
    cmp: '<path d="M7 4v16M17 4v16"/><path d="M3 8l4-4 4 4M13 16l4 4 4-4"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1.1-1.5 2.2M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
    doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 7l9 6 9-6"/>'
  };
  function icon(h) {
    h = String(h || '');
    if (h === '#/' || h === '#' || h === '') return P.home;
    if (h.indexOf('#/all') === 0) return P.grid;
    if (h.indexOf('#/c/') === 0) {
      if (/neuv|new/.test(h)) return P.spark; if (/occas|used/.test(h)) return P.tag;
      if (/mariti|ship/.test(h)) return P.ship; if (/conten|cont/.test(h)) return P.box; return P.home;
    }
    if (/livraison/.test(h)) return P.truck; if (/financ/.test(h)) return P.card; if (/guide/.test(h)) return P.book;
    if (/compar/.test(h)) return P.cmp; if (/simul/.test(h)) return P.calc; if (/faq/.test(h)) return P.help;
    if (/propos|about/.test(h)) return P.info; if (/confid|privacy/.test(h)) return P.shield;
    if (/mention|cgv/.test(h)) return P.doc; if (/contact/.test(h)) return P.mail; return P.doc;
  }
  var styled = false;
  function decorate() {
    var dr = document.querySelector('.ov .dr.lf-dr'); if (!dr || dr.__nm) return;
    dr.__nm = 1;
    var en = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
    var hb = dr.querySelector(':scope>div:first-child b'); if (hb) hb.innerHTML = 'AURIAM <i>HOME</i>';
    var cur = location.hash || '#/';
    var links = dr.querySelectorAll('a.l');
    for (var i = 0; i < links.length; i++) {
      var a = links[i], h = a.getAttribute('href') || '';
      if (!a.querySelector('.nm-i')) {
        var sp = document.createElement('span'); sp.className = 'nm-i';
        sp.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icon(h) + '</svg>';
        a.insertBefore(sp, a.firstChild);
      }
      if (h === cur || (h === '#/' && (cur === '#' || cur === ''))) a.classList.add('on');
    }
    var cg = dr.querySelector('a.l[href="#/cgv"]');
    if (cg && !dr.querySelector('a.l[href="/confidentialite/"]')) {
      var pv = document.createElement('a'); pv.className = 'l'; pv.setAttribute('href', '/confidentialite/');
      pv.innerHTML = '<span class="nm-i"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P.shield + '</svg></span>' + (en ? 'Privacy and cookies' : 'Confidentialité et cookies');
      cg.parentNode.insertBefore(pv, cg.nextSibling);
    }
    var legal = dr.querySelector('a.l[href="#/mentions"]');
    if (legal && !dr.querySelector('.lf-mt.nm-l')) {
      var t = document.createElement('div'); t.className = 'lf-mt nm-l'; t.textContent = en ? 'Legal' : 'Légal';
      legal.parentNode.insertBefore(t, legal);
    }
  }
  function go() {
    if (!styled) { var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); styled = true; }
    var app = document.getElementById('app'); if (!app) return; var raf = 0;
    new MutationObserver(function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; decorate(); }); }).observe(app, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
/* ship.js - scene 3D au defilement : chargement du conteneur, camion, cargo. Remplace la section video. */
(function () {
  'use strict';
  var W = window, D = document, T3 = null, S = null, styled = false, pend = 0;
  var TX = {
    fr: { eye: 'Du chargement à la livraison', c: [
      { a: .02, b: .22, k: '1 · Chargement', h: 'Chargé avec soin.', p: 'Chaque conteneur et chaque maison est levé et posé sur le camion par des professionnels.' },
      { a: .27, b: .55, k: '2 · Transport', h: 'En route vers chez vous.', p: 'Un transporteur spécialisé l’achemine jusqu’à votre terrain.' },
      { a: .72, b: .99, k: '3 · Livraison', h: 'Par la route ou par la mer.', p: 'Livraison en Europe, selon votre destination.' }] },
    en: { eye: 'From loading to delivery', c: [
      { a: .02, b: .22, k: '1 · Loading', h: 'Loaded with care.', p: 'Every container and every home is lifted and set on the truck by professionals.' },
      { a: .27, b: .55, k: '2 · Transport', h: 'On its way to you.', p: 'A specialised carrier brings it right to your land.' },
      { a: .72, b: .99, k: '3 · Delivery', h: 'By road or by sea.', p: 'Delivery across Europe, depending on your destination.' }] }
  };
  var CSS = '.sh{position:relative;height:440vh;margin:0;background:transparent}' +
    '.sh-s{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden}' +
    '.sh-c{position:absolute;left:0;top:0;width:100%;height:100%;display:block;-webkit-mask-image:linear-gradient(180deg,transparent,#000 16%,#000 84%,transparent);mask-image:linear-gradient(180deg,transparent,#000 16%,#000 84%,transparent)}' +
    '.sh-f{position:absolute;inset:0;background:#07142B;opacity:0;pointer-events:none}' +
    '.sh-e{position:absolute;left:max(20px,5vw);top:84px;font:600 12px/1 Poppins,system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#FF8A4C;z-index:2}' +
    '.sh-t{position:absolute;left:0;right:0;bottom:0;padding:90px max(20px,5vw) calc(34px + env(safe-area-inset-bottom,0px));background:linear-gradient(180deg,rgba(7,20,43,0),rgba(7,20,43,.78) 55%,rgba(7,20,43,.9));z-index:2;min-height:210px;pointer-events:none}' +
    '.sh-i{position:absolute;left:max(20px,5vw);right:max(20px,5vw);bottom:calc(34px + env(safe-area-inset-bottom,0px));max-width:560px;z-index:3;opacity:0;transform:translateY(14px);transition:none;color:#fff}' +
    '.sh-i b{display:block;font:600 12px/1.2 Poppins,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#FF8A4C;margin-bottom:10px}' +
    '.sh-i h3{margin:0 0 8px;font:600 clamp(26px,4.4vw,46px)/1.08 Poppins,system-ui,sans-serif;color:#fff;text-wrap:balance}' +
    '.sh-i p{margin:0;font:400 clamp(15px,1.7vw,18px)/1.55 Poppins,system-ui,sans-serif;color:rgba(255,255,255,.82)}' +
    '.sh-p{position:absolute;right:max(14px,2.5vw);top:50%;width:3px;height:96px;margin-top:-48px;background:rgba(255,255,255,.18);border-radius:3px;z-index:2}' +
    '.sh-p i{display:block;width:100%;height:0;background:#FF6B2C;border-radius:3px}' +
    '@media(max-width:820px){.sh{height:380vh}.sh-e{top:78px}.sh-i{right:78px}}';

  function lang() { return (D.documentElement.lang || '').toLowerCase().indexOf('en') === 0 ? 'en' : 'fr'; }
  function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function sm(x) { x = cl(x); return x * x * (3 - 2 * x); }
  function seg(p, a, b) { return cl((p - a) / (b - a)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function make() {
    var d = TX[lang()], el = D.createElement('section');
    el.className = 'sh'; el.setAttribute('aria-label', d.eye);
    var h = '<div class="sh-s"><canvas class="sh-c" aria-hidden="true"></canvas><div class="sh-f"></div><div class="sh-e">' + d.eye + '</div><div class="sh-t"></div>';
    for (var i = 0; i < d.c.length; i++) h += '<div class="sh-i"><b>' + d.c[i].k + '</b><h3>' + d.c[i].h + '</h3><p>' + d.c[i].p + '</p></div>';
    el.innerHTML = h + '<div class="sh-p"><i></i></div></div>';
    return el;
  }

  /* ---------- 3D ---------- */
  function cvTex(w, h, fn, rx, ry) {
    var c = D.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h);
    var t = new T3.CanvasTexture(c); t.wrapS = t.wrapT = T3.RepeatWrapping; if (rx) t.repeat.set(rx, ry || 1); return t;
  }
  var matC = {};
  function cmat(col, len) {
    var k = col + '_' + len; if (matC[k]) return matC[k];
    var t = cvTex(128, 32, function (g, w, h) {
      g.fillStyle = '#' + ('000000' + col.toString(16)).slice(-6); g.fillRect(0, 0, w, h);
      for (var x = 0; x < w; x += 8) { g.fillStyle = 'rgba(0,0,0,.30)'; g.fillRect(x, 0, 3, h); g.fillStyle = 'rgba(255,255,255,.10)'; g.fillRect(x + 3, 0, 2, h); }
    }, Math.max(1, len / 4), 1);
    return (matC[k] = new T3.MeshLambertMaterial({ map: t }));
  }
  var edgeM = null;
  function cont(len, col) {
    var g = new T3.Group(), m = new T3.Mesh(new T3.BoxGeometry(len, 2.6, 2.4), cmat(col, len));
    g.add(m);
    var e = new T3.LineSegments(new T3.EdgesGeometry(m.geometry), edgeM); g.add(e);
    return g;
  }
  function box(w, h, d, col, x, y, z, par) {
    var m = new T3.Mesh(new T3.BoxGeometry(w, h, d), new T3.MeshLambertMaterial({ color: col }));
    m.position.set(x, y, z); if (par) par.add(m); return m;
  }
  function wheel(r, x, y, z, par) {
    var g = new T3.CylinderGeometry(r, r, .5, 16); g.rotateX(Math.PI / 2);
    var m = new T3.Mesh(g, new T3.MeshLambertMaterial({ color: 0x0d0f14 })); m.position.set(x, y, z); par.add(m); return m;
  }

  function init(el) {
    if (S && S.el !== el) { try { S.dead = true; S.ren.dispose(); } catch (e) { } }
    var T = T3, cv = el.querySelector('.sh-c'), st = el.querySelector('.sh-s'), fade = el.querySelector('.sh-f'),
      inf = el.querySelectorAll('.sh-i'), bar = el.querySelector('.sh-p i'), d = TX[lang()];
    var ren;
    try { ren = new T.WebGLRenderer({ canvas: cv, antialias: W.innerWidth > 700, alpha: false, powerPreference: 'high-performance' }); } catch (e) { el.remove(); return; }
    var BG = 0x07142B;
    ren.setClearColor(BG, 1);
    var scene = new T.Scene(); scene.fog = new T.Fog(BG, 70, 300);
    var cam = new T.PerspectiveCamera(40, 1, .5, 2500);
    scene.add(new T.HemisphereLight(0xcfe0ff, 0x1a2340, .95));
    var sun = new T.DirectionalLight(0xfff1e2, 1.05); sun.position.set(-25, 45, 30); scene.add(sun);
    edgeM = edgeM || new T.LineBasicMaterial({ color: 0x0a0d14, transparent: true, opacity: .55 });

    /* sol (route / cour) qui suit la camera */
    var gt = cvTex(64, 64, function (g, w, h) {
      g.fillStyle = '#1b2438'; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 400; i++) { g.fillStyle = 'rgba(255,255,255,' + (Math.random() * .035) + ')'; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); }
      g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(0, 0, w, 1); g.fillRect(0, 0, 1, h);
    }, 40, 20);
    var ground = new T.Mesh(new T.PlaneGeometry(400, 200), new T.MeshLambertMaterial({ map: gt }));
    ground.rotation.x = -Math.PI / 2; scene.add(ground);
    var lt = cvTex(64, 4, function (g, w, h) { g.fillStyle = '#fff'; g.fillRect(0, 0, w * .55, h); }, 40, 1);
    var lane = new T.Mesh(new T.PlaneGeometry(400, .3), new T.MeshBasicMaterial({ map: lt, transparent: true, opacity: .55 }));
    lane.rotation.x = -Math.PI / 2; lane.position.set(0, .02, 9.5); scene.add(lane);

    /* piles de conteneurs */
    var stacks = new T.Group(); scene.add(stacks);
    var COLS = [0xE8631A, 0x1f3f86, 0xcfd3d8, 0x159a9c, 0xb3262d];
    function stack(x, z, cols) { for (var i = 0; i < cols.length; i++) { var c = cont(12, cols[i]); c.position.set(x, 1.3 + i * 2.6, z); stacks.add(c); } }
    stack(10, -4, [COLS[1], COLS[2]]);
    stack(10, -7.4, [COLS[3], COLS[4], COLS[1]]);
    stack(26, -4, [COLS[2], COLS[0]]);
    stack(-20, -5, [COLS[4], COLS[1], COLS[2]]);
    stack(-20, -8.4, [COLS[0], COLS[3]]);
    var top = cont(12, COLS[0]); scene.add(top);

    /* engin de manutention */
    var rs = new T.Group(); rs.position.set(-2, 0, -1.6); scene.add(rs);
    box(5, 2, 3.4, 0x159a9c, 0, 1.9, 0, rs);
    box(1.7, 1.7, 2, 0x0e7479, -1.9, 3.7, 0, rs); box(.1, 1, 1.5, 0x0b1220, -.98, 3.9, 0, rs);
    box(1.4, 1.3, 3.2, 0x0e5f66, 2.1, 1.2, 0, rs);
    var pw = [[-1.8, 1.6], [1.8, 1.6], [-1.8, -1.6], [1.8, -1.6]]; for (var i = 0; i < 4; i++) wheel(1.0, pw[i][0], 1.0, pw[i][1] * 1.0, rs);
    var pivot = new T.Vector3(-2 + 1.4, 3.3, -1.6);
    var bg = new T.BoxGeometry(.8, .8, 1); bg.translate(0, 0, .5);
    var boom = new T.Mesh(bg, new T.MeshLambertMaterial({ color: 0x1cb0b3 })); scene.add(boom);
    var spr = box(12, .3, 2.4, 0x0b1220, 0, 0, 0, scene);

    /* camion */
    var tk = new T.Group(); tk.position.set(0, 0, 4); scene.add(tk);
    box(13.6, .3, 2.5, 0x161b26, 0, 1.15, 0, tk);
    box(2.6, 2.9, 2.5, 0x2c3d63, 8.4, 1.95 + .2, 0, tk);
    box(.2, 1.1, 2.2, 0x9fb4d6, 9.75, 2.9, 0, tk);
    box(.1, 1.2, 2.3, 0xE8631A, 9.72, 1.5, 0, tk);
    box(2.2, .9, 2.5, 0x1d2a47, 6.9, 1.2, 0, tk);
    var ws = [-5.6, -4.4, -3.2, 3.4, 4.6, 8.9]; for (i = 0; i < ws.length; i++) { wheel(.62, ws[i], .62, 1.05, tk); wheel(.62, ws[i], .62, -1.05, tk); }

    /* cargo vu de dessus */
    var sh = new T.Group(); sh.position.set(0, 0, -2000); scene.add(sh);
    var oc = new T.Mesh(new T.PlaneGeometry(900, 900), new T.MeshLambertMaterial({
      map: cvTex(256, 256, function (g, w, h) {
        g.fillStyle = '#0b3a85'; g.fillRect(0, 0, w, h);
        for (var i = 0; i < 160; i++) { g.strokeStyle = 'rgba(255,255,255,' + (.04 + Math.random() * .09) + ')'; g.lineWidth = 1 + Math.random() * 1.5; var x = Math.random() * w, y = Math.random() * h; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 6 + Math.random() * 18, y + (Math.random() - .5) * 4); g.stroke(); }
      }, 36, 36)
    }));
    oc.rotation.x = -Math.PI / 2; oc.position.set(0, -.6, -2000); scene.add(oc);
    var shp = new T.Shape(); shp.moveTo(-6, -40); shp.lineTo(6, -40); shp.lineTo(6, 24); shp.lineTo(0, 49); shp.lineTo(-6, 24); shp.lineTo(-6, -40);
    var hg = new T.ExtrudeGeometry(shp, { depth: 3.2, bevelEnabled: false }); hg.rotateX(-Math.PI / 2);
    var hull = new T.Mesh(hg, new T.MeshLambertMaterial({ color: 0x1a2644 })); hull.position.y = -.7; sh.add(hull);
    var seed = 7; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    var xs = [-4.5, -1.5, 1.5, 4.5];
    for (var bz = -21; bz <= 21; bz += 6.6) for (var bx = 0; bx < 4; bx++) {
      var hh = 1 + Math.floor(rnd() * 3);
      for (var lv = 0; lv < hh; lv++) { var c = cont(6, COLS[Math.floor(rnd() * 5)]); c.rotation.y = Math.PI / 2; c.position.set(xs[bx], 2.5 + 1.3 + lv * 2.6, bz); sh.add(c); }
    }
    box(10.4, 10, 5.6, 0xe9edf3, 0, 2.5 + 5, 31, sh); box(10.5, 1.2, 4, 0x0b1220, 0, 2.5 + 7.2, 30.2, sh); box(3, 5, 3, 0xE8631A, 0, 2.5 + 12, 32, sh);
    var wk = new T.Mesh(new T.PlaneGeometry(18, 120), new T.MeshBasicMaterial({
      map: cvTex(64, 256, function (g, w, h) {
        var gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, 'rgba(255,255,255,.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = gr; g.beginPath(); g.moveTo(w * .36, 0); g.lineTo(w * .64, 0); g.lineTo(w, h); g.lineTo(0, h); g.closePath(); g.fill();
      }), transparent: true, depthWrite: false
    }));
    wk.rotation.x = -Math.PI / 2; wk.position.set(0, -.1, 40 + 60); sh.add(wk);
    var fm = cvTex(16, 64, function (g, w, h) { g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(0, 0, w, h); for (var i = 0; i < 20; i++) { g.fillStyle = 'rgba(11,63,143,.5)'; g.fillRect(Math.random() * w, Math.random() * h, 5, 8); } }, 1, 16);
    for (var sd = -1; sd <= 1; sd += 2) { var f = new T.Mesh(new T.PlaneGeometry(2, 90), new T.MeshBasicMaterial({ map: fm, transparent: true, opacity: .7, depthWrite: false })); f.rotation.x = -Math.PI / 2; f.position.set(sd * 6.8, -.05, 0); sh.add(f); }

    /* ---- etat ---- */
    var P = 0, lastP = -1, dirty = true, vis = true, forced = null;
    var look = new T.Vector3(), pos = new T.Vector3();
    function setP(p) {
      P = p;
      /* conteneur */
      var up = sm(seg(p, 0, .05)), tr = sm(seg(p, .05, .15)), dn = sm(seg(p, .15, .21));
      var cx = lerp(10, 0, tr), cz = lerp(-4, 4, tr), cy = lerp(6.5, 10.2, up); cy = lerp(cy, 2.6, dn);
      var q = seg(p, .24, .66), D0 = 320 * q * q;
      if (p > .215) { cx += D0; }
      tk.position.x = D0;
      top.position.set(cx, cy, cz);
      spr.position.set(cx, cy + 1.45, cz);
      var rt = sm(seg(p, .215, .27));
      if (rt > 0) { spr.position.set(lerp(cx, -.5, rt), lerp(cy + 1.45, 8.5, rt), lerp(cz, -1.6, rt)); spr.visible = rt < 1; }
      var tg = spr.position, ln = pivot.distanceTo(tg); boom.position.copy(pivot); boom.lookAt(tg); boom.scale.z = ln;
      /* camera */
      var sf = 1;
      if (p < .6) {
        var lx, ly, lz, cxx, cyy, czz;
        if (p < .24) {
          var a = sm(seg(p, 0, .21)); lx = lerp(4, 3, a); ly = lerp(4.5, 3.6, a); lz = lerp(-1, 1.5, a);
          cxx = lerp(9, 6, a); cyy = lerp(14, 11, a); czz = lerp(48, 40, a);
        } else {
          var u = sm(seg(p, .24, .5));
          lx = lerp(3, D0 + 1, sm(seg(p, .22, .3))); ly = lerp(3.6, 3, u); lz = 3;
          cxx = lx + lerp(2, -4, u); cyy = lerp(11, 7, u); czz = lerp(40, 28, u);
          var o = sm(seg(p, .5, .6));
          cxx = lerp(cxx, lx, o); cyy = lerp(cyy, 46, o); czz = lerp(czz, 4.01, o); ly = lerp(ly, 0, o); lz = 4;
        }
        look.set(lx, ly, lz); pos.set(cxx, cyy, czz);
        scene.fog.near = 70; scene.fog.far = 300;
        ground.position.set(lx, 0, 0); lane.position.x = lx;
        gt.offset.x = lx / 10; lt.offset.x = lx / 10;
        top.visible = true; tk.visible = true; stacks.visible = true; rs.visible = true; boom.visible = true; if (rt < 1) spr.visible = true;
        sh.visible = false; oc.visible = false;
      } else {
        var s2 = seg(p, .68, 1), sm2 = sm(s2);
        look.set(0, 0, -2000 + lerp(-30, 30, s2)); pos.set(lerp(-6, 4, s2) , lerp(88, 66, sm2), look.z + lerp(34, 18, sm2));
        scene.fog.near = 300; scene.fog.far = 900;
        top.visible = tk.visible = stacks.visible = rs.visible = boom.visible = spr.visible = ground.visible = lane.visible = false;
        sh.visible = true; oc.visible = true;
        fm.offset.y = -p * 40; oc.material.map.offset.y = -(p - .6) * 4;
      }
      if (p < .6) { ground.visible = true; lane.visible = true; }
      cam.position.copy(pos).sub(look).multiplyScalar(cam.aspect < 1 ? 1.55 : 1).add(look);
      if (cam.aspect < 1 && p < .6) cam.position.y = Math.max(cam.position.y, pos.y);
      cam.lookAt(look);
      /* fondu */
      var fo = p < .6 ? 0 : p < .64 ? seg(p, .6, .64) : p < .685 ? 1 - seg(p, .64, .685) : 0;
      if (p < .6) fo = 0;
      if (p >= .56 && p < .6) fo = seg(p, .56, .6);
      fade.style.opacity = fo.toFixed(3);
      /* textes */
      for (var i = 0; i < inf.length; i++) {
        var c2 = d.c[i], v = Math.min(sm(seg(p, c2.a, c2.a + .035)), 1 - sm(seg(p, c2.b - .035, c2.b)));
        inf[i].style.opacity = v.toFixed(3); inf[i].style.transform = 'translateY(' + ((1 - v) * 14).toFixed(1) + 'px)';
      }
      bar.style.height = (p * 100).toFixed(1) + '%';
      dirty = true;
    }
    function size() {
      var w = st.clientWidth, h = st.clientHeight; if (!w || !h) return;
      ren.setPixelRatio(Math.min(W.devicePixelRatio || 1, 1.75)); ren.setSize(w, h, false);
      cam.aspect = w / h; cam.updateProjectionMatrix(); setP(P);
    }
    function prog() {
      var r = el.getBoundingClientRect(), tot = el.offsetHeight - st.clientHeight;
      return tot > 0 ? cl(-r.top / tot) : 0;
    }
    S = { el: el, ren: ren, dead: false, set: function (v) { forced = v; setP(v); ren.render(scene, cam); } };
    W.__SHIP = S;
    var io = 'IntersectionObserver' in W ? new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }, { rootMargin: '200px' }) : null;
    if (io) io.observe(el);
    W.addEventListener('resize', size);
    size();
    (function loop() {
      if (S.dead || !el.isConnected) { try { ren.dispose(); } catch (e) { } W.removeEventListener('resize', size); return; }
      if (vis && forced === null) { var p = prog(); if (Math.abs(p - lastP) > .0004) { lastP = p; setP(p); } }
      if (dirty && vis) { ren.render(scene, cam); dirty = false; }
      W.requestAnimationFrame(loop);
    })();
  }

  /* ---------- insertion dans la page d'accueil ---------- */
  function hasGL() { try { var c = D.createElement('canvas'); return !!(c.getContext('webgl') || c.getContext('experimental-webgl')); } catch (e) { return false; } }
  function pass() {
    pend = 0;
    var app = D.getElementById('app'); if (!app || !app.querySelector('.hero')) return;
    var vd = app.querySelector('.vids'), vs = vd ? (vd.closest('section') || vd) : null, here = vs;
    if (app.querySelector('.sh')) { if (vs) vs.remove(); return; }
    if (!here) here = null;
    var anchor = here || app.querySelector('.mo-c');
    if (!anchor) { if (!app.querySelector('.mo-c')) return; }
    if (!hasGL()) { if (vs) vs.remove(); return; }
    if (!styled) { var s = D.createElement('style'); s.textContent = CSS; D.head.appendChild(s); styled = true; }
    var el = make();
    if (here) here.parentNode.replaceChild(el, here); else anchor.parentNode.insertBefore(el, anchor.nextSibling);
    var go = function () { T3 = W.THREE; if (!T3) { el.remove(); return; } init(el); };
    if (W.THREE) go(); else { var sc = D.createElement('script'); sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'; sc.onload = go; sc.onerror = function () { el.remove(); }; D.head.appendChild(sc); }
  }
  function ask() { if (!pend) pend = W.requestAnimationFrame(function () { setTimeout(pass, 60); }); }
  function boot() {
    var app = D.getElementById('app');
    if (!app) { return setTimeout(boot, 150); }
    new MutationObserver(ask).observe(app, { childList: true, subtree: true });
    ask();
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else boot();
})();
/* hero2.js - en-tete moderne et epure : titre, texte, boutons, grande photo arrondie avec chiffres, choix de categories */
(function () {
  'use strict';
  var W = window, D = document, styled = false, pend = 0;
  var TX = {
    fr: { find: 'Que recherchez-vous ?', visit: 'Visites au parc d’exposition', all: 'Tous les produits', alt: 'Maison mobile au parc d’exposition AURIAM HOME',
      st: [['36', 'mois', 'paiement échelonné'], ['7–10', 'jours', 'livraison en Europe'], ['30', 'jours', 'devis gratuit'], ['100', '%', 'installation offerte']] },
    en: { find: 'What are you looking for?', visit: 'Showroom visits', all: 'All products', alt: 'Mobile home at the AURIAM HOME showroom',
      st: [['36', 'months', 'instalment payment'], ['7–10', 'days', 'delivery in Europe'], ['30', 'days', 'free quote'], ['100', '%', 'free installation']] }
  };
  var IMG = 'photos/maison-hero.jpg?v=2';
  var CSS = '.hero{display:none!important}' +
    '.h2s{position:relative;padding:34px 0 10px;color:#0b1a38;font-family:Poppins,system-ui,sans-serif}' +
    '.h2w{width:min(1240px,calc(100% - 40px));margin:0 auto}' +
    '.h2t{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:clamp(24px,5vw,84px);align-items:end}' +
    '.h2k{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#E8581C}' +
    '.h2s h1{margin:14px 0 0;font-size:clamp(36px,5.6vw,72px);line-height:1.03;font-weight:600;font-style:normal;letter-spacing:-.028em;color:#0b1a38;text-wrap:balance}' +
    '.h2r p{margin:0 0 24px;font-size:15.5px;line-height:1.7;color:#4d586d;max-width:430px}' +
    '.h2b{display:flex;flex-wrap:wrap;gap:12px}' +
    '.h2s .h2p,.h2s .h2o{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:15px 28px;font-size:15px;font-weight:600;text-decoration:none;line-height:1;white-space:nowrap;transition:transform .2s,box-shadow .2s,background .2s}' +
    '.h2s .h2p{background:linear-gradient(135deg,#FF8A3D,#FF5A1F);color:#fff;box-shadow:0 10px 26px rgba(255,90,31,.32)}' +
    '.h2s .h2o{background:#fff;color:#0b1a38;border:1px solid rgba(11,26,56,.18)}' +
    '.h2s .h2p:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(255,90,31,.42)}.h2s .h2o:hover{background:#0b1a38;color:#fff}' +
    '.h2m{position:relative;margin-top:clamp(28px,4.2vw,52px);border-radius:32px;overflow:hidden;aspect-ratio:16/7;background:#e8e3d9;box-shadow:0 30px 70px rgba(11,26,56,.18);isolation:isolate}' +
    '.h2m img{position:absolute;left:0;top:-8%;width:100%;height:116%;object-fit:cover;object-position:center 60%;transform:translate3d(0,var(--py,0px),0) scale(1.02);will-change:transform}' +
    '.h2m:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,20,43,0) 45%,rgba(7,20,43,.6) 100%);pointer-events:none}' +
    '.h2c{position:absolute;left:22px;bottom:22px;z-index:2;display:flex;background:rgba(10,22,46,.5);-webkit-backdrop-filter:blur(16px) saturate(1.2);backdrop-filter:blur(16px) saturate(1.2);border:1px solid rgba(255,255,255,.2);border-radius:22px;padding:16px 4px}' +
    '.h2c div{padding:0 26px;border-right:1px solid rgba(255,255,255,.16);min-width:0}.h2c div:last-child{border:0}' +
    '.h2c b{display:block;font-size:24px;font-weight:600;line-height:1.1;letter-spacing:-.01em;white-space:nowrap}.h2c b i{font-style:normal;font-size:13px;font-weight:500;color:#FF9A5C;margin-left:4px}' +
    '.h2c span{display:block;margin-top:5px;font-size:12px;color:rgba(255,255,255,.72)}' +
    '.h2v{position:absolute;right:22px;bottom:22px;z-index:2;display:flex;align-items:center;gap:14px;padding:10px 22px 10px 10px;border-radius:999px;background:rgba(10,22,46,.5);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.2);color:#fff;text-decoration:none;font-size:14px;font-weight:500;transition:background .2s}' +
    '.h2v:hover{background:rgba(255,106,44,.35)}' +
    '.h2v i{width:44px;height:44px;border-radius:50%;background:#fff;color:#0b1a38;display:flex;align-items:center;justify-content:center}.h2v svg{width:18px;height:18px}' +
    '.h2f{margin-top:16px;display:flex;flex-wrap:wrap;align-items:center;gap:12px 14px;padding:20px 26px;border-radius:26px;background:#fff;box-shadow:0 10px 34px rgba(11,26,56,.08);border:1px solid rgba(11,26,56,.06)}' +
    '.h2f>b{color:#0b1a38;font-size:16px;font-weight:600;margin-right:10px}' +
    '.h2f a{display:inline-flex;align-items:center;gap:8px;padding:11px 20px;border-radius:999px;border:1px solid rgba(11,26,56,.16);color:#0b1a38;text-decoration:none;font-size:14px;font-weight:500;transition:background .2s,border-color .2s,color .2s}' +
    '.h2f a:hover{background:#FF6B2C;border-color:#FF6B2C;color:#fff}' +
    '.h2s .h2a{opacity:0;transform:translateY(20px);animation:h2u .9s cubic-bezier(.2,.7,.2,1) forwards}' +
    '@keyframes h2u{to{opacity:1;transform:none}}' +
    '@media(prefers-reduced-motion:reduce){.h2s .h2a{animation:none;opacity:1;transform:none}.h2m img{transform:none!important}}' +
    '@media(max-width:900px){.h2t{grid-template-columns:1fr;gap:22px}.h2m{aspect-ratio:4/5.4;border-radius:26px}.h2m img{object-position:56% 60%}' +
    '.h2c{left:12px;right:12px;bottom:12px;display:grid;grid-template-columns:1fr 1fr;padding:6px 0;border-radius:20px}.h2c div{padding:12px 16px;border-right:0}.h2c div:nth-child(odd){border-right:1px solid rgba(255,255,255,.16)}.h2c div:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.16)}.h2c b{font-size:21px}' +
    '.h2v{right:12px;top:12px;bottom:auto;padding:6px 16px 6px 6px;font-size:13px}.h2v i{width:36px;height:36px}.h2f{padding:18px 18px}.h2f a{padding:10px 16px}.h2s .h2p,.h2s .h2o{flex:1 1 auto;padding:16px 22px}}';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function build(hero, app) {
    var en = (D.documentElement.lang || '').toLowerCase().indexOf('en') === 0, d = TX[en ? 'en' : 'fr'];
    var k = hero.querySelector('.k'), h1 = hero.querySelector('h1'), p = hero.querySelector('.t p'), btn = hero.querySelectorAll('.cta a');
    var b1 = btn[0], b2 = btn[1];
    var cats = [], seen = {}, as = app.querySelectorAll('a[href^="#/c/"]');
    for (var i = 0; i < as.length && cats.length < 5; i++) {
      var h = as[i].getAttribute('href'); if (seen[h]) continue;
      var tx = (as[i].querySelector('h3,h2,b,strong') || as[i]).textContent.replace(/\s+/g, ' ').trim(); if (!tx || tx.length > 40) continue;
      seen[h] = 1; cats.push([h, tx]);
    }
    var s = D.createElement('section'); s.className = 'h2s'; s.setAttribute('aria-label', en ? 'Home' : 'Accueil');
    var st = d.st.map(function (x) { return '<div><b>' + x[0] + '<i>' + x[1] + '</i></b><span>' + x[2] + '</span></div>'; }).join('');
    s.innerHTML = '<div class="h2w"><div class="h2t"><div class="h2l"><span class="h2k h2a" style="animation-delay:.05s">' + (k ? esc(k.textContent.replace(/\s+/g, ' ').trim()) : '') + '</span><h1 class="h2a" style="animation-delay:.15s">' + (h1 ? esc(h1.textContent.replace(/\s+/g, ' ').trim()) : '') + '</h1></div>' +
      '<div class="h2r h2a" style="animation-delay:.32s"><p>' + (p ? esc(p.textContent.replace(/\s+/g, ' ').trim()) : '') + '</p><div class="h2b"><a class="h2p" href="' + esc(b1 ? b1.getAttribute('href') : '#/all') + '">' + (b1 ? b1.innerHTML : d.all) + '</a>' +
      (b2 ? '<a class="h2o" href="' + esc(b2.getAttribute('href')) + '"' + (b2.target ? ' target="' + esc(b2.target) + '" rel="noopener"' : '') + '>' + b2.innerHTML + '</a>' : '') + '</div></div></div>' +
      '<div class="h2m h2a" style="animation-delay:.5s"><img src="' + IMG + '" alt="' + esc(d.alt) + '" decoding="async"><div class="h2c">' + st + '</div>' +
      '<a class="h2v" href="#/contact"><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg></i>' + d.visit + '</a></div>' +
      '<div class="h2f h2a" style="animation-delay:.65s"><b>' + d.find + '</b>' + (cats.length ? cats.map(function (c) { return '<a href="' + esc(c[0]) + '">' + esc(c[1]) + '</a>'; }).join('') : '') + '<a href="#/all">' + d.all + ' →</a></div></div>';
    var img = s.querySelector('.h2m img'); img.onerror = function () { img.onerror = null; img.src = 'photos/hero.jpg'; };
    return s;
  }
  function parallax(s) {
    var m = s.querySelector('.h2m'), img = m && m.querySelector('img'); if (!img) return; var tk = 0;
    function up() { tk = 0; if (!s.isConnected) { W.removeEventListener('scroll', on); return; } var r = m.getBoundingClientRect(), vh = W.innerHeight || 800, c = (r.top + r.height / 2 - vh / 2) / vh; img.style.setProperty('--py', (c * -46).toFixed(1) + 'px'); }
    function on() { if (!tk) tk = W.requestAnimationFrame(up); }
    W.addEventListener('scroll', on, { passive: true }); up();
  }
  function pass() {
    pend = 0;
    var app = D.getElementById('app'), hero = app && app.querySelector('.hero');
    if (!hero || app.querySelector('.h2s') || !hero.querySelector('h1')) return;
    if (!styled) { var st = D.createElement('style'); st.textContent = CSS; D.head.appendChild(st); styled = true; }
    var s = build(hero, app); hero.parentNode.insertBefore(s, hero); parallax(s);
  }
  function ask() { if (!pend) pend = W.requestAnimationFrame(function () { setTimeout(pass, 70); }); }
  function boot() { var app = D.getElementById('app'); if (!app) return setTimeout(boot, 150); new MutationObserver(ask).observe(app, { childList: true, subtree: true }); ask(); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else boot();
})();
