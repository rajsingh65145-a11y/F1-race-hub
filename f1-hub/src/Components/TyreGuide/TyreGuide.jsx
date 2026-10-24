import TyreBadge from '../TyreBadge/TyreBadge';
import { tyreCompounds } from '../../data/tyres';
import '../../styles/tyres.css';

// Five small bars, the first "value" of them are filled
function Meter({ label, value, color }) {
  return (
    <div className="meter">
      <span className="meter-label">{label}</span>
      <div className="meter-dots">
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            className="meter-dot"
            style={step <= value ? { backgroundColor: color } : undefined}
          ></span>
        ))}
      </div>
    </div>
  );
}

function TyreGuide() {
  return (
    <div className="tyre-guide">
      {tyreCompounds.map((compound) => (
        <div className="tyre-card" key={compound.id}>
          <div className="tyre-card-top">
            <TyreBadge compound={compound} />
            <div>
              <h3 className="tyre-name">{compound.name}</h3>
              <span className="tyre-type">
                {compound.type === 'dry' ? 'Dry weather' : 'Wet weather'}
              </span>
            </div>
          </div>

          <p className="tyre-description">{compound.description}</p>

          <Meter label="Grip" value={compound.grip} color={compound.color} />
          <Meter
            label="Durability"
            value={compound.durability}
            color={compound.color}
          />
        </div>
      ))}
    </div>
  );
}

export default TyreGuide;