import '../../styles/controls.css';

function FilterChips({ options, selected, onSelect }) {
  return (
    <div className="filter-chips">
      {options.map((option) => (
        <button
          key={option.id}
          className={`chip ${selected === option.id ? 'chip-active' : ''}`}
          onClick={() => onSelect(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default FilterChips;