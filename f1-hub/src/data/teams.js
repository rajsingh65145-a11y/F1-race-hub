import { drivers } from './drivers';

// Sample data for learning. Points / wins / podiums are NOT stored here,
// they are calculated from the drivers (single source of truth).
export const teams = [
  { id: 'mclaren', name: 'McLaren', code: 'MCL', country: 'United Kingdom', engine: 'Mercedes' },
  { id: 'mercedes', name: 'Mercedes', code: 'MER', country: 'Germany', engine: 'Mercedes' },
  { id: 'red-bull', name: 'Red Bull Racing', code: 'RBR', country: 'Austria', engine: 'Red Bull Ford' },
  { id: 'ferrari', name: 'Ferrari', code: 'FER', country: 'Italy', engine: 'Ferrari' },
  { id: 'williams', name: 'Williams', code: 'WIL', country: 'United Kingdom', engine: 'Mercedes' },
  { id: 'racing-bulls', name: 'Racing Bulls', code: 'RCB', country: 'Italy', engine: 'Red Bull Ford' },
  { id: 'aston-martin', name: 'Aston Martin', code: 'AMR', country: 'United Kingdom', engine: 'Honda' },
  { id: 'haas', name: 'Haas', code: 'HAA', country: 'United States', engine: 'Ferrari' },
  { id: 'audi', name: 'Audi', code: 'AUD', country: 'Germany', engine: 'Audi' },
  { id: 'alpine', name: 'Alpine', code: 'ALP', country: 'France', engine: 'Mercedes' },
  { id: 'cadillac', name: 'Cadillac', code: 'CAD', country: 'United States', engine: 'Ferrari' },
];

// Adds up one field (like 'points') for a list of drivers
function sumBy(list, field) {
  return list.reduce((total, item) => total + item[field], 0);
}

// Adds the drivers and the totals to every team, then sorts by points
export const constructorStandings = teams
  .map((team) => {
    const teamDrivers = drivers.filter((driver) => driver.team === team.name);

    return {
      ...team,
      drivers: teamDrivers,
      points: sumBy(teamDrivers, 'points'),
      wins: sumBy(teamDrivers, 'wins'),
      podiums: sumBy(teamDrivers, 'podiums'),
      poles: sumBy(teamDrivers, 'poles'),
    };
  })
  .sort((a, b) => b.points - a.points);