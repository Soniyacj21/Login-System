import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import MainPage from "./MainPage";
import "./styles.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-background">
      <div className="main-page">
        <h1>Welcome User!</h1>
        <div className="button-box">
          <button className="button-link" onClick={() => navigate("/signup")}>
            Signup
          </button>
          <button className="button-link" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
