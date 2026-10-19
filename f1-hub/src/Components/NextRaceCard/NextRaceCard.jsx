import { formatSession } from '../../utils/dates';


function NextRaceCard({ race }) {
  const sessions = [
    { name: 'Qualifying', time: formatSession(race.qualifyingDate) },
    { name: 'Race', time: formatSession(race.raceDate) },
  ];

  return (
    <div className="card next-race-card">
      <p className="card-eyebrow">Next Race · Round {race.round}</p>
      <h3 className="card-title">{race.name}</h3>
      <p className="card-muted">
        {race.circuit} · {race.city}
      </p>

      <ul className="session-list">
        {sessions.map((session) => (
          <li key={session.name}>
            <span className="session-name">{session.name}</span>
            <span className="session-time">{session.time}</span>
          </li>
        ))}
      </ul>

      <p className="card-note">Times shown in your local timezone</p>
    </div>
  );
}

export default NextRaceCard;