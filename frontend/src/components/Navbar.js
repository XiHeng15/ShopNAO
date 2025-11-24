import { NavLink } from "react-router-dom";
import logo from "../logo.svg";
import "./Navbar.css";

export default function Navbar() {
  const name = localStorage.getItem("userName");  // get user name
  const role = localStorage.getItem("role");  // for showing business tab

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo"/>
        <h1 className="title">ShopNAO | Only the best.</h1>
      </div>

      <div className="navbar-tabs">
        <NavLink to="/" className="tab" end>Home</NavLink>
        <NavLink to="/browse" className="tab">Browse</NavLink>
        
        {role === "business" && (
        <NavLink to="/BusinessDashboard" className="tab">
            Business Dashboard
        </NavLink>
        )}
        
        <NavLink to="/cart" className="tab">Cart</NavLink>
        <NavLink to="/about" className="tab">About</NavLink>
        {!name ? (
          <NavLink to="/login" className="tab">Login</NavLink>
        ) : (
          <span className="tab">Hello, {name}!</span>
        )}
      </div>
    </nav>
  );
}
