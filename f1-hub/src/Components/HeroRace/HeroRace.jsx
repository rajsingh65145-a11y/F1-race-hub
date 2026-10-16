import { Link } from 'react-router-dom';
import Countdown from '../Countdown/Countdown';

function HeroRace({ race }) {
  return (
    <section className="hero">
      <span className="hero-round">{race.round}</span>

      <div className="hero-content">
        <p className="hero-eyebrow">
          <span className="live-dot"></span>
          Next Grand Prix · Round {race.round}
        </p>

        <h1 className="hero-title">{race.name}</h1>

        <p className="hero-meta">
          {race.circuit} · {race.city}
        </p>
        <p className="hero-meta">{race.date}</p>

        <Countdown targetDate={race.raceDate} />

        <div className="hero-actions">
          <Link to="/calendar" className="btn btn-primary">
            Race Calendar
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroRace;