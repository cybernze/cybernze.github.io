/* Motion scenes: each product UI rebuilt in HTML and played as a short, looping demo.
   A scene registers { label, html, play(root, sig) }; play runs once per loop and must await sleep() so it can be stopped. */
(() => {
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  class Stopped extends Error {}
  const SCENES = {};
  // phones: the UI is drawn at 250% inside a square window, and a camera follows the action
  const CAM = matchMedia('(max-width: 820px)').matches;

  const sleep = (ms, sig) => new Promise((res, rej) => {
    if (sig.aborted) return rej(new Stopped());
    const t = setTimeout(res, REDUCE ? Math.min(ms, 60) : ms);
    sig.addEventListener('abort', () => { clearTimeout(t); rej(new Stopped()); }, { once: true });
  });

  // type text into an element, one character at a time
  async function type(el, text, sig, speed = 38) {
    el.textContent = '';
    for (const ch of text) { el.textContent += ch; await sleep(speed + Math.random() * speed * .6, sig); }
  }

  // count a number up inside an element; fmt turns the value into text
  async function count(el, to, sig, ms = 900, fmt = v => Math.round(v).toLocaleString('en-US')) {
    const steps = REDUCE ? 1 : Math.max(8, Math.round(ms / 32));
    try {
      for (let i = 1; i <= steps; i++) { const k = 1 - Math.pow(1 - i / steps, 3); el.textContent = fmt(to * k); await sleep(ms / steps, sig); }
    } catch (e) { if (!(e instanceof Stopped)) throw e; } // counters often run unawaited; stopping the scene ends them quietly
  }

  // camera (phones only): pan so the element sits in the middle of the window; desktop ignores it
  // align 'top' frames the element's top edge near the top of the window instead of centring it
  function focus(root, el, align = 'center') {
    const cam = root.parentElement;
    if (!el || !cam?.classList.contains('sc-cam')) return;
    const r = root.getBoundingClientRect(), t = el.getBoundingClientRect(), c = cam.getBoundingClientRect();
    const cx = t.left - r.left + t.width / 2;
    const cy = align === 'top' ? t.top - r.top + c.height * .42 : t.top - r.top + t.height / 2;
    const x = Math.min(0, Math.max(c.width - r.width, c.width / 2 - cx));
    const y = Math.min(0, Math.max(c.height - r.height, c.height / 2 - cy));
    root.style.transform = `translate(${x}px,${y}px)`;
    const box = cam.querySelector('.sc-mini i');
    // the mini box is the window's share of the UI; translate % is relative to the box itself
    if (box) box.style.transform = `translate(${(-x / c.width) * 100}%,${(-y / c.height) * 100}%)`;
  }

  // the demo pointer: moves to the centre of a target element inside the scene, then clicks
  async function point(root, target, sig, { click = true, ms = 700, follow = true } = {}) {
    const ptr = root.querySelector('.sc-ptr');
    if (!ptr || !target) return;
    if (follow) focus(root, target);
    const r = root.getBoundingClientRect(), t = target.getBoundingClientRect();
    const x = ((t.left - r.left + t.width * .55) / r.width) * 100, y = ((t.top - r.top + t.height * .6) / r.height) * 100;
    ptr.style.transitionDuration = ms + 'ms';
    ptr.style.left = x + '%'; ptr.style.top = y + '%';
    ptr.classList.add('on');
    await sleep(ms + 80, sig);
    if (!click) return;
    ptr.classList.add('tap'); target.classList.add('pressed');
    await sleep(220, sig);
    ptr.classList.remove('tap'); target.classList.remove('pressed');
  }

  const $ = (root, sel) => root.querySelector(sel);
  const $$ = (root, sel) => [...root.querySelectorAll(sel)];

  function mount(el) {
    const scene = SCENES[el.dataset.scene];
    if (!scene || el.dataset.mounted) return;
    el.dataset.mounted = '1';
    el.classList.add('sc', 'sc-' + el.dataset.scene);
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', scene.label);
    if (CAM) {
      const cam = document.createElement('div');
      cam.className = 'sc-cam';
      el.replaceWith(cam); cam.append(el);
      cam.insertAdjacentHTML('beforeend', '<span class="sc-mini" aria-hidden="true"><i></i></span>');
    }
    let ctrl = null;
    const reset = () => { el.innerHTML = scene.html() + '<i class="sc-ptr" aria-hidden="true"></i>'; scene.init?.(el); if (CAM) focus(el, el.querySelector(scene.start || ':scope > *')); };
    reset();
    const loop = async () => {
      ctrl = new AbortController();
      const sig = ctrl.signal;
      try {
        do { reset(); await scene.play(el, sig); } while (!REDUCE && !sig.aborted);
      } catch (e) { if (!(e instanceof Stopped)) throw e; }
    };
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ctrl) loop();
      else if (!e.isIntersecting && ctrl) { ctrl.abort(); ctrl = null; }
    }, { threshold: .2 }).observe(el);
  }

  window.Scenes = {
    register: (name, scene) => { SCENES[name] = scene; },
    mountAll: (root = document) => root.querySelectorAll('[data-scene]').forEach(mount),
    mount, sleep, type, count, point, focus, $, $$, REDUCE, CAM,
  };
  addEventListener('load', () => window.Scenes.mountAll());
})();
