import '../../styles/tyres.css';

function TyreBadge({ compound }) {
  return (
    <span
      className="tyre-badge"
      style={{ borderColor: compound.color, color: compound.color }}
    >
      {compound.letter}
    </span>
  );
}

export default TyreBadge;