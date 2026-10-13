/* Tessera — rebuilt from the live staging UI (ledger palette, Geist, T-of-five-tiles mark).
   Story: the NIS2 mosaic fills, the consultant asks the agent to draft A.04, the agent drives the UI, the human saves. */
(() => {
  const { register, sleep, type, count, point, focus, $, $$ } = window.Scenes;
  const LOGO = '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="4.5" y="4.5" width="28" height="28" rx="3.5" fill="#12110D"/><rect x="36" y="4.5" width="28" height="28" rx="3.5" fill="#12110D"/><rect x="67.5" y="4.5" width="28" height="28" rx="3.5" fill="#12110D"/><rect x="36" y="36" width="28" height="28" rx="3.5" fill="#12110D"/><rect x="36" y="67.5" width="28" height="28" rx="3.5" fill="#1F5EFF"/></svg>';
  // NIS2 mosaic as on the home tile: b = compliant, h = partial, x = gap, o = not reviewed yet
  const MOSAIC = 'bbbxbhhhxx' + 'hhbbhxbxhb' + 'hbbhhxbbbb' + 'bxhxb' + 'ooooo' + 'oooooooooo' + 'ooo';
  const NAV = ['Home', 'Evidence', 'Applicability', 'Risks', 'Obligations', 'Deliverables'];
  const FW = [['NIS2', '35/53'], ['BIA', 'g'], ['Insurance', 'g'], ['DORA', ''], ['EU AI Act', ''], ['ENS', ''], ['CRA', ''], ['AI Shield', '']];
  const CONTROLS = [['A.01', 'Information security policy'], ['A.02', 'Management governance and role'], ['A.03', 'Cybersecurity risk analysis'], ['A.04', 'Management body cybersecurity training'], ['A.05', 'Information asset management']];
  const CRITERIA = ['Training plan approved by the board', 'Attendance records for the last 12 months', 'Content covers NIS2 Art. 20 duties', 'Annual refresh scheduled'];

  register('tessera', {
    start: '.ts-mosaic',
    label: 'Tessera demo: the agent opens control A.04, fills it from cited evidence, and the consultant saves it',
    html: () => `
<div class="ts">
  <aside class="ts-side">
    <div class="ts-brand">${LOGO}<b>Tessera</b></div>
    <div class="ts-client"><i>AW</i><span>Aquaterra Water Ser…</span></div>
    <nav>${NAV.map((n, i) => `<a class="${i ? '' : 'on'}" data-nav="${n}">${n}</a>`).join('')}</nav>
    <h6>Frameworks</h6>
    <nav>${FW.map(([n, v]) => `<a data-nav="${n}">${n}<em class="${v === 'g' ? 'dot g' : v ? '' : 'dot'}">${v === 'g' || !v ? '' : v}</em></a>`).join('')}</nav>
  </aside>
  <div class="ts-main">
    <header class="ts-top">
      <span class="ts-crumb">Aquaterra Water Services, S.A. <i>/</i> <b class="ts-where">Home</b></span>
      <span class="ts-btn">Search <kbd>⌘K</kbd></span><span class="ts-btn ts-ask">✦ Ask Tessera <kbd>⌘J</kbd></span><span class="ts-btn dark">+ New engagement</span>
    </header>
    <section class="ts-view ts-home on">
      <h1>What would you like to work on?</h1>
      <p class="ts-sub">Aquaterra Water Services, S.A. · Drinking water supply and treatment · Active engagement since 09/2026</p>
      <div class="ts-quick">
        <div class="ts-q"><div class="ts-q-art rows"><span><i class="sq b"></i>A.02 Management governance and role</span><span><i class="sq x"></i>D.04 Subcontractor and supply-chain</span><span><i class="sq b"></i>J.02 Privileged access management</span></div><p>Continue Control Desk<em>NIS2</em></p></div>
        <div class="ts-q"><div class="ts-q-art flow"><span>Scope</span><i></i><span>Controls</span><i></i><span><i class="sq b"></i>Report</span></div><p>Start an assessment<em>DORA · AI Act</em></p></div>
        <div class="ts-q"><div class="ts-q-art files"><span>10-Backup-Restore-Policy.pdf</span><span>09-Disaster-Recovery-Plan.docx</span><span>08-Security-Awareness-Training-Log.xlsx</span></div><p>Add evidence<em>10 indexed</em></p></div>
      </div>
      <div class="ts-kpis">
        <div><b><span class="k-rev">0</span><small> / 53</small></b><p>Saved reviews</p></div>
        <div><b>0</b><p>Proposal queue</p></div>
        <div><b class="k-ev">0</b><p>Evidence documents</p></div>
        <div><b><span class="k-ready">0</span><small> %</small></b><p>Deliverable readiness</p></div>
      </div>
      <h2>Frameworks <em>Recent</em></h2>
      <div class="ts-fw">
        <div class="ts-tile"><div class="ts-mosaic">${MOSAIC.split('').map(() => '<i></i>').join('')}</div><b class="ts-tile-n"><span class="k-mos">0</span><small> / 53 reviewed</small></b><p>NIS2</p></div>
        <div class="ts-tile"><b>4 <small>critical</small></b><p>BIA</p></div>
        <div class="ts-tile"><small>Open</small><p>Insurance</p></div>
        <div class="ts-tile"><small>Open</small><p>DORA</p></div>
      </div>
    </section>
    <section class="ts-view ts-desk">
      <div class="ts-tabs"><span>Overview</span><span class="on">Controls Desk</span><span>Proposals</span><span>Risks</span><span>Interviews</span><span>Evidence</span><span>Deliverable</span></div>
      <div class="ts-desk-in">
        <div class="ts-list"><input value="Search 53 controls…" readonly tabindex="-1"><h6>A · Governance and policy <em>4/5</em></h6>
          ${CONTROLS.map(([id, t]) => `<a data-c="${id}"><b>${id}</b>${t}</a>`).join('')}
          <h6>B · Incident management <em>4/6</em></h6><h6>C · Business continuity <em>4/5</em></h6><h6>D · Supply chain <em>2/5</em></h6>
        </div>
        <div class="ts-ctl">
          <p class="ts-id">A.04 · Domain A <span class="ts-crit">Criticality 4 / 5</span></p>
          <h3>Management body cybersecurity training</h3>
          <p class="ts-desc">Members of the management body follow regular cybersecurity training and promote it to staff (NIS2 Art. 20.2).</p>
          <div class="ts-prop"><div class="ts-prop-h"><span class="ts-badge">AI proposal</span><b>Proposed state: <span class="ts-state">Partial</span></b><em>0.82 confidence</em></div>
            <p class="ts-why"></p><div class="ts-cites"></div></div>
          <h6>Step 1 of 3 · Review criteria</h6>
          ${CRITERIA.map((c, i) => `<div class="ts-crit-row" data-k="${i}"><span>${i + 1}.</span>${c}<span class="ts-tri"><i>✓</i><i>~</i><i>✗</i></span></div>`).join('')}
          <div class="ts-foot"><span class="ts-mat">Maturity <b class="ts-lvl">L1</b></span><span class="ts-btn">Clear</span><span class="ts-btn dark ts-save">Save review</span></div>
        </div>
      </div>
    </section>
    <div class="ts-toast">✓ Saved by Admin · A.04 · v3 · traced</div>
  </div>
  <aside class="ts-agent">
    <header><b>✦ Tessera Agent</b><small>Aquaterra Water Services, S.A. · <span class="ts-path">/</span></small></header>
    <div class="ts-chat"><p class="ts-hello">Ask me to open, fill in or check something. I change it on screen and you save it.</p></div>
    <div class="ts-chips"><span>Open the controls desk</span><span>What is still pending here?</span></div>
    <div class="ts-in"><span class="ts-typed"></span><i class="ts-caret"></i></div>
  </aside>
</div>`,

    async play(root, sig) {
      const tiles = $$(root, '.ts-mosaic i');
      // 1 · home: the mosaic fills in review order while the KPIs count
      count($(root, '.k-rev'), 35, sig, 1600); count($(root, '.k-ev'), 10, sig, 1200); count($(root, '.k-ready'), 66, sig, 1600);
      const k = $(root, '.k-mos');
      for (let i = 0; i < tiles.length; i++) {
        const s = MOSAIC[i];
        if (s === 'o') continue;
        tiles[i].className = s; k.textContent = String($$(root, '.ts-mosaic i.b, .ts-mosaic i.h, .ts-mosaic i.x').length);
        await sleep(34, sig);
      }
      await sleep(900, sig);

      // 2 · open the agent and ask
      await point(root, $(root, '.ts-ask'), sig);
      root.querySelector('.ts').classList.add('agent');
      $(root, '.ts-path').textContent = '/';
      await sleep(700, sig);
      focus(root, $(root, '.ts-agent'), 'top');
      await point(root, $(root, '.ts-in'), sig, { ms: 500, follow: false });
      await type($(root, '.ts-typed'), 'Open A.04 and draft it from the evidence', sig, 30);
      await sleep(250, sig);
      const chat = $(root, '.ts-chat');
      const say = (cls, html) => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; chat.append(d); return d; };
      say('ts-u', $(root, '.ts-typed').textContent); $(root, '.ts-typed').textContent = '';
      $(root, '.ts-chips').classList.add('gone');
      await sleep(400, sig);
      const steps = say('ts-steps', ''); focus(root, $(root, '.ts-chat'), 'top');
      const step = async (txt, fn, wait = 650) => {
        const s = document.createElement('p'); s.innerHTML = `<i></i>${txt}`; steps.append(s);
        await sleep(wait, sig); if (fn) await fn(); s.classList.add('done'); await sleep(200, sig);
      };

      // 3 · the agent drives the UI
      await step('Opening NIS2 · Controls Desk', async () => {
        $(root, '.ts-home').classList.remove('on'); $(root, '.ts-desk').classList.add('on');
        $(root, '.ts-where').innerHTML = 'NIS2 <i>/</i> Controls Desk'; $(root, '.ts-path').textContent = '/tools/nis2';
        $$(root, '.ts-side a').forEach(a => a.classList.toggle('on', a.dataset.nav === 'NIS2'));
      });
      await step('Selecting A.04', async () => { $(root, '[data-c="A.04"]').classList.add('on'); $(root, '.ts-ctl').classList.add('on'); }, 500);
      await step('Reading 2 cited documents', async () => {
        const c = $(root, '.ts-cites'); $(root, '.ts-prop').classList.add('on'); focus(root, $(root, '.ts-prop'));
        for (const f of ['08-Security-Awareness-Training-Log.xlsx · p. 3', '01-Information-Security-Policy.pdf · §4.2']) {
          const s = document.createElement('span'); s.textContent = f; c.append(s); await sleep(260, sig);
        }
      }, 800);
      await step('Filling the criteria', async () => {
        const marks = [0, 0, 1, 2]; focus(root, $(root, '[data-k="1"]'));
        for (const [i, m] of marks.entries()) { $(root, `[data-k="${i}"]`).querySelectorAll('.ts-tri i')[m].classList.add('on'); await sleep(260, sig); }
        $(root, '.ts-lvl').textContent = 'L2'; $(root, '.ts-mat').classList.add('flash');
        await type($(root, '.ts-why'), 'Board training happened in March (log, p. 3) but there is no annual refresh scheduled.', sig, 14);
      }, 400);
      focus(root, $(root, '.ts-chat'), 'top'); say('ts-a', 'Done. I filled A.04 on screen. <b>Review it and save — I never save on my own.</b>');
      $(root, '.ts-save').classList.add('ring');
      await sleep(1700, sig);

      // 4 · the consultant saves
      root.querySelector('.sc-ptr').classList.add('human');
      await point(root, $(root, '.ts-save'), sig, { ms: 900 });
      $(root, '.ts-save').classList.remove('ring');
      $(root, '.ts-toast').classList.add('on'); focus(root, $(root, '.ts-toast'));
      await sleep(2600, sig);
    },
  });
})();
