// Sample data for learning. Race dates and start times follow the real 2026
// calendar (Bahrain and Saudi Arabia were cancelled, so there are 22 races).
// Podiums, race times and qualifying times are made-up demo values.
export const season = {
  year: 2026,
  totalRounds: 23,
};

export const races = [
  {
    id: 'australia', round: 1, name: 'Australian Grand Prix', country: 'Australia', city: 'Melbourne',
    circuit: 'Albert Park Circuit', date: '6–8 Mar 2026', status: 'completed',
    qualifyingDate: '2026-03-07T05:00:00Z', raceDate: '2026-03-08T04:00:00Z',
    results: [
      { position: 1, driverId: 'russell', time: '1:22:14.302' },
      { position: 2, driverId: 'antonelli', time: '+2.914s' },
      { position: 3, driverId: 'norris', time: '+7.355s' },
    ],
  },
  {
    id: 'china', round: 2, name: 'Chinese Grand Prix', country: 'China', city: 'Shanghai',
    circuit: 'Shanghai International Circuit', date: '13–15 Mar 2026', status: 'completed', sprint: true,
    qualifyingDate: '2026-03-14T08:00:00Z', raceDate: '2026-03-15T07:00:00Z',
    results: [
      { position: 1, driverId: 'antonelli', time: '1:35:08.771' },
      { position: 2, driverId: 'russell', time: '+4.206s' },
      { position: 3, driverId: 'hamilton', time: '+10.918s' },
    ],
  },
  {
    id: 'japan', round: 3, name: 'Japanese Grand Prix', country: 'Japan', city: 'Suzuka',
    circuit: 'Suzuka Circuit', date: '27–29 Mar 2026', status: 'completed',
    qualifyingDate: '2026-03-28T06:00:00Z', raceDate: '2026-03-29T05:00:00Z',
    results: [
      { position: 1, driverId: 'antonelli', time: '1:28:41.529' },
      { position: 2, driverId: 'russell', time: '+3.348s' },
      { position: 3, driverId: 'piastri', time: '+9.077s' },
    ],
  },
  
  {
    id: 'saudi-arabia', round: null, name: 'Saudi Arabian Grand Prix', country: 'Saudi Arabia', city: 'Jeddah',
    circuit: 'Jeddah Corniche Circuit', date: '17–19 Apr 2026', status: 'cancelled',
    raceDate: '2026-04-19T17:00:00Z',
  },
  {
    id: 'miami', round: 4, name: 'Miami Grand Prix', country: 'United States', city: 'Miami',
    circuit: 'Miami International Autodrome', date: '1–3 May 2026', status: 'completed', sprint: true,
    qualifyingDate: '2026-05-02T21:00:00Z', raceDate: '2026-05-03T20:00:00Z',
    results: [
      { position: 1, driverId: 'norris', time: '1:30:22.146' },
      { position: 2, driverId: 'piastri', time: '+5.512s' },
      { position: 3, driverId: 'verstappen', time: '+12.763s' },
    ],
  },
  {
    id: 'canada', round: 5, name: 'Canadian Grand Prix', country: 'Canada', city: 'Montreal',
    circuit: 'Circuit Gilles Villeneuve', date: '22–24 May 2026', status: 'completed', sprint: true,
    qualifyingDate: '2026-05-23T21:00:00Z', raceDate: '2026-05-24T20:00:00Z',
    results: [
      { position: 1, driverId: 'russell', time: '1:31:55.680' },
      { position: 2, driverId: 'verstappen', time: '+1.983s' },
      { position: 3, driverId: 'antonelli', time: '+6.421s' },
    ],
  },
  {
    id: 'monaco', round: 6, name: 'Monaco Grand Prix', country: 'Monaco', city: 'Monte Carlo',
    circuit: 'Circuit de Monaco', date: '5–7 Jun 2026', status: 'completed',
    qualifyingDate: '2026-06-06T14:00:00Z', raceDate: '2026-06-07T13:00:00Z',
    results: [
      { position: 1, driverId: 'leclerc', time: '1:44:19.937' },
      { position: 2, driverId: 'norris', time: '+2.760s' },
      { position: 3, driverId: 'piastri', time: '+5.331s' },
    ],
  },
  {
    id: 'barcelona', round: 7, name: 'Barcelona-Catalunya Grand Prix', country: 'Spain', city: 'Montmeló',
    circuit: 'Circuit de Barcelona-Catalunya', date: '12–14 Jun 2026', status: 'completed',
    qualifyingDate: '2026-06-13T14:00:00Z', raceDate: '2026-06-14T13:00:00Z',
    results: [
      { position: 1, driverId: 'verstappen', time: '1:29:03.215' },
      { position: 2, driverId: 'norris', time: '+6.104s' },
      { position: 3, driverId: 'leclerc', time: '+14.289s' },
    ],
  },
  {
    id: 'austria', round: 8, name: 'Austrian Grand Prix', country: 'Austria', city: 'Spielberg',
    circuit: 'Red Bull Ring', date: '26–28 Jun 2026', status: 'completed',
    qualifyingDate: '2026-06-27T14:00:00Z', raceDate: '2026-06-28T13:00:00Z',
    results: [
      { position: 1, driverId: 'piastri', time: '1:21:36.458' },
      { position: 2, driverId: 'norris', time: '+3.871s' },
      { position: 3, driverId: 'russell', time: '+8.640s' },
    ],
  },
  {
    id: 'britain', round: 9, name: 'British Grand Prix', country: 'United Kingdom', city: 'Silverstone',
    circuit: 'Silverstone Circuit', date: '3–5 Jul 2026', status: 'completed', sprint: true,
    qualifyingDate: '2026-07-04T15:00:00Z', raceDate: '2026-07-05T14:00:00Z',
    results: [
      { position: 1, driverId: 'norris', time: '1:26:47.092' },
      { position: 2, driverId: 'hamilton', time: '+4.730s' },
      { position: 3, driverId: 'verstappen', time: '+11.205s' },
    ],
  },
  {
    id: 'belgium', round: 10, name: 'Belgian Grand Prix', country: 'Belgium', city: 'Stavelot',
    circuit: 'Circuit de Spa-Francorchamps', date: '17–19 Jul 2026', status: 'completed',
    qualifyingDate: '2026-07-18T14:00:00Z', raceDate: '2026-07-19T13:00:00Z',
    results: [
      { position: 1, driverId: 'russell', time: '1:23:29.614' },
      { position: 2, driverId: 'leclerc', time: '+7.918s' },
      { position: 3, driverId: 'antonelli', time: '+15.362s' },
    ],
  },
  {
    id: 'hungary', round: 11, name: 'Hungarian Grand Prix', country: 'Hungary', city: 'Mogyoród',
    circuit: 'Hungaroring', date: '24–26 Jul 2026', status: 'completed',
    qualifyingDate: '2026-07-25T14:00:00Z', raceDate: '2026-07-26T13:00:00Z',
    results: [
      { position: 1, driverId: 'verstappen', time: '1:36:12.803' },
      { position: 2, driverId: 'piastri', time: '+2.455s' },
      { position: 3, driverId: 'norris', time: '+9.774s' },
    ],
  },
  {
    id: 'netherlands', round: 12, name: 'Dutch Grand Prix', country: 'Netherlands', city: 'Zandvoort',
    circuit: 'Circuit Zandvoort', date: '21–23 Aug 2026', status: 'completed', sprint: true,
    qualifyingDate: '2026-08-22T14:00:00Z', raceDate: '2026-08-23T13:00:00Z',
    results: [
      { position: 1, driverId: 'antonelli', time: '1:33:27.350' },
      { position: 2, driverId: 'leclerc', time: '+5.087s' },
      { position: 3, driverId: 'sainz', time: '+10.641s' },
    ],
  },
  {
    id: 'italy', round: 13, name: 'Italian Grand Prix', country: 'Italy', city: 'Monza',
    circuit: 'Monza Circuit', date: '4–6 Sep 2026', status: 'completed',
    qualifyingDate: '2026-09-05T14:00:00Z', raceDate: '2026-09-06T13:00:00Z',
    results: [
      { position: 1, driverId: 'russell', time: '1:15:51.268' },
      { position: 2, driverId: 'antonelli', time: '+3.512s' },
      { position: 3, driverId: 'norris', time: '+8.936s' },
    ],
  },
  {
    id: 'spain', round: 14, name: 'Spanish Grand Prix', country: 'Spain', city: 'Madrid',
    circuit: 'Madring', date: '11–13 Sep 2026', status: 'completed',
    qualifyingDate: '2026-09-12T14:00:00Z', raceDate: '2026-09-13T13:00:00Z',
    results: [
      { position: 1, driverId: 'piastri', time: '1:32:05.741' },
      { position: 2, driverId: 'leclerc', time: '+4.325s' },
      { position: 3, driverId: 'antonelli', time: '+13.080s' },
    ],
  },
  {
    id: 'azerbaijan', round: 15, name: 'Azerbaijan Grand Prix', country: 'Azerbaijan', city: 'Baku',
    circuit: 'Baku City Circuit', date: '24–26 Sep 2026', status: 'completed',
    qualifyingDate: '2026-09-25T12:00:00Z', raceDate: '2026-09-26T11:00:00Z',
    results: [
      { position: 1, driverId: 'norris', time: '1:34:20.186' },
      { position: 2, driverId: 'verstappen', time: '+6.667s' },
      { position: 3, driverId: 'russell', time: '+11.452s' },
    ],
  },
    {
    id: 'bahrain', round: 16, name: 'Bahrain Grand Prix', country: 'Malaysia', city: 'Sepang',
    circuit: 'Sepang International Circuit', date: '2–4 Oct 2026', status: 'completed',
    qualifyingDate: '2026-10-03T08:00:00Z', raceDate: '2026-10-04T07:00:00Z',
    results: [
      { position: 1, driverId: 'russell', time: '1:33:21.704' },
      { position: 2, driverId: 'antonelli', time: '+4.118s' },
      { position: 3, driverId: 'hamilton', time: '+11.760s' },
    ],
  },
  {
    id: 'singapore', round: 16, name: 'Singapore Grand Prix', country: 'Singapore', city: 'Singapore',
    circuit: 'Marina Bay Street Circuit', date: '9–11 Oct 2026', status: 'completed', sprint: true,
    qualifyingDate: '2026-10-10T13:00:00Z', raceDate: '2026-10-11T12:00:00Z',
    
    results: [
      { position: 1, driverId: 'norris', time: '1:38:47.912' },
      { position: 2, driverId: 'russell', time: '+3.482s' },
      { position: 3, driverId: 'verstappen', time: '+9.116s' },
      { position: 4, driverId: 'piastri', time: '+12.340s' },
      { position: 5, driverId: 'antonelli', time: '+18.773s' },
      { position: 6, driverId: 'leclerc', time: '+24.051s' },
      { position: 7, driverId: 'hamilton', time: '+31.628s' },
      { position: 8, driverId: 'albon', time: '+45.912s' },
      { position: 9, driverId: 'sainz', time: '+52.007s' },
      { position: 10, driverId: 'hadjar', time: '+58.344s' },
      { position: 11, driverId: 'lawson', time: '+1:03.215' },
      { position: 12, driverId: 'alonso', time: '+1:09.870' },
      { position: 13, driverId: 'gasly', time: '+1:15.442' },
      { position: 14, driverId: 'bearman', time: '+1:21.036' },
      { position: 15, driverId: 'hulkenberg', time: '+1:26.519' },
      { position: 16, driverId: 'ocon', time: '+1:31.774' },
      { position: 17, driverId: 'lindblad', time: '+1 Lap' },
      { position: 18, driverId: 'colapinto', time: '+1 Lap' },
      { position: 19, driverId: 'bortoleto', time: '+1 Lap' },
      { position: 20, driverId: 'stroll', time: '+2 Laps' },
      { position: 21, driverId: 'perez', time: 'DNF' },
      { position: 22, driverId: 'bottas', time: 'DNF' },
    ],
    fastestLap: { driverId: 'piastri', time: '1:32.186', lap: 54 },

    
        qualifying: [
      { position: 1, driverId: 'russell', q1: '1:31.108', q2: '1:30.352', q3: '1:29.642' },
      { position: 2, driverId: 'antonelli', q1: '1:31.215', q2: '1:30.298', q3: '1:29.801' },
      { position: 3, driverId: 'norris', q1: '1:31.052', q2: '1:30.481', q3: '1:29.877' },
      { position: 4, driverId: 'verstappen', q1: '1:31.302', q2: '1:30.502', q3: '1:29.954' },
      { position: 5, driverId: 'piastri', q1: '1:31.250', q2: '1:30.566', q3: '1:30.112' },
      { position: 6, driverId: 'leclerc', q1: '1:31.388', q2: '1:30.640', q3: '1:30.231' },
      { position: 7, driverId: 'hamilton', q1: '1:31.477', q2: '1:30.713', q3: '1:30.398' },
      { position: 8, driverId: 'hadjar', q1: '1:31.540', q2: '1:30.795', q3: '1:30.455' },
      { position: 9, driverId: 'albon', q1: '1:31.612', q2: '1:30.850', q3: '1:30.620' },
      { position: 10, driverId: 'sainz', q1: '1:31.690', q2: '1:30.921', q3: '1:30.744' },
      { position: 11, driverId: 'alonso', q1: '1:31.744', q2: '1:30.987', q3: null },
      { position: 12, driverId: 'lawson', q1: '1:31.803', q2: '1:31.045', q3: null },
      { position: 13, driverId: 'bearman', q1: '1:31.871', q2: '1:31.112', q3: null },
      { position: 14, driverId: 'gasly', q1: '1:31.930', q2: '1:31.190', q3: null },
      { position: 15, driverId: 'hulkenberg', q1: '1:31.988', q2: '1:31.261', q3: null },
      { position: 16, driverId: 'lindblad', q1: '1:32.104', q2: null, q3: null },
      { position: 17, driverId: 'ocon', q1: '1:32.187', q2: null, q3: null },
      { position: 18, driverId: 'bortoleto', q1: '1:32.263', q2: null, q3: null },
      { position: 19, driverId: 'colapinto', q1: '1:32.340', q2: null, q3: null },
      { position: 20, driverId: 'stroll', q1: '1:32.422', q2: null, q3: null },
      { position: 21, driverId: 'perez', q1: '1:32.518', q2: null, q3: null },
      { position: 22, driverId: 'bottas', q1: '1:32.640', q2: null, q3: null },
    ],
  },
  {
    id: 'united-states', round: 17, name: 'United States Grand Prix', country: 'United States', city: 'Austin',
    circuit: 'Circuit of the Americas', date: '23–25 Oct 2026', status: 'upcoming',
    qualifyingDate: '2026-10-24T21:00:00Z', raceDate: '2026-10-25T20:00:00Z',
  },
  {
    id: 'mexico', round: 18, name: 'Mexico City Grand Prix', country: 'Mexico', city: 'Mexico City',
    circuit: 'Autódromo Hermanos Rodríguez', date: '30 Oct – 1 Nov 2026', status: 'upcoming',
    qualifyingDate: '2026-10-31T21:00:00Z', raceDate: '2026-11-01T20:00:00Z',
  },
  {
    id: 'brazil', round: 19, name: 'São Paulo Grand Prix', country: 'Brazil', city: 'São Paulo',
    circuit: 'Interlagos Circuit', date: '6–8 Nov 2026', status: 'upcoming',
    qualifyingDate: '2026-11-07T18:00:00Z', raceDate: '2026-11-08T17:00:00Z',
  },
  {
    id: 'las-vegas', round: 20, name: 'Las Vegas Grand Prix', country: 'United States', city: 'Las Vegas',
    circuit: 'Las Vegas Strip Circuit', date: '19–21 Nov 2026', status: 'upcoming',
    qualifyingDate: '2026-11-21T04:00:00Z', raceDate: '2026-11-22T04:00:00Z',
  },
  {
    id: 'qatar', round: 21, name: 'Qatar Grand Prix', country: 'Qatar', city: 'Lusail',
    circuit: 'Lusail International Circuit', date: '27–29 Nov 2026', status: 'upcoming',
    qualifyingDate: '2026-11-28T17:00:00Z', raceDate: '2026-11-29T16:00:00Z',
  },
  {
    id: 'abu-dhabi', round: 22, name: 'Abu Dhabi Grand Prix', country: 'United Arab Emirates', city: 'Abu Dhabi',
    circuit: 'Yas Marina Circuit', date: '4–6 Dec 2026', status: 'upcoming',
    qualifyingDate: '2026-12-05T14:00:00Z', raceDate: '2026-12-06T13:00:00Z',
  },
];