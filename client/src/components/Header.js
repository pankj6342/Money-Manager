import React from "react";
import { NavLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import "../styles/landing.css";
const Header = () => {
  return (
    <nav className="landingNav fixed-top">
      <NavLink to="/">
        <h3 className="landing-name">Money Manager</h3>
      </NavLink>

      <div className="float">
        <NavLink to="/login">
          <button className="loginBtn">Log In</button>
        </NavLink>
        <label htmlFor="">or</label>
        <NavLink to="/signup">
          <button className="SignUp">Sign Up</button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
