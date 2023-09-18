import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateComponent = () => {
  console.log("Private");
  const auth = localStorage.getItem("email");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigateTo("/Login");
      return;
    } else {
      navigateTo("/Home");
    }
  }, []);

  console.log("Auth-->", auth);

  return <Outlet />;
};

export default PrivateComponent;
