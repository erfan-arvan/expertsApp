/*
 * Study 2 eligibility and registration (eligibility.html for NJIT, eligibilityw&m.html for W&M).
 * Steps: study overview -> email -> eligibility questions -> predefined session slots
 * (select all that work) -> or, if none work, all availability Dec 1-15 -> review -> submit.
 * Everything is sent to /register_study2; the session times live in js/study2-slots.js.
 */
(function () {
  'use strict';
  const cfg = window.S2_ELIG_CONFIG;          // set by the page: {site, school, course, courseCode, location}
  const SLOTS = window.STUDY2_SLOTS;
  const { escapeHtml, showMessage, runQuestionnaire, postJSON, remove } = window.S2;
  const $ = id => document.getElementById(id);

  const QUESTIONS = [
    {
      id: 'school', text: 'Where are you studying?', options: [
        { label: cfg.school }, { label: 'Another university or college', ineligible: true },
        { label: 'I am not currently a student', ineligible: true }
      ]
    },
    {
      id: 'classStanding', text: 'What is your class standing?', options: [
        { label: 'Freshman' }, { label: 'Sophomore' }, { label: 'Junior' }, { label: 'Senior' },
        { label: 'Graduate student', ineligible: true }
      ]
    },
    {
      id: 'age', text: 'What is your age?', options: [
        { label: 'Under 18', ineligible: true }, { label: '18–20' }, { label: '21–24' }, { label: '25–30' },
        { label: '31–40' }, { label: 'Over 40' }
      ]
    },
    {
      id: 'course', text: `Have you taken ${cfg.course}?`, options: [
        { label: 'I completed the course with a grade of C or better' },
        { label: 'I am currently enrolled in the course' },
        { label: 'I have taken the course but did not receive a grade of C or better, and I am not currently enrolled', ineligible: true },
        { label: `I have not taken ${cfg.courseCode}`, ineligible: true }
      ]
    },
    {
      id: 'condition',
      text: 'Have you been diagnosed with a reading or learning disability, or any condition that affects your ability to read or understand code or instructions?',
      options: [
        { label: 'Yes, I have been diagnosed with such a condition', ineligible: true },
        { label: 'No, I have not been diagnosed with any such condition' }
      ]
    },
    {
      id: 'english', text: 'How comfortable are you with reading English-language text?', options: [
        { label: 'Not comfortable', ineligible: true }, { label: 'Slightly comfortable' },
        { label: 'Moderately comfortable' }, { label: 'Very comfortable' }, { label: 'Native speaker / fluent' }
      ]
    },
    {
      id: 'laptop', text: 'Do you have access to a personal laptop you can bring to the session?',
      options: [{ label: 'Yes' }, { label: 'No', ineligible: true }]
    },
    {
      id: 'javaYears',
      text: 'How many years have you been programming in Java (through coursework, personal projects, or other experiences)?',
      options: [
        { label: 'I am not familiar with Java', ineligible: true }, { label: 'Less than 1 year' }, { label: '1–2 years' },
        { label: '3–4 years' }, { label: '5+ years' }, { label: 'Prefer not to say', ineligible: true }
      ]
    },
    {
      id: 'alreadyParticipated', text: 'Have you already taken part in a session of this study, including a pilot session?',
      note: 'Students who took part in our earlier code comprehension study are welcome to participate.',
      options: [{ label: 'Yes', ineligible: true }, { label: 'No' }]
    }
  ];

  const state = { email: '', responses: null, source: null, slots: [] };

  // ---------------------------------------------------------------- helpers
  function show(id) {
    ['email-card', 'survey-card', 'predefined-card', 'custom-card', 'review-card', 'done-card', 'ineligible-card']
      .forEach(c => $(c).classList.toggle('hidden', c !== id));
    window.scrollTo(0, 0);
  }

  function parseDate(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d, 12);    // local noon: no time-zone date shifts
  }
  function todayIso() {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
  }
  function isoOf(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function dayLabel(iso) {
    return parseDate(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }
  const slotText = s => `${dayLabel(s.date)}, ${s.time}`;

  function send(event, extra) {
    return postJSON('/register_study2', {
      site: cfg.site,
      email: state.email,
      event,
      eligibilityResponses: state.responses,
      ...extra
    });
  }

  // Slot buttons grouped by day. selectable: called with the slot and the button.
  function renderDayCards(container, days) {
    container.innerHTML = days.map(day => `
      <div class="day-card">
        <h4>${escapeHtml(dayLabel(day.date))}</h4>
        <div>${day.times.map(t => `<button type="button" class="time-slot" data-date="${day.date}" data-time="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join('')}</div>
      </div>`).join('');
    container.querySelectorAll('.time-slot').forEach(b => {
      b.addEventListener('click', () => {
        b.classList.toggle('selected');
        b.setAttribute('aria-pressed', b.classList.contains('selected'));
      });
    });
  }
  function selectedIn(container) {
    return [...container.querySelectorAll('.time-slot.selected')].map(b => ({ date: b.dataset.date, time: b.dataset.time }));
  }

  // ------------------------------------------------------------------ steps
  function startEmail() {
    const email = $('email').value.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage('Check your email', 'Please enter a valid email address.');
      return;
    }
    state.email = email;
    $('about-card').classList.add('hidden');
    show('survey-card');
    remove('elig_draft');
    runQuestionnaire({
      container: $('survey'),
      questions: QUESTIONS,
      storageKey: 'elig',
      finishLabel: 'Check Eligibility',
      blockIneligible: false,
      onDone: (responses, { anyIneligible }) => {
        state.responses = responses;
        remove('elig_draft');
        remove('elig');
        send('eligibility', { eligible: !anyIneligible }).catch(e => console.warn('eligibility not recorded', e));
        if (anyIneligible) show('ineligible-card');
        else showPredefined();
      }
    });
  }

  function showPredefined() {
    const today = todayIso();
    const upcoming = (SLOTS[cfg.site].predefined || []).filter(s => s.date > today)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    if (!upcoming.length) return showCustom(true);
    const byDay = [];
    upcoming.forEach(s => {
      const last = byDay[byDay.length - 1];
      if (last && last.date === s.date) last.times.push(s.time);
      else byDay.push({ date: s.date, times: [s.time] });
    });
    if (!$('predefined-slots').children.length) renderDayCards($('predefined-slots'), byDay);
    show('predefined-card');
  }

  function showCustom(noPredefined = false) {
    const c = SLOTS.custom;
    const today = todayIso();
    const days = [];
    for (let d = parseDate(c.startDate); isoOf(d) <= c.endDate; d.setDate(d.getDate() + 1)) {
      const iso = isoOf(d);
      if (iso <= today) continue;
      if (c.weekdaysOnly && (d.getDay() === 0 || d.getDay() === 6)) continue;
      days.push({ date: iso, times: c.times });
    }
    $('custom-range').textContent = `${dayLabel(c.startDate)} – ${dayLabel(c.endDate)}`;
    $('custom-back').classList.toggle('hidden', noPredefined);
    if (!days.length) {
      $('custom-slots').innerHTML = '<p>There are no upcoming dates left. Please contact us by email to schedule a session.</p>';
    } else if (!$('custom-slots').children.length) {
      renderDayCards($('custom-slots'), days);
    }
    show('custom-card');
  }

  function continueFrom(source) {
    const slots = selectedIn($(source === 'predefined' ? 'predefined-slots' : 'custom-slots'));
    if (!slots.length) {
      showMessage('No times selected', source === 'predefined'
        ? 'Please select every session time that works for you, or click “None of these work for me”.'
        : 'Please select all the times you are available.');
      return;
    }
    if (source === 'custom' && slots.length < 3) {
      confirmFewSlots(slots.length).then(ok => { if (ok) review(source, slots); });
      return;
    }
    review(source, slots);
  }

  function confirmFewSlots(count) {
    return new Promise(resolve => {
      const ov = document.createElement('div');
      ov.className = 'overlay';
      ov.innerHTML = `
        <div class="box">
          <h2>Only ${count} time${count > 1 ? 's' : ''} selected</h2>
          <p>We recommend selecting <strong>at least 3</strong> times so we can find a session that works for you.</p>
          <div style="display:flex; gap:10px; justify-content:center;">
            <button type="button" id="few-back">Go back and add more</button>
            <button type="button" class="secondary" id="few-ok">Continue anyway</button>
          </div>
        </div>`;
      document.body.appendChild(ov);
      ov.querySelector('#few-back').onclick = () => { ov.remove(); resolve(false); };
      ov.querySelector('#few-ok').onclick = () => { ov.remove(); resolve(true); };
    });
  }

  function review(source, slots) {
    state.source = source;
    state.slots = slots;
    $('review-intro').textContent = source === 'predefined'
      ? 'You selected these session times:'
      : 'You told us you are available at these times:';
    $('review-list').innerHTML = slots.map(s => `<li>${escapeHtml(slotText(s))}</li>`).join('');
    $('review-email').textContent = state.email;
    show('review-card');
  }

  async function submit() {
    const btn = $('submit-btn');
    btn.disabled = true;
    $('submit-status').textContent = 'Submitting…';
    try {
      await send('availability', {
        eligible: true,
        slotSource: state.source,
        slots: state.slots.map(slotText),
        slotsRaw: state.slots,
        emailReminders: $('reminders').checked
      });
    } catch (e) {
      console.error(e);
      btn.disabled = false;
      $('submit-status').textContent = '';
      showMessage('Something went wrong', `Your registration could not be submitted. Please try again, or contact ${cfg.contact}.`);
      return;
    }
    $('done-text').textContent = state.source === 'predefined'
      ? 'We will email you soon to confirm one of the session times you selected and share the exact room.'
      : 'We will email you soon to schedule a session that fits your availability and share the exact room.';
    $('done-list').innerHTML = state.slots.map(s => `<li>${escapeHtml(slotText(s))}</li>`).join('');
    show('done-card');
  }

  // ------------------------------------------------------------------ wiring
  $('email-btn').addEventListener('click', startEmail);
  $('email').addEventListener('keydown', e => { if (e.key === 'Enter') startEmail(); });
  $('predefined-next').addEventListener('click', () => continueFrom('predefined'));
  $('none-work').addEventListener('click', e => { e.preventDefault(); showCustom(); });
  $('custom-back').addEventListener('click', e => { e.preventDefault(); showPredefined(); });
  $('custom-next').addEventListener('click', () => continueFrom('custom'));
  $('change-btn').addEventListener('click', () => (state.source === 'custom' ? showCustom() : showPredefined()));
  $('submit-btn').addEventListener('click', submit);
  $('about-toggle').addEventListener('click', () => {
    const body = $('about-body');
    body.classList.toggle('hidden');
    $('about-toggle').textContent = body.classList.contains('hidden') ? 'Show' : 'Hide';
  });
  $('more-link').addEventListener('click', e => {
    e.preventDefault();
    $('more-info').classList.remove('hidden');
    e.target.classList.add('hidden');
  });
  show('email-card');
})();
