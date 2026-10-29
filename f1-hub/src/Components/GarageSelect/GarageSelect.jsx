import '../../styles/compare.css';

function GarageSelect({ label, value, options, onChange, emptyLabel }) {
  return (
    <label className="driver-select">
      <span className="driver-select-label">{label}</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value || null)}
      >
        <option value="">{emptyLabel}</option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default GarageSelect;