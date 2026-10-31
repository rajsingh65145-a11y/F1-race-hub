import TyreBadge from '../TyreBadge/TyreBadge';
import { tyreCompounds } from '../../data/tyres';
import { formatGap, formatLapTime } from '../../utils/lapTimes';
import { getLastName } from '../../utils/names';
import '../../styles/tables.css';
import '../../styles/live.css';

function getGapText(car) {
  if (car.retired) {
    return 'OUT';
  }
  if (car.position === 1) {
    return 'Leader';
  }
  return formatGap(car.gapToLeader);
}

function getIntervalText(car) {
  if (car.retired || car.position === 1) {
    return '—';
  }
  return formatGap(car.interval);
}

function LiveLeaderboard({ rows, drivers, favouriteId }) {  return (
    <div className="table-wrapper">
      <table className="standings-table live-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Gap</th>
            <th className="hide-sm">Int</th>
            <th>Tyre</th>
            <th className="hide-sm">Pits</th>
            <th className="hide-sm">Last lap</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((car) => {
            const driver = drivers.find((d) => d.id === car.driverId);
            const compound = tyreCompounds.find((t) => t.id === car.tyre);

            if (!driver || !compound) {
              return null;
            }

            return (
<tr
  key={car.driverId}
  className={`${car.retired ? 'row-out' : ''} ${
    car.driverId === favouriteId ? 'row-favourite' : ''
  }`}
>                <td className="standings-position">{car.position}</td>

                <td>
                  <div className="standings-driver-info">
<strong>
  {car.driverId === favouriteId && <span className="fav-mark" role="img" aria-label="Favourite driver">
    ♥
  </span>}
  {getLastName(driver.name)}
</strong>                  
  <span>{driver.team}</span>
                  </div>
                </td>

                <td>{getGapText(car)}</td>
                <td className="hide-sm">{getIntervalText(car)}</td>

                <td>
                  <div className="live-tyre">
                    <TyreBadge compound={compound} />
                    <span>{car.tyreAge}L</span>
                    {car.justPitted && <span className="pit-tag">PIT</span>}
                  </div>
                </td>

                <td className="hide-sm">{car.stops}</td>
                <td className="hide-sm">
                  {car.lastLap ? formatLapTime(car.lastLap) : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LiveLeaderboard;