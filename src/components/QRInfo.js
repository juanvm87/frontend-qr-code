import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getQrByPin } from "../services/RestApi";
import "./QRInfo.css";
import QRCode from "react-qr-code";
import Header from "./common/Header";
import { TextWithSeeMore } from "./common/TextWithSeeMore";
import { MyHandleContext } from "../store/handleContext";

const QRInfo = () => {
  const { accessQr, setAccessQr } = useContext(MyHandleContext);
  const { resetInfo, setResetInfo } = useContext(MyHandleContext);

  const qrCodeRef = useRef(null);
  const [qrInputInfo, setQrInputInfo] = useState({ userId: "", pin: "" });
  const [qr, setQr] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isChecking, setIsChacking] = useState(false);
  const [message, setMessage] = useState("");
  const [horizontal] = useState("right");
  const [vertical] = useState("top");

  useEffect(() => {
    function openSnackBarTime() {
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 6000);
    }
    openSnackBarTime();
  }, [openSnackbar]);

  useEffect(() => {
    const handleAccesQr = () => {
      if (!resetInfo) {
        setQrInputInfo({ userId: accessQr.userId, pin: accessQr.qrId });
        setResetInfo(true);
      } else {
        setQrInputInfo({ userId: "", pin: "" });
        setResetInfo(true);
      }
    };
    handleAccesQr();
  }, []);

  const handleCheckQR = async () => {
    try {
      if (!qrInputInfo.userId || !qrInputInfo.pin) {
        setMessage("Both User Number and QR PIN are required");
        setOpenSnackbar(true);
      } else {
        const reply = await getQrByPin(qrInputInfo);
        setQr(reply.data);
        setIsChacking(true);
      }

      /*   const windowObjectReference = window.open(
        reply.data.link,
        "SingleSecondaryWindowName"
      ); */
      //Email:
      // "mailto:juan@gmail.com?subject=22222&body=hello"
      //Event:
      //
    } catch (error) {
      setMessage(error.response.data.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      {!isChecking && (
        <div>
          <Header letters={"AQ"} information={"Access to QR"} />
          <Box className="qrinfo-body-box">
            <Box className="qr-box-input">
              <TextField
                value={qrInputInfo.userId}
                autoComplete="off"
                onChange={(e) =>
                  setQrInputInfo((prev) => ({
                    ...prev,
                    userId: e.target.value,
                  }))
                }
                label="USER ID"
              />
              <TextField
                value={qrInputInfo.pin}
                autoComplete="off"
                onChange={(e) =>
                  setQrInputInfo((prev) => ({ ...prev, pin: e.target.value }))
                }
                label="QR PIN"
              />
              <Button className="btn-checkqr" onClick={handleCheckQR}>
                CHECK QR
              </Button>
            </Box>
          </Box>
        </div>
      )}
      {isChecking && (
        <>
          <div className="profile-heading">
            <div className="box">
              <QRCode
                size={115}
                id={qr.pin}
                className="qr-code-view"
                value={qr.link}
                ref={qrCodeRef}
              />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <h2 className="floating-heading" style={{ color: "#ffffff" }}>
                Owner ID: {qr.ownerId}
              </h2>
              <h2 className="floating-heading" style={{ color: "#ffffff" }}>
                QR pin: {qr.pin}
              </h2>
            </div>
          </div>

          <Box className="qr-box-details">
            <Box className="qr-details">
              <Box className="box-pin-id-type">
                <Typography variant="body1">Type: {qr.type}</Typography>
              </Box>

              <Box className="text-details" style={{ wordWrap: "break-word" }}>
                <Typography title={qr.title} variant="body1" />
                <Typography variant="body1">
                  Created: {new Date(qr.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  Last Updated: {new Date(qr.updatedAt).toLocaleString()}
                </Typography>

                {qr.type === "Link" && (
                  <Typography variant="body1">Link: {qr.input.link}</Typography>
                )}
                {qr.type === "Text" && (
                  <TextWithSeeMore text={qr.input.text} maxChars={50} />
                )}
                {qr.type === "Email" && (
                  <>
                    <Typography variant="body1">
                      Email to: {qr.input.email}
                    </Typography>
                    <Typography variant="body1">
                      Subject: {qr.input.subject}
                    </Typography>
                    <TextWithSeeMore text={qr.input.text} maxChars={55} />
                  </>
                )}
                {qr.type === "Zoom" && (
                  <>
                    <Typography variant="body1">
                      Id Meeting: {qr.input.idMeeting}
                    </Typography>
                    <Typography variant="body1">
                      Password: {qr.input.password}
                    </Typography>
                  </>
                )}

                {qr.type === "Location" && (
                  <>
                    <Typography variant="body1">
                      Location: {qr.input.place}
                    </Typography>
                    <Typography variant="body1">
                      latitude: {qr.input.latitude}
                    </Typography>
                    <Typography variant="body1">
                      longitude: {qr.input.longitude}
                    </Typography>
                  </>
                )}
                {qr.type === "Phone" && (
                  <Typography variant="body1">
                    Phone: {qr.input.phone}
                  </Typography>
                )}
                {qr.type === "SMS" && (
                  <>
                    <Typography variant="body1">
                      Phone: {qr.input.phone}
                    </Typography>
                    <TextWithSeeMore
                      text={`Text: ${qr.input.text}`}
                      maxChars={50}
                    />
                  </>
                )}
                {qr.type === "WhatsApp" && (
                  <>
                    <Typography variant="body1">
                      Phone: {qr.input.phone}
                    </Typography>
                    <TextWithSeeMore
                      text={`Text: ${qr.input.text}`}
                      maxChars={50}
                    />
                  </>
                )}
                {qr.type === "Event" && (
                  <>
                    <Typography variant="body1">
                      Title: {qr.input.title}
                    </Typography>
                    <Typography variant="body1">
                      Location: {qr.input.location}
                    </Typography>
                    <Typography variant="body1">
                      Start: {new Date(qr.input.startTime).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      End: {new Date(qr.input.endTime).toLocaleString()}
                    </Typography>
                    <TextWithSeeMore
                      text={`Note: ${qr.input.notes}`}
                      maxChars={50}
                    />
                  </>
                )}
                {qr.type === "Wi-Fi" && (
                  <>
                    <Typography variant="body1">ID: {qr.input.id}</Typography>
                    <Typography variant="body1">
                      Password: {qr.input.password}
                    </Typography>
                    <Typography variant="body1">
                      Authentication: {qr.input.authentication}
                    </Typography>
                  </>
                )}
                {qr.type === "Skype" && (
                  <>
                    <Typography variant="body1">ID: {qr.input.id}</Typography>
                    <Typography variant="body1">
                      Type: {qr.input.type}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}

      <Snackbar
        sx={{ marginTop: "40px" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={6000}
        message={message}
        key={vertical + horizontal}
        style={{ backgroundColor: "white", color: "black" }}
      />
    </>
  );
};

export default QRInfo;
