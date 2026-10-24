import '../../styles/compare.css';

function DriverSelect({ label, value, options, onChange }) {
  return (
    <label className="driver-select">
      <span className="driver-select-label">{label}</span>

      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((driver) => (
          <option key={driver.id} value={driver.id}>
            {`${driver.name} · ${driver.team}`}
          </option>
        ))}
      </select>
    </label>
  );
}

export default DriverSelect;