// Génère des pages HTML statiques (une par produit et par catégorie), sitemap.xml et robots.txt.
// Lancé automatiquement par GitHub (voir .github/workflows/seo-pages.yml). Aucune dépendance.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'seo.config.json'), 'utf8'));
const SITE = CFG.siteUrl.replace(/\/+$/, '');
const NAME = CFG.siteName;

/* ---------- données ---------- */
async function loadData() {
  if (process.env.SEO_MOCK_FILE) return JSON.parse(fs.readFileSync(process.env.SEO_MOCK_FILE, 'utf8'));
  const conf = fs.readFileSync(path.join(ROOT, 'config.js'), 'utf8');
  const url = /url:\s*"([^"]+)"/.exec(conf)[1];
  const key = /key:\s*"([^"]+)"/.exec(conf)[1];
  const get = async (q) => {
    const r = await fetch(url + '/rest/v1/' + q, { headers: { apikey: key, Authorization: 'Bearer ' + key } });
    if (!r.ok) throw new Error('Supabase ' + q + ' -> ' + r.status);
    return r.json();
  };
  const [categories, products, settings] = await Promise.all([
    get('categories?select=*&order=sort_order'),
    get('products?select=*&order=sort_order,created_at'),
    get('settings?select=*')
  ]);
  return { categories, products, settings };
}

