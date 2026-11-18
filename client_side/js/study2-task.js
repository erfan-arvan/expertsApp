/*
 * One input/output task: the code and the question are shown together.
 * 1. The participant types the return value and clicks "Submit answer"
 *    (answer time = active time from showing the snippet until this click).
 * 2. The answer is locked and the familiarity question appears; "Next" finishes the task.
 * The in-progress task is saved in s2_cur, so a reload continues the same task
 * with its timing intact (time while paused or closed is not counted).
 */
(function () {
  'use strict';
  const { get, set, remove, activeMs, renderCode, escapeHtml, showMessage } = window.S2;

  /**
   * opts: {container, key, snippetId, version, code, question, javadoc,
   *        heading, position, practice, expectedAnswer, nextLabel, onComplete(result)}
   */
  function renderTask(opts) {
    let cur = get('cur');
    if (!cur || cur.key !== opts.key) {
      cur = {
        key: opts.key,
        snippetId: opts.snippetId,
        version: opts.version,
        phase: 'answer',
        startActive: activeMs(),
        startPauses: get('pauseCount', 0),
        shownAt: new Date().toISOString()
      };
      set('cur', cur);
    }

    const q = opts.question;
    const assumptions = (q.assumptions || []).length
      ? `<p style="margin:12px 0 0;"><strong>Assume:</strong></p><ul class="assumptions">${q.assumptions.map(a => `<li>${escapeHtml(a)}</li>`).join('')}</ul>`
      : '';

    opts.container.innerHTML = `
      <div class="task-header">
        <h2 style="margin:0;">${escapeHtml(opts.heading)}</h2>
      </div>
      <div class="task-grid">
        <div>${renderCode(opts.code, opts.javadoc || {})}
          <p class="hint">Underlined method names link to their Javadoc.</p>
        </div>
        <div class="card" style="margin:0;">
          <p class="question-text">${escapeHtml(q.text)}</p>
          ${assumptions}
          <div id="task-answer-area"></div>
        </div>
      </div>`;

    const area = opts.container.querySelector('#task-answer-area');

    function renderAnswerPhase() {
      area.innerHTML = `
        <div class="answer-row">
          <label for="task-answer">Return value</label>
          <input type="text" id="task-answer" autocomplete="off" spellcheck="false" autocapitalize="off">
          <p class="hint">Write the value as Java would show it, for example <code>true</code>, <code>42</code>,
            <code>"abc"</code>, or <code>["a", "b"]</code> for a list or array.</p>
        </div>
        <div class="task-actions"><button type="button" id="task-submit">Submit answer</button></div>`;
      const input = area.querySelector('#task-answer');
      input.addEventListener('keydown', e => { if (e.key === 'Enter') e.preventDefault(); });
      area.querySelector('#task-submit').addEventListener('click', () => {
        const value = input.value.trim();
        if (!value) {
          showMessage('Missing answer', 'Please enter the value the method returns. If you are not sure, enter your best guess.');
          return;
        }
        cur.answer = value;
        cur.answerMs = activeMs() - cur.startActive;
        cur.answeredAt = new Date().toISOString();
        cur.phase = 'familiarity';
        cur.famStart = activeMs();
        set('cur', cur);
        renderFamiliarityPhase();
      });
      input.focus();
    }

    function renderFamiliarityPhase() {
      const feedback = opts.practice && opts.expectedAnswer !== undefined
        ? `<div class="practice-feedback">This is only practice. The correct answer is <code>${escapeHtml(opts.expectedAnswer)}</code>.</div>`
        : '';
      area.innerHTML = `
        <div class="answer-row">
          <label>Your answer</label>
          <div class="locked-answer">${escapeHtml(cur.answer)}</div>
        </div>
        ${feedback}
        <div class="fam-box">
          <p class="question-text">Have you seen or worked with this code snippet before?</p>
          <label><input type="radio" name="fam" value="Yes"> Yes</label>
          <label><input type="radio" name="fam" value="No"> No</label>
        </div>
        <div class="task-actions"><button type="button" id="task-next">${escapeHtml(opts.nextLabel || 'Next')}</button></div>`;
      area.querySelector('#task-next').addEventListener('click', () => {
        const fam = area.querySelector('input[name="fam"]:checked');
        if (!fam) {
          showMessage('Missing answer', 'Please tell us whether you have seen this code before.');
          return;
        }
        const result = {
          position: opts.position,
          snippetId: cur.snippetId,
          version: cur.version,
          answer: cur.answer,
          answerTimeMs: cur.answerMs,
          familiarity: fam.value,
          familiarityTimeMs: activeMs() - cur.famStart,
          pausesDuringTask: get('pauseCount', 0) - cur.startPauses,
          shownAt: cur.shownAt,
          answeredAt: cur.answeredAt,
          completedAt: new Date().toISOString()
        };
        remove('cur');
        opts.onComplete(result);
      });
    }

    if (cur.phase === 'familiarity') renderFamiliarityPhase();
    else renderAnswerPhase();
  }

  window.S2Task = { renderTask };
})();
