import '../../styles/tables.css';
import '../../styles/battle.css';
import { getLastName } from '../../utils/names';

function TitleChances({ rows }) {
  return (
    <div className="table-wrapper">
      <table className="standings-table">
        <thead>
          <tr>
            <th>Driver</th>
            <th>Points</th>
            <th>Gap</th>
            <th className="hide-sm">Max possible</th>
            <th>Catch-up difficulty</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => {
            let statusText = 'In the fight';
            let statusClass = 'status-alive';

            if (row.gap === 0) {
              statusText = 'Leader';
              statusClass = 'status-leader';
            } else if (!row.canWin) {
              statusText = 'Eliminated';
              statusClass = 'status-out';
            }

            return (
              <tr key={row.driver.id} className={row.canWin ? '' : 'row-eliminated'}>
                <td>
                  <strong className="chances-name">
                    {getLastName(row.driver.name)}
                  </strong>
                </td>
                <td>{row.driver.points}</td>
                <td>{row.gap === 0 ? '—' : `-${row.gap}`}</td>
                <td className="hide-sm">{row.maxPossible}</td>
                <td>
                  <div
                    className="difficulty"
                    title="Gap to the leader ÷ points still available. 100% = out of reach"
                  >
                    <div className="difficulty-track">
                      <div
                        className="difficulty-fill"
                        style={{ width: `${row.difficulty}%` }}
                      ></div>
                    </div>
                    <span>{Math.round(row.difficulty)}%</span>
                  </div>
                </td>
                <td>
                  <span className={`status-tag ${statusClass}`}>{statusText}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TitleChances;