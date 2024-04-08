import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/dashHeader.css';

const NavBar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('jwtToken')!=undefined;
  return (
    <nav className="bg-red-500 text-black py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Money-Manager</h1>
      <div className="flex items-center">
        <Link to="/" className="hover:text-blue-500">
          <FaUserCircle className="w-6 h-6 mr-2" />
          {user.username}
        </Link>
        {isLoggedIn ? (
          <NavLink to="/login">
          <button
            className="btn bg-red-700"
            onClick={() => {
              localStorage.removeItem("jwtToken");
            }}
          >
            Log Out
          </button>
        </NavLink>
        ) : (
          <>
            <Link to="/login" className="text-sm px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 mr-2">
              Login
            </Link>
            <Link to="/signup" className="text-sm px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export const DashHeader = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <nav className="DashboardNav">
      <NavLink to="/Dashboard">
        <h3 className="landing-name">MONEY MANAGER</h3>
      </NavLink>

      <div className="Dashfloat">
        <NavLink to="/login">
          <button
            className="logoutbtn"
            onClick={() => {
              localStorage.removeItem("jwtToken");
            }}
          >
            Log Out
          </button>
        </NavLink>
        <div className="profile">
        <img
          className=""
          src={require("../images/person-profile.png")}
          alt=""
          srcSet=""
        />
        <label htmlFor="">{user.username}</label>
        </div>
      </div>
    </nav>
  );
};

export default DashHeader;
