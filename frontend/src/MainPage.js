import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./MainPage.css"; 

function MainPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear ALL stored data (including token)
    sessionStorage.clear(); // Clear session data if any
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    }); // Clear cookies if any
    
    navigate("/login"); // Redirect to login page
    window.location.reload(); // Force a full reload to clear any remaining state
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // If no token, redirect to login
    }
  }, [navigate]);

  return (
    <div className="main-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h1 className="welcome-text">Hi, Welcome...</h1>
    </div>
  );
}

export default MainPage;
