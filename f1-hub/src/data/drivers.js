// Sample data for learning: teams and numbers follow the 2026 grid,
// points / wins / podiums / poles are made-up demo values.
export const drivers = [
  {
    id: 'norris', name: 'Lando Norris', number: 1, nationality: 'British', flag: 'GB',
    team: 'McLaren', points: 201, wins: 2, podiums: 5, poles: 3, bestFinish: 1,
  },
  {
    id: 'piastri', name: 'Oscar Piastri', number: 81, nationality: 'Australian', flag: 'AU',
    team: 'McLaren', points: 138, wins: 0, podiums: 2, poles: 1, bestFinish: 1,
  },
  {
    id: 'russell', name: 'George Russell', number: 63, nationality: 'British', flag: 'GB',
    team: 'Mercedes', points: 238, wins: 3, podiums: 8, poles: 6, bestFinish: 1,
  },
  {
    id: 'antonelli', name: 'Kimi Antonelli', number: 12, nationality: 'Italian', flag: 'IT',
    team: 'Mercedes', points: 340, wins: 8, podiums: 14, poles: 4, bestFinish: 1,
  },
  {
    id: 'verstappen', name: 'Max Verstappen', number: 3, nationality: 'Dutch', flag: 'NL',
    team: 'Red Bull Racing', points: 221, wins: 2, podiums: 9, poles: 2, bestFinish: 1,
  },
  {
    id: 'hadjar', name: 'Isack Hadjar', number: 6, nationality: 'French', flag: 'FR',
    team: 'Red Bull Racing', points: 97, wins: 0, podiums: 2, poles: 0, bestFinish: 4,
  },
  {
    id: 'leclerc', name: 'Charles Leclerc', number: 16, nationality: 'Monegasque', flag: 'MC',
    team: 'Ferrari', points: 215, wins: 1, podiums: 5, poles: 2, bestFinish: 1,
  },
  {
    id: 'hamilton', name: 'Lewis Hamilton', number: 44, nationality: 'British', flag: 'GB',
    team: 'Ferrari', points: 229, wins: 1, podiums: 6, poles: 0, bestFinish: 2,
  },
  {
    id: 'albon', name: 'Alexander Albon', number: 23, nationality: 'Thai', flag: 'TH',
    team: 'Williams', points: 5, wins: 0, podiums: 0, poles: 0, bestFinish: 5,
  },
  {
    id: 'sainz', name: 'Carlos Sainz', number: 55, nationality: 'Spanish', flag: 'ES',
    team: 'Williams', points: 44, wins: 0, podiums: 1, poles: 0, bestFinish: 3,
  },
    {
    id: 'lawson', name: 'Liam Lawson', number: 30, nationality: 'New Zealander', flag: 'NZ',
    team: 'Racing Bulls', points: 38, wins: 0, podiums: 0, poles: 0, bestFinish: 6,
  },
  {
    id: 'lindblad', name: 'Arvid Lindblad', number: 41, nationality: 'British', flag: 'GB',
    team: 'Racing Bulls', points: 24, wins: 0, podiums: 0, poles: 0, bestFinish: 7,
  },
  {
    id: 'alonso', name: 'Fernando Alonso', number: 14, nationality: 'Spanish', flag: 'ES',
    team: 'Aston Martin', points: 36, wins: 0, podiums: 0, poles: 0, bestFinish: 5,
  },
  {
    id: 'stroll', name: 'Lance Stroll', number: 18, nationality: 'Canadian', flag: 'CA',
    team: 'Aston Martin', points: 9, wins: 0, podiums: 0, poles: 0, bestFinish: 8,
  },
  {
    id: 'bearman', name: 'Oliver Bearman', number: 87, nationality: 'British', flag: 'GB',
    team: 'Haas', points: 31, wins: 0, podiums: 0, poles: 0, bestFinish: 6,
  },
  {
    id: 'ocon', name: 'Esteban Ocon', number: 31, nationality: 'French', flag: 'FR',
    team: 'Haas', points: 15, wins: 0, podiums: 0, poles: 0, bestFinish: 7,
  },
  {
    id: 'hulkenberg', name: 'Nico Hülkenberg', number: 27, nationality: 'German', flag: 'DE',
    team: 'Audi', points: 29, wins: 0, podiums: 0, poles: 0, bestFinish: 7,
  },
  {
    id: 'bortoleto', name: 'Gabriel Bortoleto', number: 5, nationality: 'Brazilian', flag: 'BR',
    team: 'Audi', points: 18, wins: 0, podiums: 0, poles: 0, bestFinish: 8,
  },
  {
    id: 'gasly', name: 'Pierre Gasly', number: 10, nationality: 'French', flag: 'FR',
    team: 'Alpine', points: 22, wins: 0, podiums: 0, poles: 0, bestFinish: 6,
  },
  {
    id: 'colapinto', name: 'Franco Colapinto', number: 43, nationality: 'Argentine', flag: 'AR',
    team: 'Alpine', points: 12, wins: 0, podiums: 0, poles: 0, bestFinish: 8,
  },
  {
    id: 'perez', name: 'Sergio Pérez', number: 11, nationality: 'Mexican', flag: 'MX',
    team: 'Cadillac', points: 4, wins: 0, podiums: 0, poles: 0, bestFinish: 9,
  },
  {
    id: 'bottas', name: 'Valtteri Bottas', number: 77, nationality: 'Finnish', flag: 'FI',
    team: 'Cadillac', points: 2, wins: 0, podiums: 0, poles: 0, bestFinish: 9,
  },
];

// Championship order: highest points first
export const standings = [...drivers].sort((a, b) => b.points - a.points);