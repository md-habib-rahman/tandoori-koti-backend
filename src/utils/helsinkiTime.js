// utils/helsinkiTime.js
// Report days follow the restaurant's calendar (Finnish time), not the server's clock.

const TZ = "Europe/Helsinki";

// "YYYY-MM-DD" of a moment, as seen in Finland
export const helsinkiDateKey = (date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date(date));

// "2026-10-31" + 1 day -> "2026-11-01"
export function addDaysIso(iso, days) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// How many minutes Finland is ahead of UTC at this moment: 120 in winter (UTC+2), 180 in summer (UTC+3)
function offsetMinutes(date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const v = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const asUtc = Date.UTC(
    +v.year,
    +v.month - 1,
    +v.day,
    +v.hour,
    +v.minute,
    +v.second,
  );
  return Math.round((asUtc - date.getTime()) / 60000);
}

// The exact moment (a Date in UTC) when this Finnish calendar day starts, i.e. 00:00 in Finland
export function helsinkiDayStartUtc(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const guess = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));

  const first = new Date(guess.getTime() - offsetMinutes(guess) * 60000);
  // Daylight saving changes happen at night, so check the offset again at the result
  return new Date(guess.getTime() - offsetMinutes(first) * 60000);
}
