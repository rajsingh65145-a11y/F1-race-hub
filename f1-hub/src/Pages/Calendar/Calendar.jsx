import { useState } from 'react';
import FilterChips from '../../Components/FilterChips/FilterChips';
import RaceCard from '../../Components/RaceCard/RaceCard';
import { races } from '../../data/races';
import { drivers } from '../../data/drivers';
import '../../styles/calendar.css';
import '../../styles/cards.css';

const statusOptions = [
  { id: 'all', label: 'All' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

// These don't depend on state, so they are calculated once (outside the component)
const completedCount = races.filter((race) => race.status === 'completed').length;
const upcomingCount = races.filter((race) => race.status === 'upcoming').length;
const nextRace = races.find((race) => race.status === 'upcoming');

function Calendar() {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRaces = races.filter(
    (race) => statusFilter === 'all' || race.status === statusFilter
  );

  return (
    <div className="calendar-page">
      <header className="page-header">
        <h1 className="page-title">Race Calendar</h1>
        <p className="page-subtitle">
          {completedCount} completed · {upcomingCount} upcoming · 2026 season
        </p>
      </header>

      <FilterChips
        options={statusOptions}
        selected={statusFilter}
        onSelect={setStatusFilter}
      />

      <div className="calendar-grid">
        {filteredRaces.map((race) => {
          const winnerId = race.results ? race.results[0].driverId : null;
          const winner = drivers.find((driver) => driver.id === winnerId);

          return (
            <RaceCard
              key={race.id}
              race={race}
              winner={winner}
              isNext={nextRace && race.id === nextRace.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;