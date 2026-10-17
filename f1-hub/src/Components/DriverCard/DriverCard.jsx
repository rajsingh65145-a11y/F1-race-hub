
import { Link } from 'react-router-dom';
function DriverCard({ driver, position }) {
  const nameParts = driver.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  const stats = [
    { label: 'Pts', value: driver.points },
    { label: 'Wins', value: driver.wins },
    { label: 'Podiums', value: driver.podiums },
    { label: 'Poles', value: driver.poles },
  ];

  return (
    <Link to={`/drivers/${driver.id}`} className="card driver-card">
      <span className="driver-number">{driver.number}</span>

      <div className="driver-card-content">
        <span className="driver-position">P{position}</span>

        <p className="driver-first-name">{firstName}</p>
        <h3 className="driver-last-name">{lastName}</h3>
        <p className="card-muted">
          {driver.team} · {driver.flag}
        </p>

        <div className="driver-stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default DriverCard;