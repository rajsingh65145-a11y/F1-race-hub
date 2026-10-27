// [25, 18, 18] -> [25, 43, 61]  (running total after each round)
export function toCumulative(pointsPerRound) {
  const totals = [];
  let runningTotal = 0;

  pointsPerRound.forEach((points) => {
    runningTotal += points;
    totals.push(runningTotal);
  });

  return totals;
}