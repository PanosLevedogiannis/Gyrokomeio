/*
  Γυροκομείο Grill: page behaviour
  ------------------------------------------------------------------
  Plain JS, no build step. Reads SITE (config.js), MENU (menu.js) and
  I18N (i18n.js). You shouldn't need to edit this file to change content.
*/
(() => {
  'use strict';

  const SITE = window.SITE || {};
  const MENU = window.MENU || [];
  const I18N = window.I18N || { en: {}, js: {} };
  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  let lang = root.dataset.lang === 'en' ? 'en' : 'el';

  /* ---------- Helpers ---------- */

  const fill = (str, vars) =>
    vars ? str.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m)) : str;

  // A string that the scripts build (I18N.js), in the current language.
  const t = (key, vars) => {
    const entry = I18N.js[key];
    if (!entry) return key;
    const val = entry[lang] != null ? entry[lang] : entry.el;
    return typeof val === 'string' ? fill(val, vars) : val;
  };

  // A config value that is either plain or { el, en }.
  const pick = (v) => {
    if (v == null) return '';
    if (typeof v !== 'object') return v;
    return v[lang] != null ? v[lang] : (v.el != null ? v.el : '');
  };

  // Tiny element builder: h('a', { href: '#', class: 'x' }, 'text', child)
  function h(tag, props, ...kids) {
    const node = document.createElement(tag);
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v == null || v === false) continue;
        if (k === 'class') node.className = v;
        else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? '' : v);
      }
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) node.append(kid);
    return node;
  }

  function icon(id, cls) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'icon' + (cls ? ' ' + cls : ''));
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(ns, 'use');
    use.setAttribute('href', '#' + id);
    svg.append(use);
    return svg;
  }

  /* ---------- 1. Language ---------- */

  // The page is written in Greek. Cache it so we can switch back.
  const textNodes = $$('[data-i18n]').map((n) => ({ n, key: n.dataset.i18n, el: n.innerHTML }));
  const attrNodes = $$('[data-i18n-attr]').map((n) => ({
    n,
    pairs: n.dataset.i18nAttr.split(';').filter(Boolean).map((pair) => {
      const [attr, key] = pair.split('=').map((s) => s.trim());
      return { attr, key, el: n.getAttribute(attr) };
    })
  }));
  const greek = new Map(textNodes.map((o) => [o.key, o.el]));

  // Text of a data-i18n key in the current language.
  const tx = (key) => (lang === 'en' && I18N.en[key] != null ? I18N.en[key] : greek.get(key) || '');

  function setLang(next, save) {
    lang = next === 'en' ? 'en' : 'el';
    root.lang = lang;
    root.dataset.lang = lang;

    for (const o of textNodes) {
      const en = lang === 'en' ? I18N.en[o.key] : null;
      o.n.innerHTML = en != null ? en : o.el;
    }
    for (const o of attrNodes) {
      for (const p of o.pairs) {
        const en = lang === 'en' ? I18N.en[p.key] : null;
        const val = en != null ? en : p.el;
        if (val != null) o.n.setAttribute(p.attr, val);
      }
    }
    $$('[data-set-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)));

    document.title = t('meta.title');
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.desc'));
    syncMenuToggle();

    try {
      const url = new URL(location.href);
      if (lang === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      history.replaceState(history.state, '', url);
    } catch (e) { /* file:// or old browser: fine */ }
    if (save) {
      try { localStorage.setItem('gk-lang', lang); } catch (e) { /* private mode */ }
    }

    renderAll();
    playIngredients();
    root.classList.remove('i18n-pending');
  }

  function playIngredients() {
    $$('.ing').forEach((li) => {
      li.style.animation = 'none';
      void li.offsetWidth; // restart the CSS animation
      li.style.animation = '';
    });
  }

  function renderAll() {
    fillSite();
    renderHours();
    renderSlots();
    renderGallery();
    renderMenu();
    renderSpecials();
    renderReviews();
  }

  /* ---------- 2. Contact details from SITE ---------- */

  function fillSite() {
    const phones = SITE.phones || [];
    const main = phones[0];
    if (main) {
      $$('[data-tel]').forEach((a) => { a.href = 'tel:' + main.tel; });
      $$('[data-tel-text]').forEach((n) => { n.textContent = main.display; });
    }
    $$('[data-phones]').forEach((dd) => {
      dd.replaceChildren(...phones.map((p) => h('span', null,
        h('a', { href: 'tel:' + p.tel }, p.display),
        phones.length > 1 ? h('span', { class: 'details-sub' }, ' ' + pick(p.label)) : null
      )));
    });

    if (SITE.email) {
      $$('[data-email]').forEach((a) => { a.href = 'mailto:' + SITE.email; a.textContent = SITE.email; });
    }
    $$('[data-address]').forEach((n) => { n.textContent = pick(SITE.address); });

    const map = SITE.map || {};
    $$('[data-directions]').forEach((a) => { a.href = map.directions || map.link || '#'; });

    const order = SITE.order || {};
    const setLink = (sel, url) => $$(sel).forEach((a) => { a.href = url || '#'; a.hidden = !url; });
    setLink('[data-wolt]', pick(order.wolt));
    setLink('[data-efood]', pick(order.efood));

    const google = SITE.google || {};
    setLink('[data-google-reviews]', google.reviews);
    setLink('[data-google-write]', google.writeReview);

    const social = SITE.social || {};
    const links = [['Facebook', social.facebook], ['Instagram', social.instagram]].filter((s) => s[1]);
    $$('[data-social]').forEach((n) => {
      n.replaceChildren(...links.map(([name, url]) => h('a', { href: url, target: '_blank', rel: 'noopener' }, name)));
      n.hidden = !links.length;
    });
    $$('[data-social-row]').forEach((n) => { n.hidden = !links.length; });

    $$('[data-year]').forEach((n) => { n.textContent = athens().date.slice(0, 4); });
  }

  /* ---------- 3. Hours and open / closed ---------- */

  const hours = SITE.hours || { week: [] };
  const DAY_KEYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Now, in Greek time: weekday (0 = Monday), minutes since midnight, YYYY-MM-DD.
  function athens(date = new Date()) {
    const o = {};
    new Intl.DateTimeFormat('en-GB', {
      timeZone: hours.timezone || 'Europe/Athens',
      year: 'numeric', month: '2-digit', day: '2-digit',
      weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(date).forEach((p) => { o[p.type] = p.value; });
    return {
      day: DAY_KEYS.indexOf(o.weekday),
      mins: (Number(o.hour) % 24) * 60 + Number(o.minute),
      date: `${o.year}-${o.month}-${o.day}`
    };
  }

  const toMins = (s) => { const [hh, mm] = s.split(':').map(Number); return hh * 60 + mm; };

  // One day's opening window in minutes; closing after midnight goes past 1440.
  function windowOf(day) {
    const d = hours.week[day];
    if (!d || !d.open || !d.close) return null;
    const open = toMins(d.open);
    let close = toMins(d.close);
    if (close <= open) close += 1440;
    return { open, close, from: d.open, to: d.close };
  }

  function currentStatus() {
    const now = athens();
    const today = windowOf(now.day);
    const yesterday = windowOf((now.day + 6) % 7);
    let left = null;
    let until = '';

    if (today && now.mins >= today.open && now.mins < today.close) {
      left = today.close - now.mins; until = today.to;
    } else if (yesterday && yesterday.close > 1440 && now.mins < yesterday.close - 1440) {
      left = yesterday.close - 1440 - now.mins; until = yesterday.to;
    }
    if (left != null) {
      return left <= 30
        ? { cls: ['is-open', 'is-soon'], text: t('status.soon', { close: until }) }
        : { cls: ['is-open'], text: t('status.open', { close: until }) };
    }
    if (today && now.mins < today.open) {
      return { cls: ['is-closed'], text: t('status.today', { open: today.from }) };
    }
    for (let i = 1; i <= 7; i++) {
      const day = (now.day + i) % 7;
      const w = windowOf(day);
      if (w) {
        return {
          cls: ['is-closed'],
          text: i === 1
            ? t('status.tomorrow', { open: w.from })
            : t('status.on', { day: t('daysOn')[day], open: w.from })
        };
      }
    }
    return { cls: ['is-closed'], text: t('hours.closed') };
  }

  function hoursShort() {
    const week = hours.week || [];
    const sig = (d) => (d && d.open ? d.open + '-' + d.close : 'closed');
    if (week.length && week[0] && week.every((d) => sig(d) === sig(week[0]))) {
      return t('hours.everyDay', { open: week[0].open, close: week[0].close });
    }
    // Group days with the same hours: "Δευτέρα - Παρασκευή: 12:00 έως 01:00"
    const days = t('days');
    const groups = [];
    week.forEach((d, i) => {
      const last = groups[groups.length - 1];
      if (last && last.sig === sig(d)) last.to = i;
      else groups.push({ sig: sig(d), from: i, to: i, d });
    });
    return groups.map((g) => {
      const name = g.from === g.to ? days[g.from] : days[g.from] + ' - ' + days[g.to];
      const time = g.d && g.d.open ? t('hours.range', { open: g.d.open, close: g.d.close }) : t('hours.closed');
      return name + ': ' + time;
    }).join('\n');
  }

  function renderHours() {
    const text = hoursShort();
    $$('[data-hours-short]').forEach((n) => {
      n.replaceChildren(...text.split('\n').flatMap((line, i) => (i ? [h('br'), line] : [line])));
    });
    updateStatus();
  }

  function updateStatus() {
    const s = currentStatus();
    $$('[data-status]').forEach((p) => {
      p.classList.remove('is-open', 'is-closed', 'is-soon');
      p.classList.add(...s.cls);
      const txt = $('.status-text', p);
      if (txt) txt.textContent = s.text;
    });
    $$('[data-status-text]').forEach((n) => { n.textContent = s.text; });
  }

  /* ---------- 4. Photos ---------- */

  const photos = SITE.photos || {};
  const RATIO = { tall: '4:5', square: '1:1', wide: '3:2' };

  function note(cfg, ratio, cls) {
    return h('div', { class: cls },
      icon('i-camera'),
      h('strong', null, t('photo.slot', { hint: pick(cfg.hint) })),
      h('span', null, t('photo.file', { file: cfg.file, ratio: ratio || cfg.ratio || '' }))
    );
  }

  // Hero and story: the <img> sits over a designed fallback panel.
  function setupSlots() {
    $$('[data-photo]').forEach((fig) => {
      const cfg = photos[fig.dataset.photo];
      if (!cfg || !cfg.file) return;
      const img = h('img', { class: 'slot-img', alt: pick(cfg.alt), decoding: 'async' });
      if (fig.dataset.photo === 'hero') img.setAttribute('fetchpriority', 'high');
      else img.setAttribute('loading', 'lazy');
      img.addEventListener('load', () => fig.classList.add('is-loaded'));
      img.addEventListener('error', () => {
        img.remove();
        fig.classList.add('is-missing');
        renderSlots();
      });
      fig.prepend(img);
      img.src = cfg.file;
    });
  }

  function renderSlots() {
    $$('[data-photo]').forEach((fig) => {
      const cfg = photos[fig.dataset.photo];
      if (!cfg) return;
      const img = $('.slot-img', fig);
      if (img) img.alt = pick(cfg.alt);
      const old = $('.slot-note', fig);
      if (old) old.remove();
      if (SITE.showPlaceholders && fig.classList.contains('is-missing')) fig.append(note(cfg, null, 'slot-note'));
    });
  }

  // Gallery: ask the server which files exist, then draw photos or placeholders.
  const gallery = (photos.gallery || []).map((cfg) => ({ cfg, state: 'pending' }));
  let viewer = [];
  let viewerAt = 0;

  function probeGallery() {
    return Promise.all(gallery.map((it) =>
      fetch(it.cfg.file, { method: 'HEAD', cache: 'no-cache' })
        .then((res) => { it.state = res.ok ? 'ok' : 'missing'; })
        .catch(() => { it.state = 'ok'; }) // can't tell (e.g. opened as a file): let the <img> decide
    ));
  }

  function renderGallery() {
    const box = $('[data-gallery]');
    if (!box) return;
    const settled = gallery.every((it) => it.state !== 'pending');
    const shown = gallery.filter((it) => it.state === 'ok' || (it.state === 'missing' && SITE.showPlaceholders));
    const none = settled && !shown.length;
    const section = $('#photos');
    if (section) section.hidden = none;
    $$('a[href="#photos"]').forEach((a) => { a.hidden = none; });

    viewer = [];
    box.replaceChildren(...shown.map((it, i) => {
      const shape = RATIO[it.cfg.shape] ? it.cfg.shape : 'square';
      const fig = h('figure', { class: 'g-item g-' + shape, style: '--d:' + Math.min(i, 8) });
      if (it.state === 'missing') {
        fig.append(note(it.cfg, RATIO[shape], 'ph'));
        return fig;
      }
      const index = viewer.push(it) - 1;
      const alt = pick(it.cfg.alt);
      const img = h('img', { src: it.cfg.file, alt, loading: 'lazy', decoding: 'async' });
      img.addEventListener('load', () => fig.classList.add('is-loaded'));
      img.addEventListener('error', () => { it.state = 'missing'; renderGallery(); });
      if (img.complete && img.naturalWidth) fig.classList.add('is-loaded');
      fig.append(h('button', {
        type: 'button',
        class: 'g-btn',
        'aria-label': t('photo.open', { alt }),
        onclick: () => openViewer(index)
      }, img));
      return fig;
    }));
  }

  const lightbox = $('#lightbox');
  const lbImg = $('[data-lb-img]');
  const lbCap = $('[data-lb-cap]');

  function showPhoto(i) {
    if (!viewer.length) return;
    viewerAt = (i + viewer.length) % viewer.length;
    const it = viewer[viewerAt];
    lbImg.src = it.cfg.file;
    lbImg.alt = pick(it.cfg.alt);
    lbCap.textContent = pick(it.cfg.alt);
    $$('[data-lb-prev], [data-lb-next]', lightbox).forEach((b) => { b.hidden = viewer.length < 2; });
  }

  function openViewer(i) {
    showPhoto(i);
    openDialog(lightbox);
  }

  if (lightbox) {
    lbCap.setAttribute('aria-hidden', 'true');
    $('[data-lb-prev]', lightbox).addEventListener('click', () => showPhoto(viewerAt - 1));
    $('[data-lb-next]', lightbox).addEventListener('click', () => showPhoto(viewerAt + 1));
    lightbox.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') showPhoto(viewerAt - 1);
      else if (e.key === 'ArrowRight') showPhoto(viewerAt + 1);
    });
  }

  /* ---------- 5. Menu ---------- */

  const tabList = $('[data-menu-tabs]');
  const panelBox = $('[data-menu-panels]');
  let activeCat = MENU[0] ? MENU[0].id : '';

  function menuItem(it, i) {
    const desc = lang === 'en' ? it.den : it.del;
    return h('li', { class: 'menu-item', style: '--d:' + Math.min(i + 1, 14) },
      h('p', { class: 'mi-name' },
        pick(it),
        lang === 'en' && it.el !== it.en ? h('span', { class: 'mi-el', lang: 'el' }, it.el) : null
      ),
      desc ? h('p', { class: 'mi-desc' }, desc) : null,
      it.tags && it.tags.length
        ? h('ul', { class: 'mi-tags' }, it.tags.map((tag) => h('li', { class: 'tag tag-' + tag }, t('tag.' + tag))))
        : null
    );
  }

  function renderMenu() {
    if (!tabList || !panelBox) return;
    tabList.replaceChildren(...MENU.map((cat) => {
      const on = cat.id === activeCat;
      return h('button', {
        type: 'button', role: 'tab', class: 'chip',
        id: 'tab-' + cat.id, 'aria-controls': 'panel-' + cat.id,
        'aria-selected': String(on), tabindex: on ? '0' : '-1', 'data-cat': cat.id
      }, pick(cat));
    }));
    panelBox.replaceChildren(...MENU.map((cat) => h('div', {
      role: 'tabpanel', class: 'menu-panel', id: 'panel-' + cat.id,
      'aria-labelledby': 'tab-' + cat.id, tabindex: '0', hidden: cat.id !== activeCat
    },
      cat.note ? h('p', { class: 'menu-note' }, pick(cat.note)) : null,
      cat.compact
        ? h('ul', { class: 'x-chips' }, cat.items.map((it, i) => h('li', { class: 'x-chip', style: '--d:' + Math.min(i + 1, 14) }, pick(it))))
        : h('ul', { class: 'menu-list' }, cat.items.map(menuItem))
    )));

    $$('[data-legend]').forEach((p) => p.replaceChildren(
      ...['veg', 'home', 'share', 'house'].map((tag) => h('span', { class: 'tag tag-' + tag }, t('tag.' + tag))),
      h('span', { class: 'legend-note' }, t('menu.legend'))
    ));
  }

  function keepTabInView(tab) {
    const pad = 24;
    if (tab.offsetLeft - pad < tabList.scrollLeft) {
      tabList.scrollLeft = tab.offsetLeft - pad;
    } else if (tab.offsetLeft + tab.offsetWidth + pad > tabList.scrollLeft + tabList.clientWidth) {
      tabList.scrollLeft = tab.offsetLeft + tab.offsetWidth + pad - tabList.clientWidth;
    }
  }

  function selectTab(id, focus) {
    activeCat = id;
    $$('[role="tab"]', tabList).forEach((b) => {
      const on = b.dataset.cat === id;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      if (on) {
        if (focus) b.focus({ preventScroll: true });
        keepTabInView(b);
      }
    });
    $$('[role="tabpanel"]', panelBox).forEach((p) => {
      p.hidden = p.id !== 'panel-' + id;
      p.classList.toggle('enter', !p.hidden);
    });

    // When the tabs are stuck under the header, start the new list from its top.
    const stick = parseFloat(getComputedStyle(tabList).top) || 0;
    if (tabList.getBoundingClientRect().top <= stick + 1) {
      const y = panelBox.getBoundingClientRect().top + scrollY - stick - tabList.offsetHeight;
      if (y < scrollY) scrollTo({ top: y });
    }
  }

  if (tabList) {
    tabList.addEventListener('click', (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (tab) selectTab(tab.dataset.cat, false);
    });
    tabList.addEventListener('keydown', (e) => {
      const tabs = $$('[role="tab"]', tabList);
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (next == null) return;
      e.preventDefault();
      selectTab(tabs[(next + tabs.length) % tabs.length].dataset.cat, true);
    });
  }

  /* ---------- 6. Daily dishes and offers ---------- */

  function ghost(title, how, extra) {
    return h('div', { class: 'ghost' + (extra ? ' ' + extra : '') }, h('strong', null, title), h('span', null, how));
  }

  function renderSpecials() {
    const box = $('[data-specials]');
    if (!box) return;
    const today = athens().date;
    const list = (SITE.specials || []).filter((s) => !s.until || s.until >= today);
    const dateFmt = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'el-GR', { day: 'numeric', month: 'long', timeZone: 'UTC' });

    const cards = list.map((s) => {
      const card = h('article', { class: 'special' });
      if (s.photo) {
        const img = h('img', { class: 'special-photo', src: s.photo, alt: '', loading: 'lazy', decoding: 'async', width: '800', height: '600' });
        img.addEventListener('error', () => img.remove());
        card.append(img);
      }
      card.append(h('div', { class: 'special-body' },
        s.tag ? h('p', { class: 'special-tag' }, pick(s.tag)) : null,
        h('h3', null, pick(s.title)),
        s.text ? h('p', null, pick(s.text)) : null,
        s.until ? h('p', { class: 'special-until' }, t('specials.until', { date: dateFmt.format(new Date(s.until + 'T12:00:00Z')) })) : null
      ));
      return card;
    });

    if (!cards.length) {
      const phone = (SITE.phones || [])[0];
      cards.push(h('div', { class: 'specials-empty' },
        h('p', null, t('specials.empty')),
        phone ? h('a', { class: 'btn btn-primary', href: 'tel:' + phone.tel }, icon('i-phone'), h('span', null, tx('cta.call') + ' ' + phone.display)) : null
      ));
      if (SITE.showPlaceholders) {
        cards.push(ghost(t('specials.slot'), t('specials.slotHow')), ghost(t('specials.slot'), t('specials.slotHow')));
      }
    }
    box.replaceChildren(...cards);
  }

  /* ---------- 7. Reviews ---------- */

  function stars(n, label) {
    const box = h('div', label ? { class: 'stars', role: 'img', 'aria-label': t('reviews.stars', { n }) } : { class: 'stars', 'aria-hidden': 'true' });
    for (let i = 1; i <= 5; i++) box.append(icon('i-star', i <= n ? 'on' : 'off'));
    return box;
  }

  function renderReviews() {
    const box = $('[data-reviews]');
    if (!box) return;
    let cards = (SITE.reviews || []).map((r) => h('figure', { class: 'review' },
      stars(Math.max(0, Math.min(5, Math.round(r.stars || 5))), true),
      h('blockquote', { lang: r.lang || null }, h('p', null, r.text)),
      h('figcaption', null,
        h('span', { class: 'review-name' }, r.name),
        r.when ? h('span', { class: 'review-when' }, t('reviews.source', { when: pick(r.when) })) : null
      )
    ));
    if (!cards.length && SITE.showPlaceholders) {
      cards = [0, 1, 2].map(() => {
        const g = ghost(t('reviews.slot'), t('reviews.slotHow'), 'review');
        g.prepend(stars(0, false));
        return g;
      });
    }
    box.replaceChildren(...cards);
    box.hidden = !cards.length;
  }

  /* ---------- 8. Map (always on the page, loads when you scroll near it) ---------- */

  $$('[data-map-frame]').forEach((frame) => {
    const map = SITE.map || {};
    if (map.embed) frame.src = map.embed;
  });

  /* ---------- 9. Dialogs, mobile nav, header ---------- */

  function openDialog(d) {
    if (!d || d.open) return;
    if (typeof d.showModal === 'function') d.showModal();
    else d.setAttribute('open', '');
  }
  function closeDialog(d) {
    if (typeof d.close === 'function') d.close();
    else d.removeAttribute('open');
  }

  $$('[data-open-order]').forEach((b) => b.addEventListener('click', () => {
    setNav(false);
    openDialog($('#order-sheet'));
  }));
  $$('[data-open-privacy]').forEach((b) => b.addEventListener('click', () => openDialog($('#privacy'))));

  $$('dialog').forEach((d) => d.addEventListener('click', (e) => {
    const onBackdrop = e.target === d || (d === lightbox && e.target.tagName === 'FIGURE');
    const onLink = d.id === 'order-sheet' && e.target.closest('a');
    if (onBackdrop || onLink || e.target.closest('[data-close]')) closeDialog(d);
  }));

  const toggle = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');

  function syncMenuToggle() {
    if (!toggle || !mobileNav) return;
    const open = !mobileNav.hidden;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.open'));
    const use = $('use', toggle);
    if (use) use.setAttribute('href', open ? '#i-close' : '#i-menu');
  }
  function setNav(open) {
    if (!mobileNav) return;
    mobileNav.hidden = !open;
    syncMenuToggle();
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => setNav(mobileNav.hidden));
    mobileNav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileNav.hidden) { setNav(false); toggle.focus(); }
    });
    const wide = matchMedia('(min-width: 960px)');
    const onWide = () => { if (wide.matches) setNav(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else wide.addListener(onWide);
  }

  // Hairline under the header once the page moves (no scroll listener).
  const header = $('.site-header');
  const sentinel = $('.top-sentinel');
  if (header && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => header.classList.toggle('is-scrolled', !e.isIntersecting)).observe(sentinel);
  }

  // Mark the section you are reading in the desktop nav.
  const navLinks = $$('.nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => {
          if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach((a) => { const sec = $(a.getAttribute('href')); if (sec) spy.observe(sec); });
  }

  $$('[data-set-lang]').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.setLang !== lang) setLang(b.dataset.setLang, true);
  }));

  /* ---------- 10. Contact form ---------- */

  const form = $('[data-contact-form]');
  if (form) {
    const required = ['name', 'contact', 'message'];
    const field = (name) => form.elements.namedItem(name);
    const value = (name) => (field(name) ? field(name).value.trim() : '');
    const statusBox = $('[data-form-status]', form);
    const submit = $('button[type="submit"]', form);

    const setError = (name, on) => {
      const input = field(name);
      const err = $(`[data-error-for="${name}"]`, form);
      if (!input || !err) return;
      err.id = err.id || 'err-' + name;
      err.hidden = !on;
      if (on) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', err.id);
      } else {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
      }
    };
    const say = (text, kind, link) => {
      statusBox.className = 'form-status' + (kind ? ' is-' + kind : '');
      statusBox.replaceChildren(text);
      if (link) statusBox.append(' ', link);
    };

    required.forEach((name) => {
      const input = field(name);
      if (input) input.addEventListener('input', () => { if (input.value.trim()) setError(name, false); });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const missing = required.filter((name) => !value(name));
      required.forEach((name) => setError(name, missing.includes(name)));
      if (missing.length) { field(missing[0]).focus(); return; }

      // Bots fill the hidden field. Pretend it worked.
      if (value('_honey')) { form.reset(); say(t('form.sent'), 'ok'); return; }

      const select = field('topic');
      const topic = select ? select.options[select.selectedIndex].text.trim() : '';
      const subject = t('form.subject', { topic });
      const body = `${value('message')}\n\n${value('name')}\n${value('contact')}`;
      const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const endpoint = SITE.contactForm && SITE.contactForm.endpoint;

      if (!endpoint) {
        location.href = mailto;
        say(t('form.mailto'));
        return;
      }

      submit.disabled = true;
      say(t('form.sending'));
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: value('name'),
            contact: value('contact'),
            topic,
            message: value('message'),
            _subject: subject,
            _template: 'table',
            _captcha: 'false'
          })
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || String(json.success) === 'false') throw new Error(json.message || String(res.status));
        form.reset();
        say(t('form.sent'), 'ok');
      } catch (err) {
        const phone = (SITE.phones || [])[0];
        say(t('form.failed', { phone: phone ? phone.display : '' }), 'error', h('a', { href: mailto }, t('form.mailtoLink')));
      } finally {
        submit.disabled = false;
      }
    });
  }

  /* ---------- Motion: reveal blocks as they scroll into view ---------- */

  function setupReveal() {
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm || !('IntersectionObserver' in window)) return;
    root.classList.add('motion');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        if (el.classList.contains('reveal')) {
          Array.from(el.children).forEach((c, i) => c.style.setProperty('--d', Math.min(i, 8)));
        }
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    const groups = ['.quick-grid', '.section-head', '[data-specials]', '.menu-panels', '.menu-foot',
      '.order-head', '.order-tiles', '.story-text', '[data-gallery]', '[data-reviews]', '.reviews-actions',
      '.contact-info', '.footer-grid'];
    const singles = ['.story-visual', '.contact-form'];
    groups.forEach((sel) => $$(sel).forEach((el) => { el.classList.add('reveal'); io.observe(el); }));
    singles.forEach((sel) => $$(sel).forEach((el) => { el.classList.add('reveal-self'); io.observe(el); }));
  }

  /* ---------- The food: flies out of «Με όλα;», floats, follows the
     pointer, can be grabbed and thrown, and bursts when you click the
     phrase. All of it is off with prefers-reduced-motion. ---------- */

  const SPARKS = { 'il-tomato': '0 0 100 100', 'il-onion': '0 0 100 100', 'il-fry': '0 0 16 80', 'il-pepper': '0 0 60 60', 'il-leaf': '0 0 60 80', 'il-lemon': '0 0 100 62' };

  function setupFood() {
    const items = $$('.deco');
    if (!items.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const fine = matchMedia('(pointer: fine)').matches;
    const bodies = items.map((el) => ({
      el, inner: $('.deco-inner', el), box: el.parentElement,
      depth: parseFloat(el.dataset.depth) || 0.5,
      x: 0, y: 0, vx: 0, vy: 0, r: 0, vr: 0, drag: null, justDragged: false
    }));
    let px = 0;
    let py = 0;
    let running = false;

    // A soft spring pulls every piece towards its parallax target.
    function frame() {
      let moving = false;
      for (const b of bodies) {
        const tx = px * 28 * b.depth;
        const ty = py * 22 * b.depth;
        if (!b.drag) {
          b.vx = (b.vx + (tx - b.x) * 0.07) * 0.82;
          b.vy = (b.vy + (ty - b.y) * 0.07) * 0.82;
          b.x += b.vx;
          b.y += b.vy;
        }
        const tilt = Math.max(-30, Math.min(30, b.vx * 1.6));
        b.vr = (b.vr + (tilt - b.r) * 0.12) * 0.78;
        b.r += b.vr;
        b.el.style.translate = `${b.x.toFixed(2)}px ${b.y.toFixed(2)}px`;
        b.el.style.setProperty('--wob', `${b.r.toFixed(2)}deg`);
        if (b.drag || Math.abs(b.vx) + Math.abs(b.vy) + Math.abs(b.vr) + Math.abs(b.r) > 0.03 ||
            Math.abs(tx - b.x) + Math.abs(ty - b.y) > 0.1) moving = true;
      }
      if (moving) requestAnimationFrame(frame);
      else running = false;
    }
    const kick = () => {
      if (!running) { running = true; requestAnimationFrame(frame); }
    };

    if (fine) {
      addEventListener('pointermove', (e) => {
        px = (e.clientX / innerWidth) * 2 - 1;
        py = (e.clientY / innerHeight) * 2 - 1;
        kick();
      }, { passive: true });
    }

    function hop(b) {
      b.inner.animate([
        { transform: 'translateY(0) scale(1, 1) rotate(0deg)' },
        { transform: 'translateY(6px) scale(1.14, .84) rotate(0deg)', offset: 0.14 },
        { transform: 'translateY(-44px) scale(.9, 1.12) rotate(-190deg)', offset: 0.5 },
        { transform: 'translateY(5px) scale(1.1, .9) rotate(-360deg)', offset: 0.84 },
        { transform: 'translateY(0) scale(1, 1) rotate(-360deg)' }
      ], { duration: 820, easing: 'ease-out', composite: 'add' });
    }

    bodies.forEach((b) => {
      // Mouse and pen can grab and throw; a finger just taps, so the page still scrolls.
      b.el.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch' || e.button !== 0) return;
        e.preventDefault();
        b.el.setPointerCapture(e.pointerId);
        b.drag = { id: e.pointerId, sx: e.clientX - b.x, sy: e.clientY - b.y, lx: e.clientX, ly: e.clientY, moved: 0 };
        b.el.classList.add('is-grabbed');
        b.box.classList.add('is-dragging');
        kick();
      });
      b.el.addEventListener('pointermove', (e) => {
        const d = b.drag;
        if (!d || d.id !== e.pointerId) return;
        const nx = e.clientX - d.sx;
        const ny = e.clientY - d.sy;
        b.vx = nx - b.x;
        b.vy = ny - b.y;
        b.x = nx;
        b.y = ny;
        d.moved += Math.abs(e.clientX - d.lx) + Math.abs(e.clientY - d.ly);
        d.lx = e.clientX;
        d.ly = e.clientY;
      });
      const release = (e) => {
        const d = b.drag;
        if (!d || d.id !== e.pointerId) return;
        b.drag = null;
        b.justDragged = d.moved > 6;
        b.el.classList.remove('is-grabbed');
        if (!bodies.some((o) => o.drag && o.box === b.box)) b.box.classList.remove('is-dragging');
        kick();
      };
      b.el.addEventListener('pointerup', release);
      b.el.addEventListener('pointercancel', release);
      b.el.addEventListener('click', () => {
        if (b.justDragged) { b.justDragged = false; return; }
        hop(b);
      });
    });

    // Entrance: every piece flies out of the phrase to its place.
    const big = $('.hero-big');
    const heroBodies = bodies.filter((b) => b.box.classList.contains('hero-deco'));
    if (big) {
      const c = big.getBoundingClientRect();
      const cx = c.left + c.width / 2;
      const cy = c.top + c.height / 2;
      heroBodies.forEach((b, i) => {
        const r = b.inner.getBoundingClientRect();
        if (!r.width) return;
        const dx = cx - (r.left + r.width / 2);
        const dy = cy - (r.top + r.height / 2);
        b.inner.animate([
          { transform: `translate(${dx}px, ${dy}px) scale(.1) rotate(-200deg)`, opacity: 0 },
          { transform: `translate(${dx}px, ${dy}px) scale(.25) rotate(-160deg)`, opacity: 1, offset: 0.1 },
          { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 }
        ], { duration: 1400, delay: 500 + i * 95, easing: 'cubic-bezier(.3, 1.25, .4, 1)', fill: 'backwards', composite: 'add' });
      });

      // Click the phrase: a burst of ingredients, and everything hops.
      const hero = big.closest('.hero');
      big.addEventListener('click', (e) => {
        const hb = hero.getBoundingClientRect();
        const ox = e.clientX - hb.left;
        const oy = e.clientY - hb.top;
        const ids = Object.keys(SPARKS);
        for (let i = 0; i < 24; i++) {
          const id = ids[i % ids.length];
          const size = id === 'il-fry' ? 12 + Math.random() * 8 : 24 + Math.random() * 28;
          const spark = h('div', { class: 'spark', style: `left:${ox}px;top:${oy}px;width:${size}px` });
          spark.innerHTML = `<svg viewBox="${SPARKS[id]}" aria-hidden="true"><use href="#${id}"/></svg>`;
          hero.append(spark);
          const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.4;
          const speed = 420 + Math.random() * 460;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;
          const spin = (Math.random() - 0.5) * 1000;
          const T = 1.2 + Math.random() * 0.6;
          const frames = [];
          for (let k = 0; k <= 12; k++) {
            const t = (T * k) / 12;
            frames.push({
              transform: `translate(${vx * t - size / 2}px, ${vy * t + 700 * t * t - size / 2}px) rotate(${spin * t}deg) scale(${k ? 1 : 0.3})`,
              opacity: k > 9 ? 1 - (k - 9) / 3 : 1
            });
          }
          spark.animate(frames, { duration: T * 1000, easing: 'linear' }).finished.then(() => spark.remove());
        }
        heroBodies.forEach((b, i) => setTimeout(() => hop(b), 60 + i * 45));
      });
    }
  }

  /* ---------- Start ---------- */

  setupSlots();
  setupReveal();
  setLang(lang, false);
  setupFood();
  probeGallery().then(renderGallery);
  setInterval(updateStatus, 60 * 1000);
})();
