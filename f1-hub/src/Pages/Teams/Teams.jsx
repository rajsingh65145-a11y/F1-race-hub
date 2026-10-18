import ConstructorTable from '../../Components/ConstructorTable/ConstructorTable';
import TeamCard from '../../Components/TeamCard/TeamCard';
import { constructorStandings } from '../../data/teams';
import '../../styles/teams.css';
import '../../styles/cards.css';

function Teams() {
  return (
    <div className="teams-page">
      <header className="page-header">
        <h1 className="page-title">Teams</h1>
        <p className="page-subtitle">
          {constructorStandings.length} constructors · 2026 season
        </p>
      </header>

      <section>
        <h2 className="section-title">Constructor standings</h2>
        <ConstructorTable teams={constructorStandings} />
      </section>

      <section className="teams-section">
        <h2 className="section-title">Team profiles</h2>
        <div className="teams-grid">
          {constructorStandings.map((team, index) => (
            <TeamCard key={team.id} team={team} position={index + 1} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Teams;