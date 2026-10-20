import { Link, useParams } from 'react-router-dom';
import Countdown from '../../Components/Countdown/Countdown';
import RecentResult from '../../Components/RecentResult/RecentResult';
import QualifyingResults from '../../Components/QualifyingResults/QualifyingResults';
import { races } from '../../data/races';
import { drivers } from '../../data/drivers';
import { formatSession } from '../../utils/dates';
import '../../styles/profile.css';
import '../../styles/weekend.css';
import '../../styles/cards.css';

const MS_PER_HOUR = 1000 * 60 * 60;

// How many hours before qualifying each session starts (estimated)
const standardSessions = [
  { name: 'Practice 1', hoursBeforeQuali: 27.5 },
  { name: 'Practice 2', hoursBeforeQuali: 24 },
  { name: 'Practice 3', hoursBeforeQuali: 3.5 },
  { name: 'Qualifying', hoursBeforeQuali: 0 },
];

const sprintSessions = [
  { name: 'Practice 1', hoursBeforeQuali: 27.5 },
  { name: 'Sprint Qualifying', hoursBeforeQuali: 23.5 },
  { name: 'Sprint', hoursBeforeQuali: 4 },
  { name: 'Qualifying', hoursBeforeQuali: 0 },
];

const statusLabels = {
  done: 'Completed',
  next: 'Up next',
  upcoming: 'Upcoming',
};

function getWeekendSessions(race) {
  const template = race.sprint ? sprintSessions : standardSessions;
  const qualiTime = new Date(race.qualifyingDate).getTime();

  const sessions = template.map((session) => ({
    name: session.name,
    time: new Date(qualiTime - session.hoursBeforeQuali * MS_PER_HOUR),
  }));

  sessions.push({ name: 'Race', time: new Date(race.raceDate) });

  return sessions;
}

function getSessionStatus(index, nextIndex) {
  if (nextIndex === -1 || index < nextIndex) {
    return 'done';
  }
  if (index === nextIndex) {
    return 'next';
  }
  return 'upcoming';
}

function RaceWeekend() {
  const { raceId } = useParams();
  const race = races.find((r) => r.id === raceId);

  if (!race) {
    return (
      <div className="profile-page">
        <Link to="/calendar" className="back-link">
          ← Race calendar
        </Link>
        <p className="empty-message">Race not found.</p>
      </div>
    );
  }

  const isCancelled = race.status === 'cancelled';
  const sessions = isCancelled ? [] : getWeekendSessions(race);
  const now = new Date();
  const nextIndex = sessions.findIndex((session) => session.time > now);

  return (
    <div className="profile-page">
      <Link to="/calendar" className="back-link">
        ← Race calendar
      </Link>

      <section className="profile-hero">
        {race.round && <span className="profile-number">{race.round}</span>}

        <div className="profile-hero-content">
          <div className="race-tags">
            {race.sprint && <span className="race-tag">Sprint</span>}
            <span className={`race-tag race-tag-${race.status}`}>
              {race.status}
            </span>
          </div>

          <p className="profile-kicker">
            {race.round ? `Round ${race.round} · ` : ''}
            {race.date}
          </p>
          <h1 className="weekend-title">{race.name}</h1>
          <p className="card-muted">
            {race.circuit} · {race.city}, {race.country}
          </p>

          {race.status === 'upcoming' && <Countdown targetDate={race.raceDate} />}
        </div>
      </section>

      {race.status === 'completed' && race.results && (
        <section className="profile-section">
          <h2 className="section-title">Result</h2>
          <div className="weekend-result">
            <RecentResult race={race} drivers={drivers} eyebrow="Race Result" />
          </div>
        </section>
      )}
            {race.status === 'completed' && (
        <section className="profile-section">
          <h2 className="section-title">Qualifying</h2>

          {race.qualifying ? (
            <QualifyingResults qualifying={race.qualifying} drivers={drivers} />
          ) : (
            <p className="card-note">
              Detailed qualifying data is not available for this race in the demo.
            </p>
          )}
        </section>
      )}
    

      <section className="profile-section">
        <h2 className="section-title">Weekend timeline</h2>

        {isCancelled ? (
          <p className="empty-message">
            This Grand Prix was cancelled, so there are no sessions.
          </p>
        ) : (
          <>
            <ol className="timeline">
              {sessions.map((session, index) => {
                const status = getSessionStatus(index, nextIndex);

                return (
                  <li
                    key={session.name}
                    className={`timeline-item timeline-item-${status}`}
                  >
                    <span className="timeline-dot"></span>
                    <div className="timeline-content">
                      <strong>{session.name}</strong>
                      <span>{formatSession(session.time)}</span>
                    </div>
                    <span className="timeline-status">{statusLabels[status]}</span>
                  </li>
                );
              })}
            </ol>
            <p className="card-note">
              Times shown in your local timezone (session times are estimated)
            </p>
          </>
        )}
      </section>
    </div>
  );
}

export default RaceWeekend;