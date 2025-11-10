import React from "react"
import { NavLink } from "react-router-dom";
import logo from "../logo.svg";
import "./Navbar.css";

export default function Navbar(){
    return(
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="logo"/>
                <h1 className="title">ShopNAO | Only the best.</h1>
            </div>
            <div className="navbar-tabs">
                <NavLink to="/" className="tab" end>Home</NavLink>
                <NavLink to="/browse" className="tab">Browse</NavLink>
                <NavLink to="/cart" className="tab">Cart</NavLink>
                <NavLink to="/about" className="tab">About</NavLink>
                <NavLink to="/login" className="tab">About</NavLink>
            </div>
        </nav> 
    );
    
}

