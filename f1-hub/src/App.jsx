import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import ComingSoon from './Pages/Comingsoon/Comingsoon';

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<ComingSoon title="Drivers" />} />
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