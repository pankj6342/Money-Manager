import React from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

function AuthComponent() {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwtToken");
  return jwt ? <Outlet/> : <Navigate to="/login" />;
}

export default AuthComponent;
