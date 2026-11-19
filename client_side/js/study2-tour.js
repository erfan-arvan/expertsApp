/*
 * Guided tutorial ("coach marks"): dims the page, highlights one element at a
 * time and shows a short tip next to it. A step either has a "Next" button or
 * waits for the participant to click the highlighted element (only that element
 * can be clicked while the step is shown).
 *
 * step: {target: selector or () => Element, title, text,
 *        action?: 'click'          wait for a click on the target
 *        waitFor?: () => boolean   after the click, wait until this is true
 *        actionText?: string       shown instead of the Next button}
 */
(function () {
  'use strict';
  const { escapeHtml } = window.S2;
  const PAD = 6;

  function run(steps) {
    return new Promise(resolve => {
      const blocks = ['top', 'bottom', 'left', 'right'].map(() => {
        const b = document.createElement('div');
        b.className = 'tour-block';
        document.body.appendChild(b);
        return b;
      });
      const spot = document.createElement('div');
      spot.className = 'tour-spot';
      const tip = document.createElement('div');
      tip.className = 'tour-tip';
      tip.setAttribute('role', 'dialog');
      document.body.append(spot, tip);

      let index = -1;
      let target = null;
      let raf = null;
      let cleanupStep = () => {};

      function resolveTarget(step) {
        return typeof step.target === 'function' ? step.target() : document.querySelector(step.target);
      }

      function layout() {
        if (!target || !document.body.contains(target)) return;
        const r = target.getBoundingClientRect();
        const x = Math.max(0, r.left - PAD), y = Math.max(0, r.top - PAD);
        const w = r.width + PAD * 2, h = r.height + PAD * 2;
        Object.assign(spot.style, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' });
        // Four click blockers around the highlighted hole.
        const vw = window.innerWidth, vh = window.innerHeight;
        Object.assign(blocks[0].style, { left: '0px', top: '0px', width: vw + 'px', height: y + 'px' });
        Object.assign(blocks[1].style, { left: '0px', top: (y + h) + 'px', width: vw + 'px', height: Math.max(0, vh - y - h) + 'px' });
        Object.assign(blocks[2].style, { left: '0px', top: y + 'px', width: x + 'px', height: h + 'px' });
        Object.assign(blocks[3].style, { left: (x + w) + 'px', top: y + 'px', width: Math.max(0, vw - x - w) + 'px', height: h + 'px' });
        // Tip: below the target if there is room, otherwise above, otherwise beside it.
        const tw = tip.offsetWidth, th = tip.offsetHeight, gap = 14;
        let left = Math.min(Math.max(12, r.left), vw - tw - 12);
        let top;
        if (y + h + gap + th < vh) top = y + h + gap;
        else if (y - gap - th > 0) top = y - gap - th;
        else {
          top = Math.min(Math.max(12, r.top), vh - th - 12);
          left = r.right + gap + tw < vw ? r.right + gap : Math.max(12, r.left - gap - tw);
        }
        Object.assign(tip.style, { left: left + 'px', top: top + 'px' });
      }

      function loop() { layout(); raf = requestAnimationFrame(loop); }

      function show(i) {
        cleanupStep();
        index = i;
        if (i >= steps.length) return finish();
        const step = steps[i];
        target = resolveTarget(step);
        if (!target) return show(i + 1);
        target.scrollIntoView({ block: 'center', behavior: 'smooth' });
        spot.classList.toggle('tour-pulse', step.action === 'click');
        const last = i === steps.length - 1;
        tip.innerHTML = `
          <h3>${escapeHtml(step.title)}</h3>
          <p>${step.text}</p>
          <div class="tour-foot">
            <span class="tour-step">Step ${i + 1} of ${steps.length}</span>
            ${step.action === 'click'
              ? `<span class="tour-action">${escapeHtml(step.actionText || 'Click the highlighted item')}</span>`
              : `<button type="button" id="tour-next">${last ? 'Got it' : 'Next'}</button>`}
          </div>`;
        if (step.action === 'click') {
          const onClick = () => {
            target.removeEventListener('click', onClick);
            if (!step.waitFor) { setTimeout(() => show(i + 1), 150); return; }
            const poll = setInterval(() => {
              if (step.waitFor()) { clearInterval(poll); setTimeout(() => show(i + 1), 150); }
            }, 100);
            cleanupStep = () => clearInterval(poll);
          };
          target.addEventListener('click', onClick);
          cleanupStep = () => target.removeEventListener('click', onClick);
        } else {
          const btn = tip.querySelector('#tour-next');
          btn.addEventListener('click', () => show(i + 1));
          btn.focus();
          cleanupStep = () => {};
        }
      }

      function finish() {
        cancelAnimationFrame(raf);
        blocks.forEach(b => b.remove());
        spot.remove();
        tip.remove();
        resolve();
      }

      loop();
      show(0);
    });
  }

  window.S2Tour = { run };
})();
