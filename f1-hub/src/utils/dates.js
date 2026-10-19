// Formats a date in the user's own timezone, e.g. "Sun, 25 Oct, 01:30 am IST"
export function formatSession(dateInput) {
  return new Date(dateInput).toLocaleString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}