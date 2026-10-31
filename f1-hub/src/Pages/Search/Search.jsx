import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar';
import EmptyState from '../../Components/EmptyState/EmptyState';
import { searchEntries } from '../../utils/searchIndex';
import '../../styles/search.css';
import '../../styles/controls.css';

const groups = [
  { type: 'driver', label: 'Drivers' },
  { type: 'team', label: 'Teams' },
  { type: 'race', label: 'Races' },
  { type: 'circuit', label: 'Circuits' },
];

const suggestions = ['hamilton', 'ferrari', 'monza', 'sprint', 'united states'];

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // replace: true, so typing does not add a Back-button entry for every letter
  function handleChange(value) {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  }

  const results = searchEntries(query);

  let content;

  if (query.trim() === '') {
    content = (
      <div>
        <p className="search-hint">Popular searches</p>
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <Link
              key={suggestion}
              to={`/search?q=${encodeURIComponent(suggestion)}`}
              className="chip"
            >
              {suggestion}
            </Link>
          ))}
        </div>
      </div>
    );
  }  else if (results.length === 0) {
  content = (
    <EmptyState
      icon="🔍"
      title={`No results for “${query}”`}
      message="Check the spelling, or try a driver, team, race or circuit name."
      actionLabel="Clear search"
      onAction={() => handleChange('')}
    />
  );
} else {
    content = (
      <div>
        <p className="search-summary">
          {results.length} {results.length === 1 ? 'result' : 'results'} for “
          {query}”
        </p>

        {groups.map((group) => {
          const items = results.filter((entry) => entry.type === group.type);

          if (items.length === 0) {
            return null;
          }

          return (
            <section className="search-group" key={group.type}>
              <h2 className="section-title">
                {group.label} ({items.length})
              </h2>

              <ul className="search-list">
                {items.map((entry) => (
                  <li key={entry.id}>
                    <Link to={entry.path} className="search-result">
                      <div>
                        <strong className="search-title">{entry.title}</strong>
                        <span className="search-subtitle">{entry.subtitle}</span>
                      </div>
                      <span className="search-arrow">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <div className="search-page">
      <header className="page-header">
        <h1 className="page-title">Search</h1>
        <p className="page-subtitle">
          Drivers, teams, races and circuits in one place
        </p>
      </header>

      <SearchBar
        id="search-input"
        value={query}
        onChange={handleChange}
        placeholder='Try "ferrari", "norris" or "united states"'
        autoFocus
      />

      <p className="search-hint">
        Tip: press <kbd>/</kbd> on any page to jump here
      </p>

      {content}
    </div>
  );
}

export default Search;