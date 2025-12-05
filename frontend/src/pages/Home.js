import React from 'react';
import logo from '../SpinLogo.svg';
import "./Home.css"

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <div className="Home-logo-container">
            <img src={logo} className="Home-logo" alt="logo" />
        </div>
        <div className="about-box1">        
          <img src={logo} alt="Logo" className="logo"/>
          <p>
            Welcome to SHOPNAO! This is an Amazon-like e-commerce web application where users can browse and sell products, add them to their cart, and make purchases.
          </p>
        </div>
      </header>



    </div>
  );
}

export default Home;
