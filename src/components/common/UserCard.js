import React, { useEffect, useRef, useState } from "react";
// import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import QRCode from "react-qr-code";
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router";
import { handleDownload } from "../helperFunction/handleDownload";

export default function UserCard(props) {
  const qrCodeRef = useRef(null);
  const navigateTo = useNavigate();
  const [downloadType, setDownloadType] = useState(null);

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
    navigateTo(`/Edit/${props.qrData._id}`);
  };
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 2,
        paddingTop: "1rem",
        paddingLeft: "2rem",
        backgroundColor: "#f6f6f6",
        borderRadius: 0,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          {props.dynamic && (
            <Typography
              sx={{
                backgroundColor: "blue",
                color: "white",
                position: "absolute",
                fontSize: "0.7rem",
                top: 0,
                left: 0,
                paddingLeft: "1.5rem",
                paddingRight: "1.75rem",
                paddingBottom: "0.25rem",
                paddingTop: "0.25rem",
                transform: "translate(-25px,16px) rotate(-45deg)",
              }}
            >
              DYNAMIC
            </Typography>
          )}
          <Typography component="div" fontWeight="bolder" variant="h5">
            {props.qrData.title}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row", paddingTop: 1 }}>
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

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#a9a9c1" }}
                component="div"
              >
                Created by :
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
                sx={{ color: "#a9a9c1" }}
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
            flexDirection: "row",

            alignItems: "center",
            paddingLeft: 2,
            paddingBottom: 1,
          }}
        >
          <Button onClick={handleNavigation} style={{ cursor: "pointer" }}>
            Edit
          </Button>
          <p> | </p>
          <Button
            onClick={(value) => {
              console.log(props.qrData);
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
          {/* <p> | </p>
          <Button
            onClick={() => {
              setDownloadType("pdf");
            }}
            style={{ cursor: "pointer" }}
          >
            DELETE
          </Button> */}
        </Box>
      </Box>
      <Box sx={{ width: 170, flexShrink: 0 }}>
        <QRCode
          size={150}
          id={props.qrData.pin}
          className="qr-code-view"
          value={props.qrData.link}
          ref={qrCodeRef}
        />
      </Box>
    </Card>
  );
}
