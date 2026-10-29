
import { useLocalStorage } from '../../hooks/useLocalStorage';
import ComparisonBar from '../../Components/ComparisonBar/ComparisonBar';
import DriverAvatar from '../../Components/DriverAvatar/DriverAvatar';
import DriverSelect from '../../Components/DriverSelect/DriverSelect';
import { standings } from '../../data/drivers';
import { getLastName } from '../../utils/names';
import '../../styles/compare.css';

// Each object describes one row of the comparison
const statRows = [
  { key: 'points', label: 'Points', higherIsBetter: true, prefix: '' },
  { key: 'wins', label: 'Wins', higherIsBetter: true, prefix: '' },
  { key: 'podiums', label: 'Podiums', higherIsBetter: true, prefix: '' },
  { key: 'poles', label: 'Poles', higherIsBetter: true, prefix: '' },
  { key: 'bestFinish', label: 'Best Finish', higherIsBetter: false, prefix: 'P' },
];

// Works out the bar widths (in %) and who wins one stat
function compareStat(valueA, valueB, higherIsBetter) {
  let widthA = 0;
  let widthB = 0;
  let winner = 'tie';

  if (higherIsBetter) {
    const max = Math.max(valueA, valueB);

    // If both are 0, dividing by max would give NaN, so keep the bars empty
    if (max > 0) {
      widthA = (valueA / max) * 100;
      widthB = (valueB / max) * 100;
    }

    if (valueA > valueB) {
      winner = 'a';
    } else if (valueB > valueA) {
      winner = 'b';
    }
  } else {
    // Lower is better (P1 beats P4), so the maths is the other way round
    const min = Math.min(valueA, valueB);
    widthA = (min / valueA) * 100;
    widthB = (min / valueB) * 100;

    if (valueA < valueB) {
      winner = 'a';
    } else if (valueB < valueA) {
      winner = 'b';
    }
  }

  return { widthA, widthB, winner };
}

// A small component used only on this page
function MatchupSide({ driver, align }) {
  return (
    <div className={`matchup-side matchup-side-${align}`}>
      <DriverAvatar name={driver.name} size="lg" />
      <div>
        <h2 className="matchup-name">{getLastName(driver.name)}</h2>
        <p className="card-muted">
          {driver.team} · #{driver.number}
        </p>
      </div>
    </div>
  );
}

function Compare() {
  const [savedAId, setDriverAId] = useLocalStorage('f1hub:compareA', standings[0].id);
const [savedBId, setDriverBId] = useLocalStorage('f1hub:compareB', standings[1].id);

// If a saved id is not a real driver any more, fall back to the default
const driverAId = standings.some((d) => d.id === savedAId)
  ? savedAId
  : standings[0].id;
const driverBId = standings.some((d) => d.id === savedBId)
  ? savedBId
  : standings[1].id;

  const driverA = standings.find((d) => d.id === driverAId);
  const driverB = standings.find((d) => d.id === driverBId);

  // A driver can't be compared with himself, so each list hides the other's pick
  const optionsA = standings.filter((d) => d.id !== driverBId);
  const optionsB = standings.filter((d) => d.id !== driverAId);

  const rows = statRows.map((stat) => {
    const valueA = driverA[stat.key];
    const valueB = driverB[stat.key];

    return {
      stat,
      valueA,
      valueB,
      ...compareStat(valueA, valueB, stat.higherIsBetter),
    };
  });

  const winsA = rows.filter((row) => row.winner === 'a').length;
  const winsB = rows.filter((row) => row.winner === 'b').length;

  let verdict = 'All square';

  if (winsA > winsB) {
    verdict = `${getLastName(driverA.name)} leads ${winsA}–${winsB}`;
  } else if (winsB > winsA) {
    verdict = `${getLastName(driverB.name)} leads ${winsB}–${winsA}`;
  }

  function handleSwap() {
    setDriverAId(driverBId);
    setDriverBId(driverAId);
  }

  return (
    <div className="compare-page">
      <header className="page-header">
        <h1 className="page-title">Compare</h1>
        <p className="page-subtitle">
          Pick two drivers and see who has the edge · 2026 season
        </p>
      </header>

      <div className="compare-selects">
        <DriverSelect
          label="Driver A"
          value={driverAId}
          options={optionsA}
          onChange={setDriverAId}
        />

        <button className="swap-btn" onClick={handleSwap} aria-label="Swap drivers">
          ⇄
        </button>

        <DriverSelect
          label="Driver B"
          value={driverBId}
          options={optionsB}
          onChange={setDriverBId}
        />
      </div>

      <section className="matchup">
        <MatchupSide driver={driverA} align="left" />
        <span className="matchup-vs">VS</span>
        <MatchupSide driver={driverB} align="right" />
      </section>

      <div className="verdict">
        <strong>{verdict}</strong>
        <span>categories won · ties not counted</span>
      </div>

      <section className="compare-panel">
        {rows.map((row) => (
          <ComparisonBar
            key={row.stat.key}
            label={row.stat.label}
            displayA={`${row.stat.prefix}${row.valueA}`}
            displayB={`${row.stat.prefix}${row.valueB}`}
            widthA={row.widthA}
            widthB={row.widthB}
            winner={row.winner}
          />
        ))}
      </section>
    </div>
  );
}

export default Compare;