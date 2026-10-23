// Lengths and turns: Wikipedia list of F1 circuits. Lap records: race lap records
// as of the 2025 season (Madring is new in 2026, Sepang's record is from 2017).
// Layouts are simplified hand-drawn schematics (points on a 100 x 100 grid), not to scale.
// Circuit names match the "circuit" field in races.js, so the two can be linked.
const circuitData = [
  {
    id: 'albert-park', name: 'Albert Park Circuit', country: 'Australia', city: 'Melbourne',
    length: 5.278, corners: 16,
    lapRecord: { time: '1:19.813', driver: 'Charles Leclerc', year: 2024 },
    layout: [[58,10],[78,16],[88,30],[84,46],[90,60],[82,76],[64,88],[44,90],[28,82],[22,66],[28,52],[22,38],[30,22],[44,12]],
  },
  {
    id: 'shanghai', name: 'Shanghai International Circuit', country: 'China', city: 'Shanghai',
    length: 5.451, corners: 16,
    lapRecord: { time: '1:32.238', driver: 'Michael Schumacher', year: 2004 },
    layout: [[14,82],[14,40],[18,22],[32,14],[50,16],[62,24],[74,20],[86,26],[88,44],[86,62],[88,82],[76,88],[70,76],[58,70],[44,80],[28,86]],
  },
  {
    id: 'suzuka', name: 'Suzuka Circuit', country: 'Japan', city: 'Suzuka',
    length: 5.807, corners: 18,
    lapRecord: { time: '1:30.965', driver: 'Kimi Antonelli', year: 2025 },
    layout: [[22,70],[26,82],[40,88],[56,84],[62,70],[56,58],[50,50],[44,42],[38,30],[42,16],[58,10],[70,18],[68,32],[60,42],[50,50],[40,58],[34,66]],
  },
  {
    id: 'miami', name: 'Miami International Autodrome', country: 'United States', city: 'Miami',
    length: 5.412, corners: 19,
    lapRecord: { time: '1:29.708', driver: 'Max Verstappen', year: 2023 },
    layout: [[14,30],[36,24],[60,26],[82,22],[90,34],[84,48],[70,52],[64,64],[78,72],[70,82],[46,80],[30,86],[16,76],[20,60],[12,46]],
  },
  {
    id: 'gilles-villeneuve', name: 'Circuit Gilles Villeneuve', country: 'Canada', city: 'Montreal',
    length: 4.361, corners: 14,
    lapRecord: { time: '1:13.078', driver: 'Valtteri Bottas', year: 2019 },
    layout: [[14,70],[14,44],[22,30],[38,22],[56,18],[74,14],[86,18],[88,30],[76,36],[60,42],[48,52],[56,62],[74,66],[84,74],[78,84],[56,86],[34,82],[20,80]],
  },
  {
    id: 'monaco', name: 'Circuit de Monaco', country: 'Monaco', city: 'Monte Carlo',
    length: 3.337, corners: 19,
    lapRecord: { time: '1:12.909', driver: 'Lewis Hamilton', year: 2021 },
    layout: [[30,70],[22,56],[26,44],[40,40],[48,28],[60,20],[76,24],[84,36],[76,44],[64,40],[56,48],[64,58],[74,62],[68,74],[52,78],[44,70],[38,76]],
  },
  {
    id: 'barcelona', name: 'Circuit de Barcelona-Catalunya', country: 'Spain', city: 'Montmeló',
    length: 4.657, corners: 14,
    lapRecord: { time: '1:15.743', driver: 'Oscar Piastri', year: 2025 },
    layout: [[12,76],[40,80],[70,78],[88,70],[86,56],[74,48],[84,38],[78,26],[62,22],[48,30],[36,22],[22,24],[14,36],[22,48],[14,60]],
  },
  {
    id: 'red-bull-ring', name: 'Red Bull Ring', country: 'Austria', city: 'Spielberg',
    length: 4.318, corners: 10,
    lapRecord: { time: '1:05.619', driver: 'Carlos Sainz', year: 2020 },
    layout: [[20,74],[26,56],[38,40],[52,22],[66,18],[78,28],[72,44],[82,58],[84,72],[66,82],[44,84]],
  },
  {
    id: 'silverstone', name: 'Silverstone Circuit', country: 'United Kingdom', city: 'Silverstone',
    length: 5.891, corners: 18,
    lapRecord: { time: '1:27.097', driver: 'Max Verstappen', year: 2020 },
    layout: [[18,66],[16,48],[24,32],[40,24],[50,16],[66,14],[82,22],[88,38],[78,50],[84,62],[74,76],[58,82],[44,74],[34,84],[22,80]],
  },
  {
    id: 'spa', name: 'Circuit de Spa-Francorchamps', country: 'Belgium', city: 'Stavelot',
    length: 7.004, corners: 20,
    lapRecord: { time: '1:44.701', driver: 'Sergio Pérez', year: 2024 },
    layout: [[22,82],[16,72],[24,66],[40,70],[52,60],[64,44],[76,28],[88,18],[84,32],[74,44],[66,56],[58,66],[66,76],[78,84],[60,90],[40,88]],
  },
  {
    id: 'hungaroring', name: 'Hungaroring', country: 'Hungary', city: 'Mogyoród',
    length: 4.381, corners: 14,
    lapRecord: { time: '1:16.627', driver: 'Lewis Hamilton', year: 2020 },
    layout: [[26,72],[18,56],[26,40],[40,30],[56,26],[70,32],[82,44],[78,58],[66,64],[58,74],[44,80],[34,78]],
  },
  {
    id: 'zandvoort', name: 'Circuit Zandvoort', country: 'Netherlands', city: 'Zandvoort',
    length: 4.259, corners: 14,
    lapRecord: { time: '1:11.097', driver: 'Lewis Hamilton', year: 2021 },
    layout: [[24,76],[14,60],[20,44],[34,36],[44,22],[60,16],[74,22],[78,36],[70,46],[80,58],[74,72],[58,80],[40,84]],
  },
  {
    id: 'monza', name: 'Monza Circuit', country: 'Italy', city: 'Monza',
    length: 5.793, corners: 11,
    lapRecord: { time: '1:20.901', driver: 'Lando Norris', year: 2025 },
    layout: [[20,78],[48,80],[78,76],[88,64],[84,50],[90,36],[78,24],[60,28],[50,20],[34,18],[18,26],[12,42],[16,58],[22,70]],
  },
  {
    id: 'madring', name: 'Madring', country: 'Spain', city: 'Madrid',
    length: 5.474, corners: 22,
    lapRecord: null,
    layout: [[20,70],[18,50],[30,36],[46,40],[56,26],[72,20],[86,30],[82,48],[68,54],[74,68],[60,80],[40,82],[30,76]],
  },
  {
    id: 'baku', name: 'Baku City Circuit', country: 'Azerbaijan', city: 'Baku',
    length: 6.003, corners: 20,
    lapRecord: { time: '1:43.009', driver: 'Charles Leclerc', year: 2019 },
    layout: [[12,80],[12,24],[20,16],[40,16],[44,26],[56,28],[60,18],[72,16],[84,22],[88,34],[80,40],[84,52],[76,58],[84,68],[76,80],[56,84],[34,82]],
  },
  {
    id: 'sepang', name: 'Sepang International Circuit', country: 'Malaysia', city: 'Sepang',
    length: 5.543, corners: 15,
    lapRecord: { time: '1:34.080', driver: 'Sebastian Vettel', year: 2017 },
    layout: [[10,60],[16,46],[34,40],[52,44],[66,36],[84,34],[90,46],[84,58],[70,60],[56,66],[70,74],[56,84],[34,80],[18,74]],
  },
  {
    id: 'marina-bay', name: 'Marina Bay Street Circuit', country: 'Singapore', city: 'Singapore',
    length: 4.94, corners: 19,
    lapRecord: { time: '1:33.808', driver: 'Lewis Hamilton', year: 2025 },
    layout: [[14,74],[14,52],[28,52],[28,38],[14,38],[14,22],[40,22],[40,14],[60,14],[60,28],[76,28],[76,22],[88,22],[88,48],[72,48],[72,62],[88,62],[88,82],[60,82],[60,70],[44,70],[44,84],[30,84],[30,74]],
  },
  {
    id: 'cota', name: 'Circuit of the Americas', country: 'United States', city: 'Austin',
    length: 5.513, corners: 20,
    lapRecord: { time: '1:36.169', driver: 'Charles Leclerc', year: 2019 },
    layout: [[14,70],[18,52],[24,34],[34,20],[48,16],[56,24],[48,34],[40,42],[48,50],[62,44],[80,30],[88,40],[80,50],[84,62],[74,72],[60,64],[50,76],[36,82],[22,80]],
  },
  {
    id: 'hermanos-rodriguez', name: 'Autódromo Hermanos Rodríguez', country: 'Mexico', city: 'Mexico City',
    length: 4.304, corners: 17,
    lapRecord: { time: '1:17.774', driver: 'Valtteri Bottas', year: 2021 },
    layout: [[16,60],[22,42],[40,34],[58,38],[70,26],[86,28],[90,42],[80,52],[84,66],[70,74],[54,70],[44,80],[28,82],[18,74]],
  },
  {
    id: 'interlagos', name: 'Interlagos Circuit', country: 'Brazil', city: 'São Paulo',
    length: 4.309, corners: 15,
    lapRecord: { time: '1:10.540', driver: 'Valtteri Bottas', year: 2018 },
    layout: [[70,80],[56,84],[42,78],[34,66],[40,54],[30,44],[22,32],[32,20],[48,16],[62,22],[70,34],[80,40],[86,54],[82,68]],
  },
  {
    id: 'las-vegas', name: 'Las Vegas Strip Circuit', country: 'United States', city: 'Las Vegas',
    length: 6.201, corners: 17,
    lapRecord: { time: '1:33.365', driver: 'Max Verstappen', year: 2025 },
    layout: [[12,72],[12,28],[22,18],[46,16],[78,14],[88,22],[88,36],[76,40],[64,40],[60,50],[72,56],[88,58],[90,72],[80,82],[46,84],[22,82]],
  },
  {
    id: 'lusail', name: 'Lusail International Circuit', country: 'Qatar', city: 'Lusail',
    length: 5.419, corners: 16,
    lapRecord: { time: '1:22.384', driver: 'Lando Norris', year: 2024 },
    layout: [[14,58],[20,40],[36,32],[50,36],[62,26],[78,22],[88,34],[84,48],[72,52],[66,64],[78,72],[70,84],[50,82],[34,74],[20,76]],
  },
  {
    id: 'yas-marina', name: 'Yas Marina Circuit', country: 'United Arab Emirates', city: 'Abu Dhabi',
    length: 5.281, corners: 16,
    lapRecord: { time: '1:25.637', driver: 'Kevin Magnussen', year: 2024 },
    layout: [[14,28],[40,18],[70,14],[86,22],[84,36],[70,38],[62,48],[72,58],[86,62],[88,76],[72,84],[50,80],[40,66],[28,70],[16,62],[18,46]],
  },
];

// A race is the smallest number of laps that goes beyond 305 km (Monaco: 260 km)
function getRaceLaps(circuit) {
  const minimumKm = circuit.id === 'monaco' ? 260 : 305;
  return Math.ceil(minimumKm / circuit.length);
}

// Adds laps and race distance to every circuit
export const circuits = circuitData.map((circuit) => {
  const laps = getRaceLaps(circuit);

  return {
    ...circuit,
    laps: laps,
    distance: circuit.length * laps,
  };
});