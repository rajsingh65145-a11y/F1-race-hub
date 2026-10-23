import { buildTrackPath } from '../../utils/trackPath';

function TrackLayout({ circuit, animated = false }) {
  const start = circuit.layout[0];
  const pathData = buildTrackPath(circuit.layout);

  return (
    <svg
      className="track-layout"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Layout of ${circuit.name}`}
    >
      <path
        className={`track-path ${animated ? 'track-path-draw' : ''}`}
        d={pathData}
        pathLength="1"
      />
      <circle className="track-start" cx={start[0]} cy={start[1]} r="2.4" />

      {animated && (
        <circle className="track-car" r="2.2">
          <animateMotion
            begin="2.5s"
            dur="9s"
            repeatCount="indefinite"
            path={pathData}
          />
        </circle>
      )}
    </svg>
  );
}

export default TrackLayout;