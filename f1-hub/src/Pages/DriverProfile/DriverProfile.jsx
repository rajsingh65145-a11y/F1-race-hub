import { Link, useParams } from 'react-router-dom';
import DriverAvatar from '../../Components/DriverAvatar/DriverAvatar';
import StatCard from '../../Components/StatCard/StatCard';
import { drivers, standings } from '../../data/drivers';
import { teams } from '../../data/teams';
import '../../styles/profile.css';
import '../../styles/cards.css';

function DriverProfile() {
  const { driverId } = useParams();
  const driver = drivers.find((d) => d.id === driverId);

  if (!driver) {
    return (
      <div className="profile-page">
        <Link to="/drivers" className="back-link">
          ← All drivers
        </Link>
        <p className="empty-message">Driver not found.</p>
      </div>
    );
  }

  const nameParts = driver.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  const leader = standings[0];
  const position = standings.indexOf(driver) + 1;
  const teammate = drivers.find(
    (d) => d.team === driver.team && d.id !== driver.id
  );
  const team = teams.find((t) => t.name === driver.team);

  const stats = [
    {
      label: 'Points',
      value: driver.points,
      detail:
        position === 1
          ? 'Championship leader'
          : `${leader.points - driver.points} pts behind leader`,
      progress: (driver.points / leader.points) * 100,
    },
    { label: 'Wins', value: driver.wins },
    { label: 'Podiums', value: driver.podiums },
    { label: 'Poles', value: driver.poles },
    { label: 'Best Finish', value: `P${driver.bestFinish}` },
  ];

  return (
    <div className="profile-page">
      <Link to="/drivers" className="back-link">
        ← All drivers
      </Link>

      <section className="profile-hero">
        <span className="profile-number">{driver.number}</span>

        <div className="profile-hero-content">
          <div className="profile-identity">
            <DriverAvatar name={driver.name} size="lg" />
            <span className="driver-position">P{position}</span>
          </div>

          <p className="driver-first-name">{firstName}</p>
          <h1 className="profile-last-name">{lastName}</h1>
          <p className="card-muted">
  {team ? (
    <Link to={`/teams/${team.id}`} className="inline-link">
      {driver.team}
    </Link>
  ) : (
    driver.team
  )}{' '}
  · {driver.nationality} ({driver.flag})
</p>
        </div>
      </section>

      <section className="profile-stats">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            detail={stat.detail}
            progress={stat.progress}
          />
        ))}
      </section>

      {teammate && (
        <section className="profile-section">
          <h2 className="section-title">Teammate</h2>
          <Link to={`/drivers/${teammate.id}`} className="card teammate-card">
            <DriverAvatar name={teammate.name} />
            <div className="teammate-info">
              <strong>{teammate.name}</strong>
              <span>
                #{teammate.number} · {teammate.points} pts
              </span>
            </div>
            <span className="teammate-arrow">→</span>
          </Link>
        </section>
      )}
    </div>
  );
}

export default DriverProfile;