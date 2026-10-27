import '../../styles/battle.css';

function GapBars({ gaps, nameA, nameB, roundLabels }) {
  const maxGap = Math.max(...gaps.map((gap) => Math.abs(gap)));

  return (
    <div className="chart-scroll">
      <div className="gap-chart">
        {gaps.map((gap, index) => {
          // Half of the area is above the centre line, half below
          const height = maxGap === 0 ? 0 : (Math.abs(gap) / maxGap) * 50;

          let tooltip = `${roundLabels[index]}: level on points`;
          if (gap > 0) {
            tooltip = `${roundLabels[index]}: ${nameA} leads by ${gap}`;
          } else if (gap < 0) {
            tooltip = `${roundLabels[index]}: ${nameB} leads by ${Math.abs(gap)}`;
          }

          return (
            <div className="gap-col" key={index} title={tooltip}>
              <div className="gap-bar-area">
                <div
                  className={`gap-bar ${gap >= 0 ? 'gap-bar-up' : 'gap-bar-down'}`}
                  style={{ height: `${height}%` }}
                ></div>
              </div>
              <span className="gap-round">{index + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GapBars;