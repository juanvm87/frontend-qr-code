import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
const PrivateComponent = () => {
  console.log("Private");
  const auth = localStorage.getItem("token");
  const navigateTo = useNavigate();
  const { decodedToken, isExpired } = useJwt(auth);

  useEffect(() => {
    if (!auth) {
      navigateTo("/login");
    } else {
      if (isExpired) {
        console.log("time Auth", decodedToken);
        navigateTo("/login");
        localStorage.clear();
      } else {
        navigateTo("/home");
        console.log("time Auth", decodedToken);
      }
    }
  }, []);

  return <Outlet />;
};

export default PrivateComponent;
