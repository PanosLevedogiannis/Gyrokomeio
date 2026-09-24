/*
  «Γέμισε την πίτα» / "Fill the pita": a small catch game.
  ------------------------------------------------------------------
  Move the pita, catch gyros, tomato, onion, tzatziki and fries.
  All five make a pita «με όλα» (+50). Lemon and pepper are extras.
  Pineapple costs a life. 45 seconds, 3 lives.
  The sprites are the site's own SVG illustrations, drawn to a canvas.
*/
(() => {
  'use strict';

  const stage = document.querySelector('[data-game]');
  if (!stage) return;

  const $ = (sel, ctx = stage) => ctx.querySelector(sel);
  const $$ = (sel, ctx = stage) => Array.from(ctx.querySelectorAll(sel));
  const canvas = $('.game-canvas');
  const ctx = canvas.getContext('2d');
  const I18N = window.I18N || { js: {} };
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'el');
  const t = (key, vars) => {
    const entry = I18N.js[key];
    let s = entry ? (entry[lang()] != null ? entry[lang()] : entry.el) : key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
    return s;
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const GAME_TIME = 45;
  const LIVES = 3;
  const CORE = ['meat', 'tomato', 'onion', 'tzatziki', 'fries'];
  const KINDS = {
    meat: { id: 'il-meat', vb: [100, 72], size: 64, points: 10 },
    tomato: { id: 'il-tomato', vb: [100, 100], size: 50, points: 10 },
    onion: { id: 'il-onion', vb: [100, 100], size: 48, points: 10 },
    tzatziki: { id: 'il-tzatziki', vb: [100, 82], size: 58, points: 10 },
    fries: { id: 'il-fries', vb: [120, 160], size: 62, points: 10 },
    lemon: { id: 'il-lemon', vb: [100, 62], size: 50, points: 5 },
    pepper: { id: 'il-pepper', vb: [60, 60], size: 40, points: 5 },
    pineapple: { id: 'il-pineapple', vb: [80, 112], size: 60, bad: true }
  };
  const BACK = { id: 'il-cone-back', vb: [200, 176], size: 200 };
  const FRONT = { id: 'il-cone-front', vb: [200, 176], size: 200 };

  let W = 0;
  let H = 0;
  let dpr = 1;
  let scale = 1;
  const pita = { x: 0, tx: 0, w: 130, h: 114, top: 0, tilt: 0 };
  const keys = { left: false, right: false };
  const state = {
    running: false, paused: false, last: 0, time: GAME_TIME, lives: LIVES, score: 0, pitas: 0,
    spawnIn: 0, items: [], bits: [], floaters: [], got: new Set(), filling: [], shake: 0, flash: 0
  };

  /* ---------- Sprites: the page's SVG symbols, rasterised once ---------- */

  let ready = null;
  function loadSprites() {
    if (ready) return ready;
    const sprite = document.getElementById('il-tomato');
    const source = sprite ? sprite.closest('svg').innerHTML : '';
    const kinds = [...Object.values(KINDS), BACK, FRONT];
    ready = Promise.all(kinds.map((k) => new Promise((resolve) => {
      const [w, h] = k.vb;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${source}<use href="#${k.id}" width="${w}" height="${h}"/></svg>`;
      const img = new Image();
      img.onload = () => {
        const px = Math.min(2, window.devicePixelRatio || 1) * (k.size * 1.5);
        const f = px / Math.max(w, h);
        const c = document.createElement('canvas');
        c.width = Math.ceil(w * f);
        c.height = Math.ceil(h * f);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        k.bmp = c;
        resolve();
      };
      img.onerror = () => resolve();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    })));
    return ready;
  }

  // Draw a sprite so its longest side is `size`, centred on (x, y).
  function sprite(k, x, y, size, rot = 0, alpha = 1) {
    if (!k.bmp) return;
    const [w, h] = k.vb;
    const f = size / Math.max(w, h);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    if (rot) ctx.rotate(rot);
    ctx.drawImage(k.bmp, (-w * f) / 2, (-h * f) / 2, w * f, h * f);
    ctx.restore();
  }

  /* ---------- Layout ---------- */

  function resize() {
    const r = canvas.getBoundingClientRect();
    if (!r.width) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = r.width;
    H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    scale = clamp(W / 760, 0.72, 1.15);
    pita.w = clamp(W * 0.19, 104, 170);
    pita.h = (pita.w * 176) / 200;
    pita.top = H - pita.h - 8;
    if (!state.running) { pita.x = pita.tx = W / 2; }
    pita.tx = clamp(pita.tx, pita.w * 0.42, W - pita.w * 0.42);
    draw();
  }

  /* ---------- HUD ---------- */

  const hud = {
    score: $('[data-game-score]'), pitas: $('[data-game-pitas]'), time: $('[data-game-time]'),
    lives: $$('[data-game-lives] svg'), need: $$('[data-need]'), toast: $('[data-game-toast]')
  };
  let shownTime = -1;
  function updateHud() {
    hud.score.textContent = state.score;
    hud.pitas.textContent = state.pitas;
    const secs = Math.ceil(state.time);
    if (secs !== shownTime) { hud.time.textContent = secs; shownTime = secs; }
    hud.lives.forEach((el, i) => el.classList.toggle('lost', i >= state.lives));
    hud.need.forEach((el) => el.classList.toggle('got', state.got.has(el.dataset.need)));
  }
  function toast(text, bad) {
    const el = hud.toast;
    el.textContent = text;
    el.classList.remove('show', 'bad');
    void el.offsetWidth;
    el.classList.add('show');
    el.classList.toggle('bad', !!bad);
  }

  /* ---------- Game ---------- */

  function spawn() {
    const elapsed = GAME_TIME - state.time;
    const bad = 0.13 + elapsed * 0.0045;
    const r = Math.random();
    let type;
    if (r < bad) type = 'pineapple';
    else if (r < bad + 0.12) type = Math.random() < 0.5 ? 'lemon' : 'pepper';
    else {
      const need = CORE.filter((k) => !state.got.has(k));
      const pool = need.length && Math.random() < 0.62 ? need : CORE;
      type = pool[Math.floor(Math.random() * pool.length)];
    }
    const size = KINDS[type].size * scale * (0.9 + Math.random() * 0.2);
    const speed = (175 + elapsed * 5.2) * (0.85 + Math.random() * 0.3) * clamp(H / 480, 0.9, 1.2);
    state.items.push({
      type, size, x: size / 2 + Math.random() * (W - size), y: -size / 2 - 60,
      vy: speed, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 3, sway: Math.random() * 6.28
    });
  }

  function burst(x, y, n, kinds) {
    if (calm) n = Math.round(n / 3);
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.3;
      const s = 180 + Math.random() * 320;
      state.bits.push({
        k: KINDS[kinds[i % kinds.length]], x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        rot: Math.random() * 6, vr: (Math.random() - 0.5) * 12, size: (16 + Math.random() * 16) * scale, life: 1
      });
    }
  }

  function catchItem(it) {
    if (!state.running) return;
    const k = KINDS[it.type];
    if (k.bad) {
      state.lives -= 1;
      state.shake = calm ? 0 : 0.35;
      state.flash = 0.5;
      toast(t('game.pineapple'), true);
      if (state.lives <= 0) { updateHud(); end(); return; }
    } else {
      state.score += k.points;
      state.floaters.push({ text: '+' + k.points, x: it.x, y: pita.top, life: 1 });
      if (CORE.includes(it.type) && !state.got.has(it.type)) {
        state.got.add(it.type);
        state.filling.push({ k, dx: (Math.random() - 0.5) * 0.5, dy: Math.random(), rot: (Math.random() - 0.5) * 1.2 });
        if (state.got.size === CORE.length) {
          state.pitas += 1;
          state.score += 50;
          toast(t('game.full'));
          burst(pita.x, pita.top, 18, CORE.concat(['lemon', 'pepper']));
          setTimeout(() => { state.got.clear(); state.filling = []; updateHud(); }, 450);
        }
      }
    }
    updateHud();
  }

  function frame(now) {
    if (!state.running || state.paused) return;
    const dt = Math.min(0.05, (now - state.last) / 1000 || 0);
    state.last = now;

    state.time -= dt;
    if (state.time <= 0) { state.time = 0; updateHud(); end(); return; }
    state.spawnIn -= dt;
    if (state.spawnIn <= 0) {
      spawn();
      state.spawnIn = Math.max(0.36, 0.85 - (GAME_TIME - state.time) * 0.011);
    }

    const speed = 620 * scale;
    if (keys.left) pita.tx -= speed * dt;
    if (keys.right) pita.tx += speed * dt;
    pita.tx = clamp(pita.tx, pita.w * 0.42, W - pita.w * 0.42);
    const before = pita.x;
    pita.x += (pita.tx - pita.x) * Math.min(1, dt * 18);
    pita.tilt = clamp((pita.x - before) * 0.02, -0.22, 0.22);

    const mouth = pita.top + pita.h * 0.36;
    state.items = state.items.filter((it) => {
      it.y += it.vy * dt;
      it.rot += it.vr * dt;
      it.sway += dt * 2;
      it.x += Math.sin(it.sway) * 18 * dt;
      if (it.y + it.size * 0.25 >= mouth && it.y - it.size * 0.3 <= mouth + pita.h * 0.2 &&
          Math.abs(it.x - pita.x) <= pita.w * 0.4) {
        catchItem(it);
        return false;
      }
      return it.y - it.size < H;
    });
    if (!state.running) return;

    state.bits = state.bits.filter((b) => {
      b.vy += 900 * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.rot += b.vr * dt;
      b.life -= dt * 0.8;
      return b.life > 0 && b.y < H + 40;
    });
    state.floaters = state.floaters.filter((f) => { f.y -= 60 * dt; f.life -= dt * 1.4; return f.life > 0; });
    state.shake = Math.max(0, state.shake - dt);
    state.flash = Math.max(0, state.flash - dt);

    updateHud();
    draw();
    requestAnimationFrame(frame);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const it of state.items) sprite(KINDS[it.type], it.x, it.y, it.size, it.rot);

    const sx = state.shake ? (Math.random() - 0.5) * 14 * state.shake * 3 : 0;
    ctx.save();
    ctx.translate(pita.x + sx, pita.top + pita.h / 2);
    ctx.rotate(pita.tilt);
    sprite(BACK, 0, 0, pita.w);
    const rim = -pita.h / 2 + pita.h * 0.36;
    for (const f of state.filling) {
      sprite(f.k, f.dx * pita.w * 0.8, rim - f.dy * pita.w * 0.14, pita.w * 0.36, f.rot);
    }
    sprite(FRONT, 0, 0, pita.w);
    ctx.restore();

    for (const b of state.bits) sprite(b.k, b.x, b.y, b.size, b.rot, Math.min(1, b.life * 1.5));
    ctx.font = `900 ${Math.round(22 * scale)}px 'Sofia Sans Extra Condensed', sans-serif`;
    ctx.textAlign = 'center';
    for (const f of state.floaters) {
      ctx.globalAlpha = Math.max(0, f.life);
      ctx.fillStyle = '#F2B632';
      ctx.fillText(f.text, f.x, f.y);
    }
    ctx.globalAlpha = 1;
    if (state.flash) {
      ctx.fillStyle = `rgba(255, 90, 60, ${state.flash * 0.35})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  /* ---------- Screens ---------- */

  const screens = { start: $('[data-game-start]'), paused: $('[data-game-paused]'), over: $('[data-game-over]') };
  const show = (name) => Object.entries(screens).forEach(([k, el]) => { el.hidden = k !== name; });
  const readBest = () => { try { return Number(localStorage.getItem('gk-game-best')) || 0; } catch (e) { return 0; } };
  const writeBest = (v) => { try { localStorage.setItem('gk-game-best', String(v)); } catch (e) { /* private mode */ } };
  function showBest() {
    const best = readBest();
    $$('[data-game-best]').forEach((el) => { el.textContent = best ? t('game.best', { best }) : ''; });
  }

  async function start() {
    const buttons = $$('[data-game-play]');
    buttons.forEach((b) => { b.disabled = true; });
    await loadSprites();
    buttons.forEach((b) => { b.disabled = false; });
    resize();
    Object.assign(state, {
      running: true, paused: false, time: GAME_TIME, lives: LIVES, score: 0, pitas: 0, spawnIn: 0.4,
      items: [], bits: [], floaters: [], filling: [], shake: 0, flash: 0
    });
    state.got.clear();
    shownTime = -1;
    pita.x = pita.tx = W / 2;
    stage.classList.add('is-playing');
    show(null);
    updateHud();
    canvas.focus({ preventScroll: true });
    state.last = performance.now();
    requestAnimationFrame(frame);
  }

  function end() {
    state.running = false;
    stage.classList.remove('is-playing');
    keys.left = keys.right = false;
    const best = readBest();
    const word = state.pitas === 1 ? t('game.pita1') : t('game.pitaN');
    $('[data-game-result]').textContent = t('game.result', { pitas: state.pitas, word, score: state.score });
    if (state.score > best) {
      writeBest(state.score);
      $('[data-game-over] [data-game-best]').textContent = t('game.newBest');
    } else {
      $('[data-game-over] [data-game-best]').textContent = best ? t('game.best', { best }) : '';
    }
    if (state.pitas) burst(W / 2, H * 0.6, 20, CORE);
    show('over');
    const again = $('[data-game-over] [data-game-play]');
    if (again) again.focus({ preventScroll: true });
    // let the last confetti fall behind the results screen
    const settle = (now) => {
      const dt = Math.min(0.05, (now - state.last) / 1000 || 0);
      state.last = now;
      state.bits = state.bits.filter((b) => { b.vy += 900 * dt; b.x += b.vx * dt; b.y += b.vy * dt; b.rot += b.vr * dt; b.life -= dt * 0.8; return b.life > 0; });
      draw();
      if (state.bits.length && !state.running) requestAnimationFrame(settle);
    };
    state.last = performance.now();
    requestAnimationFrame(settle);
  }

  function pause() {
    if (!state.running || state.paused) return;
    state.paused = true;
    show('paused');
  }
  function resume() {
    if (!state.running || !state.paused) return;
    state.paused = false;
    show(null);
    canvas.focus({ preventScroll: true });
    state.last = performance.now();
    requestAnimationFrame(frame);
  }

  /* ---------- Controls ---------- */

  const pointAt = (e) => { pita.tx = e.clientX - canvas.getBoundingClientRect().left; };
  canvas.addEventListener('pointermove', (e) => { if (state.running) pointAt(e); });
  canvas.addEventListener('pointerdown', (e) => {
    if (!state.running) return;
    pointAt(e);
    if (e.pointerType !== 'mouse') canvas.setPointerCapture(e.pointerId);
  });
  document.addEventListener('keydown', (e) => {
    if (!state.running || state.paused) return;
    const k = e.key;
    if (k === 'ArrowLeft' || k === 'a' || k === 'A') { keys.left = true; e.preventDefault(); }
    else if (k === 'ArrowRight' || k === 'd' || k === 'D') { keys.right = true; e.preventDefault(); }
    else if (k === 'Escape' || k === 'p' || k === 'P') pause();
  });
  document.addEventListener('keyup', (e) => {
    const k = e.key;
    if (k === 'ArrowLeft' || k === 'a' || k === 'A') keys.left = false;
    else if (k === 'ArrowRight' || k === 'd' || k === 'D') keys.right = false;
  });

  $$('[data-game-play]').forEach((b) => b.addEventListener('click', start));
  $('[data-game-resume]').addEventListener('click', resume);

  $('[data-game-share]').addEventListener('click', async () => {
    const url = location.origin + location.pathname + '#game';
    const text = t('game.shareText', { score: state.score });
    if (navigator.share) {
      try { await navigator.share({ title: 'Γυροκομείο Grill', text, url }); return; } catch (e) { /* cancelled */ }
    }
    try { await navigator.clipboard.writeText(`${text} ${url}`); toast(t('game.copied')); } catch (e) { /* no clipboard */ }
  });

  // Pause when the game scrolls away or the tab is hidden.
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) pause();
      else loadSprites().then(() => { if (!state.running) resize(); });
    }, { threshold: 0.25 }).observe(stage);
  }
  if ('ResizeObserver' in window) new ResizeObserver(() => resize()).observe(stage);

  showBest();
  resize();
})();
