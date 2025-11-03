import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profiles from "./pages/Profiles";
import './App.css';
import Gamedev from "./pages/Gamedev";
import Fullstack from "./pages/Fullstack";
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Profiles/>} />
          <Route path="/gamedev" element={<Gamedev/>} />
          <Route path="/fullstack" element={<Fullstack/>} />
        </Routes>
    </Router>
  );
}

export default App;
