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