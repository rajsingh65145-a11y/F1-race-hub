import HeroRace from '../../Components/HeroRace/HeroRace';
import StatCard from '../../Components/StatCard/StatCard';
import ChampionshipLeader from '../../Components/ChampionshipLeader/ChampionshipLeader';
import NextRaceCard from '../../Components/NextRaceCard/NextRaceCard';
import RecentResult from '../../Components/RecentResult/RecentResult';
import { races, season } from '../../data/races';
import { drivers } from '../../data/drivers';
import '../../styles/dashboard.css';
import '../../styles/cards.css';

function Home() {
  // Races
  const nextRace = races.find((race) => race.status === 'upcoming');
  const completedRaces = races.filter((race) => race.status === 'completed');
  const recentRace = completedRaces[completedRaces.length - 1];

  if (!nextRace || !recentRace) {
    return <p className="home">Season data not available.</p>;
  }

  // Standings (sort a copy, so the original array stays untouched)
  const standings = [...drivers].sort((a, b) => b.points - a.points);
  const leader = standings[0];
  const chasers = standings.slice(1, 3);
  const gap = leader.points - standings[1].points;

  // Quick stats
  const winnersCount = drivers.filter((driver) => driver.wins > 0).length;

  const poleLeader = drivers.reduce((best, driver) => {
    return driver.poles > best.poles ? driver : best;
  }, drivers[0]);

  const stats = [
    {
      label: 'Rounds Completed',
      value: `${recentRace.round} / ${season.totalRounds}`,
      progress: (recentRace.round / season.totalRounds) * 100,
    },
    { label: 'Race Winners', value: winnersCount, detail: 'different drivers this season' },
    { label: 'Most Poles', value: poleLeader.poles, detail: poleLeader.name },
    { label: 'Title Gap', value: `+${gap}`, detail: 'points between P1 and P2' },
  ];

  return (
    <div className="home">
      <HeroRace race={nextRace} />

      <section className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            detail={stat.detail}
            progress={stat.progress}
          />
        ))}
      </section>

      <section className="dashboard-grid">
        <ChampionshipLeader leader={leader} chasers={chasers} />
        <NextRaceCard race={nextRace} />
        <RecentResult race={recentRace} drivers={drivers} />
      </section>

      <p className="data-note">
        Demo project: standings and results are sample data, not official F1 results.
      </p>
    </div>
  );
}

export default Home;