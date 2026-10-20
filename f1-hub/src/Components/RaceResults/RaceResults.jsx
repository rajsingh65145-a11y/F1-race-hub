import { Link } from 'react-router-dom';
import DriverAvatar from '../DriverAvatar/DriverAvatar';
import StatCard from '../StatCard/StatCard';
import '../../styles/tables.css';
import '../../styles/results.css';

// Points for P1 to P10, everyone else gets 0
const POINTS_BY_POSITION = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

// grid 3, finished 1  ->  gained 2 places
function getPositionChange(grid, position) {
  const change = grid - position;

  if (change > 0) {
    return { text: `▲${change}`, className: 'change-up' };
  }
  if (change < 0) {
    return { text: `▼${Math.abs(change)}`, className: 'change-down' };
  }
  return { text: '–', className: 'change-same' };
}

function RaceResults({ race, drivers }) {
  const { results, fastestLap, qualifying } = race;

  const winner = results[0];
  const winnerDriver = drivers.find((d) => d.id === winner.driverId);
  const fastestDriver = fastestLap
    ? drivers.find((d) => d.id === fastestLap.driverId)
    : null;
  const finishers = results.filter((result) => result.time !== 'DNF').length;

  return (
    <div>
      <div className="results-stats results-stats-three">
        <StatCard
          label="Winning Time"
          value={winner.time}
          detail={winnerDriver && winnerDriver.name}
        />
        {fastestLap && (
          <StatCard
            label="Fastest Lap"
            value={fastestLap.time}
            detail={
              fastestDriver && `${fastestDriver.name} · Lap ${fastestLap.lap}`
            }
          />
        )}
        <StatCard
          label="Finishers"
          value={`${finishers} / ${results.length}`}
          detail="classified drivers"
        />
      </div>

      <div className="table-wrapper">
        <table className="standings-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th className="hide-sm">Grid</th>
              <th className="hide-sm">+/-</th>
              <th>Time / Gap</th>
              <th>Pts</th>
            </tr>
          </thead>

          <tbody>
            {results.map((result) => {
              const driver = drivers.find((d) => d.id === result.driverId);

              if (!driver) {
                return null;
              }

              const isDnf = result.time === 'DNF';
              const points = POINTS_BY_POSITION[result.position - 1] || 0;
              const hasFastestLap =
                fastestLap && fastestLap.driverId === driver.id;

              const gridRow = qualifying
                ? qualifying.find((q) => q.driverId === driver.id)
                : null;
              const grid = gridRow ? gridRow.position : null;
              const change =
                grid !== null && !isDnf
                  ? getPositionChange(grid, result.position)
                  : null;

              return (
                <tr key={result.driverId}>
                  <td className="standings-position">{result.position}</td>

                  <td>
                    <Link to={`/drivers/${driver.id}`} className="standings-driver">
                      <DriverAvatar name={driver.name} />
                      <div className="standings-driver-info">
                        <div className="driver-name-row">
                          <strong>{driver.name}</strong>
                          {hasFastestLap && <span className="fl-badge">FL</span>}
                        </div>
                        <span>{driver.team}</span>
                      </div>
                    </Link>
                  </td>

                  <td className="hide-sm">{grid !== null ? grid : '—'}</td>

                  <td className="hide-sm">
                    {change ? (
                      <span className={change.className}>{change.text}</span>
                    ) : (
                      '—'
                    )}
                  </td>

                  <td>{isDnf ? <span className="dnf">DNF</span> : result.time}</td>

                  <td>{points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RaceResults;