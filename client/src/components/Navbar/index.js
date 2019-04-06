import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import LogOutButton from "../LogOutButton"

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand" to="/">
          crA - Crowdsourced News
        </Link>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className={
                  window.location.pathname === "/" || window.location.pathname === "/home"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className={window.location.pathname === "/profile" ? "nav-link active" : "nav-link"}
              >
                Your Profile
              </Link>
            </li>
            <li>
            <LogOutButton />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  
  export default Navbar;