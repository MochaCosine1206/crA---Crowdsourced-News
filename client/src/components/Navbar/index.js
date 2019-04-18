import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import LogOutButton from "../LogOutButton"

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar(props) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
      <div className="mr-auto order-0">
        <Link id="navBrand" className="navbar-brand" to="/">
          crA crA - Crowdsourced News
        </Link>
        </div>
        <div className="order-1">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                to="/post"
                className={
                  window.location.pathname === "/" || window.location.pathname === "/post/all"
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
          </ul>
          
        </div>
        <div className="order-3 ml-1">
        <img className="rounded-circle" src={props.userImage} alt="..." />
        <LogOutButton className="float-right"/>
        </div>
      </nav>
    );
  }
  
  export default Navbar;