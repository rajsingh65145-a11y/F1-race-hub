import { Routes, Route } from 'react-router-dom';
import Standings from './Pages/Standings/Standings';
import Compare from './Pages/Compare/Compare';
import CircuitDetail from './pages/CircuitDetail/CircuitDetail';
import Navbar from './Components/Navbar/Navbar';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import Search from './Pages/Search/Search';
import SearchShortcut from './Components/SearchShortcut/SearchShortcut';
import Circuits from './Pages/Circuits/Circuits';
import Drivers from './Pages/Drivers/Drivers';
import DriverProfile from './Pages/DriverProfile/DriverProfile';
import Garage from './Pages/Garage/Garage';
import ComingSoon from './pages/ComingSoon/ComingSoon';
import LiveRace from './Pages/LiveRace/LiveRace';
import Teams from './Pages/Teams/Teams';
import TeamDetail from './Pages/TeamDetail/TeamDetail';
import Calendar from './Pages/Calendar/Calendar';
import RaceWeekend from './Pages/RaceWeekend/RaceWeekend';

function App() {
  return (
    <>
      <ScrollToTop />
      <SearchShortcut />
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/garage" element={<Garage />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/live" element={<LiveRace />} />
          <Route path="/circuits" element={<Circuits />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/circuits/:circuitId" element={<CircuitDetail />} />
          <Route path="/calendar/:raceId" element={<RaceWeekend />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/teams/:teamId" element={<TeamDetail />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers/:driverId" element={<DriverProfile />} />
          <Route path="/teams" element={<ComingSoon title="Teams" />} />
          <Route path="/calendar" element={<ComingSoon title="Race Calendar" />} />
          <Route path="/standings" element={<ComingSoon title="Championship Standings" />} />
          <Route path="/circuits" element={<ComingSoon title="Circuit Explorer" />} />
          <Route path="/compare" element={<ComingSoon title="Driver Comparison" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;