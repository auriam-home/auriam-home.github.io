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
    '<link rel="stylesheet" href="/css/site.css"><style>.seo-nav{display:flex;flex-wrap:wrap;gap:8px 18px;font-size:14px;font-weight:500}.pd .main{cursor:default}.th a{flex:none;width:76px;height:58px;border-radius:8px;overflow:hidden;background:#fff;border:2px solid transparent;display:block}.crumb{font-size:13px;color:var(--mut)}.crumb a{text-decoration:underline}</style>' +
    jsonld.map(ld).join('') + '</head><body>' +
    '<header class="top"><div class="wrap"><a class="logo" href="/" aria-label="' + esc(NAME) + '"><svg width="44" height="44" viewBox="0 0 100 100" aria-hidden="true"><path d="M12 90 L50 14 L88 90" fill="none" stroke="#14263F" stroke-width="14"/><rect x="27" y="54" width="46" height="23" fill="#C98A3D"/><path d="M38.5 54V77M50 54V77M61.5 54V77" stroke="#fff" stroke-width="2.5"/></svg><span><b>AURIAM</b><i>HOME</i></span></a>' +
    '<nav class="seo-nav" aria-label="Navigation"><a href="/">Accueil</a><a href="/catalogue/">Catalogue</a></nav></div></header>' +
    '<main>' + body + '</main>' + footer() + '</body></html>\n';
}
function footer() {
  const wa = waHref('Bonjour AURIAM HOME, je souhaite des informations.');
  return '<footer class="foot"><div class="wrap"><div><b style="font-size:18px;letter-spacing:3px">AURIAM <span style="color:#C98A3D">HOME</span></b>Maisons mobiles, maisons conteneurs et conteneurs maritimes, neufs et d’occasion.</div>' +
    '<div><b>Contact</b>' + esc(CFG.street) + ', ' + esc(CFG.postalCode) + ' ' + esc(CFG.city) + '<br>' + (S.email ? '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a><br>' : '') + (S.phone ? esc(S.phone) + '<br>' : '') + (wa ? '<a href="' + esc(wa) + '" rel="noopener">WhatsApp</a>' : '<a href="/#/contact">Nous contacter</a>') + '</div>' +
    '<div><b>Informations</b><a href="/#/livraison">Livraison et délais</a><br><a href="/#/financement">Financement et paiement</a><br><a href="/#/mentions">Mentions légales</a><br><a href="/#/cgv">Conditions générales de vente</a></div></div><div class="c">© ' + esc(NAME) + ' – SASU</div></footer>';
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

cats.forEach(categoryPage);
prods.forEach(productPage);
cataloguePage();

/* ---------- écriture ---------- */
for (const dir of ['produits', 'categories', 'catalogue']) fs.rmSync(path.join(ROOT, dir), { recursive: true, force: true });
for (const [p, content] of files) {
  const f = path.join(ROOT, p);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
}
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => '  <url><loc>' + esc(SITE + u.loc) + '</loc><priority>' + u.pr + '</priority></url>').join('\n') + '\n</urlset>\n');
fs.writeFileSync(path.join(ROOT, 'robots.txt'), 'User-agent: *\nDisallow: /admin.html\n\nSitemap: ' + SITE + '/sitemap.xml\n');
console.log('OK : ' + prods.length + ' produits, ' + cats.length + ' catégories, ' + urls.length + ' adresses.');
