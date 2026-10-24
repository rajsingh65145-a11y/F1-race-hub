import { Link } from 'react-router-dom';
import TyreBadge from '../TyreBadge/TyreBadge';
import { tyreCompounds } from '../../data/tyres';
import { getLastName } from '../../utils/names';
import '../../styles/tyres.css';

function sumLaps(stints) {
  return stints.reduce((total, stint) => total + stint.laps, 0);
}

// Adds the first and last lap of every stint, using a running total
function addLapRanges(stints) {
  const result = [];
  let lapCounter = 0;

  stints.forEach((stint) => {
    result.push({
      compound: stint.compound,
      laps: stint.laps,
      startLap: lapCounter + 1,
      endLap: lapCounter + stint.laps,
    });

    lapCounter += stint.laps;
  });

  return result;
}

function formatStops(count) {
  if (count === 0) {
    return 'No stops';
  }
  if (count === 1) {
    return '1 stop';
  }
  return `${count} stops`;
}

function TyreStrategy({ race, drivers }) {
  const { strategies, results } = race;

  // The longest strategy is the race distance (the winner completes every lap)
  const totalLaps = Math.max(...strategies.map((s) => sumLaps(s.stints)));

  const ticks = [];
  for (let lap = 0; lap <= totalLaps; lap += 10) {
    ticks.push(lap);
  }

  const totalStops = strategies.reduce(
    (total, s) => total + s.stints.length - 1,
    0
  );
  const stopsPerDriver = (totalStops / strategies.length).toFixed(1);

  return (
    <div>
      <p className="strategy-summary">
        {totalStops} pit stops · {stopsPerDriver} per driver
      </p>

      <div className="strategy-legend">
        {tyreCompounds.map((compound) => (
          <span className="legend-item" key={compound.id}>
            <TyreBadge compound={compound} />
            {compound.name}
          </span>
        ))}
      </div>

      <div className="strategy-chart">
        <div className="strategy-inner">
          <div className="strategy-row">
            <div></div>
            <div className="strategy-axis">
              {ticks.map((lap) => (
                <span
                  key={lap}
                  className="axis-tick"
                  style={{ left: `${(lap / totalLaps) * 100}%` }}
                >
                  {lap}
                </span>
              ))}
            </div>
          </div>

          {results.map((result) => {
            const strategy = strategies.find((s) => s.driverId === result.driverId);
            const driver = drivers.find((d) => d.id === result.driverId);

            if (!strategy || !driver) {
              return null;
            }

            const stints = addLapRanges(strategy.stints);
            const isDnf = result.time === 'DNF';

            return (
              <div className="strategy-row" key={result.driverId}>
                <div className="strategy-driver">
                  <span className="strategy-position">{result.position}</span>
                  <div>
                    <Link to={`/drivers/${driver.id}`} className="inline-link">
                      {getLastName(driver.name)}
                    </Link>
                    <span className="strategy-stops">
                      {formatStops(stints.length - 1)}
                    </span>
                  </div>
                </div>

                <div className="strategy-lane">
                  {stints.map((stint) => {
                    const compound = tyreCompounds.find(
                      (t) => t.id === stint.compound
                    );

                    if (!compound) {
                      return null;
                    }

                    return (
                      <div
                        key={stint.startLap}
                        className="stint"
                        style={{
                          width: `${(stint.laps / totalLaps) * 100}%`,
                          backgroundColor: compound.color,
                        }}
                        title={`${compound.name}: laps ${stint.startLap}–${stint.endLap}`}
                      >
                        <span>{compound.letter}</span>
                        <span className="stint-laps">{stint.laps}</span>
                      </div>
                    );
                  })}

                  {isDnf && <span className="strategy-dnf">DNF</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TyreStrategy;