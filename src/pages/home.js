import React from 'react';
import logo from '../logo.svg';
import "./Home.css"

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <div className="Home-logo-container">
            <img src={logo} className="Home-logo" alt="logo" />
        </div>
        <p>
          Welcome to SHOPNAO!
        </p>
      </header>
    </div>
  );
}

export default Home;
