import { useState } from 'react';
import ConstructorTable from '../../Components/ConstructorTable/ConstructorTable';
import FilterChips from '../../Components/FilterChips/FilterChips';
import StandingsTable from '../../Components/StandingsTable/StandingsTable';
import TitleBattle from '../../Components/TitleBattle/TitleBattle';
import { standings } from '../../data/drivers';
import { constructorStandings } from '../../data/teams';
import { races, season } from '../../data/races';
import '../../styles/battle.css';

const tabOptions = [
  { id: 'drivers', label: 'Drivers' },
  { id: 'constructors', label: 'Constructors' },
  { id: 'battle', label: 'Title battle' },
];

const completedRaces = races.filter((race) => race.status === 'completed');
const lastRound =
  completedRaces.length > 0
    ? completedRaces[completedRaces.length - 1].round
    : 0;

function Standings() {
  const [activeTab, setActiveTab] = useState('drivers');

  return (
    <div className="standings-page">
      <header className="page-header">
        <h1 className="page-title">Championship</h1>
        <p className="page-subtitle">
          After round {lastRound} of {season.totalRounds} · 2026 season
        </p>
      </header>

      <FilterChips
        options={tabOptions}
        selected={activeTab}
        onSelect={setActiveTab}
      />

      {activeTab === 'drivers' && (
        <StandingsTable drivers={standings} standings={standings} />
      )}
      {activeTab === 'constructors' && (
        <ConstructorTable teams={constructorStandings} />
      )}
      {activeTab === 'battle' && <TitleBattle />}
    </div>
  );
}

export default Standings;