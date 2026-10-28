import '../../styles/battle.css';

function PositionStrip({ rows, roundLabels }) {
  return (
    <div className="chart-scroll">
      <table className="strip-table">
        <thead>
          <tr>
            <th className="strip-name"></th>
            {roundLabels.map((label, index) => (
              <th key={index} title={label}>
                {index + 1}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.driverId}>
              <th className="strip-name">{row.name}</th>

              {row.positions.map((position, index) => {
                const previous = index > 0 ? row.positions[index - 1] : position;
                const change = previous - position;
                const cellClass = position <= 3 ? `strip-cell-${position}` : '';

                return (
                  <td
                    key={index}
                    className={`strip-cell ${cellClass}`}
                    title={`${roundLabels[index]}: P${position}`}
                  >
                    {position}
                    {change > 0 && <span className="strip-change">▲</span>}
                    {change < 0 && (
                      <span className="strip-change strip-change-down">▼</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PositionStrip;