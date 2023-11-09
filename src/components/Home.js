import React, { useContext } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MyHandleContext } from "../store/handleContext";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import GetAppIcon from "@mui/icons-material/GetApp";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "./Home.css";
import { Tooltip } from "primereact/tooltip";
const ButtonCenter = () => {
  const navigate = useNavigate();
  const { selected, setSelected } = useContext(MyHandleContext);

  const handleNavigate = (page) => {
    navigate(page);
  };
  return (
    <Box className="box-buttons">
      <Button
        sx={{ marginTop: "8px" }}
        className="home-button"
        variant="contained"
        onClick={() => {
          setSelected("Create");
          handleNavigate("/create");
        }}
      >
        <div className="container-button">
          <QrCode2OutlinedIcon className="home-icon-button" />
          <p className="home-p-button">CREATE QR</p>
        </div>
      </Button>
      <Button
        sx={{ marginTop: "8px" }}
        className="home-button"
        onClick={() => {
          setSelected("View");
          handleNavigate("/view");
        }}
        variant="contained"
      >
        <div className="container-button">
          <FormatListBulletedIcon className="home-icon-button" />
          <p className="home-p-button">VIEW</p>
        </div>
      </Button>
      <Button
        sx={{ marginTop: "8px" }}
        className="home-button"
        onClick={() => {
          setSelected("qr-info");
          handleNavigate("/qr-info");
        }}
        variant="contained"
      >
        <div className="container-button">
          <GetAppIcon className="home-icon-button" />
          <p className="home-p-button">Access to QR</p>
        </div>
      </Button>
    </Box>
  );
};

export default ButtonCenter;
