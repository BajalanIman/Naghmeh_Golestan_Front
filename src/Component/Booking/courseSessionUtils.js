function getTimeZone(session) {
  return session?.timezone || "Europe/Berlin";
}

function getDateParts(dateValue, timeZone) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(dateValue));

  const values = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function getTimeParts(dateValue, timeZone) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(dateValue));

  const values = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
  );

  return `${values.hour}:${values.minute}`;
}

export function getSessionLocalDateKey(session) {
  return getDateParts(session.startAt, getTimeZone(session));
}

export function getSessionTimeSlotKey(session) {
  const timeZone = getTimeZone(session);
  const start = getTimeParts(session.startAt, timeZone);
  const end = getTimeParts(session.endAt, timeZone);

  return `${timeZone}|${start}-${end}`;
}

export function formatSessionTimeSlot(session, locale = "en") {
  const timeZone = getTimeZone(session);
  const start = new Date(session.startAt);
  const end = new Date(session.endAt);

  const weekday = new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: "long",
  }).format(start);

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${weekday}, ${timeFormatter.format(start)}–${timeFormatter.format(end)}`;
}

export function analyzeCourseSessions(sessions = [], locale = "en") {
  const normalizedSessions = [...sessions]
    .filter((session) => session?.startAt && session?.endAt)
    .sort(
      (firstSession, secondSession) =>
        new Date(firstSession.startAt).getTime() -
        new Date(secondSession.startAt).getTime(),
    );

  const sessionsPerDate = new Map();

  for (const session of normalizedSessions) {
    const dateKey = getSessionLocalDateKey(session);
    sessionsPerDate.set(dateKey, (sessionsPerDate.get(dateKey) || 0) + 1);
  }

  // More than one session on the same course date means these are alternative
  // time slots, not additional required course sessions.
  const hasTimeSlots = [...sessionsPerDate.values()].some((count) => count > 1);

  if (!hasTimeSlots) {
    return {
      hasTimeSlots: false,
      sessionCount: normalizedSessions.length,
      groups: [],
    };
  }

  const groupsByKey = new Map();

  for (const session of normalizedSessions) {
    const key = getSessionTimeSlotKey(session);

    if (!groupsByKey.has(key)) {
      groupsByKey.set(key, {
        key,
        label: formatSessionTimeSlot(session, locale),
        sessions: [],
        sessionIds: [],
      });
    }

    const group = groupsByKey.get(key);
    group.sessions.push(session);

    if (session.id) {
      group.sessionIds.push(session.id);
    }
  }

  const groups = [...groupsByKey.values()].sort(
    (firstGroup, secondGroup) =>
      new Date(firstGroup.sessions[0].startAt).getTime() -
      new Date(secondGroup.sessions[0].startAt).getTime(),
  );

  return {
    hasTimeSlots: true,
    // There are several alternatives per date, but the course still has one
    // required meeting on each distinct date.
    sessionCount: sessionsPerDate.size,
    groups,
  };
}
