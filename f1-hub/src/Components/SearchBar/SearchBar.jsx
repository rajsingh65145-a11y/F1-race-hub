function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      className="search-bar"
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
    />
  );
}

export default SearchBar;