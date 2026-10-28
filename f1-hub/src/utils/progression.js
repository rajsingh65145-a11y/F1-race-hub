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

// For every round, ranks the drivers by their running total.
// Returns an object like { russell: [1, 1, 2, ...], norris: [3, 3, 3, ...] }
export function getPositionsByRound(series) {
  const roundCount = series[0].cumulative.length;
  const positions = {};

  series.forEach((row) => {
    positions[row.driverId] = [];
  });

  for (let round = 0; round < roundCount; round++) {
    const ranked = [...series].sort(
      (a, b) => b.cumulative[round] - a.cumulative[round]
    );

    ranked.forEach((row, index) => {
      positions[row.driverId].push(index + 1);
    });
  }

  return positions;
}