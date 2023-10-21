import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="profile-heading">
      <div className="box">{props.letters}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1
          className="floating-heading"
          style={{ color: "#ffffff", fontWeight: 400 }}
        >
          {props.information}
        </h1>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Header;
