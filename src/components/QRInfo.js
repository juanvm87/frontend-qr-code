import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getQrByPin } from "../services/RestApi";
import "./QRInfo.css";
import QRCode from "react-qr-code";
import Header from "./common/Header";
import { TextWithSeeMore } from "./common/TextWithSeeMore";

const QRInfo = () => {
  const qrCodeRef = useRef(null);
  const [qrInputInfo, setQrInputInfo] = useState({ userId: "", QrPin: "" });
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

  const handleCheckQR = async () => {
    try {
      if (!qrInputInfo.userId || !qrInputInfo.pin) {
        setMessage("Both User Number and QR PIN are required");
        setOpenSnackbar(true);
      } else {
        const reply = await getQrByPin(qrInputInfo);
        console.log("qr data", reply.data);
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
      <Header letters={"ATQ"} information={"Access To QR"} />
      <Box className="qrinfo-body-box">
        <Box className="qr-box-input">
          <TextField
            autoComplete="off"
            onChange={(e) =>
              setQrInputInfo((prev) => ({ ...prev, userId: e.target.value }))
            }
            label="USER ID"
          />
          <TextField
            autoComplete="off"
            onChange={(e) =>
              setQrInputInfo((prev) => ({ ...prev, pin: e.target.value }))
            }
            label="QR PIN"
          />
          <Button onClick={handleCheckQR}>CHECK QR</Button>
        </Box>
        {isChecking && (
          <Box className="qr-box-details">
            <Card>
              <CardContent>
                <Box className="qr-details">
                  <Box className="box-qr-img">
                    <Box className="box-pin-id-type">
                      <Typography variant="body1">
                        Owner ID: {qr.ownerId}
                      </Typography>
                      <Typography variant="body1">QR pin: {qr.pin}</Typography>
                      <Typography variant="body1">Type: {qr.type}</Typography>
                    </Box>
                    <QRCode
                      size={150}
                      id={qr.pin}
                      className="qr-code-view"
                      value={qr.link}
                      ref={qrCodeRef}
                    />
                  </Box>
                  <Box
                    className="text-details"
                    style={{ wordWrap: "break-word" }}
                  >
                    <CardHeader title={qr.title} />
                    <Typography variant="body1">
                      Created : {new Date(qr.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      Last Updated : {new Date(qr.updatedAt).toLocaleString()}
                    </Typography>
                    {qr.type === "Link" && (
                      <Typography variant="body1">
                        Link : {qr.input.link}
                      </Typography>
                    )}
                    {qr.type === "Text" && (
                      <TextWithSeeMore text={qr.input.text} maxChars={50} />
                    )}
                    {qr.type === "Email" && (
                      <>
                        <Typography variant="body1">
                          Email to : {qr.input.email}
                        </Typography>
                        <Typography variant="body1">
                          Subject : {qr.input.subject}
                        </Typography>
                        <TextWithSeeMore text={qr.input.text} maxChars={50} />
                      </>
                    )}
                    {qr.type === "" && (
                      <TextWithSeeMore text={qr.input.text} maxChars={50} />
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
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
