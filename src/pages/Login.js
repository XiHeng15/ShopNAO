import React from 'react';
import { useState } from "react"; //Aaron you need this import statement to use useState
import "./Login.css"

export default function App() {
  return (
    <div className="Card">
      <header>
        <Login />
      </header>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="Card">
      <h2>Log in to Shop NAO</h2>
      <label>
        Username: <input value={username} onChange={handleUsernameChange} />
      </label>
      <label>
        Password: <input value={password} onChange={handlePasswordChange} />
      </label>
      <Button />
    </div>
  );
}

function Button() {
  return (
    <div>
      <button onClick={handleClick}> Sign In </button>
    </div>
  );
}

function handleClick() {
  alert(
    "Hopefully we can ping the database to verify for correct usernames/passwords"
  ); //temporary alert msg when clicked
}