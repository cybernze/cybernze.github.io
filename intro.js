/* Intro: a large "hello" card with a chat. Answers are written by Carlos and streamed; nothing calls a model.
   While an answer is "thinking", a 3×3 pixel loader runs with a shimmering label and an elapsed timer
   (adapted from the LoadingState component: Drive, Dots and Orbit variants). */
(() => {
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CHEVRON = Array.from({ length: 9 }, (_, i) => ((i % 3) + Math.abs(Math.floor(i / 3) - 1)) * 90);
  const ORBIT_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];
  const ORBIT = Array.from({ length: 9 }, (_, i) => { const k = ORBIT_ORDER.indexOf(i); return k === -1 ? null : k * 110; });
  const VARIANTS = { Drive: { delays: CHEVRON, dur: 650, round: false }, Dots: { delays: CHEVRON, dur: 650, round: true }, Orbit: { delays: ORBIT, dur: 950, round: false } };

  // go: board frame to fly to · inspect: project panel to open · enter: scroll into the board
  const A = {
    specialty: { verb: 'Thinking it over', v: 'Drive',
      a: 'Two things that usually live in different teams. I build agentic AI for regulated work: legal, compliance and finance, where every answer has to be traceable to a source. And I attack it: offensive security and LLM red-teaming, with eight certifications from CRTA to CLLMSP. Building and breaking keep each other honest.',
      chips: [['Tessera is where both meet', 'ask:tessera'], ['My thesis', 'ask:thesis']] },
    background: { verb: 'Reading my CV', v: 'Dots',
      a: 'Computer Engineering at UPC since 2023 (Computer Architecture II 9.9, Operating Systems 9.1, led a 20-person team). In 2025–26 I was an AI Solutions Engineer at Marsh McLennan, building multi-agent pipelines that took client assessments from days to hours. In 2025 I also did a short red-team engagement on ALIA-40B. Since September 2026 I’m an Applied AI Solutions Engineer at Cuatrecasas.',
      chips: [['What do you do now?', 'ask:now'], ['Certifications', 'ask:certs']] },
    now: { verb: 'Checking the calendar', v: 'Dots',
      a: 'Days: Applied AI at Cuatrecasas, building agents for corporate legal work on Azure OpenAI with guarded tool calls. Nights: Tessera, my startup, plus a few projects and my thesis. All of it is on the board below.',
      chips: [['Enter the board', 'enter'], ['What is Tessera?', 'ask:tessera']] },
    tessera: { verb: 'Opening Tessera', v: 'Drive',
      a: 'Tessera is my startup: a regulatory assurance workspace for cybersecurity consultancies. NIS2, DORA, BIA and EU AI Act engagements become reviewed controls and signed deliverables. The AI proposes each control’s state with citations; an agent can fill things in on screen; only a person can save.',
      chips: [['Watch it on the board', 'go:2'], ['Inspect', 'inspect:tessera']] },
    valuable: { verb: 'Pulling the filings', v: 'Drive',
      a: 'Valuable values French companies from their official INPI filings. Every figure stays tied to its source before a value range is built, and the assistant can explain the report but never change it.',
      chips: [['Watch it on the board', 'go:3'], ['Inspect', 'inspect:valuable']] },
    depomind: { verb: 'Swearing in the witness', v: 'Orbit',
      a: 'DepoMind is deposition practice for US litigators, out loud. You question an AI witness while an AI defending counsel objects to the form of your questions. Voice round-trip is about 1.3 to 1.6 seconds.',
      chips: [['Watch it on the board', 'go:4'], ['Inspect', 'inspect:depomind']] },
    radar: { verb: 'Reading seven gazettes', v: 'Orbit',
      a: 'Bulletin Radar reads Spain’s official bulletins every morning and turns permit and energy-project notices into one API and a map: 1,208 notices so far, 266 tests, 96% coverage.',
      chips: [['Watch it on the board', 'go:5'], ['Inspect', 'inspect:radar']] },
    thesis: { verb: 'Re-reading the thesis', v: 'Dots',
      a: 'My thesis is “Latent Carriers”: what one LLM agent writes to long-term memory, another runtime may act on later. I built Memory Taint Guard, a one-bit provenance mark with a pre-tool gate, and measured it at n=50. With the guard on, completed calls in the control arm went from 50/50 to 0/50. Advised by Prof. Xavi Masip, deposit in May 2027.',
      chips: [['See the results', 'go:6'], ['Inspect', 'inspect:carriers']] },
    certs: { verb: 'Counting certificates', v: 'Dots',
      a: 'Eight: CRTA, COAO (offensive AI), CLLMSP (LLM security), WEB-RTA, AD-RTS, Linux Foundation LFEL1012 (secure AI/ML) and LFEL1001 (EU Cyber Resilience Act), and Google’s Generative AI Leader.',
      chips: [['Why red-teaming?', 'ask:specialty']] },
    projects: { verb: 'Opening the board', v: 'Orbit',
      a: 'Five things live on the board: Tessera (my startup), Valuable, DepoMind, Bulletin Radar and my thesis, Latent Carriers. Each one is rebuilt in motion from its real interface. Scroll down, or take the shortcut.',
      chips: [['Enter the board', 'enter']] },
    contact: { verb: 'Finding my email', v: 'Dots',
      a: 'Email is fastest: carlosagudo1@hotmail.com. I’m also on LinkedIn and GitHub (cybernze).',
      chips: [['Write an email', 'link:mailto:carlosagudo1@hotmail.com'], ['LinkedIn', 'link:https://linkedin.com/in/carlos-agudo-91a7a6269'], ['GitHub', 'link:https://github.com/cybernze']] },
  };
  const KEYS = [
    ['contact', /contact|email|mail|hire|linkedin|github|reach|contacto|correo/i],
    ['certs', /cert|crta|cllmsp|coao|badge/i],
    ['thesis', /thesis|tfg|carrier|memory|research|zombie|taint|tesis/i],
    ['tessera', /tessera|startup|compliance|nis2|dora/i],
    ['valuable', /valuable|valuation|inpi|valorac/i],
    ['depomind', /depo|deposition|witness|lawyer|litig|voice/i],
    ['radar', /radar|bulletin|boe|gazette|bolet/i],
    ['now', /now|current|today|cuatrecasas|job|work at|ahora/i],
    ['background', /background|cv|experience|study|studied|university|upc|marsh|career|who are|quién|trayectoria/i],
    ['projects', /project|portfolio|built|board|proyecto/i],
    ['specialty', /special|focus|good at|do you do|expert|skill|red.?team|security|especiali/i],
  ];

  const log = document.getElementById('chat-log'), form = document.getElementById('chat-form'), input = document.getElementById('chat-in'), send = form.querySelector('button');
  const sleep = ms => new Promise(r => setTimeout(r, REDUCE ? 0 : ms));
  let busy = false;

  function loader(variant, label) {
    const { delays, dur, round } = VARIANTS[variant];
    const el = document.createElement('div');
    el.className = 'think'; el.setAttribute('role', 'status');
    el.innerHTML = `<span class="px${round ? ' round' : ''}" aria-hidden="true">${delays.map(d => `<i style="${d === null ? 'opacity:.07' : `animation:pixel-on ${dur}ms ease-in-out ${d}ms infinite`}"></i>`).join('')}</span><span class="shimmer">${label}</span><span class="elapsed">0.0s</span>`;
    const t0 = performance.now(), clock = el.querySelector('.elapsed');
    const tick = setInterval(() => { const s = (performance.now() - t0) / 1000; clock.textContent = s < 60 ? `${s.toFixed(1)}s` : `${Math.floor(s / 60)}m ${(s % 60).toFixed(1)}s`; }, 100);
    el.stop = () => clearInterval(tick);
    return el;
  }

  function bubble(cls, html) { const d = document.createElement('div'); d.className = 'msg ' + cls; d.innerHTML = html; log.append(d); log.scrollTop = log.scrollHeight; return d; }

  async function ask(text, key) {
    if (busy) return;
    busy = true; send.disabled = true;
    bubble('me', escapeHtml(text));
    key = key || (KEYS.find(([, re]) => re.test(text)) || [null])[0];
    const item = A[key] || { verb: 'Thinking', v: 'Drive', a: 'I only answer with what I’ve written down: my specialty, background, Tessera, Valuable, DepoMind, Bulletin Radar, my thesis, certifications or how to reach me. Try one of those.', chips: [['What do you specialise in?', 'ask:specialty'], ['Your background', 'ask:background']] };
    const wrap = bubble('bot', '');
    const l = loader(item.v, item.verb); wrap.append(l);
    log.scrollTop = log.scrollHeight;
    await sleep(900 + Math.random() * 900);
    l.stop(); l.remove();
    const p = document.createElement('p'); wrap.append(p);
    const words = item.a.split(' ');
    for (let i = 0; i < words.length; i++) {
      p.textContent = words.slice(0, i + 1).join(' ');
      if (i % 3 === 0) log.scrollTop = log.scrollHeight;
      await sleep(16 + Math.random() * 26);
    }
    if (item.chips) {
      const row = document.createElement('div'); row.className = 'acts';
      item.chips.forEach(([label, act]) => {
        const b = document.createElement(act.startsWith('link:') ? 'a' : 'button');
        b.className = 'act'; b.textContent = label;
        if (act.startsWith('link:')) { b.href = act.slice(5); if (!act.includes('mailto')) { b.target = '_blank'; b.rel = 'noopener'; } }
        else { b.type = 'button'; b.dataset.act = act; }
        row.append(b);
      });
      wrap.append(row);
    }
    log.scrollTop = log.scrollHeight;
    busy = false; send.disabled = !input.value.trim();
  }
  const escapeHtml = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // actions inside answers
  log.addEventListener('click', e => {
    const b = e.target.closest('button[data-act]'); if (!b) return;
    const [kind, arg] = b.dataset.act.split(':');
    if (kind === 'ask') ask(b.textContent, arg);
    else if (kind === 'go') window.Board.goTo(+arg);
    else if (kind === 'enter') window.Board.goTo(0);
    else if (kind === 'inspect') document.querySelector(`.ins-btn[data-inspect="${arg}"]`)?.click();
  });
  document.querySelectorAll('[data-suggest]').forEach(b => b.addEventListener('click', () => ask(b.textContent, b.dataset.suggest)));
  input.addEventListener('input', () => { send.disabled = busy || !input.value.trim(); });
  form.addEventListener('submit', e => { e.preventDefault(); const t = input.value.trim(); if (!t) return; input.value = ''; ask(t); });

  // the first question asks itself so the loader explains the page
  (async () => {
    await sleep(1100);
    const q = 'What do you specialise in?';
    if (!REDUCE) for (let i = 1; i <= q.length; i++) { input.value = q.slice(0, i); await sleep(42); }
    await sleep(200); input.value = ''; ask(q, 'specialty');
  })();
})();
