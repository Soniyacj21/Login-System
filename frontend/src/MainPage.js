import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./MainPage.css"; 
function MainPage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear(); 
    sessionStorage.clear(); 
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    }); 
    navigate("/login"); 
    window.location.reload(); 
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
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