/* ---------- utilitaires ---------- */
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nl = (s) => esc(s).replace(/\n/g, '<br>');
const fr = (n) => Number(n).toLocaleString('fr-FR', { maximumFractionDigits: 2 });
const money = (n) => (n == null || n === '' ? 'Sur demande' : fr(n) + ' €');
const slugify = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70).replace(/-+$/, '');
const abs = (u) => (/^https?:\/\//.test(u) ? u : SITE + '/' + String(u).replace(/^\/+/, ''));
const clip = (s, n) => { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…'; };
const ld = (o) => '<script type="application/ld+json">' + JSON.stringify(o).replace(/</g, '\\u003c') + '</script>';
const digits = (s) => String(s || '').replace(/\D/g, '');
const txt = (p, k) => (p[k + '_fr'] && String(p[k + '_fr']).trim()) || (p[k + '_en'] && String(p[k + '_en']).trim()) || '';
const list = (p, k) => { const v = Array.isArray(p[k + '_fr']) && p[k + '_fr'].length ? p[k + '_fr'] : p[k + '_en']; return Array.isArray(v) ? v.filter(Boolean) : []; };
function photos(p) {
  const a = Array.isArray(p.photos) ? p.photos : [];
  const r = (u) => (u && !/^https?:\/\//.test(u) ? '/' + String(u).replace(/^\/+/, '') : u);
  return a.map((x) => (typeof x === 'string' ? { full: x, thumb: x } : { full: x.full || x.thumb, thumb: x.thumb || x.full })).filter((x) => x.full).map((x) => ({ full: r(x.full), thumb: r(x.thumb) }));
}

const D = await loadData();
const S = {}; (D.settings || []).forEach((x) => { S[x.key] = x.value; });
const cats = D.categories || [];

/* ---------- identité de l'entreprise (données structurées) ---------- */
const LEGAL = (() => { try { const t = fs.readFileSync(path.join(ROOT, 'js', 'legal.js'), 'utf8'); return JSON.parse(t.slice(t.indexOf('=') + 1).replace(/;\s*$/, '')); } catch (e) { return {}; } })();
const ORG = (() => {
  const o = {
    '@context': 'https://schema.org', '@type': 'Organization', '@id': SITE + '/#organisation',
    name: NAME, legalName: 'AURIAM HOME', url: SITE + '/', logo: SITE + '/logo-complet.webp', image: SITE + '/logo-complet.webp',
    description: 'Vente de maisons mobiles, de maisons conteneurs et de conteneurs maritimes, neufs et d’occasion, à ' + CFG.city + '.',
    address: { '@type': 'PostalAddress', streetAddress: CFG.street, postalCode: CFG.postalCode, addressLocality: CFG.city, addressRegion: CFG.region, addressCountry: CFG.country },
    vatID: 'FR67912244088', taxID: '91224408800016', iso6523Code: '0002:912244088',
    identifier: [{ '@type': 'PropertyValue', propertyID: 'SIREN', value: '912244088' }, { '@type': 'PropertyValue', propertyID: 'SIRET', value: '91224408800016' }],
    areaServed: 'Europe', foundingLocation: CFG.city
  };
  return o;
})();
const orgFull = () => {
  const o = JSON.parse(JSON.stringify(ORG));
  o['@type'] = ['Organization', 'LocalBusiness'];
  o.openingHoursSpecification = [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' }
  ];
  if (S.phone) o.telephone = String(S.phone);
  if (S.email) o.email = String(S.email);
  return o;
};

const prods = D.products || [];
const catName = (slug) => { const c = cats.find((x) => x.slug === slug); return c ? c.name_fr || c.name_en : slug; };

/* adresses : stables et uniques (titre + 6 derniers signes de l'identifiant) */
const used = new Set();
prods.forEach((p) => {
  const idPart = String(p.id ?? p.slug ?? '').replace(/[^a-z0-9]/gi, '').toLowerCase().slice(-6);
  let s = slugify(txt(p, 'title')) || 'produit';
  if (used.has(s)) s += '-' + idPart;
  while (used.has(s)) s += 'x';
  used.add(s); p._slug = s;
});
const pUrl = (p) => '/produits/' + p._slug + '/';
const cUrl = (c) => '/categories/' + c.slug + '/';

function waHref(msg) {
  const n = digits(S.whatsapp);
  return n ? 'https://wa.me/' + n + '?text=' + encodeURIComponent(msg) : null;
}
const spaLink = (hash) => '/#/' + hash;

const LOGO = 'data:image/png;base64,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';

/* ---------- gabarit ---------- */
function layout({ title, desc, path: p, ogImage, body, jsonld = [], type = 'website' }) {
  const canon = SITE + p;
  return '<!doctype html>\n<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + esc(title) + '</title><meta name="description" content="' + esc(desc) + '">' +
    '<link rel="canonical" href="' + esc(canon) + '"><meta name="theme-color" content="#14263F">' +
    '<meta property="og:site_name" content="' + esc(NAME) + '"><meta property="og:type" content="' + type + '"><meta property="og:locale" content="fr_FR">' +
    '<meta property="og:title" content="' + esc(title) + '"><meta property="og:description" content="' + esc(desc) + '"><meta property="og:url" content="' + esc(canon) + '">' +
    (ogImage ? '<meta property="og:image" content="' + esc(abs(ogImage)) + '"><meta name="twitter:card" content="summary_large_image">' : '') +
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml">' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap">' +
    '<link rel="stylesheet" href="/css/site.css"><style>.logo{flex-direction:column;align-items:center;gap:3px}.lf-logo{display:block;height:46px;width:auto}.logo span{display:flex;gap:8px;align-items:baseline}.logo b,.logo i{font-size:16px;letter-spacing:3px}.logo i{margin:0;font-weight:500}.seo-nav{display:flex;flex-wrap:wrap;gap:8px 18px;font-size:14px;font-weight:500}.pd .main{cursor:default}.th a{flex:none;width:76px;height:58px;border-radius:8px;overflow:hidden;background:#fff;border:2px solid transparent;display:block}.crumb{font-size:13px;color:var(--mut)}.crumb a{text-decoration:underline}</style>' +
    [orgFull()].concat(jsonld).map(ld).join('') + '</head><body>' +
    '<header class="top"><div class="wrap"><a class="logo" href="/" aria-label="' + esc(NAME) + '"><img class="lf-logo" src="' + LOGO + '" alt="" width="48" height="46"><span><b>AURIAM</b><i>HOME</i></span></a>' +
    '<nav class="seo-nav" aria-label="Navigation"><a href="/">Accueil</a><a href="/catalogue/">Catalogue</a><a href="/guides/">Guides</a></nav></div></header>' +
    '<main>' + body + '</main>' + footer() + '</body></html>\n';
}
function footer() {
  const wa = waHref('Bonjour AURIAM HOME, je souhaite des informations.');
  return '<footer class="foot"><div class="wrap"><div><b style="font-size:18px;letter-spacing:3px">AURIAM <span style="color:#C98A3D">HOME</span></b>Maisons mobiles, maisons conteneurs et conteneurs maritimes, neufs et d’occasion.</div>' +
    '<div><b>Contact</b>' + esc(CFG.street) + ', ' + esc(CFG.postalCode) + ' ' + esc(CFG.city) + '<br>' + (S.email ? '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a><br>' : '') + (S.phone ? esc(S.phone) + '<br>' : '') + (wa ? '<a href="' + esc(wa) + '" rel="noopener">WhatsApp</a>' : '<a href="/#/contact">Nous contacter</a>') + '</div>' +
    '<div><b>Informations</b><a href="/#/livraison">Livraison et délais</a><br><a href="/#/financement">Financement et paiement</a><br><a href="/mentions-legales/">Mentions légales</a><br><a href="/conditions-generales-de-vente/">Conditions générales de vente</a></div></div><div class="c">© ' + esc(NAME) + ' – SASU</div></footer>';
}
function card(p) {
  const ph = photos(p)[0];
  const sp = specs(p);
  return '<a class="card" href="' + pUrl(p) + '">' + (ph ? '<div class="ph"><img loading="lazy" src="' + esc(ph.thumb) + '" alt="' + esc(txt(p, 'title')) + '"></div>' : '<div class="ph"></div>') +
    '<div class="cb"><span class="badge">' + esc(badge(p)) + '</span><h3>' + esc(txt(p, 'title')) + '</h3><p class="sp">' + esc(sp) + '</p><p class="pr">' + esc(money(p.price)) + '</p></div></a>';
}
function badge(p) {
  const y = p.year ? ' · ' + p.year : '';
  return (p.category === 'neuve' ? 'Neuve' : p.category === 'occasion' ? 'Occasion' : catName(p.category)) + y;
}
const dims = (p) => (p.length_m && p.width_m ? fr(p.length_m) + ' × ' + fr(p.width_m) + ' m' : '');
function specs(p) {
  const a = [];
  if (dims(p)) a.push(dims(p));
  if (p.surface_m2) a.push(fr(p.surface_m2) + ' m²');
  if (p.bedrooms) a.push(p.bedrooms + (p.bedrooms > 1 ? ' chambres' : ' chambre'));
  return a.join(' · ');
}

/* ---------- pages ---------- */
const files = new Map(); // chemin -> contenu
const urls = [{ loc: '/', pr: '1.0' }];

function productPage(p) {
  const title = txt(p, 'title'), ph = photos(p), d = txt(p, 'desc'), url = pUrl(p);
  const catSlug = p.category, catObj = cats.find((c) => c.slug === catSlug);
  const rows = [['État', p.category === 'neuve' ? 'Neuf' : p.category === 'occasion' ? 'Occasion' : catName(p.category)]];
  if (p.year) rows.push(['Année', p.year]);
  if (dims(p)) rows.push(['Dimensions', dims(p)]);
  if (p.surface_m2) rows.push(['Surface', fr(p.surface_m2) + ' m²']);
  if (p.bedrooms) rows.push(['Chambres', p.bedrooms]);
  const feat = list(p, 'features'), eq = list(p, 'equipment');
  const sim = prods.filter((x) => x.category === p.category && x !== p).slice(0, 3);
  const wa = waHref('Bonjour AURIAM HOME, je souhaite un devis pour : ' + title + (p.price ? ' (' + money(p.price) + ')' : '') + '.');
  const metaDesc = clip(title + ' – ' + [p.year, specs(p), p.price ? money(p.price) : ''].filter(Boolean).join(', ') + '. ' + d, 158);
  let h = '<section class="wrap" style="padding-top:28px"><p class="crumb"><a href="/">Accueil</a> › ' + (catObj ? '<a href="' + cUrl(catObj) + '">' + esc(catName(catSlug)) + '</a>' : esc(catName(catSlug))) + '</p><div class="pd"><div class="g">';
  h += ph[0] ? '<img class="main" src="' + esc(ph[0].full) + '" alt="' + esc(title) + '">' : '';
  if (ph.length > 1) h += '<div class="th">' + ph.map((x, i) => '<a href="' + esc(x.full) + '" target="_blank" rel="noopener"><img loading="lazy" src="' + esc(x.thumb) + '" alt="' + esc(title + ' – photo ' + (i + 1)) + '" style="width:100%;height:100%;object-fit:cover"></a>').join('') + '</div>';
  h += '</div><div class="i"><span class="badge">' + esc(badge(p)) + '</span><h1>' + esc(title) + '</h1><div class="price">' + esc(money(p.price)) + '</div>' + (p.price ? '<div class="note">Prix indicatif, livraison et TVA non incluses.</div>' : '<div class="note"></div>');
  if (d) h += '<p class="desc">' + nl(d) + '</p>';
  h += '<div class="spec">' + rows.map((r) => '<div><span>' + esc(r[0]) + '</span><span>' + esc(r[1]) + '</span></div>').join('') + '</div>';
  if (feat.length) h += '<div class="lst-t">Caractéristiques</div><ul class="lst">' + feat.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>';
  if (eq.length) h += '<div class="lst-t">Équipements</div><ul class="lst">' + eq.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>';
  h += '<a class="btn wa" href="' + esc(wa || '/#/contact') + '"' + (wa ? ' target="_blank" rel="noopener"' : '') + '>Demander un devis sur WhatsApp</a><div class="note" style="margin-top:10px">Le devis est gratuit et valable 30 jours.</div>';
  h += '<p style="margin-top:14px"><a class="btn cu" href="' + spaLink('p/' + encodeURIComponent(p.id)) + '">Voir sur le site</a></p></div></div></section>';
  if (sim.length) h += '<section class="wrap sec"><h2 style="font-size:22px">Dans la même catégorie</h2><div class="grid">' + sim.map(card).join('') + '</div></section>';
  const product = {
    '@context': 'https://schema.org', '@type': 'Product', name: title, description: clip(d || title, 500),
    sku: String(p.id ?? p._slug), url: SITE + url, brand: { '@type': 'Brand', name: NAME },
    category: catName(catSlug)
  };
  if (ph.length) product.image = ph.slice(0, 8).map((x) => abs(x.full));
  if (p.price) {
    product.offers = {
      '@type': 'Offer', url: SITE + url, price: String(Number(p.price)), priceCurrency: 'EUR', availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: NAME }
    };
    if (p.category === 'neuve') product.offers.itemCondition = 'https://schema.org/NewCondition';
    if (p.category === 'occasion') product.offers.itemCondition = 'https://schema.org/UsedCondition';
  }
  if (p.year) product.productionDate = String(p.year);
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE + '/' },
    { '@type': 'ListItem', position: 2, name: catName(catSlug), item: SITE + (catObj ? cUrl(catObj) : '/catalogue/') },
    { '@type': 'ListItem', position: 3, name: title, item: SITE + url }] };
  files.set(url + 'index.html', layout({ title: title + ' – ' + (p.category === 'neuve' ? 'Neuf' : p.category === 'occasion' ? 'Occasion' : catName(catSlug)) + ' | ' + NAME + ' ' + CFG.city, desc: metaDesc, path: url, ogImage: ph[0] && ph[0].full, body: h, jsonld: [product, crumbs], type: 'product' }));
  urls.push({ loc: url, pr: '0.8' });
}

