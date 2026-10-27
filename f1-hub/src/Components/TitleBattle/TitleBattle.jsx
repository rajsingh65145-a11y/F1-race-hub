import { useState } from 'react';
import DriverSelect from '../DriverSelect/DriverSelect';
import GapBars from '../GapBars/GapBars';
import ProgressionChart from '../ProgressionChart/ProgressionChart';
import StatCard from '../StatCard/StatCard';
import { standings } from '../../data/drivers';
import { progression } from '../../data/progression';
import { races } from '../../data/races';
import { getLastName } from '../../utils/names';
import '../../styles/battle.css';

// Only drivers that have progression data can be picked, in championship order
const contenders = standings.filter((driver) =>
  progression.some((row) => row.driverId === driver.id)
);

function TitleBattle() {
  const [idA, setIdA] = useState(contenders[0].id);
  const [idB, setIdB] = useState(contenders[1].id);

  const driverA = contenders.find((d) => d.id === idA);
  const driverB = contenders.find((d) => d.id === idB);
  const seriesA = progression.find((row) => row.driverId === idA);
  const seriesB = progression.find((row) => row.driverId === idB);

  // Nobody can battle against himself, so each list hides the other's pick
  const optionsA = contenders.filter((d) => d.id !== idB);
  const optionsB = contenders.filter((d) => d.id !== idA);

  const nameA = getLastName(driverA.name);
  const nameB = getLastName(driverB.name);

  // "Round 5 · Canadian Grand Prix", used in the tooltips
  const roundLabels = seriesA.cumulative.map((_, index) => {
    const race = races.find((r) => r.round === index + 1);
    return race ? `Round ${index + 1} · ${race.name}` : `Round ${index + 1}`;
  });

  // Gap after every round: positive = A ahead, negative = B ahead
  const gaps = seriesA.cumulative.map(
    (points, index) => points - seriesB.cumulative[index]
  );
  const currentGap = gaps[gaps.length - 1];
  const roundsLedA = gaps.filter((gap) => gap > 0).length;
  const roundsLedB = gaps.filter((gap) => gap < 0).length;

  // Count how many times the lead changed hands (a tie does not count as a lead)
  let leadChanges = 0;
  let previousLeader = 0; // 1 = A, -1 = B, 0 = nobody yet

  gaps.forEach((gap) => {
    const leader = Math.sign(gap);

    if (leader !== 0 && previousLeader !== 0 && leader !== previousLeader) {
      leadChanges += 1;
    }

    if (leader !== 0) {
      previousLeader = leader;
    }
  });

  let gapDetail = 'Level on points';
  if (currentGap > 0) {
    gapDetail = `${nameA} ahead`;
  } else if (currentGap < 0) {
    gapDetail = `${nameB} ahead`;
  }

  return (
    <div>
      <div className="battle-selects">
        <DriverSelect
          label="Driver A"
          value={idA}
          options={optionsA}
          onChange={setIdA}
        />
        <DriverSelect
          label="Driver B"
          value={idB}
          options={optionsB}
          onChange={setIdB}
        />
      </div>

      <div className="battle-stats">
        <StatCard
          label={`Gap after round ${gaps.length}`}
          value={`${currentGap > 0 ? '+' : ''}${currentGap}`}
          detail={gapDetail}
        />
        <StatCard
          label="Rounds led"
          value={`${roundsLedA}–${roundsLedB}`}
          detail={`${nameA} – ${nameB}`}
        />
        <StatCard
          label="Lead changes"
          value={leadChanges}
          detail="between the two"
        />
      </div>

      <section className="battle-panel">
        <h2 className="battle-panel-title">Points progression</h2>

        <div className="chart-legend">
          <span className="chart-legend-item">
            <span className="legend-swatch legend-swatch-a"></span>
            {nameA}
          </span>
          <span className="chart-legend-item">
            <span className="legend-swatch legend-swatch-b"></span>
            {nameB}
          </span>
          <span className="chart-legend-item">
            <span className="legend-swatch legend-swatch-dim"></span>
            Other contenders
          </span>
        </div>

        <ProgressionChart
          series={progression}
          idA={idA}
          idB={idB}
          nameA={nameA}
          nameB={nameB}
          roundLabels={roundLabels}
        />
      </section>

      <section className="battle-panel">
        <h2 className="battle-panel-title">Gap after each round</h2>
        <p className="battle-panel-note">
          Above the line: {nameA} ahead · Below the line: {nameB} ahead
        </p>

        <GapBars
          gaps={gaps}
          nameA={nameA}
          nameB={nameB}
          roundLabels={roundLabels}
        />
      </section>

      <p className="card-note">
        Points per round are sample data and add up to the totals in the
        Drivers page.
      </p>
    </div>
  );
}

export default TitleBattle;