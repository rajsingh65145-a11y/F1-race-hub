import { Link, useParams } from 'react-router-dom';
import DriverCard from '../../Components/DriverCard/DriverCard';
import StatCard from '../../Components/StatCard/StatCard';
import { constructorStandings } from '../../data/teams';
import { standings } from '../../data/drivers';
import '../../styles/profile.css';
import '../../styles/cards.css';

function TeamDetail() {
  const { teamId } = useParams();
  const team = constructorStandings.find((t) => t.id === teamId);

  if (!team) {
    return (
      <div className="profile-page">
        <Link to="/teams" className="back-link">
          ← All teams
        </Link>
        <p className="empty-message">Team not found.</p>
      </div>
    );
  }

  const leader = constructorStandings[0];
  const position = constructorStandings.indexOf(team) + 1;

  const stats = [
    {
      label: 'Points',
      value: team.points,
      detail:
        position === 1
          ? 'Championship leader'
          : `${leader.points - team.points} pts behind leader`,
      progress: (team.points / leader.points) * 100,
    },
    { label: 'Wins', value: team.wins },
    { label: 'Podiums', value: team.podiums },
    { label: 'Poles', value: team.poles },
  ];

  // How much of the team's points each driver scored
  const shares = team.drivers.map((driver) => ({
    driver: driver,
    percent: (driver.points / team.points) * 100,
  }));

  return (
    <div className="profile-page">
      <Link to="/teams" className="back-link">
        ← All teams
      </Link>

      <section className="profile-hero">
        <span className="profile-number">{team.code}</span>

        <div className="profile-hero-content">
          <span className="driver-position">P{position}</span>
          <p className="profile-kicker">{team.country}</p>
          <h1 className="profile-last-name">{team.name}</h1>
          <p className="card-muted">{team.engine} power unit</p>
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

      <section className="profile-section">
        <h2 className="section-title">Points contribution</h2>

        <div className="split-bar">
          {shares.map((share, index) => (
            <div
              key={share.driver.id}
              className={`split-segment-${index}`}
              style={{ width: `${share.percent}%` }}
            ></div>
          ))}
        </div>

        <ul className="split-legend">
          {shares.map((share, index) => (
            <li key={share.driver.id}>
              <span className={`split-dot split-dot-${index}`}></span>
              <strong>{share.driver.name}</strong>
              <span className="split-points">
                {share.driver.points} pts · {Math.round(share.percent)}%
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="profile-section">
        <h2 className="section-title">Drivers</h2>
        <div className="team-drivers-grid">
          {team.drivers.map((driver) => (
            <DriverCard
              key={driver.id}
              driver={driver}
              position={standings.indexOf(driver) + 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default TeamDetail;