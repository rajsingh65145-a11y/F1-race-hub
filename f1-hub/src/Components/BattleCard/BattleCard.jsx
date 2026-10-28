import DriverAvatar from '../DriverAvatar/DriverAvatar';
import { getLastName } from '../../utils/names';
import '../../styles/cards.css';
import '../../styles/battle.css';

function BattleCard({ driver, row, position, leaderPoints, maxWeekend }) {
  const formPoints = row.points.slice(-5);
  const firstFormRound = row.points.length - formPoints.length + 1;
  const formTotal = formPoints.reduce((total, points) => total + points, 0);
  const bestWeekend = Math.max(...row.points);
  const gap = leaderPoints - driver.points;

  return (
    <article className="card battle-card">
      <div className="battle-card-top">
        <span className="driver-position">P{position}</span>
        <DriverAvatar name={driver.name} />
      </div>

      <h3 className="battle-card-name">{getLastName(driver.name)}</h3>
      <p className="card-muted">{driver.team}</p>

      <p className="battle-card-points">
        {driver.points}
        <span> PTS</span>
      </p>
      <p className="battle-card-gap">
        {gap === 0 ? 'Championship leader' : `${gap} pts behind the leader`}
      </p>

      <p className="form-title">
        Form · last {formPoints.length} rounds
        <strong>{formTotal} pts</strong>
      </p>

      <div className="form-bars">
        {formPoints.map((points, index) => (
          <div
            className="form-col"
            key={index}
            title={`Round ${firstFormRound + index}: ${points} pts`}
          >
            <div className="form-bar-area">
              <div
                className="form-bar"
                style={{ height: `${(points / maxWeekend) * 100}%` }}
              ></div>
            </div>
            <span className="form-points">{points}</span>
          </div>
        ))}
      </div>

      <p className="battle-card-note">Best weekend: {bestWeekend} pts</p>
    </article>
  );
}

export default BattleCard;