const CAT_INTRO = {
  neuve: 'Mobil-homes neufs : maisons mobiles de plusieurs tailles, livrées et installées, avec financement échelonné possible.',
  occasion: 'Mobil-homes d’occasion en bon état, à prix avantageux, livrés et installés sur votre terrain.'
};
function categoryPage(c) {
  const list_ = prods.filter((p) => p.category === c.slug);
  const name = c.name_fr || c.name_en, url = cUrl(c);
  const intro = CAT_INTRO[c.slug] || (name + ' proposés par ' + NAME + ' à ' + CFG.city + ' : livraison en Europe, installation et financement échelonné possible.');
  const desc = clip(name + ' à ' + CFG.city + ' (' + CFG.region + ') – ' + list_.length + (list_.length > 1 ? ' produits' : ' produit') + '. ' + intro, 158);
  let h = '<section class="wrap" style="padding-top:28px"><p class="crumb"><a href="/">Accueil</a> › <a href="/catalogue/">Catalogue</a></p><h1 class="pt">' + esc(name) + '</h1><p class="sub">' + esc(intro) + '</p>';
  h += '<div class="filters">' + cats.map((x) => '<a class="chip' + (x.slug === c.slug ? ' on' : '') + '" href="' + cUrl(x) + '">' + esc(x.name_fr || x.name_en) + '</a>').join('') + '</div>';
  h += list_.length ? '<div class="grid">' + list_.map(card).join('') + '</div>' : '<div class="empty">Aucun produit dans cette catégorie pour le moment.</div>';
  h += '<p style="margin-top:22px"><a class="btn cu" href="' + spaLink('c/' + encodeURIComponent(c.slug)) + '">Filtrer et trier sur le site</a></p></section>';
  const itemList = { '@context': 'https://schema.org', '@type': 'CollectionPage', name, url: SITE + url, mainEntity: { '@type': 'ItemList', itemListElement: list_.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + pUrl(p), name: txt(p, 'title') })) } };
  const first = list_.map((p) => photos(p)[0]).find(Boolean);
  files.set(url + 'index.html', layout({ title: name + ' à ' + CFG.city + ' – ' + NAME, desc, path: url, ogImage: first && first.full, body: h, jsonld: [itemList] }));
  urls.push({ loc: url, pr: '0.9' });
}

