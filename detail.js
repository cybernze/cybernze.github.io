/* Inspect panel: click a project frame to see what it is, what I built, how it flows, the stack and the numbers. */
(() => {
  const P = {
    tessera: {
      name: 'Tessera', kind: 'Startup · Founder · since Aug 2026', link: ['tesserahq.eu', 'https://tesserahq.eu'],
      summary: 'A regulatory assurance workspace for cybersecurity consultancies. NIS2, DORA, BIA and EU AI Act engagements become reviewed controls, registers and versioned deliverables. The AI proposes, the consultant signs, and every step is traced.',
      built: [
        'Control desks for NIS2 (53 controls), DORA, BIA, EU AI Act, ENS, CRA and ISO 42001, sharing one evidence layer',
        'AI proposals that carry a state, a rationale and citations to the client’s own documents',
        'Tessera Agent: a sidebar that opens, fills in and checks things on screen, and is blocked from saving',
        'Versioned deliverables: a snapshot freezes the saved reviews, citations and hashes at issue time',
        'A unified risk register, an obligations calendar and an insurance-readiness index built from accepted evidence',
      ],
      flow: ['Client evidence · PDF, DOCX, XLSX', 'Indexed with citations', 'AI proposal · state + rationale', 'Consultant review and signature', 'Versioned deliverable'],
      stack: { Frontend: ['TypeScript', 'React', 'React Router'], Backend: ['Express', 'Zod', 'Prisma', 'PostgreSQL'], AI: ['Retrieval over client evidence', 'Cited LLM proposals', 'Agent UI driver'] },
      nums: [['53', 'NIS2 controls in the desk'], ['8', 'framework modules, one workspace'], ['0', 'saves made by the agent']],
    },
    valuable: {
      name: 'Valuable', kind: 'Project · France pilot · 2026',
      summary: 'Valuable values French private companies from their official filings. It pulls the original accounts from the INPI registry, keeps every figure tied to its source, and only then builds a value range.',
      built: [
        'Name and SIREN search, with original JSON and PDF accounts acquired from INPI and kept byte for byte',
        'Mapping of full and simplified French accounts to statements, with source-cell references and accounting checks',
        'Reviewed normalization of units and adjustments before any valuation runs',
        'An EV/EBITDA indication with explicit assumptions, formulas and JSON export; missing inputs become blockers',
        'A report assistant that explains the numbers but cannot change a calculation or approve readiness',
      ],
      flow: ['INPI / RNE registry', 'Original filings, preserved', 'Statements with source cells', 'Reviewed normalization', 'Value range and report'],
      stack: { Frontend: ['React 19', 'Vite', 'TypeScript'], Backend: ['Python', 'FastAPI', 'Pydantic', 'SQLite'], Data: ['INPI API', 'ECB', 'Eurostat', 'Damodaran'], AI: ['Anthropic / OpenRouter, explain-only'] },
      nums: [['285', 'backend tests'], ['68', 'source cells checked against originals'], ['0', 'calculations the AI can change']],
    },
    depomind: {
      name: 'DepoMind', kind: 'Project · US litigation · 2026',
      summary: 'Deposition practice for US litigators, out loud. You question an AI witness that has a case file and a temper, while an AI defending counsel objects to the form of your questions. Afterwards: the transcript, the objections and your talk ratio.',
      built: [
        'A real-time voice room on LiveKit: speech-to-text, witness model, objection check and text-to-speech in one loop',
        'A gate that classifies each question before the witness answers, so counsel can object on form',
        'Case files with story, people, timeline, witness dossier and issues, plus an “Ask the case” chat',
        'Session review: searchable transcript, contradictions, objections and talk ratio',
        'A pure domain package covered by tests at 100%',
      ],
      flow: ['Attorney’s voice', 'Speech-to-text', 'Objection check on form', 'AI witness with the case file', 'Text-to-speech'],
      stack: { Web: ['Next.js 16', 'React 19'], Voice: ['LiveKit Agents', 'ElevenLabs', 'Deepgram Flux'], Models: ['Qwen3 via OpenRouter / Cerebras'], API: ['Python', 'FastAPI'] },
      nums: [['1.3–1.6 s', 'measured voice round-trip'], ['2', 'AI roles in the room'], ['100%', 'domain test coverage']],
    },
    radar: {
      name: 'Bulletin Radar', kind: 'Project · Spain · 2026',
      summary: 'Spain’s official bulletins, read every morning. Permit and energy-project notices become one structured API and a map, so nobody has to scroll through gazettes again.',
      built: [
        'Source adapters for BOE and regional bulletins; seven publish into the current dataset',
        'Hybrid extraction: rules first, an LLM for the rest. Category, phase, promoter, municipalities and deadline',
        'Geolocation by INE municipality code, with the province derived from the municipality',
        'A FastAPI service with API keys, plans, full-text search and CSV export',
        'The map and charts UI in plain JavaScript and SVG',
      ],
      flow: ['7 official bulletins', 'PDF and HTML text', 'Rules + LLM extraction', 'SQLite with full-text search', 'API and map'],
      stack: { Backend: ['Python', 'FastAPI', 'Pydantic', 'SQLite FTS5', 'pypdf'], UI: ['Vanilla JS', 'SVG'], Quality: ['pytest', 'ruff', 'mypy'] },
      nums: [['1,208', 'relevant notices out of 7,710 read'], ['266', 'tests · 96% coverage'], ['89.8%', 'field accuracy on a 92-notice gold set (target 95%)']],
    },
    carriers: {
      name: 'Latent Carriers', kind: 'Bachelor’s thesis · UPC · 2027',
      summary: 'Can a value that one LLM agent writes to long-term memory, without acting on it, be acted on later by another runtime: another model, a shared store or a respawned process? I built Memory Taint Guard, a one-bit provenance mark with a pre-tool gate, and measured it in three controlled studies in an isolated lab.',
      built: [
        'A reproducible lab harness with JSONL logs and a localhost-only sink',
        'Study A: a 3×3 writer × executor matrix over Claude Haiku 4.5, Gemini 2.5 Flash and GPT-4.1 mini, n=50 per cell',
        'Study B: guard off vs on across cross-model, shared-store and respawn handoffs, n=50 per arm',
        'With the guard on, completed calls fell from 50/50 to 0/50 (1/50 in the cross-model arm)',
        'Stated limits: it is not complete information-flow control, and utility cost is reported per arm',
      ],
      flow: ['External content', 'Memory entry with a provenance bit', 'Another runtime reads it', 'Pre-tool gate checks the bit', 'Tool call allowed or blocked'],
      stack: { Lab: ['Python', 'JSONL', 'OpenRouter'], Models: ['Claude Haiku 4.5', 'Gemini 2.5 Flash', 'GPT-4.1 mini'], Stats: ['Wilson 95% CI', 'Bootstrap'] },
      nums: [['50 → 0', 'completed calls, control arm, guard off → on'], ['9 / 9', 'cells where the value persisted'], ['n = 50', 'per cell and per arm']],
      note: 'Advised by Prof. Xavi Masip. Deposit planned for May 2027.',
    },
  };

  const panel = document.getElementById('inspect');
  let last = null;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function render(p) {
    return `
      <header><span class="ins-kind">${esc(p.kind)}</span><h2 id="ins-title">${esc(p.name)}</h2>
        <button class="ins-x" type="button" aria-label="Close">×</button></header>
      <p class="ins-sum">${esc(p.summary)}</p>
      <div class="ins-nums">${p.nums.map(([b, s]) => `<div><b>${esc(b)}</b><small>${esc(s)}</small></div>`).join('')}</div>
      <h3>How it flows</h3>
      <ol class="ins-flow">${p.flow.map(f => `<li>${esc(f)}</li>`).join('')}</ol>
      <h3>What I built</h3>
      <ul class="ins-built">${p.built.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      <h3>Stack</h3>
      <dl class="ins-stack">${Object.entries(p.stack).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v.map(x => `<span>${esc(x)}</span>`).join('')}</dd>`).join('')}</dl>
      ${p.note ? `<p class="ins-note">${esc(p.note)}</p>` : ''}
      ${p.link ? `<a class="ins-link" href="${p.link[1]}" target="_blank" rel="noopener">${esc(p.link[0])} ↗</a>` : ''}`;
  }

  function open(key, from) {
    const p = P[key]; if (!p) return;
    last = from || document.activeElement;
    panel.innerHTML = render(p);
    panel.hidden = false;
    requestAnimationFrame(() => document.body.classList.add('inspecting'));
    panel.querySelector('.ins-x').addEventListener('click', close);
    panel.querySelector('.ins-x').focus({ preventScroll: true });
  }
  function close() {
    if (panel.hidden) return;
    document.body.classList.remove('inspecting');
    setTimeout(() => { panel.hidden = true; }, 350);
    last?.focus?.({ preventScroll: true });
  }

  document.querySelectorAll('[data-inspect]').forEach(el => {
    el.addEventListener('click', e => { e.stopPropagation(); open(el.dataset.inspect, el); });
  });
  document.getElementById('scrim').addEventListener('click', close);
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
