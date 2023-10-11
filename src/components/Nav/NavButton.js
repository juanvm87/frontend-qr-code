import React from "react";
import { Button } from "@mui/material";
import "./NavGenerateCode.css";
const NavButton = (props) => {
  const { name, handleNavigation, activeButton, disabled } = props;
  const handleNav = (componentName) => {
    handleNavigation(componentName);
  };

  return (
    <Button
      className={`btn-nav customBtn ${activeButton === name ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={() => {
        if (!disabled) {
          handleNav(name);
        }
      }}
      disabled={disabled}
    >
      {props.children}
      <span className="a-btn">{name}</span>
    </Button>
  );
};

export default NavButton;
