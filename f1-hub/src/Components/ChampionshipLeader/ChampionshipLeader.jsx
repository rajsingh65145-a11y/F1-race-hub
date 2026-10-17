import DriverAvatar from '../DriverAvatar/DriverAvatar';

function ChampionshipLeader({ leader, chasers }) {
  const stats = [
    { label: 'Wins', value: leader.wins },
    { label: 'Podiums', value: leader.podiums },
    { label: 'Poles', value: leader.poles },
  ];

  return (
    <div className="card leader-card">
      <span className="leader-number">{leader.number}</span>

      <div className="leader-content">
        <p className="card-eyebrow">Championship Leader</p>

        <div className="leader-header">
          <DriverAvatar name={leader.name} size="lg" />
          <div>
            <h3 className="card-title">{leader.name}</h3>
            <p className="card-muted">
              {leader.team} · {leader.nationality}
            </p>
          </div>
        </div>

        <p className="leader-points">
          {leader.points}
          <span> PTS</span>
        </p>

        <div className="leader-stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <ul className="chaser-list">
          {chasers.map((driver, index) => (
            <li key={driver.id}>
              <span className="chaser-position">P{index + 2}</span>
              <span className="chaser-name">{driver.name}</span>
              <span className="chaser-points">{driver.points} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChampionshipLeader;