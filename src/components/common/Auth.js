import jwtDecode from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router";

const Auth = ({ children }) => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  let decodedToken = jwtDecode(token);
  console.log("Decoded Token", decodedToken);
  let currentDate = new Date();

  // JWT exp is in seconds
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("time Auth", decodedToken.exp);
    navigate("/login");
  }

  return <div>{children}</div>;
};

export default Auth;
