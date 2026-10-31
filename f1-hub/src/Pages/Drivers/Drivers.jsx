import { useState } from 'react';
import DriverCard from '../../Components/DriverCard/DriverCard';
import SearchBar from '../../Components/SearchBar/SearchBar';
import StandingsTable from '../../Components/StandingsTable/StandingsTable';
import EmptyState from '../../Components/EmptyState/EmptyState';
import { drivers, standings } from '../../data/drivers';
import '../../styles/drivers.css';
import '../../styles/cards.css';

// Doesn't depend on state, so it is calculated once (outside the component)
const teams = ['All', ...new Set(drivers.map((driver) => driver.team))];

const views = [
  { id: 'cards', label: 'Cards' },
  { id: 'standings', label: 'Standings' },
];

function Drivers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [view, setView] = useState('cards');

  const filteredDrivers = standings.filter((driver) => {
    const matchesSearch = driver.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'All' || driver.team === selectedTeam;

    return matchesSearch && matchesTeam;
  });

  let content;


  if (filteredDrivers.length === 0) {
  content = (
    <EmptyState
      title="No drivers found"
      message="Try a different name, or choose another team."
      actionLabel="Clear filters"
      onAction={() => {
        setSearchTerm('');
        setSelectedTeam('All');
      }}
    />
  );
}
  else if (view === 'cards') {
    content = (
      <div className="drivers-grid">
        {filteredDrivers.map((driver) => (
          <DriverCard
            key={driver.id}
            driver={driver}
            position={standings.indexOf(driver) + 1}
          />
        ))}
      </div>
    );
  } else {
    content = (
      <StandingsTable drivers={filteredDrivers} standings={standings} />
    );
  }

  return (
    <div className="drivers-page">
      <header className="page-header">
        <h1 className="page-title">Drivers</h1>
        <p className="page-subtitle">
          {filteredDrivers.length} drivers · 2026 season
        </p>
      </header>

      <div className="drivers-toolbar">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search drivers..."
        />

        <div className="view-toggle">
          {views.map((item) => (
            <button
              key={item.id}
              className={`toggle-btn ${view === item.id ? 'toggle-btn-active' : ''}`}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-chips">
        {teams.map((team) => (
          <button
            key={team}
            className={`chip ${selectedTeam === team ? 'chip-active' : ''}`}
            onClick={() => setSelectedTeam(team)}
          >
            {team}
          </button>
        ))}
      </div>

      {content}
    </div>
  );
}

export default Drivers;