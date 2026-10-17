import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import Drivers from './Pages/Drivers/Drivers';
import DriverProfile from './Pages/DriverProfile/DriverProfile';
import ComingSoon from './pages/ComingSoon/ComingSoon';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
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