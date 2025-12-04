import React from 'react';
import "./About.css"
import logo from "../Logo.svg";

function About() {
  return(
    <div className="About">
      <header className="About-header">
        
        <h1>About SHOPNAO</h1>
        <div className="about-box1">        
          <img src={logo} alt="Logo" className="logo"/>
          <p>
            SHOPNAO is an E-Commerce website built by people who are REALLY passionate about hammers but dont know anything about them
          </p>
        </div>  
          
        <div className="about-box1">        
          <img src={logo} alt="Logo" className="logo"/>
          <p>
            This website was developed using frameworks such as React, MongoDB and many more (be sure to read our "READ ME" for specific module credits)
          </p>
        </div>
        
      </header>
    </div>
  
  );
}



export default About;
