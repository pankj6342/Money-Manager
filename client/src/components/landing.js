import React from "react";
import "../styles/landing.css";
import Header from "./Header";
import { Link } from "react-router-dom";
export const Landing = () => {
  return (
    <>
      <div className="landing">
        <main>
          <div className="landing-bg"></div>
          <div className="landing-home">
            <img
              align="middle"
              className="landing-logo"
              src={require("../images/logo.png")}
              alt=""
            />
            <h1 className="langing-text landing-header">
              Split expenses with friends.
            </h1>
            <p className="langing-text landing-desc">
              Splitting Bills, Zero Drama – Because Money Shouldn't Mess with
              Friendship!
            </p>
            {/* <NavLink to="/signup"> <button className="landing-button">  Get Started</button></NavLink> */}
            <Link to="/signup">
              <button className="landing-button"> Get Started</button>
            </Link>
          </div>

          <div className="landing-feature">
            <div>
              <img
                className="landing-img"
                src={require("../images/mobile.jpeg")}
                alt=""
              />
            </div>
            <div className="landing-content">
              <h3>
                Friends Don't Let Friends Math – The App that Turns Bill
                Splitting into a Stand-Up Act
              </h3>
              <ul>
                <li>
                  <i class="fas fa-check-circle"></i> &nbsp;&nbsp;Add your
                  expenses
                </li>
                <li>
                  <i class="fas fa-check-circle"></i> &nbsp;&nbsp;Add multiple
                  friends
                </li>
                <li>
                  <i class="fas fa-check-circle"></i> &nbsp;&nbsp;Get the
                  summary on your Dashboard
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
