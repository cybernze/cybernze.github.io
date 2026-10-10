/* Motion scenes: each product UI rebuilt in HTML and played as a short, looping demo.
   A scene registers { label, html, play(root, sig) }; play runs once per loop and must await sleep() so it can be stopped. */
(() => {
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  class Stopped extends Error {}
  const SCENES = {};

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

  // the demo pointer: moves to the centre of a target element inside the scene, then clicks
  async function point(root, target, sig, { click = true, ms = 700 } = {}) {
    const ptr = root.querySelector('.sc-ptr');
    if (!ptr || !target) return;
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
    let ctrl = null;
    const reset = () => { el.innerHTML = scene.html() + '<i class="sc-ptr" aria-hidden="true"></i>'; scene.init?.(el); };
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
    mount, sleep, type, count, point, $, $$, REDUCE,
  };
  addEventListener('load', () => window.Scenes.mountAll());
})();
