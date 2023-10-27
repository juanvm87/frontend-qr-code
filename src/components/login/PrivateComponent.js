import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateComponent = () => {
  console.log("Private");
  const auth = localStorage.getItem("token");
  const navigateTo = useNavigate();

  const currentDate = new Date();

  useEffect(() => {
    if (auth) {
      const decodedToken = jwtDecode(auth);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("time Auth", decodedToken.exp);
        localStorage.clear();
      }
    }
  }, []);

  useEffect(() => {
    if (!auth) {
      navigateTo("/login");
      return;
    } else {
      navigateTo("/home");
    }
  }, []);

  return <Outlet />;
};

export default PrivateComponent;
