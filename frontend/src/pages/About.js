import React from 'react';
import "./About.css"
import logo from "../Logo.svg";

function About() {
  return(
    <div className="About">
      <header className="About-header">
        
        <h1>About SHOPNAO</h1>
        <div className="about-box">        
          <img src={logo} alt="Logo" className="logo"/>
        <p>
          SHOPNAO is your one-stop online shop for all your needs. We offer a wide range of products from hammers to hammers and even hammers!
        </p></div>
        
      </header>
    </div>
  
  );
}

export default About;