function cataloguePage() {
  let h = '<section class="wrap" style="padding-top:28px"><h1 class="pt">Catalogue – maisons mobiles et conteneurs</h1><p class="sub">Tous les produits ' + esc(NAME) + ', neufs et d’occasion, à ' + esc(CFG.city) + '.</p>';
  cats.forEach((c) => {
    const l = prods.filter((p) => p.category === c.slug);
    if (!l.length) return;
    h += '<h2 style="font-size:22px;margin:26px 0 14px"><a href="' + cUrl(c) + '">' + esc(c.name_fr || c.name_en) + '</a></h2><div class="grid">' + l.map(card).join('') + '</div>';
  });
  h += '</section>';
  files.set('/catalogue/index.html', layout({ title: 'Catalogue : maisons mobiles, maisons conteneurs, conteneurs – ' + NAME, desc: clip('Tous les produits ' + NAME + ' à ' + CFG.city + ' : mobil-homes neufs et d’occasion, maisons conteneurs, conteneurs maritimes. Livraison en Europe.', 158), path: '/catalogue/', body: h }));
  urls.push({ loc: '/catalogue/', pr: '0.9' });
}


/* ---------- guides d'achat ---------- */
const GUIDE_DATE = '2026-10-30';
const GUIDES = [
{ slug: 'acheter-un-mobil-home', title: 'Comment acheter un mobil-home : les étapes de A à Z',
  desc: 'Du choix du modèle au paiement et à la livraison : toutes les étapes pour acheter un mobil-home neuf ou d’occasion sans mauvaise surprise.',
  intro: 'Acheter un mobil-home est plus simple qu’on ne l’imagine, à condition de suivre les bonnes étapes dans le bon ordre. Voici la marche à suivre, de la première idée jusqu’à l’installation sur votre terrain.',
  sections: [
  ['1. Définir votre projet', '<p>Avant de regarder les annonces, répondez à quelques questions : combien de personnes vont y vivre ou y séjourner, pour quelle durée dans l’année, et sur quel terrain ? Une résidence secondaire de vacances et un logement à l’année n’ont pas les mêmes besoins en surface, en isolation ni en équipements.</p><ul><li>Nombre de chambres nécessaires.</li><li>Surface souhaitée et dimensions compatibles avec votre terrain (longueur, largeur).</li><li>Budget global : prix du mobil-home, transport, préparation du terrain, raccordements.</li></ul>'],
  ['2. Choisir entre neuf et occasion', '<p>Le neuf offre des équipements récents et une garantie constructeur. L’occasion permet d’accéder à une surface plus grande pour le même budget. Notre guide <a href="/guides/neuf-ou-occasion/">neuf ou occasion</a> détaille les avantages de chaque option.</p>'],
  ['3. Vérifier ce que permet votre terrain', '<p>Avant tout achat, renseignez-vous auprès de votre mairie : le plan local d’urbanisme (PLU) fixe ce qui est autorisé sur votre parcelle. Lisez notre guide sur <a href="/guides/autorisations-installation-mobil-home/">les autorisations d’installation</a>.</p>'],
  ['4. Demander un devis', '<p>Précisez le modèle qui vous intéresse et le lieu de livraison. Un devis clair indique le prix du produit, le coût du transport et les conditions de paiement. Chez AURIAM HOME, le devis est gratuit et valable 30 jours.</p>'],
  ['5. Choisir le mode de paiement', '<p>Deux solutions existent chez AURIAM HOME :</p><ul><li><strong>Paiement comptant :</strong> avant le départ du camion, 100 % des frais de transport et 20 % du prix du produit ; sur votre terrain, après vérification de l’état du produit, les 80 % restants et la TVA.</li><li><strong>Paiement échelonné :</strong> 100 % des frais de transport avant la livraison, 30 % du prix du produit à la livraison, puis les 70 % restants et la TVA en plusieurs versements jusqu’à 36 mois, sous réserve d’acceptation du dossier et selon le contrat signé.</li></ul>'],
  ['6. Préparer le terrain', '<p>L’accès du camion, une surface plane et les raccordements (eau, électricité, évacuation) doivent être prévus avant la livraison. Voir <a href="/guides/livraison-installation-mobil-home/">livraison et installation</a>.</p>'],
  ['7. Recevoir et contrôler la livraison', '<p>À l’arrivée, vous vérifiez le produit en présence du transporteur et vous signez un procès-verbal de livraison. Le solde est dû après ce contrôle.</p>']
  ], related: ['neuf-ou-occasion', 'mobil-home-occasion-verifications', 'livraison-installation-mobil-home'] },

{ slug: 'neuf-ou-occasion', title: 'Mobil-home neuf ou d’occasion : lequel choisir ?',
  desc: 'Avantages, limites et budget : comparez un mobil-home neuf et un mobil-home d’occasion pour faire le bon choix selon votre projet.',
  intro: 'Neuf ou d’occasion ? Il n’y a pas de bonne réponse universelle : tout dépend de votre budget, de l’usage prévu et de la surface dont vous avez besoin.',
  sections: [
  ['Le mobil-home neuf', '<ul><li>Équipements et finitions récents, aucune usure.</li><li>Choix des dernières conceptions, souvent mieux isolées.</li><li>Garantie constructeur.</li><li>Un prix plus élevé à surface équivalente.</li></ul><p>Le neuf convient particulièrement à un usage à l’année ou à un projet que l’on veut garder longtemps.</p>'],
  ['Le mobil-home d’occasion', '<ul><li>Un budget plus accessible, ou une surface plus grande pour le même prix.</li><li>Un modèle déjà éprouvé, que l’on peut visiter et examiner.</li><li>Un état à contrôler soigneusement : voir <a href="/guides/mobil-home-occasion-verifications/">les points à vérifier</a>.</li></ul><p>L’occasion est une excellente option pour une résidence de loisirs, un premier projet ou un budget serré.</p>'],
  ['Comment décider', '<ul><li><strong>Usage à l’année :</strong> privilégiez un modèle récent et bien isolé, neuf ou d’occasion récent.</li><li><strong>Usage de vacances :</strong> l’occasion en bon état est souvent le meilleur rapport qualité/prix.</li><li><strong>Budget limité :</strong> comparez bien le coût total, transport et préparation du terrain compris.</li></ul>'],
  ['Parcourir nos modèles', '<p>Retrouvez nos <a href="/categories/neuve/">mobil-homes neufs</a> et nos <a href="/categories/occasion/">mobil-homes d’occasion</a>. Pour un conseil adapté à votre projet, contactez-nous.</p>']
  ], related: ['acheter-un-mobil-home', 'mobil-home-occasion-verifications', 'autorisations-installation-mobil-home'] },

{ slug: 'mobil-home-occasion-verifications', title: 'Mobil-home d’occasion : 10 points à vérifier avant d’acheter',
  desc: 'Structure, toiture, humidité, électricité, plomberie, papiers : la liste des contrôles à faire avant d’acheter un mobil-home d’occasion.',
  intro: 'Un mobil-home d’occasion bien entretenu peut durer de nombreuses années. Cette liste vous aide à repérer l’essentiel avant de vous engager. N’hésitez pas à vous faire accompagner et à poser toutes vos questions au vendeur.',
  sections: [
  ['Structure et extérieur', '<ol><li><strong>Le châssis :</strong> recherchez la rouille importante, les déformations ou les soudures abîmées sous le mobil-home.</li><li><strong>Le bardage :</strong> fissures, panneaux gonflés, traces d’humidité.</li><li><strong>La toiture :</strong> état des tôles ou du revêtement, joints, gouttières.</li><li><strong>Les menuiseries :</strong> portes et fenêtres qui ferment bien, joints en bon état.</li></ol>'],
  ['Intérieur', '<ol start="5"><li><strong>Le plancher :</strong> marchez partout ; un sol qui plie ou qui sonne creux peut signaler de l’humidité.</li><li><strong>Les murs et plafonds :</strong> taches, auréoles ou odeur de moisi.</li><li><strong>L’isolation et la ventilation :</strong> indispensables pour un usage à l’année.</li></ol>'],
  ['Installations techniques', '<ol start="8"><li><strong>L’électricité :</strong> tableau, prises, mise à la terre. Faites vérifier par un professionnel si vous avez un doute.</li><li><strong>La plomberie et le gaz :</strong> robinets, évacuations, chauffe-eau, absence de fuite ; pour le gaz, vérifiez l’état des tuyaux et des appareils.</li></ol>'],
  ['Les papiers', '<ol start="10"><li><strong>Les documents :</strong> identité du vendeur, année de fabrication, plaque ou numéro du constructeur quand il existe, facture ou acte de cession.</li></ol><p>Demandez aussi les dimensions exactes afin de vérifier que le transport et l’installation sont possibles sur votre terrain.</p>'],
  ['Notre conseil', '<p>Comparez toujours le prix avec le coût total : transport, préparation du terrain et éventuels travaux. Consultez nos <a href="/categories/occasion/">mobil-homes d’occasion</a> : chaque fiche détaille l’année, les dimensions et les équipements.</p>']
  ], related: ['neuf-ou-occasion', 'acheter-un-mobil-home', 'livraison-installation-mobil-home'] },

{ slug: 'autorisations-installation-mobil-home', title: 'Installer un mobil-home sur son terrain : autorisations à connaître',
  desc: 'Mairie, PLU, déclaration préalable, permis de construire : les règles générales à vérifier avant d’installer un mobil-home sur un terrain.',
  intro: 'Les règles d’installation d’un mobil-home dépendent de votre commune, de votre terrain et de la manière dont il est installé. Ce guide donne les repères généraux ; la mairie reste la seule référence pour votre parcelle.',
  sections: [
  ['Commencez par la mairie et le PLU', '<p>Chaque commune applique un plan local d’urbanisme (PLU) ou, à défaut, le règlement national d’urbanisme. C’est lui qui dit ce qui est autorisé sur votre terrain : habitation, résidence de loisirs, hauteur, aspect extérieur. Demandez un certificat d’urbanisme ou renseignez-vous auprès du service urbanisme avant d’acheter.</p>'],
  ['Les principes généraux', '<p>D’après les informations publiées par <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F31477" rel="noopener">service-public.gouv.fr</a> :</p><ul><li>Un mobil-home qui conserve ses roues et sa barre de traction ne peut pas être installé dans un simple jardin : il est réservé aux parcs résidentiels de loisirs, villages de vacances classés et campings.</li><li>Un mobil-home installé sans roues ni barre de traction est considéré comme une construction : une déclaration préalable est demandée jusqu’à 20 m² de surface de plancher ou d’emprise au sol, un permis de construire au-delà.</li></ul><p>Ces règles peuvent évoluer et être complétées par les règles locales : vérifiez toujours leur application à votre cas.</p>'],
  ['Les démarches', '<ul><li>Déposez le dossier (déclaration préalable ou permis) en mairie, avec plans et photos.</li><li>Comptez environ un mois pour une déclaration préalable et deux mois pour un permis de construire, parfois davantage en zone protégée.</li><li>Prévoyez les raccordements : eau, électricité, assainissement.</li></ul>'],
  ['Responsabilité de l’acheteur', '<p>L’obtention des autorisations nécessaires (urbanisme, raccordements) est de la responsabilité de l’acheteur. Nous vous conseillons de les vérifier avant de passer commande. Pour la livraison, consultez notre page <a href="/guides/livraison-installation-mobil-home/">livraison et installation</a>.</p>'],
  ['Besoin d’un conseil ?', '<p>Dites-nous où se situe votre terrain et le modèle envisagé : nous vous indiquons les dimensions, les conditions de livraison et les points à vérifier auprès de votre mairie.</p>']
  ], related: ['acheter-un-mobil-home', 'livraison-installation-mobil-home', 'maison-conteneur-autorisations'] },

{ slug: 'livraison-installation-mobil-home', title: 'Livraison et installation d’un mobil-home : délais, accès, terrain',
  desc: 'Convoi exceptionnel, délais de 7 à 10 jours ou 2 à 3 semaines, accès au terrain, préparation et contrôle à la livraison : tout savoir.',
  intro: 'La livraison d’un mobil-home est une opération qui se prépare. Voici comment elle se déroule chez AURIAM HOME et ce que vous devez prévoir.',
  sections: [
  ['Le transport', '<p>Le transport se fait en convoi exceptionnel. Son coût dépend de la destination ; il est indiqué dans votre devis. Nous livrons partout en Europe, et hors Union européenne sur devis.</p>'],
  ['Les délais', '<ul><li><strong>7 à 10 jours</strong> pour une livraison dédiée.</li><li><strong>2 à 3 semaines</strong> pour une livraison groupée, à tarif avantageux.</li><li>Le délai commence à la réception de l’acompte.</li></ul>'],
  ['Déchargement et installation', '<p>AURIAM HOME réalise gratuitement le déchargement et l’installation. Un plan de préparation du terrain vous est envoyé avant la livraison ; la préparation du terrain reste à votre charge. En cas d’accès difficile nécessitant une grue, vous louez une grue locale à vos frais.</p>'],
  ['Ce qu’il faut prévoir', '<ul><li>Un accès praticable pour un convoi (largeur, virages, branches, portails).</li><li>Une surface plane et stable.</li><li>Les autorisations nécessaires (voir <a href="/guides/autorisations-installation-mobil-home/">les autorisations d’installation</a>).</li><li>Les raccordements : eau, électricité, évacuation.</li></ul>'],
  ['À la livraison', '<p>Vous contrôlez le produit en présence du transporteur et vous signez un procès-verbal de livraison. Le solde est dû après ce contrôle. Hors Union européenne, les droits de douane, la TVA à l’importation et les formalités sont à votre charge, sauf mention contraire dans le devis.</p>'],
  ['Le détail', '<p>Retrouvez toutes les conditions sur notre page <a href="/#/livraison">livraison et délais</a>.</p>']
  ], related: ['acheter-un-mobil-home', 'autorisations-installation-mobil-home', 'neuf-ou-occasion'] },

{ slug: 'maison-conteneur-autorisations', title: 'Maison conteneur : autorisations et points clés avant de se lancer',
  desc: 'Conteneur maritime aménagé : seuils de surface, déclaration préalable, permis de construire, isolation. Les repères avant de vous lancer.',
  intro: 'Transformer un conteneur maritime en logement séduit de plus en plus de personnes. Comme toute construction, il suit des règles d’urbanisme. Voici les repères généraux.',
  sections: [
  ['Un conteneur installé durablement est une construction', '<p>Dès qu’un conteneur reste en place de façon durable, il est généralement traité comme une construction. Les démarches dépendent de la surface créée et de la zone où se trouve votre terrain.</p>'],
  ['Les seuils habituels', '<ul><li>Jusqu’à 5 m² : en général aucune formalité, hors secteur protégé.</li><li>De 5 à 20 m² : déclaration préalable.</li><li>De 20 à 40 m² : déclaration préalable en zone urbaine couverte par un PLU, permis de construire ailleurs.</li><li>Au-delà de 40 m² : permis de construire.</li></ul><p>À titre d’ordre de grandeur, un conteneur de 20 pieds représente environ 14 m² et un conteneur de 40 pieds environ 28 à 30 m². Ces seuils sont indicatifs : confirmez-les auprès de votre mairie et vérifiez le règlement du PLU (aspect extérieur, toiture, implantation).</p>'],
  ['Isolation et confort', '<p>L’acier conduit la chaleur et le froid : une isolation soignée, une ventilation efficace et le traitement des ponts thermiques sont indispensables pour un logement confortable.</p>'],
  ['Le choix du conteneur', '<p>Selon le projet, on choisit un conteneur neuf (« one trip ») ou d’occasion, standard ou High Cube (plus haut, donc plus confortable à aménager). Contrôlez l’état de la structure, du plancher et des portes.</p>'],
  ['Nos conteneurs et maisons conteneurs', '<p>Découvrez notre sélection de <a href="/catalogue/">conteneurs maritimes et maisons conteneurs</a>, ou contactez-nous pour parler de votre projet.</p>']
  ], related: ['autorisations-installation-mobil-home', 'acheter-un-mobil-home', 'livraison-installation-mobil-home'] }
];
const gUrl = (g) => '/guides/' + g.slug + '/';

