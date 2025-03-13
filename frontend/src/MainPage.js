import { useNavigate } from "react-router-dom";
import "./MainPage.css"; // Import the CSS file for styling

function MainPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

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
