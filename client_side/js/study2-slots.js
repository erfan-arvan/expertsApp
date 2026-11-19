/*
 * Session times for study 2 registration (eligibility.html and eligibilityw&m.html).
 *
 * PREDEFINED: the session slots students choose from first. EDIT THESE before
 * recruiting (the current entries are placeholders). Each entry: date (YYYY-MM-DD)
 * and time (shown as written). Slots on or before today are hidden automatically.
 *
 * CUSTOM: if none of the predefined slots work, students mark all their available
 * times on weekdays between startDate and endDate, using these time ranges.
 */
window.STUDY2_SLOTS = {
  njit: {
    predefined: [
      { date: '2026-12-01', time: '2:30 PM – 4:00 PM' },
      { date: '2026-12-03', time: '4:00 PM – 5:30 PM' },
      { date: '2026-12-07', time: '9:00 AM – 10:30 AM' },
      { date: '2026-12-09', time: '4:00 PM – 5:30 PM' },
      { date: '2026-12-11', time: '1:00 PM – 2:30 PM' }
    ]
  },
  wm: {
    predefined: [
      { date: '2026-12-01', time: '2:30 PM – 4:00 PM' },
      { date: '2026-12-03', time: '4:00 PM – 5:30 PM' },
      { date: '2026-12-07', time: '9:00 AM – 10:30 AM' },
      { date: '2026-12-09', time: '4:00 PM – 5:30 PM' },
      { date: '2026-12-11', time: '1:00 PM – 2:30 PM' }
    ]
  },
  custom: {
    startDate: '2026-12-01',
    endDate: '2026-12-15',
    weekdaysOnly: true,
    times: [
      '9:00 AM – 10:30 AM',
      '10:30 AM – 12:00 PM',
      '1:00 PM – 2:30 PM',
      '2:30 PM – 4:00 PM',
      '4:00 PM – 5:30 PM',
      '5:30 PM – 7:00 PM'
    ]
  }
};
