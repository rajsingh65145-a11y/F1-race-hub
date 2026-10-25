// "1:29.642" -> 89.642 (seconds)
export function lapTimeToSeconds(lapTime) {
  const parts = lapTime.split(':');
  const minutes = Number(parts[0]);
  const seconds = Number(parts[1]);

  return minutes * 60 + seconds;
}

// 0.159 -> "+0.159"
export function formatGap(seconds) {
  return `+${seconds.toFixed(3)}`;
}

// 96.512 -> "1:36.512"
export function formatLapTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toFixed(3).padStart(6, '0');

  return `${minutes}:${seconds}`;
}
// 6014.382 -> "1:40:14.382"
export function formatRaceTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = (totalSeconds % 60).toFixed(3).padStart(6, '0');

  return `${hours}:${String(minutes).padStart(2, '0')}:${seconds}`;
}