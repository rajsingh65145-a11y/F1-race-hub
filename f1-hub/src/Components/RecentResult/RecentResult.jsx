import DriverAvatar from '../DriverAvatar/DriverAvatar';

function RecentResult({ race, drivers }) {
  const podium = race.results.slice(0, 3);

  return (
    <div className="card result-card">
      <p className="card-eyebrow">Latest Result · Round {race.round}</p>
      <h3 className="card-title">{race.name}</h3>

      <ul className="podium-list">
        {podium.map((result) => {
          const driver = drivers.find((d) => d.id === result.driverId);

          if (!driver) {
            return null;
          }

          return (
            <li className="podium-row" key={result.position}>
              <span className="podium-position">P{result.position}</span>
              <DriverAvatar name={driver.name} />
              <div className="podium-info">
                <strong>{driver.name}</strong>
                <span>{driver.team}</span>
              </div>
              <span className="podium-time">{result.time}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecentResult;