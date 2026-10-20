import { Link } from 'react-router-dom';
import DriverAvatar from '../DriverAvatar/DriverAvatar';
import StatCard from '../StatCard/StatCard';
import { lapTimeToSeconds, formatGap } from '../../utils/lapTimes';
import '../../styles/tables.css';
import '../../styles/results.css';

const sessionFields = ['q1', 'q2', 'q3'];

// Fastest time (in seconds) of one session, ignoring drivers who didn't take part
function getFastestTime(rows, field) {
  const times = rows
    .filter((row) => row[field])
    .map((row) => lapTimeToSeconds(row[field]));

  return Math.min(...times);
}

// How far the driver got: 3 = reached Q3, 2 = out in Q2, 1 = out in Q1
function getStagesReached(row) {
  if (row.q3) {
    return 3;
  }
  if (row.q2) {
    return 2;
  }
  return 1;
}

function QualifyingResults({ qualifying, drivers }) {
  const pole = qualifying[0];
  const poleDriver = drivers.find((d) => d.id === pole.driverId);
  const poleSeconds = lapTimeToSeconds(pole.q3);
  const frontRowGap = lapTimeToSeconds(qualifying[1].q3) - poleSeconds;

  const fastest = {
    q1: getFastestTime(qualifying, 'q1'),
    q2: getFastestTime(qualifying, 'q2'),
    q3: getFastestTime(qualifying, 'q3'),
  };

  return (
    <div>
      <div className="results-stats">
        <StatCard
          label="Pole Position"
          value={pole.q3}
          detail={poleDriver && poleDriver.name}
        />
        <StatCard
          label="Front Row Gap"
          value={formatGap(frontRowGap)}
          detail="between P1 and P2"
        />
      </div>

      <div className="table-wrapper">
        <table className="standings-table qualifying-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>
              <th>Gap</th>
              <th>Reached</th>
            </tr>
          </thead>

          <tbody>
            {qualifying.map((row) => {
              const driver = drivers.find((d) => d.id === row.driverId);

              if (!driver) {
                return null;
              }

              const bestTime = row.q3 || row.q2 || row.q1;
              const gap = lapTimeToSeconds(bestTime) - poleSeconds;
              const stagesReached = getStagesReached(row);

              return (
                <tr key={row.driverId}>
                  <td className="standings-position">{row.position}</td>
                  <td>
                    <Link to={`/drivers/${driver.id}`} className="standings-driver">
                      <DriverAvatar name={driver.name} />
                      <div className="standings-driver-info">
                        <strong>{driver.name}</strong>
                        <span>{driver.team}</span>
                      </div>
                    </Link>
                  </td>

                  {sessionFields.map((field) => {
                    const isFastest =
                      row[field] && lapTimeToSeconds(row[field]) === fastest[field];

                    return (
                      <td key={field} className={isFastest ? 'time-fastest' : ''}>
                        {row[field] || '—'}
                      </td>
                    );
                  })}

                  <td>{row.position === 1 ? 'Pole' : formatGap(gap)}</td>

                  <td>
                    <div className="stages">
                      {[1, 2, 3].map((stage) => (
                        <span
                          key={stage}
                          className={`stage ${stage <= stagesReached ? 'stage-reached' : ''}`}
                        ></span>
                      ))}
                      <span className="stage-label">
                        {stagesReached === 3 ? 'Q3' : `Out Q${stagesReached}`}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QualifyingResults;