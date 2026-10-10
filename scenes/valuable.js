/* Valuable — rebuilt from the local app (paper white, black ink, hairlines, pill controls, Inter).
   Story: search a company, inspect its filed accounts and checks, open the report, the assistant refuses to move the number.
   Atelier Lumen SAS is the app's own fictional sample company. */
(() => {
  const { register, sleep, type, count, point, $, $$ } = window.Scenes;
  const LOGO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5 12 20l9-14.5M8 5.5l4 6.5 4-6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const GHOST = ['4 812 300', '612 400', '431 700', '1 909 100', '377 900', '2 140 800', '498 200', '1 204 000', '154 200', '176 400', '3 615', '11 264', '300 420', '4 095 559'];
  const eur = v => '€' + Math.round(v).toLocaleString('fr-FR').replace(/ /g, ' ');

  register('valuable', {
    label: 'Valuable demo: search a French company, check its filed accounts, open a sourced valuation range',
    html: () => `
<div class="vl">
  <header class="vl-top"><span class="vl-logo">${LOGO}Valuable</span><span class="vl-nav on">New valuation</span><span class="vl-nav">My valuations</span><i class="vl-av">PO</i></header>
  <section class="vl-view vl-home on">
    <div class="vl-ghost">${Array.from({ length: 42 }, (_, i) => `<span style="--d:${(i * 37) % 11}">${GHOST[i % GHOST.length]}</span>`).join('')}</div>
    <p class="vl-eyebrow">France · INPI / RNE</p>
    <h1>Start with the filings.</h1>
    <p class="vl-lede">Find a French company, inspect its original filed accounts, and see exactly what a valuation still needs.</p>
    <div class="vl-search"><span class="vl-q"></span><b class="vl-go">Search</b><div class="vl-drop"><p><b>Atelier Lumen SAS</b><span>SIREN 000 000 001 · Lyon · Software development</span></p><p><b>Atelier Lumière SARL</b><span>SIREN 000 000 017 · Nantes · Design</span></p></div></div>
    <div class="vl-seg"><span class="on">Name</span><span>SIREN</span></div>
  </section>
  <section class="vl-view vl-co">
    <p class="vl-back">Back to search</p>
    <div class="vl-co-h"><h2>Atelier Lumen SAS</h2><span class="vl-ready">Ready to value</span></div>
    <p class="vl-meta">Société par actions simplifiée, Lyon. Software development (62.01Z).</p>
    <div class="vl-co-grid">
      <div>
        <h3>Filed accounts we found</h3>
        <div class="vl-table"><p class="h"><span>Year</span><span>Form</span><span>Filed</span><span>Status</span></p>
          <p><span>2025</span><span>Full annual accounts</span><span>12 Jun 2026</span><span>Public, will be used</span></p>
          <p><span>2024</span><span>Full annual accounts</span><span>20 Jun 2025</span><span>Public, will be used</span></p>
          <p><span>2023</span><span>Annual accounts</span><span>14 Jun 2024</span><span class="dim">Confidential, can't be used</span></p></div>
        <h3>Headline figures, as filed</h3>
        <div class="vl-figs"><div><small>Revenue 2025</small><b data-v="4812300">€0</b><em>+14.4% on 2024</em></div><div><small>Operating result</small><b data-v="612400">€0</b><em>12.7% margin</em></div><div><small>Net result</small><b data-v="431700">€0</b><em>9.0% margin</em></div></div>
        <h3>Checks before you pay</h3>
        <div class="vl-checks"><p><i></i>Two recent years of public accounts<span>Passed</span></p><p><i></i>Balance sheet and income statement add up<span>Passed</span></p><p class="note"><i></i>2025 depreciation is missing; the reviewer will estimate it<span>Noted</span></p></div>
      </div>
      <aside class="vl-card"><h4>Valuation report</h4><b>€300 <small>excl. VAT</small></b><ul><li>Equity and enterprise value range</li><li>Charts and full tables for every figure</li><li>Assistant to answer questions on the report</li><li>Signed by a named financial reviewer</li></ul><span class="vl-pay">Continue to payment</span></aside>
    </div>
  </section>
  <section class="vl-view vl-rep">
    <p class="vl-back">My valuations</p>
    <div class="vl-co-h"><h2>Atelier Lumen SAS</h2><span class="vl-pdf">Export PDF</span></div>
    <p class="vl-meta">Software development in Lyon. Valued on 3 Oct 2026 from the 2024 and 2025 accounts.</p>
    <div class="vl-hero"><div><small>Equity value, central estimate</small><b class="vl-big">€0.00M</b><em>Range €4.35M to €5.36M</em></div>
      <div class="vl-kv"><span><small>Enterprise value</small><b>€5.06M–6.07M</b></span><span><small>Implied EV/EBITDA</small><b>6.2×</b></span><span><small>Inputs from filings</small><b>7 of 13</b></span></div>
      <div class="vl-range"><i class="vl-band"></i><i class="vl-tr"><i class="vl-thumb"></i></i><span style="left:0">€3M</span><span style="left:25%">€4M</span><span style="left:50%">€5M</span><span style="left:75%">€6M</span><span style="left:100%">€7M</span></div></div>
    <h3>How the value is built</h3>
    <div class="vl-stack"><i style="--w:60%"></i><i style="--w:20%"></i><i style="--w:20%"></i></div>
    <p class="vl-legend"><span>Listed peers, EV/EBITDA 60%</span><span>Listed peers, EV/revenue 20%</span><span>Recent acquisitions 20%</span></p>
    <div class="vl-methods"><p><span>Listed peers, EV/EBITDA<small>60% weight</small></span><span class="ax"><i class="vl-band-g" style="--l:47.0%;--w:20.2%"></i><i class="bar" style="--l:45.0%;--w:18.0%"></i></span><em>4.25–5.15</em></p><p><span>Listed peers, EV/revenue<small>20% weight</small></span><span class="ax"><i class="vl-band-g" style="--l:47.0%;--w:20.2%"></i><i class="bar" style="--l:37.4%;--w:28.8%"></i></span><em>3.87–5.31</em></p><p><span>Recent acquisitions<small>20% weight</small></span><span class="ax"><i class="vl-band-g" style="--l:47.0%;--w:20.2%"></i><i class="bar" style="--l:62.8%;--w:18.0%"></i></span><em>5.14–6.04</em></p><p><span>Book equity<small>reference</small></span><span class="ax"><i class="dot" style="--l:2.8%"></i></span><em>2.14</em></p></div>
    <div class="vl-ask"><p class="vl-askq"></p><p class="vl-aska"></p><span class="vl-askbtn">✦ Ask about this valuation</span></div>
  </section>
</div>`,

    async play(root, sig) {
      // 1 · search
      await sleep(700, sig);
      await point(root, $(root, '.vl-search'), sig);
      await type($(root, '.vl-q'), 'Atelier Lumen', sig, 55);
      $(root, '.vl-search').classList.add('open');
      await sleep(700, sig);
      await point(root, $(root, '.vl-drop p'), sig);
      $(root, '.vl-home').classList.remove('on'); $(root, '.vl-co').classList.add('on');
      await sleep(500, sig);

      // 2 · accounts appear, figures roll, checks pass
      for (const r of $$(root, '.vl-table p:not(.h)')) { r.classList.add('in'); await sleep(260, sig); }
      await Promise.all($$(root, '.vl-figs b').map(b => count(b, +b.dataset.v, sig, 1100, eur)));
      for (const c of $$(root, '.vl-checks p')) { c.classList.add('in'); await sleep(420, sig); }
      $(root, '.vl-ready').classList.add('in');
      await sleep(900, sig);

      // 3 · report: the number, the range, the methods
      $(root, '.vl-nav.on').classList.remove('on'); $$(root, '.vl-nav')[1].classList.add('on');
      $(root, '.vl-co').classList.remove('on'); $(root, '.vl-rep').classList.add('on');
      await sleep(400, sig);
      $(root, '.vl-rep').classList.add('go');
      await count($(root, '.vl-big'), 4.86, sig, 1300, v => '€' + v.toFixed(2) + 'M');
      await sleep(1300, sig);

      // 4 · the assistant explains but cannot move the number
      await point(root, $(root, '.vl-askbtn'), sig);
      $(root, '.vl-ask').classList.add('open');
      await type($(root, '.vl-askq'), 'Can you use an 8× multiple instead?', sig, 34);
      await sleep(500, sig);
      await type($(root, '.vl-aska'), 'No. I can explain the range, not change it. The 6.2× comes from the reviewed peer set.', sig, 18);
      await sleep(2600, sig);
    },
  });
})();
