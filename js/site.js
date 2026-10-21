(function () {
  'use strict';
  var C = window.AURIAM_CONFIG || {};
  var sb = null;
  try { sb = window.supabase.createClient(C.url, C.key); } catch (e) { sb = null; }

  var LS = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var lang = LS.get('lang') === 'en' ? 'en' : 'fr';
  var D = { cats: [], prods: [], tem: [], set: {}, ok: false, err: false };
  var tIdx = 0;
  var F = { price: 'all', surf: 'all', sort: 'site', st: 'all' };
  var gal = { id: null, i: 0 };

  /* ---------- textes ---------- */
  var S = {
    fr: {
      home: 'Accueil', all: 'Tous les produits', search: 'Rechercher', searchPh: 'Rechercher un produit…', none: 'Aucun produit trouvé.',
      menu: 'Menu', close: 'Fermer', language: 'LANGUE', back: 'Retour',
      kicker: 'PÉRIGUEUX · FRANCE', heroT: 'Maisons mobiles et conteneurs, neufs et d’occasion',
      heroP: 'Des espaces de vie confortables, adaptés à votre budget et à votre terrain. Nous vous accompagnons de l’achat à la livraison et à l’installation, avec des solutions de financement échelonné pour vivre chez vous sans stress.',
      seeAll: 'Voir tous les produits', wa: 'Écrire sur WhatsApp', cats: 'Nos catégories', featured: 'Produits à la une',
      aboutT: 'Pourquoi choisir AURIAM HOME ?',
      aboutP: 'Chez AURIAM HOME, nous vous proposons plusieurs gammes de maisons mobiles, de maisons conteneurs et de conteneurs maritimes, de [MIN] m² à [MAX] m², neufs ou d’occasion, pour choisir la superficie qui correspond à votre projet, avec un espace de vie très confortable. Nous vous accompagnons de l’achat jusqu’à la livraison et à l’installation, et nous cherchons avec vous la solution adaptée à votre budget et à votre terrain. Nous proposons aussi des solutions de financement pour payer de façon échelonnée, sans stress.',
      why: [['Livraison et installation', 'Nous livrons et nous assurons le déchargement et l’installation.'], ['Financement échelonné', 'Payez de façon échelonnée, selon un contrat avec AURIAM HOME.'], ['Visites et devis', 'Visites bienvenues à Périgueux, devis valable 30 jours sur WhatsApp.']],
      faqT: 'Questions fréquentes', temT: 'Témoignages de nos clients',
      faq: [['Livrez-vous ?', 'Oui, la livraison est possible dans toute l’Europe, et hors Union européenne sur devis. Le délai est de 7 à 10 jours en livraison dédiée, ou de 2 à 3 semaines en livraison groupée (moins chère), à partir de la réception de l’acompte.'],
        ['Comment payer ?', 'Par virement bancaire, au comptant ou de façon échelonnée. Le détail est sur la page « Financement et paiement » et dans nos conditions générales de vente.'],
        ['L’installation est-elle comprise ?', 'AURIAM HOME assure le déchargement et l’installation, gratuitement. La préparation du terrain reste à votre charge et nous vous envoyons un plan avant la livraison.'],
        ['Puis-je visiter avant d’acheter ?', 'Oui, les visites sont bienvenues au parc d’exposition de Périgueux. Contactez-nous pour convenir d’un moment.']],
      ctaT: 'Un projet ? Parlons-en.', ctaP: 'Décrivez-nous votre terrain et votre budget, nous vous répondons avec un devis gratuit.',
      priceF: 'Prix', surfF: 'Surface', sortF: 'Trier',
      prices: [['all', 'Tous les prix'], ['lt6', 'Moins de 6 000 €'], ['6-10', '6 000 – 10 000 €'], ['gt10', 'Plus de 10 000 €']],
      surfs: [['all', 'Toutes surfaces'], ['lt30', 'Moins de 30 m²'], ['30-45', '30 – 45 m²'], ['gt45', 'Plus de 45 m²']],
      sorts: [['site', 'Ordre du site'], ['pa', 'Prix croissant'], ['pd', 'Prix décroissant'], ['sd', 'Surface décroissante']],
      stateAll: 'Tous', stateNew: 'Neuf', stateUsed: 'Occasion',
      count: function (n) { return n + (n > 1 ? ' produits' : ' produit'); },
      empty: 'Aucun produit dans cette catégorie pour le moment.',
      onReq: 'Sur demande', priceNote: 'Prix indicatif, livraison et TVA non incluses.',
      quote: 'Demander un devis sur WhatsApp', quoteNote: 'Le devis est gratuit et valable 30 jours.',
      visit: 'Visiter le parc d’exposition',
      cond: 'État', year: 'Année', dims: 'Dimensions', surface: 'Surface', beds: 'Chambres',
      equip: 'Équipements', feat: 'Caractéristiques', similar: 'Dans la même catégorie',
      stNew: 'Neuf', stUsed: 'Occasion', bNew: 'Neuve', bUsed: 'Occasion',
      waMsg: function (t, p) { return 'Bonjour AURIAM HOME, je souhaite un devis pour : ' + t + (p ? ' (' + p + ')' : '') + '.'; },
      waMsg0: 'Bonjour AURIAM HOME, je souhaite des informations.',
      ship: 'Livraison et délais', fin: 'Financement et paiement', contact: 'Contact', mentions: 'Mentions légales', cgv: 'Conditions générales de vente',
      legal: 'Informations légales', visits: 'Visites bienvenues au parc d’exposition.',
      foot: 'Maisons mobiles, maisons conteneurs et conteneurs maritimes, neufs et d’occasion.',
      err: 'Impossible de charger les produits pour le moment. Vérifiez votre connexion et réessayez.', retry: 'Réessayer', load: 'Chargement…',
      notfound: 'Page introuvable.',
      ph: 'Photo à venir'
    },
    en: {
      home: 'Home', all: 'All products', search: 'Search', searchPh: 'Search a product…', none: 'No product found.',
      menu: 'Menu', close: 'Close', language: 'LANGUAGE', back: 'Back',
      kicker: 'PÉRIGUEUX · FRANCE', heroT: 'Mobile homes and containers, new and used',
      heroP: 'Comfortable living spaces suited to your budget and your land. We support you from purchase to delivery and installation, with instalment financing so you can move in without stress.',
      seeAll: 'See all products', wa: 'Write on WhatsApp', cats: 'Our categories', featured: 'Featured products',
      aboutT: 'Why choose AURIAM HOME?',
      aboutP: 'At AURIAM HOME, we offer several ranges of mobile homes, container homes and shipping containers, from [MIN] m² to [MAX] m², new or used, so you can choose the size that fits your project, with a very comfortable living space. We support you from purchase through to delivery and installation, and we look with you for the solution that fits your budget and your land. We also offer financing solutions so you can pay in instalments, without stress.',
      why: [['Delivery and installation', 'We deliver and handle unloading and installation.'], ['Instalment financing', 'Pay in instalments, under a contract with AURIAM HOME.'], ['Visits and quotes', 'Visits welcome in Périgueux, quote valid for 30 days on WhatsApp.']],
      faqT: 'Frequently asked questions', temT: 'What our customers say',
      faq: [['Do you deliver?', 'Yes, delivery is available across Europe, and outside the European Union on quote. Lead time is 7 to 10 days for dedicated delivery, or 2 to 3 weeks for grouped delivery (cheaper), counted from receipt of the deposit.'],
        ['How do I pay?', 'By bank transfer, in cash terms or in instalments. Details are on the “Financing and payment” page and in our terms and conditions of sale.'],
        ['Is installation included?', 'AURIAM HOME carries out the unloading and installation free of charge. Preparing the site is at your expense and we send you a plan before delivery.'],
        ['Can I visit before buying?', 'Yes, visits are welcome at our showroom in Périgueux. Contact us to agree on a time.']],
      ctaT: 'Have a project? Let’s talk.', ctaP: 'Tell us about your land and your budget, and we will reply with a free quote.',
      priceF: 'Price', surfF: 'Surface', sortF: 'Sort',
      prices: [['all', 'All prices'], ['lt6', 'Under €6,000'], ['6-10', '€6,000 – €10,000'], ['gt10', 'Over €10,000']],
      surfs: [['all', 'All sizes'], ['lt30', 'Under 30 m²'], ['30-45', '30 – 45 m²'], ['gt45', 'Over 45 m²']],
      sorts: [['site', 'Default order'], ['pa', 'Price: low to high'], ['pd', 'Price: high to low'], ['sd', 'Largest surface']],
      stateAll: 'All', stateNew: 'New', stateUsed: 'Used',
      count: function (n) { return n + (n > 1 ? ' products' : ' product'); },
      empty: 'No product in this category yet.',
      onReq: 'On request', priceNote: 'Indicative price, delivery and VAT not included.',
      quote: 'Request a quote on WhatsApp', quoteNote: 'The quote is free and valid for 30 days.',
      visit: 'Visit our showroom',
      cond: 'Condition', year: 'Year', dims: 'Dimensions', surface: 'Surface', beds: 'Bedrooms',
      equip: 'Equipment', feat: 'Features', similar: 'In the same category',
      stNew: 'New', stUsed: 'Used', bNew: 'New', bUsed: 'Used',
      waMsg: function (t, p) { return 'Hello AURIAM HOME, I would like a quote for: ' + t + (p ? ' (' + p + ')' : '') + '.'; },
      waMsg0: 'Hello AURIAM HOME, I would like some information.',
      ship: 'Delivery and lead times', fin: 'Financing and payment', contact: 'Contact', mentions: 'Legal notice', cgv: 'Terms and conditions of sale',
      legal: 'Legal information', visits: 'Visits welcome at our showroom.',
      foot: 'Mobile homes, container homes and shipping containers, new and used.',
      err: 'Unable to load products right now. Check your connection and try again.', retry: 'Try again', load: 'Loading…',
      notfound: 'Page not found.',
      ph: 'Photo coming soon'
    }
  };
  function t() { return S[lang]; }

  /* ---------- utilitaires ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function nl(s) { return esc(s).replace(/\n/g, '<br>'); }
  function loc() { return lang === 'fr' ? 'fr-FR' : 'en-GB'; }
  function money(n) { return n == null || n === '' ? t().onReq : Number(n).toLocaleString(loc()) + ' €'; }
  function num(n) { return Number(n).toLocaleString(loc(), { maximumFractionDigits: 2 }); }
  function L(p, k) { var v = lang === 'en' ? p[k + '_en'] : p[k + '_fr']; return (v && String(v).trim()) ? v : (p[k + '_fr'] || p[k + '_en'] || ''); }
  function arr(p, k) {
    var v = lang === 'en' ? p[k + '_en'] : p[k + '_fr'];
    if (!Array.isArray(v) || !v.length) v = p[k + '_fr'];
    return Array.isArray(v) ? v.filter(Boolean) : [];
  }
  function photos(p) {
    var a = Array.isArray(p.photos) ? p.photos : [];
    return a.map(function (x) { return typeof x === 'string' ? { full: x, thumb: x } : { full: x.full || x.thumb, thumb: x.thumb || x.full }; }).filter(function (x) { return x.full; });
  }
  function cover(p) { var a = photos(p); return a.length ? a[0].thumb : ''; }
  function catName(slug) { var c = D.cats.find(function (x) { return x.slug === slug; }); return c ? (lang === 'en' && c.name_en ? c.name_en : c.name_fr) : slug; }
  function badge(p) {
    var y = p.year ? ' · ' + p.year : '';
    if (p.category === 'neuve') return t().bNew + y;
    if (p.category === 'occasion') return t().bUsed + y;
    return catName(p.category) + y;
  }
  function dims(p) { return p.length_m && p.width_m ? num(p.length_m) + ' × ' + num(p.width_m) + ' m' : ''; }
  function specs(p) {
    var a = [];
    if (dims(p)) a.push(dims(p));
    if (p.surface_m2) a.push(num(p.surface_m2) + ' m²');
    if (p.bedrooms) a.push(p.bedrooms + ' ' + (lang === 'fr' ? (p.bedrooms > 1 ? 'chambres' : 'chambre') : (p.bedrooms > 1 ? 'bedrooms' : 'bedroom')));
    return a.join(' · ');
  }
  function digits(s) { return String(s || '').replace(/[^\d]/g, ''); }
  function waLink(text) {
    var n = digits(D.set.whatsapp);
    if (!n) return '#/contact';
    return 'https://wa.me/' + n + '?text=' + encodeURIComponent(text);
  }
  function waExt() { return digits(D.set.whatsapp) ? ' target="_blank" rel="noopener"' : ''; }
  function mailLink() { return D.set.email ? 'mailto:' + esc(D.set.email) : '#/contact'; }

  var SVG = {
    mark: '<svg width="44" height="44" viewBox="0 0 100 100" aria-hidden="true"><path d="M12 90 L50 14 L88 90" fill="none" stroke="#14263F" stroke-width="14"/><rect x="27" y="54" width="46" height="23" fill="#C98A3D"/><path d="M38.5 54V77M50 54V77M61.5 54V77" stroke="#fff" stroke-width="2.5"/></svg>',
    search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    wa: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.5z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-.8-.4-1.6-1.2-2-2l.8-1-1-2z" fill="currentColor" stroke="none"/></svg>'
  };
  function ph(txt) { return '<div class="ph" style="flex-direction:column;gap:6px;color:#8A8576;font-size:13px">' + SVG.mark.replace('width="44" height="44"', 'width="56" height="56" opacity=".35"') + '<span>' + esc(txt) + '</span></div>'; }

  /* ---------- données ---------- */
  function load() {
    D.err = false; D.ok = false; render();
    if (!sb) { D.err = true; render(); return; }
    Promise.all([
      sb.from('categories').select('*').order('sort_order'),
      sb.from('products').select('*').order('sort_order').order('created_at'),
      sb.from('settings').select('*'),
      sb.from('testimonials').select('*').order('sort_order').order('created_at')
    ]).then(function (r) {
      if (r[0].error || r[1].error) throw (r[0].error || r[1].error);
      D.cats = r[0].data || []; D.prods = r[1].data || [];
      D.tem = (r[3] && !r[3].error && r[3].data || []).filter(function (x) { return x.published !== false; });
      D.set = {}; (r[2].data || []).forEach(function (x) { D.set[x.key] = x.value; });
      D.ok = true; render();
    }).catch(function () { D.err = true; render(); });
  }

  /* ---------- vues ---------- */
  function card(p) {
    var c = cover(p);
    return '<a class="card" href="#/p/' + esc(p.id) + '">' + (c ? '<div class="ph"><img loading="lazy" src="' + esc(c) + '" alt="' + esc(L(p, 'title')) + '"></div>' : ph(t().ph)) +
      '<div class="cb"><span class="badge">' + esc(badge(p)) + '</span><h3>' + esc(L(p, 'title')) + '</h3><p class="sp">' + esc(specs(p)) + '</p><p class="pr">' + esc(money(p.price)) + '</p></div></a>';
  }
  function surfRange() {
    var s = D.prods.map(function (p) { return Number(p.surface_m2); }).filter(function (x) { return x > 0; });
    if (!s.length) return [16, 80];
    return [Math.floor(Math.min.apply(null, s)), Math.ceil(Math.max.apply(null, s))];
  }
  function home() {
    var feat = D.prods.filter(function (p) { return p.featured; }).slice(0, 6);
    if (!feat.length) feat = D.prods.slice(0, 6);
    var hero = (feat.find(function (p) { return cover(p); }) || {});
    var sr = surfRange();
    var h = '<section class="hero"><div class="wrap"><div class="t"><div class="k">' + t().kicker + '</div><h1>' + esc(t().heroT) + '</h1><p>' + esc(t().heroP) + '</p><div class="cta"><a class="btn cu" href="#/all">' + esc(t().seeAll) + '</a><a class="btn line" href="' + waLink(t().waMsg0) + '"' + waExt() + '>' + esc(t().wa) + '</a></div></div>' +
      '<div class="im"><img' + (D.set.hero_image ? ' class="hp"' : '') + ' src="' + (D.set.hero_image ? esc(D.set.hero_image) : 'photos/hero.jpg') + '" alt="Maison mobile livrée par grue"' + (cover(hero) ? ' onerror="this.onerror=null;this.src=\'' + esc(photos(hero)[0].full) + '\'"' : '') + '></div>' + '</div></section>';
    h += '<section class="wrap sec"><h2>' + esc(t().cats) + '</h2><div class="tiles">' + D.cats.map(function (c) {
      var p = D.prods.find(function (x) { return x.category === c.slug && cover(x); });
      return '<a class="tile" href="#/c/' + esc(c.slug) + '">' + (p ? '<img loading="lazy" src="' + esc(cover(p)) + '" alt="">' : '') + '<span>' + esc(lang === 'en' && c.name_en ? c.name_en : c.name_fr) + '</span></a>';
    }).join('') + '</div></section>';
    if (feat.length) h += '<section class="wrap sec"><h2>' + esc(t().featured) + '</h2><div class="grid">' + feat.map(card).join('') + '</div></section>';
    h += '<section class="wrap sec"><p class="sub">' + esc(t().aboutP.replace('[MIN]', sr[0]).replace('[MAX]', sr[1])) + '</p><div class="why">' + t().why.map(function (w) { return '<div><b>' + esc(w[0]) + '</b><span>' + esc(w[1]) + '</span></div>'; }).join('') + '</div></section>';
    if (D.tem.length) h += '<section class="wrap sec"><h2>' + esc(t().temT) + '</h2><div id="tm">' + temHtml() + '</div></section>';
    h += '<section class="wrap sec" style="max-width:820px"><h2>' + esc(t().faqT) + '</h2>' + t().faq.map(function (f) { return '<details><summary>' + esc(f[0]) + '</summary><p>' + esc(f[1]) + '</p></details>'; }).join('') + '</section>';
    h += '<div class="wrap"><div class="band"><div><h2>' + esc(t().ctaT) + '</h2><p>' + esc(t().ctaP) + '</p></div><a class="btn cu" href="' + waLink(t().waMsg0) + '"' + waExt() + '>' + esc(t().wa) + '</a></div></div>';
    return h;
  }
  function temHtml() {
    var n = D.tem.length; if (!n) return '';
    if (tIdx >= n) tIdx = 0;
    var x = D.tem[tIdx], txt = L(x, 'text');
    var img = x.photo ? '<img src="' + esc(x.photo) + '" alt="' + esc(x.name) + '" loading="lazy">' : '<span class="av">' + esc((x.name || '?').charAt(0).toUpperCase()) + '</span>';
    return '<div class="tem">' + img + '<blockquote>“' + nl(txt) + '”</blockquote><div class="who">' + esc(x.name) + (x.place ? ' · ' + esc(x.place) : '') + '</div></div>' +
      (n > 1 ? '<div class="tnav"><button data-act="tprev" aria-label="←">‹</button><span>' + (tIdx + 1) + ' / ' + n + '</span><button data-act="tnext" aria-label="→">›</button></div>' : '');
  }
  function sel(id, opts, val) {
    return '<select id="' + id + '" aria-label="' + id + '">' + opts.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === val ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>';
  }
  function filtered(slug) {
    var l = D.prods.filter(function (p) { return slug === 'all' || p.category === slug; });
    if (slug === 'all' && F.st !== 'all') l = l.filter(function (p) { return p.category === F.st; });
    l = l.filter(function (p) {
      var pr = Number(p.price), ok = true;
      if (F.price === 'lt6') ok = pr < 6000; else if (F.price === '6-10') ok = pr >= 6000 && pr <= 10000; else if (F.price === 'gt10') ok = pr > 10000;
      return ok;
    }).filter(function (p) {
      var s = Number(p.surface_m2) || 0;
      if (F.surf === 'lt30') return s < 30; if (F.surf === 'gt45') return s > 45; if (F.surf === '30-45') return s >= 30 && s <= 45; return true;
    });
    if (F.sort === 'pa') l = l.slice().sort(function (a, b) { return (a.price || 0) - (b.price || 0); });
    if (F.sort === 'pd') l = l.slice().sort(function (a, b) { return (b.price || 0) - (a.price || 0); });
    if (F.sort === 'sd') l = l.slice().sort(function (a, b) { return (b.surface_m2 || 0) - (a.surface_m2 || 0); });
    return l;
  }
  function gridHtml(slug) {
    var l = filtered(slug);
    return '<div class="sub" style="margin:0 0 14px">' + esc(t().count(l.length)) + '</div>' + (l.length ? '<div class="grid">' + l.map(card).join('') + '</div>' : '<div class="empty">' + esc(t().empty) + '</div>');
  }
  function list(slug) {
    var title = slug === 'all' ? t().all : catName(slug);
    var h = '<section class="wrap" style="padding-top:28px"><a class="back" href="#/">← ' + esc(t().home) + '</a><h1 class="pt">' + esc(title) + '</h1>';
    if (slug === 'all') h += '<div class="filters">' + [['all', t().stateAll], ['neuve', t().stateNew], ['occasion', t().stateUsed]].map(function (s) { return '<button class="chip' + (F.st === s[0] ? ' on' : '') + '" data-act="st" data-v="' + s[0] + '">' + esc(s[1]) + '</button>'; }).join('') + '</div>';
    else h += '<div class="filters">' + D.cats.map(function (c) { return '<a class="chip' + (c.slug === slug ? ' on' : '') + '" href="#/c/' + esc(c.slug) + '">' + esc(lang === 'en' && c.name_en ? c.name_en : c.name_fr) + '</a>'; }).join('') + '</div>';
    h += '<div class="filters">' + sel('f-price', t().prices, F.price) + sel('f-surf', t().surfs, F.surf) + sel('f-sort', t().sorts, F.sort) + '</div>';
    h += '<div id="grid" data-slug="' + esc(slug) + '">' + gridHtml(slug) + '</div></section>';
    return h;
  }
  function product(id) {
    var p = D.prods.find(function (x) { return String(x.id) === String(id); });
    if (!p) return '<section class="wrap" style="padding-top:28px"><a class="back" href="#/all">← ' + esc(t().back) + '</a><div class="empty" style="margin-top:16px">' + esc(t().notfound) + '</div></section>';
    var ph_ = photos(p);
    if (gal.id !== p.id) { gal.id = p.id; gal.i = 0; }
    var cur = ph_[gal.i] || ph_[0];
    var title = L(p, 'title');
    var rows = [[t().cond, p.category === 'neuve' ? t().stNew : p.category === 'occasion' ? t().stUsed : catName(p.category)]];
    if (p.year) rows.push([t().year, p.year]);
    if (dims(p)) rows.push([t().dims, dims(p)]);
    if (p.surface_m2) rows.push([t().surface, num(p.surface_m2) + ' m²']);
    if (p.bedrooms) rows.push([t().beds, p.bedrooms]);
    var feat = arr(p, 'features'), eq = arr(p, 'equipment');
    var sim = D.prods.filter(function (x) { return x.category === p.category && x.id !== p.id; }).slice(0, 3);
    var h = '<section class="wrap" style="padding-top:28px"><a class="back" href="#/c/' + esc(p.category) + '">← ' + esc(catName(p.category)) + '</a><div class="pd"><div class="g">';
    h += cur ? '<img class="main" data-act="zoom" src="' + esc(cur.full) + '" alt="' + esc(title) + '">' : '<div class="main" style="display:flex;align-items:center;justify-content:center">' + SVG.mark.replace('width="44" height="44"', 'width="90" height="90" opacity=".3"') + '</div>';
    if (ph_.length > 1) h += '<div class="th">' + ph_.map(function (x, i) { return '<button class="' + (i === gal.i ? 'on' : '') + '" data-act="gi" data-v="' + i + '" aria-label="Photo ' + (i + 1) + '"><img loading="lazy" src="' + esc(x.thumb) + '" alt=""></button>'; }).join('') + '</div>';
    h += '</div><div class="i"><span class="badge">' + esc(badge(p)) + '</span><h1>' + esc(title) + '</h1><div class="price">' + esc(money(p.price)) + '</div>' + (p.price ? '<div class="note">' + esc(t().priceNote) + '</div>' : '<div class="note"></div>');
    var d = L(p, 'desc'); if (d) h += '<p class="desc">' + nl(d) + '</p>';
    h += '<div class="spec">' + rows.map(function (r) { return '<div><span>' + esc(r[0]) + '</span><span>' + esc(r[1]) + '</span></div>'; }).join('') + '</div>';
    if (feat.length) h += '<div class="lst-t">' + esc(t().feat) + '</div><ul class="lst">' + feat.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    if (eq.length) h += '<div class="lst-t">' + esc(t().equip) + '</div><ul class="lst">' + eq.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    h += '<a class="btn wa" href="' + waLink(t().waMsg(title, p.price ? money(p.price) : '')) + '"' + waExt() + '>' + SVG.wa.replace('width="28" height="28"', 'width="22" height="22"') + esc(t().quote) + '</a><div class="note" style="margin-top:10px">' + esc(t().quoteNote) + '</div>';
    h += '</div></div></section>';
    if (sim.length) h += '<section class="wrap sec"><h2 style="font-size:22px">' + esc(t().similar) + '</h2><div class="grid">' + sim.map(card).join('') + '</div></section>';
    return h;
  }
  function fill(s) {
    return s.replace(/\{\{email\}\}/g, D.set.email ? esc(D.set.email) : '[e-mail]').replace(/\{\{phone\}\}/g, D.set.phone ? esc(D.set.phone) : '[tel]').replace(/\{\{wa\}\}/g, D.set.whatsapp ? esc(D.set.whatsapp) : '[WhatsApp]');
  }
  function steps(a) { return '<div class="steps">' + a.map(function (s, i) { return '<div><b>' + (i + 1) + '</b><span>' + s + '</span></div>'; }).join('') + '</div>'; }
  var PAGES = {
    fr: {
      livraison: function () { return '<h1>Livraison et délais</h1><p>Nous livrons votre maison mobile ou votre conteneur partout en Europe, et hors Union européenne sur devis.</p>' +
        '<h2>Transport</h2><p>Le transport se fait par convoi exceptionnel. Son coût, calculé selon la destination, figure dans votre devis.</p>' +
        '<h2>Délais</h2>' + steps(['<strong>7 à 10 jours</strong> en livraison dédiée.', '<strong>2 à 3 semaines</strong> en livraison groupée, moins chère.', 'Le délai court à partir de la <strong>réception de l’acompte</strong>.']) +
        '<h2>Déchargement et installation</h2><p>AURIAM HOME assure le déchargement et l’installation, gratuitement. Un plan de préparation du terrain vous est envoyé avant la livraison ; la préparation du terrain est réalisée à vos frais. Si l’accès est difficile et nécessite une grue, vous louez une grue locale à vos frais.</p>' +
        '<h2>Ce dont nous avons besoin</h2><ul><li>Un accès praticable au terrain.</li><li>Les autorisations nécessaires (urbanisme, raccordements).</li></ul>' +
        '<h2>Hors Union européenne</h2><p>Les droits de douane, la TVA à l’importation et les formalités restent à votre charge, sauf mention contraire dans le devis.</p>' +
        '<h2>À la livraison</h2><p>Vous vérifiez l’état du produit en présence du transporteur et vous signez un procès-verbal de livraison. Le solde est dû après cette vérification.</p>' +
        '<p><a class="btn cu" href="#/contact">Demander un devis</a></p>'; },
      financement: function () { return '<h1>Financement et paiement</h1><p>Deux façons de payer, simples et transparentes. Tout est précisé dans votre devis et dans nos conditions générales de vente. Le paiement se fait par virement bancaire.</p>' +
        '<h2>Paiement comptant</h2>' + steps(['<strong>Avant le départ du camion :</strong> 100 % des frais de transport et 20 % du prix du produit.', '<strong>Sur votre terrain,</strong> après vérification de l’état du produit : les 80 % restants et la TVA.']) +
        '<h2>Paiement échelonné</h2><p>AURIAM HOME peut financer votre achat directement, sans banque ni organisme financier :</p>' + steps(['<strong>Avant la livraison :</strong> 100 % des frais de transport.', '<strong>À la livraison :</strong> 30 % du prix du produit.', '<strong>Les 70 % restants et la TVA</strong> en plusieurs versements, jusqu’à 36 mois, selon le contrat signé avec AURIAM HOME.']) +
        '<p>Le paiement échelonné est proposé sous réserve d’acceptation de votre dossier et selon les conditions du contrat. Le produit reste la propriété d’AURIAM HOME jusqu’au paiement complet.</p>' +
        '<p>Détails complets : <a href="#/cgv" style="text-decoration:underline">conditions générales de vente</a>.</p><p><a class="btn cu" href="#/contact">Demander un devis</a></p>'; },
      contact: function () { return '<h1>Contact</h1><p>Décrivez-nous votre projet, votre terrain et votre budget : nous répondons avec un devis gratuit, valable 30 jours.</p>' +
        '<h2>Parc d’exposition</h2><p>AURIAM HOME<br>Route de Lyon<br>24000 Périgueux, France</p><p>Visites bienvenues. Contactez-nous pour convenir d’un moment.</p>' +
        '<p><a class="btn wa" style="width:auto" href="' + waLink(S.fr.waMsg0) + '"' + waExt() + '>Écrire sur WhatsApp</a></p>' +
        (D.set.email ? '<p>E-mail : <a style="text-decoration:underline" href="mailto:' + esc(D.set.email) + '">' + esc(D.set.email) + '</a></p>' : '') + (D.set.phone ? '<p>Téléphone : ' + esc(D.set.phone) + '</p>' : ''); }
    },
    en: {
      livraison: function () { return '<h1>Delivery and lead times</h1><p>We deliver your mobile home or container across Europe, and outside the European Union on quote.</p>' +
        '<h2>Transport</h2><p>Transport is by abnormal-load convoy. Its cost depends on the destination and is stated in your quote.</p>' +
        '<h2>Lead times</h2>' + steps(['<strong>7 to 10 days</strong> for dedicated delivery.', '<strong>2 to 3 weeks</strong> for grouped delivery, which is cheaper.', 'The lead time starts when the <strong>deposit is received</strong>.']) +
        '<h2>Unloading and installation</h2><p>AURIAM HOME carries out the unloading and installation free of charge. A site-preparation plan is sent to you before delivery; preparing the site is done at your expense. If access is difficult and a crane is needed, you hire a local crane at your own expense.</p>' +
        '<h2>What we need</h2><ul><li>Practical access to the site.</li><li>The required permits (planning, utility connections).</li></ul>' +
        '<h2>Outside the European Union</h2><p>Customs duties, import VAT and formalities are your responsibility, unless the quote says otherwise.</p>' +
        '<h2>On delivery</h2><p>You check the product in the presence of the carrier and sign a delivery report. The balance is due after this check.</p>' +
        '<p><a class="btn cu" href="#/contact">Request a quote</a></p>'; },
      financement: function () { return '<h1>Financing and payment</h1><p>Two simple and transparent ways to pay. Everything is detailed in your quote and in our terms and conditions of sale. Payment is by bank transfer.</p>' +
        '<h2>Cash payment</h2>' + steps(['<strong>Before the truck leaves:</strong> 100% of transport costs and 20% of the product price.', '<strong>At your site,</strong> after checking the condition of the product: the remaining 80% and the VAT.']) +
        '<h2>Instalment payment</h2><p>AURIAM HOME can finance your purchase directly, without any bank or financial institution:</p>' + steps(['<strong>Before delivery:</strong> 100% of transport costs.', '<strong>On delivery:</strong> 30% of the product price.', '<strong>The remaining 70% and the VAT</strong> in instalments, up to 36 months, under the contract signed with AURIAM HOME.']) +
        '<p>Instalment payment is offered subject to acceptance of your application and under the terms of the contract. The product remains the property of AURIAM HOME until full payment.</p>' +
        '<p>Full details: <a href="#/cgv" style="text-decoration:underline">terms and conditions of sale</a>.</p><p><a class="btn cu" href="#/contact">Request a quote</a></p>'; },
      contact: function () { return '<h1>Contact</h1><p>Tell us about your project, your land and your budget: we reply with a free quote, valid for 30 days.</p>' +
        '<h2>Showroom</h2><p>AURIAM HOME<br>Route de Lyon<br>24000 Périgueux, France</p><p>Visits welcome. Contact us to agree on a time.</p>' +
        '<p><a class="btn wa" style="width:auto" href="' + waLink(S.en.waMsg0) + '"' + waExt() + '>Write on WhatsApp</a></p>' +
        (D.set.email ? '<p>E-mail: <a style="text-decoration:underline" href="mailto:' + esc(D.set.email) + '">' + esc(D.set.email) + '</a></p>' : '') + (D.set.phone ? '<p>Phone: ' + esc(D.set.phone) + '</p>' : ''); }
    }
  };
  function page(name) {
    var h;
    if (name === 'mentions' || name === 'cgv') h = fill((window.LEGAL && window.LEGAL[lang] ? window.LEGAL[lang][name] : '') || '');
    else if (PAGES[lang][name]) h = PAGES[lang][name]();
    else return '<div class="load">' + esc(t().notfound) + '</div>';
    return '<section class="doc"><a class="back" href="#/">← ' + esc(t().home) + '</a><div style="height:10px"></div>' + h + '</section>';
  }

  /* ---------- chrome ---------- */
  function header() {
    return '<header class="top"><div class="wrap"><a class="logo" href="#/" aria-label="AURIAM HOME">' + SVG.mark + '<span><b>AURIAM</b><i>HOME</i></span></a><div class="hbtns"><button class="ib" data-act="search" aria-label="' + esc(t().search) + '">' + SVG.search + '</button><button class="ib dark" data-act="menu" aria-label="' + esc(t().menu) + '">' + SVG.menu + '</button></div></div></header>';
  }
  function footer() {
    return '<footer class="foot"><div class="wrap"><div><b style="font-size:18px;letter-spacing:3px">AURIAM <span style="color:#C98A3D">HOME</span></b>' + esc(t().foot) + '</div>' +
      '<div><b>' + esc(t().contact) + '</b>Route de Lyon, 24000 Périgueux<br>' + (D.set.email ? '<a href="' + mailLink() + '">' + esc(D.set.email) + '</a><br>' : '') + (D.set.phone ? esc(D.set.phone) + '<br>' : '') + '<a href="' + waLink(t().waMsg0) + '"' + waExt() + '>WhatsApp</a></div>' +
      '<div><b>' + esc(t().legal) + '</b><a href="#/livraison">' + esc(t().ship) + '</a><br><a href="#/financement">' + esc(t().fin) + '</a><br><a href="#/mentions">' + esc(t().mentions) + '</a><br><a href="#/cgv">' + esc(t().cgv) + '</a></div></div><div class="c">© AURIAM HOME – SASU</div></footer>' +
      '<a class="wab" href="' + waLink(t().waMsg0) + '"' + waExt() + ' aria-label="WhatsApp">' + SVG.wa + '</a>';
  }
  function menuHtml() {
    return '<div class="ov" data-act="closebg"><div class="dr"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><b style="letter-spacing:2px">' + esc(t().menu).toUpperCase() + '</b><button class="ib" data-act="close" aria-label="' + esc(t().close) + '" style="font-size:22px">×</button></div>' +
      '<a class="l f" href="#/" data-act="close">' + esc(t().home) + '</a>' +
      D.cats.map(function (c) { return '<a class="l" href="#/c/' + esc(c.slug) + '" data-act="close">' + esc(lang === 'en' && c.name_en ? c.name_en : c.name_fr) + '</a>'; }).join('') +
      '<a class="l" href="#/all" data-act="close">' + esc(t().all) + '</a><a class="l" href="#/livraison" data-act="close">' + esc(t().ship) + '</a><a class="l" href="#/financement" data-act="close">' + esc(t().fin) + '</a><a class="l" href="#/contact" data-act="close">' + esc(t().contact) + '</a><a class="l" href="#/mentions" data-act="close">' + esc(t().mentions) + '</a><a class="l" href="#/cgv" data-act="close">' + esc(t().cgv) + '</a>' +
      '<div style="margin-top:16px;font-size:12px;font-weight:600;letter-spacing:1px;color:#4C5A70">' + esc(t().language) + '</div><div class="lang"><button data-act="lang" data-v="fr" class="' + (lang === 'fr' ? 'on' : '') + '">Français</button><button data-act="lang" data-v="en" class="' + (lang === 'en' ? 'on' : '') + '">English</button></div></div></div>';
  }
  function searchHtml() {
    return '<div class="ov" data-act="closebg" style="z-index:50;overflow-y:auto"><div class="sbox"><div class="in"><div style="display:flex;gap:8px"><input id="q" type="search" placeholder="' + esc(t().searchPh) + '" aria-label="' + esc(t().search) + '" autocomplete="off"><button class="ib" data-act="close" aria-label="' + esc(t().close) + '" style="border-radius:10px;width:48px;height:48px;font-size:22px">×</button></div><div id="res" style="margin-top:10px"></div></div></div></div>';
  }
  function results(q) {
    q = q.trim().toLowerCase();
    var el = document.getElementById('res'); if (!el) return;
    if (!q) { el.innerHTML = ''; return; }
    var r = D.prods.filter(function (p) { return (L(p, 'title') + ' ' + L(p, 'desc') + ' ' + p.year + ' ' + specs(p) + ' ' + catName(p.category)).toLowerCase().indexOf(q) > -1; }).slice(0, 8);
    el.innerHTML = r.length ? r.map(function (p) {
      var c = cover(p);
      return '<a class="res" href="#/p/' + esc(p.id) + '" data-act="close">' + (c ? '<img src="' + esc(c) + '" alt="">' : '<span style="width:72px;height:54px;background:#EAE5DA;border-radius:6px;flex:none"></span>') + '<span style="flex:1;min-width:0"><b>' + esc(L(p, 'title')) + '</b><small>' + esc(specs(p)) + '</small></span><b>' + esc(money(p.price)) + '</b></a>';
    }).join('') : '<div style="padding:16px 4px;color:#4C5A70;font-size:14px">' + esc(t().none) + '</div>';
  }

  /* ---------- routeur ---------- */
  var overlay = '';
  function route() { var h = location.hash.replace(/^#\/?/, ''); return h.split('/'); }
  function titleFor(r) {
    var base = 'AURIAM HOME';
    if (r[0] === 'p') { var p = D.prods.find(function (x) { return String(x.id) === r[1]; }); return p ? L(p, 'title') + ' – ' + base : base; }
    if (r[0] === 'c') return catName(r[1]) + ' – ' + base;
    if (r[0] === 'all') return t().all + ' – ' + base;
    if (['livraison', 'financement', 'mentions', 'cgv', 'contact'].indexOf(r[0]) > -1) return t()[{ livraison: 'ship', financement: 'fin', mentions: 'mentions', cgv: 'cgv', contact: 'contact' }[r[0]]] + ' – ' + base;
    return base + ' – ' + t().heroT;
  }
  function render() {
    var app = document.getElementById('app'); if (!app) return;
    document.documentElement.lang = lang;
    var r = route(), body;
    if (D.err) body = '<div class="load">' + esc(t().err) + '<br><br><button class="btn cu" data-act="retry">' + esc(t().retry) + '</button></div>';
    else if (!D.ok) body = '<div class="load">' + esc(t().load) + '</div>';
    else if (r[0] === 'c') body = list(r[1] || 'all');
    else if (r[0] === 'all') body = list('all');
    else if (r[0] === 'p') body = product(r[1]);
    else if (r[0] === '' || r[0] === undefined) body = home();
    else body = page(r[0]);
    app.innerHTML = header() + '<main id="main">' + body + '</main>' + footer() + (overlay === 'menu' ? menuHtml() : '') + (overlay === 'search' ? searchHtml() : '') + (overlay === 'zoom' ? zoomHtml() : '');
    document.title = titleFor(r);
    if (overlay === 'search') { var q = document.getElementById('q'); if (q) q.focus(); }
  }
  function zoomHtml() {
    var p = D.prods.find(function (x) { return x.id === gal.id; }); var a = p ? photos(p) : [];
    if (!a.length) return '';
    return '<div class="box" data-act="closebg"><img src="' + esc(a[gal.i].full) + '" alt=""><button class="x" data-act="close" aria-label="' + esc(t().close) + '">×</button>' + (a.length > 1 ? '<button class="p" data-act="prev" aria-label="←">‹</button><button class="n" data-act="next" aria-label="→">›</button>' : '') + '</div>';
  }

  /* ---------- événements ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]'); if (!el) return;
    var a = el.getAttribute('data-act'), v = el.getAttribute('data-v');
    if (a === 'closebg' && e.target !== el) return;
    if (a === 'menu') { overlay = 'menu'; render(); }
    else if (a === 'search') { overlay = 'search'; render(); }
    else if (a === 'close' || a === 'closebg') { overlay = ''; if (el.tagName === 'A') return; render(); }
    else if (a === 'lang') { lang = v === 'en' ? 'en' : 'fr'; LS.set('lang', lang); render(); }
    else if (a === 'tprev' || a === 'tnext') { var n = D.tem.length; tIdx = (tIdx + (a === 'tnext' ? 1 : n - 1)) % n; var tm = document.getElementById('tm'); if (tm) tm.innerHTML = temHtml(); }
    else if (a === 'retry') load();
    else if (a === 'st') { F.st = v; render(); }
    else if (a === 'gi') { gal.i = Number(v); render(); }
    else if (a === 'zoom') { overlay = 'zoom'; render(); }
    else if (a === 'prev' || a === 'next') {
      var p = D.prods.find(function (x) { return x.id === gal.id; }), n = p ? photos(p).length : 0;
      if (n) { gal.i = (gal.i + (a === 'next' ? 1 : n - 1)) % n; render(); }
    }
  });
  document.addEventListener('input', function (e) { if (e.target.id === 'q') results(e.target.value); });
  document.addEventListener('change', function (e) {
    var id = e.target.id;
    if (id === 'f-price') F.price = e.target.value; else if (id === 'f-surf') F.surf = e.target.value; else if (id === 'f-sort') F.sort = e.target.value; else return;
    var g = document.getElementById('grid'); if (g) g.innerHTML = gridHtml(g.getAttribute('data-slug'));
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay) { overlay = ''; render(); } });
  window.addEventListener('hashchange', function () { overlay = ''; window.scrollTo(0, 0); render(); });
  window.AURIAM_SITE = { render: render, load: load };
  render(); load();
})();
