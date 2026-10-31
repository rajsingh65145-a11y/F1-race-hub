import { useState } from 'react';
import EmptyState from '../../Components/EmptyState/EmptyState';
import CircuitCard from '../../Components/CircuitCard/CircuitCard';
import FilterChips from '../../Components/FilterChips/FilterChips';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { circuits } from '../../data/circuits';
import '../../styles/circuits.css';
import '../../styles/cards.css';

const sortOptions = [
  { id: 'calendar', label: 'Calendar order' },
  { id: 'length', label: 'Longest' },
  { id: 'corners', label: 'Most turns' },
];

function Circuits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('calendar');

  const filteredCircuits = circuits.filter((circuit) => {
    const searchableText =
      `${circuit.name} ${circuit.city} ${circuit.country}`.toLowerCase();

    return searchableText.includes(searchTerm.toLowerCase());
  });

  // Sort a copy, so the original array stays untouched
  const sortedCircuits = [...filteredCircuits];

  if (sortBy === 'length') {
    sortedCircuits.sort((a, b) => b.length - a.length);
  } else if (sortBy === 'corners') {
    sortedCircuits.sort((a, b) => b.corners - a.corners);
  }

  return (
    <div className="circuits-page">
      <header className="page-header">
        <h1 className="page-title">Circuits</h1>
        <p className="page-subtitle">
          {sortedCircuits.length} circuits · 2026 season
        </p>
      </header>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search circuits, cities or countries..."
      />

      <p className="sort-label">Sort by</p>
      <FilterChips
        options={sortOptions}
        selected={sortBy}
        onSelect={setSortBy}
      />

      {sortedCircuits.length === 0 ? (
  <EmptyState
    title="No circuits found"
    message="Try another circuit, city or country."
    actionLabel="Clear search"
    onAction={() => setSearchTerm('')}
  />
) : (
        <div className="circuits-grid">
          {sortedCircuits.map((circuit) => (
            <CircuitCard key={circuit.id} circuit={circuit} />
          ))}
        </div>
      )}

      <p className="card-note">
        Track layouts are simplified hand-drawn schematics, not to scale.
      </p>
    </div>
  );
}

export default Circuits;