function guidePage(g) {
  const url = gUrl(g);
  const wa = waHref('Bonjour AURIAM HOME, j’ai lu votre guide « ' + g.title + ' » et j’ai une question.');
  let h = '<section class="doc"><p class="crumb"><a href="/">Accueil</a> › <a href="/guides/">Guides d’achat</a></p><h1>' + esc(g.title) + '</h1><p>' + esc(g.intro) + '</p>';
  g.sections.forEach(([t, body]) => { h += '<h2>' + esc(t) + '</h2>' + body; });
  h += '<p><a class="btn wa" style="width:auto" href="' + esc(wa || '/#/contact') + '"' + (wa ? ' target="_blank" rel="noopener"' : '') + '>Poser une question sur WhatsApp</a></p>';
  const rel = g.related.map((s) => GUIDES.find((x) => x.slug === s)).filter(Boolean);
  if (rel.length) h += '<h2>À lire aussi</h2><ul>' + rel.map((r) => '<li><a href="' + gUrl(r) + '">' + esc(r.title) + '</a></li>').join('') + '</ul>';
  h += '<p class="note" style="margin-top:18px">Ce guide donne des informations générales et ne remplace pas l’avis de votre mairie ni celui d’un professionnel.</p></section>';
  const art = { '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.desc, datePublished: GUIDE_DATE, dateModified: GUIDE_DATE, inLanguage: 'fr', mainEntityOfPage: SITE + url,
    author: { '@type': 'Organization', name: NAME }, publisher: { '@type': 'Organization', name: NAME } };
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE + '/' },
    { '@type': 'ListItem', position: 2, name: 'Guides d’achat', item: SITE + '/guides/' },
    { '@type': 'ListItem', position: 3, name: g.title, item: SITE + url }] };
  files.set(url + 'index.html', layout({ title: g.title + ' | ' + NAME, desc: clip(g.desc, 158), path: url, body: h, jsonld: [art, crumbs], type: 'article' }));
  urls.push({ loc: url, pr: '0.7' });
}
function guidesIndex() {
  let h = '<section class="doc"><p class="crumb"><a href="/">Accueil</a></p><h1>Guides d’achat : mobil-homes et conteneurs</h1><p>Conseils pratiques pour acheter, faire livrer et installer un mobil-home ou une maison conteneur, par l’équipe ' + esc(NAME) + ' à ' + esc(CFG.city) + '.</p><ul>';
  GUIDES.forEach((g) => { h += '<li style="margin-bottom:12px"><a href="' + gUrl(g) + '"><strong>' + esc(g.title) + '</strong></a><br>' + esc(g.desc) + '</li>'; });
  h += '</ul></section>';
  files.set('/guides/index.html', layout({ title: 'Guides d’achat mobil-home et maison conteneur | ' + NAME, desc: clip('Guides pratiques pour acheter, faire livrer et installer un mobil-home ou une maison conteneur : neuf ou occasion, autorisations, livraison.', 158), path: '/guides/', body: h }));
  urls.push({ loc: '/guides/', pr: '0.8' });
}


