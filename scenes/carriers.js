/* Latent Carriers (bachelor's thesis) — results only, from the deposited report (1 Oct 2026).
   Study A: writer × executor, Guard OFF, n=50 per cell. Study B: ±Memory Taint Guard, n=50 per arm. */
(() => {
  const { register, sleep, count, focus, $, $$ } = window.Scenes;
  const MODELS = ['Gemini 2.5 Flash', 'GPT-4.1 mini', 'Claude Haiku 4.5'];
  // sink ASR out of 50; rows = writer, cols = executor (G, M, H)
  const A = [[50, 50, 38], [50, 50, 14], [50, 15, 0]];
  const B = [['CTRL', 'G → G', 0], ['H1', 'H → G', 1], ['H2', 'shared store', 0], ['H3', 'respawn', 0]];

  register('carriers', {
    start: '.cr-mx',
    label: 'Latent Carriers results: study A matrix across writer and executor models, and study B with Memory Taint Guard off and on',
    html: () => `
<div class="cr">
  <header class="cr-top"><b>Latent Carriers</b><span>Memory Taint Guard · bachelor's thesis, UPC</span><em>n = 50 per cell · Wilson 95% CI</em></header>
  <section class="cr-a">
    <h4>Study A <small>writer × executor · guard off</small></h4>
    <div class="cr-mx">
      <span></span>${MODELS.map(m => `<span class="cr-col">${m}</span>`).join('')}
      ${A.map((row, r) => `<span class="cr-row">${MODELS[r]}</span>${row.map(v => `<i style="--v:${v / 50}"><b data-v="${v}">0</b><small>/50</small></i>`).join('')}`).join('')}
    </div>
    <p class="cr-note">Rows write, columns execute. The value lands in memory in all nine cells (50/50); the numbers are how often the executor then completes the tool call.</p>
  </section>
  <section class="cr-b">
    <h4>Study B <small>same arms, guard off vs on</small></h4>
    <div class="cr-bars">${B.map(([k, d, on]) => `<div class="cr-arm"><p><b>${k}</b><small>${d}</small></p><div class="cr-pair"><span class="off" style="--v:1"><em>50</em></span><span class="on" style="--v:${on / 50}"><em>${on}</em></span></div></div>`).join('')}</div>
    <p class="cr-leg"><span><i class="off"></i>Guard off</span><span><i class="on"></i>Guard on</span></p>
    <p class="cr-big"><b class="cr-k">50</b><small>/50 → </small><b class="cr-k2">50</b><small>/50</small><span>tool calls completed in the control arm</span></p>
  </section>
</div>`,

    async play(root, sig) {
      await sleep(500, sig);
      const cells = $$(root, '.cr-mx i');
      for (const c of cells) { c.classList.add('in'); count(c.querySelector('b'), +c.querySelector('b').dataset.v, sig, 600); await sleep(160, sig); }
      await sleep(1400, sig);
      focus(root, $(root, '.cr-bars')); $(root, '.cr').classList.add('b-off');
      await sleep(1200, sig);
      $(root, '.cr').classList.add('b-on');
      await sleep(500, sig); $(root, '.cr-k2').textContent = '0'; focus(root, $(root, '.cr-big'));
      await sleep(3400, sig);
    },
  });
})();
