import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function App() {
  return (
    <div className="Login">
      <header className="Login-header">
        <Login />
      </header>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      //Stores JWT in localStorage!!
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role); // store user type

      alert("Login success! Welcome " + data.name);

      // Added redirect to show logged-in UI for business logic

      if (data.role === "business") {
        navigate("/business"); // Business dashboard page
      } else {
        navigate("/browse"); // Regular customer page
      }

    } catch (err) {
      alert("Server error: " + err.message);
    }
  }

  return (
    <div className="Card">
      <h2>Log in to Shop NAO</h2>

      <label>
        Email:
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email"
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button onClick={handleLogin}>Sign In</button>

      <button onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "blue" }}>
        Don't have an account? Sign up
      </button>

    </div>
  );
}