/* ---------- pages légales statiques ---------- */
function legalHtml(name) {
  let h = (LEGAL.fr && LEGAL.fr[name]) || '';
  if (!h) return '';
  const parts = [];
  if (S.email) parts.push(esc(S.email));
  if (S.phone) parts.push(esc(S.phone));
  if (S.whatsapp) parts.push('WhatsApp : ' + esc(S.whatsapp));
  h = h.replace(/Contact\s*:\s*\{\{email\}\}\s*·\s*\{\{phone\}\}\s*·\s*WhatsApp\s*:\s*\{\{wa\}\}/g, 'Contact : ' + (parts.join(' · ') || 'via le formulaire de contact du site'));
  h = h.replace(/\{\{email\}\}/g, S.email ? esc(S.email) : 'notre page contact').replace(/\{\{phone\}\}/g, S.phone ? esc(S.phone) : '').replace(/\{\{wa\}\}/g, S.whatsapp ? esc(S.whatsapp) : '');
  return h.replace('<h2>', '<h1>').replace('</h2>', '</h1>');
}
function legalPage(name, slug, title, desc) {
  const body = legalHtml(name); if (!body) return;
  const url = '/' + slug + '/';
  const h = '<section class="doc"><p class="crumb"><a href="/">Accueil</a></p>' + body + '</section>';
  files.set(url + 'index.html', layout({ title: title + ' | ' + NAME, desc, path: url, body: h }));
  urls.push({ loc: url, pr: '0.4' });
}

