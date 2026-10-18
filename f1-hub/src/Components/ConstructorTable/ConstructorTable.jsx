import { Link } from 'react-router-dom';
import '../../styles/tables.css';

function ConstructorTable({ teams }) {
  const maxPoints = teams[0].points;

  return (
    <div className="table-wrapper">
      <table className="standings-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <th>Wins</th>
            <th className="hide-sm">Podiums</th>
            <th className="hide-sm">Poles</th>
            <th>Points</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team, index) => (
            <tr key={team.id}>
              <td className="standings-position">{index + 1}</td>
              <td>
                <Link to={`/teams/${team.id}`} className="team-cell">
                  <span className="team-badge">{team.code}</span>
                  <div className="team-cell-info">
                    <strong>{team.name}</strong>
                    <span>{team.engine} power</span>
                  </div>
                </Link>
              </td>
              <td>{team.wins}</td>
              <td className="hide-sm">{team.podiums}</td>
              <td className="hide-sm">{team.poles}</td>
              <td>
                <div className="points-cell">
                  <span>{team.points}</span>
                  <div className="points-bar">
                    <div
                      className="points-bar-fill"
                      style={{ width: `${(team.points / maxPoints) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConstructorTable;