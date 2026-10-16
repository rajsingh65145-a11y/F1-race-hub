import HeroRace from '../../Components/HeroRace/HeroRace';
import { races } from '../../data/races';
import '../../styles/dashboard.css';

function Home() {
  const nextRace = races.find((race) => race.status === 'upcoming');

  if (!nextRace) {
    return <p className="home">Season complete — no upcoming races.</p>;
  }

  return (
    <div className="home">
      <HeroRace race={nextRace} />
    </div>
  );
}

export default Home;