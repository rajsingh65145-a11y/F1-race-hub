import { useState, useEffect } from 'react';
import FilterChips from '../../Components/FilterChips/FilterChips';
import LiveLeaderboard from '../../Components/LiveLeaderboard/LiveLeaderboard';
import RaceControls from '../../Components/RaceControls/RaceControls';
import RaceEventFeed from '../../Components/RaceEventFeed/RaceEventFeed';
import RecentResult from '../../Components/RecentResult/RecentResult';
import StatCard from '../../Components/StatCard/StatCard';
import { races } from '../../data/races';
import { drivers } from '../../data/drivers';
import {
  createInitialRace,
  simulateLap,
  getClassification,
} from '../../utils/raceSimulation';
import { formatGap, formatLapTime, formatRaceTime } from '../../utils/lapTimes';
import { getLastName } from '../../utils/names';
import '../../styles/live.css';
import '../../styles/cards.css';

const TICK_MS = 1000; // one lap every second at 1x speed

const speedOptions = [
  { id: 1, label: '1x' },
  { id: 2, label: '2x' },
  { id: 5, label: '5x' },
];

// The simulation needs grid, tyre strategies and results of the same race
const simulationRace = races.find(
  (race) => race.qualifying && race.strategies && race.results
);

function RaceSimulator({ raceData }) {
  const [race, setRace] = useState(() => createInitialRace(raceData));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);

  const isFinished = race.lap >= race.totalLaps;

  useEffect(() => {
    if (!isRunning || isFinished) {
      return undefined;
    }

    const timer = setInterval(() => {
      setRace((previousRace) => simulateLap(previousRace));
    }, TICK_MS / speed);

    return () => clearInterval(timer);
  }, [isRunning, isFinished, speed]);

  function handleToggle() {
    setIsRunning((previous) => !previous);
  }

  function handleReset() {
    setIsRunning(false);
    setRace(createInitialRace(raceData));
  }

  const classification = getClassification(race.cars);

  const fastestDriver = race.fastestLap
    ? drivers.find((d) => d.id === race.fastestLap.driverId)
    : null;

  const totalStops = race.cars.reduce((total, car) => total + car.stops, 0);
  const retiredCount = race.cars.filter((car) => car.retired).length;

  // The same shape as a real race result, so RecentResult can show it
  const simulatedResult = {
    round: raceData.round,
    name: raceData.name,
    results: classification.slice(0, 3).map((car) => ({
      position: car.position,
      driverId: car.driverId,
      time:
        car.position === 1
          ? formatRaceTime(car.totalTime)
          : formatGap(car.gapToLeader),
    })),
  };

  return (
    <div className="live-page">
      <header className="page-header">
        <h1 className="page-title">Live Race</h1>
        <p className="page-subtitle">
          {raceData.name} · simulation, not real data
        </p>
      </header>

      <RaceControls
        lap={race.lap}
        totalLaps={race.totalLaps}
        isRunning={isRunning}
        onToggle={handleToggle}
        onReset={handleReset}
      />

      <div className="speed-row">
        <span className="speed-label">Speed</span>
        <FilterChips
          options={speedOptions}
          selected={speed}
          onSelect={setSpeed}
        />
      </div>

      <div className="live-layout">
        <div className="live-main">
          {isFinished && (
            <section className="live-result">
              <RecentResult
                race={simulatedResult}
                drivers={drivers}
                eyebrow="Simulated Result"
              />
            </section>
          )}

          <LiveLeaderboard rows={classification} drivers={drivers} />
        </div>

        <aside className="live-side">
          <StatCard
            label="Fastest Lap"
            value={race.fastestLap ? formatLapTime(race.fastestLap.time) : '—'}
            detail={
              fastestDriver
                ? `${getLastName(fastestDriver.name)} · Lap ${race.fastestLap.lap}`
                : 'No lap set yet'
            }
          />
          <StatCard
            label="Pit Stops"
            value={totalStops}
            detail={`${retiredCount} retired`}
          />

          <div>
            <h2 className="section-title">Race feed</h2>
            <RaceEventFeed events={race.events} drivers={drivers} />
          </div>
        </aside>
      </div>

      <p className="card-note">
        Lap times are random. The starting grid and pit stops come from the
        Singapore GP demo data, so every run ends differently.
      </p>
    </div>
  );
}

function LiveRace() {
  if (!simulationRace) {
    return (
      <p className="empty-message">
        No race with full data (qualifying, tyres, results) is available.
      </p>
    );
  }

  return <RaceSimulator raceData={simulationRace} />;
}

export default LiveRace;