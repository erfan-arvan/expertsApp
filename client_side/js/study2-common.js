/*
 * Shared logic for the study 2 pages.
 *
 * Everything is stored in localStorage under keys starting with "s2_", so it
 * never collides with data left over from the first study. No cookies are used.
 * Study data stays in the browser until the participant clicks "Submit Study"
 * on study2-post.html. The only earlier request is /study2_assignment, which
 * sends the random participant ID and receives the snippet versions to show.
 */
(function () {
  'use strict';

  const PREFIX = 's2_';
  const EASTERN_NOTE = 'America/New_York';

  // Page for each stage of the study, in order.
  const STAGE_PAGES = {
    background: null, // the entry page (start.html or begin.html)
    experience: 'study2-experience.html',
    practice: 'study2-practice.html',
    tasks: 'study2-tasks.html',
    post: 'study2-post.html',
    done: 'study2-thankyou.html'
  };

  // ---------------------------------------------------------------- storage
  function get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }
  function set(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { console.warn('Storage failed', e); }
  }
  function remove(key) {
    try { localStorage.removeItem(PREFIX + key); } catch (e) { /* ignore */ }
  }
  function clearAll(keep = []) {
    const keepSet = new Set(keep.map(k => PREFIX + k));
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PREFIX) && !keepSet.has(k)) toRemove.push(k);
    }
    toRemove.forEach(k => localStorage.removeItem(k));
  }

  // ------------------------------------------------------------- navigation
  function entryPage() { return get('entryPage', 'start.html'); }
  function pageForStage(stage) { return STAGE_PAGES[stage] || entryPage(); }

  function go(url) {
    set('navigating', true);
    window.location.href = url;
  }

  function setStage(stage) { set('stage', stage); }

  /** Returns true when this page matches the participant's current stage; otherwise redirects. */
  function guard(expectedStage) {
    if (!get('participantId')) { go(entryPage()); return false; }
    const stage = get('stage', 'background');
    if (stage !== expectedStage) { go(pageForStage(stage)); return false; }
    return true;
  }

  // ------------------------------------------------------------------ timer
  let pauseLocked = false;     // true during scheduled breaks (pause button disabled)
  let onResumeHooks = [];

  function now() { return Date.now(); }
  function isStarted() { return get('startTime') !== null; }
  function isPaused() { return get('pausedAt') !== null; }

  function activeMs() {
    const start = get('startTime');
    if (start === null) return 0;
    const pausedAt = get('pausedAt');
    const end = pausedAt !== null ? pausedAt : now();
    return Math.max(0, end - start - get('pausedTotal', 0));
  }

  function startClock() {
    if (isStarted()) return;
    set('startTime', now());
    set('startedAtIso', new Date().toISOString());
    set('pausedTotal', 0);
    set('pauseCount', 0);
    remove('pausedAt');
  }

  /** reason: "user" (pause button), "unload" (page closed/reloaded) or "break". */
  function pause(reason) {
    if (!isStarted() || isPaused()) return;
    set('pausedAt', now());
    set('pauseReason', reason);
    if (reason === 'user' || reason === 'unload') set('pauseCount', get('pauseCount', 0) + 1);
    renderTimer();
    if (reason !== 'break') showPauseOverlay(reason);
  }

  function resume() {
    if (!isPaused()) return;
    const pausedAt = get('pausedAt');
    set('pausedTotal', get('pausedTotal', 0) + (now() - pausedAt));
    remove('pausedAt');
    remove('pauseReason');
    hidePauseOverlay();
    renderTimer();
    onResumeHooks.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });
  }

  function formatDuration(ms) {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  }

  function renderTimer() {
    const el = document.getElementById('s2-timer');
    if (!el) return;
    el.textContent = '⏱️ ' + formatDuration(activeMs());
    el.style.visibility = get('timerHidden', false) ? 'hidden' : 'visible';
    const toggle = document.getElementById('s2-toggle');
    if (toggle) toggle.textContent = get('timerHidden', false) ? 'Show Timer' : 'Hide Timer';
    const pauseBtn = document.getElementById('s2-pause');
    const resumeBtn = document.getElementById('s2-resume');
    if (pauseBtn && resumeBtn) {
      const paused = isPaused();
      const started = isStarted();
      pauseBtn.classList.toggle('hidden', paused || !started);
      resumeBtn.classList.toggle('hidden', !paused || get('pauseReason') === 'break');
      pauseBtn.disabled = pauseLocked;
    }
  }

  function setPauseLocked(locked) { pauseLocked = locked; renderTimer(); }

  /** Inserts the fixed status bar (title + timer controls) at the top of the page. */
  function mountStatusBar(title) {
    const bar = document.createElement('div');
    bar.className = 's2-statusbar';
    bar.innerHTML = `
      <div class="s2-title">${escapeHtml(title || 'Code Comprehension Study')}</div>
      <div class="s2-timer-wrap">
        <span id="s2-timer" class="s2-timer">⏱️ 00:00</span>
        <button id="s2-pause" type="button" title="Pause the study">⏸ Pause</button>
        <button id="s2-resume" type="button" class="hidden" title="Resume the study">▶ Resume</button>
        <button id="s2-toggle" type="button" class="secondary">Hide Timer</button>
      </div>`;
    document.body.prepend(bar);
    document.getElementById('s2-pause').addEventListener('click', () => pause('user'));
    document.getElementById('s2-resume').addEventListener('click', resume);
    document.getElementById('s2-toggle').addEventListener('click', () => {
      set('timerHidden', !get('timerHidden', false));
      renderTimer();
    });
    renderTimer();
    setInterval(renderTimer, 500);
  }

  function showPauseOverlay(reason) {
    let ov = document.getElementById('s2-pause-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 's2-pause-overlay';
      ov.className = 'overlay';
      ov.innerHTML = `
        <div class="box">
          <h2>Study Paused</h2>
          <p id="s2-pause-text"></p>
          <button type="button" id="s2-pause-resume">Resume</button>
        </div>`;
      document.body.appendChild(ov);
      document.getElementById('s2-pause-resume').addEventListener('click', resume);
    }
    document.getElementById('s2-pause-text').textContent = reason === 'unload'
      ? 'The study was paused because the page was closed or reloaded. Click Resume when you are ready to continue.'
      : 'The timer is paused. If you have a question, raise your hand. Click Resume when you are ready to continue.';
    ov.classList.remove('hidden');
  }

  function hidePauseOverlay() {
    const ov = document.getElementById('s2-pause-overlay');
    if (ov) ov.classList.add('hidden');
  }

  /** Call once per study page after the status bar is mounted. */
  function initTimedPage(onResume) {
    if (onResume) onResumeHooks.push(onResume);
    const navigating = get('navigating', false);
    remove('navigating');

    window.addEventListener('beforeunload', () => {
      if (get('navigating', false)) return;     // moving to the next page on purpose
      if (isStarted() && !isPaused() && !get('done', false)) pause('unload');
    });

    if (isPaused()) {
      const reason = get('pauseReason');
      if (reason === 'user' || reason === 'unload') showPauseOverlay(reason);
    } else if (!navigating && isStarted() && !get('done', false)) {
      // Opened directly (e.g. a restored tab) without a recorded pause: nothing to do.
    }
    renderTimer();
  }

  // --------------------------------------------------------------- messages
  function showMessage(title, text, buttonLabel = 'OK') {
    return new Promise(resolve => {
      const ov = document.createElement('div');
      ov.className = 'overlay';
      ov.innerHTML = `
        <div class="box">
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(text)}</p>
          <button type="button">${escapeHtml(buttonLabel)}</button>
        </div>`;
      document.body.appendChild(ov);
      ov.querySelector('button').addEventListener('click', () => { ov.remove(); resolve(); });
    });
  }

  // ---------------------------------------------------------- questionnaire
  /**
   * Shows questions one at a time with Previous/Next.
   * question: {id, text, options:[{label, ineligible?, input?}]} or {id, text, type:'text', optional?}
   * The draft is saved after each answer so a reload keeps the progress.
   */
  function runQuestionnaire({ container, questions, storageKey, finishLabel = 'Next', onDone }) {
    const draftKey = storageKey + '_draft';
    const draft = get(draftKey, { index: 0, answers: {} });

    function render() {
      const q = questions[draft.index];
      const prev = draft.answers[q.id] || {};
      let html = `<div class="q-progress">Question ${draft.index + 1} of ${questions.length}</div>`;
      html += `<p class="question-text">${escapeHtml(q.text)}</p>`;
      if (q.note) html += `<p class="muted">${escapeHtml(q.note)}</p>`;
      if (q.type === 'text') {
        html += `<textarea id="q-free" rows="5" placeholder="${q.optional ? 'Optional' : ''}">${escapeHtml(prev.text || '')}</textarea>`;
      } else {
        html += '<div class="q-options">';
        q.options.forEach((opt, i) => {
          const checked = prev.index === i ? 'checked' : '';
          html += `<label><input type="radio" name="q-opt" value="${i}" ${checked}> ${escapeHtml(opt.label)}</label>`;
          if (opt.input) {
            html += `<input type="text" id="q-input-${i}" value="${prev.index === i ? escapeHtml(prev.text || '') : ''}" placeholder="${escapeHtml(opt.inputPlaceholder || 'Please specify')}">`;
          }
        });
        html += '</div>';
      }
      const last = draft.index === questions.length - 1;
      html += `<div class="q-actions">
          <button type="button" class="secondary" id="q-prev" ${draft.index === 0 ? 'disabled' : ''}>Previous</button>
          <button type="button" id="q-next">${last ? escapeHtml(finishLabel) : 'Next'}</button>
        </div>`;
      container.innerHTML = html;
      container.querySelector('#q-prev').addEventListener('click', () => {
        if (draft.index > 0) { draft.index--; set(draftKey, draft); render(); }
      });
      container.querySelector('#q-next').addEventListener('click', next);
    }

    function next() {
      const q = questions[draft.index];
      let answer;
      if (q.type === 'text') {
        const text = container.querySelector('#q-free').value.trim();
        if (!text && !q.optional) return showMessage('Missing answer', 'Please answer this question.');
        answer = { text };
      } else {
        const selected = container.querySelector('input[name="q-opt"]:checked');
        if (!selected) return showMessage('Missing answer', 'Please select an option.');
        const index = parseInt(selected.value, 10);
        const opt = q.options[index];
        const input = container.querySelector(`#q-input-${index}`);
        answer = { index, label: opt.label, text: input ? input.value.trim() : undefined };
        if (opt.ineligible) {
          draft.answers[q.id] = answer;
          set(draftKey, draft);
          return showMessage('Not eligible',
            'Based on this answer, you are not eligible to take part in this study. ' +
            'Please pause the study and raise your hand so a researcher can help you.');
        }
      }
      draft.answers[q.id] = answer;
      if (draft.index < questions.length - 1) {
        draft.index++;
        set(draftKey, draft);
        render();
        return;
      }
      set(draftKey, draft);
      const responses = {};
      questions.forEach(qq => {
        const a = draft.answers[qq.id] || {};
        if (qq.type === 'text') responses[qq.id] = a.text || '';
        else responses[qq.id] = a.text ? `${a.label}: ${a.text}` : a.label;
      });
      set(storageKey, responses);
      onDone(responses);
    }

    render();
  }

  // -------------------------------------------------------------- code view
  const KEYWORDS = new Set(('abstract assert boolean break byte case catch char class const continue default do double ' +
    'else enum extends final finally float for goto if implements import instanceof int interface long native new ' +
    'package private protected public return short static strictfp super switch synchronized this throw throws ' +
    'transient try void volatile while var record yield').split(' '));
  const LITERALS = new Set(['true', 'false', 'null']);
  const TOKEN_RE = /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*")|('(?:[^'\\\n]|\\.)*')|(@[A-Za-z_]\w*)|(\b0[xX][0-9a-fA-F_]+[lL]?\b|\b\d[\d_]*(?:\.\d+)?[lLfFdD]?\b)|([A-Za-z_$][\w$]*)|(\s+)|([\s\S])/g;

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /** Turns plain Java source into a highlighted table with line numbers. */
  function renderCode(code, javadoc = {}) {
    const src = code.replace(/\t/g, '    ').replace(/^\n+|\s+$/g, '');
    const tokens = [];
    let m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(src)) !== null) {
      let type = 'plain';
      if (m[1] || m[2]) type = 'comment';
      else if (m[3] || m[4]) type = 'string';
      else if (m[5]) type = 'annotation';
      else if (m[6]) type = 'number';
      else if (m[7]) type = 'ident';
      else if (m[8]) type = 'space';
      tokens.push({ type, text: m[0] });
    }
    const nextSolid = i => { for (let j = i + 1; j < tokens.length; j++) if (tokens[j].type !== 'space') return tokens[j]; return null; };
    const prevSolid = i => { for (let j = i - 1; j >= 0; j--) if (tokens[j].type !== 'space') return { tok: tokens[j], idx: j }; return null; };

    const lines = [''];
    const emit = (text, cls, attrs = '') => {
      text.split('\n').forEach((part, k) => {
        if (k > 0) lines.push('');
        if (!part) return;
        const inner = escapeHtml(part);
        lines[lines.length - 1] += cls ? `<span class="${cls}"${attrs}>${inner}</span>` : inner;
      });
    };

    tokens.forEach((t, i) => {
      if (t.type === 'comment') return emit(t.text, 'tok-comment');
      if (t.type === 'string') return emit(t.text, 'tok-string');
      if (t.type === 'annotation') return emit(t.text, 'tok-annotation');
      if (t.type === 'number') return emit(t.text, 'tok-number');
      if (t.type !== 'ident') return emit(t.text, '');
      const word = t.text;
      if (KEYWORDS.has(word)) return emit(word, 'tok-keyword');
      if (LITERALS.has(word)) return emit(word, 'tok-literal');
      const nxt = nextSolid(i);
      if (nxt && nxt.text === '(') {
        const prev = prevSolid(i);
        if (prev && prev.tok.text === '.') {
          const recv = prevSolid(prev.idx);
          const url = (recv && recv.tok.type === 'ident' && javadoc[`${recv.tok.text}.${word}`]) || javadoc[word];
          if (url) {
            lines[lines.length - 1] += `<a href="#" class="tok-doc" data-doc="${escapeHtml(url)}" title="Open Javadoc">${escapeHtml(word)}</a>`;
            return;
          }
        }
        return emit(word, 'tok-function');
      }
      if (/^[A-Z]/.test(word)) return emit(word, 'tok-type');
      return emit(word, '');
    });

    const rows = lines.map((l, i) => `<tr><td class="ln">${i + 1}</td><td class="src">${l || ' '}</td></tr>`).join('');
    return `<div class="code-box"><table>${rows}</table></div>`;
  }

  // Javadoc viewer: opened from links inside the code.
  function openJavadoc(url) {
    let ov = document.getElementById('s2-javadoc');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 's2-javadoc';
      ov.className = 'overlay';
      ov.innerHTML = `
        <div class="javadoc-box">
          <div class="bar"><strong>Javadoc</strong>
            <span><button type="button" class="secondary" id="s2-jd-reload">Reload</button>
            <button type="button" id="s2-jd-close">Close</button></span>
          </div>
          <iframe id="s2-jd-frame" title="Javadoc"></iframe>
        </div>`;
      document.body.appendChild(ov);
      document.getElementById('s2-jd-close').addEventListener('click', () => {
        ov.classList.add('hidden');
        document.getElementById('s2-jd-frame').src = 'about:blank';
      });
      document.getElementById('s2-jd-reload').addEventListener('click', () => {
        const f = document.getElementById('s2-jd-frame');
        f.src = f.dataset.url;
      });
    }
    const frame = document.getElementById('s2-jd-frame');
    frame.dataset.url = url;
    frame.src = url;
    ov.classList.remove('hidden');
  }
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a.tok-doc');
    if (a) { e.preventDefault(); openJavadoc(a.dataset.doc); }
  });

  // ----------------------------------------------------------------- server
  async function postJSON(url, body, timeoutMs = 15000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: ctrl.signal
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      return await res.json();
    } finally {
      clearTimeout(timer);
    }
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function newParticipantId(prefix) {
    const n = Math.floor(Math.random() * 1_000_000_000);
    return prefix + String(n).padStart(9, '0');
  }

  /** Asks the server which version (A/B) of each snippet to show, and fixes the random snippet order. */
  async function requestAssignment() {
    if (get('assignment')) return get('assignment');
    const snippetIds = window.STUDY2_SNIPPETS.map(s => s.id);
    const res = await postJSON('/study2_assignment', {
      participantId: get('participantId'),
      site: get('site'),
      snippetIds
    });
    if (!res || !res.versions) throw new Error('Invalid assignment response');
    const assignment = { assignmentId: res.assignmentId, versions: res.versions };
    set('assignment', assignment);
    if (!get('order')) set('order', shuffle(snippetIds));
    return assignment;
  }

  function buildSubmission() {
    return {
      study: 'study2',
      dataVersion: window.STUDY2_DATA_VERSION || null,
      participantId: get('participantId'),
      site: get('site'),
      assignmentId: (get('assignment') || {}).assignmentId,
      versions: (get('assignment') || {}).versions,
      snippetOrder: get('order'),
      background: get('background'),
      experience: get('experience'),
      practice: get('practice'),
      tasks: get('tasks', []),
      breaks: get('breaks', []),
      post: get('post'),
      timing: {
        studyStartedAt: get('startedAtIso'),
        submittedAt: new Date().toISOString(),
        totalActiveMs: activeMs(),
        totalPausedMs: get('pausedTotal', 0),
        pauseCount: get('pauseCount', 0)
      },
      clientTimeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone) || EASTERN_NOTE
    };
  }

  function downloadJSON(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  window.S2 = {
    get, set, remove, clearAll,
    go, guard, setStage, pageForStage, entryPage,
    isStarted, isPaused, activeMs, startClock, pause, resume, formatDuration,
    mountStatusBar, initTimedPage, setPauseLocked, renderTimer,
    showMessage, runQuestionnaire, renderCode, escapeHtml, shuffle,
    newParticipantId, requestAssignment, postJSON, buildSubmission, downloadJSON
  };
})();
