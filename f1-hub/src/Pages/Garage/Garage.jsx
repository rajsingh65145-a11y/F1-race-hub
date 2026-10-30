import CircuitCard from '../../Components/CircuitCard/CircuitCard';
import DriverCard from '../../Components/DriverCard/DriverCard';
import GarageSelect from '../../Components/GarageSelect/GarageSelect';
import TeamCard from '../../components/TeamCard/TeamCard';
import { circuits } from '../../data/circuits';
import { standings } from '../../data/drivers';
import { constructorStandings } from '../../data/teams';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import '../../styles/garage.css';
import '../../styles/cards.css';
import '../../styles/circuits.css';

// These don't change, so they are built once (outside the component)
const driverOptions = standings.map((driver) => ({
  id: driver.id,
  label: `${driver.name} · ${driver.team}`,
}));

const teamOptions = constructorStandings.map((team) => ({
  id: team.id,
  label: team.name,
}));

const circuitOptions = circuits.map((circuit) => ({
  id: circuit.id,
  label: `${circuit.name} · ${circuit.country}`,
}));

function Garage() {
  const [driverId, setDriverId] = useLocalStorage('f1hub:favouriteDriver', null);
  const [teamId, setTeamId] = useLocalStorage('f1hub:favouriteTeam', null);
  const [circuitId, setCircuitId] = useLocalStorage('f1hub:favouriteCircuit', null);

  // The saved id might not match anything (old or edited data), then it counts as "no favourite"
  const driver = standings.find((d) => d.id === driverId);
  const teamIndex = constructorStandings.findIndex((t) => t.id === teamId);
  const team = teamIndex >= 0 ? constructorStandings[teamIndex] : null;
  const circuit = circuits.find((c) => c.id === circuitId);

  function handleClear() {
    setDriverId(null);
    setTeamId(null);
    setCircuitId(null);
  }

  return (
    <div className="garage-page">
      <header className="page-header">
        <h1 className="page-title">My Garage</h1>
        <p className="page-subtitle">
          Pick your favourites. They are saved in this browser, so they are
          still here after a refresh.
        </p>
      </header>

      <div className="garage-grid">
        <section className="garage-slot">
          <GarageSelect
            label="Favourite driver"
            value={driver ? driver.id : ''}
            options={driverOptions}
            onChange={setDriverId}
            emptyLabel="No favourite driver"
          />

          {driver ? (
            <DriverCard driver={driver} position={standings.indexOf(driver) + 1} />
          ) : (
            <div className="garage-empty">Pick a driver above to see them here.</div>
          )}
        </section>

        <section className="garage-slot">
          <GarageSelect
            label="Favourite team"
            value={team ? team.id : ''}
            options={teamOptions}
            onChange={setTeamId}
            emptyLabel="No favourite team"
          />

          {team ? (
            <TeamCard team={team} position={teamIndex + 1} />
          ) : (
            <div className="garage-empty">Pick a team above to see it here.</div>
          )}
        </section>

        <section className="garage-slot">
          <GarageSelect
            label="Favourite circuit"
            value={circuit ? circuit.id : ''}
            options={circuitOptions}
            onChange={setCircuitId}
            emptyLabel="No favourite circuit"
          />

          {circuit ? (
            <CircuitCard circuit={circuit} />
          ) : (
            <div className="garage-empty">Pick a circuit above to see it here.</div>
          )}
        </section>
      </div>

      <button
        className="garage-clear"
        onClick={handleClear}
        disabled={!driver && !team && !circuit}
      >
        Clear my garage
      </button>
    </div>
  );
}

export default Garage;