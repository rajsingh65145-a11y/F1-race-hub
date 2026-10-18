import { Link } from 'react-router-dom';
import DriverAvatar from '../DriverAvatar/DriverAvatar';
import '../../styles/tables.css';

function StandingsTable({ drivers, standings }) {
  const maxPoints = standings[0].points;

  return (
    <div className="table-wrapper">
      <table className="standings-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Wins</th>
            <th className="hide-sm">Podiums</th>
            <th className="hide-sm">Poles</th>
            <th>Points</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td className="standings-position">
                {standings.indexOf(driver) + 1}
              </td>
              <td>
                <Link to={`/drivers/${driver.id}`} className="standings-driver">
                  <DriverAvatar name={driver.name} />
                  <div className="standings-driver-info">
                    <strong>{driver.name}</strong>
                    <span>{driver.team}</span>
                  </div>
                </Link>
              </td>
              <td>{driver.wins}</td>
              <td className="hide-sm">{driver.podiums}</td>
              <td className="hide-sm">{driver.poles}</td>
              <td>
                <div className="points-cell">
                  <span>{driver.points}</span>
                  <div className="points-bar">
                    <div
                      className="points-bar-fill"
                      style={{ width: `${(driver.points / maxPoints) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StandingsTable;