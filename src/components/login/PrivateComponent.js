import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateComponent = () => {
  console.log("Private");
  const auth = localStorage.getItem("token");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigateTo("/login");
      return;
    }
  }, []);

  return <Outlet />;
};

export default PrivateComponent;
