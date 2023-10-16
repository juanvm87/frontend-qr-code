import React, { useContext } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sidebarContext } from "../store/sidebarContext";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import PageviewIcon from "@mui/icons-material/Pageview";
import "./Home.css";
const ButtonCenter = () => {
  const navigate = useNavigate();
  const { selected, setSelected } = useContext(sidebarContext);

  const handleNavigate = (page) => {
    navigate(page);
  };
  return (
    <Box className="box-buttons">
      <Button
        className="home-button"
        variant="contained"
        onClick={() => {
          setSelected("Create");
          handleNavigate("/Create");
        }}
      >
        <div className="container-button">
          <QrCode2OutlinedIcon className="home-icon-button" />
          <p className="home-p-button">Create</p>
        </div>
      </Button>
      <Button
        className="home-button"
        onClick={() => {
          setSelected("View");
          handleNavigate("/View");
        }}
        variant="contained"
      >
        <div className="container-button">
          <PageviewIcon className="home-icon-button" />
          <p className="home-p-button">View</p>
        </div>
      </Button>
    </Box>
  );
};

export default ButtonCenter;
