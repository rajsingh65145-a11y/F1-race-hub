
import '../../styles/controls.css';
function SearchBar({ value, onChange, placeholder, id, autoFocus }) {
  return (
    <input
      id={id}
      className="search-bar"
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      autoFocus={autoFocus}
    />
  );
}

export default SearchBar;