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
  var BLK = "data:image/png;base64,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", WHT = "data:image/png;base64,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", ICO = "data:image/png;base64,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";
  var CSS = 'html body header.top .logo{gap:0!important}html body header.top a.logo.lf-st>span,html body header.top a.logo>span,html body .top .logo span{display:none!important;visibility:hidden!important;width:0!important;font-size:0!important}html body header.top .logo img.lf-logo{height:36px!important;width:auto!important;max-width:none!important;filter:none!important;display:block}' +
    'html body .lf-flogo img{width:min(300px,78%)!important;height:auto!important;max-width:100%!important;filter:none!important}' +
    'html body .ov>.dr.lf-dr>div:first-child b{font-size:0!important;display:block;width:150px;height:40px;background:url(' + BLK + ') left center/contain no-repeat}' +
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
