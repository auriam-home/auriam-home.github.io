(function () {
  'use strict';
  var C = window.AURIAM_CONFIG || {};
  var sb = window.supabase.createClient(C.url, C.key);
  var root = document.getElementById('adm');
  var st = { user: null, tab: 'prod', prods: [], cats: [], tem: [], set: {}, edit: null, msg: null, busy: false };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function flash(t, ok) { st.msg = { t: t, ok: ok !== false }; render(); window.scrollTo(0, 0); }
  function val(id) { var e = document.getElementById(id); return e ? e.value : ''; }
  function nz(v) { v = String(v).trim().replace(',', '.'); return v === '' ? null : Number(v); }
  function lines(v) { return String(v).split('\n').map(function (x) { return x.trim(); }).filter(Boolean); }
  function pth(x) { return typeof x === 'string' ? x : (x.thumb || x.full); }
  function msgHtml() { return st.msg ? '<div class="msg ' + (st.msg.ok ? 'ok' : 'er') + '">' + esc(st.msg.t) + '</div>' : ''; }

  /* ---------- données ---------- */
  function loadAll() {
    return Promise.all([
      sb.from('categories').select('*').order('sort_order'),
      sb.from('products').select('*').order('sort_order').order('created_at'),
      sb.from('settings').select('*'),
      sb.from('testimonials').select('*').order('sort_order').order('created_at')
    ]).then(function (r) {
      st.tem = r[3] && !r[3].error ? r[3].data || [] : []; st.temErr = r[3] && r[3].error ? r[3].error.message : null;
      if (r[0].error) throw r[0].error; if (r[1].error) throw r[1].error;
      st.cats = r[0].data || []; st.prods = r[1].data || [];
      st.set = {}; (r[2].data || []).forEach(function (x) { st.set[x.key] = x.value; });
      st.settingsErr = r[2].error ? r[2].error.message : null; st.vlist = null;
    });
  }
  function boot() {
    sb.auth.getSession().then(function (r) {
      st.user = r.data && r.data.session ? r.data.session.user : null;
      if (st.user) return loadAll();
    }).then(render).catch(function (e) { st.msg = { t: 'Erreur : ' + (e.message || e), ok: false }; render(); });
  }

  /* ---------- vues ---------- */
  function login() {
    return '<div class="ad" style="max-width:420px;padding-top:48px"><h1>Administration AURIAM HOME</h1>' + msgHtml() +
      '<label for="em">E-mail</label><input id="em" type="email" autocomplete="username" inputmode="email">' +
      '<label for="pw">Mot de passe</label><input id="pw" type="password" autocomplete="current-password">' +
      '<div style="height:16px"></div><button class="btn cu" style="width:100%" data-a="login">Se connecter</button></div>';
  }
  function head() {
    return '<div class="ad"><div class="bar"><h1 style="margin:0">Administration</h1><div style="display:flex;gap:8px"><a class="btn gh sm" href="index.html" target="_blank">Voir le site</a><button class="btn gh sm" data-a="logout">Déconnexion</button></div></div>' +
      '<div class="tabs">' + [['prod', 'Produits'], ['cat', 'Catégories'], ['tem', 'Témoignages'], ['vid', 'Vidéos'], ['set', 'Contact']].map(function (t) { return '<button class="chip' + (st.tab === t[0] ? ' on' : '') + '" data-a="tab" data-v="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>' + msgHtml();
  }
  function catName(slug) { var c = st.cats.find(function (x) { return x.slug === slug; }); return c ? c.name_fr : slug; }
  function prodList() {
    return head() + '<div class="bar"><b>' + st.prods.length + ' produits</b><button class="btn cu sm" data-a="new">+ Ajouter un produit</button></div>' +
      st.prods.map(function (p) {
        var a = Array.isArray(p.photos) ? p.photos : [];
        return '<div class="row">' + (a.length ? '<img src="' + esc(pth(a[0])) + '" alt="">' : '<span class="z"></span>') + '<div class="m"><b>' + esc(p.title_fr) + '</b><small>' + esc(catName(p.category)) + ' · ' + (p.price != null ? esc(p.price) + ' €' : 'sur demande') + ' · ' + a.length + ' photo(s)' + (p.published ? '' : ' · MASQUÉ') + '</small></div><button class="btn gh sm" data-a="edit" data-v="' + esc(p.id) + '">Modifier</button></div>';
      }).join('') + '</div>';
  }
  function inp(id, label, v, type) { return '<label for="' + id + '">' + label + '</label><input id="' + id + '" type="' + (type || 'text') + '"' + (type === 'number' ? ' step="any" inputmode="decimal"' : '') + ' value="' + esc(v == null ? '' : v) + '">'; }
  function area(id, label, v, hint) { return '<label for="' + id + '">' + label + '</label><textarea id="' + id + '">' + esc(v) + '</textarea>' + (hint ? '<div class="hint">' + hint + '</div>' : ''); }
  function form() {
    var p = st.edit, a = p.photos || [], isNew = !p.id;
    var h = head() + '<h2 style="font-size:20px;margin:0 0 8px">' + (isNew ? 'Nouveau produit' : 'Modifier le produit') + '</h2>';
    h += '<div class="card2"><label for="f_cat">Catégorie</label><select id="f_cat">' + st.cats.map(function (c) { return '<option value="' + esc(c.slug) + '"' + (c.slug === p.category ? ' selected' : '') + '>' + esc(c.name_fr) + '</option>'; }).join('') + '</select>' +
      inp('f_tfr', 'Titre (français)', p.title_fr) + inp('f_ten', 'Titre (anglais) – facultatif', p.title_en) +
      area('f_dfr', 'Description (français)', p.desc_fr) + area('f_den', 'Description (anglais) – facultatif', p.desc_en, 'Si vide, le texte français s’affiche aussi en anglais.') + '</div>';
    h += '<div class="card2"><div class="two">' + inp('f_price', 'Prix (€) – vide = sur demande', p.price, 'number') + inp('f_year', 'Année', p.year, 'number') + '</div>' +
      '<div class="two">' + inp('f_len', 'Longueur (m)', p.length_m, 'number') + inp('f_wid', 'Largeur (m)', p.width_m, 'number') + '</div>' +
      '<div class="two">' + inp('f_surf', 'Surface (m²)', p.surface_m2, 'number') + inp('f_bed', 'Chambres', p.bedrooms, 'number') + '</div>' +
      inp('f_sort', 'Ordre d’affichage (petit = en premier)', p.sort_order == null ? 0 : p.sort_order, 'number') +
      '<div class="chk"><input id="f_pub" type="checkbox"' + (p.published !== false ? ' checked' : '') + '><label for="f_pub" style="margin:0">Visible sur le site</label></div>' +
      '<div class="chk"><input id="f_feat" type="checkbox"' + (p.featured ? ' checked' : '') + '><label for="f_feat" style="margin:0">Afficher « à la une » sur l’accueil</label></div></div>';
    h += '<div class="card2">' + area('f_ffr', 'Caractéristiques (français)', (p.features_fr || []).join('\n'), 'Une ligne par caractéristique.') + area('f_fen', 'Caractéristiques (anglais)', (p.features_en || []).join('\n')) +
      area('f_efr', 'Équipements (français)', (p.equipment_fr || []).join('\n'), 'Une ligne par équipement.') + area('f_een', 'Équipements (anglais)', (p.equipment_en || []).join('\n')) + '</div>';
    h += '<div class="card2"><b>Photos</b><div class="hint" style="margin-bottom:10px">La première photo est l’image de couverture. Utilisez ← → pour changer l’ordre.</div><div class="ph2">' +
      a.map(function (x, i) { return '<div><img src="' + esc(pth(x)) + '" alt=""><div class="a"><button data-a="pl" data-v="' + i + '" aria-label="Avant">←</button><button data-a="pr" data-v="' + i + '" aria-label="Après">→</button><button data-a="pd" data-v="' + i + '" aria-label="Supprimer">🗑</button></div></div>'; }).join('') + '</div>' +
      '<div style="margin-top:12px"><input id="f_files" type="file" accept="image/*" multiple style="display:none"><button class="btn gh sm" data-a="pick"' + (st.busy ? ' disabled' : '') + '>' + (st.busy ? 'Envoi en cours…' : '+ Ajouter des photos') + '</button></div></div>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:10px"><button class="btn cu" data-a="save">Enregistrer</button><button class="btn gh" data-a="cancel">Annuler</button>' + (isNew ? '' : '<button class="btn dn" data-a="del">Supprimer</button>') + '</div></div>';
    return h;
  }
  function catView() {
    return head() + '<div class="card2"><div class="hint" style="margin-bottom:8px">Le nom anglais est facultatif. Pour supprimer une catégorie, elle doit être vide.</div>' +
      st.cats.map(function (c) {
        var n = st.prods.filter(function (p) { return p.category === c.slug; }).length;
        return '<div class="row" style="flex-wrap:wrap" data-slug="' + esc(c.slug) + '"><div class="m" style="flex:1 1 100%"><small>' + esc(c.slug) + ' · ' + n + ' produit(s)</small></div><input type="text" class="cf" placeholder="Nom français" value="' + esc(c.name_fr) + '" style="flex:1 1 40%"><input type="text" class="ce" placeholder="Nom anglais" value="' + esc(c.name_en || '') + '" style="flex:1 1 40%"><input type="number" class="co" value="' + esc(c.sort_order || 0) + '" style="flex:0 0 80px"><button class="btn gh sm" data-a="csave" data-v="' + esc(c.slug) + '">OK</button><button class="btn dn sm" data-a="cdel" data-v="' + esc(c.slug) + '">Suppr.</button></div>';
      }).join('') +
      '<b style="display:block;margin-top:18px">Nouvelle catégorie</b><div class="two">' + inp('n_fr', 'Nom français', '') + inp('n_en', 'Nom anglais', '') + '</div><div style="height:12px"></div><button class="btn cu sm" data-a="cadd">Ajouter</button></div></div>';
  }
  function temView() {
    return head() + (st.temErr ? '<div class="msg er">La table « testimonials » est introuvable. Exécutez le fichier testimonials.sql dans Supabase (SQL Editor).</div>' : '') +
      '<div class="bar"><b>' + st.tem.length + ' témoignage(s)</b><button class="btn cu sm" data-a="tnew">+ Ajouter</button></div>' +
      st.tem.map(function (x) {
        return '<div class="card2" data-tid="' + esc(x.id) + '">' + (x.photo ? '<img src="' + esc(x.photo) + '" alt="" style="width:72px;height:72px;border-radius:50%;object-fit:cover">' : '') +
          '<div class="two"><div><label>Nom</label><input type="text" class="tn" value="' + esc(x.name) + '"></div><div><label>Ville / pays (facultatif)</label><input type="text" class="tp" value="' + esc(x.place || '') + '"></div></div>' +
          '<label>Témoignage (français)</label><textarea class="tf">' + esc(x.text_fr || '') + '</textarea><label>Témoignage (anglais) – facultatif</label><textarea class="te">' + esc(x.text_en || '') + '</textarea>' +
          '<div class="two"><div><label>Ordre</label><input type="number" class="to" value="' + esc(x.sort_order || 0) + '"></div><div class="chk"><input type="checkbox" class="tv"' + (x.published !== false ? ' checked' : '') + '><span>Visible</span></div></div>' +
          ('rating' in x ? '<label>Note donnée par le client (étoiles)</label><select class="tr"><option value="">Aucune étoile</option>' + [5, 4, 3, 2, 1].map(function (n) { return '<option value="' + n + '"' + (Number(x.rating) === n ? ' selected' : '') + '>' + n + ' sur 5</option>'; }).join('') + '</select>' : '<div class="hint">Pour activer les étoiles, exécutez le fichier SQL « etoiles.sql » dans Supabase.</div>') +
          '<input type="file" class="tfile" accept="image/*" style="display:none"><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px"><button class="btn cu sm" data-a="tsave" data-v="' + esc(x.id) + '">Enregistrer</button><button class="btn gh sm" data-a="tphoto" data-v="' + esc(x.id) + '">' + (x.photo ? 'Changer la photo' : 'Ajouter une photo') + '</button><button class="btn dn sm" data-a="tdel" data-v="' + esc(x.id) + '">Supprimer</button></div></div>';
      }).join('') + '</div>';
  }
  function vids() { try { var a = JSON.parse(st.set.videos || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function vidView() {
    var a = st.vlist || (st.vlist = vids());
    return head() + '<div class="card2"><label style="margin-top:0">Titre de la section sur la page d’accueil (français)</label><input type="text" id="vt_fr" value="' + esc(st.set.vid_title_fr || '') + '" placeholder="Chargement avant livraison">' +
      '<label>Titre de la section (anglais) – facultatif</label><input type="text" id="vt_en" value="' + esc(st.set.vid_title_en || '') + '" placeholder="Loading before delivery">' +
      '<div style="height:12px"></div><button class="btn cu sm" data-a="vtsave">Enregistrer le titre</button></div>' +
      '<div class="hint" style="margin-bottom:12px">Ces vidéos s’affichent tout en bas de la page d’accueil, dans la section « Chargements et livraisons ». Pour chaque vidéo : collez un lien YouTube (recommandé) OU envoyez un fichier vidéo (50 Mo maximum).</div>' +
      '<div class="bar"><b>' + a.length + ' vidéo(s)</b><button class="btn cu sm" data-a="vnew">+ Ajouter une vidéo</button></div>' +
      a.map(function (x, i) {
        return '<div class="card2" data-vid="' + i + '">' +
          '<label style="margin-top:0">Titre (français)</label><input type="text" class="vf" value="' + esc(x.t_fr || '') + '">' +
          '<label>Titre (anglais) – facultatif</label><input type="text" class="ve" value="' + esc(x.t_en || '') + '">' +
          '<label>Lien YouTube</label><input type="text" class="vy" placeholder="https://youtu.be/..." value="' + esc(x.yt || '') + '">' +
          (x.file ? '<video src="' + esc(x.file) + '#t=0.1" controls preload="metadata" playsinline style="width:100%;max-height:240px;margin-top:10px;border-radius:10px;background:#000"></video>' : '') +
          '<div class="chk"><input type="checkbox" class="vp"' + (x.on !== false ? ' checked' : '') + '><span>Visible</span></div>' +
          '<input type="file" class="vfile" accept="video/*" style="display:none"><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px"><button class="btn cu sm" data-a="vsave">Enregistrer</button><button class="btn gh sm" data-a="vfile" data-v="' + i + '">' + (x.file ? 'Changer le fichier vidéo' : 'Envoyer un fichier vidéo') + '</button><button class="btn gh sm" data-a="vup" data-v="' + i + '">↑ Monter</button><button class="btn dn sm" data-a="vdel" data-v="' + i + '">Supprimer</button></div></div>';
      }).join('') + '</div>';
  }
  function vcollect() {
    var a = st.vlist || vids();
    document.querySelectorAll('[data-vid]').forEach(function (c) {
      var i = Number(c.getAttribute('data-vid')); if (!a[i]) return;
      a[i].t_fr = c.querySelector('.vf').value.trim(); a[i].t_en = c.querySelector('.ve').value.trim();
      a[i].yt = c.querySelector('.vy').value.trim(); a[i].on = c.querySelector('.vp').checked;
    });
    st.vlist = a; return a;
  }
  function vpersist(msg) {
    var a = st.vlist || [];
    return sb.from('settings').upsert({ key: 'videos', value: JSON.stringify(a) }).then(function (r) { if (r.error) throw r.error; st.set.videos = JSON.stringify(a); flash(msg); }).catch(function (e) { flash('Erreur : ' + (e.message || e), false); });
  }
  function setView() {
    return head() + '<div class="card2">' + (st.settingsErr ? '<div class="msg er">La table « settings » est introuvable. Exécutez le fichier settings.sql dans Supabase (SQL Editor).</div>' : '') +
      inp('s_wa', 'Numéro WhatsApp (avec indicatif, ex. +33612345678)', st.set.whatsapp) + inp('s_ph', 'Téléphone affiché', st.set.phone) + inp('s_em', 'E-mail professionnel', st.set.email, 'email') +
      '<div style="height:16px"></div><button class="btn cu" data-a="ssave">Enregistrer</button></div>' +
      '<div class="card2"><label style="margin-top:0">Grande photo de la page d’accueil</label>' +
      '<div class="hint" style="margin:0 0 10px">Si aucune photo n’est choisie ici, le site utilise la première photo du premier produit « à la une ».</div>' +
      (st.set.hero_image ? '<img src="' + esc(st.set.hero_image) + '" alt="" style="width:100%;max-height:260px;object-fit:cover;border-radius:10px;margin-bottom:10px">' : '') +
      '<input type="file" id="herofile" accept="image/*" style="display:none"><div style="display:flex;flex-wrap:wrap;gap:8px"><button class="btn cu sm" data-a="hphoto">' + (st.set.hero_image ? 'Changer la photo d’accueil' : 'Choisir la photo d’accueil') + '</button>' +
      (st.set.hero_image ? '<button class="btn gh sm" data-a="hdel">Retirer</button>' : '') + '</div></div></div>';
  }
  function render() {
    if (!st.user) { root.innerHTML = login(); return; }
    root.innerHTML = st.edit ? form() : st.tab === 'cat' ? catView() : st.tab === 'tem' ? temView() : st.tab === 'vid' ? vidView() : st.tab === 'set' ? setView() : prodList();
  }

  /* ---------- images ---------- */
  function resize(file, max, q) {
    return new Promise(function (res, rej) {
      var img = new Image(), u = URL.createObjectURL(file);
      img.onload = function () {
        var k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(u);
        c.toBlob(function (b) { b ? res(b) : rej(new Error('image')); }, 'image/jpeg', q);
      };
      img.onerror = function () { rej(new Error('Image illisible : ' + file.name)); };
      img.src = u;
    });
  }
  function rid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function up(blob, name) {
    return sb.storage.from(C.bucket).upload(name, blob, { contentType: 'image/jpeg', cacheControl: '31536000' }).then(function (r) {
      if (r.error) throw r.error;
      return sb.storage.from(C.bucket).getPublicUrl(name).data.publicUrl;
    });
  }
  function uploadFiles(files) {
    keep(); st.busy = true; render();
    var list = Array.prototype.slice.call(files), chain = Promise.resolve();
    list.forEach(function (f) {
      chain = chain.then(function () {
        var id = rid();
        return Promise.all([resize(f, 1600, 0.82), resize(f, 480, 0.78)]).then(function (b) {
          return Promise.all([up(b[0], 'p/' + id + '.jpg'), up(b[1], 'p/' + id + '_t.jpg')]);
        }).then(function (u) { st.edit.photos.push({ full: u[0], thumb: u[1] }); });
      });
    });
    chain.then(function () { st.busy = false; st.msg = { t: list.length + ' photo(s) ajoutée(s). Pensez à enregistrer.', ok: true }; render(); })
      .catch(function (e) { st.busy = false; st.msg = { t: 'Échec de l’envoi : ' + (e.message || e), ok: false }; render(); });
  }
  function keep() {
    if (!st.edit || !document.getElementById('f_tfr')) return;
    var p = st.edit;
    p.category = val('f_cat'); p.title_fr = val('f_tfr'); p.title_en = val('f_ten'); p.desc_fr = val('f_dfr'); p.desc_en = val('f_den');
    p.price = nz(val('f_price')); p.year = nz(val('f_year')); p.length_m = nz(val('f_len')); p.width_m = nz(val('f_wid')); p.surface_m2 = nz(val('f_surf')); p.bedrooms = nz(val('f_bed'));
    p.sort_order = nz(val('f_sort')) || 0; p.published = document.getElementById('f_pub').checked; p.featured = document.getElementById('f_feat').checked;
    p.features_fr = lines(val('f_ffr')); p.features_en = lines(val('f_fen')); p.equipment_fr = lines(val('f_efr')); p.equipment_en = lines(val('f_een'));
  }

  /* ---------- actions ---------- */
  function save() {
    keep(); var p = st.edit;
    if (!p.title_fr.trim()) return flash('Le titre français est obligatoire.', false);
    var row = {};
    ['category', 'title_fr', 'title_en', 'desc_fr', 'desc_en', 'features_fr', 'features_en', 'equipment_fr', 'equipment_en', 'price', 'year', 'length_m', 'width_m', 'surface_m2', 'bedrooms', 'photos', 'featured', 'published', 'sort_order'].forEach(function (k) { row[k] = p[k] === undefined ? null : p[k]; });
    if (!row.photos) row.photos = [];
    var q = p.id ? sb.from('products').update(row).eq('id', p.id) : sb.from('products').insert(row);
    q.then(function (r) {
      if (r.error) throw r.error;
      st.edit = null; return loadAll();
    }).then(function () { flash('Produit enregistré.'); }).catch(function (e) { flash('Erreur : ' + (e.message || e), false); });
  }
  function act(a, v) {
    var p = st.edit;
    if (a === 'tab') { st.tab = v; st.edit = null; st.msg = null; render(); }
    else if (a === 'new') { st.edit = { category: (st.cats[0] || {}).slug, photos: [], features_fr: [], features_en: [], equipment_fr: [], equipment_en: [], published: true, featured: false, sort_order: 0 }; st.msg = null; render(); window.scrollTo(0, 0); }
    else if (a === 'edit') { var f = st.prods.find(function (x) { return String(x.id) === v; }); st.edit = JSON.parse(JSON.stringify(f)); if (!Array.isArray(st.edit.photos)) st.edit.photos = []; ['features_fr', 'features_en', 'equipment_fr', 'equipment_en'].forEach(function (k) { if (!Array.isArray(st.edit[k])) st.edit[k] = []; }); st.msg = null; render(); window.scrollTo(0, 0); }
    else if (a === 'cancel') { st.edit = null; st.msg = null; render(); }
    else if (a === 'save') save();
    else if (a === 'del') {
      if (!confirm('Supprimer définitivement ce produit ?')) return;
      sb.from('products').delete().eq('id', p.id).then(function (r) { if (r.error) throw r.error; st.edit = null; return loadAll(); }).then(function () { flash('Produit supprimé.'); }).catch(function (e) { flash('Erreur : ' + e.message, false); });
    }
    else if (a === 'pick') { var fi = document.getElementById('f_files'); fi.onchange = function () { if (fi.files.length) uploadFiles(fi.files); }; fi.click(); }
    else if (a === 'pl' || a === 'pr') { keep(); var i = Number(v), j = a === 'pl' ? i - 1 : i + 1; if (j >= 0 && j < p.photos.length) { var t = p.photos[i]; p.photos[i] = p.photos[j]; p.photos[j] = t; } render(); }
    else if (a === 'pd') { if (!confirm('Retirer cette photo ?')) return; keep(); p.photos.splice(Number(v), 1); render(); }
    else if (a === 'cadd') {
      var nf = val('n_fr').trim(); if (!nf) return flash('Indiquez un nom français.', false);
      var slug = nf.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || rid();
      sb.from('categories').insert({ slug: slug, name_fr: nf, name_en: val('n_en').trim() || null, sort_order: st.cats.length + 1 }).then(function (r) { if (r.error) throw r.error; return loadAll(); }).then(function () { flash('Catégorie ajoutée.'); }).catch(function (e) { flash('Erreur : ' + e.message, false); });
    }
    else if (a === 'csave') {
      var row = document.querySelector('[data-slug="' + v + '"]');
      sb.from('categories').update({ name_fr: row.querySelector('.cf').value.trim(), name_en: row.querySelector('.ce').value.trim() || null, sort_order: Number(row.querySelector('.co').value) || 0 }).eq('slug', v).then(function (r) { if (r.error) throw r.error; return loadAll(); }).then(function () { flash('Catégorie enregistrée.'); }).catch(function (e) { flash('Erreur : ' + e.message, false); });
    }
    else if (a === 'cdel') {
      if (st.prods.some(function (x) { return x.category === v; })) return flash('Cette catégorie contient des produits : déplacez-les d’abord.', false);
      if (!confirm('Supprimer cette catégorie ?')) return;
      sb.from('categories').delete().eq('slug', v).then(function (r) { if (r.error) throw r.error; return loadAll(); }).then(function () { flash('Catégorie supprimée.'); }).catch(function (e) { flash('Erreur : ' + e.message, false); });
    }
    else if (a === 'ssave') {
      var rows = [['whatsapp', val('s_wa').trim()], ['phone', val('s_ph').trim()], ['email', val('s_em').trim()]].map(function (x) { return { key: x[0], value: x[1] }; });
      sb.from('settings').upsert(rows).then(function (r) { if (r.error) throw r.error; return loadAll(); }).then(function () { flash('Coordonnées enregistrées.'); }).catch(function (e) { flash('Erreur : ' + e.message, false); });
    }
    else if (a === 'hphoto') {
      var hf = document.getElementById('herofile');
      hf.onchange = function () {
        if (!hf.files.length) return; var id = rid();
        flash('Envoi de la photo…');
        resize(hf.files[0], 1600, 0.82).then(function (b) { return up(b, 'h/' + id + '.jpg'); }).then(function (u) { return sb.from('settings').upsert({ key: 'hero_image', value: u }); }).then(function (r) { if (r.error) throw r.error; return loadAll(); }).then(function () { flash('Photo d’accueil enregistrée.'); }).catch(function (e) { flash('Erreur : ' + (e.message || e), false); });
      };
      hf.click();
    }
    else if (a === 'hdel') {
      sb.from('settings').upsert({ key: 'hero_image', value: '' }).then(function (r) { if (r.error) throw r.error; return loadAll(); }).then(function () { flash('Photo d’accueil retirée.'); }).catch(function (e) { flash('Erreur : ' + e.message, false); });
    }
    else if (a === 'vtsave') {
      sb.from('settings').upsert([{ key: 'vid_title_fr', value: val('vt_fr').trim() }, { key: 'vid_title_en', value: val('vt_en').trim() }]).then(function (r) { if (r.error) throw r.error; return loadAll(); }).then(function () { flash('Titre de la section enregistré.'); }).catch(function (e) { flash('Erreur : ' + (e.message || e), false); });
    }
    else if (a === 'vnew') { vcollect().push({ t_fr: '', t_en: '', yt: '', file: '', on: true }); render(); }
    else if (a === 'vsave') { vcollect(); vpersist('Vidéos enregistrées.'); }
    else if (a === 'vdel') { if (!confirm('Supprimer cette vidéo ?')) return; vcollect().splice(Number(v), 1); vpersist('Vidéo supprimée.'); }
    else if (a === 'vup') { var ar = vcollect(), k = Number(v); if (k > 0) { var tmp = ar[k - 1]; ar[k - 1] = ar[k]; ar[k] = tmp; } vpersist('Ordre modifié.'); }
    else if (a === 'vfile') {
      var vc = document.querySelector('[data-vid="' + v + '"]'), vf = vc.querySelector('.vfile'), vi = Number(v);
      vf.onchange = function () {
        var f = vf.files[0]; if (!f) return; vcollect();
        if (f.size > 50 * 1024 * 1024) return flash('Vidéo trop lourde (' + Math.round(f.size / 1048576) + ' Mo). Maximum 50 Mo : utilisez plutôt YouTube.', false);
        var ext = (f.name.split('.').pop() || 'mp4').toLowerCase().replace(/[^a-z0-9]/g, '') || 'mp4', path = 'v/' + rid() + '.' + ext;
        flash('Envoi de la vidéo en cours, patientez…');
        sb.storage.from(C.bucket).upload(path, f, { contentType: f.type || 'video/mp4', cacheControl: '31536000' }).then(function (r) {
          if (r.error) throw r.error; st.vlist[vi].file = sb.storage.from(C.bucket).getPublicUrl(path).data.publicUrl; return vpersist('Vidéo envoyée et enregistrée.');
        }).catch(function (e) { flash('Erreur : ' + (e.message || e), false); });
      };
      vf.click();
    }
    else if (a === 'tnew') { sb.from('testimonials').insert({ name: 'Nouveau client', text_fr: '', sort_order: st.tem.length + 1 }).then(function (r) { if (r.error) throw r.error; return loadAll(); }).then(function () { flash('Témoignage ajouté : complétez-le puis enregistrez.'); }).catch(function (e) { flash('Erreur : ' + e.message, false); }); }
    else if (a === 'tsave') {
      var c = document.querySelector('[data-tid="' + v + '"]');
      sb.from('testimonials').update(Object.assign({ name: c.querySelector('.tn').value.trim() || 'Client', place: c.querySelector('.tp').value.trim() || null, text_fr: c.querySelector('.tf').value, text_en: c.querySelector('.te').value.trim() || null, sort_order: Number(c.querySelector('.to').value) || 0, published: c.querySelector('.tv').checked }, c.querySelector('.tr') ? { rating: c.querySelector('.tr').value ? Number(c.querySelector('.tr').value) : null } : {})).eq('id', v).then(function (r) { if (r.error) throw r.error; return loadAll(); }).then(function () { flash('Témoignage enregistré.'); }).catch(function (e) { flash('Erreur : ' + e.message, false); });
    }
    else if (a === 'tphoto') {
      var cc = document.querySelector('[data-tid="' + v + '"]'), fi2 = cc.querySelector('.tfile');
      fi2.onchange = function () {
        if (!fi2.files.length) return; var id = rid();
        resize(fi2.files[0], 480, 0.82).then(function (b) { return up(b, 't/' + id + '.jpg'); }).then(function (u) { return sb.from('testimonials').update({ photo: u }).eq('id', v); }).then(function (r) { if (r.error) throw r.error; return loadAll(); }).then(function () { flash('Photo enregistrée.'); }).catch(function (e) { flash('Erreur : ' + (e.message || e), false); });
      };
      fi2.click();
    }
    else if (a === 'tdel') { if (!confirm('Supprimer ce témoignage ?')) return; sb.from('testimonials').delete().eq('id', v).then(function (r) { if (r.error) throw r.error; return loadAll(); }).then(function () { flash('Témoignage supprimé.'); }).catch(function (e) { flash('Erreur : ' + e.message, false); }); }
    else if (a === 'logout') { sb.auth.signOut().then(function () { st.user = null; st.edit = null; render(); }); }
    else if (a === 'login') {
      sb.auth.signInWithPassword({ email: val('em').trim(), password: val('pw') }).then(function (r) {
        if (r.error) throw r.error; st.user = r.data.user; st.msg = null; return loadAll();
      }).then(render).catch(function (e) { st.user = null; st.msg = { t: 'Connexion impossible : e-mail ou mot de passe incorrect.', ok: false }; render(); });
    }
  }
  document.addEventListener('click', function (e) { var el = e.target.closest('[data-a]'); if (el) act(el.getAttribute('data-a'), el.getAttribute('data-v')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !st.user && (e.target.id === 'pw' || e.target.id === 'em')) act('login'); });
  boot();
})();
