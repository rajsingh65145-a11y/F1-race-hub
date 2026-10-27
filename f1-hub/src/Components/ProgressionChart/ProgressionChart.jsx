import '../../styles/battle.css';

const WIDTH = 720;
const HEIGHT = 340;
const MARGIN = { top: 16, right: 110, bottom: 34, left: 48 };

function ProgressionChart({ series, idA, idB, nameA, nameB, roundLabels }) {
  const roundCount = roundLabels.length;
  const lastIndex = roundCount - 1;

  const maxPoints = Math.max(...series.map((row) => row.cumulative[lastIndex]));
  const yMax = Math.ceil(maxPoints / 50) * 50;

  const plotWidth = WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  // Round index (0, 1, 2...) -> x position on the chart
  function getX(index) {
    return MARGIN.left + (index / lastIndex) * plotWidth;
  }

  // Points -> y position (in SVG, y grows DOWNWARDS, so more points = smaller y)
  function getY(points) {
    return MARGIN.top + plotHeight - (points / yMax) * plotHeight;
  }

  function toPolyline(cumulative) {
    return cumulative
      .map((points, index) => `${getX(index).toFixed(1)},${getY(points).toFixed(1)}`)
      .join(' ');
  }

  const gridValues = [];
  for (let value = 0; value <= yMax; value += 50) {
    gridValues.push(value);
  }

  const seriesA = series.find((row) => row.driverId === idA);
  const seriesB = series.find((row) => row.driverId === idB);
  const otherSeries = series.filter(
    (row) => row.driverId !== idA && row.driverId !== idB
  );

  const lastA = seriesA.cumulative[lastIndex];
  const lastB = seriesB.cumulative[lastIndex];
  const aIsAhead = lastA >= lastB;

  return (
    <div className="chart-scroll">
      <svg
        className="chart-svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Points progression of ${nameA} and ${nameB}`}
      >
        {gridValues.map((value) => (
          <g key={value}>
            <line
              className="chart-grid"
              x1={MARGIN.left}
              x2={WIDTH - MARGIN.right}
              y1={getY(value)}
              y2={getY(value)}
            />
            <text
              className="chart-axis-text"
              x={MARGIN.left - 8}
              y={getY(value) + 4}
              textAnchor="end"
            >
              {value}
            </text>
          </g>
        ))}

        {roundLabels.map((label, index) => (
          <text
            key={index}
            className="chart-axis-text"
            x={getX(index)}
            y={HEIGHT - 12}
            textAnchor="middle"
          >
            {index + 1}
          </text>
        ))}

        {otherSeries.map((row) => (
          <polyline
            key={row.driverId}
            className="chart-line chart-line-dim"
            points={toPolyline(row.cumulative)}
          />
        ))}

        <polyline
          className="chart-line chart-line-b"
          points={toPolyline(seriesB.cumulative)}
        />
        <polyline
          className="chart-line chart-line-a"
          points={toPolyline(seriesA.cumulative)}
        />

        {seriesB.cumulative.map((points, index) => (
          <circle
            key={index}
            className="chart-dot chart-dot-b"
            cx={getX(index)}
            cy={getY(points)}
            r="4"
          >
            <title>{`${nameB}: ${points} pts · ${roundLabels[index]}`}</title>
          </circle>
        ))}

        {seriesA.cumulative.map((points, index) => (
          <circle
            key={index}
            className="chart-dot chart-dot-a"
            cx={getX(index)}
            cy={getY(points)}
            r="4"
          >
            <title>{`${nameA}: ${points} pts · ${roundLabels[index]}`}</title>
          </circle>
        ))}

        <text
          className="chart-label chart-label-a"
          x={getX(lastIndex) + 10}
          y={getY(lastA) + (aIsAhead ? -4 : 14)}
        >
          {nameA} {lastA}
        </text>
        <text
          className="chart-label chart-label-b"
          x={getX(lastIndex) + 10}
          y={getY(lastB) + (aIsAhead ? 14 : -4)}
        >
          {nameB} {lastB}
        </text>
      </svg>
    </div>
  );
}

export default ProgressionChart;