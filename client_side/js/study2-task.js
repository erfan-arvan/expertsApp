/*
 * One input/output task: the code and the question are shown together.
 * The participant types the return value and clicks "Submit answer"; the answer
 * time is the active time from showing the snippet until that click (time while
 * paused, on a break, or with the page closed is not counted).
 * For the practice snippet, the answer is then locked and the correct answer shown.
 * The in-progress task is saved in s2_cur, so a reload continues the same task.
 */
(function () {
  'use strict';
  const { get, set, remove, activeMs, renderCode, escapeHtml, showMessage } = window.S2;

  function themeLabel() {
    return get('codeTheme', 'dark') === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode';
  }

  function applyTheme(root) {
    const light = get('codeTheme', 'dark') === 'light';
    root.querySelectorAll('.code-box').forEach(el => el.classList.toggle('light', light));
    const btn = root.querySelector('#theme-toggle');
    if (btn) btn.textContent = themeLabel();
  }

  /**
   * opts: {container, key, snippetId, version, code, question, javadoc,
   *        heading, position, practice, expectedAnswer, submitLabel, onComplete(result)}
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
        <div id="code-panel">
          <div class="code-toolbar">
            <span class="hint" style="margin:0;">Underlined method names open their Javadoc.</span>
            <button type="button" class="secondary" id="theme-toggle"></button>
          </div>
          ${renderCode(opts.code, opts.javadoc || {})}
        </div>
        <div class="card" style="margin:0;" id="question-panel">
          <p class="question-text">${escapeHtml(q.text)}</p>
          ${assumptions}
          <div id="task-answer-area"></div>
        </div>
      </div>`;

    const root = opts.container;
    root.querySelector('#theme-toggle').addEventListener('click', () => {
      set('codeTheme', get('codeTheme', 'dark') === 'dark' ? 'light' : 'dark');
      applyTheme(root);
    });
    applyTheme(root);

    const area = root.querySelector('#task-answer-area');

    function result() {
      return {
        position: opts.position,
        snippetId: cur.snippetId,
        version: cur.version,
        answer: cur.answer,
        answerTimeMs: cur.answerMs,
        pausesDuringTask: get('pauseCount', 0) - cur.startPauses,
        codeTheme: get('codeTheme', 'dark'),
        shownAt: cur.shownAt,
        answeredAt: cur.answeredAt
      };
    }

    function renderAnswerPhase() {
      area.innerHTML = `
        <div class="answer-row" id="answer-row">
          <label for="task-answer">Return value</label>
          <input type="text" id="task-answer" autocomplete="off" spellcheck="false" autocapitalize="off">
          <p class="hint">Write the value as Java would show it, for example <code>true</code>, <code>42</code>,
            <code>"abc"</code>, or <code>["a", "b"]</code> for a list or array. You cannot change your answer after
            you submit it.</p>
          <div class="task-actions"><button type="button" id="task-submit">${escapeHtml(opts.submitLabel || 'Submit answer')}</button></div>
        </div>`;
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
        if (opts.practice) {
          cur.phase = 'feedback';
          set('cur', cur);
          renderFeedbackPhase();
        } else {
          remove('cur');
          opts.onComplete(result());
        }
      });
      if (!opts.noAutofocus) input.focus();
    }

    function renderFeedbackPhase() {
      area.innerHTML = `
        <div class="answer-row">
          <label>Your answer</label>
          <div class="locked-answer">${escapeHtml(cur.answer)}</div>
        </div>
        <div class="practice-feedback">This was only practice. The correct answer is
          <code>${escapeHtml(opts.expectedAnswer)}</code>.</div>
        <div class="task-actions"><button type="button" id="task-next">Finish Practice</button></div>`;
      area.querySelector('#task-next').addEventListener('click', () => {
        const r = result();
        remove('cur');
        opts.onComplete(r);
      });
    }

    if (cur.phase === 'feedback') renderFeedbackPhase();
    else renderAnswerPhase();
  }

  window.S2Task = { renderTask };
})();
