/* Bulletin Radar — rebuilt from the app's web UI (dark base theme) and fed with the real dataset in data/radar-data.js:
   province outlines, municipality points, weekly counts by phase and three real energy notices. */
(() => {
  const { register, sleep, count, point, focus, $, $$ } = window.Scenes;
  const D = window.RADAR_DATA;
  const CAT = { energia: 'Energía', urbanismo: 'Urbanismo', industria: 'Industria', transporte: 'Transporte', obra_hidraulica: 'Obra hidráulica', puerto: 'Puertos', mineria: 'Minería', otro: 'Otro', costas: 'Costas' };
  const PHASES = ['Información pública', 'Otorgamiento', 'Expropiación', 'Resolución', 'Convocatoria', 'Otro'];
  const days = Math.max(...D.pts.map(p => p[4]));
  const fmtDay = d => new Date(Date.parse(D.d0) + d * 864e5).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  const weekTot = D.weeks.map(w => w.reduce((a, b) => a + b, 0));
  const top = Math.max(...weekTot);

  register('radar', {
    start: '.rd-map svg',
    label: 'Bulletin Radar demo: 1,208 real notices fill the map of Spain week by week, then the energy filter leaves 434',
    html: () => `
<div class="rd">
  <header class="rd-top"><h3>Radar de avisos</h3><p><b class="rd-n">0</b> avisos; el último, el <span class="rd-day">${fmtDay(0)}</span>; 528 con plazo para alegaciones.</p><span class="rd-key">Clave de API</span></header>
  <div class="rd-filters">
    <label><small>Buscar</small><span class="rd-in ph">Municipio, promotor o palabra del título</span></label>
    <label><small>Provincia</small><span class="rd-in">Todas</span></label>
    <label class="rd-cat"><small>Categoría</small><span class="rd-in rd-catv">Todas</span><span class="rd-menu">${D.cats.slice(0, 5).map((c, i) => `<i data-c="${i}">${CAT[c]} <em>${D.catTot[i]}</em></i>`).join('')}</span></label>
    <label><small>Fase</small><span class="rd-in">Todas</span></label>
    <label><small>Boletín</small><span class="rd-in">Todos</span></label>
  </div>
  <div class="rd-grid">
    <section class="rd-map"><h4>Dónde aparecen</h4><p>Cada círculo es un municipio y su tamaño, el número de avisos.</p>
      <svg viewBox="0 0 ${D.w} ${D.h}" aria-hidden="true"><g class="rd-prov">${D.prov.map(d => `<path d="${d}"/>`).join('')}</g>
        <rect class="rd-inset" x="${D.inset.x}" y="${D.inset.y}" width="${D.inset.width}" height="${D.inset.height}"/>
        <g class="rd-pts">${D.pts.map(([x, y, n, c, d]) => `<circle cx="${x}" cy="${y}" r="${(2.2 + Math.sqrt(n) * 2).toFixed(1)}" data-d="${d}" data-c="${c}"/>`).join('')}</g>
        <circle class="rd-ping" r="14"/></svg>
      <div class="rd-card"></div>
    </section>
    <div class="rd-side">
      <section class="rd-week"><h4>Avisos por semana y fase</h4>
        <div class="rd-bars">${D.weeks.map((w, i) => `<div class="rd-col" data-w="${i}">${w.map((v, k) => `<i class="ph${k}" style="--h:${(v / top) * 100}%"></i>`).join('')}</div>`).join('')}</div>
        <p class="rd-axis"><span>17 ago</span><span>31 ago</span><span>14 sept</span><span>28 sept</span></p>
        <p class="rd-leg">${PHASES.slice(0, 4).map((p, k) => `<span><i class="ph${k}"></i>${p}</span>`).join('')}</p></section>
      <section class="rd-cats"><h4>Por categoría</h4>${D.cats.slice(0, 6).map((c, i) => `<p data-c="${i}"><span>${CAT[c]}</span><b><i style="--w:${(D.catTot[i] / D.catTot[0]) * 100}%"></i></b><em data-v="${D.catTot[i]}">0</em></p>`).join('')}</section>
    </div>
  </div>
</div>`,

    async play(root, sig) {
      const pts = $$(root, '.rd-pts circle'), cols = $$(root, '.rd-col'), n = $(root, '.rd-n');
      const byDay = Array.from({ length: days + 1 }, () => []);
      pts.forEach(p => byDay[+p.dataset.d].push(p));
      await sleep(500, sig);
      // 1 · the notices arrive day by day: points, weekly bars and the counter move together
      const start = Date.parse(D.wk0), first = Date.parse(D.d0);
      for (let d = 0; d <= days; d++) {
        byDay[d].forEach(p => p.classList.add('on'));
        const week = Math.floor((first + d * 864e5 - start) / (7 * 864e5));
        cols.forEach((c, i) => c.classList.toggle('on', i <= week));
        const done = weekTot.slice(0, week).reduce((a, b) => a + b, 0) + weekTot[week] * Math.min(1, ((first + d * 864e5 - start) / 864e5 % 7 + 1) / 7);
        n.textContent = Math.round(d === days ? D.total : done).toLocaleString('en-US');
        $(root, '.rd-day').textContent = fmtDay(d);
        $$(root, '.rd-cats em').forEach(e => { e.textContent = Math.round(+e.dataset.v * d / days); });
        root.querySelector('.rd').style.setProperty('--k', (d / days).toFixed(3));
        if (d === Math.round(days * .6)) focus(root, $(root, '.rd-week'));
        await sleep(70, sig);
      }
      focus(root, $(root, '.rd-cats'));
      cols.forEach(c => c.classList.add('on'));
      await sleep(1100, sig);

      // 2 · filter by energy
      await point(root, $(root, '.rd-catv'), sig);
      $(root, '.rd-cat').classList.add('open');
      await sleep(600, sig);
      await point(root, $(root, '.rd-menu i[data-c="0"]'), sig, { ms: 450 });
      $(root, '.rd-cat').classList.remove('open');
      $(root, '.rd-catv').textContent = 'Energía (434)';
      root.querySelector('.rd').classList.add('filtered');
      $$(root, '.rd-cats p').forEach(p => p.classList.toggle('dim', p.dataset.c !== '0'));
      focus(root, $(root, '.rd-map svg'));
      await count(n, 434, sig, 700);
      await sleep(600, sig);

      // 3 · open a real notice
      for (const ex of D.ex.slice(0, 2)) {
        const ping = $(root, '.rd-ping'); ping.setAttribute('cx', ex.xy[0]); ping.setAttribute('cy', ex.xy[1]); ping.classList.add('on');
        const card = $(root, '.rd-card');
        card.innerHTML = `<p class="rd-meta"><b>${ex.src}</b> · ${new Date(ex.pub).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} · Energía · <span class="ip">Información pública</span></p><p class="rd-title">${ex.title}</p><p class="rd-prom">${ex.prom}<em>Plazo ${ex.dl} d</em></p>`;
        card.classList.add('on'); focus(root, card);
        await sleep(2800, sig);
        card.classList.remove('on'); ping.classList.remove('on');
        await sleep(400, sig);
      }
      await sleep(600, sig);
    },
  });
})();
