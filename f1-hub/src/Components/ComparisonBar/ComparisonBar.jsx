import '../../styles/compare.css';

function ComparisonBar({ label, displayA, displayB, widthA, widthB, winner }) {
  return (
    <div className="compare-row">
      <p className="compare-label">{label}</p>

      <div className="compare-line">
        <span
          className={`compare-value ${winner === 'a' ? 'compare-value-win' : ''}`}
        >
          {displayA}
        </span>

        <div className="compare-track compare-track-left">
          <div
            className={`compare-fill ${winner === 'a' ? 'compare-fill-win' : ''}`}
            style={{ width: `${widthA}%` }}
          ></div>
        </div>

        <div className="compare-track compare-track-right">
          <div
            className={`compare-fill ${winner === 'b' ? 'compare-fill-win' : ''}`}
            style={{ width: `${widthB}%` }}
          ></div>
        </div>

        <span
          className={`compare-value ${winner === 'b' ? 'compare-value-win' : ''}`}
        >
          {displayB}
        </span>
      </div>
    </div>
  );
}

export default ComparisonBar;