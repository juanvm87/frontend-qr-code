import React from "react";
import { Button } from "@mui/material";
import "./NavGenerateCode.css";
const NavButton = (props) => {
  const { name, handleNavigation, activeButton } = props;
  const handleNav = (componentName) => {
    handleNavigation(componentName);
  };

  return (
    <Button
      className={`btn-nav customBtn ${activeButton === name ? "active" : ""}`}
      onClick={() => {
        // Call the parent handleNavigation function
        handleNav(name);
      }}
    >
      {props.children}
      <span className="a-btn">{name}</span>
    </Button>
  );
};

export default NavButton;
