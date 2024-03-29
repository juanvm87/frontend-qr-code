import {
  Box,
  Button,
  Card,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getQrByPin } from "../services/RestApi";
import "./QRInfo.css";
import QRCode from "react-qr-code";
import Header from "../components/common/Header";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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
  const isType =
    qr.type !== "SMS" &&
    qr.type !== "Phone" &&
    qr.type !== "Text" &&
    qr.type !== "Event";

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
    } catch (error) {
      setMessage(error.response.data.message);
      setOpenSnackbar(true);
    }
  };
  useEffect(() => {
    if (isChecking) {
      if (qr.type === "Email") {
        setQr((prev) => ({
          ...prev,
          link: `mailto:${qr.input.email}?subject=${qr.input.subject}&body=${qr.input.text}`,
        }));
      }
      // Log the value of qr when isChecking is true
    }
  }, [isChecking]);

  return (
    <>
      {!isChecking && (
        <div>
          <Header letters={"AQ"} information={"Access to QR"} />
          <Box className="qrinfo-body-box">
            <Card className="card-input">
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
            </Card>
          </Box>
        </div>
      )}
      {isChecking && (
        <>
          <div className="profile-heading-info">
            <div className="box-info-search-info">
              <QRCode
                size={115}
                id={qr.pin}
                className="qr-code-view"
                value={qr.link}
                ref={qrCodeRef}
              />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <h2
                className="floating-heading-info"
                style={{ color: "#ffffff" }}
              >
                User ID: {qr.ownerId}
              </h2>
              <h2
                className="floating-heading-info"
                style={{ color: "#ffffff" }}
              >
                QR pin: {qr.pin}
              </h2>
            </div>
          </div>

          <Box className="qr-box-details">
            <Card className="qr-details-card">
              <Box className="text-details" style={{ wordWrap: "break-word" }}>
                {isType && (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                    }}
                  >
                    <a
                      href={qr.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="circle-button-link"
                    >
                      <OpenInNewIcon fontSize="large" />
                    </a>
                  </Box>
                )}
                <Box sx={{ margin: "5px 30px 30px 30px" }}>
                  <Typography variant="h3">{qr.title}</Typography>
                  <div className="type-tag">
                    <Typography
                      className="type-tag-letters"
                      variant="subtitle2"
                    >
                      {qr.type}
                    </Typography>
                  </div>

                  <div className="qr-details-content">
                    {qr.type === "Link" && (
                      <Typography variant="h5">
                        <span>Link:</span> {qr.input.link}
                      </Typography>
                    )}
                    {qr.type === "Text" && (
                      <Typography variant="h5">
                        <span>Text:</span> {qr.input.text}
                      </Typography>
                    )}
                    {qr.type === "Email" && (
                      <div>
                        <Typography variant="h5">
                          <span>Email to:</span> {qr.input.email}
                        </Typography>
                        <Typography variant="h5">
                          <span>Subject:</span> {qr.input.subject}
                        </Typography>
                        <Typography variant="h5">
                          <span>Text:</span> {qr.input.text}
                        </Typography>
                      </div>
                    )}
                    {qr.type === "Zoom" && (
                      <>
                        <Typography variant="h5">
                          <span>Id Meeting:</span> {qr.input.idMeeting}
                        </Typography>
                        <Typography variant="h5">
                          <span>Password:</span> {qr.input.password}
                        </Typography>
                      </>
                    )}

                    {qr.type === "Location" && (
                      <>
                        <Typography variant="h5">
                          <span>Location:</span> {qr.input.place}
                        </Typography>
                        <Typography variant="h5">
                          <span>latitude:</span> {qr.input.latitude}
                        </Typography>
                        <Typography variant="h5">
                          <span>longitude:</span> {qr.input.longitude}
                        </Typography>
                      </>
                    )}

                    {qr.type === "Phone" && (
                      <Typography variant="h5">
                        <span>Phone:</span> {qr.input.phone}
                      </Typography>
                    )}

                    {qr.type === "SMS" && (
                      <>
                        <Typography variant="h5">
                          <span>Phone:</span> {qr.input.phone}
                        </Typography>
                        <Typography variant="h5">
                          <span>Text:</span> {qr.input.text}
                        </Typography>
                      </>
                    )}

                    {qr.type === "WhatsApp" && (
                      <>
                        <Typography variant="h5">
                          <span>Phone:</span> {qr.input.phone}
                        </Typography>

                        <Typography variant="h5">
                          <span>Text:</span> {qr.input.text}
                        </Typography>
                      </>
                    )}

                    {qr.type === "Event" && (
                      <>
                        <Typography variant="h5">
                          <span>Title:</span> {qr.input.title}
                        </Typography>
                        <Typography variant="h5">
                          <span>Location:</span> {qr.input.location}
                        </Typography>
                        <Typography variant="h5">
                          <span>Start:</span>{" "}
                          {new Date(qr.input.startTime).toLocaleString()}
                        </Typography>
                        <Typography variant="h5">
                          <span>End:</span>{" "}
                          {new Date(qr.input.endTime).toLocaleString()}
                        </Typography>
                        <Typography variant="h5">
                          <span>Note:</span> {qr.input.text}
                        </Typography>
                      </>
                    )}

                    {qr.type === "Wi-Fi" && (
                      <>
                        <Typography variant="h5">
                          <span>ID:</span> {qr.input.id}
                        </Typography>
                        <Typography variant="h5">
                          <span>Password:</span> {qr.input.password}
                        </Typography>
                        <Typography variant="h5">
                          <span>Authentication:</span> {qr.input.authentication}
                        </Typography>
                      </>
                    )}

                    {qr.type === "Skype" && (
                      <>
                        <Typography variant="h5">
                          <span>Skype:</span> {qr.input.type}
                        </Typography>
                        <Typography variant="h5">
                          <span>ID:</span> {qr.input.id}
                        </Typography>
                      </>
                    )}
                  </div>
                </Box>
              </Box>
            </Card>
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
