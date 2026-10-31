import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import PageLoader from './Components/PageLoader/PageLoader';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import SearchShortcut from './Components/SearchShortcut/SearchShortcut';
import './styles/polish.css';

// Every page is downloaded only when it is opened for the first time (code splitting)
const Home = lazy(() => import('./Pages/Home/Home'));
const Drivers = lazy(() => import('./Pages/Drivers/Drivers'));
const DriverProfile = lazy(() => import('./Pages/DriverProfile/DriverProfile'));
const Teams = lazy(() => import('./Pages/Teams/Teams'));
const TeamDetail = lazy(() => import('./Pages/TeamDetail/TeamDetail'));
const Calendar = lazy(() => import('./Pages/Calendar/Calendar'));
const RaceWeekend = lazy(() => import('./Pages/RaceWeekend/RaceWeekend'));
const Standings = lazy(() => import('./Pages/Standings/Standings'));
const Circuits = lazy(() => import('./Pages/Circuits/Circuits'));
const CircuitDetail = lazy(() => import('./Pages/CircuitDetail/CircuitDetail'));
const Compare = lazy(() => import('./Pages/Compare/Compare'));
const LiveRace = lazy(() => import('./Pages/LiveRace/LiveRace'));
const Garage = lazy(() => import('./Pages/Garage/Garage'));
const Search = lazy(() => import('./Pages/Search/Search'));
const NotFound = lazy(() => import('./Pages/NotFound/NotFound'));

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <SearchShortcut />
      <Navbar />

      <main className="container">
        {/* The key changes with every page: a fresh wrapper plays the entrance
            animation again, and the error boundary starts clean */}
        <div key={location.pathname} className="page-transition">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/drivers/:driverId" element={<DriverProfile />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/teams/:teamId" element={<TeamDetail />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/calendar/:raceId" element={<RaceWeekend />} />
                <Route path="/standings" element={<Standings />} />
                <Route path="/circuits" element={<Circuits />} />
                <Route path="/circuits/:circuitId" element={<CircuitDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/live" element={<LiveRace />} />
                <Route path="/garage" element={<Garage />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
    </>
  );
}

export default App;