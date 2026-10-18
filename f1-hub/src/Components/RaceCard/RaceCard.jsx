import DriverAvatar from '../DriverAvatar/DriverAvatar';

function getDaysUntil(isoString) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((new Date(isoString) - new Date()) / msPerDay);
}

function formatDaysUntil(days) {
  if (days > 1) {
    return `In ${days} days`;
  }
  if (days === 1) {
    return 'In 1 day';
  }
  if (days === 0) {
    return 'Race day';
  }
  return 'Date passed';
}

function RaceCard({ race, winner, isNext }) {
  const isCompleted = race.status === 'completed';
  const isUpcoming = race.status === 'upcoming';

  return (
    <article
      className={`card race-card race-card-${race.status} ${isNext ? 'race-card-next' : ''}`}
    >
      <div className="race-card-top">
        <span className="race-round">{race.round ? `R${race.round}` : '—'}</span>

        <div className="race-tags">
          {race.sprint && <span className="race-tag">Sprint</span>}
          {isNext && <span className="race-tag race-tag-next">Next</span>}
          <span className={`race-tag race-tag-${race.status}`}>{race.status}</span>
        </div>
      </div>

      <h3 className="race-name">{race.name}</h3>
      <p className="card-muted">
        {race.circuit} · {race.city}
      </p>
      <p className="race-date">{race.date}</p>

      {isCompleted && winner && (
        <div className="race-footer">
          <DriverAvatar name={winner.name} />
          <div>
            <span className="race-footer-label">Winner</span>
            <p className="race-footer-value">{winner.name}</p>
          </div>
        </div>
      )}

      {isUpcoming && (
        <div className="race-footer">
          <div>
            <span className="race-footer-label">Lights out</span>
            <p className="race-footer-value">
              {formatDaysUntil(getDaysUntil(race.raceDate))}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

export default RaceCard;