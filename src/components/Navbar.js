import React, { useState } from "react"
import { NavLink } from "react-router-dom";
import logo from "../logo.svg";
import "./Navbar.css";

export default function Navbar(){
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");

    function toggleSearch(){
        setShowSearch(s => !s);
    }

    function handleSubmit(e){
        e.preventDefault();
        // For now just log the query. Later, call backend API to search products.
        console.log("Search for:", query);
        // Example: navigate to /browse?search=... or call a search API
    }

    return(
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="logo"/>
                <h1 className="title">ShopNAO | Only the best.</h1>
            </div>
            <div className="navbar-tabs">
                <div className="search">
                    <button
                        type="button"
                        className="search-btn"
                        onClick={toggleSearch}
                        aria-label="Open search"
                    >
                        {/* simple magnifying-glass svg */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21l-4.35-4.35" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="11" cy="11" r="6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    {showSearch && (
                        <form className="search-form" onSubmit={handleSubmit}>
                            <input
                                className="search-input"
                                placeholder="Search products..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                            />
                        </form>
                    )}
                </div>

                <NavLink to="/" className="tab" end>Home</NavLink>
                <NavLink to="/browse" className="tab">Browse</NavLink>
                <NavLink to="/cart" className="tab">Cart</NavLink>
                <NavLink to="/about" className="tab">About</NavLink>
                <NavLink to="/login" className="tab">Login</NavLink>
            </div>
        </nav>
    );
}

