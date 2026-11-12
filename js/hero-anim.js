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
    if (band && !band.querySelector('.h3d')) { band.insertAdjacentHTML('afterbegin', house()); spin(band.querySelector('.h3d')); }
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
  var IMG = { hero: 'photos/maison-hero.jpg?v=2', big: 'photos/maison-grande.jpg?v=2', park: 'photos/parc-expo.jpg?v=2' };
  var T = {
    fr: {
      k1: 'Notre promesse', h1: 'Un espace de vie confortable, <em>sans stress</em>, du premier appel jusqu’à l’installation.',
      s: [['36', '', 'mois', 'de paiement échelonné, selon votre budget'], ['7', '10', 'jours', 'pour une livraison dédiée en Europe'], ['30', '', 'jours', 'de validité de votre devis gratuit'], ['100', '', '%', 'déchargement et installation offerts']],
      k2: 'Neuf & occasion', h2: 'Des modèles pour chaque terrain.',
      k3: 'Parc d’exposition', h3: 'Venez les voir de vos propres yeux.',
      p3: 'Route de Lyon, à Périgueux. Du lundi au vendredi de 9 h à 18 h, le samedi de 9 h à 13 h. On vous montre, on vous conseille, sans pression.', l3: 'Préparer ma visite →'
    },
    en: {
      k1: 'Our promise', h1: 'A comfortable living space, <em>stress-free</em>, from the first call to installation.',
      s: [['36', '', 'months', 'of instalment payments to fit your budget'], ['7', '10', 'days', 'for dedicated delivery across Europe'], ['30', '', 'days', 'validity of your free quote'], ['100', '', '%', 'free unloading and installation']],
      k2: 'New & used', h2: 'A model for every plot of land.',
      k3: 'Show park', h3: 'Come and see them for yourself.',
      p3: 'Route de Lyon, Périgueux. Monday to Friday 9 am–6 pm, Saturday 9 am–1 pm. We show you around and advise you, no pressure.', l3: 'Plan my visit →'
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
    anchor.parentNode.insertBefore(f, anchor.nextSibling);
    f.parentNode.insertBefore(x, f.nextSibling);
    reveal(p); reveal(f); reveal(x);
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
/* AURIAM HOME – fond 3D (conteneur, maison mobile, modules) qui évolue tout au long de la page, derrière tout le site. */
(function () {
  'use strict';
  var D = document, H = D.documentElement;
  var CSS = '' +
    'html.nv{--bg:#07142B;--card:rgba(11,26,56,.66);--line:rgba(255,255,255,.14);--txt:#fff;--mut:#b9c4da;--cu:#FF6B2C;--cu-d:#FF9A3C;color-scheme:dark}' +
    'html.nv body{background:#07142B;color:#fff}' +
    '#nvcv{position:fixed;left:0;top:0;width:100%;height:100vh;height:100lvh;z-index:0;display:block;pointer-events:none;opacity:0;transition:opacity 1.2s}' +
    'html.nv #nvcv{opacity:1}' +
    '#nvveil{position:fixed;left:0;top:0;width:100%;height:100vh;height:100lvh;z-index:0;pointer-events:none;background:linear-gradient(180deg,rgba(7,20,43,.12),rgba(7,20,43,.32))}' +
    'html.nv #app{position:relative;z-index:1}' +
    /* fonds clairs -> verre sombre */
    'html.nv .top,html.nv .top.sc{background:rgba(7,20,43,.72)!important;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.1)!important;box-shadow:none!important}' +
    'html.nv .logo b{color:#fff}html.nv .logo i{color:#FF9A3C}' +
    'html.nv .ib{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.22);color:#fff}' +
    'html.nv .hero{background:transparent}' +
    'html.nv .card,html.nv .why div,html.nv details,html.nv .spec,html.nv .steps div,html.nv .empty,html.nv .tem,html.nv .chip,html.nv select,html.nv .tnav button,html.nv .sbox .in,html.nv .lang button,html.nv .th button,html.nv .lf-find,html.nv .mo-st>div{background:rgba(11,26,56,.55)!important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(10px);border-color:rgba(255,255,255,.14)!important;color:#fff}' +
    'html.nv #app .sec>.grid>.card{background:rgba(11,26,56,.6)!important;color:#fff;box-shadow:none}html.nv .card h3,html.nv .card .pr{color:#fff}html.nv .card .pr{color:#FF9A3C}' +
    'html.nv .lf-cb,html.nv .doc,html.nv .pd .i,html.nv .lf-find{background:rgba(11,26,56,.62)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.12);border-radius:16px;color:#fff}' +
    'html.nv .doc,html.nv .pd .i{padding:22px 20px 24px}html.nv .lf-find,html.nv .lf-cb{padding:20px}' +
    'html.nv .lf-cb input{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.22);color:#fff}html.nv .lf-cb input::placeholder{color:#9fb0cb}html.nv .lf-cbm{color:#FF9A3C}html.nv .lf-find .lf-map{border-color:rgba(255,255,255,.14);background:rgba(255,255,255,.06)}' +
    'html.nv .mo-l,html.nv .lf-find a:not(.btn){color:#fff}html.nv .mo-l{border-bottom-color:#FF6B2C}' +
    'html.nv .chip.on,html.nv .lang button.on{background:linear-gradient(135deg,#FF9A3C,#FF4D1F)!important;border-color:transparent!important;color:#fff}' +
    'html.nv .btn.cu{background:linear-gradient(135deg,#FF9A3C,#FF4D1F)!important;color:#fff!important}' +
    'html.nv .btn.cu:hover{box-shadow:0 12px 34px rgba(255,107,44,.4)}' +
    'html.nv .btn.line.dk{border-color:rgba(255,255,255,.5);color:#fff}' +
    'html.nv .badge,html.nv .steps b,html.nv .hero .k{color:#FF9A3C}' +
    'html.nv .sub,html.nv .why span,html.nv details p,html.nv .card .sp,html.nv .note,html.nv .back,html.nv .spec span:first-child,html.nv .load,html.nv .res small,html.nv .empty{color:#b9c4da}' +
    'html.nv .desc,html.nv .doc p,html.nv .doc li,html.nv .steps span,html.nv .tem blockquote,html.nv .lst{color:#dbe3f1}' +
    'html.nv .tem .who{color:#fff}' +
    'html.nv .spec div{border-bottom-color:rgba(255,255,255,.1)}' +
    'html.nv .sec h2,html.nv .pt,html.nv .doc h1,html.nv .doc h2,html.nv .pd h1,html.nv .hero h1,html.nv .mo-big,html.nv .mo-f h2{text-shadow:0 2px 20px rgba(7,20,43,.65)}' +
    'html.nv .mo-big,html.nv .mo-st b,html.nv .mo-x h2{color:#fff}' +
    'html.nv .mo-k{color:#FF9A3C}html.nv .mo-big em{color:#FF9A3C}' +
    'html.nv .mo-st,html.nv .mo-st>div{border-color:rgba(255,255,255,.14)}' +
    'html.nv .mo-st span,html.nv .mo-x p{color:#b9c4da}' +
    'html.nv .foot{background:rgba(7,20,43,.82);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}' +
    'html.nv .foot .c{border-top-color:rgba(255,255,255,.12)}' +
    'html.nv .band,html.nv .lf-3d,html.nv .lf-strip{background:rgba(11,26,56,.7)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}' +
    'html.nv .lf-3d{background:radial-gradient(90% 70% at 50% 38%,rgba(42,74,117,.55),rgba(11,26,56,.7))!important}' +
    'html.nv .res,html.nv .sbox input{color:#fff}html.nv .sbox input{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.2)}' +
    'html.nv .card .ph,html.nv .main{background:rgba(255,255,255,.06)}' +
    'html.nv .tem .av{background:#FF6B2C}' +
    'html.nv select{background-image:none}html.nv option{color:#07142B}' +
    '@media(prefers-reduced-motion:reduce){#nvcv{transition:none}}';

  function hasGL() { try { var c = D.createElement('canvas'); return !!(c.getContext('webgl') || c.getContext('experimental-webgl')); } catch (e) { return false; } }
  function off() { H.classList.remove('nv'); var a = D.getElementById('nvcv'), b = D.getElementById('nvveil'); if (a) a.remove(); if (b) b.remove(); }

  function start() {
    if (!hasGL()) return;
    var st = D.createElement('style'); st.textContent = CSS; D.head.appendChild(st);
    var cv = D.createElement('canvas'); cv.id = 'nvcv'; cv.setAttribute('aria-hidden', 'true');
    var vl = D.createElement('div'); vl.id = 'nvveil';
    D.body.insertBefore(vl, D.body.firstChild); D.body.insertBefore(cv, D.body.firstChild);
    H.classList.add('nv');
    if (window.THREE) return scene(cv);
    var s = D.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = function () { scene(cv); }; s.onerror = off; D.head.appendChild(s);
  }

  function scene(cv) {
    var T3 = window.THREE, ren;
    if (!T3) return off();
    try { ren = new T3.WebGLRenderer({ canvas: cv, antialias: true }); } catch (e) { return off(); }
    var small = Math.min(innerWidth, innerHeight) < 700;
    ren.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
    ren.shadowMap.enabled = !small; ren.shadowMap.type = T3.PCFSoftShadowMap;
    var sc = new T3.Scene(); sc.background = new T3.Color(0x07142b); sc.fog = new T3.Fog(0x07142b, 14, 36);
    var cam = new T3.PerspectiveCamera(40, 1, .1, 100);
    sc.add(new T3.AmbientLight(0xffffff, .5));
    var d = new T3.DirectionalLight(0xffe2b0, 1.15); d.position.set(6, 11, 7); d.castShadow = true; d.shadow.mapSize.set(1024, 1024);
    var sh = d.shadow.camera; sh.left = -16; sh.right = 16; sh.top = 16; sh.bottom = -16; sh.far = 40; sc.add(d);
    var rim = new T3.DirectionalLight(0x2ec4f1, .9); rim.position.set(-9, 5, -7); sc.add(rim);
    var gr = new T3.Mesh(new T3.PlaneGeometry(140, 140), new T3.MeshStandardMaterial({ color: 0x0c2147, roughness: .9 })); gr.rotation.x = -Math.PI / 2; gr.receiveShadow = true; sc.add(gr);
    var gh = new T3.GridHelper(140, 70, 0x1d3a70, 0x12274d); gh.position.y = .01; sc.add(gh);
    function bx(w, h, dd, c, x, y, z, o) { o = o || {}; var m = new T3.Mesh(new T3.BoxGeometry(w, h, dd), o.mat || new T3.MeshStandardMaterial({ color: c, roughness: o.r == null ? .6 : o.r, metalness: o.m || 0, emissive: o.e || 0, emissiveIntensity: o.ei || 1 })); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; return m; }
    var cMat = new T3.MeshStandardMaterial({ color: 0xff6b2c, roughness: .45, metalness: .5 }), rMat = cMat.clone(); rMat.color.multiplyScalar(.72);
    var C = new T3.Group(); C.add(bx(4, 1.5, 1.6, 0, 0, .75, 0, { mat: cMat }));
    for (var i = 0; i < 16; i++) { var x = -1.875 + i * .25;[-1, 1].forEach(function (s) { C.add(bx(.06, 1.36, .05, 0, x, .75, s * .81, { mat: rMat })); }); }
    C.add(bx(1.3, .6, .04, 0x222222, 0, .8, .84, { e: 0xffc880, ei: .9 }));
    [-1, 1].forEach(function (a) { C.add(bx(.04, 1.3, .7, 0, 2.02, .75, a * .38, { mat: rMat })); [-1, 1].forEach(function (b) { C.add(bx(.1, 1.52, .1, 0xffb36b, a * 2, .75, b * .8, { m: .8, r: .3 })); }); });
    var Hh = new T3.Group();
    Hh.add(bx(3.6, 1.3, 1.7, 0xf1eee8, 0, 1.15, 0, { r: .5 })); Hh.add(bx(3.9, .12, 1.95, 0x1b1b1f, 0, 1.86, 0, { r: .4 }));
    Hh.add(bx(1.5, .7, .04, 0x222222, -.5, 1.25, .87, { e: 0xffc880, ei: .9 })); Hh.add(bx(.5, 1, .04, 0x8a5a34, 1.1, 1.05, .87, { r: .8 }));
    Hh.add(bx(.8, .08, .08, 0x1b1b1f, -2.2, .6, 0, { m: .6 }));
    [-1, 1].forEach(function (s) { var w = new T3.Mesh(new T3.CylinderGeometry(.3, .3, .2, 24), new T3.MeshStandardMaterial({ color: 0x111111, roughness: .8 })); w.rotation.x = Math.PI / 2; w.position.set(.3, .3, s * .85); w.castShadow = true; Hh.add(w); });
    function mod(c) { var g = new T3.Group(); g.add(bx(1.7, 1.7, 1.7, c, 0, 0, 0, { r: .8 })); g.add(bx(1.74, .1, 1.74, 0x1a1a1d, 0, -.85, 0, { m: .5 })); g.add(bx(1, .75, .04, 0x222222, 0, .1, .87, { e: 0xffc880, ei: .8 })); return g; }
    var M1 = mod(0xffb36b), M2 = mod(0x2ec4f1), M3 = mod(0xffffff);
    var O = [[C, [[-1, 0, -2, .5], [0, 0, 0, .6], [-20, 0, -6, 0], [-20, 0, -6, 0], [-4.4, 0, -1.2, .3]]],
      [Hh, [[2.6, 0, 1.6, -.35], [20, 0, 5, 0], [0, 0, 0, -.55], [20, 0, 5, 0], [-.4, 0, 2.2, -.15]]],
      [M1, [[4.5, 2.4, -3, .5], [20, .85, -4, 0], [-20, .85, -4, 0], [-.9, .85, 0, 0], [-2.2, .85, -2.8, 0]]],
      [M2, [[6.4, .9, -1.5, .2], [20, .85, -4, 0], [-20, .85, -4, 0], [.9, .85, 0, 0], [-.4, .85, -2.8, 0]]],
      [M3, [[3, 3.4, -1.2, .8], [20, .85, -4, 0], [-20, .85, -4, 0], [0, 2.55, 0, 0], [-1.3, 2.55, -2.8, 0]]]];
    O.forEach(function (o) { sc.add(o[0]); });
    var CP = [[0, 3, 11], [3.5, 2, 5.5], [-3, 2.2, 6], [3, 3.2, 6.5], [1, 4.5, 14]], CT = [[-2.5, 1.4, 0], [-2.2, .8, 0], [3.4, 1, 0], [-2.4, 1.4, 0], [2.4, 1, 0]];
    function sm(t) { return t * t * (3 - 2 * t); }
    function lk(k, s) { var i = Math.min(Math.floor(s), 3), f = sm(s - i), a = k[i], b = k[i + 1]; return a.map(function (v, j) { return v + (b[j] - v) * f; }); }
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
      var mob = cam.aspect < .85, p = lk(CP, cur), q = lk(CT, cur), k = mob ? 1.9 : 1.22, tx = mob ? q[0] * .15 : q[0], ty = mob ? q[1] - 1.7 : q[1];
      cam.position.set(tx + (p[0] - q[0]) * k + mx * .8, p[1] * (mob ? 1.1 : 1) + my * -.5, p[2] * k); cam.lookAt(tx, ty, q[2]);
      O.forEach(function (o, i) { var v = lk(o[1], cur); o[0].position.set(v[0], v[1] + Math.sin(t * 1.2 + i) * .05, v[2]); o[0].rotation.y = v[3] + Math.sin(t * .4 + i) * .04 + (cur < .9 ? t * .12 * (1 - cur) : 0); });
      ren.render(sc, cam);
    }
    window.__NEO = { set: function (v) { forced = v; cur = v; } };
    requestAnimationFrame(loop);
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
