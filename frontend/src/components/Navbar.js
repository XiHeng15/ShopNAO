import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.js";
import logo from "../Logo.svg";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo"/>
        <h1 className="title">ShopNAO.
          Only the best.</h1>
      </div>

      <div className="navbar-tabs">
        <NavLink to="/" className="tab" end>Home</NavLink>
        <NavLink to="/browse" className="tab">Browse</NavLink>
        {user.role === "business" && (
          <NavLink to="/business" className="tab">
            Business
          </NavLink>
        )}
        <NavLink to="/cart" className="tab">Cart</NavLink>
        <NavLink to="/orders" className="tab">Orders</NavLink>
        <NavLink to="/about" className="tab">About</NavLink>

        {!user.name ? (
          <NavLink to="/login" className="tab">Login</NavLink>
        ) : (
          <span className="tab" onClick={() => { logout(); navigate("/login"); }} style={{cursor:"pointer"}}>
            Hello, {user.name.length > 10 ? user.name.slice(0,10) + "…" : user.name}! Logout?
          </span>
        )}
      </div>
    </nav>
  );
}
