import React, { useContext, useEffect, useRef, useState } from "react";
// import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import QRCode from "react-qr-code";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { handleDownload } from "../helperFunction/handleDownload";
import "./UserCard.css";
import { MyHandleContext } from "../../store/handleContext";
import DotsMenu from "./DotsMenu";
import DeleteAlertDialog from "./DeleteAlertDialogo";

export default function UserCard(props) {
  const qrCodeRef = useRef(null);
  const navigateTo = useNavigate();
  const [downloadType, setDownloadType] = useState(null);
  const { resetInfo, setResetInfo } = useContext(MyHandleContext);
  const { accessQr, setAccessQr } = useContext(MyHandleContext);
  const { selected, setSelected } = useContext(MyHandleContext);
  const [isDynamic, setIsDinamic] = useState(false);

  useEffect(() => {
    setIsDinamic(props.qrData.isDynamic);
  }, []);

  const dataModify = (date) => {
    const currentDate = new Date(date);
    // Extract the date components
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
    const day = currentDate.getDate();
    // Create a string representation of the date in the format "YYYY-MM-DD"
    const formattedDate = `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;

    return formattedDate;
  };
  const refreshList = (event) => {
    props.refreshList(event);
  };

  useEffect(() => {
    if (downloadType) {
      const qrCodeSvgElement = qrCodeRef.current;
      if (qrCodeSvgElement) {
        handleDownload(downloadType, qrCodeSvgElement);
        setDownloadType(null); // Reset the download type after processing
      }
    }
  }, [downloadType]);

  const handleNavigation = () => {
    if (props.qrData.type === "customQr") {
      navigateTo(`/custom-edit/${props.qrData._id}`);
      setSelected("");
    } else {
      navigateTo(`/edit/${props.qrData._id}`);
      setSelected("");
    }
  };
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
  };
  return (
    <Card
      id="parent-card"
      onClick={(e) => {
        if (e.target.id === "parent-card") {
          if (isDynamic) {
            navigateTo(`/statistic/${props.qrData._id}`);
          }
        }
      }}
      className={`card-container ${props.qrData.isDynamic ? "dynamic" : ""}`}
      elevation={0}
    >
      <Box className="box-info">
        <CardContent className="card-content-info">
          {props.qrData.isDynamic && (
            <Typography className="dynamic-label">DYNAMIC</Typography>
          )}
          {props.qrData.type === "customQr" && (
            <Typography className="custom-label">CUSTOM</Typography>
          )}
          <Typography
            className="title-view-card"
            component="div"
            fontWeight="bolder"
            variant="h5"
          >
            {props.qrData.title}
          </Typography>

          <Box className="createon-box">
            <Typography
              variant="subtitle1"
              sx={{ color: "#a9a9c1" }}
              component="div"
            >
              Created on :
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {dataModify(props.qrData.createdAt)}
            </Typography>
          </Box>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "2rem",
              paddingTop: 10,
            }}
          >
            <div
              style={{
                backgroundColor: "#a9a9c1",
                paddingLeft: 5,
                paddingRight: 5,
                width: "fit-content",
                height: "fit-content",
                borderRadius: 5,
              }}
            >
              <Typography variant="subtitle2" sx={{ color: "white" }}>
                {props.qrData.type}
              </Typography>
            </div>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#a9a9c1" }}
                component="div"
              >
                User ID :
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {props.qrData.ownerId}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#a9a9c1", marginLeft: "5px" }}
                component="div"
              >
                Qr Pin :
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {props.qrData.pin}
              </Typography>
            </Box>
          </div>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            paddingLeft: 2,
            paddingBottom: 1,
          }}
        >
          <Button
            onClick={(value) => {
              copyToClipboard(props.qrData.link);
            }}
            style={{ cursor: "pointer" }}
          >
            Copy
          </Button>
          <p> | </p>
          <Button
            onClick={() => {
              setDownloadType("png");
            }}
            style={{ cursor: "pointer" }}
          >
            PNG
          </Button>
          <p> | </p>
          <Button
            onClick={() => {
              setDownloadType("pdf");
            }}
            style={{ cursor: "pointer" }}
          >
            PDF
          </Button>
          <DeleteAlertDialog
            handleNavigation={handleNavigation}
            qrId={props.qrData._id}
            refreshList={refreshList}
          />
        </Box>
      </Box>
      <Box className="box-qr-btn" sx={{ width: 170, flexShrink: 0 }}>
        <QRCode
          size={150}
          id={props.qrData.pin}
          className="qr-code-view"
          value={
            props.qrData.isDynamic
              ? //TODO change domain
                `${window.location.origin}/dynamic-qr/${props.qrData._id}`
              : props.qrData.link
          }
          ref={qrCodeRef}
        />
        <Button
          onClick={(e) => {
            setAccessQr({
              userId: props.qrData.ownerId,
              qrId: props.qrData.pin,
            });
            navigateTo(`/qr-info`);
            setResetInfo(false);
            setSelected("qr-info");
          }}
          sx={{ fontSize: "0.8rem" }}
          className="access-qr-btn"
          id="btn"
        >
          Access to QR
        </Button>
      </Box>
    </Card>
  );
}
