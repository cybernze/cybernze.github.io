/* DepoMind — rebuilt from the Next.js app's remote deposition room (dark, Newsreader + Inter, mono transcript).
   Story: question, answer, a compound question draws an objection on form, rephrase, then an exhibit is shared. */
(() => {
  const { register, sleep, type, point, focus, $, $$ } = window.Scenes;
  const BARS = '<i></i>'.repeat(9);

  register('depomind', {
    start: '.dm-stage',
    label: 'DepoMind demo: an attorney questions an AI witness, AI defending counsel objects to a compound question, an exhibit is shared',
    html: () => `
<div class="dm">
  <header class="dm-steps"><span class="done"><i>1</i>Case file</span><b></b><span class="done"><i>2</i>Prepare</span><b></b><span class="on"><i>3</i>On the record</span><b></b><span><i>4</i>Review</span><em>Hale Supply v. Northbeam</em></header>
  <div class="dm-head"><span class="dm-rec">On the record</span><h3>Deposition of Daniel Hale</h3><span class="dm-line">Line <b class="dm-ln">1</b></span><span class="dm-time">0:00</span></div>
  <div class="dm-body">
    <div class="dm-stage"><div class="dm-wit"><i></i><b>Daniel Hale</b><small>Witness · VP Operations, Hale Supply</small></div>
      <div class="dm-sheet"><p class="dm-ex">Ex. 8 · email from D. Hale to J. Okafor · Feb 21</p><p class="dm-quote">“Hold this until the amendment is signed.”</p><p class="dm-src"><span>Ex. 8</span><span>Supplied excerpt</span></p></div>
      <div class="dm-obj"><span>Objection</span><b>Form. Compound question.</b></div>
      <div class="dm-you"><div class="dm-orb"></div><b>You</b><small>Asking</small></div>
      <p class="dm-cc"><i>CC</i><span class="dm-cap"></span></p>
    </div>
    <aside class="dm-tr"><div class="dm-tabs"><span class="on">Realtime</span><span>Exhibits</span><span>Outline</span></div><div class="dm-lines"></div></aside>
  </div>
  <div class="dm-people">
    <div class="dm-p" data-who="w"><i class="dm-av w"></i><span><b>Daniel Hale</b><small>Witness · VP Operations</small></span><em class="dm-bars">${BARS}</em><u class="dm-lat">1.4 s</u></div>
    <div class="dm-p" data-who="c"><i class="dm-av c"></i><span><b>Defending counsel</b><small>AI · listening for form</small></span><em class="dm-bars">${BARS}</em></div>
    <div class="dm-p"><i class="dm-av r"></i><span><b>Court reporter</b><small>Realtime</small></span></div>
    <div class="dm-p on" data-who="y"><i class="dm-av y"></i><span><b>You</b><small>Examining</small></span><em class="dm-bars">${BARS}</em></div>
  </div>
  <footer class="dm-bar"><span class="dm-mic">●</span><span class="dm-share">Share exhibit</span><span>Go off the record</span><span>Read back</span><span>Captions</span><span class="dm-end">End deposition</span></footer>
</div>`,

    async play(root, sig) {
      const lines = $(root, '.dm-lines'), cap = $(root, '.dm-cap');
      let n = 0, t = 0;
      const clock = setInterval(() => { t++; $(root, '.dm-time').textContent = `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; }, 1000);
      sig.addEventListener('abort', () => clearInterval(clock), { once: true });
      const talk = who => $$(root, '.dm-p').forEach(p => p.classList.toggle('talk', p.dataset.who === who));
      const log = (cls, txt) => {
        const p = document.createElement('p'); p.className = cls; p.innerHTML = `<i>${++n}</i>${txt}`;
        lines.append(p); $(root, '.dm-ln').textContent = n;
        while (lines.children.length > 9) lines.firstElementChild.remove();
      };
      const say = async (who, text, cls, prefix) => {
        talk(who); root.querySelector('.dm').dataset.who = who;
        await type(cap, text, sig, who === 'y' ? 30 : 26);
        log(cls, `${prefix} ${text}`); await sleep(500, sig);
      };
      const wait = async () => { talk(null); const l = $(root, '.dm-lat'); l.classList.add('on'); await sleep(900, sig); l.classList.remove('on'); };

      await sleep(600, sig);
      await say('y', 'Mr. Hale, when did you receive the defect report?', 'q', 'Q.');
      await wait();
      await say('w', 'Around February twentieth, I believe.', 'a', 'A.');
      await say('y', 'And you read it and forwarded it to the board that day?', 'q', 'Q.');
      // defending counsel objects on form
      talk('c'); root.querySelector('.dm').dataset.who = 'c'; focus(root, $(root, '.dm-obj'));
      $(root, '.dm-obj').classList.add('on');
      cap.textContent = 'Objection. Form. Compound question.';
      log('obj', 'COUNSEL: Objection, form. Compound.');
      await sleep(1000, sig); focus(root, $(root, '.dm-lines')); await sleep(1300, sig);
      $(root, '.dm-obj').classList.remove('on'); focus(root, $(root, '.dm-stage'));
      await say('y', 'I’ll rephrase. Did you read the report on February twentieth?', 'q', 'Q.');
      await wait();
      await say('w', 'Yes.', 'a', 'A.');
      // share an exhibit
      await point(root, $(root, '.dm-share'), sig);
      $(root, '.dm-sheet').classList.add('on'); focus(root, $(root, '.dm-sheet')); $(root, '.dm-stage').classList.add('shared');
      await sleep(700, sig);
      await say('y', 'Is this your email of February twenty-first?', 'q', 'Q.');
      await wait();
      await say('w', 'It’s… I’d have to see the full thread.', 'a', 'A.');
      talk(null);
      await sleep(2200, sig);
    },
  });
})();
