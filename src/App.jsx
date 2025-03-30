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
import Register3 from "./pages/Register3";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Expenses from "./pages/Expenses";
import AiAssistance from "./pages/AiAssistance";
import ReciptsPage from "./components/ReciptsPage";
import ReciptDetaiilPage from "./components/ReciptDetaiilPage";

function App() {
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning" element={<Learning />} />
          <Route
            path="/aiassistance"
            element={[<Navbar />, <AiAssistance />]}
          />
          <Route path="/community" element={<Community />} />
          <Route path="/recipts" element={<ReciptsPage />} />
          <Route path="/singlerecipt" element={<ReciptDetaiilPage />} />
          <Route path="/expenses" element={<Expenses />} />
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
