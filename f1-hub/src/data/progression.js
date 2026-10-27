import { toCumulative } from '../utils/progression';

// Points each driver scored at every round (race + sprint), rounds 1 to 17.
// Sample data: every row adds up to the driver's total in drivers.js.
const pointsByRound = [
  { driverId: 'russell', points: [25, 18, 18, 15, 32, 8, 12, 15, 18, 25, 10, 13, 25, 12, 15, 25, 18] },
  { driverId: 'norris', points: [15, 14, 12, 33, 11, 18, 18, 18, 30, 10, 15, 11, 15, 10, 25, 8, 30] },
  { driverId: 'antonelli', points: [18, 25, 25, 12, 15, 10, 8, 4, 11, 15, 12, 25, 18, 15, 6, 18, 10] },
  { driverId: 'verstappen', points: [10, 14, 10, 19, 18, 12, 25, 8, 15, 8, 25, 15, 8, 6, 18, 10, 15] },
  { driverId: 'piastri', points: [10, 12, 15, 18, 6, 15, 8, 25, 10, 8, 18, 10, 6, 25, 10, 6, 12] },
  { driverId: 'leclerc', points: [8, 12, 8, 6, 6, 25, 15, 4, 8, 18, 6, 18, 8, 18, 4, 8, 9] },
  { driverId: 'hamilton', points: [8, 15, 4, 4, 7, 6, 10, 4, 18, 8, 8, 4, 8, 4, 8, 15, 8] },
];

// Adds the running total (cumulative points) to every row
export const progression = pointsByRound.map((row) => ({
  driverId: row.driverId,
  points: row.points,
  cumulative: toCumulative(row.points),
}));