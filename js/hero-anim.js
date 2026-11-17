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
    '.pc .pcv .pck{color:var(--cu);margin-bottom:6px}' +
    '.pc dl{margin:0;display:grid;grid-template-columns:1fr 1fr;gap:0 20px}' +
    '.pc dl>div{border-top:1px solid rgba(255,255,255,.22);padding:16px 0 18px}' +
    '.pc dt{font-size:12.5px;line-height:1.45;color:#C9D3E2;order:2;margin:6px 0 0}' +
    '.pc dd{margin:0;display:flex;flex-direction:column}' +
    '.pc dd b{font-size:clamp(34px,9vw,46px);line-height:1;font-weight:300;letter-spacing:-.02em;font-variant-numeric:tabular-nums}' +
    '.pc dd i{font-style:normal;font-size:14px;font-weight:600;color:var(--cu);margin-top:4px}' +
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
    '#tm .tem .who,#tm .tem blockquote+*{color:var(--cu)}' +
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
    '.foot .wrap{position:relative}.foot b{font-size:12px;letter-spacing:1.8px;text-transform:uppercase;color:var(--cu);margin-bottom:4px}' +
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
    if (cg && !app.querySelector('footer.foot a[href="/confidentialite/"]')) cg.insertAdjacentHTML('afterend', '<br><a href="/confidentialite/">' + (en ? 'Privacy &amp; cookies' : 'Confidentialité et cookies') + '</a>');
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
    '.ov>.dr.lf-dr>div:first-child b i{font-style:normal;font-weight:300;color:#fff}' +
    '.ov>.dr.lf-dr>div:first-child .ib{width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.08);color:#fff}' +
    '.ov>.dr.lf-dr .lf-langrow{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 22px 12px;background:transparent!important;border:0!important}' +
    '.ov>.dr.lf-dr .lf-langrow>div:first-child{font-size:11px!important;font-weight:500;letter-spacing:.2em!important;color:rgba(255,255,255,.6)!important;margin:0!important}' +
    '.ov>.dr.lf-dr .lf-langrow .lang{background:rgba(255,255,255,.07)!important;border:1px solid rgba(255,255,255,.2)!important;border-radius:99px;padding:3px;margin:0;gap:0}' +
    '.ov>.dr.lf-dr .lf-langrow .lang button{min-height:32px;padding:0 16px;font-size:13px;border:0;border-radius:99px;background:transparent!important;color:rgba(255,255,255,.85)!important}' +
    '.ov>.dr.lf-dr .lf-langrow .lang button.on{background:#fff!important;color:#0b1a38!important}' +
    '.ov>.dr.lf-dr .lf-mt{position:relative;margin-top:8px;padding:18px 22px 6px;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55)!important}' +
    '.ov>.dr.lf-dr .lf-mt:before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent)}' +
    '.ov>.dr.lf-dr a.l{position:relative;display:flex!important;align-items:center;justify-content:flex-start!important;gap:16px;padding:12px 22px!important;border:0!important;font-size:15.5px!important;font-weight:400!important;letter-spacing:0!important;line-height:1.3!important;color:rgba(255,255,255,.88)!important;text-align:left;transition:background .2s,color .2s}' +
    '.ov>.dr.lf-dr a.l:before,.ov>.dr.lf-dr a.l:after{content:none!important}' +
    '.ov>.dr.lf-dr a.l.f{font-weight:500!important}' +
    '.ov>.dr.lf-dr a.l:hover,.ov>.dr.lf-dr a.l:active,.ov>.dr.lf-dr a.l.on{background:rgba(255,255,255,.08)!important;color:#fff!important}' +
    '.ov>.dr.lf-dr a.l.on:after{content:""!important;position:absolute;left:0;top:8px;bottom:8px;width:3px;border-radius:0 3px 3px 0;background:#fff}' +
    '.ov>.dr.lf-dr a.l .nm-i{flex:none;width:22px;height:22px;display:block;color:rgba(255,255,255,.75);transition:color .2s}' +
    '.ov>.dr.lf-dr a.l:hover .nm-i,.ov>.dr.lf-dr a.l.on .nm-i{color:#fff}' +
    '.ov>.dr.lf-dr .lf-mcta{position:sticky!important;left:auto!important;right:auto!important;bottom:12px!important;margin:auto 18px 0!important;padding:14px 18px!important;border-radius:99px!important;background:#fff!important;color:#0b1a38!important;font-weight:600;box-shadow:0 12px 28px rgba(255,77,31,.35)!important;z-index:4}' +
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
    '.sh-e{position:absolute;left:max(20px,5vw);top:84px;font:600 12px/1 Poppins,system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#fff;z-index:2}' +
    '.sh-t{position:absolute;left:0;right:0;bottom:0;padding:90px max(20px,5vw) calc(34px + env(safe-area-inset-bottom,0px));background:linear-gradient(180deg,rgba(7,20,43,0),rgba(7,20,43,.78) 55%,rgba(7,20,43,.9));z-index:2;min-height:210px;pointer-events:none}' +
    '.sh-i{position:absolute;left:max(20px,5vw);right:max(20px,5vw);bottom:calc(34px + env(safe-area-inset-bottom,0px));max-width:560px;z-index:3;opacity:0;transform:translateY(14px);transition:none;color:#fff}' +
    '.sh-i b{display:block;font:600 12px/1.2 Poppins,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#fff;margin-bottom:10px}' +
    '.sh-i h3{margin:0 0 8px;font:600 clamp(26px,4.4vw,46px)/1.08 Poppins,system-ui,sans-serif;color:#fff;text-wrap:balance}' +
    '.sh-i p{margin:0;font:400 clamp(15px,1.7vw,18px)/1.55 Poppins,system-ui,sans-serif;color:rgba(255,255,255,.82)}' +
    '.sh-p{position:absolute;right:max(14px,2.5vw);top:50%;width:3px;height:96px;margin-top:-48px;background:rgba(255,255,255,.18);border-radius:3px;z-index:2}' +
    '.sh-p i{display:block;width:100%;height:0;background:#fff;border-radius:3px}' +
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
/* models.js - maison mobile 12x4,5 m, conteneur maritime 20' side-door, conteneur bureau : modeles 3D (unite = 1 m) */
(function(W){
'use strict';
W.AH_BUILD=function(T){
function cvs(w,h,fn){var c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);var t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=4;t.encoding=T.sRGBEncoding;return t}
function rep(t,x,y){var c=t.clone();c.needsUpdate=true;c.repeat.set(x,y);return c}
var TX={};
function slats(base,line,n){return cvs(256,256,function(g,w,h){g.fillStyle=base;g.fillRect(0,0,w,h);var s=w/n;for(var i=0;i<n;i++){g.fillStyle=line;g.fillRect(i*s,0,2,h);g.fillStyle='rgba(255,255,255,.10)';g.fillRect(i*s+2,0,2,h)}for(var k=0;k<900;k++){g.fillStyle='rgba(0,0,0,'+(Math.random()*.05)+')';g.fillRect(Math.random()*w,Math.random()*h,1,Math.random()*30)}})}
function ribs(base,dark,n){return cvs(256,256,function(g,w,h){g.fillStyle=base;g.fillRect(0,0,w,h);var s=w/n;for(var i=0;i<n;i++){var gr=g.createLinearGradient(i*s,0,(i+1)*s,0);gr.addColorStop(0,'rgba(255,255,255,.14)');gr.addColorStop(.5,'rgba(0,0,0,0)');gr.addColorStop(1,dark);g.fillStyle=gr;g.fillRect(i*s,0,s,h)}})}
function sky(){return cvs(128,256,function(g,w,h){var gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#cfe3f6');gr.addColorStop(.55,'#8fb0cf');gr.addColorStop(.56,'#6d7f90');gr.addColorStop(1,'#46515d');g.fillStyle=gr;g.fillRect(0,0,w,h)})}
function M(c,r,m){return new T.MeshStandardMaterial({color:c,roughness:r==null?.7:r,metalness:m||0})}
function box(w,h,d,mat,x,y,z){var m=new T.Mesh(new T.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;return m}
function cyl(r,h,mat,x,y,z){var m=new T.Mesh(new T.CylinderGeometry(r,r,h,10),mat);m.position.set(x,y,z);m.castShadow=true;return m}
/* boite avec texture par face : repx/repy selon dimensions */
function tbox(w,h,d,tex,u,x,y,z,nx,ny){ // u = metres par motif horizontal
  var mats=[], f=function(a,b,ang){var t=rep(tex,a/u,b);return new T.MeshStandardMaterial({map:t,roughness:.75})};
  mats=[f(d,1),f(d,1),M(0x888888),M(0x666666),f(w,1),f(w,1)];
  var m=new T.Mesh(new T.BoxGeometry(w,h,d),mats);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;return m}
var GLASS=null;function glass(){if(!GLASS)GLASS=new T.MeshStandardMaterial({map:sky(),roughness:.05,metalness:.65,envMapIntensity:1});return GLASS}
function window_(g,w,h,x,y,z,ry,panes,frame,fc){ // fenetre plaquee sur une face
  var G=new T.Group();G.position.set(x,y,z);G.rotation.y=ry;var t=.07;
  var fm=M(fc||0x30353f,.5,.3);
  G.add(box(w,h,.03,glass(),0,0,.015));
  G.add(box(w+t*2,t,.09,fm,0,h/2+t/2-.01,.04));G.add(box(w+t*2,t,.09,fm,0,-h/2-t/2+.01,.04));
  G.add(box(t,h+t*2,.09,fm,-w/2-t/2+.01,0,.04));G.add(box(t,h+t*2,.09,fm,w/2+t/2-.01,0,.04));
  for(var i=1;i<panes;i++)G.add(box(.05,h,.07,fm,-w/2+w*i/panes,0,.04));
  g.add(G);return G}
function door_(g,w,h,x,y,z,ry,col,glassTop){var G=new T.Group();G.position.set(x,y,z);G.rotation.y=ry;
  G.add(box(w,h,.06,M(col,.6),0,0,.03));var fm=M(0xf4f4f2,.5);
  G.add(box(w+.1,.06,.08,fm,0,h/2+.03,.04));G.add(box(w+.1,.06,.08,fm,0,-h/2-.03,.04));G.add(box(.06,h+.1,.08,fm,-w/2-.03,0,.04));G.add(box(.06,h+.1,.08,fm,w/2+.03,0,.04));
  if(glassTop){G.add(box(w-.14,h*.46,.04,glass(),0,h*.22,.07))}
  G.add(box(.14,.03,.05,M(0x222222,.4,.5),w/2-.12,-.05,.09));g.add(G);return G}

/* ---------- MAISON MOBILE ---------- */
function home(){
  var g=new T.Group(),L=12,Wd=4.5,H=2.55,y0=.5;
  var paint=[],light=slats('#ffffff','#bcbcbc',14),dark=slats('#5b5c61','#47484c',14);
  g.add(box(L-.4,.28,Wd-.5,M(0x1c1d21,.8),0,y0-.14,0));
  [[-5,-1.7],[-5,1.7],[0,-1.7],[0,1.7],[5,-1.7],[5,1.7]].forEach(function(p){g.add(box(.12,.3,.12,M(0x2a2b2e,.6,.4),p[0],y0-.3,p[1]))});
  var wall=tbox(L,H,Wd,light,.9,0,y0+H/2,0);g.add(wall);[0,1,4,5].forEach(function(i){paint.push([wall.material[i],1])});
  // panneau fonce cote A (z+) partie arriere
  g.add(tbox(4.4,H-.05,.04,dark,.9,-3.8,y0+H/2,Wd/2+.02));
  // toit plat + debord
  var rm=M(0x3a3e47,.55,.25);g.add(box(L+.5,.14,Wd+.5,rm,0,y0+H+.07,0));g.add(box(L+.5,.28,.12,rm,0,y0+H-.02,Wd/2+.19));g.add(box(L+.5,.28,.12,rm,0,y0+H-.02,-Wd/2-.19));g.add(box(.12,.28,Wd+.5,rm,L/2+.19,y0+H-.02,0));g.add(box(.12,.28,Wd+.5,rm,-L/2-.19,y0+H-.02,0));
  // fenetres : cote A (z+)
  window_(g,2.7,1.9,3.3,y0+1.3,Wd/2+.0,0,4);
  window_(g,1.9,1.9,-.15,y0+1.3,Wd/2+.0,0,3);
  window_(g,.55,.5,-4.4,y0+1.6,Wd/2+.04,0,1);
  door_(g,.95,2.05,-5.35,y0+1.05,Wd/2+.0,0,0x4c5059,true);
  // bout est (x+)
  window_(g,3.2,1.9,0,y0+1.3,0,0,4).position.set(L/2,y0+1.3,0);
  g.children[g.children.length-1].rotation.y=Math.PI/2;
  // cote B (z-) fentes etroites
  for(var i=0;i<4;i++)window_(g,.28,1.7,-4.9+i*.8,y0+1.3,-Wd/2,Math.PI,1);
  window_(g,2.2,1.9,2.6,y0+1.3,-Wd/2,Math.PI,3);
  // gouttiere
  g.add(cyl(.055,H,M(0x30353f,.5,.3),L/2-.05,y0+H/2,Wd/2+.08));
  // marches bois
  var wd=M(0xa98458,.85);g.add(box(1.4,.18,.5,wd,-5.35,.09,Wd/2+.55));g.add(box(1.4,.18,.5,wd,-5.35,.27,Wd/2+.2));
  g.userData={L:L,W:Wd,H:H+y0+.3,paint:paint};return g}

/* ---------- CONTENEUR MARITIME 20' side door ---------- */
function maritime(open){
  var g=new T.Group(),L=6.058,Wd=2.438,H=2.591,t=.06,col=0xffffff,paint=[];
  var rb=ribs('#ffffff','rgba(0,0,0,.34)',10),mm=new T.MeshStandardMaterial({color:0xffffff,map:rep(rb,L/.45,1),roughness:.55,metalness:.35});paint.push([mm,1]);
  var dk=M(col,.6,.3);paint.push([dk,.82]);var wh=M(0xe9e8e2,.8),gr=M(0x8b9097,.45,.7);
  var sh=new T.Group();
  sh.add(box(L,.1,Wd,dk,0,.05+.15,0));
  var fl=cvs(128,128,function(c,w,h){c.fillStyle='#6b7077';c.fillRect(0,0,w,h);c.strokeStyle='rgba(255,255,255,.28)';c.lineWidth=2;for(var i=0;i<w;i+=8){c.beginPath();c.moveTo(i,0);c.lineTo(i,h);c.stroke();c.beginPath();c.moveTo(0,i);c.lineTo(w,i);c.stroke()}});
  sh.add(box(L-.2,.04,Wd-.2,new T.MeshStandardMaterial({map:rep(fl,L*5,Wd*5),roughness:.5,metalness:.6}),0,.32,0));
  sh.add(box(L,t,Wd,dk,0,H-t/2,0));
  sh.add(box(L,H-.2,t,wh,0,H/2+.1,-Wd/2+t/2));
  sh.add(box(t,H-.2,Wd,wh,-L/2+t/2,H/2+.1,0));sh.add(box(t,H-.2,Wd,wh,L/2-t/2,H/2+.1,0));
  // cadre exterieur
  sh.add(box(L,.2,Wd,dk,0,.1,0));
  var r=new T.Mesh(new T.BoxGeometry(L,H,.04),mm);r.position.set(0,H/2,-Wd/2-.01);r.castShadow=true;sh.add(r);
  var em=new T.MeshStandardMaterial({color:0xffffff,map:rep(rb,Wd/.45,1),roughness:.55,metalness:.35});paint.push([em,1]);var e1=new T.Mesh(new T.BoxGeometry(.04,H,Wd),em);e1.position.set(-L/2-.01,H/2,0);sh.add(e1);
  var e2=e1.clone();e2.position.set(L/2+.01,H/2,0);sh.add(e2);
  // coins
  [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(function(p){[0.1,H-.1].forEach(function(yy){sh.add(box(.18,.2,.16,M(0x2c3037,.5,.5),p[0]*(L/2-.06),yy,p[1]*(Wd/2-.05)))})});
  g.add(sh);
  // 4 portes sur le grand cote z+
  var dw=L/4;g.userData.doors=[];
  for(var i=0;i<4;i++){var hx=-L/2+i*dw+(i%2?dw:0),side=(i%2?-1:1);
    var pv=new T.Group();pv.position.set(hx,0,Wd/2);
    var dm=new T.MeshStandardMaterial({color:0xffffff,map:rep(rb,dw/.45,1),roughness:.55,metalness:.35});paint.push([dm,1]);var d=new T.Mesh(new T.BoxGeometry(dw-.02,H-.06,.05),[dk,dk,dk,dk,dm,M(0xe9e8e2,.8)]);
    d.position.set(side*dw/2,H/2,.03);d.castShadow=true;pv.add(d);
    [.28,.72].forEach(function(f){pv.add(cyl(.018,H-.35,gr,side*dw*f,H/2,.09));pv.add(box(.05,.1,.04,gr,side*dw*f,.55,.09));pv.add(box(.05,.1,.04,gr,side*dw*f,H-.5,.09))});
    pv.userData={side:side};g.add(pv);g.userData.doors.push(pv)}
  g.userData.setOpen=function(a){g.userData.doors.forEach(function(p,i){p.rotation.y=-p.userData.side*a*(i%2?1:1)*(1)})};
  g.userData.L=L;g.userData.W=Wd;g.userData.H=H;g.userData.paint=paint;
  if(open)g.userData.setOpen(open);return g}

/* ---------- CONTENEUR BUREAU ---------- */
function office(){
  var g=new T.Group(),L=5.4,Wd=2.4,H=2.6,y0=.18;
  var paint=[],tex=slats('#ffffff','#b4b4b4',22);
  g.add(box(L,.14,Wd,M(0x8e9089,.7),0,y0-.07,0));
  var ob=tbox(L,H,Wd,tex,.5,0,y0+H/2,0);g.add(ob);[0,1,4,5].forEach(function(i){paint.push([ob.material[i],1])});
  // cadres angle + toit
  var fr=M(0xffffff,.6);paint.push([fr,.9]);[[-1,-1],[-1,1],[1,-1],[1,1]].forEach(function(p){g.add(box(.1,H,.1,fr,p[0]*(L/2),y0+H/2,p[1]*(Wd/2)))});
  g.add(box(L+.16,.14,Wd+.16,fr,0,y0+H+.05,0));g.add(box(L+.16,.2,.08,fr,0,y0+H-.05,Wd/2+.04));g.add(box(L+.16,.2,.08,fr,0,y0+H-.05,-Wd/2-.04));
  g.add(box(L+.16,.14,Wd+.16,M(0x7e7f79,.8),0,y0+H+.15,0));
  // face avant z+ : porte vitree, fenetre coulissante, porte
  door_(g,.9,2.05,-2.0,y0+1.05,Wd/2,0,0xf2f2f0,true);
  var w=window_(g,1.2,1.0,-.2,y0+1.45,Wd/2,0,2,true,0xf4f4f2);
  door_(g,.85,2.05,1.9,y0+1.05,Wd/2,0,0xf0f0ee,false);
  g.add(box(.6,.3,.04,glass(),1.9,y0+1.78,Wd/2+.08));
  // bout est : grande fenetre
  var we=window_(g,1.9,1.3,0,y0+1.4,0,0,2,true,0xf4f4f2);we.position.set(L/2,y0+1.4,0);we.rotation.y=Math.PI/2;
  g.userData={L:L,W:Wd,H:H+y0+.2,paint:paint};return g}

/* ---------- MAISON MOBILE : VUE EN COUPE (amenagement imagine, presentation) ---------- */
function cut(){
  var g=new T.Group(),L=12,Wd=4.5,y0=.5,wh=1.15,paint=[],t=.1;
  var wallM=M(0xffffff,.8);paint.push([wallM,1]);
  var white=M(0xf6f4ef,.85),wood=M(0xc2a37a,.7),floorM=M(0xd9c7a6,.8),dark=M(0x3a3e47,.6),grey=M(0xb8b8b4,.8),fab=M(0x6e7f8c,.9),bed=M(0xeae6dc,.9),acc=M(0x5c6b45,.9),gl=M(0xbcd7ea,.2,.4);
  gl.transparent=true;gl.opacity=.45;
  var fy=y0+.1;
  var plank=cvs(256,256,function(c,w,h){c.fillStyle='#b98a5a';c.fillRect(0,0,w,h);var n=8,s=h/n;for(var i=0;i<n;i++){var sh=(Math.sin(i*12.9)*43758.5)%1;c.fillStyle='hsl(30,'+(28+(sh*6))+'%,'+(42+Math.abs(sh)*10)+'%)';c.fillRect(0,i*s,w,s-2);c.fillStyle='rgba(0,0,0,.28)';c.fillRect(0,i*s+s-2,w,2);var x=(Math.abs(sh)*w)|0;c.fillRect(x,i*s,2,s-2);for(var k=0;k<6;k++){c.fillStyle='rgba(255,255,255,.05)';c.fillRect(0,i*s+k*(s/6),w,1)}}});
  var tile=cvs(128,128,function(c,w,h){c.fillStyle='#d8dadc';c.fillRect(0,0,w,h);c.fillStyle='#b9bcc0';c.fillRect(0,0,w,2);c.fillRect(0,0,2,h);c.fillRect(w/2,0,2,h);c.fillRect(0,h/2,w,2)});
  var woodF=new T.MeshStandardMaterial({map:rep(plank,3.2,2.2),roughness:.55}),woodB=new T.MeshStandardMaterial({map:rep(plank,1.2,1.4),roughness:.55}),tileM=new T.MeshStandardMaterial({map:rep(tile,2,2),roughness:.35});
  g.add(box(L+.2,.2,Wd+.2,M(0x2a2c31,.7),0,y0-.1,0));
  g.add(box(L,.1,Wd,woodF,0,y0+.05,0));
  g.add(box(1.75,.02,Wd-.1,woodB,-4.2,fy+.01,0));
  g.add(box(1.75,.025,1.1,tileM,-2.4,fy+.012,1.7));g.add(box(1.75,.025,1.55,tileM,-2.4,fy+.012,-1.5));
  var cap=M(0x15171b,.6);
  /* murs exterieurs coupes */
  g.add(box(L+t,wh,t,wallM,0,fy+wh/2,-Wd/2));g.add(box(L+t,wh,t,wallM,0,fy+wh/2,Wd/2));
  g.add(box(t,wh,Wd,wallM,-L/2,fy+wh/2,0));g.add(box(t,wh,Wd,wallM,L/2,fy+wh/2,0));
  g.add(box(L-.1,wh-.04,.03,white,0,fy+wh/2,-Wd/2+.065));g.add(box(L-.1,wh-.04,.03,white,0,fy+wh/2,Wd/2-.065));
  g.add(box(.03,wh-.04,Wd-.1,white,-L/2+.065,fy+wh/2,0));g.add(box(.03,wh-.04,Wd-.1,white,L/2-.065,fy+wh/2,0));
  g.add(box(L+.14,.05,.14,cap,0,fy+wh+.02,-Wd/2));g.add(box(L+.14,.05,.14,cap,0,fy+wh+.02,Wd/2));g.add(box(.14,.05,Wd+.14,cap,-L/2,fy+wh+.02,0));g.add(box(.14,.05,Wd+.14,cap,L/2,fy+wh+.02,0));
  /* cloisons avec passage */
  function part(x,z0,z1){g.add(box(.08,wh,z1-z0,white,x,fy+wh/2,(z0+z1)/2));g.add(box(.1,.04,z1-z0,cap,x,fy+wh+.02,(z0+z1)/2))}
  part(-3.3,-Wd/2,.2);part(-3.3,1.1,Wd/2);
  part(-1.5,-Wd/2,-.2);part(-1.5,.7,Wd/2);
  /* chambre */
  g.add(box(2.0,.32,1.6,wood,-4.9,fy+.16,-.1));g.add(box(1.95,.2,1.55,bed,-4.85,fy+.42,-.1));
  g.add(box(.5,.12,.6,white,-5.55,fy+.58,-.55));g.add(box(.5,.12,.6,white,-5.55,fy+.58,.35));
  g.add(box(1.0,.05,1.55,acc,-4.25,fy+.54,-.1));
  g.add(box(.18,1.0,1.7,wood,-5.9,fy+.5,-.1));
  g.add(box(.4,.45,.4,wood,-5.6,fy+.22,-1.25));g.add(box(.4,.45,.4,wood,-5.6,fy+.22,1.05));
  g.add(box(.6,2.0,1.4,wood,-3.7,fy+1.0,-1.45));
  /* salle d'eau */
  g.add(box(.95,.08,.95,grey,-2.0,fy+.04,-1.75));g.add(box(.95,1.9,.03,gl,-2.0,fy+.95,-1.28));g.add(box(.03,1.9,.95,gl,-1.55,fy+.95,-1.75));
  g.add(box(.4,.4,.6,white,-3.0,fy+.2,1.7));g.add(box(.4,.12,.45,white,-3.0,fy+.62,1.95));
  g.add(box(.5,.8,.8,wood,-1.85,fy+.4,1.8));g.add(box(.45,.08,.5,white,-1.85,fy+.84,1.8));
  /* cuisine */
  g.add(box(3.6,.9,.65,dark,4.1,fy+.45,-1.9));g.add(box(3.62,.05,.7,white,4.1,fy+.92,-1.9));
  g.add(box(.6,.02,.45,grey,3.6,fy+.95,-1.9));g.add(box(.7,1.9,.65,white,5.5,fy+.95,-1.9));
  g.add(box(2.2,.04,.3,wood,3.7,fy+1.7,-2.05));
  g.add(box(1.8,.9,.55,dark,2.8,fy+.45,-1.9)); 
  /* ilot + tabourets */
  g.add(box(1.8,.9,.7,wood,3.9,fy+.45,-.5));g.add(box(1.84,.05,.74,white,3.9,fy+.92,-.5));
  [3.4,4.4].forEach(function(x){g.add(cyl(.18,.65,dark,x,fy+.33,.3));g.add(cyl(.2,.06,wood,x,fy+.68,.3))});
  /* salon */
  g.add(box(2.1,.45,.9,fab,-.2,fy+.22,-1.7));g.add(box(2.1,.45,.2,fab,-.2,fy+.67,-2.05));g.add(box(.2,.65,.9,fab,-1.15,fy+.32,-1.7));g.add(box(.2,.65,.9,fab,.75,fy+.32,-1.7));
  g.add(box(1.0,.3,.9,fab,1.5,fy+.15,-1.7)); 
  g.add(box(1.0,.05,.55,wood,-.2,fy+.35,-.7));
  g.add(box(1.8,.45,.4,dark,-.2,fy+.23,Wd/2-.4));g.add(box(1.2,.7,.04,M(0x15161a,.3),-.2,fy+.95,Wd/2-.55));
  /* table a manger */
  var tb=box(1.4,.05,.8,wood,1.8,fy+.74,1.1);g.add(tb);g.add(box(.08,.74,.08,dark,1.2,fy+.37,.8));g.add(box(.08,.74,.08,dark,2.4,fy+.37,.8));g.add(box(.08,.74,.08,dark,1.2,fy+.37,1.4));g.add(box(.08,.74,.08,dark,2.4,fy+.37,1.4));
  [[1.4,.4],[2.2,.4],[1.4,1.8],[2.2,1.8]].forEach(function(p){g.add(box(.4,.05,.4,acc,p[0],fy+.45,p[1]));g.add(box(.4,.45,.05,acc,p[0],fy+.68,p[1]+(p[1]<1?-.2:.2)))});
  [[-4.9,-Wd/2+.12,1.8],[1.0,-Wd/2+.12,2.0],[4.0,Wd/2-.12,2.4]].forEach(function(p){g.add(box(p[2],.06,.06,M(0xffffff,.9),p[0],fy+wh+.0,p[1]));g.add(box(p[2]-.1,wh-.5,.02,gl,p[0],fy+wh*.62,p[1]))});
  [[-5.6,-1.9],[-3.0,-1.9],[0.9,1.9],[5.6,-.4],[-5.6,1.9]].forEach(function(p){var pt=new T.Mesh(new T.IcosahedronGeometry(.28,0),M(0x5f7f4b,.9));pt.position.set(p[0],fy+.7,p[1]);pt.castShadow=true;g.add(pt);g.add(cyl(.12,.35,M(0xe9e4da,.7),p[0],fy+.2,p[1]))});
  g.add(box(.9,.5,.5,M(0x1f2126,.5),-.2,fy+.25,Wd/2-.55));
  /* tapis + plante */
  g.add(box(2.6,.02,1.7,M(0x8f8e8b,1),-.2,fy+.012,-.5));g.add(box(2.0,.022,1.3,M(0x6f6e6c,1),-.2,fy+.014,-.5));g.add(box(2.2,.02,1.4,M(0xb4aaa0,1),-4.85,fy+.012,-.1));g.add(box(1.6,.02,1.1,M(0x9a958c,1),1.8,fy+.012,1.1));
  g.add(cyl(.17,.4,wood,5.5,fy+.2,1.8));var pl=new T.Mesh(new T.IcosahedronGeometry(.4,0),M(0x6e8a55,.9));pl.position.set(5.5,fy+.7,1.8);pl.castShadow=true;g.add(pl);
  g.userData={L:L,W:Wd,H:2.0,paint:paint,el:1.1};return g}
return {home:home,maritime:maritime,office:office,cut:cut};
};
})(window);
/* stage3d.js - scene 3D de l'en-tete : maison mobile / conteneur maritime / conteneur bureau, couleur au choix */
(function (W) {
  'use strict';
  var D = document, loading = null;
  var TX = {
    fr: { tabs: ['Maison mobile', 'Conteneur maritime', 'Conteneur bureau', 'Vue en coupe'], hint: 'Glissez pour tourner · Choisissez une couleur', col: 'Couleur',
      sw: ['Crème', 'Bleu nuit', 'Sable', 'Vert olive'] },
    en: { tabs: ['Mobile home', 'Shipping container', 'Office container', 'Cutaway view'], hint: 'Drag to rotate · Pick a colour', col: 'Colour',
      sw: ['Cream', 'Navy', 'Sand', 'Olive'] }
  };
  var COL = ['#E6DCC8', '#1F3358', '#D4BF98', '#5C6B45'];
  var KEYS = ['home', 'maritime', 'office', 'cut'];
  var DEF = { home: 0, maritime: 1, office: 2, cut: 0 };
  var CSS = '' +
    '.h2m.h3{background:linear-gradient(180deg,#F8F4EC 0%,#EAE2D2 100%);aspect-ratio:16/7.4}' +
    '.h2m.h3:after{display:none}' +
    '.h2st{position:absolute;inset:0;z-index:1;touch-action:pan-y;cursor:grab}.h2st:active{cursor:grabbing}' +
    '.h2st canvas{position:absolute;inset:0;width:100%;height:100%;display:block;outline:0;z-index:1}' +
    '.h2fb{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:center 60%;z-index:2;opacity:1;transition:opacity .7s;pointer-events:none}' +
    '.h2st.ready .h2fb{opacity:0}.h2st.nogl .h2fb{opacity:1!important}.h2st.nogl canvas{display:none}' +
    '.h3tabs{position:absolute;left:20px;top:20px;z-index:3;display:flex;gap:8px;flex-wrap:wrap;max-width:calc(100% - 300px)}' +
    '.h3tabs button{font:inherit;font-size:13.5px;font-weight:500;color:#0b1a38;background:rgba(255,255,255,.55);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(11,26,56,.14);border-radius:999px;padding:10px 18px;cursor:pointer;white-space:nowrap;transition:background .2s,color .2s}' +
    '.h3tabs button:hover{background:rgba(255,255,255,.9)}.h3tabs button[aria-pressed=true]{background:#0b0b0f;color:#fff;border-color:#0b0b0f}' +
    '.h3sw{position:absolute;right:20px;top:20px;z-index:3;display:flex;align-items:center;gap:10px;padding:8px 10px 8px 16px;border-radius:999px;background:rgba(255,255,255,.55);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(11,26,56,.14)}' +
    '.h3sw span{font-size:13px;font-weight:500;color:#0b1a38}' +
    '.h3sw button{width:28px;height:28px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px rgba(11,26,56,.25);cursor:pointer;padding:0;transition:transform .2s,box-shadow .2s}' +
    '.h3sw button:hover{transform:scale(1.12)}.h3sw button[aria-pressed=true]{box-shadow:0 0 0 2px #0b1a38}' +
    '.h3hint{position:absolute;right:24px;top:72px;z-index:3;font-size:12px;color:#4d586d;pointer-events:none}' +
    '.h2m.h3 .h2c{background:rgba(255,255,255,.55)!important;border:1px solid rgba(11,26,56,.12)!important;color:#0b1a38;box-shadow:0 10px 30px rgba(11,26,56,.08)}' +
    '.h2m.h3 .h2c div{border-right-color:rgba(11,26,56,.12)}.h2m.h3 .h2c b i{color:#4d586d}.h2m.h3 .h2c span{color:#4d586d}' +
    '.h2m.h3 .h2v{background:rgba(255,255,255,.6)!important;border:1px solid rgba(11,26,56,.12);color:#0b1a38}.h2m.h3 .h2v:hover{background:#fff!important}.h2m.h3 .h2v i{background:#0b0b0f;color:#fff}' +
    '@media(max-width:900px){' +
    '.h2m.h3{aspect-ratio:auto;display:flex;flex-direction:column;overflow:hidden}' +
    '.h2m.h3 .h2st{position:relative;inset:auto;height:min(104vw,440px);order:1}' +
    '.h3tabs{left:0;right:0;top:12px;max-width:none;flex-wrap:nowrap;overflow-x:auto;padding:0 12px;scrollbar-width:none}.h3tabs::-webkit-scrollbar{display:none}' +
    '.h3tabs button{padding:9px 14px;font-size:13px;flex:none}' +
    '.h3sw{right:auto;left:50%;transform:translateX(-50%);top:auto;bottom:34px;padding:7px 8px 7px 14px}' +
    '.h3hint{right:auto;left:0;width:100%;text-align:center;top:auto;bottom:10px}' +
    '.h2m.h3 .h2c{position:relative;order:2;left:auto;right:auto;bottom:auto;margin:0 12px 10px}' +
    '.h2m.h3 .h2v{position:relative;order:3;right:auto;top:auto;margin:0 12px 12px;align-self:flex-start}}';

  function loadT() {
    if (W.THREE) return Promise.resolve(W.THREE);
    if (loading) return loading;
    loading = new Promise(function (ok, ko) {
      var s = D.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      s.onload = function () { W.THREE ? ok(W.THREE) : ko(); }; s.onerror = ko; D.head.appendChild(s);
    });
    return loading;
  }
  function hasGL() { try { var c = D.createElement('canvas'); return !!(c.getContext('webgl') || c.getContext('experimental-webgl')); } catch (e) { return false; } }

  try { setTimeout(function () { if (hasGL()) loadT().catch(function () {}); }, 0); } catch (e) {}
  W.AH_STAGE = function (m, en, imgEl) {
    var d = TX[en ? 'en' : 'fr'];
    if (!D.getElementById('h3css')) { var st = D.createElement('style'); st.id = 'h3css'; st.textContent = CSS; D.head.appendChild(st); }
    m.classList.add('h3');
    var box = D.createElement('div'); box.className = 'h2st';
    if (imgEl) { imgEl.className = 'h2fb'; box.appendChild(imgEl); }
    var tabs = D.createElement('div'); tabs.className = 'h3tabs'; tabs.setAttribute('role', 'tablist');
    var sw = D.createElement('div'); sw.className = 'h3sw';
    sw.innerHTML = '<span>' + d.col + '</span>';
    var hint = D.createElement('div'); hint.className = 'h3hint'; hint.textContent = d.hint;
    var cur = 0, color = {}, tb = [], sb = [];
    KEYS.forEach(function (k, i) { color[k] = DEF[k]; var b = D.createElement('button'); b.type = 'button'; b.textContent = d.tabs[i]; tabs.appendChild(b); tb.push(b); b.onclick = function () { pick(i); }; });
    COL.forEach(function (c, i) { var b = D.createElement('button'); b.type = 'button'; b.style.background = c; b.title = b.ariaLabel = d.sw[i]; b.setAttribute('aria-label', d.sw[i]); sw.appendChild(b); sb.push(b); b.onclick = function () { setCol(i); }; });
    box.appendChild(tabs); box.appendChild(sw); box.appendChild(hint);
    m.insertBefore(box, m.firstChild);
    function sync() {
      tb.forEach(function (b, i) { b.setAttribute('aria-pressed', i === cur ? 'true' : 'false'); });
      sb.forEach(function (b, i) { b.setAttribute('aria-pressed', i === color[KEYS[cur]] ? 'true' : 'false'); });
    }
    var api = { pick: function () {}, col: function () {} };
    function pick(i) { cur = i; sync(); api.pick(i); }
    function setCol(i) { color[KEYS[cur]] = i; sync(); api.col(i); }
    sync();
    if (!hasGL()) { box.classList.add('nogl'); tabs.style.display = sw.style.display = hint.style.display = 'none'; return; }
    loadT().then(function (T) { run(T); }, function () { box.classList.add('nogl'); tabs.style.display = sw.style.display = hint.style.display = 'none'; });

    function run(T) {
      var ren;
      try { ren = new T.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { box.classList.add('nogl'); return; }
      var small = Math.min(W.innerWidth, W.innerHeight) < 700;
      ren.setPixelRatio(Math.min(W.devicePixelRatio || 1, small ? 1.5 : 2));
      ren.outputEncoding = T.sRGBEncoding; ren.shadowMap.enabled = true; ren.shadowMap.type = T.PCFSoftShadowMap; ren.setClearColor(0x000000, 0);
      box.insertBefore(ren.domElement, box.firstChild);
      var sc = new T.Scene(), cam = new T.PerspectiveCamera(30, 1, .1, 200);
      sc.add(new T.HemisphereLight(0xffffff, 0xb9b2a2, .66));
      var dl = new T.DirectionalLight(0xfff3df, .85); dl.position.set(9, 14, 8); dl.castShadow = true; dl.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
      var sh = dl.shadow.camera; sh.left = -14; sh.right = 14; sh.top = 14; sh.bottom = -14; sh.far = 50; dl.shadow.radius = 5; sc.add(dl);
      var gr = new T.Mesh(new T.PlaneGeometry(200, 200), new T.ShadowMaterial({ opacity: .2 })); gr.rotation.x = -Math.PI / 2; gr.receiveShadow = true; sc.add(gr);
      var B = W.AH_BUILD(T), models = {}, pivot = new T.Group(), shown = null, sIn = 1, rot = .6, vel = 0, drag = false, lx = 0, rest = 0, dist = 20, elc = .3, tp = null, lw = 0, lh = 0, vis = true, ok = false;
      sc.add(pivot);
      function get(k) { if (!models[k]) { models[k] = k === 'maritime' ? B.maritime(0) : B[k](); models[k].userData.open = 0; } return models[k]; }
      function paint(g, hex) { var c = new T.Color(hex); g.userData.paint.forEach(function (p) { p[0].color.copy(c).multiplyScalar(p[1]); }); }
      function show(i) {
        var k = KEYS[i], g = get(k); if (shown) pivot.remove(shown); shown = g; paint(g, COL[color[k]]); pivot.add(g); sIn = 0; cur = i;
        fit(); if (g.userData.setOpen) tp = 0;
      }
      function fit() {
        if (!shown) return; var u = shown.userData, R = Math.sqrt(u.L * u.L + u.W * u.W) / 2, tv = Math.tan(cam.fov * Math.PI / 360), el = u.el || .3;
        var vh = (2 * R * Math.sin(el) + u.H * Math.cos(el)) * (u.el ? 1.12 : 1.7), dv = vh / 2 / tv, dh = R * (u.el ? .98 : 1.12) / (tv * Math.min(cam.aspect, 3));
        dist = Math.max(dv, dh);
      }
      function size() {
        var w = box.clientWidth, h = box.clientHeight; if (!w || !h || (w === lw && h === lh)) return; lw = w; lh = h;
        ren.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); fit();
      }
      api.pick = function (i) { show(i); };
      api.col = function (i) { if (shown) paint(shown, COL[i]); };
      var mob = function () { return W.innerWidth <= 900; };
      var el = ren.domElement;
      el.addEventListener('pointerdown', function (e) { drag = true; lx = e.clientX; vel = 0; rest = 0; try { el.setPointerCapture(e.pointerId); } catch (x) {} });
      el.addEventListener('pointermove', function (e) { if (!drag) return; var dx = e.clientX - lx; lx = e.clientX; rot += dx * .008; vel = dx * .008; });
      function up() { drag = false; rest = performance.now(); }
      el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
      var io = W.IntersectionObserver ? new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { threshold: 0 }) : null; if (io) io.observe(box);
      var rm = W.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches, t0 = performance.now(), last = t0;
      function loop(now) {
        W.requestAnimationFrame(loop);
        if (!box.isConnected) return;
        if (D.hidden || !vis) { last = now; return; }
        var dt = Math.min(.05, (now - last) / 1000); last = now; size();
        if (!drag) { rot += vel; vel *= .92; if (!rm && now - rest > 4000) rot += dt * .22; }
        if (sIn < 1) { sIn = Math.min(1, sIn + dt * 2.4); var e = 1 - Math.pow(1 - sIn, 3); pivot.scale.setScalar(.82 + .18 * e); }
        if (shown && shown.userData.setOpen) { var u = shown.userData, tgt = (Math.sin((now - t0) / 1000 * .55) > .35 ? 1.75 : 0); if (rm) tgt = 0; u.open += (tgt - u.open) * .06; u.setOpen(u.open); }
        pivot.rotation.y = rot;
        var u2 = shown ? shown.userData : { H: 3 }, h = u2.H; elc += ((u2.el || .3) - elc) * .08; var el2 = elc;
        cam.position.set(0, Math.sin(el2) * dist + h * .3, Math.cos(el2) * dist); cam.lookAt(0, h * (u2.el ? .1 : .38), 0);
        var off = lh * (mob() ? .02 : .05); cam.setViewOffset(lw, lh, 0, off, lw, lh);
        ren.render(sc, cam);
        if (!ok) { ok = true; box.classList.add('ready'); }
      }
      show(0); W.requestAnimationFrame(loop);
      W.__H3 = { show: function (i, c, r) { if (c != null) { color[KEYS[i]] = c; } sync(); show(i); if (c != null) paint(shown, COL[c]); if (r != null) { rot = r; vel = 0; rest = performance.now() + 1e9; } }, tab: function (i) { cur = i; sync(); } };
    }
  };
})(window);
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
    '.h2k{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#0b1a38}' +
    '.h2s h1{margin:14px 0 0;font-size:clamp(36px,5.6vw,72px);line-height:1.03;font-weight:600;font-style:normal;letter-spacing:-.028em;color:#0b1a38;text-wrap:balance}' +
    '.h2r p{margin:0 0 24px;font-size:15.5px;line-height:1.7;color:#4d586d;max-width:430px}' +
    '.h2b{display:flex;flex-wrap:wrap;gap:12px}' +
    '.h2s .h2p,.h2s .h2o{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:15px 28px;font-size:15px;font-weight:600;text-decoration:none;line-height:1;white-space:nowrap;transition:transform .2s,box-shadow .2s,background .2s}' +
    '.h2s .h2p{background:#0b0b0f;color:#fff;box-shadow:0 10px 26px rgba(11,11,15,.25)}' +
    '.h2s .h2o{background:#fff;color:#0b1a38;border:1px solid rgba(11,26,56,.18)}' +
    '.h2s .h2p:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(11,11,15,.35)}.h2s .h2o:hover{background:#0b1a38;color:#fff}' +
    '.h2m{position:relative;margin-top:clamp(28px,4.2vw,52px);border-radius:32px;overflow:hidden;aspect-ratio:16/7;background:#e8e3d9;box-shadow:0 30px 70px rgba(11,26,56,.18);isolation:isolate}' +
    '.h2m img{position:absolute;left:0;top:-8%;width:100%;height:116%;object-fit:cover;object-position:center 60%;transform:translate3d(0,var(--py,0px),0) scale(1.02);will-change:transform}' +
    '.h2m:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,20,43,0) 45%,rgba(7,20,43,.6) 100%);pointer-events:none}' +
    '.h2c{position:absolute;left:22px;bottom:22px;z-index:2;display:flex;background:rgba(10,22,46,.5);-webkit-backdrop-filter:blur(16px) saturate(1.2);backdrop-filter:blur(16px) saturate(1.2);border:1px solid rgba(255,255,255,.2);border-radius:22px;padding:16px 4px}' +
    '.h2c div{padding:0 26px;border-right:1px solid rgba(255,255,255,.16);min-width:0}.h2c div:last-child{border:0}' +
    '.h2c b{display:block;font-size:24px;font-weight:600;line-height:1.1;letter-spacing:-.01em;white-space:nowrap}.h2c b i{font-style:normal;font-size:13px;font-weight:500;color:rgba(255,255,255,.75);margin-left:4px}' +
    '.h2c span{display:block;margin-top:5px;font-size:12px;color:rgba(255,255,255,.72)}' +
    '.h2v{position:absolute;right:22px;bottom:22px;z-index:2;display:flex;align-items:center;gap:14px;padding:10px 22px 10px 10px;border-radius:999px;background:rgba(10,22,46,.5);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.2);color:#fff;text-decoration:none;font-size:14px;font-weight:500;transition:background .2s}' +
    '.h2v:hover{background:rgba(255,255,255,.22)}' +
    '.h2v i{width:44px;height:44px;border-radius:50%;background:#fff;color:#0b1a38;display:flex;align-items:center;justify-content:center}.h2v svg{width:18px;height:18px}' +
    '.h2f{margin-top:16px;display:flex;flex-wrap:wrap;align-items:center;gap:12px 14px;padding:20px 26px;border-radius:26px;background:#fff;box-shadow:0 10px 34px rgba(11,26,56,.08);border:1px solid rgba(11,26,56,.06)}' +
    '.h2f>b{color:#0b1a38;font-size:16px;font-weight:600;margin-right:10px}' +
    '.h2f a{display:inline-flex;align-items:center;gap:8px;padding:11px 20px;border-radius:999px;border:1px solid rgba(11,26,56,.16);color:#0b1a38;text-decoration:none;font-size:14px;font-weight:500;transition:background .2s,border-color .2s,color .2s}' +
    '.h2f a:hover{background:#0b0b0f;border-color:#0b0b0f;color:#fff}' +
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
      '<div class="h2m h2a" style="animation-delay:.5s"><img class="h2ph" src="' + IMG + '" alt="' + esc(d.alt) + '" decoding="async"><div class="h2c">' + st + '</div>' +
      '<a class="h2v" href="#/contact"><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg></i>' + d.visit + '</a></div>' +
      '<div class="h2f h2a" style="animation-delay:.65s"><b>' + d.find + '</b>' + (cats.length ? cats.map(function (c) { return '<a href="' + esc(c[0]) + '">' + esc(c[1]) + '</a>'; }).join('') : '') + '<a href="#/all">' + d.all + ' →</a></div></div>';
    var img = s.querySelector('.h2m img'); img.onerror = function () { img.onerror = null; img.src = 'photos/hero.jpg'; };
    if (W.AH_STAGE) { try { W.AH_STAGE(s.querySelector('.h2m'), en, img); } catch (e) {} }
    return s;
  }
  function parallax(s) {
    var m = s.querySelector('.h2m'), img = m && m.querySelector('img.h2ph'); if (!img) return; var tk = 0;
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
/* flow.js - fond qui change a chaque section (lignes droites), panneaux en verre depoli, produits en bento, categories en carrousel qui tourne, menu dans l'en-tete, textes noir et blanc. */
(function () {
  'use strict';
  var W = window, D = document, styled = false, pend = 0;
  var EN = (D.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
  var CSS = '' +
    'html,body{background:#F4EFE6}' +
    ':root{--cu:#0b1a38;--cu-d:#0b1a38}' +
    '.fl-d,.foot,#tm .tem,.pc,.dr{--cu:#fff;--cu-d:#fff}' +
    '.fl{position:relative;isolation:isolate}' +
    '.fl:before{content:"";position:absolute;z-index:-1;top:0;bottom:0;left:50%;width:100vw;margin-left:-50vw;border-radius:0;background:var(--fg),var(--fb)}' +
    '.fl-c{--fb:#F4EFE6;--fg:radial-gradient(38% 46% at 10% 18%,rgba(150,186,232,.5),transparent 72%),radial-gradient(34% 44% at 92% 82%,rgba(238,184,160,.55),transparent 72%)}' +
    '.fl-s{--fb:#E9DCC4;--fg:radial-gradient(38% 46% at 88% 14%,rgba(196,150,120,.5),transparent 72%),radial-gradient(36% 46% at 8% 90%,rgba(150,178,150,.5),transparent 72%)}' +
    '.fl-n{--fb:#0B1A38;--fg:radial-gradient(40% 52% at 82% 18%,rgba(58,112,236,.5),transparent 72%),radial-gradient(36% 46% at 8% 92%,rgba(36,170,190,.32),transparent 72%)}' +
    '.fl-o{--fb:#35402B;--fg:radial-gradient(40% 50% at 86% 16%,rgba(140,170,96,.5),transparent 72%),radial-gradient(36% 46% at 8% 88%,rgba(112,150,130,.4),transparent 72%)}' +
    '.fl.mo-full{margin:0!important;border-radius:0!important}' +
    /* textes : noir sur clair, blanc sur sombre */
    '.fl-d,.fl-d .sub,.fl-d p:not(.card p){color:#ECEAE4}' +
    '.fl-d h1,.fl-d h2,.fl-d .mo-big,.fl-d .pt{color:#fff!important}' +
    '.fl-d .mo-k,.fl-d .k,.fl-d .badge,.fl-d .eb{color:rgba(255,255,255,.78)!important}' +
    '.fl-d .mo-l{color:#fff;border-bottom-color:#fff}' +
    '.fl-d .mo-st b{color:#fff}.fl-d .mo-st span{color:#CFCCC4}' +
    '.fl-s .sub,.fl-c .sub{color:#4d586d}' +
    '.eb,.mo-k,.h2k{color:#0b1a38!important}' +
    '.btn.cu{background:#0b0b0f!important;color:#fff!important;border-color:#0b0b0f!important;box-shadow:none!important}' +
    '.fl-d .btn.cu,.foot .btn.cu,.dr .btn.cu{background:#fff!important;color:#0b1a38!important;border-color:#fff!important}' +
    '.lf-cbm,.lf-dl svg{color:#0b1a38!important}.lf-dl{border-left-color:#0b1a38!important}.lf-sp.lf-reserved{background:#0b1a38!important}' +
    '.chip.on,.lang button.on{background:#0b0b0f!important;border-color:#0b0b0f!important;color:#fff!important}' +
    /* verre depoli */
    '.fl .card,.fl .why div,.fl details,.fl .spec,.fl .steps div,.fl .empty,.h2f,.fl .lf-find,.fl .lf-cb{background:rgba(255,255,255,.42)!important;-webkit-backdrop-filter:blur(20px) saturate(1.5);backdrop-filter:blur(20px) saturate(1.5);border:1px solid rgba(255,255,255,.7)!important;box-shadow:0 12px 40px rgba(11,26,56,.09)!important}' +
    '.fl-d .mo-st>div{background:rgba(255,255,255,.07)!important;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);border-color:rgba(255,255,255,.18)!important}' +
    '#tm .tem{background:rgba(255,255,255,.1)!important;-webkit-backdrop-filter:blur(22px) saturate(1.4);backdrop-filter:blur(22px) saturate(1.4);border:1px solid rgba(255,255,255,.22)!important;box-shadow:0 16px 50px rgba(0,0,0,.22)!important;color:#fff}' +
    '#tm .tem blockquote{color:#fff}#tm .tem .who,#tm .tem blockquote+*{color:#fff!important}' +
    /* horizontal : jamais de decalage de page ; bulle WhatsApp toujours visible */
    'html,body{overflow-x:clip;max-width:100%}main{overflow-x:clip}' +
    '.cr{overflow-x:clip;padding:0 0 4px}' +
    '.wab{position:fixed!important;left:auto!important;right:max(16px,env(safe-area-inset-right,0px))!important;bottom:max(16px,env(safe-area-inset-bottom,0px))!important;z-index:60!important}' +
    /* questions : fleche au lieu de + */
    'details summary:after{content:"\\2192"!important;font-family:Poppins,system-ui,sans-serif;font-weight:500!important;font-size:19px!important;line-height:1!important;background:transparent!important;color:#0b1a38!important;border:1.5px solid #0b1a38!important;display:flex!important;align-items:center;justify-content:center;transition:transform .3s,background .3s,color .3s}' +
    'details[open] summary:after{content:"\\2192"!important;transform:rotate(90deg);background:#0b0b0f!important;color:#fff!important;border-color:#0b0b0f!important}' +
    /* bloc Un projet : degrade flou fluo et gris, grain */
    '.band{background:radial-gradient(70% 110% at 12% 45%,#DDF55F 0%,rgba(221,245,95,.9) 38%,rgba(221,245,95,0) 72%),radial-gradient(60% 100% at 92% 78%,#8E8E91 0%,rgba(142,142,145,0) 68%),linear-gradient(120deg,#E6F77A 0%,#B9C07A 45%,#8C8C8F 100%)!important;border:1px solid rgba(255,255,255,.6);border-radius:30px!important;box-shadow:0 24px 60px rgba(40,50,10,.18)!important;color:#0b0b0f}' +
    '.band:before{background-image:url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/><feColorMatrix values=\'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0\'/></filter><rect width=\'160\' height=\'160\' filter=\'url(%23n)\' opacity=\'.5\'/></svg>")!important;background-size:160px 160px!important;-webkit-mask-image:none!important;mask-image:none!important;opacity:.55;mix-blend-mode:multiply}' +
    '.band h2,.band p,.band div{color:#0b0b0f!important;text-shadow:none!important}' +
    '.band .btn.cu{background:#0b0b0f!important;color:#fff!important;border-color:#0b0b0f!important}' +
    /* en-tete */
    '.top{background:rgba(244,239,230,.72)!important;-webkit-backdrop-filter:blur(18px) saturate(1.4);backdrop-filter:blur(18px) saturate(1.4);border-bottom:1px solid rgba(255,255,255,.5)!important;box-shadow:none!important}' +
    'html body .top .logo,html body .top .logo.lf-st{flex:none!important;flex-direction:row!important;align-items:center!important;gap:10px!important}' +
    'html body .top .logo svg,html body .top .logo img,html body .top .logo.lf-st svg{height:32px!important;width:auto!important;max-height:32px!important;visibility:visible!important}' +
    'html body .top .logo span,html body .top .logo.lf-st span{display:flex!important;gap:7px;align-items:baseline}' +
    'html body .top .logo b,html body .top .logo.lf-st b,html body .top .logo i,html body .top .logo.lf-st i{font-size:12px!important;letter-spacing:.2em!important;margin:0!important;display:inline!important;color:#0b1a38!important}' +
    'html body .top .wrap{min-height:64px!important;height:64px!important;display:flex;align-items:center}' +
    '.fln{display:none}.flq{display:none}' +
    '@media(min-width:1180px){.fln{display:flex;align-items:center;gap:clamp(14px,1.8vw,28px);margin-left:auto;margin-right:22px}.fln a{position:relative;color:#0b1a38;text-decoration:none;font:500 14.5px Poppins,system-ui,sans-serif;padding:6px 0;white-space:nowrap}.fln a:after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:2px;background:#0b0b0f;transform:scaleX(0);transform-origin:left;transition:transform .25s}.fln a:hover:after,.fln a.on:after{transform:scaleX(1)}.flq{display:inline-flex;align-items:center;margin-right:10px;padding:11px 22px;border-radius:999px;background:#0b0b0f;color:#fff!important;text-decoration:none;font:600 14px Poppins,system-ui,sans-serif;white-space:nowrap}.flq:hover{background:#2a2a30}}' +
    /* pied de page */
    '.foot .wm{position:relative;margin:34px auto 0;width:min(1240px,calc(100% - 40px));padding:10px 0 4px;display:flex;align-items:flex-end;overflow:hidden;border-top:1px solid rgba(255,255,255,.14)}' +
    '.foot .wm b{display:block;font:600 min(calc((100vw - 64px)/7.9),180px)/.9 Poppins,system-ui,sans-serif;letter-spacing:-.045em;color:#fff;text-transform:none;margin:0;white-space:nowrap}' +
    '.foot .wm b i{font-style:normal;color:#fff}' +
    '.foot{border-top:0!important;background:#0B1A38!important}.foot:before{display:none!important}' +
    '.lf-strip{display:none!important}' +
    /* bento */
    '.bn{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;grid-auto-rows:minmax(170px,auto);grid-auto-flow:dense;gap:14px!important}' +
    '.bn .card{display:flex!important;flex-direction:column;margin:0!important;border-radius:26px!important;overflow:hidden;width:auto!important;max-width:none!important}' +
    '.bn .card .ph{flex:1 1 auto;min-height:150px;position:relative;aspect-ratio:auto!important;height:auto!important;border-radius:0!important}' +
    '.bn .card .ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}' +
    '.bn .card .cb{flex:none}' +
    '.bn .card:nth-child(8n+1){grid-column:span 2;grid-row:span 2}.bn .card:nth-child(8n+4){grid-column:span 2}.bn .card:nth-child(8n+8){grid-column:span 2}' +
    '.bn .card:nth-child(8n+1) h3{font-size:1.55em}.bn .card:nth-child(8n+1) .ph{min-height:320px}' +
    '@media(max-width:760px){.bn{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}.bn .card:nth-child(8n+1){grid-column:span 2;grid-row:auto}.bn .card:nth-child(8n+4),.bn .card:nth-child(8n+8){grid-column:auto}.bn .card:nth-child(8n+1) .ph{min-height:230px}}' +
    /* carrousel qui tourne */
    '.fl-s.hascr .tiles,.fl-s.hascr .c3ui,.fl-s.hascr .rh{display:none!important}' +
    '.cr{position:relative;margin:26px 0 8px;user-select:none;-webkit-user-select:none;touch-action:pan-y}' +
    '.cr-st{position:relative;height:var(--ch,420px);perspective:1400px;overflow:visible}' +
    '.cr-c{position:absolute;left:50%;top:0;width:var(--cw,300px);height:var(--ch,420px);margin-left:calc(var(--cw,300px)/-2);border-radius:28px;overflow:hidden;background:#0b1a38;box-shadow:0 26px 60px rgba(11,26,56,.28);text-decoration:none;color:#fff;will-change:transform,opacity;display:block}' +
    '.cr-c img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;-webkit-user-drag:none}' +
    '.cr-c:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,16,36,0) 50%,rgba(7,16,36,.78))}' +
    '.cr-c span{position:absolute;left:20px;right:20px;bottom:20px;z-index:2;font:600 clamp(20px,2.4vw,28px)/1.15 Poppins,system-ui,sans-serif;letter-spacing:-.01em;color:#fff}' +
    '.cr-ui{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:18px}' +
    '.cr-ui button{width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.7);background:rgba(255,255,255,.5);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);color:#0b1a38;font-size:22px;line-height:1;cursor:pointer}' +
    '.cr-d{display:flex;gap:8px}.cr-d i{width:8px;height:8px;border-radius:50%;background:rgba(11,26,56,.22);transition:all .25s}.cr-d i.on{background:#0b1a38;width:22px;border-radius:8px}' +
    '.cr-h{text-align:center;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:#4d586d;margin:12px 0 0}';
  function ST() { if (styled) return; var s = D.createElement('style'); s.textContent = CSS; D.head.appendChild(s); styled = true; }
  function mark(el, c, dark) { if (!el || el.classList.contains('fl')) return; el.classList.add('fl', c); if (dark) el.classList.add('fl-d'); }

  /* ---------- menu dans l'en-tete ---------- */
  function nav() {
    var top = D.querySelector('header.top .wrap'); if (!top || top.querySelector('.fln')) return;
    var hb = top.querySelector('.hbtns'); if (!hb) return;
    var foot = [].slice.call(D.querySelectorAll('footer.foot a')), L = {};
    function find(re) { for (var i = 0; i < foot.length; i++) if (re.test(foot[i].textContent + ' ' + (foot[i].getAttribute('href') || ''))) return foot[i].getAttribute('href'); return null; }
    var items = [[EN ? 'Home' : 'Accueil', '#/'], [EN ? 'Products' : 'Produits', '#/all'], [EN ? 'Buying guides' : 'Guides d’achat', find(/guide/i)], [EN ? 'Compare' : 'Comparateur', find(/compar/i)], [EN ? 'Simulator' : 'Simulateur', find(/simul/i)], [EN ? 'About' : 'À propos', find(/propos|about/i)], ['Contact', '#/contact']];
    var n = D.createElement('nav'); n.className = 'fln'; n.setAttribute('aria-label', EN ? 'Main' : 'Principal');
    items.forEach(function (it) { if (it[1]) { var a = D.createElement('a'); a.href = it[1]; a.textContent = it[0]; n.appendChild(a); } });
    var q = D.createElement('a'); q.className = 'flq'; q.href = '#/contact'; q.textContent = EN ? 'Get a quote' : 'Demander un devis';
    top.insertBefore(n, hb); hb.insertBefore(q, hb.firstChild);
    function act() { var h = location.hash || '#/'; [].forEach.call(n.querySelectorAll('a'), function (a) { var v = a.getAttribute('href'); a.classList.toggle('on', v === h || (v === '#/' && (h === '' || h === '#'))); }); }
    W.addEventListener('hashchange', act); act();
  }

  /* ---------- carrousel qui tourne ---------- */
  function carousel(sec) {
    if (sec.classList.contains('hascr')) return;
    var tiles = [].slice.call(sec.querySelectorAll('.tiles a.tile')); if (tiles.length < 2) return;
    var data = tiles.map(function (a) { var im = a.querySelector('img'), sp = a.querySelector('span'); return { h: a.getAttribute('href'), s: im ? (im.getAttribute('src') || im.src) : '', t: sp ? sp.textContent.trim() : '' }; });
    if (data.some(function (d) { return !d.t; })) return;
    sec.classList.add('hascr');
    var N = data.length, box = D.createElement('div'); box.className = 'cr';
    box.innerHTML = '<div class="cr-st">' + data.map(function (d) { return '<a class="cr-c" href="' + d.h + '" draggable="false">' + (d.s ? '<img src="' + d.s + '" alt="" draggable="false">' : '') + '<span>' + d.t + '</span></a>'; }).join('') + '</div><div class="cr-ui"><button type="button" data-d="-1" aria-label="' + (EN ? 'Previous' : 'Précédent') + '">‹</button><div class="cr-d">' + data.map(function () { return '<i></i>'; }).join('') + '</div><button type="button" data-d="1" aria-label="' + (EN ? 'Next' : 'Suivant') + '">›</button></div><p class="cr-h">' + (EN ? 'Drag to rotate' : 'Glissez pour faire tourner') + '</p>';
    var anchor = sec.querySelector('.tiles'); anchor.parentNode.insertBefore(box, anchor);
    var st = box.querySelector('.cr-st'), cs = [].slice.call(box.querySelectorAll('.cr-c')), dots = [].slice.call(box.querySelectorAll('.cr-d i'));
    var pos = 0, tgt = 0, drag = null, moved = 0, hold = false, last = performance.now(), idle = 0, w = 0, R = 0;
    var rm = W.matchMedia && W.matchMedia('(prefers-reduced-motion:reduce)').matches;
    function size() { w = box.clientWidth || 360; var mob = w < 700, cw = mob ? Math.min(w * .66, 300) : Math.min(w * .3, 360); st.style.setProperty('--cw', cw + 'px'); st.style.setProperty('--ch', Math.round(cw * 1.28) + 'px'); R = mob ? w * .5 : w * .36; }
    function draw() {
      var cur = ((Math.round(pos) % N) + N) % N;
      cs.forEach(function (c, i) {
        var d = i - pos; d = d - N * Math.round(d / N); var a = d * 2 * Math.PI / N, z = Math.cos(a), x = Math.sin(a) * R;
        var sc = .66 + .34 * (z + 1) / 2, op = Math.max(0, Math.min(1, .62 + (z + .5) * .7));
        c.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,' + (z * 90).toFixed(1) + 'px) rotateY(' + (-Math.sin(a) * 38).toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')';
        c.style.opacity = op.toFixed(3); c.style.zIndex = Math.round((z + 1) * 50); c.style.filter = z > .85 ? 'none' : 'blur(' + ((1 - z) * 1.6).toFixed(1) + 'px) brightness(' + (.78 + .22 * z).toFixed(2) + ')';
        c.style.pointerEvents = z > -.1 ? 'auto' : 'none';
      });
      dots.forEach(function (e, i) { e.classList.toggle('on', i === cur); });
    }
    function loop(now) {
      if (!box.isConnected) return; W.requestAnimationFrame(loop);
      var dt = Math.min(50, now - last); last = now;
      if (!drag && !hold && !rm) { idle += dt; if (idle > 3600) { tgt = Math.round(tgt) + 1; idle = 0; } }
      if (!drag) pos += (tgt - pos) * Math.min(1, dt * .008);
      draw();
    }
    function go(d) { tgt = Math.round(tgt) + d; idle = 0; }
    box.querySelectorAll('.cr-ui button').forEach(function (b) { b.addEventListener('click', function () { go(+b.getAttribute('data-d')); }); });
    st.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, p: pos }; moved = 0; idle = 0; });
    W.addEventListener('pointermove', function (e) { if (!drag) return; var dx = e.clientX - drag.x; moved = Math.max(moved, Math.abs(dx)); pos = drag.p - dx / (R * .7); tgt = pos; });
    W.addEventListener('pointerup', function () { if (!drag) return; drag = null; tgt = Math.round(pos); idle = 0; });
    st.addEventListener('click', function (e) { if (moved > 8) { e.preventDefault(); e.stopPropagation(); } }, true);
    box.addEventListener('mouseenter', function () { hold = true; }); box.addEventListener('mouseleave', function () { hold = false; });
    W.addEventListener('resize', size); size(); draw(); W.requestAnimationFrame(loop);
  }

  function pass() {
    pend = 0;
    var app = D.getElementById('app'), m = app && app.querySelector('main'); if (!m || !m.querySelector('.h2s')) return;
    ST(); nav();
    [].slice.call(m.children).forEach(function (e) {
      if (e.classList.contains('h2s')) { e.classList.add('fl', 'fl-c'); return; }
      if (e.classList.contains('mo-p')) return mark(e, 'fl-n', 1);
      if (e.classList.contains('mo-f')) return mark(e, 'fl-o', 1);
      if (e.classList.contains('sh')) return;
      if (e.classList.contains('mo-c')) return mark(e, 'fl-s');
      if (e.classList.contains('mo-x')) return mark(e, 'fl-c');
      if (e.classList.contains('sec') || e.classList.contains('wrap')) {
        if (!e.offsetHeight) return;
        if (e.querySelector('.tem,#tm')) return mark(e, 'fl-o', 1);
        if (e.querySelector('.tiles,.cr')) { mark(e, 'fl-s'); carousel(e); return; }
        var g = e.querySelector('.grid'); if (g && g.querySelector(':scope>.card')) g.classList.add('bn');
        mark(e, 'fl-c');
      }
    });
    var f = D.querySelector('footer.foot');
    if (f && !f.querySelector('.wm')) { var w = D.createElement('div'); w.className = 'wm'; w.setAttribute('aria-hidden', 'true'); w.innerHTML = '<b>AURIAM HOME<i>.</i></b>'; f.appendChild(w); }
  }
  function ask() { if (!pend) pend = W.requestAnimationFrame(function () { setTimeout(pass, 140); }); }
  function boot() { var app = D.getElementById('app'); if (!app) return setTimeout(boot, 150); new MutationObserver(ask).observe(app, { childList: true, subtree: true }); ask(); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else boot();
})();
/* edit.js - police editoriale (serif), produits a la une en cases transparentes, sections qui s'empilent au defilement */
(function () {
  'use strict';
  var W = window, D = document, pend = 0, SF = "'Instrument Serif',Georgia,'Times New Roman',serif";
  var CSS = '' +
    'h1,.h2s h1,main h2,.fl h2,.band h2,.mo-p h2,.mo-x h2,.mo-c h2,.sec>h2,.sh h2,.foot .wm b,.cr-c span,.fl .sec-h,.mo-full .cap b,.mo-full .cap h2,.h2s h1 *,main h2 *{font-family:' + SF + '!important;font-weight:400!important;font-style:normal!important;letter-spacing:-.012em!important;line-height:1.02!important}' +
    '.h2s h1{font-size:clamp(46px,7.2vw,96px)!important;line-height:.96!important;letter-spacing:-.02em!important}' +
    'main h2,.fl h2,.band h2{font-size:clamp(36px,5.4vw,66px)!important}' +
    '.foot .wm b{letter-spacing:-.035em!important;line-height:.9!important}' +
    '.cr-c span{font-size:clamp(26px,3vw,38px)!important}' +
    /* produits a la une : cases transparentes, fine bordure */
    '.fl .bn .card,.bn .card{background:transparent!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;box-shadow:none!important;border:1px solid rgba(11,26,56,.18)!important;border-radius:22px!important;padding:12px!important;transition:border-color .25s,background .25s}' +
    '#app .sec>.grid.bn>.card{background:transparent!important;padding:10px!important;border-radius:20px!important}' +
    '.bn .card:hover{border-color:rgba(11,26,56,.5)!important;background:rgba(255,255,255,.22)!important}' +
    '.bn .card .ph{border-radius:14px!important;overflow:hidden}' +
    '.bn .card .cb{padding:14px 6px 4px!important;background:transparent!important}' +
    '.bn .card .cb h3{font-family:Poppins,system-ui,sans-serif!important;text-transform:none!important;font-weight:400!important;letter-spacing:0!important;font-size:14.5px!important;line-height:1.35!important}' +
    '.bn .card:nth-child(8n+1) h3{font-size:17px!important}' +
    '.bn .card .pr{font-weight:500!important;font-size:14px!important;letter-spacing:0!important;opacity:.85}' +
    '.fl-d .bn .card{border-color:rgba(255,255,255,.28)!important}' +
    /* sections empilees */
    '.stk{position:sticky}' +
    '.rv{opacity:0;transform:translateY(34px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}.rv.in{opacity:1;transform:none}' +
    '@media(prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}}';
  var done = false, io, ro;
  function style() {
    if (done) return; done = true;
    var l = D.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap'; D.head.appendChild(l);
    var s = D.createElement('style'); s.textContent = CSS; D.head.appendChild(s);
  }
  function tops() {
    var vh = W.innerHeight || 800;
    [].forEach.call(D.querySelectorAll('main>.stk'), function (e) { var h = e.offsetHeight; var tall = h > vh * 1.15; e.style.top = tall ? 'auto' : Math.min(0, vh - h) + 'px'; e.style.position = tall ? 'relative' : ''; });
  }
  function pass() {
    pend = 0;
    var m = D.querySelector('#app main'); if (!m || !m.children.length) return;
    style();
    var rm = W.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
    var kids = [].slice.call(m.children), z = 1, n = 0;
    kids.forEach(function (e, i) {
      if (e.tagName === 'SCRIPT' || e.offsetHeight < 80) return;
      var ok = e.classList.contains('fl') || e.classList.contains('h2s') || e.classList.contains('sh') || e.classList.contains('band');
      if (!ok) return;
      if (e.classList.contains('sh')) { if (getComputedStyle(e).position === 'static') e.style.position = 'relative'; e.style.zIndex = String(++z); return; }
      if (!rm && !e.classList.contains('stk')) { e.classList.add('stk'); if (n > 0 && !e.classList.contains('fl')) e.classList.add('stk-r'); if (ro) ro.observe(e); }
      if (!e.classList.contains('stk') || rm) return;
      e.style.zIndex = String(++z); n++;
      if (n > 1 && e.classList.contains('stk') && !e.classList.contains('fl')) e.classList.add('stk-r');
    });
    [].forEach.call(m.querySelectorAll('.fl h2:not(.rv),.fl .sub:not(.rv),.band h2:not(.rv)'), function (h) { if (rm) return; h.classList.add('rv'); if (io) io.observe(h); });
    [].forEach.call(D.querySelectorAll('#app .grid'), function (g) { if (!g.classList.contains('bn') && g.querySelector(':scope>.card')) g.classList.add('bn'); });
    tops();
  }
  function ask() { if (!pend) pend = W.requestAnimationFrame(function () { setTimeout(pass, 260); }); }
  function boot() {
    var app = D.getElementById('app'); if (!app) return setTimeout(boot, 150);
    if (W.IntersectionObserver) io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold: .12 });
    if (W.ResizeObserver) ro = new ResizeObserver(function () { tops(); });
    new MutationObserver(ask).observe(app, { childList: true, subtree: true });
    var tk = 0; function sc() { if (!tk) tk = W.requestAnimationFrame(function () { tk = 0; tops(); }); }
    W.addEventListener('scroll', sc, { passive: true }); W.addEventListener('resize', sc); W.addEventListener('orientationchange', sc);
    if (W.visualViewport) W.visualViewport.addEventListener('resize', sc);
    W.addEventListener('load', ask); var n = 0, iv = setInterval(function () { tops(); if (++n > 40) clearInterval(iv); }, 500); ask();
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else boot();
})();
/* AURIAM HOME – correctifs : flèches des témoignages, pied de page identique FR/EN, menu uni couleur crème. */
(function () {
  'use strict';
  var N = '#0b1a38', CR = '#F3EEE5';
  var CSS = '' +
    /* flèches témoignages : bouton blanc plein, flèche bleu nuit épaisse */
    'html body .tnav button,html body #tm .tnav button{width:50px!important;height:50px!important;min-width:50px;border-radius:50%!important;background:#fff!important;border:2px solid #fff!important;color:' + N + '!important;font-size:30px!important;font-weight:700!important;line-height:1!important;opacity:1!important;padding:0!important;display:inline-flex!important;align-items:center;justify-content:center;box-shadow:0 3px 14px rgba(0,0,0,.35)!important;cursor:pointer}' +
    'html body .tnav button:active{transform:scale(.94)}' +
    'html body .tnav button{font-size:0!important;background-repeat:no-repeat!important;background-position:center!important;background-size:32px 32px!important}' +
    'html body .tnav button[data-act=tprev]{background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%230b1a38\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M15 4l-8 8 8 8\'/%3E%3C/svg%3E")!important}' +
    'html body .tnav button[data-act=tnext]{background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%230b1a38\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M9 4l8 8-8 8\'/%3E%3C/svg%3E")!important}' +
    'html body .tnav button:disabled{opacity:.55!important}' +
    'html body .tnav span{color:#fff!important;font-weight:600;opacity:1!important}' +
    /* pied de page : même rendu dans toutes les langues */
    'html body footer.foot{background:#0B1A38!important;background-image:none!important;border-top:0!important;--cu:#fff;--cu-d:#fff;color:#D6DCE6}' +
    'html body footer.foot:before{display:none!important;content:none!important}' +
    'html body footer.foot b{color:#fff!important}' +
    'html body footer.foot a{color:#D6DCE6!important}' +
    /* menu : une seule couleur crème, texte bleu nuit, page active en pilule */
    'html body .ov{background:rgba(11,26,56,.45)!important}' +
    'html body .ov>.dr.lf-dr{background:' + CR + '!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:0!important;border-left:1px solid #DED5C4!important;border-radius:0!important;box-shadow:-18px 0 50px rgba(11,26,56,.28)!important;color:' + N + '!important}' +
    'html body .ov>.dr.lf-dr>div:first-child{background:transparent!important;border:0!important;box-shadow:none!important}' +
    'html body .ov>.dr.lf-dr>div:first-child:after{background:rgba(11,26,56,.12)!important}' +
    'html body .ov>.dr.lf-dr>div:first-child b,html body .ov>.dr.lf-dr>div:first-child b i{color:' + N + '!important}' +
    'html body .ov>.dr.lf-dr>div:first-child .ib{background:#fff!important;border:1px solid rgba(11,26,56,.25)!important;color:' + N + '!important}' +
    'html body .ov>.dr.lf-dr .lf-langrow{background:transparent!important}' +
    'html body .ov>.dr.lf-dr .lf-langrow>div:first-child{color:#5d6b85!important}' +
    'html body .ov>.dr.lf-dr .lf-langrow .lang{background:#fff!important;border:1px solid rgba(11,26,56,.25)!important}' +
    'html body .ov>.dr.lf-dr .lf-langrow .lang button{color:' + N + '!important;background:transparent!important}' +
    'html body .ov>.dr.lf-dr .lf-langrow .lang button.on{background:' + N + '!important;color:#fff!important}' +
    'html body .ov>.dr.lf-dr .lf-mt{color:#5d6b85!important}' +
    'html body .ov>.dr.lf-dr .lf-mt:before{background:rgba(11,26,56,.14)!important}' +
    'html body .ov>.dr.lf-dr a.l{color:' + N + '!important;margin:2px 14px!important;padding:12px 16px!important;border-radius:99px!important;font-weight:500!important}' +
    'html body .ov>.dr.lf-dr a.l .nm-i{color:' + N + '!important}' +
    'html body .ov>.dr.lf-dr a.l:hover,html body .ov>.dr.lf-dr a.l:active{background:rgba(11,26,56,.08)!important;color:' + N + '!important}' +
    'html body .ov>.dr.lf-dr a.l.on{background:' + N + '!important;color:#fff!important}' +
    'html body .ov>.dr.lf-dr a.l.on .nm-i{color:#fff!important}' +
    'html body .ov>.dr.lf-dr a.l.on:after{content:none!important}' +
    'html body .ov>.dr.lf-dr .lf-mcta{background:' + N + '!important;color:#fff!important;border:0!important;box-shadow:0 8px 22px rgba(11,26,56,.3)!important}' +
    'html body .ov>.dr.lf-dr .lf-soc-b,html body .ov>.dr.lf-dr .lf-soc-b span{color:#5d6b85!important}';
  function go() { var s = document.createElement('style'); s.id = 'fix2'; s.textContent = CSS; document.head.appendChild(s); }
  if (document.head) go(); else document.addEventListener('DOMContentLoaded', go);
})();
/* AURIAM HOME – nouveau logo (noir sur fond clair, blanc sur fond sombre, sans couleur). */
(function () {
  'use strict';
  var BLK = "data:image/png;base64,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", WHT = "data:image/png;base64,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3bV/4DgBTU1N8cqVKwFAqsqp91k8mwSw50GHH3fIUYcffuz+++57v913X3rQbrvuttOuO+88f5edd8R1a27Af3/2Cye+66S3vL35uEi2eOM4p/B+NPH2z323WrbsIXS7FxZiEgHYpYE2axLa55fXEshEe4xy42x/+F7TgYKI6ELmDR/5yKX1P7zsgWBeO0BAoFYd2P3Vq/7mk699zV88d7fddsY111yHa6+97varrr72hrW33HrWZZdfec6PfnrWL37502+fB+AGANPhFzjX8PVPPrl2q1YtC1nEH9zhk+MLi7Z9++ETf/6Ind1fH7ddtQTqgdp7L0wKR0wzYG7KhCYrJRA5ZdRoBogYF27ArZ9fzR96609vei8T7nxrz6E8mwl7ZFgtnrfDcSccNvm6R+zCTzxsoZ+E883xMFOH0qBJ/J0DHAMzil/ciju+uBpfWnEefwLT132fAXz2D4tuTMBympo6n0IAcMxanP5bbbPT3oc8+k8effTBBx181F577nafPXffeb8999pt8R67747JKtPGCQvS/ein52x4xJ88/bh641W/OPHEE3nFlrXsQkBwE+9c+Z3Rs6YejvUiLGD20g6YpSeu1jWIClscK4FncGPOZIDTuGyrlyG0kPmOj37i0voDL34QmG/a0oCwfPlyftvbVsj2O9/nAd/42hd+esQDDhqhMSR1dr3WtcfV116HNWtuuuGSy6+8+qKLLr7gysuuOv2b3/3OGbfecNkaALfYLMI318XLli37QyszMv+IedX2Dzvh/vTSJ+8y8ZRDt8XWcAJ4AmTGAEIeqBxQVUANnHWzTJ+51n/pYxf6v/vZbY0l/GzO5dUsF9EITSpAdNOPXv9j/Hjpgl0f+uoD/GOP2E4evNvWus/CirZ3wISq0oZap2cEa24Y80Vnr5Wf/suF469fecctP22zU4je48eSY/2/cuVKrapKRFboqlUZ7XPHBz78sUc94uEPe8D+++5/v912W3rQjttvf+Aee+45b9utt+psfoGQ+rYb3ORczjknWy9csGDrbbd9wC13XvmL888/nwYDpXzdGNZJGHhJU3JJwVpg7b6yTqEmNWu1w2jBVIeCj6GR7JKWg1pVM8Awz/f8888nVWDnpbvttPU2CydERKFwYCJVUfWq1ajSqnLYZ6893D577bH0uAcesRTAUevWrX/BdatX337ZFVfeeMWV11x8xVWrzzzjjJ+f/bPTv/xLIrosXKPBInjZsmW0atV99B5MstJ277T+lGtPPeHnOPXfz9/uyD8/aPL599/WPWynSb/vTvP9xOQIlYrqhrGTtb667aI7RmvOvbX+3scudf+97s4bfw4AK9PB3HsQVXd1IUSpnrlhw3U/+Juz8QMAEwCWPmGXxbv7Cos31urWb/I3nnXLHVe0qVs8RE4i0Aq9B2cFy5fzykMOoeOPP96LiK5atSrqzAHY7fFPfu79H/CA+x19yH0PfMD+++51352W7rj3Hrvt2gmeANR732hPOCYmcgxuzrQYYZuNVHuvtdTzBo9otecwJMbBhzPK3KfUX7Ww1uuY4eQYrxX1LFW2A7ud6plJdOUCt+hVw0N93QKLSkytSy8nGFqhEBElImVmXbRoIS1adMA29zn4gG0A7KfAE66+eg0uu+Ita6+++tqfXXH1laf/7P/O+dn/fvm/L/XeX0dEdRkgTjrpJKy4ZxKtlFY0MvENf+HmM5efjTMBbDPCDns/eId6weKJmUkAuGpmq5mf31TfBGy8EVh3m92Pv+5grn7dVaxoZ6GXA3TScqB6G2a84pqvr771mvK9joD6RPBJK5pS5p6cki1fvpxXrFghy9KX9rr/UY877rjjjjjyyCMecP/7HnTggTvvtMMuu+22U/mjHgB87YmYiIgYRHAu1etph2lTy0HjVJpzFbmJyaGzJY+JyY2NziciNVVD00cLlw9jkZdG1DWbUgU0G4rJGhXNhHzUsgG7u+V0jR+n5vTccA8EgnMuKu1pOyAHQJlZCcCee+zMe+6x8/YAnqDAE666erWuecvrbzr//Asv/dFPfnbeT/7v7LMvOOfUb3vvLw+YjqoS3UM5FSsAWdEe1O1+vH2sN/3i+zfZd003sfq32I/V5j6bFYCuWNGi6+3KOn8KhFXAfdrve02UzHvyq33gAmx35Etf9ZJlR97/fg884KD9Dtxjt1132GO3XVE5LgKAwHslEJiJXYO8spHST7OgsVqPbtnGWKZtpY1Gk4Pfk5scebbGHu3fV2OWE6bcJKAJ1LSLo4tQiiAQjYwTgzYlW9GILQhA1WgaQD1s/815FR/Cl7YqAkV0MllMCnAUgEm0QryqoswsYNBee+zCe+2xy44PPPawHV/wwmc/6Nprr8NV16y55cILL73wl+efd8bJn/vyF4noDAo+jvfQ1wpAOvux/We7H+EV+pvux+q32U8rwjpZ9QfY0lm+nJlIDnnAQ1/9vveu+LvH/slD53MKAAqIjMc1AaD28HEgArtSLx4JvictKB35KZasrQB2DOfc0CvNycaNCxjBHSybGSlswDQLANEryyx+y0bITYeThL6qxmwEvp5EQ3wcLmjLDNtJPyLu2oGnb0OUeqFyIgYpERGcamvHqB4AdOSc7r3n7rz3nrsvefiDj36QKB70Z8979v9753v+6X1fXvXRE7U5Oe7pwGPaj0MEYvxxvfjtb3+bKOYf/abXv/LvH//oh89n8XU9Hov3taooAexGo4pHVUVMjigq0hCsAT2HlZh5VdrDtCN90Wa/gnFdLxg8uza6uM0abofQuJihD8KcRquHMsDdDK9F0V1N3homKEo8sImGflBj77dlrtqQSwnaMXaBJSoMo/hNQdk7PCZq+L/MIMdMzjEr4FSV6rrWuhZhQn3UEYdOvOkNr/jbXQ964OOZSaemptwf1Qb5Y7rZlStXkojiqOMe8ZgnPOFRDKD2zlVuVDE7R5mQhKmXqdza1o5KEafL4kxXx+43Jd5ePCrQzND3JmjaUhpP/25KnTLqdE3WitB6/GQJjymLjICPBRYHx4vEza91FlSBuklC8dknJaFMrqN4uOF/K1dRVTGrogLgjz36AfqQBx79OFVg5cqVOhcQ7qWvqakpBYAl2223+8TkZGNVQZw2fJ/zbu4YkzaKtemjwtyWyrTA7j9GLTo0iEDwygrAR1NRq6tnZfKDKq/V9E9zDaWRr1pPAC10/8IXpK6GXkvO1zPiffYZhsCmxYPSeK1GM4gIvTUEclVxpSKza5OqEfO+AFxVVYLZ+TpzAeHe8PKqqlKuEspXV+YtZU6c7p4xWnWpvrZgHpkFTHq3rC0lbqpdDhfJtiCgpJwTVXeNSW+8fot9xPojzzZg/AmV0HItZ+1r/9YLk8ec+/rlDsedmB3+f7bbk8FpfGeU8esJFebXzsz4BQDcH9vg7T0xINDKlSudqrqVK1e6uyM6Tzhe1whWZjs1pv5aGG5qT6Udq3A7nUXUczrln3TTStehP3fhreZvYrIPNHQZysVPRgaPcmmutvMgoMaiiJLDUCA5BSzCVk3sRsN3lrQaqxRGIdm1dmO52fPxeVgLgfS1piXbDAtYoobGsDZvq/mbgOHJdFN389q+twQEWr58OauqYyZdtmyZJyLf/nPwEC1eJykmyFZBIklfd6r/QgBCTZlAvfx/k0GQPfkIxG488C2NdHrTVkSFKG7mBpZLccdrFNu2S0qaSRa/ddCiVHNHo90gzg11Q5+mrL6B/ZD7jYd9S/YatcjowkCWInc90gKFpS5CIW1EqMmPBl/kRFhVrG1V5Ra4pLmAgOWsquyc0xUrVggReRHd4clTL3zZCW973788+Rkv+WtVnd9fmW9BQBBH+bbopo2ay0h3H244JYv3Wr+M7C/kgrhDYwgOdT2ZGIRq7fzy2fmwvdpdxUat12CPGXCXteMtXhIqkFqqoRe0hyxwDeWjEP7QqCacPz4qnl+o4ixDxACNoPy5tO8KG0JFB8VFWq1DfuqzX/LsD374P97/kr9845+r6s5EJKtWrfLOsa5cudItX76cf5/Bofo9/M0wNSjMJNToqi/c7+AH7v/85z/ruQ9+0DHPvP+hh+y9/ZJtcdPa2/CWnXakj//L371rSPbYaN6o7haPyXZOlTqLTXtPme6vKN29M5FagFQU0GFJPAAEXI3FYggUVG+QpfmBipzZgJnrz89aq+3fYGtk0Pv43oqHLxl4XmOtnj0ITT1UyvO77PsZ2Gjcx60jEHXdBMmow7AOtzWmpla6VauW+ac86wXPf9873/rJ/ffdE+tu34C/eMnzr/zOd77/7U988lPfuOTCs769bNmy9QDgnMMzTj7ZrVq27HfO9q1+x0FAq8rJqlWrfFNnV8c887kveebjHvnQxx133DH7HnzgvluZ1VfvsP221Z887Jgnfvxf8O5RQnt1mIjdnyFIXFMpSEQD3b5uYmjJdVYW5cVDxBsVd4MIKmk9duH6GdSoW7XuQK3Abjsln1iVFAsFwy/gFsfPvDiSG5dl8MWSyNeDp7zqqVZJc5qqyMq5EJQy4lW5QIoUIGoK2lqwtT8O1gPGAKUeCihduXJKiICHPuTBT91/3z0VwHjRNguqo448dK+jjjz0pU9/+hNfetbZ5/7ypz/+vy9+6EMf/ZL3a89etWyZd8yovQ/zFb+T4avqbg8EK1fyKccf71MQwE4PedRzjnjmMx77p4ccvN+Tjzv2mK3mz4vlmhcRIiJW1Sr8E4DTYR5Oez6M57fHAWVHY3Y2FummrUuLk5WIessNizNkgALR8KWaGu0abUxB1QS2RKxMO0rICOdGH0+NWv9knL3DJlLkJQMAkBfq2Y5biCFs4gzsM/WLZYXk5VCu+pRNbZMWaZ1Gf4OkDpf+jqpUQ91MVVVNIuXcwjbTdarKqiRg6EEH7scHHbjf/Z79rKfd73nPW/b68y++5Dtf+uq3Tv7y5z72PSK6KWQNJ598slu2bNndqu1Q3S1BIGQDzsmqZcs8AMbkjn9y/LOXHf/kJz364ccec+Q+e++xSyrpG6ERYiYX+KriBTyqCm7cMKXciN3GvkGkfGklIqJaJxx7FDYE+6xB2c9pSKPGRMPiIbHknjexkUKXIU66azpBY+ehbcVFV2F0gTvNwf0Gmdec+BMfHqBuYoykyDgQKjJ/OpRuKgA5yq7PakMWKUEWA9SCqqSG0EBp0tN4kKS8jsb2k9ySV13XREQ6f2L+nUQEeAEaAWOGCLwqoCSucjj66MMWHH30YU99zKMf8dQXveA5l3zz2z/4xsc/8Z9fml533WnLli3zzAx/N2YNQwYEXrlyJR1//HNsNrDr457ynMc+8pGPeO6xRx3x0GOPPnxUuaC5I15qYecck/VwoHxbevU8OPipWnEf9Gy2DSGdHrNii3k5a0Z/euy2KXUZXDUamqk4oeNm9BVJVDUxE8shHaLerkgg/WhR6VCcfEzZgraZtigaYZyhg5z3KSnsaeNSHmeT/0eWDaFnArXLLIvBMAQMMJQHbw3Dq+8BogjccENYAUjtFQTdZekO9NQnPGr/Jz/+Ufs//9lPe+XPzzrn9G9+69tf/NqXV36diC6+u7KGLQ0INDU1xaeccopX8bJs2TIAWLTHPocf8cxnPW3qoQ8+9kkPPPrw3ZYu3S49ZhECGs0Axy4utIbMQ4lnH+zevAyJujYaIph0anlpsycTyBAqqzKkOcCVyYxRtt6QyRY1PzN4Zkbej6wRNyAguBLCiONJAbm3tGabzKh24LyY/TS9/dYYhAGt/eBMRSG/kMmlIsvMMZCNxNRTtpU4D5MRgGnuQ1QLLEkb6VgOmU89ONqvFq0mMm7n5sBwjgAlEYEXFVc5fdCxR7oHHXvkQ49/ztRDTzv9RSf88IyffOnzp/zPp6695Owzly1bdiczwXuhZcuW8apVq7YIiPxtFyatXLmSj2+xgfZr93vms1/ytEf8ycOXHXfsEfe53yEHNfcGqHhRBcgxOxc2upIZUqE4EKQ2tQUwU8tWaERZpocqGeZNVhsyNlu2k3oQbTSLyioJ2Wdqc1QKzL7ZupZ3z0itgCuvAJg1meVEsDP1QdOaFGT+e/aQzKh/JmsyzX/DEQJVPMbAJB6teB5lY+iaeCIR/EyWgDE+UKeTiMxgMA5qIWOXhugoQmAGGNVgQTtgCCJN1hHF7QhW0jLrUhETHDFDFb6Z4dbtlyzSZzzlcds9/SmPe8mL/vQ5f/ajH5/5y299+5srv7Ty06cQ0UUAvMkafqvA8NvcNDOzLGuwgW33PeCYxz7pyY87/mEPf8ifPOrhD9p664Xz2wgrvvZCjpnZMfUOqlBKU3u/BYDZDU6L1WYg1vwlk3dq0Aro0lqj1kioY02WoMXETe88TTiHHA0OCqk0Z56XdrLPpPsSe562lKFOnZ3io6bug+VU2Kyh1VVwCqiIy6PLAPWnn9ggEk6LPE/Jp0pnB2UiNqDGh1RbBer2QNIIFjd4S2x0Et85VJALGAJxo9DEgXFVnBklWhat2RxFjQfvvVZVJYcecpA79JCDHvC85zzjAae+8E9f/+MfnfmtVZ//n69fevFPv7Js2bJ1rYT9b4yBVL9NMBCRbR7/lOe96PnPm3rRYfe/3/0PPnCfeFJ574OKoKs4ZV3U3ZRmIwbJDk5trnAWN+KYg5YM4+mNC/u/mRxNsuTBZgzFJidNKbhq4WuAbpagSvAz9dAjtUz1eLLxBaUMY8syaA2j0VQEAlN5kzl5zT3mtEcq6njP6B8N24Iuw0wdfES1NTSlIPsfrMaArD2abNHtM9IiSTNzHKA4W0JlZGQM9YyozRConvbz2tOSEMBotR0sLcpV6hySVVWRAq7NunWbhVvpk5/wmO2e/ITHHP/CPzv++J/+7MzzPv+FL3/0K1/8748w84bfNChUv0UwuM/r//odH33ja17+wKU7Lmn3LFS0JseOHbd68MagsicaZP9XybaUYExDgNGo2oSB1XhUfZWJDppTpiTAESFu9DRAY9FujS67sR4sHK20ACwxPGAlNDERZxmoFGeIWbGVU0YUSokkbpvpmBsRi723m4w0dWGoGnkM3iP3aaBMKdmem6lM6sV7DHtCc9m4jIAWnh2nwGIriJYrMkiXId4Rac4VQatPqNqDV3dl71IgVjjHBAWJKFREXeXkwP335gP33/uQxz/mUR/88OEPeMaKt77xZcx0YVuqbNZ98G8YDA74mxPf+7X3v+tvH7h0xyV+PPbiRYgI7FpJoWywzKw0VTVaG5rN4HcgvAzL0yFJL6HJ7ONf6vkEMvWgkvoaJBBguMHBfhtdykEJbjcSjKOhmYrKI5ck1FQRSD2k3WVWSDmkAGDLIZhsg2A0IhGpz6mbQYO3v4Rq0TKyZtnlr/lOloMXI2lkMwdtt2VuY+cVQwnHaoJF2hkWCvtBkvye3sVPZxVtocFBaIIDxIkIjce17LDDYn/SCW94yLvf++GviOj9nWMBlvNQAYFUFSJSveK1y//hbcvfuBeA2tfiRpVjzuiljb+cZl2opACc8ftbZDgOzPSkec1PyfAMLZqoQqszm5CJw01U4AEGAC26kKRFap5NF2oEudSk4MoydMngZHpmMuoeaj4RSBaON4AokdnLaib/qFRTyqJCDBZQaZKO8Xhkss1Bgnet5NhmWNHk2IwvF1oGFK+rdUI2YgeBgEWUkDxqPyuLUATrONXx3TBToLkqDXHcA2nNkXmnAR7VyNdYRDe+gVuxF8f1uHbwUr/5jX+132ve+LaPeC9bq56km3M/vzYgLF++nJhJ7nfE41712v/3ssc7hvdeKldxzv7sl7TLWlyzxs54o2pO0nZhCEYABt1Ak6PJ9dnBXxBejNg4OmQCNXcVGH2WCE32XpO2YTSxFIEM71Ahyk7Et+Qp1iBDnJ+SZLMe7cLxmuQf1XRfyCxGOywFx8oEQMgCv4MEb+fdQnZVURxohkjpLI2c5DxuwR4y2giWV6ERt2wmPbm9tdFgZV1d1wQAzlUNqOhI8+SFul2REq6iQrfLjKCXG8+5Cr4J0PVb3viKo45++NNex0S6XHWLAwK94x1vF1UsetITHv2X++61i4r35Np2ECWebJKwMmuPimARsx1DEqVur7Ylk2no9g0+4OFG1bhbrCSiUmfaDymbsSOE+msuS3tajaoK17DgBs150CpCNm7PdszZZF9iY0SLsmuGE2buTVYbIqpBBIERMmVRRYNlBqntOMFq83/NgUObFdiAS0X1YzeMGu0K7ZlL0Zal0hZhG4fCrkLbMYj5irSobrmCipmMPtA729LWEr79DIgbipNjhq89L91hiR7/rKe+QIHt31G5X6v+9GsCwnJqWj/VAccec/ieqkqKwq+Z8xvRkrJbPMtiiUaxirQqyzAxvB7CePrOeX2u01a8U4sMBvaUTGob+WaHZtLn1Mksmt/gdfCSgTE9MxlUjOzliQHW1KSrSmnzBAm1WNYx+nJ1s+HCrIO2pk7eoT9B/O0jnM740GVgytQUm0Oj7A2pwaw6uG7SvMynIcvSMG0JYh6quxVjk6/rUQEvG4ZoJrXXaQVrsY6S+IsFvNWCd6Hcpwc/6Kh9luxw0OHiBVNTU/xbB4SpqfNJVbH/IQ86+JBD9p8kIiGrz62dCNDbf6cCvqdOmZFAx1h7a/QxqDEc6aU9A/xkgtM1Q+HJYB4KzVKFICGi/YhWr1BKl4ikwPABocbkxMbYFWFAiZseOxV7myjj92sWovNSgim1gDuqhNKAiY1RC/lub2ULIxyxD8vT9g+yqUctyjirjIQiqJm5Bwp67Nmizfe/NDqRg2Y947FMlGWAGpQqF8LNL99mp3kLlfpaWQHAJiLy++6zBw574P3vrwCmpqawBQGh+eGDD9xv6U47bheLGw1dA+p85ikFLRIizVIcMtWbmqDdIr6aqeYOyUMIbuibsvVr2p4aebuSaNXZLF0+b6vINRTLqN8jCAiEo2/IHt3kxHQSe9VM+FVVDReBjBQaFb2oJC+mJrUT5FOSgQ0MaXxFoYP7TIBUNrZrgDS22yjrIqT1plnsVbVDTF3FWA3ycGoRo3wcQFPuO1iXgag52DRK9fWMd8MK2ZiDspDHtuuxoxAZAnoLnG+1YB722HX3bdtNveVtRzeqmGweGZhuehcJUgn+UDfFTtfO0eWIiJuUNYGLwzMVfTXKi0zTQmw7JWRS5awin82CgIKxasFaLMIZE8E1Wc+gsAiNx/PsvJYaN6kMWSdJ/grIaTp2IpNKyTXNywZRQKUpGbT2FvgdqMswdlT4VneHtLrgLdDPFyWDzKcfo0KPMf2Lj4KOQ/YY1Ipada+vkNWywLWWyUwHtO79exFkdOD5Q7Ud4TGuqPy0TblPWZ2jGVLTSeFA2ZRaAOc4yARo8WxUB2//EI+mc3Flyut8Leq1Hiygp/+QtVQ7QLH53bX3g3u5kdeKbFdBwyiixtYiFSAatZSjxDjUeCyWI9xqNAWi3oOjNnFgb8q6QbIFX/M2iMNNlHMhZivZUGzucuMY01tG3poMRrhBU9E1H8Ww0vIclKXavxn0GDQX60mNhrI40CzTjmZA2ncoW2Ytoa7H8wFg6tc8n8264Xq6dppNh1EmHqKEXLq76KhQWWQHPnl7nCa5U4l1YiSM6fAqMW6Ce5eU9pSUWrR77RuUTAXYDe75Lw66pOrBxBuHPnzEVTO+RJz7NBEzlqgZvmtRuSC6arsPSoFXH7JuqycJUDX8xJarJkTvApAiO4tGmoN09oQi6hSvkmhlbYmYQDuOuIUbyuI+3oUwJWyQ1GhMdLsJDYPSlGnlWlTbztcubkUEqzgoosMxFUVkRozsF5nQkKlYowAOUZyUWtBJTaqg7SBKidAT8eDEpHo8nTIegwdQlGJvTUJtjyMOPmlexJZoWh9KbOATVQL84NRlRj0z0Vx3q5usfYmNHSgzKE/RGrFZAant8zR2aFSWtSo0YLXQpuz1OEjNUR84q7MV7F3ISbtto549my8zIq0HXndEZRkSGIvQ7PYilboXp9WWyl1ccbbuCqBRFXU9MzFYQKgYGfCnLZutM0uP3Oioc6iW+gKhBRaBk9xcpMkQBq3l2oxL5uWof3cBZYvQuAsrFbVsOT1U+ECnrknCEFAN7tYiYOdRGLWoxQUy6ZDEyEyltenvG09EWPwgWMYTZYrO1LWs2OJXpcndVUnbP29Hl032KUFFuhhnjuhgyBLSQFH8XSVgGXwrvcwbuFSl8TitOwr9XUr9X5uFWym4nNtDljLTM6ae+CNqRve56QRh1a+5p7scbjrvvPOaCrGiKoCKNiLFy9as05vLeqOIEErFhdsZqDRzr6JB6X/oLoMy+42qit6jhEzKhdKxSIP1aMa7IM2FS/tiRTRqaTKhoduOnuZPbGI2Goma13MdJLpTTqQqtSNNZkkbliHXQhXgkQwIHzQbkngapjPSlECB7Wlk6oIegmEgaiF+0hXHQxp5RhJdCePQzYAY6cAYglSV87GbZT9nqMG0beapGYPK7pV85omStwYVg2hNig/nJsdbjCEccsghre/FvHFU2tUS/qDMHWh2OwPK5gbCodMkuO3DCM7DlqPegIqDptiqVNFdcJ8ypiL1TARo/jNaIr3lgJ39wJnhqsGNWhzG9QQlFDg+XErjCT2ALdLsBpX30J1/iKrLAcH2bXTPFZMGCd6Ox7BO1GTS4D7VBe11f+10/jIOTMlmJHMTAj/UmouX6lxzQ+yahkMWoHq4EEXRiYIWgwIFz4NBRlGgzXbo5s3JEEC+8C3RAq627QaTIxAZ7SO7+Kiz8Zp/cnzwkYqqd4NphU74brAyLK+c75qGfIg6IG46kRMRI4svlCsvNftIh3YFIid1I6HGBiSMlYAmgFQVrfCIOZHaEVwVY/uuOYDSYwkX7dxEh8ziAADjsd86X562Ds1lbUEJUlTN2XpqPKvYsOoIiYjWJ8nvHA8+0k3SXLh4WIthdAlG5WwDFQCiZoxTFOWOnWaN/05NgFu1JdTlkCGMa2HVIpJRT+7SOR+sEl/Y3e0CJCqQhRwo0c4s/nCv0QSP+w0+ZkN9+w8+beszWGFSpm6b1eTlqgKng2cIIqjGKZ3MJxg1ziAgszbLTWkLQpX2H3bhZygfGBh+/NnNn+gj4XW6Qci7CTlgF+pxyrtXLRYSkH4TOc2Pu+Et7jlLedADNhWxgJJOg0E66C73RGo1k2kTt/czTNuxocQbsYoMhunbLsWkJWmJthf4fop6Wjj5OUeDR+qZ2leZOCJy5+ashusLCVSAobamRp8nZMrxGmpAPbTIKmtdjxpGLsVujaplGlAOEJZ1plKB7+Tc+gCqRqQha4P5wTMEFr8pZjJlaM48MjpjgcmqrSDJUQfazrERmOEmbTQzhlh38cOWRtsj2wvRSwPWlLbU+8zy8cz3trOMC1A+bD+tx5u15jYzIAizBWaMUrKtIkpkHQawyZ8EGXoymW5DQBTS+hI/qG9gm3aMJzP3hJ40LdHjjUBpFsW0NyCSlrAEdVaHEA09AO1UtErVG0V6btYbmoXRQ7Z7lBCeNNXY00pt9k1T0FHgnA/ooVGR1Ex5kpXNmnXwKi1RUtj2apLGo6IKolyqMXQZVCaH7jKoD6WiKQGo2zqMIjZmZFt7GHEZX6QzDVX4XzoZDkNgdlWURafZhDRnTzV1Ft5K1qRTE9sMrZx4UEXfpkvl62nttVOjjNBD/WM9ReTrjk12lH9NDa4QqAyeIYxpq8n1VmAZzLmASCnE0ekAU+ofEkXb9BTeDS2bTHkngLpRQgAHe1UzdrqxA9JSVw0qm4bUfD4gR8S1qxMRP4PW27HpcgyZmcrIuZlOHm0QXjLGuwGTEmB2rDYzHNOCekJG6k8xGs2/czAMQcip2tnrMhMu9Q9yIT+zySgjyCTFngSJJyGYLF0ftMvQaBKjAKkaEE16ywO1YkJFzVqIh5hUQW2E4DQbIUrDS6SEP9Mcb7lXARkNCso/zYxRGhiOmmdzpZ5yDIqBHX13WA5W9XSrdJf7aFvdBuoC3HbWxM4HkGU5av7swmZUI4YtDfA7pIQaiKkValRNsyZqlruaDKhUDkFW1mpZP2QMYSqGCxVE1WbNz2weMclBrOSYdvrURdun8BIv+ROWf01GrYaoQOZt+BsU3Bm5XqmZWRDnXkAxeAz2kZqiSImWhXj4AAdnKtLMeJKyJolkeEgD5DZFK2m3CWJLBipS8fKEVmkt3MLf8sE6fbjHVEu9VZDKJ3OSqhb1S4ECNyBN3rfvIDmxW8RhqsFExoAh+LvXqCUUxrH8scNBhlJeBIO+tUl9mGSRPYmMR4MFBDXa3tRLUtW72LqUG4EUG9FKT4eaSAyRxosO7go0ORpt6rBCDW1adTazj5RuEiiX6NIiFnYGIkzWqoP7MqhWVS2a8qkyyNoCQCEtCo2coNCpRzUfbgq3xcXYug4/y8A6bz7YdXs9RAWWUyy6WQwxqANoU5uVa5G+N0utqkbDH0StXZSoEpF2Nm8HmQ1mRugDV3OJGCpcsTs8hCEzBAVJxiagfHPbDFqpsP8iZMohVnW5I35Odg5f2wfDQw2ZGDxMHXExy0D5B2+HZGI2MJu8OXKdmKzDUAR4TVzaYQOC16hGG4RGoRRVgbSdI4//bgFeu9RUO32VJosrgj4TVLWZidLMbo+GuSGuVWZrOJrpTSpxnB5PA9iDlzL4NEPEM5MUXg9g0PZw0EOwXO9ELzedm04AIHRUkYqR4U5IplwHQuqxGywg+PGY8loNCf3U2VdCGm6iJNxhUDct6ls1o6icAKLBiQgi4/nd4Qrq0FlDR4WIcsgmq9+KBpZ2g3gpYkEyuEAKk69HGVYWg1RRsJlWaVdMNvVeSq2iEsxTMVkfhn9GzDPExUGR3wl11n3egusOQ2ViKmZttsZq+drlwTLTuD3qOo29d8FqIzyUwTeEDmTY0T/QzlCalYdrDKdn5gG/noewWbMMBEoCKUqZ7HigfOczPomnrZSCBpWFdvwQ2o/Eihe1swzUzJDrsItNZ+Isg+Zz4xnrX6nTTcjmHXIFtgKA659Vp6YdOPQsg2BicjruA0uOImNzroAyFwLzZk0REm+BNL9/5MU4BRsoAYGqwSXUVFFLZqHFXXxHZ/P1oKTGhVwTKeIpsauANLRlLl384BiCWh5CWm1qMJ7OZ5AxLW3tlt+3YdqSRVwpBkceuXqwLoOqqpgug2puw50PY5huAiWZtADXqAUU4s0Gg1Lt4yq7wbsMgnGPEirseDD1YsV6l/18mxhQD/8gNRwGlByLg/xC7dx2Y9LSjmpHnQM1XQabHVCu7KSZIYulOHfPPe6psga7LefWS9tl0I5Si02Liy9nz48y6bc+rqlC2u5WNuc9pPx//KWjqhnYaixcw+yO3sVPaPG/WnS3cuFc2xpLs6LN4TpyW22WWfLmdRmqaqbUQ0qMXDMgT11zBirS0c5eij1vjcUCIPHKXIMfDJpiEyZGUV23QwKnnAaW9YZLfiags6+2NsCh2wqjAbsMFLsME2FDs2WTEhXqz5qwUc0XnJbMfkUu/xTuJZZ5rWduLTZoD4MhyExFprthB3ey8qucUFIyBkDGoMUut6zv2t9NIvWDBe3gy8BowWTJsQE7ydl9vEn4l3q+np3OeVKY0bK9nxmOqQiIs0asqc4qkji9qxVR0pkDeUKLBx4uq/l372VwoxZUNJOmNxW5AQMMjzSsGTJDJjkgWqbcZEBGmqVd6b0OPv6s1UQdb4UlzY2Y3IxM6ZACoIZx36Yl2b6H2+9HiC4KtWqS92LSVv/SKmMPspHIu4XsRp0kWalMqctlpYUmKXUIcDa4Ecrx8HbcgKuhW8Npu3FOemsSusQ8KKXf0kqjTGBArQ5oXxJnZu91M4eCNrPLwFGBiYtN0MkIOrYKlN0fF27QFp+zSkXhlzvnhmQqtguJqE8xScuOTpHwUNbHo7ukKlARBNLJJ6iYpgdfa9Jo+IqitTi3ZJW06LNW+CyyTqWCUCez02RwqwDghp92JBr5HveFXBylT1SVqKMHafGd9LuC/kEBFreMXFLciYFNhlE1mooiyBwkqAOV9iw+oEeFhko50KxrEneSAOqbhzvIcJOIGGMf7VQ3yA+cjoafZg9jljDWGcygcIWDg4r1eNMEOp6F1tuwR5pKMYsskNk0Ja7SR58FwXs/ODFJx+PJmEq2kSGg1slhS4vyx56omkRuQxMkc+XOA3nrbxBaQdaQd5jAQGO1egjIfBrRDwFZclWnINdCvg9G5NS8TWK5N9iIenBu0tbQhjkwZaV/TqSM1tpbZc8WJcIBkT4jUtR+erOEfTevrmBN5qgwQGGJG3SmNFocNTZYdda3Qqk0IG5vbPjxZzJ5iM0hw+iwEhXeiOZ9ms5czbSsqGg+hFpd894yETh4eg1YMqCqpu1QjMAMOBVVUX7yUAGESGazp3nuGT0d2tHvBnhoZhkGLRkqV0ms9Qm5vk63I5EpEutdZruaFSFM3AbNXOiHdPDWMFA3rToRIWZuAjBpN9PU/rhKGdZTluE5QxPmXcRAVWGzJNQ2s2RwTOUcJhIYGNLijkFq1ODr8bGLv0hSYyg0t00/VlSqwTEEyEbcBbmOtMcotRjcUMotqKzIb+bQa9hiLfwHuOHt6WjkvJFFRpyJDxuEynymHZWGdaTSONgkre92E1Q46b+0989saLc8OPMSpLKxTM9Cmzu3fFRTBCQUIZO91FwxqdMTIrN+2aK/A3lMBLPXUUN0YjY2U2YokPK2Qepq5YypuD+0mwPFS08+KoB6D6rmbRoMQ3DkDIVcs8EdsuIgRP21aU+FZOvV2LcPQCPbtv/wpBdgYr79wOImSrzcBHJqOzWWWYf16Jtn7bwSZE23wEQgN7xRC8bGN1BCBmcyHzUSYbH7oYVCUk+7VJNEOyJhrKVvSIMp4m4wahFgZGXEO8rLVlxQzeyCFnMxpr8fVbiMHXwGyJkrH9fjoYabTOmtWTofAjFRo+bUVzJ0VBysAnZWxpXtSM2yOtpMgt9mEZOUvNk/uX5vVuN1WKPWKLSPQhKoGW37yBpWhA9IhktDU3ekGmvHhMH2tM2NUG4Ca41m1KLW6KE0GLeqTKXIy/DEJOux0NrhAQriFO80BgFDoLIq0pqBC50cPQb/kHK7oE7Kg9vBe+jWRK4HEExf0l7wt68+ovIMKihoneMKTDS4t6NVQSZQwit09uI2M/WwY9plZLTBPKxPSutZRLacuhxFVkFilWy5gP50liib5UGlRBWVc1zU1u+agTx8NygmcaOXh7yPleMD+UKjpL9XjJYRoevS1Feam9KUmYfuMpA6l2YZyr52puqUPneZpebWLp5lLN/UDDa18xGOBgd+gXn5wledtYtDZFh6vVM+tkNE8bFrH6oVvZWqwezgzUkkJvFKPJVQ+hgCCCE/lOJhQigMfGcRZc1wK87NObcYQyCI9kwxBgTAqiPBSJJbNgj1xIqEOyRBC5X+Dsagx6mvHfXkYQpt/752BE4KgLqwOOvfSNZgNfmRMqSuh7dyG8+MYjhr7J+711T4jbN9kkqxLqUkSt49QzVlibH5pLUb/DT1m2oVnwXXxHjXLHHozCggp8FZgDeZEhu3WKUOYOmYhjZqgco4NoXCaHxYb31st8zlurerkHQIqBS8sZ0YFUCaDscWtR1DyeBn6hFbo5ZCLrG05+4M+sA8hM52z8cECTkFanPlo3+jgKB+IvcJN7UYaX4iqva0hjQvWM2i7O0CFZoC5NzgIJy2Ri2lmjeR1ZvIHAJzE94edyAuiTv2eUrrXdA8M5+VLUOgPI66eZexXIvXQ6VOkEarNFuHRxgkCt0kBKGn8oCQHw0V5ELbcdO0nxe6DAmZNcB00Q3RTGU5F7gru1+KYozdOH6TI9TYPOemzWs7OkYmSNmKUCRefEkZ63rNabdSzwQrklBE25loh5uQy+UPlF/X07PqTcSFp13blbYzTpqncYlaShnbUQ2AZyXclXR4DGGymgmy8BkUY7e/2uElZLkdEyfxVLV2YkV7tY2DYS2rAHBBoXi4A9VTdbsYNikxZ9qc2ltJpNmMJlazSZsNKB47C2aEWMlYDTXEqKGDtmu7zWGWoSNtb4FSyvdNc3pTHBikjAmInN4cyvGwEEQwGm215V2GONwkVGcTu2Sl0nqruixSWSQ00wAu/cJIUuMoRn4ZXLlGhLfKI6xJQaNpyezccvuz1NfOMi48ZbFETHDNdOCgsAiN/YhMQkot7qFWTBRkaMoWCiGzDimDe6y8mpZCLyEn8Ho3OCWPxy1BisosUm1Ti3pkye9KcoJsDlo0ys1d1H5mcuh7qlw5k2M/fSp8P9TMOBRrqIBB+9zG1d4dERw1WekgPARXQYgoS+uxOZBy1lCgDjBRqsySqV5DW0OGNUZto5OzCVX2ESdxKJrlv10cJZ80szq0lJ3U4bQbN05Hw758XTU+deHUExOMjeuP8WjgLOPWnjYpoZQesQYtoKaLARk+aG/apEu4WQOan/DG3Dmr6GYxOonPtTyv0mZM5WFCFR335o6/1SvwEKpqpO2Bna0nO3sBuismWbHpDT028+stXJYVBIEMJ5BSi5+IdTZ1T0w1OgCdS2c7027ukZG4ziiFIdmcqDxkvU0AMG9ycrrX7KLNk6MIJ/UlPrkiDJUTnuVoehhBDv8mgorcpoHDgSpXM9InyGL4IVpkaaLa0yvUTJxTrdkE9bg3NTVljYEnUqtqnlMuDx7NpAetEVjoInR5e8GAJxFF1AxKRRMbKjfGxGBK0gFDgEtdBqv6lB03YRal0JWlIrW2Yr8dK8H2fikLiDTcLIPWpKFksBde1tfaW6+j/3TtSvnFro/mafzgLa2xlxFlub6Ba6S0SYepLTU9jGyl6uz2QoYFGO+vkRwbFBahuuYoi66MjmGHImO9JVZlAYPO8lyigE0wKbX6CaTDdxlqqSGFuOssGhPpMWg+N0OzHQklgGd+QMJYPA0m3RcyBLWacGo7P0UQm6VdFRXKtLhy6m7HrJ0sCtRNB3WQkoEdlMuMzERX7oydaWqlkPlnhieYjoNlLSoVo6GDbx5IHQc9CMWgnh27sBZoSgVRKT44zUAg29pK81K2k0F9CngDpAiNUUs6f6iZSjDU5b7OVeEEn+NEdlcpZVOTEIto++El1EZ1D4yjxuAnb/j0tgpmFezOVbG6/QYAGMyohUKGML1xnCTUyHqYarJwL5VuCb3SajZIoDBiLtuOcEAtmya3OEMIbUdRrWDs4EWLUVQ1w04oTTXuKlybbKDdTJnNOADHbnATEEa0g0fJxAuiGh0A0cLvoFmTFs2IMKnEsDFTmYYOckrzJsdM5oFqt+3bCX6Gih3RhuD6FKi1heCF5lGnnRByg9XbBvidzpSpyMJvlD2WFNio6xeYjX4n/kFKz1sqfkHQ0kbjYVBfhoYQYPYIUd8eN8vNtKtL74XyHrVAXDOZAgW50ZYPN4UuA+C89nzInaqTejJpRX/3odiGcTY9yoNLm96PJzD4cFPl8isp3awLJSWd/RnHuiiblCtR7ZxbTsrDdRna6hTSkq0MP4KsmG2xuaMCcT+jMk5KEjLbxzy2eyERADqrfelvH7R5XNuMnUqrsrvYen1+W4HQ1JEy1xxvkXhrMjFUlyGUDBPO+ebeWjv42U5+WzFr37or0yHN40LRmCEAo4kBh5sqhu9RR+viBEa0j+5q/5QOt1bkNDbA256tDucXGH6PF1Taq6kesXcUyGHPqWNLAorqzNCeIGJaY03vfsAuQ2DiSsNtULZZjhq17kwmJeK9GdKgmiq8Mh23ls+amJvMAEQH7zJ4j4VkVdlm6Wp3aeO9ir45FkxWXp6zt3PEyvzguAhXnEIWFS1HU4FSn1WgFuP61AOLK2XgIpngTti80nvzugxaGzt4ym+DOpno7N0fk5aW7ppskFXb7x7LoOPPBACjiWpT73XFHdvOxlNOv+6Gb5Ojm89nlg5lEztVQUqD28GrG421bDlZC3gtSgctewsmulMgXGmxF3PbOmVu+5dcY2DVZWBiUqlHprGYV2jJkpmkfN6Co459XSp3k2hK+BmJzbERhi5VJXbQe3qaWrJ0yDhZdzNzsusN1AmCedeB4GXAWQamSjLqLXXFdnMrtlkoS3FP2QaYqZViG0xNdsKDYwhGAArdSceyhVM+OSpyO+q+vy8vCWpWerfMaBDEk1IgkTJKba3mM86bjFkf3zpoifboYxYKUy3iqACUh5dQE8/TmGXiP0+YKTNssd4tRLnSlTW0FaNhEVdzJofg1mPg4Sbx4wCUEzpKB9R7mEbz3dg+jXo82RBxJi7U1/Eay3ABIYrAIQc6UpuuK5uWWb/ZQKAJ0dGCm6AmXTegEWFwCbWZ+WTz6MxBNJ012QBMlptaKTJrd6botXO0hTwIQjJ0VGAd+8lmviDHFDXTuuTsi9a7AMZ6HCAwlWGA0qRkAJKJGj0V8YSBdS+dG2fWEiUomC01I8xpR19UZ9khWsDI1i81nOIkE0MF69BlqL1UadcRMvZNJsZTyMAVQ2k5VtffJ1ZjB08Axv7OzTJq2TymIhMFCbXOHJzZUH3yXNrX/bE9ejU+BkbZVyK66gYffwbJuG0JU84npwBd9He8O2PBhuyipXNQ120nBCCuBu8yjDF/3gamwjyUenAM4qiKRGRnGgp9gNzKOnIppNhfJABh+GEt53g6+kcV6TH1uGNRdnpoJgOX5YJGht7eiGrhUdyomQzqy0BwiYyCdiy5kJXvniE9yWY8dAqxu9lyAFKMRptHl988kVU4HzgVGoaPijHMPhNY7fiaUedCMxpshuyHHLse3KiFicc5Iqp3hddl154r2uURPegNwowRZ8Y1ALW+DMNtoBaCiTZLQUxVzd/XfMqRzAmiZsApBQg1/e2Gz6BFGzXYZ4ggSKgNOyqM8ThTx7HdTnNb/eK/JdMFxqMzjju2QVva7hZBSCEI1gk8ORR2FboMoyqQdLX9eMW0TXX2k7/QSsx99cK92eeb91lUFKPRwjs3pwu0eRmCc3UZSSnzBqSeacZ+MGSWPkVS+AlACmeA0qBdBtFqsqN0YgFFZEAJEh9Zk/twHzTU5+JbdGiZCUo8dJeBua4nLPXJTvkRdbdJKdLOBWORyrxP84WmrXMsMaC5hNow9TYwoh4cMfpDaKm9ZRZop361ZAXOuwxmgqYxh+dwEA2Oi6Tt5uK1ZJ9rnwSUlQbo1UIxnSTNeQqadVXq4ezgHWpOG9QEJ5pl0InydLoT4qkPa8iaP+aGh+8yuMpt7K0vsxRS2zkM6pRGCbqnKCiXTW/SbIq54fMccO/E491JIk1KQtBVO8Kd0C7aHjKbhhymnT42Z1bXbRHhSJkR7O2HLeuER9pbilJkwebCKD3GiEDenutI4xt0TsuJQh4sK42zDMQhn0skXsulsuBh0W3r4/WVRKYygLIZbqpFqs3pAm1myTBCKBnYiHba0eUYtdX0wLOxYgtOFxZnpscqEbS8+zAEdizpeOTuOdPxUjCSVlYwRfMx0341iAxgaNuOA6LXKZv0QnZhpdl4JRsbKHNSVqNkYHGRJOWtuZVNGzDImSF1soPDQ4msOuRGMbkdXhpqom7fnnpqcTsm3RKQNKqGiwkwwZCIB5dQk5YLICJRhzxJyHdnmLMziJIga5+EGmVNpR7na795nbrNCgjj8aaq909FspcRQKG+aJ3JiJmvaZaeCyzIElb68MYM9cz0ZJ/7VDa70FF8mqWNYpMhM1StFscnSpCIKup6PPT4M+v09GRKBhJDUTP3HLvobPfedle0t3CwXpFRdTnuVm+gsmGCt5OxlNmbdrKdokKwNhlhAjeYv2qpQWgBOe5sCSUZSjEp/g7flFb5FymfQeia2eYCuJqVBmqGB7MEruBiKFTGQ3o7wjGz2RqhLSemJYVs5Dd+vQAWtQ9lCAHFGnMG0rSrBrdyA3sj55sPHtmCtSuI1s1oQvaQtR6L2pXMqm3R7aG7DALnZhrAVKN4p31GIG2ZiVZ6nDrjtzaVpR6DlEw+IbCCquGzOB0x2/kZG5jVOi5RjouUU36qNpyZoBJlxqyjd/aXhrong2uWlPV2joTQPx6jeW1Nmh9NtmuSqNBAicQSUxR4+LXlzWaFuCq1lazVeemPqMUcZj5XX7BJGeY0LhuXZLkOw/sGQmeyFdBxqs0FQbI7sim5pszgrtlMqaAjoohkD4ghCCbcOGlrBOq3Fd/Mx7DVlAIUyUzodRkM/X3bq2gpy02XgVgHL+vAG9rMIysVsvKGULSwS5VSc+BYCbu2K6baFdNNOh6Modcdk8RZBpsWUImtdeqd8mYtHldO3IZMzpxbIhiN5m8EBhp/rnhiRrV3gjzlPNQDvsGmbj3kQGsxHuq8ANTFhMQPP/7sR5X2zvvaFLmUrMq1+TLxiZJZqx3tz7RGGUGDcEgMwWFmJo3WKiU/RnvUt2Ithlsau5XRIdoCxa0MNpU5LrXtxoBkjf3gEmoE0X7/4HyMngg9LiHZPGQhq2/ISLNuRED90F46gGjAEIzFbOuyRESgWR9wH8+Aeuuz5JWUG7XIkLMMRDXn3o52hWuTktwlk516+JSUu9KYwKCUhD1EafDBGeeqTUbvJe8s2LOT+nXskmceJaC1/3llDyqeCKaWHCpPIGpVKVpdtNRq1FhH2vWV5vE1z/Ra0FALpk7sPtg/2jps3Q0wD8Zel7Td2dK9tUvRtaekIYZRFrBTym0DPgUNjhg4w8LgwZybAg+BERy7zDRQ1iX9dckw9YaKTnFCWox8EKT2E8BATMV67F2woeJoO0VGyaabLWuP5FpfzNCsG6at1Wh228Or345G0ufLEHvS2lPKEfVeO/UM/SrNVkU2XYaRcxsH30FUzWiGPAdJ8uLkiUa2ZhConI6zhV5HFVdTcyacA47uhp79KBPOSe2fVHOT6fSgCOJaPgeTKYXvqbVMhx3fBIjcYNhVaDsSNycIR9sMQ8wrJQb7Ct2C3KeF5j7dxYm0uTpDmznt6DUolrRts+LCtTNTT5mUYr4wS+AwDuZKx+4A7NRj4OEmL2PqsWfqGLXoXVBb0RfcMHuilLoMwMzwVm4KP66aa26BKsNCzHjtaoK1uXCKNXizsTi0WiNXFhkTruUttAer7yV8b2FdN51A6xxdj837kiYClKZFOXbcEYzJvx8xkaZvM3y7O0qLseZdk34Vq06WCWskjLtQhKIyYYDqeLiSAaIuc5NF9wjtpi7WnpoKNSUyvrZkpKMIrLmAtsrdYNRSj7fKV0rxIJjyjzWUEtQ9Q9HH/SmfMPLeGDMGvycl5+O0XmdE2AiimC8aCNcEcc2sAeyoGRmllEa/hqxU5KBB27n8dCGTjpIWerfaczhRtxuUsTTNuLGaBcCIB99QmEhqO7aaFSJCRARmBjhlLHYR5eSp0sS1nKCzXaVGyDcLNgwAmzdxv1k3PeJRqu+LJ6+z4J/d5NMaDNrvlio2AhKF+iCH7QafFxYZ+67giWXiaX82oFoS/bKHRfahlkTN9r4dE0BueKOWeaMZYnuaFpY4BVXbypcLcuRezbCTPZjVKHxGUxgBqGkND2rUosobgsaq2HZaMSHTyQQIPW2IUkLFbCqLAFPaEhqUqIbqAwFwbMUPtSX7aRSupa6BYIa49aWlVEwHR+DUKlB7wWg0f9NgXQaqeJMdeabOfkgnIJcDfi2AxVZtJ5QQZFIgG/o5DaYTDXrwNFdXY5Isi6UQUM2BtjxWZC67TKYz0tcK0/JxgZnhRg1nYMBXRXU9r6xPMv6RFLhAlhtw1CTMNXwonqYJiLQTrO2deT888IsZZWPck3VGZgFu4xbpsMeT2E3KlNr81H5WRkJNdfCyDo6b3cEOqlp4nxJl1npZeZA80iP4SZn9Wz7qHJS7skx+M+0MNtPs1VMa6OGElmdxjHKNx/BwSgXYQn7Mpm92OYYSxdcypJRVu65G0cOgQJ4QySKF0UoXBTVi0uYcohZhzduOmmEq4v38wTFFEZdId027MJ/R1Az/SQgDxdmFXBU7DGVaQd2UblsMrtX8H9TbcSyyMN0Md4ECC2jbjW9KuMxdLGpV5OssG+MSpC4DDS8LR+S07FlF3CyWZB2sux+M0j6o3m4qyuzevK+3XHU5gorT3nVVig05iQrta+o7jdBxNwpRMaD4SugWEcSDlwzVxGi62yPUzCDTkltyq62EZmtRaxfPGj30M1IoRjRx59AQgpDzYXF1nkmfPXw5e69pSi6GAcrt2KNteciiOJjusN4VPv7bYSITlfaJ2xK62g3lAuuYOFFntDiIyKZzgQqtz2pwMDvcT6PYZdBz7UGtqdDyDHslCroUnBGrRFQK+igB3g2XIYiqZt4JRbTWgqikZqeoPUqLDyf2ug2dVFDIWjXH1LBdBq25j2HQlbeGMWpJngvxQy8Nd/taD8EezgR2PzzZikibLE40729r4QSRKQqRbbipMQo1Kgmlk3B7krWgfPt5jNvx5+EOVPV+bH2l+rCp0t6tlH+2dW3yXyj0NkzZ22QIwZB1uOGmwEMI80XMTuOQktGuzO41mwLO1cApBMXZbN6oWJEKeD8ebvwZ6quESWmstTuzGNRF4LPJEykbc+XAU0b7gc1SB43U45n5PfKi3WlFzSm+5c8QZpPmQnGySo9G4dA5gnLUCCBAiTteChnQpCUGyIX92SyGqjFJolRldIc+tjyLqyrH5LonrPYtfhN8SXsG0Uop+VzjIf4vJdXl1qhliMCdJNRmJHYZ7J5Rop7cWztr0VQ+Jt/sgpCx5Rw6Qm7oLsNoxNwC42p092xbKgyI6GwSiNqz46jPHl5NPQe4UTWYpVa6IWzolUvvueisg1JYZNlR4sxSy0xKo5Uts5md0t3AQxiNag7If1ayUKf/3owu9JypBjuxabmiUSPOug4BShIAbiRDlwzO8XRp3RSduW01poUOgJFUohKFVy2ITIjGuGmTBdkbGg8ev9W77vnB8fDkouelYnwbiLKJ1c7kZ/tgYpMrO3sFo4l5w80yeE+ikrfprOZ7hu72HZaawW42nSgCvCS/Qbr7JNTgqSIq0ysY0ZfZ8vJ077nmiPaXCx0+M9r+sxtahr2CnxkFN2fyChLjtdA5YQmlSo2aDadWfs2GxqJbF7W9Ve0zGmQTEdXSklSzhaJWCrMw5Y7BOXSOjKqyGg0ONqlnZvRqylqvvhq8cxK535LK5UgzpqJ1Ty0vgvIStZzDKBCqlCnZXaNgN9qsztbmDTeNnO/XTEQ3YSkzS50lIbdGInEXstmYNPShYzowpW1fnx08uiVNTyfL1rIo8cQsYVeTpNLEcKdO2D+oVNv5Ak7tjwwrsbWl9ti+t4NMTNpxDqLkDouAxWvALuvh7eDFY2Hb0VJFoX5dYBpZhqmp9Ox+Pbd8s6BcqVBkHHOHCwhB6DSUxmU3qywZKM9OKRswox4hQso5aYYJ7OsBJdRUas6lq8teQEGciENKTWqqpbIslZJpKGRL0/s9aLAhk/hgKud7cxmNOX3WCUEJ1pCxPrAOy2Unxej1RWKXCMTL0KN0Xt3EjObgR6y7NGO6UUbISX2ThHg3727gXYkns1igt6E2t90FouEl1MRNjjSm75xReTW3nIjErxCgchvOpDQU3iNh/BlJ0Ce1KQPwN6FDg9m1j9bSEevo6LWkZnDWEicz8BexISqDfcoUyARvVYIfywgYyg4eLJqBOUX/tnSszbtEXcFOlL/L8u6NaxCAinlwTrmomjFLLoKCZui1FgHD1qjazTTzj8FE6NhyUgEwoFtyGLgczzhpx5K1mGWw2VacABSTfhviTydtRd4Nitk4UcOuIUBpeM0KP9YZEel8wN176R4rduaHYgmBPp+Att7ueosQsGkg7MpcfHkQaL9rdbHLykENKrLaQgOvK+hlpOEGyRC8r6tQ/mj5l61dWN/YQaG+U4oOUQB6FCj1fBpE1leDYwiYDdRLExYd2/Hs0+2avZadntn/SZDB5zehXoXDMacWDCk2QmbBF5WukcIBFSI4MePL6bBkSE7U5BGDWrmNeCZW1XaN5OSqEqPutjvSbFaPAYqRUEulREuI03reUF2G8M/pTeOJPKOm3ILOXKdRz+8dYsoHuPKDuTPQxoD305tVMmyWYlLlJiiqLhshR1J0jDdzdSQqbMKKHRKNn7Tr2BtvpqqH7jI4EiGL0Ch1LbRtJNZ0SmWSXGokvcodSlaaLR8lUB68yzB28yfXR6vJICc/K+5Dee+7DSQdhzvkEmQSgntg/HGrGds8o4E55jQTNqdGJ6nccSokeoRcjrV3T5osJwnGUkdqvhBb4AHXnjLnEmr2ujULw+n6NLsw61ZNsPJ91CHEqLHqUIwmJ4abZeDRyOfpsHWgpSyd0fKm7sqkABbYkeAU2J4Ikcc+uBoPvNcyP+w25jQ9KNJZs4lZD8VZzkm2XvcD4qQI3Hujek3I7eB7olbOr7LZm4YFyR1MWEJHKTAj74YBNCJsavcixUNFNUrAK1EvsE2/JmtH3lRqjVqkPZHT+6TBrgYJBIGYNG9U1Q0+YWuFpJdIHSC7M0ln5AuLnIhyvMG2ulUUxK0d/KoBSgYHrbXPPy6unsTBLuJVRr0M24gIPfA8pbn8oMIEwHsZ3JZbeeSUqJt7meKTGn+d/lgQSyXqycXzuoGQaxk3bcfB+UmkdV1FwM3sbKJixBe21RU+Z0qMOYSZLZvjaUw9w32KNuAcM6B3wzOCH0+myGuHz1LJArJ+OiUOMLslOZEVBeb2v+FeJQDpGPyeuDiF6K4EHUyJasym7DgAFcTLBJJ2dznJ5ukhbFbJICRMmkcmS7WK9mbaY9dWpHFkg0e8QTstqBm6KqLDW7nxqDaDEz0GgAap7dRuVIwCJFCHcmts86xTJiUibZdu4IjAIzNuGkAZTiCp2jacOU00uYWoNBhrHLSBtkZulOTH1LgQR70PHpz3L1QtQGAqkkHeqdMezFSv8wDRLShQZEPZrIOp1V34PAd4BaaiD20TQRQZjpkadbt2monF5vW5Zt2HAnDtjO0zRGizytTNpC6ziHb1eKnEO4m6Si89/18yH8H8ZqVIkarKTWNgwwxyCBqRXYp8pwowI85GviuSPyhLcPpFcs3/FRG4u0PBs+mdoGHFcgpC1HArxAQD0nKuRLuOdrD6kojTklYzL+1LIQxs5abkao2mKd32dFmJRpDOjDhbb3jKhpk0sUwzz4rE5iHijUNjV+zC+m9Ix9qS8Ii6ACE6HQYzTGeWrvbtsx6FK9rMgL1ZGYIfz1A5g1Ao0fXWZ5YdaqxcCsKSCZRmcIqSUcvgBBHvfb9Nnrl4ieeLdupwysolpAxH02Ir5lUMVkXwfnBfBtLaT8DOimkObLIBr7rCNImok8mVEmXqV0TBEj4apzYxR+pRtw+2pfGtns63b8pAS43Ikn+hloRVVrqkZsiQ8/rcZLjEGMpMJy0X3ygmMQwfJMPfNDOvzTgi2S8L+gkJECeTFCV2JrWWbgqVmUYvY2qADIFYKy7URDvcKsIskHZ+a7OjbprJaofPylXDzzIQi7SgZZZj2anhPpV2WOUgmzH16D1QV9srRce7QUIN5CSTUGNuN4YWgiElMyS1ekPby84u5OlPEhZpj+LmY2zctP2QxrxuYjSj2jXMUejmazPpXVavxhckMFTJ1OTDH0Ta+NOlwyaSjUpJfJMHFR0szY2cUhAsBVFsicRIRo+DYAhg5L3OPnqSEXropNzIx03RT1TSNmarZr3ZwR8Mqx/3dwYocd6Lq009B0rYgiaVpfxeCzilnHUY3mpCaYLHju3J36hU5UONBCUxXFNOG8z2RrVhFpAaYJTz2Xxq7eDVw6jx6LDPSLvtwCTw2nV0SmC75k18NRL/hdpqBOkk56GrwrVl0JaWd5qwBB63LaEoJxCNY8qWJxOsElJvVOiJfH0dJRUP4snhugwErkWlN/pk0YqyNZUGlQpmQmmQQQV/0+IQIn5wBLuWan5+64UpbVwYRltH+xojmX21CYRGvKLoRjAzMEFDt+mcq8eTsV427Lv8WWkhcac9NuqUDIFQ7Ec7s98IOzRVxNhPGAxhkGelqtyS4ShKh9kuVZHJlXhuuVgDWYeMWEyT9XIGNsbhZ/V326R6InkZU5mybWiHmfp+g5FRyzLcLGhYJ7TW23GIkkFlpsKs4seEvmugTHuvL13VHgYdGcpp4P4P32VwVI111vBmVlDP/Pys/AW1ONbsdvBEAHsa7n7itLijeELG4SZBEpzKZ86tpW7yBkhptE0YrBpzNnTmAjTO3pR1gwS7sXcLqUHhVO9ahSr/hPWuPqjU2s6tEKgzDuCIB9dU9HIXl9aZQsVdf5ydzVUEBhsdiDfb3n4zMwQXxWuY8pajHbKgnhspxTWox9kk1T/WsDL+/OCDM1x1jdqykkfzFEy6kG/BxaZOLEFPWwitgnDFPD3gYZMqVMot3VtaZMqejXhI1HbQZEveNbnNA6Gl2VpOAioemmgF0IRqLoQdP/bgMxlL7O5cXVY6ZWu1NQOKXQZKk59JUR5gqu4curvFjjXrMgQ8xjwuKjIAm0mk/WTuu09GoCDTNc5Urh4sIMhskUrDL9F+Ipz9ZzbD0OOqTEHhpQgYNPwAdF2Pq0LeyaDUmhx9tNheVL7VznGUGhC9ZZ8SEWo/njd4Djoeuw5GQ2ZwSQsGnE0LOsAV5b4HhlZL2jVqgdbtRCoNVjKwjscqkh+HmksPUneVwaLD5WQDdaYCOas9GjoaY8hMp/hguVtnJ9PZxBq1jtSFn4zZTFbnVNHjiJZmTYB2lmGQaUeG5KBMSRs10bu0g1c1tbZoh7ykQG/5cDe9mggt9Xzq2bmU8/IKBpwaf4VyoVm6b3GywrQvw6J0g1OXvVYT0yppdjPi5+0zCVbwHezHiosGKX3SWcRiqPXdDFA5teJZbGcZBtlIlSMl5m6GjJJ1bolgfUKyCdRW8+iiVqSiGCtuP9CGKTnocJP3Oi/HANhgaD1ZGcFkLUkhSW3KJN2AqKI564AZnhs23CCzDAJ2UXLLTAFSNmPfPfdh2W3aza610MAiO1DT3qj3g2IIjdiljDeI+IC2ZBdsZ9Co8M6zevKKxCYTO3BiqMI2ymeD78NbuXlMVtNMaJSS1LgTKRUDmkZWzcilWW8ALea+0gHQOkQjGb+2AaFlKg53qMoEahunLLBo4RztmG12InHDnaDccDiuNWPUojlarwOfTXG4iYNrggZdhp7hvtzlp3QlNp89Co2/NvMxBswqgornDaeYBKVpMYiI9iCg2ms0aZA2mzuoZkgrmdBNocsQjVp08PRNxjzZSwgvBUWVeto8pbCLISaXw4KUKwPHbzgeegCaMa5HYXGwGuNTzYm8QG7tVqbTTF2iGRVdl5iBeG0QnsbNuhoywRuJ+tBlsOpAml0TupVfn75AaeBkSUCz1Hk63JKzj97bDZMcuLsCO4UlDnobjX1dFSvrZ/EUwnAYQkUiGS+fqGu02akG+ncDFYgumWktAueUKzQyi0NXEcyjGS2l0mGFRcr9T7Pivh1DODV8hYKeEP7Fe6kGDghEgCMAgfpC8SQPf18zl25CGIgrrJ0QBFjDtpdm8lS1U25E3T6lzYDFf8Mug+hW1NyM2laa1XKIPAnqnq5kTIAijbfNNNgEudRxaA4jSVn24JqKo6oB9qSo8y2pLRkpa+bDWZ68nYNIbbckl6kXEERkOAm1GS8j7ciIUzlO32uN3mndmS/G+q19MEqSqKfh/RUPPms/MVEp9erYFUpBvZQ4zWpryrTyEUfA81aYIc6qR8U0tJWbEo/qzgIqUF0qwKZuzlOkzkSF37NGWTYylvAFC26gTTSyWsjdLpWdKckArCTfl1dKiUQmJm3QghLC8Z+joRSTbJuh2PkljchqV3WsdjvZdlaHU8ymO5kTgQGm4YxayEg12ICUEVa0TwVK85YVKTo9BuvypGSGm1pzVBocgMPYewZbHN2COdqxNOucxfYB3lVFQyUg1njY+no8eIYg9fQoQC9qjFpEC9WgouZWI01OmhfoqlpIlZlTickg3zI8Dux1JtHLNQd6Sc1J2sGke0fWyUoQGYcwa5qUV4Y6M/RB1KpIt3oI3aRKrcw8NFewoj6iWV8b3HTybPkgMty0o2o9CoioFQVRS8nt5JMmpWDqyHpHSFHTQxHtyrB5HXQQqHUe8/PzfZ3cJWwnqrPZA94gffYYSGBeHDaxpquaFubwXQbAN4d3JHQRQ9mMxnJBVsnQbuSmH2S6D4ZwkPlXSkpwiaR3TnSL8gOumalofooW/PicmRfHo6nAP5Ds57LuT4u3BKagHTFR8YNLqG3a1Gg8iARUhPIcQdKeKq301OBsSj1+jhZhzfwnAHYElZktbzued9551NbcGaFIUZhiCGZhJeboZy6nasoOVXMxOdjjyA05a9/OWHsPkZ4kwFBJC1Tb1nxdMhlFQzvVwuUtTguboSfloYcZFPNHM4ygwWGCFAe1YepRRTJPQdlcP3UB1EzxmJIJgwDE1eBCuDya3NheR6JTUT+cFHQotBccTN/LtXrUAIzSwY60EWMYshukjgKYrHlL2/hGAOhKs+vmLGsj206NyFh6ioKJiabLsEVtx0MOOaT9/RxJIh2XvVmYYiUHJpPCjXWPJlAoZBKFaYbQ8FbjTKxps/eZFmsvgZSKYadUsCny2QwjlkL5+4kZrtEgHDQZhfdRQq3JtIs5ewtc2evr8OApKxStkkJKudt3+jZy1NkzGsaohWsh8h2co8PLU3TbbmW7R7VDqsgNXKz7TFgVg2WmxhSqvSHLV6E8q7RbpZcAH8RiqIS2GSWmn9HKaGK4LoNzVGthpteZqe81nryLia3OrZq+qR39Gl47AESTor11GAphyxzeuQtIr3fyk3I8K37D04BdhgAot50LNSaiffhGsHhPbOaAFUjEBxlaWlMl7kH7fjGmMO1Y76BBe3qTbJ28HSm6eWkplZaVBzmSSJS+XnIxKD43Sr4P9j0y/Piz45DpUoHOUc867CbbiSmKjNXbHZrWrGXZ8E42b1hrMzEEiyn2A259GyGL7X3sZu2ew1p8XTG85r+rXN2n65DccXrSZPRLQXW6kncx19HsPwWNB59l8DqamJYQTEljUMiO0RajIUsfJ7UcFoMLtRTuPq68ohmV4faYcq4eGkNgqua3imPaN/TTw+3rBErVDspjNgylIbBO1AaYqsENbJVcj5ZbAHa120EoGnNqDi2btwqQk+iouB8leI8Bh5uEIm2aUQ43mWwmBb0eSMWWF1r8eD7clGcnPB4a7d1Uj6tEkSq7Bkl1J89EMy2hDlEmP0+1IxIRSWOWhjlkyVB7Fm3s4FU50x3M2tia2m4RzEWh4Qcz5NVmDrYVyeYZt4Xd4FmcF0xra2BBkGYgSY2zJiEbSw+ZJZn/lq1JO76UxpwR51KickmT3g8loRY/fe9rsmVb1p2jwqmpr4xISlXIJQWoy6/SXNh5ZmZ6YotBRXMjVdI50FK7/i6qJnQfnp0kVBRJTqOAa1+tyOpQGUITZO9iuEgz61xFPjVHmURVNz1CLn3b43itSvDiR3dDQBjlqDpiw06LzhR36nItDekaqzbkrE21iV2judD+ynpwDKGxL1fYPa89GFZXUDRPp7vMRcqgBc7s4E3ZCh38GW3a1MiYsc2Cqc92tzBsKbaUEvWohXdhFTW7XOpNk5tzkZtVy/Kocux4ljS/r1TQzFvCYg55wkdGYak9ARhFHejGGI4g0h7vfjo1PvJIy2TsL7TDuCiu3vR9KccYrVei3aTMAFUYmofgMb/axHbekAqZb271+UOKaVZjygBMH7ytI0i7QFz8hLgFe3jkhy4Z4GhGilQzmu4p9QPZmqY7S9mKNFGomcByMh0ydO/2JBoezE7ukUEJm/LYkN2vFNOmJcSNwkIxk+Ixz05VMJqcHNCohZ1Hh1LZ1UnsTC5qOcll/re1AMpPNDs8FIabMp78MGmCEFPmWKud0qWztsmWND0akdl0WgHAGs4wEYNowFmG1LFlKwpLxocx1gVxA1Fm96WW7Qag1FxUY1uefodGo5a2Ahp081SEacpVg436dfc4jAN31HPWWvFUMj4ZkVAhSRshZKZEQwOlWjknoYeRuWVoz5Q/Uc8RZIGtvmkLM9GZYQgKV00ON9xERLOIIRgiRKYrmIof1Tw5pbJeMEBKEp1Uo8wzvAAhMFnYzVOeU5ctOVjvydI1WgHSHjPppM5jqb3NvBEPF+CCGtj0eIKMhJpq4Q6cASIaI0hXFqL9/O0onQKlqlBLlCHHHUR+kE3kqa46xshqMKZe7wuzGdAV8gkO0ERsWJfJqCXvMvjBgxy7VkhGORvPns0Jvdt8mMU2HnmrsjvZyRA/3iwMYfNk2P1MhbKFRtSVIUdOW8p3Uz5yRqUAKdlTNgFcojS4ldtoxGOdbYZeiyOfrD9luQqpU8bZSW/rsWfvl6DDgaThGByNGngndBkk1XEd/5wQLMj4VsbKyDaUWxlnQeHQhUaajUnNXxtUDwHjiXko9BAiQKg9pl+qRfDLM7mM86hF9avpsxASMBhEbnAJNZU8AVOj+myNfjQTrVGUTNGyZ1JiETB29xG3GrLLoMRjidRbMmmOpV+WjTwDyBEVFY5mAEmesFuNfIDd8K5AqFy/UzV6rCi1rM6oN1r3jTQkLYGUNkiTyo8HzhBAYC/BdQkusSc0d5IhO4mVMV6tSKw5e8QssuITUGmT7EZmiIfMEGriaAdfNq36H11fjV18n7qYr2ZGj4aBqbRp6HUXiUm2oKGebCBTDUiDS5mdIs3eje8MTUvb7x4qIECkZ65eO/KO1IOKqiYfvj54MVce4iJ9R7AiGvRVz2ya7Dp4aPej1L7dXvDHCxy1/4wkYz1IUAxPttIoukKmSs0biXloMuh6vyhhNwCadZsrpPu+8bYty+Jo7KgcNC+GrvqjeZGyda2vizG93AYuPBrigQxnzNXZ7hJlojsGm+uwLrslA/WAvL0/E0alWSEy3vLhpjDLILWfCIpJNEuIViN+mbWwqHXq1aLlEAAtpaxnms2xN4jmkHbwbR9LqTvQGAZj8mFU9NKVC/txtUEiPBvtxIyITfLwswzqSKLYMiGZuFISu+3GqIKuq8h4IKmupjSEZhcuUZMiuMxMZzhlESWzrqODQX4gGaXopBtJnaCt4YS1wyai2bSutgBjcw75CoO7jhcyQlRQwbUPHUAWANWUGNmxqtZpqziVGahGjRbDMBJqVJEVdlQtuPtFC6d78OY+gSk4SxzxTEWeWjQSQ6ah6a/4TQn/KDUQu3Pq2tN066Z93T+ls8ynSK1DKyaBKxKyPm59uEh33gzSV6vq7LoJyeuySUXvhgZDs3dAM1qcfBQ1DXKzlog5WWamFkeTFiAYmaAYi1Uj1TUchBDs4LUa8UxzxgXFWIneJWw2jO2K2JaiXXl5hlMqlxWCmCLgagAJtTDcVI2q6dx5yZ6GWvg5diXGOoWfUXiJlEu1fYg0WkKqw682rSZ7VZdNxKasy9BP37VzWMk4I4UM0i6Vhh1hVA1+T0R17TK4WdXMIlHOYrbtCaaoskzFVE3jUqWdrFCNFCVTLFd4yAxbdZq7OZk1qiUUwl292AIVGSCiVaBm5CsqckCV8WDPKLg/t/ZwgLRezzZDMINwlLU8WonBbP/l8zW52Y7x98xu3fstDgixZJCxy/XfqXsSFngh2TS717Q+9egpEzTNob3xWOYDGJQ1xjyaVqskWvIprGrGLKYrefCjQpXZjDxT2T1S1Do4MUlBznCLmv46qTlR4vWF01Zje4rIGsAq8m4l5QWTcThpNBYAAsvQAJzqaH5UGFLr3JSelfWizFGeAjiwKXmb/nA7Ep7PMpjwoW7w4SZC8GVIw1VqRXYKi6zUfjQqXdoF4DOUgfJEqIk/jHo8gIRayBBYSWzaRj27ozPh3Afb90wCZSRh0g5CWk24aQxt9lqBW4lvLVH4rJabZZo2tzVCMXGXPw3K6YpEIEzy5PTAAQFeG2MgQSDyUVbKEbeTjdmWySmWWoCLZOttoFCRNtWIw+CtYe9dI4hSGCWTuTcyDl9Wv6+0UY/tbEp5gKCUWSuk1NxoKKOWdIATdWu52Aql4lzqbqT4HIuDKtFEbMlUcIM28/Fs3vizuRHVvP1Etn1l7pOoMISlxJ6L6kSaj0/3wgZ3Q8ng63FKR01bMCx4pbI0KlSTehoOUY2oo8amVpyj/YjqoUFFxvT0ZMrGUkqfCUdTkkkT4xisBntIdAQrLZ+0+Szco9pgipoDcAM9r+lpbaAWoqy2Lt2gC1Ak89tMNV0Eqym3o2tk6guV7abyH1pklcaZdJ7ht2Sz8mmv5GBw8gfplke5Cnq0SlCKZR07GW64qXKjda0MO2WilihuArn9QOl6XPZ9lXLgxA7TUEzvB51laIebfBVLBvPBUT9a0PMb0uhwHsi11906I6ESAdXgKJzX0WhajLejclIQzgU4iywA2lMZEXI4qGhLkhaYBA8+y+CQ7Dgysqv2XGNvGlcio3ZDKbhMkEDdTTb0Qxqr63QZiFKmYjIypXyURotOUZr8NETZTKDHZhACFblji7sMq1Y13tGXX3HtJTfffLM075eYhoUBHjIbP3zgsaZWzToTlkNvN0x0FSuGU4iHfzIi9SxW1nFIufgGdcqgDNyJnpBdlIt69AT88KIvggk35pb9JmbkWmfBfVJrl9I/jSmDBiCS0uJUSmh8m643WT0FpuJwcY5Go415qkUtKU6zHr5qnw8lkGnOh5Zcj7uBqiBUxBn4W43GA0WFuDWqUaODwTbbzhisyCRlkXluUnSvzlPvXMDYrrtgDHXbLetw3erbzm03NbYkICgR4cyffPXiq65Zc72qQiTo+EqOoIfMh1LvmKi/HKKeUydYvlmJ+fbsG9z92SvPI2tpXEIeVFqeFXx+zbUgtVDHTuQz7cVR7gYlaUfjmckEiJExnUl+E+G5UYF75H4N+VANdQw6TRvPtxImEiTUhovdTDOOqYtbZQloYYTaOdj7Pn5rKx+zpCam5vz/4clj8YY4JNnGwJUMs7Q75pPKDC36Vtqzn+LBJ6qqfMHFl2087bvfupCIsOy887aoZNCWQ3P9N79zxoVEBGYnRSO3IPP0dAtyzo4pHag3VbX7dGZcz8Nw046Nl4kbbdJsuN8ggoQei9By9+QPqL/N1a0wwjvEy+TAa43Io8pPQjUOWZpLaQQZNUpaFZZ80GA9WkhyJd2EeBgHO3ihwbM4791CIpcXYtSjDdCHbqMHdLN4T/GfZCBEZjP5EYYVWQW17D6xc92FOZCiqxdSfh0dHlzP0GA4Goj0uz844/LxeM1FzASsWLFlAeEZz3iGI4J+5jOn/Pe5510KZoaI5JF5lolgFCIPCbjKU6JkIKvIQigAgQ6+2KrKCZXgdCbp1B1QjxZvpF0MpReoQJx3t10GVQE73jT0PSlXXgzRJjhsZa7Upg1ENgCUvYfOCLF5itooGJHxRkDFg6suA84cNGTRWxRmEaZjqDkIR7k1m8ZcoLWFN22YstPAUg2u1KVUoJ2KxpwIub8JbKA2z7MsAtX8T6bNo4paPJxjvfDSq+jkk7/wCSKsP+GEtzK2dNpx1apVoqpERJ/60Ic+9qR/+/C7nl5VXHsvlXMG9BHt3yRm8izU2Wnmp1mwIgVQhLTYHA/v3NTs727jLYqqdZJfK51GmNWbxSQ92gk2SbJNvQ49ScfqxxNJOYtbOSDNjHiTHFpqh7aEw9iYSiRUyodpspZelCRrFR29sYMfKC54NRJqCTmwf7+zxLIuGGUQL1mLQOtkhX5zMWEMNlRX1zURkaJtmzBz2sZCLQ/EzoxopKBHkllplGQ8JhS5eZb3gopd7QXVe977b6dd8qvT/rXdw7/24fBmBTYiYub6Y//x7jec+LYPXAmgco5FRLz3XlUll4Q1c9mpb9w0rYJhCBlZNTaiF/Gxt19obc/Gg0Zq9VW3ZWO0AeKYbYHMZxoKveJWuRnpLOmDYnAMgaBCjR18msnImWo5vy3vUncHmpLFXoE3xMynaV20wd1jYK5IMx6RrwmdzYKuz1CnjE2qcR4DBswjA3ZlsKvKaKi2Y2Aqjqfrqq3tE13FmOJQ2JGN6WZ07rb4BzO15s5k3t8EQi+i3ou4ygkY1Tv/7p+u+s+PvPsvmflOItqsaL25wImICDPz5X/39jc+6i0nfGDlpZdfw8zsnHPU+hx4FRXxXlVEbV0eA4AJBnYLEeWCHZkvHWN4lyP4jRKMWqR47JwAOIp6aJp69pqrCuWKT2R5dJ2Sr1mLAq/TQ2cIY8ybXB8k1Kltq2U8+fbIySmznClHqmVdkulUSF4eajbRAYBp8CzOe54OzZ5YkRpObr+4XcoS1OrYapqYU5sBRv0H0yzm+CMyVEBoZxlQNT6lMUOw9GvrGUoUMoBEnrBiNioKFWkAflFhIk9E4pjJOcfXrrmR3/zW9393+Qn/79HMdIHIW3lzn89vAta1QYEue8873/DsH5z2g5UveeFzX3jwQQces+vuS3fcfbddXZUP8QkAFRFSFSJmIu1aX1MXLs3KB2ms3Abt29e1TpJ9ClkbysI0pQpxurHOOLHJRsvzxo5FNJ09HZqp6FD7qmEiG46rBl8MKtLmHkPaso4FuhRm0jwRD8GxllbmbjgYgSpRKtdwzyBVR1XJnKY5AmI1OTK541TSkoKkCQrEw3UZQoYg1Ai3igg1YH1SbCnVNaItXZJpVyJSZm5bO8TOJEk33HQzLrzosvGvzr/kV58/5esf+8E3P/NRZpoWUQZWbHaw/k3RexFRdo7lpz/86hd++sOvfgHAHg849vEPPuboI446aP/977/X3rsfsNceO++y91578KKtt7KTvtoGlZaEJcRERODYoqQOuQQY1zLZXudgbkdeLW6RLy8qzj8qT5lZegp2FDeMoVJ3Fr8lE/LQir4g76toxVji722NqmgGekRTcIjXGg9EimJYmrk+GwsuTXxbImBWtZktCdpjP8907FHKE2cDgeVziuiG6d1LwkayxxkYnLZEbE7xwTPTMKhnMwQUBWfjXxmYF6zsACJjsAlgeqbGVVdfi1+ef+mdl1525TWXX7H63IsuueCHp/7vaT8HVp8LYL1jhm+k7X6j+/ht2nnivWBqasqtXLlSmOnqc37yjc+c85NvfKZt0+yyZI8HHHjk4Uccef9DDrjffvvudchuu+y07wH77bVwt912cfMmK1utNOJctUCgBPLkmrFTUlEIRBk8gWa4aTBkvuLRuAsYwjAmDRirFtKIrYKsdUpaHLE9Nly2TK3UjQdea6pceVHAQfM9m/DMCCDmizRdYNCmiN2JrC8P5OI+RnW5EQ8duMsw4rzLgF7x4Y4necYzsINmZVxW83VrKhKqoGrwMmir+fO8iCi4FZkSaK0+BC2tnNNW/jdmxTNjwerVN+KiS67cdNW111139dXXXXDxxZf88qyzzvrFZReccSGAKwGsi6miY5xQe15BQUH2N9wbv+3NrVq1yjcHw3KemjqfVq5cqVVVeVW55parz7nmW1ef851vfQkAMAlgn33u86gHPOB+Bx19/0MPOHzf/ffefZelO+y29567j3ZYuj0WzJvoBB3HJGCubrj+ho0ANg5an0Ic0SyaoJqnmDmApalJJ62VGXIJ7ExCsh+gBTENLxwrHuBGg6NxNNZsTDlzxbLityHgiW3bpenN5PLEkZKpLd2WNNaFlLcHB4hw4Gk10pOai4x36gVb0mm8Dy2yu1JFKmVBDW2YbQDcgIF0Iuu6ZiKSG9auu5GZU2OHwVWiOtCmcY21N92CK6+8pr5mzdpr11x37UXnX3rlz8/6+cVnnX3Gd64BbrkUwC0pi2kEY+u6plWrVvGy885Tv2KFrtgC4tsAhJ8VsmpVzBoJAE1NTdHU1BSmpqa0qqppFX/B5ed/54LLz//Oyad8DgxgO6Da94ijHnHggYccsv9+++5+/6VLd7jvgfvvv83uu+2y7W677cTz503w6Wecdct/f+aL/0hEdWzdbOk6A+BnNi7Mj8iuVgORphAQhoLa3c6h3jToVMdYtUcqHAAxOyhhcIEUKDmVcDtG8COIeWqiHKM8OSkbWMoRfLI04QYE4TDGEUFgqYcs6QBgPkebIxQKvJ0wbk96ils8dEgaDIXItugoCCaBNWV9jahss8a891vlf/i3DwonnXQSiAifP/mL//6wBx/9+Ic8+IidxmPBddet1iuuvmbDFVdceevqa1dfevkV15x/4UWXXPST0398FnDrxQBushkaM6OuPa1atYpXrVqFVatWKeC13ReDrKnh5/IBbS/WPM3lNDV1Pk1NTeH444/3gN4kUt/08//79k9+/n/fDu/bDsDiox/6jN2PPvbQ/ZYs3GarD/37x35w23Xn/aLJqAZhwxEAXbjVVnf0PuBo5FyOL9tjqA0YTAUSZw5cKgsSK9MucFqvHzo/oIlqI8euFaFl3bR9ectepEg8IkOaiNwEsr17jYpIasZrQzgRbe3gKfN2HGYhuXljI/9TRIPZgMU04klt+UBZL639d2lbeFnzhNJQpyq8+HlDpTwrVqwQIuDcc7/902XPuvZRL335Sx/jqBp//wc/uPy075+yGsCNAG6wm9q1cgwnn1y7Zj+dp96vGHTz/y4CwixBYoWuWhWHpdpHUAYJ3KwiN//stFMu/dlpp3w//PDy5cuZaMUgtdyqVasIAO7csP6qNs1VX3tlYgTrlozA0qEtpVOn9+TqTMtRKVlPqgLFeOguA7P3VSw844CZuS7iYkOXt0gJdGvxfTV68mQUnJUagRHS5pQV8QHnGbACmhFNDowNrlNaMqGn6gvaiTGAca6Gaeq64OjUxABSkRqOKw8i2jQzcx0AqWvPNMDsSTuSTET0/9u78jA5qmr/O1XdM8ns2TcSgoSAEwERJIqiqI+HbC7oDAoIIqLGDT4UxSQyiRIeCPkUfQ/fE5WH6IcyaISAIJuA8kjYg0kgQEgy2ciezEwmM9Nd9Xt/1LnTdyrV3dUzHUikzvfV17NU3b7rOb/zO+feWnbVnMuW9bf8bp9r0dzcKq2NAfQHgOZm8fAGSgpvvOjo9FMSe7kbALBs2TLOnTu3bMROc3MzHUfw0AP3L/jzwr9e+rlzPjE+lUqFgL1CRl+zm/V8MdG9fk4o5z0yDNZnVfvvzDP/yvood5TBYTYzNKCjjC+spwIZ8ozsR7rl3pln8SMU3TBEK0s49G5I6zwFBwzOmfFo5/2Xxap6Xne67/yDfvSBROnpvlCjiar0kRzm5bYESJ9Kmmo+p0txxTzqIHh/TvrP9/wNjz36+M0iAmluLlsERUTY0tLiTJs2R4AARbe2ttLzPLPZycebLCnsPxLlbpSfevN8EZFXvz7jO5/c1b77ymlvn3J8fX1t/cgRIypGjhgmVVUBwenufTCyr6/yQDB+feycKgwRJQwR8aY9G5sylUr7Ze87J+X1GVTxcqcRC3QzU39g7YTMV+79grSUCfaC6P3SfB1hEAt3ei0OoSyug++7aT1/Bf0i0nu9QY+gLwT9nOqjD0eEjuvmco3EHPrWvxk9vR62bd+BzVu2omt3z9aXV65aefXVP/3V1jVP36sWvawWOjBwc7G/SgpvMVEfTNrbX3nyGzPOOwPA5NrhU8Ye867poyceNGZKXW3V1MkTx48fPnrU+FEjho0cMbxhVF19XdXY0aOchoYaVKRT+Q7k7Uv6C+Ch30d0kRAvm0WFW0FxHLd3T6bcCsET1+3pI/wFcK3XG4nNrjPnwfTjU330ZTPae2zst3GZXZPUsoMggE8nyMDrLWeDunfv7tbaeSThZfu2blFE1McOtHBAFVhEgaXuMlkf7e2d2Lx1JzZt2uRv2bpt29btO7dtWLeue83aDdt3dXSv2Lhpw4ur16xbsWX1MysBtAHI6JZkvtXWx1tOIZjF29LS4lx11VU+fX91x/ZXVz/24Kvhe4YAaAAwavykd48+bMrBh4wZP+6QSRPHjBs3ZvSE2rq6scMa6upra2pG1NfXVI8ZPUrq6mulproWlRUOwjtnXTdAHo8+tmj3lvWvbnAcUZZ4kMggmxWIZLKrV21xfQjhZEFP6EPEYd92X+MKEJqk40TQCMwl9IjNofoGhtsnUBN0HC/jIO2tX7MaQDs8TzDIHKXW1lbfcQQbNz6/ZOnSl5YfOW1Ko5uK1sDdmSw62juwq70DO3bs6u7a3dW5dev2rm07tu/s2r2nbf3GzZvb2to6163fsOm11zatfb1tzVpg0xoAW1WB9fQ3FoE/P3v2bKecrmqiEA4A0QEXANLS0oLly6dJUxPQ1NREAEylUt0kX6fvv76h7SlsaHsqXMRQALUAxrhVo8Y1Tj18xISDDx75jnceUzlpzKiRQyvdg+oa6uvra6pr6oc11NTV1VS+vGLV9vnX/ectQMeTnkcpi884Z06wZh9aeKs//cSPO6d/IC2dLvyMcoJO8P6R4MgwFz77H2EhyrjT5kf7k43iW9vbfQApikgKgjqkux9etD37+D3zIeJjzpySM+OilJy6dZuv/9F/n59KuzOnTpl86M729uyOnTs7XSe9rqNjZ8eurp7NK9ds3PbqS8t2rGpr2/zC089vRmbrDgQ5Kx0AuqLZ1yB2rySeAJDm1lZBaytaWxvpeXP5VlUGezNiiUT0TRANAZpgFEYqlerbdkNfjywrLOaV9nv2TU0DH8BtPLmpcsa3L3WnTD0e6SEpXxwwnYZUVECcFBzHBR03eM2bi753qTo0L1xBbhOzrxmZngcPhPgepLcXyHpwM1n43h7fb3vt770/nX9Z5p93P6vBfpa5/015lapoCoY3HeVwAOlb7CayFHBTANC690GLiSQKoYz9Jk1NTQIAQXQkUByGTwg2trDveLl9BkdzCzKNY0492q0eehBTtdXukGqgpnqo49Y6qEoDQyodVlRUOOkhKUdSabgpT9Jutw/P8bq7hzqAi649KT+b6XLp7sn6HRmvO1PhZLP0d3d1o7PbR2f7bt9rb8OzC58H0I2WFgf7oE0tLS3OnDlz6LouDR+TzfadWC2GfG5tbUVjYyPnzp2LZLEnciAoj9BRTPtImppcOM4b1zLHAVpanDe4DxNJEEIiJY1pS4tgeeDm5JRFP80Rl+LL/2vjMur5fIklTiSRRBJJJJFEEkkkkUQSSSSRRBJJJJFEEkkkkUQSSSSRRBJJJJFEEkkkkUQSSSSRRBJJJJFEEkmkFCl5LwNZ8M3FfqmnzBQqL+7xVQzeiOPEKafYvcW+CsGJPSyhfYVeRTeQ/ipW/4GUWfB1eYM9RqzInOH+cJZgIgNUCIn0LSBHF18ymRN5ayoEkmkAx+liYMhypgG8jOB8+Vjn0ZGsAvBO7H1Sr/n9ORHZU8haighJ1gI4GhFvKkNwhv2zItKrz9QCOAql7dITBEdu7QKwUUQ6QtYvr1Um2YjgnRNeqL9SANaISJtpRwxkAAD1AI5E9Nn8jvbZ7jhlWuW+E0B1gf57aqAoQZXn8QjOlGNEfbu0zsmuyQPIIqb0s5mF5S5rEhSbJCA5rUh5UwuVZ6AoyRMKlJEhOcF65r0cuPSQXEfyQZLfJXlIuE0RbXywQHn/YfdvHNhN8oYidbwiTplGwZBMkXytSJlnx4D++erbVKTs1da9CWJ9kyWuL20sx9dVy2f0b/blATiF5BEi4hdTCpalzFjP25+9JVhxP/Ss/XNXqJyoe+NcBFABYAKAjwC4BsALJOeTrCvQ5h593u6zXuszFm8gIh7JkQDOzVN/83LSL5AcguC04rgLrDtUhl0mAXxPFQxLsyNMAZipz2Xz1Lc7WYYHkEIg6epknw7g/RbcdUKXWTAXlahsnAJXqW2JW44zgMt6Hxo8ndA1AC4D8AjJyXmUghQpM44Yy3yuuh/Uv9llmQV7GIBTFYLH7cN8dUzpoj0awFnaPjfGnEkpt/JxdUf8PHOmlD5IZD9CCADwVR08P88gmrLOI1lfooXan8Qs9qjLnD/sWgswA+AYAPeQHBbHZRpInZS/+VJM7ucrFgIri9dYIkowiuN7yRL7F1IIJB2FqhMBnGVZpnxleQDGAvi0Wij3AOwTs9ijLidE5omSqRkAjQCuVstYNkWoCI0ATtHv8AuMm0FqHyZ5ZAmuW7H+8NXSf6IYSjCIEsCZAI7VZ91kqR0YkoqhMHwAFyo8zoaeyTc5v0zyZuzDt9TuI+kBcDOCc/0l1A+jAbwPwCF5+tEHcCHJ60VkpVrTcoQkafE3YatvXBj7FWVmjC4G8M0yKieDEhYUQQlUJTSzzCglkTdTSIpeVcoEk6QXg4k395yoz7tRyEM/G0lm9X4/9JkheVghCG6x0+8JPWv/3EFyvPXM9AL37iRZU6BPqkjO0vu9iGgGSV6i91bo51/079mIe39gfO58CE0/j9Jn/Bj9b+7ZQnKEGcuo8TXfTfLFGONr6n9Wvjpb43FmRJvzzZMV+3uUQeexY9bEW9VlMFD1kwAOjkADPoCHovxH48cegLFlATBcF0laP/suEekSkXkAfhnhPhhreHwZLaNYnEAU4tgO4IlQv5vcgZEAzg6RkuWQmSb3Ig86EACz/gUMomsUlYhQRHz9pPnfYJRDqc++UYrIKUIMiZKJ9gQ3n+sBfBGaiGT93SSgfJzkJOUgnANoLngikgWQFZF+lyoGRxVCmMU37w04qBwKweJvRgP4TOj7PP39YQDfKFDMl3RSD8Z1Y4hLOBbAmWEuweIOTgMwXb/TPdDcBoMERMQzyVgkh5OcSHK0GgZPL5aSm9FP0wfPSin3v2kKwRrc9+plE0Nmci0UkdUA7g393UQiqgFcEIe8PIDEpCpvQfBaNomY7ENCFnuwY/M5AMOwd3RHANwhIs8AWG7xPfbiPRrASYOZuKHvZAglMAIdzCxSRsmWWj+/RHIJyedJzovpSl5gPTO/0DP2vNf++jDJn5N8Tvv3BQBLASwleRvJs0mmVWm7Mer/ea3LIq1PU5xxsVyVw0k+pdcSkj+Jao/lZv5M73ua5DNFridJPkfyqmKk4tcsCOqEJtv/6gS4BcDnI6wlDMkGoDtuKu2BwK0giCyk89ySKcMiMK9Br1Ry0C7PKOf1AP5qjcG1IbfO9PWMPK5dQcWn5TyCIM17OHIRJg/AuwGcLiJ3WbDaI/lRACdYdTRh2h0AlgA4CYWjJIUU0kStCxCkyBfqY/P38dYz6wo9o8rAI3k4gPkATs9T9igAhytqW0LychF5wDxfoC4TrLoAwNUkFwLoLbI2RNHY9xFsGzCysUgfNIa+L46scgpA1YMRJJYwhA4EwCIAT+vA/kO1p22hzM+HADijxCSZN51H0EUmFrFq/pbWthynCsGLGJANZUBFhr85VSefvYhMH/9BRHbqfb9HkJFpW20TgjyN5KElum7mOx4FcEcexDNLy7Pf3hSOLJhn/qRlDQY5mexOH6HXuMd8Zk8RZOCRPEU5mdOtenoAXgWwWBFCp/Xo0QDuJ3lZMaSA/tmpvQCmALhAEWchpOOTPApAM4IIUm+x9qjsQS4jdKfOy415rnXq+m9wCkDVLyjsj5r0N+tETKm/fWvEYJuJUu4kmX0t2TCJZF09ytzPtqxfGE4/N1iEYPXj1yL6zljpW3TSpESkDcD9lrtmk4tDEYSNB6KkXADXh9pqvv94RQm+WrCTAZwYci/NM9eVgdi0syllAM84RbiadwNYYLlnAPAz5UyOEpH3AHgXgo1l3wGw1cwXAPNJXlxEKdh1MQleV2hUy8/HJ+g6m20hUhfxMnnt77oawNsBvAPAERHXNDU8lzt5oGpNxCQySGGbdpzpDAC4HcBuq6E2s/1BkseUKUlmn6MDAA0k60g2kKzXaxjJSSTPAfCYdm54gRlUdO9gLKGVKn4MgA/lQWj/EJEXLH/RuA1hRWTqdwHJGiVGS1FU9SLyCoAHEB1VmWWN6ayQ8jJu5oMisgJA3X7q/pFkNYDfqPLMItjV+lER+aaILBGRPQrrMyKyWkSuA/AeAM/rnM8CuIHk23Vxx1msBDAZwMVRCNpSVMchlxQ40NyWLhFpF5Ht+hl17RKRPU4eqHqW+mxeiNkGgAUiss0k3lgW6oHQfbCY5rgpt2+mIgCC5Ku/AXgRwDIlk5ZbP/8OuWxBCbXTAfCwiDyvE2KwpOIMyxqH5RadzK5VlwcArIlw3TwEkY9PhBR1zDVDQbCRCxEoYTqA9+mk/WAedHCtWXj74bib+X6hWsqs1vts5QXSVtSBlvuYFpGVAD6mUFtUmVyp5UkR1PVHdT0I4NskGwqghO/rM4Lgdbu9A2mntqNCP/NdElYIdqiREQ0hgJsUyhhobVDCTRFW00yOs0mOVo23Pyd2CILU6/Gha5zlPkXlY4iSid8ZjOKzrMJYBK9ottGBWWyva3SBarF8vXYD+G0BdPIVgwBLjKpQycWHQijBLPIfKCRlBDp4TJUkUd6sVTGnPIV5Hov/ieNaGF7l85YF/o1RBlb/0sB30+/6/7UAWqy1cSbJCUXmuQC4T7kZ0fn1VRslWCjxBABnaNlLAPwPgKoB9Jen7ei15kvUlYM2Vqjx/ar5w5NRFCK9onHZYdbVoL7z6pCFMhNwGIBzIiyUX8ByGP8njhS6jyVaaxa43JAyoOWrfVlEnivANscRU/b5ABpC/I3pp7vVco+0+n+EjsF9akHcCEV+gvr9KDUEqZM1jBLMgjsJwMnIbfrqhw6sE6XKiRCyOoGzETxPn6K0Ij75lC8BTFIf2ii4X8REeMb9alU3WtRoTI/B16QAzLPm/6W6tT3sblxp9fM1ADYP0NhUqxs8KrRuzTWc5NB8CymKyDKVnKpwOnxikln49RGdYRrwRZL/ZcEyKGzqDdVDLCs8nuRLhcJLOijjQlbUlk5l4EtVCOGFKnnu2wLgUhG5bTDKwOJvhiAXaoxCW59CsHHIiRgnWvASIZcmhSB7dDHJUuuWVoTwOIL9HFFJRxJyE58CcJ+6lNkyKgMPwL+TvL+A+2P2dExG/jCnqe/ByOWObAGwQq2zFFOS6kpsJ/kickcDTImBEutF5DXdF/IpBKHMS0Tk+4o8ekmehGBDGwGsVJ7uhAH21ywAl+Tph6wSlj8DMC8VgqqHql+UL0xYrVepVs9XLfwREbnPSn3dqlpvcojJNoN4qog8pFrTix4XIcl/y7M4RH28Tm2jH7O+cZQGEBzucbISfIOd+K6SfqfrpMo3kYcNpGz9PIvkLBHZYIUMY42h9vM1ABZi7wSpKLlWF1baIp/LwgWqWze2hAVRSKqsudKJ+CFNY5CgJKTpiziQ3iicH6pyTwP4GskbAWzW/11plXmN9mVqgH1WF4PUHW1PfjOoFyk54hUY6EKQutgCmmGRVY6IdCthF37ewNyLSE4xPpvmjzv6WaF/PwzAZ7H31mwDx15QRZCKOXmeQRCLXoQg9vy4+u1ha+jr4J9fJkhcKNQYt/9ZxGLWATivBMVn+9qiEZRnLEQY1X8OgryUu0KKvJwuQwZAuy7gjoirU/8fZ3F3WnO9oUQf3ZzAPdxqY0dcbkZElgC4Tb9/GIDvKsI8FbkIkyGz4yi3fGO/RufzUwCeDF1PIMgpegUAUjrQPsk6JVeiJotX4oA6EXCXCI5YO1xEVuhuwF4A92DvrDCz4BoALCR5loi8GDFJ36aMbW2ERTV7C+6JaXWMhThNRDaHIPMJAP4e4UP7AL5FcoGIPD4Il8HR9hi2PuosiVLHIOw6mL65iOQNA2CrDYq8VuFroQl4vSprN8IoDFZSCMLeX1fL6udpe4+S47OLGKlVCELm1bqw30HyUUSHWftxEGrYxiCIPJm2r4jbXl17VyPYhFapbvWPEZzCZcqbp4YTGFjkygHwIxG5MU62sGOFXprUF/ciiLNCh4bkO0gkynpUInfEmqnYHQh27UmowQbSHgFgMcmfkPyYHpJ6qh5QuhhBokgU8+8gyMC6twR2XQBUhLa7pkTk/xBk24VZdiM3WtudB0L6mIGaUWAiljoGksd1m4ogxs4S80IMzP0zgoy9MPFm+vxlAK3G0OyjaFCniGwQkTUisjbiWi0iG5Xsy9fhpj3rlcHvO3ciZmatWTfnK3dGBBmBi0pYvBUi8jKCHAhDSt6lXAEVabUOYh9KX12tMHVRbWtCLzMitBotK7sUxRMjHIWmJyKX0+6E/NjzSF4lIu262LboZpX5CgWdCKRQq6TIJXmgdhSiSQP4oYh0lHhAqNniaogjE4ufq/xKyuoXs3iPAnCFiPxAv6tUn7lXT4ZuyoMOCOBXOsHdIm0xfdashBkiIhUzANxZitU2G3HU8v9IJ3HGqmtWFf6PRaTbcCoWgVlOl8FM8FQe5ZnSuqVj8ja/1PmaAfApkp8Rkd8r/+GH5rzocxmSRyBI1zaH0twuIltLQIp2nse56q4fhVxUb55+T8UAECIi0LJTxAgwpQP9Qex93BUtH+tCEdlSAit9rPorEhGJGKfM6s16rwvgBgTbZj8SMZAGKXjof9ipqasT4V+m1d+9ydr+O6AsSZOOKiJLSf4WQUq3zbIbpfA9kn8UkWUROwHjLLYLVPHZp1KZej8rIheXGBnYAOAnofJMvcwRa/8s0foYq3o7gvj7oSEEsx7ArQPIdyiZWNQ+i3xRjv6dLB5OMcbwd8rdHKvz59ckPRFpzeNqmP0FC5ALD3cg2LBUShKWr67YKpK/QnDCVZdGPZ4D8McChHpJnIv2U1E30QmRfX7IygqAu9WKV4YPDMlzpRHkK+Qjn4jgiDWxtJ6PYPfYYuQ2DYXPLkxZCsGJgMWehQyeUI3bR+AMdgJqfefpgAn2DrcNUddBYoSd+jH0miqe77RqQZCZ6JAcEqf/FaXcoZM0jI5MH32xhHr2KS6dwD0ALleU0arXnQAu1wSpKF91v8tUtBKOehFs1d+J3E7W20n+huT7SdaaDEWSR5Ccg2BT39ss43CxiKzRtvsDmFvX6dyq0jnwQ0UZ5UjkG0FyPMnJeq5DvuugFMkpymp6oQVsBvDXBhLGgUHmAAmStyLYFehFwPnjAEwXkUUGwijUOgXAjcglMdmKSSLgr50wZCzdbQji7e15Qo20FJGEXCOvgL/pauz4JnVdwglAvQA+oBPjF6oY7XdNeAXadAaCnaEZC3GYOu1SKOqT7In5NiZXRNaTvBfAp7XcVOj7m0nORi6F1rMiM14Ep2MjJhGRBcjtaelHlOVZEHY/iPVdcRePfS/L9YzZY6PI7qNKUk/Q+z+n11rluarUDasI9eXFIvKHIq5CZF2subVOj9S7QDmNO633cbgD6ANa7s5MAN8qolwEQIeDIN5Zay0qc6WVMX2kRILIdEgrgi2YFaFyU/o501hTa1B2ici5GnV40Fp0TmgBwUIKrsLiRwB8TETOUWWQb2KmQvWwf64v0GlGk1+rizTcLjNJfk7ySItHqLb+b+6tNH2sCnE2cic4h+t0p4hssk5fjmt2RHkHx/o+u9yxyB1zV2+NuV2/oQVcnMh8+AJ1rAy3XT9rYzYpbUWvKgbwTGURgtEVkcUINi3div5ZjhMRbHU+LPTdDwM4UURujsEb2HVJ51Gy14pIo4h81k6ZjpjzBdtj9bdB0kPVtakvcNUBGJvSWORS7J0YVAFgkZIacZN67AyujSQvVFhlk4WGwd2NYPt0xixek4cuIn8B8BflIk5DcGrTFAQvKRmiSmcHggyuxwDcJyKL7HBQRGea+q8GcAX6b1AydepBLskkkpXWdp2n5E9vRHRjKIDh1vffiGBrst0Hvg7Yw9rPt0ZofF8nzp8GsDnI+NCPql9aFWqvyctYo7/PQe79k2KN/+J8jHkJsNjcd5eSor0WL2R2z9KG8HlcjbVqOQGNmRexjkBwBoB55qUiSMFwResAnK9ZteciyAeYpIq9R8t8QlHb3RYi84rUZb1Vl/URSMHk5vgR4UHzc4dyCw6CjOFCSGE5gnM1e2PyZwKg8/8B4dFLqLWZQnUAAAAASUVORK5CYII=", ICO = "data:image/png;base64,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";
  var CSS = 'html body header.top .logo{gap:0!important}html body header.top a.logo.lf-st>span,html body header.top a.logo>span,html body .top .logo span{display:none!important;visibility:hidden!important;width:0!important;font-size:0!important}html body header.top .logo img.lf-logo{height:52px!important;max-height:52px!important;width:auto!important;max-width:none!important;filter:none!important;display:block}' +
    'html body .lf-flogo img{width:min(210px,58%)!important;height:auto!important;max-width:100%!important;filter:none!important}' +
    'html body .ov>.dr.lf-dr>div:first-child b{font-size:0!important;display:block;width:52px;height:60px;background:url(' + BLK + ') left center/contain no-repeat}' +
    'html body .ov>.dr.lf-dr>div:first-child b *{display:none!important}';
  var st = document.createElement('style'); st.textContent = CSS; (document.head || document.documentElement).appendChild(st);
  function fav() {
    var l = document.querySelector('link[rel~="icon"]'); if (!l) { l = document.createElement('link'); l.rel = 'icon'; document.head.appendChild(l); }
    l.type = 'image/png'; l.href = ICO;
    var a = document.querySelector('link[rel="apple-touch-icon"]'); if (!a) { a = document.createElement('link'); a.rel = 'apple-touch-icon'; document.head.appendChild(a); } a.href = ICO;
  }
  function swap() {
    [].forEach.call(document.querySelectorAll('header.top img.lf-logo'), function (i) { if (i.getAttribute('src') !== BLK) i.src = BLK; });
    [].forEach.call(document.querySelectorAll('.lf-flogo img'), function (i) { if (i.getAttribute('src') !== WHT) i.src = WHT; });
  }
  function go() { fav(); swap(); var app = document.getElementById('app') || document.body; var raf = 0; new MutationObserver(function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; swap(); }); }).observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
