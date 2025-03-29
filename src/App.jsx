import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Learning from './pages/Learning';
import Navbar from './components/Navbar';
import Games from './pages/Games';
import ScamSpotter from './games/ScamSpotter';
import DailyMoneyManager from './games/DailyMoneyManager';
import Register from './pages/Register';
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <div className="relative">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/community" element={<Community />} />
          <Route path="/register" element={<Register />} />
          <Route path="/learning/games" element={<Games />} />
          <Route path="/learning/games/scamspotter" element={<ScamSpotter />} />
          <Route path="/learning/games/dailymoneymanager" element={<DailyMoneyManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
