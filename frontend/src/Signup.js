import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email || !password) {
      setMessage("Both email and password are required.");
      return;
    }
    setLoading(true); 
    try {
      const response = await axios.post("http://localhost:5000/signup", { email, password });
      setMessage(response.data.message); 
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false); 
    }
  };
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"} 
          </button>
          <button onClick={handleBack} className="back-button">
            Back
          </button>
        </div>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
}
export default Signup;
