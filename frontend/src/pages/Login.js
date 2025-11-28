import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js"; // import context
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
  const { login } = useContext(UserContext); // use context

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

      // Update UserContext and localStorage
      login({
        token: data.token,
        name: data.name,
        role: data.role,
      });

      alert("Login success! Welcome " + data.name);

      // Redirect based on role
      if (data.role === "business") {
        navigate("/business");
      } else {
        navigate("/browse");
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

      <button 
        onClick={() => navigate("/signup")} 
        style={{ cursor: "pointer", color: "white" }}
      >
        Don't have an account? Sign up
      </button>
    </div>
  );
}
