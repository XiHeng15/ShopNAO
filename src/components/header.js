import React from "react"
import logo from "../logo.svg";

export default function Header(){
    return(
        <div className="header">
            <img src={logo} alt="Logo" className="logo"/>
            <h1 className="title">ShopNAO. The best shopping experience north of the equator</h1>
        </div>
    );
    
}