import { circuits } from '../data/circuits';
import { drivers } from '../data/drivers';
import { races } from '../data/races';
import { constructorStandings } from '../data/teams';

// Joins words into ONE lowercase string that we can search in.
// filter(Boolean) throws away empty values (null, undefined, '')
function toKeywords(parts) {
  return parts.filter(Boolean).join(' ').toLowerCase();
}

const driverEntries = drivers.map((driver) => ({
  id: `driver-${driver.id}`,
  type: 'driver',
  title: driver.name,
  subtitle: `${driver.team} · #${driver.number}`,
  path: `/drivers/${driver.id}`,
  keywords: toKeywords([
    driver.name,
    driver.team,
    driver.nationality,
    driver.number,
  ]),
}));

const teamEntries = constructorStandings.map((team) => ({
  id: `team-${team.id}`,
  type: 'team',
  title: team.name,
  subtitle: `${team.country} · ${team.engine} power`,
  path: `/teams/${team.id}`,
  keywords: toKeywords([
    team.name,
    team.code,
    team.country,
    team.engine,
    ...team.drivers.map((driver) => driver.name),
  ]),
}));

const raceEntries = races.map((race) => {
  // Completed races know their winner, so "norris" finds the races he won
  const winner = race.results
    ? drivers.find((d) => d.id === race.results[0].driverId)
    : null;

  const subtitle = winner
    ? `${race.date} · Winner: ${winner.name}`
    : `${race.date} · ${race.status}`;

  return {
    id: `race-${race.id}`,
    type: 'race',
    title: race.name,
    subtitle,
    path: `/calendar/${race.id}`,
    keywords: toKeywords([
      race.name,
      race.circuit,
      race.city,
      race.country,
      race.date,
      race.status,
      race.sprint ? 'sprint' : null,
      winner ? winner.name : null,
    ]),
  };
});

const circuitEntries = circuits.map((circuit) => ({
  id: `circuit-${circuit.id}`,
  type: 'circuit',
  title: circuit.name,
  subtitle: `${circuit.city} · ${circuit.country}`,
  path: `/circuits/${circuit.id}`,
  keywords: toKeywords([
    circuit.name,
    circuit.city,
    circuit.country,
    circuit.lapRecord ? circuit.lapRecord.driver : null,
  ]),
}));

// Built once, when the app loads
const searchIndex = [
  ...driverEntries,
  ...teamEntries,
  ...raceEntries,
  ...circuitEntries,
];

// Returns every entry that matches ALL the words of the query
export function searchEntries(query) {
  const words = query
    .toLowerCase()
    .split(' ')
    .filter((word) => word !== '');

  if (words.length === 0) {
    return [];
  }

  const matches = searchIndex.filter((entry) =>
    words.every((word) => entry.keywords.includes(word))
  );

  // Entries that have every word in their TITLE come first
  return matches
    .map((entry) => ({
      entry,
      inTitle: words.every((word) => entry.title.toLowerCase().includes(word)),
    }))
    .sort((a, b) => Number(b.inTitle) - Number(a.inTitle))
    .map((item) => item.entry);
}