cats.forEach(categoryPage);
guidesIndex();
GUIDES.forEach(guidePage);
legalPage('mentions', 'mentions-legales', 'Mentions légales', 'Mentions légales d’AURIAM HOME, SASU à Périgueux : éditeur, SIREN, SIRET, TVA intracommunautaire, RCS, hébergement et données personnelles.');
legalPage('cgv', 'conditions-generales-de-vente', 'Conditions générales de vente', 'Conditions générales de vente d’AURIAM HOME : commande, paiement comptant ou échelonné, livraison, installation, garanties.');
prods.forEach(productPage);
cataloguePage();

/* ---------- écriture ---------- */
for (const dir of ['produits', 'categories', 'catalogue', 'guides', 'mentions-legales', 'conditions-generales-de-vente']) fs.rmSync(path.join(ROOT, dir), { recursive: true, force: true });
for (const [p, content] of files) {
  const f = path.join(ROOT, p);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
}
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => '  <url><loc>' + esc(SITE + u.loc) + '</loc><priority>' + u.pr + '</priority></url>').join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(ROOT, 'robots.txt'), 'User-agent: *\nDisallow: /admin.html\n\nSitemap: ' + SITE + '/sitemap.xml\n');

/* ---------- carte d'identité dans la page d'accueil (idempotent) ---------- */
try {
  const ix = path.join(ROOT, 'index.html');
  if (fs.existsSync(ix)) {
    let t = fs.readFileSync(ix, 'utf8');
    const block = '<!--org-start-->' + ld(orgFull()) + '<link rel="canonical" href="' + SITE + '/"><!--org-end-->';
    t = t.replace(/<!--org-start-->[\s\S]*?<!--org-end-->\n?/, '');
    if (t.includes('</head>')) { t = t.replace('</head>', block + '\n</head>'); fs.writeFileSync(ix, t); }
  }
} catch (e) { console.log('index.html non modifié : ' + e.message); }

console.log('OK : ' + prods.length + ' produits, ' + cats.length + ' catégories, ' + urls.length + ' adresses.');
