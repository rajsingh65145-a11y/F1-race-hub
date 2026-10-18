import { Link } from 'react-router-dom';
import DriverAvatar from '../DriverAvatar/DriverAvatar';

function TeamCard({ team, position }) {
  return (
    <Link to={`/teams/${team.id}`} className="card team-card">
      <span className="team-code">{team.code}</span>

      <div className="team-card-content">
        <span className="driver-position">P{position}</span>

        <h3 className="team-name">{team.name}</h3>
        <p className="card-muted">
          {team.country} · {team.engine} power
        </p>

        <p className="team-points">
          {team.points}
          <span> PTS</span>
        </p>

        <ul className="team-drivers">
          {team.drivers.map((driver) => (
            <li key={driver.id}>
              <DriverAvatar name={driver.name} />
              <span className="team-driver-name">{driver.name}</span>
              <span className="team-driver-points">{driver.points}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export default TeamCard;