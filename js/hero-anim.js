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
    '.sh-c{position:absolute;left:0;top:0;width:100%;height:100%;display:block;-webkit-mask-image:linear-gradient(180deg,transparent,#000 9%,#000 91%,transparent);mask-image:linear-gradient(180deg,transparent,#000 9%,#000 91%,transparent)}' +
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
/* hero3d.js - en-tete : une grue leve une maison mobile, la pose sur un camion, le camion part en livraison (3D, boucle) */
(function () {
  'use strict';
  var W = window, D = document, T = null, styled = false, pend = 0;
  var LOOP = 21;
  var TX = {
    fr: { c: [
      { k: 'Chargement', h: 'Levée avec soin.', p: 'Chaque maison est soulevée par une grue et posée sur le camion par des professionnels.' },
      { k: 'Transport', h: 'En route vers chez vous.', p: 'Un transporteur spécialisé l’achemine jusqu’à votre terrain.' }] },
    en: { c: [
      { k: 'Loading', h: 'Lifted with care.', p: 'Every home is lifted by crane and set on the truck by professionals.' },
      { k: 'Transport', h: 'On its way to you.', p: 'A specialised carrier brings it right to your land.' }] }
  };
  var CSS = '.hero.hh-on{position:relative;background:#07142B;min-height:0!important;padding:0!important;height:auto!important;overflow:visible!important}' +
    '.hero.hh-on:after{content:"";display:block;height:300vh}' +
    '.hero.hh-on .mh,.hero.hh-on .im,.hero.hh-on .ha{display:none!important}' +
    '.hero .hh{position:sticky;top:var(--hy,86px);height:calc(100vh - var(--hy,86px));height:calc(100svh - var(--hy,86px));width:100%;margin-bottom:calc(var(--hy,86px) - 100vh);margin-bottom:calc(var(--hy,86px) - 100svh);z-index:0;overflow:hidden}' +
    '.hero .hh canvas{position:absolute;left:0;top:0;width:100%;height:100%;display:block}' +
    '.hero .hh .hf{display:none}' +
    '.hero .hh:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(7,20,43,.80) 0%,rgba(7,20,43,.50) 38%,rgba(7,20,43,0) 70%),linear-gradient(180deg,rgba(7,20,43,.45),rgba(7,20,43,0) 24%,rgba(7,20,43,0) 66%,rgba(7,20,43,.7));box-shadow:inset 0 0 160px rgba(0,0,0,.45)}' +
    '.hero.hh-on>.wrap{position:sticky!important;top:var(--hy,86px);min-height:calc(100vh - var(--hy,86px));min-height:calc(100svh - var(--hy,86px));z-index:1;display:flex;flex-direction:column;justify-content:center;box-sizing:border-box;padding-top:24px!important;padding-bottom:40px!important}' +
    '.hero .hc{position:absolute;left:max(20px,5vw);right:max(20px,5vw);bottom:calc(40px + env(safe-area-inset-bottom,0px));max-width:560px;opacity:0;color:#fff;z-index:2;pointer-events:none}' +
    '.hero .hc b{display:block;font:600 12px/1.2 Poppins,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#FF8A4C;margin-bottom:10px}' +
    '.hero .hc h3{margin:0 0 8px;font:600 clamp(26px,4.4vw,46px)/1.08 Poppins,system-ui,sans-serif;color:#fff;text-wrap:balance}' +
    '.hero .hc p{margin:0;font:400 clamp(15px,1.7vw,18px)/1.55 Poppins,system-ui,sans-serif;color:rgba(255,255,255,.85)}' +
    '.hero .hp{position:absolute;right:max(14px,2.5vw);top:50%;width:3px;height:96px;margin-top:-48px;background:rgba(255,255,255,.18);border-radius:3px;z-index:2}' +
    '.hero .hp i{display:block;width:100%;height:0;background:#FF6B2C;border-radius:3px}' +
    '@media(max-width:1000px){.hero.hh-on:after{height:260vh}.hero .hh:after{background:linear-gradient(180deg,rgba(7,20,43,.82) 0%,rgba(7,20,43,.6) 44%,rgba(7,20,43,0) 66%,rgba(7,20,43,.7))}.hero .hc{right:78px}}';

  function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function sm(x) { x = cl(x); return x * x * (3 - 2 * x); }
  function sg(t, a, b) { return cl((t - a) / (b - a)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function init(hero, wrap) {
    var cv = wrap.querySelector('canvas'), fade = wrap.querySelector('.hf'), ren, mob = W.innerWidth < 800;
    try { ren = new T.WebGLRenderer({ canvas: cv, antialias: !mob, alpha: false, powerPreference: 'high-performance' }); } catch (e) { wrap.remove(); hero.classList.remove('hh-on'); return; }
    ren.shadowMap.enabled = true; ren.shadowMap.type = T.PCFSoftShadowMap;
    ren.toneMapping = T.ACESFilmicToneMapping; ren.toneMappingExposure = 1.0;
    var scene = new T.Scene(), cam = new T.PerspectiveCamera(32, 1, .5, 900);
    function ctex(w, h, fn, rx, ry) { var c = D.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); var t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.anisotropy = 4; if (rx) t.repeat.set(rx, ry || 1); return t; }
    function std(o) { return new T.MeshStandardMaterial(o); }
    function put(m, x, y, z, par, cast) { m.position.set(x, y, z); m.castShadow = cast !== false; m.receiveShadow = true; if (par) par.add(m); return m; }
    function bx(w, h, d, mat, x, y, z, par, cast) { return put(new T.Mesh(new T.BoxGeometry(w, h, d), mat), x, y, z, par, cast); }
    function cy(r, h, mat, x, y, z, par, rx, rz) { var g = new T.CylinderGeometry(r, r, h, 16); if (rx) g.rotateX(Math.PI / 2); if (rz) g.rotateZ(Math.PI / 2); return put(new T.Mesh(g, mat), x, y, z, par); }

    /* ---------- ciel, lumiere, environnement ---------- */
    var skyTex = ctex(8, 512, function (g, w, h) {
      var gr = g.createLinearGradient(0, 0, 0, h);
      gr.addColorStop(0, '#0a1a3c'); gr.addColorStop(.28, '#1b3f7a'); gr.addColorStop(.42, '#6f86b4'); gr.addColorStop(.475, '#f0aa78'); gr.addColorStop(.5, '#ffd9a8'); gr.addColorStop(.55, '#9a7660'); gr.addColorStop(1, '#251f2a');
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
    }); skyTex.repeat.set(1, 1); skyTex.wrapS = skyTex.wrapT = T.ClampToEdgeWrapping;
    var skyMat = new T.MeshBasicMaterial({ map: skyTex, side: T.BackSide, fog: false, depthWrite: false });
    var sky = new T.Mesh(new T.SphereGeometry(500, 24, 16), skyMat); scene.add(sky);
    try {
      var es = new T.Scene(); es.add(new T.Mesh(new T.SphereGeometry(100, 16, 12), skyMat.clone()));
      var pm = new T.PMREMGenerator(ren); scene.environment = pm.fromScene(es, .03).texture; pm.dispose();
    } catch (e) { }
    scene.fog = new T.Fog(0x59607a, 90, 420);
    scene.add(new T.HemisphereLight(0x9fb8e8, 0x3a2f2a, .75));
    var sun = new T.DirectionalLight(0xffc88a, 2.3); sun.position.set(-34, 15, 14); sun.target.position.set(4, 0, 0);
    sun.castShadow = true; sun.shadow.mapSize.set(mob ? 1024 : 2048, mob ? 1024 : 2048); sun.shadow.bias = -.0004; sun.shadow.normalBias = .03;
    var sc = sun.shadow.camera; sc.left = -34; sc.right = 34; sc.top = 26; sc.bottom = -26; sc.near = 5; sc.far = 120;
    scene.add(sun); scene.add(sun.target);

    /* ---------- sol ---------- */
    var grav = ctex(128, 128, function (g, w, h) {
      g.fillStyle = '#7b6f60'; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 1800; i++) { var v = 90 + Math.random() * 90 | 0; g.fillStyle = 'rgba(' + v + ',' + (v - 8) + ',' + (v - 20) + ',.55)'; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); }
    }, 90, 90);
    var ground = new T.Mesh(new T.PlaneGeometry(900, 900), std({ map: grav, roughness: 1, metalness: 0 })); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
    var asp = ctex(64, 256, function (g, w, h) { g.fillStyle = '#34363b'; g.fillRect(0, 0, w, h); for (var i = 0; i < 900; i++) { var v = 40 + Math.random() * 40 | 0; g.fillStyle = 'rgba(' + v + ',' + v + ',' + (v + 4) + ',.6)'; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); } }, 1, 1);
    var road = new T.Mesh(new T.PlaneGeometry(400, 10), std({ map: asp, roughness: .95 })); road.rotation.x = -Math.PI / 2; road.position.set(30, .02, 5.2); road.receiveShadow = true; scene.add(road); asp.repeat.set(60, 1);
    var pad = new T.Mesh(new T.PlaneGeometry(16, 9), std({ color: 0x8d8b86, roughness: .95 })); pad.rotation.x = -Math.PI / 2; pad.position.set(.5, .03, -6.5); pad.receiveShadow = true; scene.add(pad);

    /* ---------- maison mobile ---------- */
    function house(sid, roofc) {
      var g = new T.Group();
      var wall = ctex(512, 256, function (c, w, h) {
        c.fillStyle = sid; c.fillRect(0, 0, w, h);
        for (var y = 0; y < h; y += 14) { c.fillStyle = 'rgba(0,0,0,.22)'; c.fillRect(0, y, w, 3); c.fillStyle = 'rgba(255,255,255,.14)'; c.fillRect(0, y + 3, w, 2); }
        for (var i = 0; i < 700; i++) { c.fillStyle = 'rgba(0,0,0,' + (Math.random() * .05) + ')'; c.fillRect(Math.random() * w, Math.random() * h, 3, 2); }
      }, 3, 1);
      bx(12, 2.7, 4, std({ map: wall, roughness: .85 }), 0, .5 + 1.35, 0, g);
      bx(12.15, .5, 4.15, std({ color: 0x20252c, roughness: .9 }), 0, .25, 0, g);
      var rs = new T.Shape(); rs.moveTo(-2.45, 0); rs.lineTo(2.45, 0); rs.lineTo(0, 1.25); rs.closePath();
      var rgeo = new T.ExtrudeGeometry(rs, { depth: 12.9, bevelEnabled: false }); rgeo.rotateY(-Math.PI / 2); rgeo.translate(6.45, 0, 0);
      var roof = new T.Mesh(rgeo, std({ color: roofc, roughness: .45, metalness: .5 })); put(roof, 0, 3.2, 0, g);
      bx(13, .1, .12, std({ color: 0xaab1bb, metalness: .8, roughness: .3 }), 0, 3.27, 2.4, g); bx(13, .1, .12, std({ color: 0xaab1bb, metalness: .8, roughness: .3 }), 0, 3.27, -2.4, g);
      var glass = std({ color: 0x0b1626, metalness: .95, roughness: .06, envMapIntensity: 1.6 }), frame = std({ color: 0xf2f1ec, roughness: .6 });
      [1, -1].forEach(function (s) {
        function win(x, y, w, h) { bx(w + .22, h + .22, .12, frame, x, y, s * 2.02, g); bx(w, h, .14, glass, x, y, s * 2.05, g, false); bx(.06, h, .16, frame, x, y, s * 2.06, g, false); }
        win(-4.2, 2.3, 1.5, 1.2); win(-1.7, 2.3, 1.5, 1.2); win(4.5, 2.3, 1.5, 1.2);
        bx(1.1, 2.1, .12, std({ color: s > 0 ? 0x2c3a4c : 0x3a3f46, roughness: .6 }), 1.2, 1.55, s * 2.04, g); bx(.5, .9, .14, glass, 1.2, 2.1, s * 2.07, g, false); bx(.07, .18, .16, std({ color: 0xcfa85a, metalness: .9, roughness: .3 }), .8, 1.5, s * 2.1, g, false);
      });
      bx(.12, 1.2, 1.2, glass, 6.03, 2.3, 0, g, false); bx(.12, 1.2, 1.2, glass, -6.03, 2.3, 0, g, false);
      bx(.14, .35, .2, std({ color: 0x20252c }), 5.4, 3.0, 2.12, g); bx(.1, 2.3, .1, std({ color: 0x9aa0a8, metalness: .6 }), 5.7, 1.75, 2.12, g);
      var ch = cy(.22, 1, std({ color: 0x20252c, roughness: .6, metalness: .4 }), -3.2, 4.3, -.3, g); ch.castShadow = true;
      g.userData.pts = [[-5.1, 3.4, 1.8], [5.1, 3.4, 1.8], [-5.1, 3.4, -1.8], [5.1, 3.4, -1.8]];
      return g;
    }
    var HM = house('#d8cdb4', 0x39414d); scene.add(HM);
    var bgh = [[-16, -22, '#e9e7e1', 0x2b323b, .1], [12, -24, '#b7bfb4', 0x3b2e2a, -.08], [32, -21, '#cdbf9f', 0x333a44, .05]];
    bgh.forEach(function (b) { var h2 = house(b[2], b[3]); h2.position.set(b[0], 0, b[1]); h2.rotation.y = b[4]; scene.add(h2); });

    /* ---------- grue ---------- */
    var yel = std({ color: 0xf0b823, roughness: .5, metalness: .3 }), blk = std({ color: 0x15171b, roughness: .7 }), gry = std({ color: 0x3a3e45, roughness: .6, metalness: .4 }), chr = std({ color: 0xc8cdd4, roughness: .2, metalness: .95 });
    var tireM = std({ color: 0x0f0f11, roughness: .95 }), hubM = std({ color: 0x8c9199, roughness: .4, metalness: .8 });
    function wheel(r, wd, x, y, z, par) { var g = new T.Group(); g.position.set(x, y, z); var t = new T.Mesh(new T.CylinderGeometry(r, r, wd, 20), tireM); t.rotation.x = Math.PI / 2; t.castShadow = true; g.add(t); var h = new T.Mesh(new T.CylinderGeometry(r * .55, r * .55, wd + .03, 14), hubM); h.rotation.x = Math.PI / 2; g.add(h); var nut = new T.Mesh(new T.CylinderGeometry(r * .18, r * .18, wd + .06, 8), blk); nut.rotation.x = Math.PI / 2; g.add(nut); par.add(g); return g; }
    var C0 = new T.Vector3(-8, 0, -6.5), crane = new T.Group(); crane.position.copy(C0); scene.add(crane);
    bx(9.5, .55, 2.5, yel, 0, 1.05, 0, crane); bx(9.5, .12, 2.6, blk, 0, .72, 0, crane);
    bx(1.9, 2.3, 2.5, yel, 3.6, 2.35, 0, crane); bx(.1, 1.0, 2.2, std({ color: 0x0b1626, metalness: .9, roughness: .08 }), 4.58, 2.8, 0, crane); bx(.1, .9, 2.4, blk, 4.6, 1.5, 0, crane);
    [-3.6, -2.4, 2.4, 3.6].forEach(function (x) { wheel(.68, .5, x, .68, 1.2, crane); wheel(.68, .5, x, .68, -1.2, crane); });
    var outs = [[-3.2, 1], [3.2, 1], [-3.2, -1], [3.2, -1]];
    outs.forEach(function (o) { bx(.5, .4, 3.2, gry, o[0], .95, o[1] * 1.9, crane); cy(.12, 1.1, chr, o[0], .5, o[1] * 3.3, crane); cy(.42, .14, blk, o[0], .07, o[1] * 3.3, crane); });
    var turret = new T.Group(); turret.position.set(-1.2, 1.35, 0); crane.add(turret);
    cy(1.2, .25, gry, 0, 0, 0, turret);
    bx(4.4, 1.5, 2.6, yel, 0, 1.0, 0, turret); bx(1.7, 1.6, 2.7, gry, -2.7, 1.0, 0, turret); bx(1.6, 1.4, 1.4, yel, 1.4, 1.1, 1.65, turret); bx(.1, .9, 1.2, std({ color: 0x0b1626, metalness: .9, roughness: .08 }), 2.22, 1.3, 1.65, turret);
    var piv = new T.Group(); piv.position.set(1.7, 1.55, 0); turret.add(piv);
    var segs = [], sw = [1.05, .9, .76, .62];
    for (var si = 0; si < 4; si++) { var m = bx(1, sw[si], sw[si] * 1.1, si % 2 ? std({ color: 0xe0a51d, roughness: .5, metalness: .3 }) : yel, 0, 0, 0, piv); segs.push(m); }
    var head = bx(.5, .9, .9, blk, 0, 0, 0, piv);
    var ropeM = std({ color: 0x15171b, roughness: .6 }), cable = new T.Mesh(new T.CylinderGeometry(1, 1, 1, 6), ropeM); cable.castShadow = true; scene.add(cable);
    var block = new T.Group(); scene.add(block); bx(.6, .9, .45, std({ color: 0xcf2f1d, roughness: .5 }), 0, 0, 0, block); bx(.2, .5, .2, blk, 0, -.7, 0, block);
    var slings = [], si2; for (si2 = 0; si2 < 4; si2++) { var sl = new T.Mesh(new T.CylinderGeometry(1, 1, 1, 5), std({ color: 0xff7a1a, roughness: .6 })); sl.castShadow = true; scene.add(sl); slings.push(sl); }
    var UP = new T.Vector3(0, 1, 0), v1 = new T.Vector3(), v2 = new T.Vector3(), v3 = new T.Vector3();
    function link(m, a, b, r) { v1.subVectors(b, a); var l = v1.length(); m.position.copy(a).addScaledVector(v1, .5); m.quaternion.setFromUnitVectors(UP, v1.normalize()); m.scale.set(r, Math.max(l, .001), r); }

    /* ---------- camion ---------- */
    var truck = new T.Group(); scene.add(truck);
    var blue = std({ color: 0x1b3a78, roughness: .35, metalness: .4 }), orng = std({ color: 0xff6b2c, roughness: .5 }), deckM = std({ color: 0x23272f, roughness: .6, metalness: .3 });
    bx(14.5, .32, 2.55, deckM, -.5, .95, 0, truck); bx(14.5, .12, .14, orng, -.5, .97, 1.3, truck); bx(14.5, .12, .14, orng, -.5, .97, -1.3, truck);
    bx(2.4, .6, 2.4, deckM, 7.8, 1.2, 0, truck); bx(12, .38, .22, gry, -.6, .62, 1.0, truck); bx(12, .38, .22, gry, -.6, .62, -1.0, truck);
    var tw = []; [-4.6, -5.8, -7.0].forEach(function (x) { tw.push(wheel(.52, .4, x, .52, 1.1, truck), wheel(.52, .4, x, .52, -1.1, truck)); bx(1.0, .18, .55, blk, x, 1.1, 1.18, truck); bx(1.0, .18, .55, blk, x, 1.1, -1.18, truck); });
    bx(.12, .36, 2.5, std({ color: 0xcc1111, emissive: 0x330000 }), -7.3, .95, 0, truck, false);
    bx(10, .34, 1.0, gry, 11, .85, 0, truck);
    [[12.0, 0.62], [8.6, .62], [7.3, .62]].forEach(function (a) { tw.push(wheel(a[1], .45, a[0], a[1], 1.15, truck), wheel(a[1], .45, a[0], a[1], -1.15, truck)); bx(1.35, .2, .6, blk, a[0], a[1] * 2 + .08, 1.2, truck); bx(1.35, .2, .6, blk, a[0], a[1] * 2 + .08, -1.2, truck); });
    bx(2.5, 2.7, 2.5, blue, 11.0, 2.3, 0, truck); bx(1.6, 2.2, 2.45, blue, 9.4, 2.55, 0, truck); bx(.9, .5, 2.2, blue, 10.8, 3.9, 0, truck);
    bx(.1, 1.15, 2.2, std({ color: 0x0b1626, metalness: .95, roughness: .06, envMapIntensity: 1.5 }), 12.27, 3.0, 0, truck, false);
    bx(1.3, .9, .08, std({ color: 0x0b1626, metalness: .95, roughness: .06, envMapIntensity: 1.5 }), 11.2, 3.1, 1.26, truck, false); bx(1.3, .9, .08, std({ color: 0x0b1626, metalness: .95, roughness: .06, envMapIntensity: 1.5 }), 11.2, 3.1, -1.26, truck, false);
    bx(.12, .9, 1.7, chr, 12.31, 1.6, 0, truck); for (var gi = 0; gi < 5; gi++) bx(.14, .05, 1.65, blk, 12.33, 1.3 + gi * .17, 0, truck, false);
    bx(.3, .45, 2.7, std({ color: 0x20242a, roughness: .5 }), 12.3, .95, 0, truck);
    var hl = std({ color: 0xfff1c8, emissive: 0xfff1c8, emissiveIntensity: 1.4 }); bx(.1, .3, .5, hl, 12.31, 1.45, 1.0, truck, false); bx(.1, .3, .5, hl, 12.31, 1.45, -1.0, truck, false);
    bx(.7, .1, 1.0, std({ color: 0xff6b2c }), 12.0, 4.25, 0, truck);
    [1.45, -1.45].forEach(function (z) { cy(.4, 1.5, chr, 9.6, 1.1, z, truck, false, true); cy(.09, 2.4, chr, 8.9, 3.4, z * .9, truck); bx(.12, .3, .1, chr, 12.1, 3.0, z * 1.4, truck); });
    var plate = ctex(256, 64, function (c, w, h) { c.fillStyle = '#1b3a78'; c.fillRect(0, 0, w, h); c.fillStyle = '#fff'; c.font = '600 30px Poppins,Arial,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('AURIAM', 78, 34); c.fillStyle = '#ff8a4c'; c.fillText('HOME', 192, 34); });
    var pl1 = new T.Mesh(new T.PlaneGeometry(1.7, .43), new T.MeshBasicMaterial({ map: plate })); pl1.position.set(11.0, 2.2, 1.27); truck.add(pl1);
    var pl2 = pl1.clone(); pl2.position.z = -1.27; pl2.rotation.y = Math.PI; truck.add(pl2);
    var yw = ctex(256, 64, function (c, w, h) { c.fillStyle = '#f3c614'; c.fillRect(0, 0, w, h); c.strokeStyle = '#111'; c.lineWidth = 5; c.strokeRect(4, 4, w - 8, h - 8); c.fillStyle = '#111'; c.font = '800 24px Arial,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('CONVOI EXCEPTIONNEL', w / 2, h / 2 + 2); });
    var ys1 = new T.Mesh(new T.PlaneGeometry(2.3, .58), new T.MeshBasicMaterial({ map: yw })); ys1.position.set(-7.4, 1.6, 0); ys1.rotation.y = -Math.PI / 2; truck.add(ys1);
    var ys2 = new T.Mesh(new T.PlaneGeometry(2.0, .5), new T.MeshBasicMaterial({ map: yw })); ys2.position.set(12.38, 2.2, 0); ys2.rotation.y = Math.PI / 2; truck.add(ys2);
    var amb = new T.MeshBasicMaterial({ color: 0xffa21a }); var bcs = [];
    [[12.0, 4.4, 0], [-7.4, 2.2, 1.2], [-7.4, 2.2, -1.2]].forEach(function (p) { var b = new T.Mesh(new T.SphereGeometry(.17, 10, 8), amb); b.position.set(p[0], p[1], p[2]); truck.add(b); });
    [[-7.4, 2.0], [-7.4, -2.0]].forEach(function () { });
    bx(.4, 2.4, .4, std({ color: 0x15171b }), -7.4, 1.4, 1.2, truck); bx(.4, 2.4, .4, std({ color: 0x15171b }), -7.4, 1.4, -1.2, truck);
    /* cones */
    for (var ci = 0; ci < 6; ci++) { var cg = new T.Group(); var cn = new T.Mesh(new T.ConeGeometry(.22, .7, 12), std({ color: 0xff5a0a, roughness: .6 })); cn.position.y = .35; cn.castShadow = true; cg.add(cn); var bs = bx(.5, .05, .5, std({ color: 0x15171b }), 0, .03, 0, cg); var bnd = new T.Mesh(new T.CylinderGeometry(.1, .14, .12, 10), std({ color: 0xffffff })); bnd.position.y = .38; cg.add(bnd); cg.position.set(-4 + ci * 3.8, 0, 1.4 + (ci % 2) * 2.0); scene.add(cg); }
    /* arbres et collines */
    var tr = [[-30, -34], [-18, -38], [26, -36], [40, -30], [-44, -16], [58, -22], [4, -46], [-56, -32], [74, -36], [20, -52], [-8, -60], [48, -56]];
    tr.forEach(function (q, k) { var s = .75 + (k % 3) * .25, g = new T.Group(); var a = new T.Mesh(new T.CylinderGeometry(.3, .4, 2.4, 8), std({ color: 0x4b3424 })); a.position.y = 1.2; g.add(a); var c1 = new T.Mesh(new T.ConeGeometry(2.4, 5.5, 9), std({ color: 0x16372c, roughness: 1 })); c1.position.y = 4.6; c1.castShadow = true; g.add(c1); var c2 = new T.Mesh(new T.ConeGeometry(1.8, 4.2, 9), std({ color: 0x1c4536, roughness: 1 })); c2.position.y = 7.4; c2.castShadow = true; g.add(c2); g.scale.setScalar(s); g.position.set(q[0], 0, q[1]); scene.add(g); });
    [[-80, -210, 150, 24], [90, -230, 190, 30], [-230, -170, 110, 18]].forEach(function (h) { var m = new T.Mesh(new T.SphereGeometry(1, 20, 10), std({ color: 0x1a2634, roughness: 1 })); m.scale.set(h[2], h[3], 40); m.position.set(h[0], -4, h[1]); scene.add(m); });
    /* poussiere */
    var NP = 70, pp = new Float32Array(NP * 3), pg = new T.BufferGeometry(); pg.setAttribute('position', new T.BufferAttribute(pp, 3));
    var dust = new T.Points(pg, new T.PointsMaterial({ color: 0xcdb99b, size: 7, sizeAttenuation: false, transparent: true, opacity: .35, depthWrite: false })); dust.frustumCulled = false; scene.add(dust);
    var dr = []; for (var di = 0; di < NP; di++) dr.push([Math.random() - .5, Math.random(), Math.random() - .5]);

    /* ---------- animation ---------- */
    var TR = { x: .5, z: 5.2 }, H0 = new T.Vector3(.5, .05, -6.5), tip = new T.Vector3(), blk3 = new T.Vector3(), tmp = new T.Vector3(), look = new T.Vector3(), right = new T.Vector3(), foc = new T.Vector3();
    function dist(s) { return s < 0 ? 0 : s < 4 ? s * s : 16 + 8 * (s - 4); }
    function pose(t) {
      var lift = sm(sg(t, 2.2, 5.4)), swing = sm(sg(t, 5.8, 9.2)), low = sm(sg(t, 9.6, 12.2));
      var hx = H0.x, hz = lerp(H0.z, TR.z, swing), hy = lerp(.05, 3.9, lift); hy = lerp(hy, 1.11, low);
      var sway = Math.sin(t * 2.0) * .015 * (1 - low) * (lift > 0 ? 1 : 0) * (1 + swing);
      var rel = sm(sg(t, 12.6, 14.4)), dep = Math.max(0, t - 15.2), dd = dist(dep);
      var tx = TR.x + dd; truck.position.set(tx, 0, TR.z);
      var onTruck = t > 9.6;
      HM.position.set(onTruck ? tx : hx, hy, onTruck ? TR.z : hz); if (!onTruck) HM.position.x = hx; HM.rotation.z = sway; HM.rotation.x = sway * .6;
      var hang = t < 12.6 || true;
      /* crochet / pointe */
      var bY = HM.position.y + 4.6 + 2.9 + 4 * (1 - sm(sg(t, 0, 2.2)));
      bY = lerp(bY, 15, rel);
      blk3.set(HM.position.x, bY, HM.position.z); if (rel > 0) blk3.x = lerp(HM.position.x, HM.position.x, 1);
      var tipH = 16.2; tip.set(blk3.x, tipH, blk3.z);
      var bx0 = crane.position.x + turret.position.x, bz0 = crane.position.z;
      var az = Math.atan2(-(tip.z - bz0), tip.x - bx0); turret.rotation.y = az;
      var px = bx0 + Math.cos(az) * 1.7, pz = bz0 - Math.sin(az) * 1.7, py = 1.35 + 1.55;
      var rr = Math.hypot(tip.x - px, tip.z - pz), dy = tip.y - py, L = Math.hypot(rr, dy), ph = Math.atan2(dy, rr);
      piv.rotation.z = ph;
      for (var i = 0; i < 4; i++) { segs[i].scale.x = L * .5; segs[i].position.x = L * (.25 + i * .17); } head.position.x = L;
      block.position.copy(blk3);
      v2.copy(tip); link(cable, v2, tmp.copy(blk3).add(v3.set(0, .55, 0)), .05);
      var pts = HM.userData.pts, show = t < 13.2;
      for (i = 0; i < 4; i++) { slings[i].visible = show; if (show) { v2.set(blk3.x, blk3.y - .75, blk3.z); tmp.set(pts[i][0], pts[i][1], pts[i][2]).applyEuler(HM.rotation).add(HM.position); link(slings[i], v2, tmp, .03); } }
      /* roues */
      var rot = -dd / .55; tw.forEach(function (w) { w.children[0].rotation.y = 0; w.rotation.z = rot; });
      /* feux orange */
      amb.color.setHex((Math.floor(t * 2.5) % 2) ? 0xffa21a : 0x5a3606);
      /* poussiere */
      for (i = 0; i < NP; i++) { var tb = 15.4 + i * .06, ag = t - tb, k = i * 3; if (ag < 0 || ag > 2.6 || t < 15.4) { pp[k] = 0; pp[k + 1] = -50; pp[k + 2] = 0; } else { var d2 = dist(tb - 15.2); pp[k] = TR.x + d2 - 7.4 - ag * (.8 + dr[i][1]); pp[k + 1] = .3 + ag * (.5 + dr[i][1] * .8); pp[k + 2] = TR.z + dr[i][0] * 3.2 + ag * dr[i][2]; } }
      pg.attributes.position.needsUpdate = true; dust.material.opacity = .32;
      /* focus camera */
      if (t < 12.4) { foc.set(lerp(1, 2, swing), 2.5 + hy * .4, lerp(-3.5, 1.2, swing)); }
      else { foc.set(tx + 1.6, 2.2, TR.z - .6); }
      return { foc: foc, dd: dd };
    }
    var idle = 0, vis = true, forced = null, t0 = performance.now(), rm = W.matchMedia && W.matchMedia('(prefers-reduced-motion:reduce)').matches;
    function draw(t) {
      var p = pose(t), a = cam.aspect, port = a < 1;
      var th = t < 6 ? lerp(.55, .25, sm(sg(t, 0, 6))) : t < 12.6 ? lerp(.25, .0, sm(sg(t, 6, 12.6))) : lerp(.0, -.5, sm(sg(t, 12.6, 20)));
      var Rr = (t < 12.6 ? lerp(50, 44, sm(sg(t, 0, 10))) : lerp(44, 50, sm(sg(t, 12.6, 19)))) * (port ? 1.5 : 1), hh = t < 12.6 ? lerp(11.5, 13, sm(sg(t, 0, 8))) : lerp(13, 9, sm(sg(t, 12.6, 20)));
      th += idle; look.copy(p.foc);
      cam.position.set(look.x + Math.sin(th) * Rr, hh * (port ? 1.1 : 1), look.z + Math.cos(th) * Rr);
      cam.lookAt(look);
      var vh = 2 * Rr * Math.tan(cam.fov * Math.PI / 360), vw = vh * a;
      if (!port) { right.set(1, 0, 0).applyQuaternion(cam.quaternion); look.addScaledVector(right, -vw * .22); } else { look.y += vh * .24; }
      cam.lookAt(look);
      
      ren.render(scene, cam);
    }
    var hy = 86; function prog() { var r = hero.getBoundingClientRect(), tot = hero.offsetHeight - (W.innerHeight - hy); return tot > 0 ? cl(-(r.top - hy) / tot) : 0; }
    hy = Math.round(hero.getBoundingClientRect().top + (W.pageYOffset || 0)) || 86; hero.style.setProperty('--hy', hy + 'px');
    var caps = wrap.querySelectorAll('.hc'), bar = wrap.querySelector('.hp i'), txt = hero.querySelector(':scope>.wrap');
    function apply(p, now) {
      var t = cl((p - .08) / .8) * 19.7; idle = p < .03 ? Math.sin((now || 0) * .0004) * .07 * (1 - p / .03) : 0;
      var o = 1 - sm(sg(p, .05, .14)); if (txt) { txt.style.opacity = o.toFixed(3); txt.style.pointerEvents = o < .25 ? 'none' : ''; }
      var wins = [[.17, .60], [.66, .97]];
      for (var i = 0; i < caps.length; i++) { var w = wins[i], v = Math.min(sm(sg(p, w[0], w[0] + .04)), 1 - sm(sg(p, w[1] - .04, w[1]))); caps[i].style.opacity = v.toFixed(3); caps[i].style.transform = 'translateY(' + ((1 - v) * 14).toFixed(1) + 'px)'; }
      if (bar) bar.style.height = (p * 100).toFixed(1) + '%';
      draw(t);
    }
    function size() { var w = wrap.clientWidth, h = wrap.clientHeight; if (!w || !h) return; ren.setPixelRatio(Math.min(W.devicePixelRatio || 1, mob ? 1.5 : 1.75)); ren.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); apply(forced === null ? prog() : forced, 0); }
    W.__HH = { el: wrap, set: function (p) { forced = p; apply(p, 0); } };
    var io = 'IntersectionObserver' in W ? new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }, { rootMargin: '100px' }) : null; if (io) io.observe(hero);
    W.addEventListener('resize', size); size();
    var last = 0, lastp = -1;
    (function loop(ts) {
      if (!wrap.isConnected) { try { ren.dispose(); } catch (e) { } W.removeEventListener('resize', size); return; }
      if (vis && forced === null) { var p = prog(); if (Math.abs(p - lastp) > .0003 || (p < .03 && ts - last > 33)) { lastp = p; last = ts; apply(p, ts); } }
      W.requestAnimationFrame(loop);
    })(0);
  }

  function hasGL() { try { var c = D.createElement('canvas'); return !!(c.getContext('webgl') || c.getContext('experimental-webgl')); } catch (e) { return false; } }
  function whenThree(cb) {
    if (W.THREE) return cb();
    if (!D.querySelector('script[src*="three.min.js"]')) { var s = D.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'; D.head.appendChild(s); }
    var n = 0; (function w() { if (W.THREE) cb(); else if (n++ < 150) setTimeout(w, 100); })();
  }
  function pass() {
    pend = 0;
    var app = D.getElementById('app'), hero = app && app.querySelector('.hero');
    if (!hero || hero.querySelector('.hh') || hero.getAttribute('data-hh') === '1' || !hasGL()) return;
    hero.setAttribute('data-hh', '1');
    if (!styled) { var s = D.createElement('style'); s.textContent = CSS; D.head.appendChild(s); styled = true; }
    whenThree(function () {
      T = W.THREE; if (!T || !hero.isConnected) return;
      var wrap = D.createElement('div'); wrap.className = 'hh'; wrap.setAttribute('aria-hidden', 'true'); var d = TX[(D.documentElement.lang || '').toLowerCase().indexOf('en') === 0 ? 'en' : 'fr'], hh = '<canvas></canvas><div class="hf"></div>';
      for (var q = 0; q < d.c.length; q++) hh += '<div class="hc"><b>' + d.c[q].k + '</b><h3>' + d.c[q].h + '</h3><p>' + d.c[q].p + '</p></div>';
      wrap.innerHTML = hh + '<div class="hp"><i></i></div>';
      hero.insertBefore(wrap, hero.firstChild); hero.classList.add('hh-on');
      try { init(hero, wrap); } catch (e) { wrap.remove(); hero.classList.remove('hh-on'); }
    });
  }
  function ask() { if (!pend) pend = W.requestAnimationFrame(function () { setTimeout(pass, 80); }); }
  function boot() {
    var app = D.getElementById('app'); if (!app) return setTimeout(boot, 150);
    new MutationObserver(ask).observe(app, { childList: true, subtree: true }); ask();
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else boot();
})();
