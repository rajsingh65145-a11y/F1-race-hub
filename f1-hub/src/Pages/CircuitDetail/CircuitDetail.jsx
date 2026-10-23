import { Link, useParams } from 'react-router-dom';
import RaceCard from '../../Components/RaceCard/RaceCard';
import StatCard from '../../Components/StatCard/StatCard';
import TrackLayout from '../../Components/TrackLayout/TrackLayout';
import { circuits } from '../../data/circuits';
import { races } from '../../data/races';
import { drivers } from '../../data/drivers';
import '../../styles/profile.css';
import '../../styles/circuits.css';
import '../../styles/cards.css';

function CircuitDetail() {
  const { circuitId } = useParams();
  const circuit = circuits.find((c) => c.id === circuitId);

  if (!circuit) {
    return (
      <div className="profile-page">
        <Link to="/circuits" className="back-link">
          ← All circuits
        </Link>
        <p className="empty-message">Circuit not found.</p>
      </div>
    );
  }

  const circuitRaces = races.filter((race) => race.circuit === circuit.name);

  const stats = [
    { label: 'Length', value: `${circuit.length} km` },
    { label: 'Laps', value: circuit.laps },
    { label: 'Turns', value: circuit.corners },
    {
      label: 'Race Distance',
      value: `${circuit.distance.toFixed(1)} km`,
      detail: 'laps × length',
    },
    {
      label: 'Lap Record',
      value: circuit.lapRecord ? circuit.lapRecord.time : '—',
      detail: circuit.lapRecord
        ? `${circuit.lapRecord.driver} · ${circuit.lapRecord.year}`
        : 'Not available',
    },
  ];

  return (
    <div className="profile-page">
      <Link to="/circuits" className="back-link">
        ← All circuits
      </Link>

      <section className="circuit-hero">
        <div>
          <p className="profile-kicker">
            {circuit.city} · {circuit.country}
          </p>
          <h1 className="circuit-title">{circuit.name}</h1>
          <p className="card-note">
            Simplified hand-drawn schematic, not to scale.
          </p>
        </div>

        <TrackLayout key={circuit.id} circuit={circuit} animated />
      </section>

      <section className="profile-stats circuit-stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            detail={stat.detail}
          />
        ))}
      </section>

      <section className="profile-section">
        <h2 className="section-title">Grand Prix in 2026</h2>

        {circuitRaces.length === 0 ? (
          <p className="card-note">No race at this circuit in 2026.</p>
        ) : (
          <div className="circuit-races">
            {circuitRaces.map((race) => {
              const winnerId = race.results ? race.results[0].driverId : null;
              const winner = drivers.find((driver) => driver.id === winnerId);

              return <RaceCard key={race.id} race={race} winner={winner} />;
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default CircuitDetail;