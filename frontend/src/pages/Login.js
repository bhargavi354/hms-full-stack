import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../config";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      // 🔥 IMPORTANT FIX: DO NOT ADD /api AGAIN
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Invalid admin credentials");
        setLoading(false);
        return;
      }

      // Save login state
      localStorage.setItem("hms_logged_in", "true");

      navigate("/"); // go to dashboard
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Backend not reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="op-link" onClick={() => navigate("/op-login")}>
          Login as OP Staff →
        </p>
      </div>
    </div>
  );
}
