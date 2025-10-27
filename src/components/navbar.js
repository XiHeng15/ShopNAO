import React from "react"
import logo from "../logo.svg";
import "./navbar.css"

export default function Navbar(){
    return(
        <div className="navbar">
            <img src={logo} alt="Logo" className="logo"/>
            <h1 className="title">ShopNAO. Only the best</h1>
        </div>
    );
    
}