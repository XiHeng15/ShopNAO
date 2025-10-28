import React from 'react';
import logo from '../logo.svg';
import "./home.css"

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>
          Welcome to SHOPNAO!
        </p>
      </header>
    </div>
  );
}

export default Home;
