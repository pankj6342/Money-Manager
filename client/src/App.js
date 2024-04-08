import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login_smart from "./containers/login_container";
import { Landing } from "./components/landing";
import SignUp from "./components/signup";
import { Dashboard } from "./containers/Dashboard";
import AuthComponent from "./containers/AuthComponent";
import Header from "./components/Header";
import './styles/index.css';
import DashHeader from "./components/DashHeader";
import NavBar from "./components/DashHeader";

export const App = () => {
  return (
    <div>
    <DashHeader/>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route exact path="/login" element={<Login_smart />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route path="/" element={<AuthComponent/>}> 
            <Route path="dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};
