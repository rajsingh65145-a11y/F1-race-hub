import { Link } from 'react-router-dom';
import TrackLayout from '../TrackLayout/TrackLayout';

function CircuitCard({ circuit }) {
  const stats = [
    { label: 'Length', value: `${circuit.length} km` },
    { label: 'Laps', value: circuit.laps },
    { label: 'Turns', value: circuit.corners },
  ];

  return (
    <Link to={`/circuits/${circuit.id}`} className="card circuit-card">
      <div className="circuit-card-layout">
        <TrackLayout circuit={circuit} />
      </div>

      <h3 className="circuit-name">{circuit.name}</h3>
      <p className="card-muted">
        {circuit.city} · {circuit.country}
      </p>

      <div className="circuit-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}

export default CircuitCard;