import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Learning from "./pages/Learning";
import Navbar from "./components/Navbar";
import Games from "./pages/Games";
import ScamSpotter from "./games/ScamSpotter";
import DailyMoneyManager from "./games/DailyMoneyManager";
import Register from "./pages/Register";
import Register2 from "./pages/Register2";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="relative">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register2" element={<Register2 />} />
          <Route path="/register3" element={<Register3 />} />

          <Route path="/learning/games" element={<Games />} />
          <Route path="/learning/games/scamspotter" element={<ScamSpotter />} />
          <Route
            path="/learning/games/dailymoneymanager"
            element={<DailyMoneyManager />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
