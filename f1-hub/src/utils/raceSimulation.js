import { standings } from '../data/drivers';

const BASE_LAP_TIME = 96; // seconds, a typical race lap
const PIT_LOSS = 22; // seconds lost by driving through the pit lane

// How each tyre changes the lap time:
// "offset" = speed difference, "wear" = extra seconds for every lap the tyre has done
const tyreModel = {
  soft: { offset: -0.7, wear: 0.07 },
  medium: { offset: 0, wear: 0.045 },
  hard: { offset: 0.5, wear: 0.03 },
  intermediate: { offset: 3, wear: 0.05 },
  wet: { offset: 6, wear: 0.04 },
};

function sumStintLaps(stints) {
  return stints.reduce((total, stint) => total + stint.laps, 0);
}

// Builds the race at lap 0, from a race that has qualifying + strategies + results
export function createInitialRace(raceData) {
  const totalLaps = Math.max(
    ...raceData.strategies.map((strategy) => sumStintLaps(strategy.stints))
  );

  const cars = raceData.qualifying.map((row) => {
    const strategy = raceData.strategies.find((s) => s.driverId === row.driverId);
    const result = raceData.results.find((r) => r.driverId === row.driverId);
    const stints = strategy ? strategy.stints : [];
    const rank = standings.findIndex((driver) => driver.id === row.driverId);

    return {
      driverId: row.driverId,
      grid: row.position,
      pace: Math.max(rank, 0) * 0.05,
      stints: stints,
      stintIndex: 0,
      tyre: stints.length > 0 ? stints[0].compound : 'medium',
      tyreAge: 0,
      stops: 0,
      justPitted: false,
      totalTime: (row.position - 1) * 0.35,
      lastLap: null,
      retiresAfterLap:
        result && result.time === 'DNF' ? sumStintLaps(stints) : null,
      retired: false,
      retiredLap: null,
    };
  });

  return { lap: 0, totalLaps, cars, events: [], fastestLap: null };
}

// Puts the cars in race order and works out the gaps. Everything comes from totalTime.
export function getClassification(cars) {
  const running = cars
    .filter((car) => !car.retired)
    .sort((a, b) => a.totalTime - b.totalTime);

  const retired = cars
    .filter((car) => car.retired)
    .sort((a, b) => b.retiredLap - a.retiredLap);

  const leaderTime = running.length > 0 ? running[0].totalTime : 0;

  const runningRows = running.map((car, index) => ({
    ...car,
    position: index + 1,
    gapToLeader: car.totalTime - leaderTime,
    interval: index === 0 ? 0 : car.totalTime - running[index - 1].totalTime,
  }));

  const retiredRows = retired.map((car, index) => ({
    ...car,
    position: running.length + index + 1,
    gapToLeader: null,
    interval: null,
  }));

  return [...runningRows, ...retiredRows];
}

function getLeaderId(cars) {
  return getClassification(cars)[0].driverId;
}

// Plays ONE lap for every car and returns a NEW race object.
// The old one is never changed (React state must not be mutated).
export function simulateLap(race) {
  if (race.lap >= race.totalLaps) {
    return race;
  }

  const nextLap = race.lap + 1;

  // Created and returned inside this function only, so the function stays "pure"
  const newEvents = [];

  if (nextLap === 1) {
    newEvents.push({ lap: nextLap, type: 'start', driverId: null, detail: null });
  }

  const cars = race.cars.map((car) => {
    if (car.retired) {
      return car;
    }

    const tyre = tyreModel[car.tyre] || tyreModel.medium;
    const stint = car.stints[car.stintIndex];
    const hasNextStint = car.stintIndex < car.stints.length - 1;
    const isPitLap =
      Boolean(stint) && hasNextStint && car.tyreAge + 1 === stint.laps;

    const noise = (Math.random() - 0.5) * 0.8;
    let lapTime =
      BASE_LAP_TIME + car.pace + tyre.offset + car.tyreAge * tyre.wear + noise;

    if (isPitLap) {
      lapTime += PIT_LOSS;
    }

    const retiresNow =
      car.retiresAfterLap !== null && nextLap >= car.retiresAfterLap;

    if (isPitLap) {
      newEvents.push({
        lap: nextLap,
        type: 'pit',
        driverId: car.driverId,
        detail: car.stints[car.stintIndex + 1].compound,
      });
    }

    if (retiresNow) {
      newEvents.push({
        lap: nextLap,
        type: 'retire',
        driverId: car.driverId,
        detail: null,
      });
    }

    return {
      ...car,
      totalTime: car.totalTime + lapTime,
      lastLap: lapTime,
      tyreAge: isPitLap ? 0 : car.tyreAge + 1,
      tyre: isPitLap ? car.stints[car.stintIndex + 1].compound : car.tyre,
      stintIndex: isPitLap ? car.stintIndex + 1 : car.stintIndex,
      stops: isPitLap ? car.stops + 1 : car.stops,
      justPitted: isPitLap,
      retired: retiresNow,
      retiredLap: retiresNow ? nextLap : null,
    };
  });

  // Fastest lap: keep the quickest lap time seen so far
  let fastestLap = race.fastestLap;

  cars.forEach((car) => {
    if (
      car.lastLap !== null &&
      (fastestLap === null || car.lastLap < fastestLap.time)
    ) {
      fastestLap = { driverId: car.driverId, time: car.lastLap, lap: nextLap };
    }
  });

  // Don't announce records in the first laps, every first lap is a "record"
  if (fastestLap !== race.fastestLap && nextLap >= 5) {
    newEvents.push({
      lap: nextLap,
      type: 'fastest',
      driverId: fastestLap.driverId,
      detail: fastestLap.time,
    });
  }

  // Lead change: compare the leader before and after this lap
  const leaderBefore = getLeaderId(race.cars);
  const leaderAfter = getLeaderId(cars);

  if (leaderBefore !== leaderAfter) {
    newEvents.push({
      lap: nextLap,
      type: 'lead',
      driverId: leaderAfter,
      detail: null,
    });
  }

  if (nextLap === race.totalLaps) {
    newEvents.push({
      lap: nextLap,
      type: 'finish',
      driverId: leaderAfter,
      detail: null,
    });
  }

  return {
    ...race,
    lap: nextLap,
    cars,
    fastestLap,
    events: [...race.events, ...newEvents],
  };
}