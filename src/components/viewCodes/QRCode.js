import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardContent } from "@mui/material";
import QRCode from "react-qr-code";
import "./QRcode.css";
import { useParams } from "react-router";
import { BsFiletypePdf, BsFiletypeSvg, BsFiletypePng } from "react-icons/bs";
import { createQrAPI, getQr, updateQr } from "../../services/RestApi";
import { checkInput } from "../helperFunction/checkInput";
import { PopUpModal } from "../common/PopUpModal";
import { handleformattedDate } from "../helperFunction/formatedDate";
import { handleDownload } from "../helperFunction/handleDownload";
import { useNavigate } from "react-router-dom";

const QRcode = (props) => {
  const [linkData, setLinkData] = useState("");
  const [downloadType, setDownloadType] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [qrData, setQrData] = useState({});
  const idFromURL = useParams().id;
  const qrCodeRef = useRef(null);
  const navigate = useNavigate();

  const getQrDataAPI = async () => {
    try {
      if (idFromURL) {
        setIsUpdating(true);
      } else {
        setIsUpdating(false);
      }

      if (idFromURL) {
        const response = await getQr(idFromURL);

        setQrData(response.data);
        setLinkData(response.data.link);
      } else {
        setQrData("");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    getQrDataAPI();
  }, []);

  useEffect(() => {
    function HandlerTextData() {
      try {
        setLinkData(props.textData);
      } catch (error) {
        console.error("Error fetching textData:", error);
      }
    }
    HandlerTextData();
  }, [props.textData]);

  useEffect(() => {
    function HandleData() {
      try {
        setLinkData("http://" + props.linkData);
      } catch (error) {
        console.error("Error fetching linkData:", error);
      }
    }
    HandleData();
  }, [props.linkData]);

  useEffect(() => {
    function HandleEmailData() {
      try {
        const edata = `MATMSG:TO:${props.emailData.to};SUB:${props.emailData.subject};BODY:${props.emailData.text};;`;
        setLinkData(edata);
      } catch (error) {
        console.error("Error fetching emailData:", error);
      }
    }
    HandleEmailData();
  }, [props.emailData]);
  useEffect(() => {
    function HandleZoomData() {
      try {
        const idMeeting = props.zoomData.id;
        const password = props.zoomData.password;
        const edata = `https://zoom.us/j/${idMeeting}?pwd=${password}`;
        setLinkData(edata);
      } catch (error) {
        console.error("Error fetching emailData:", error);
      }
    }
    HandleZoomData();
  }, [props.zoomData]);
  useEffect(() => {
    function HandlePhoneData() {
      try {
        const phone = `TEL:${props.phoneData}`;
        setLinkData(phone);
      } catch (error) {
        console.error("Error fetching phoneData:", error);
      }
    }
    HandlePhoneData();
  }, [props.phoneData]);

  useEffect(() => {
    function handleSmsData() {
      try {
        const smsData = `smsto:${props.smsData.phone}:${props.smsData.text}`;
        setLinkData(smsData);
      } catch (error) {
        console.error("Error fetching smsData:", error);
      }
    }
    handleSmsData();
  }, [props.smsData]);

  useEffect(() => {
    function handleWhatsAppData() {
      if (props.whatsAppData && props.whatsAppData.phone) {
        let phoneNumber = props.whatsAppData.phone;
        let phoneResult = phoneNumber.replace(/\s/g, "");

        try {
          let whatsAppData = `https://wa.me/${phoneResult}?text=${encodeURIComponent(
            props.whatsAppData.text
          )}`;
          setLinkData(whatsAppData);
        } catch (error) {
          console.error("Error fetching whatsAppData:", error);
        }
      }
    }

    handleWhatsAppData();
  }, [props.whatsAppData]);
  useEffect(() => {
    function handleEventData() {
      try {
        const title = props.eventData.title;
        const eventData_notes = props.eventData.notes;
        const formattedStartDate = handleformattedDate(
          props.eventData.startTime
        );
        const formattedEndDate = handleformattedDate(props.eventData.endTime);

        const eventDataString22 = `BEGIN:VCALENDAR
BEGIN:VEVENT
DTSTART:${formattedStartDate}
DTEND:${formattedEndDate}
SUMMARY:${title}
LOCATION:${props.eventData.location}
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:${eventData_notes}
END:VALARM
END:VEVENT
END:VCALENDAR`;

        setLinkData(eventDataString22);
      } catch (error) {
        console.error("Error fetching eventData:", error);
      }
    }
    handleEventData();
  }, [props.eventData]);
  useEffect(() => {
    function handleWifiData() {
      try {
        let passd = props.wifiData.password;
        let auth = props.wifiData.authentication;
        let id = props.wifiData.id;

        const wifiData = `WIFI:T:${auth};S:${id};P:${passd};H:{false}`;
        setLinkData(wifiData);
      } catch (error) {
        console.error("Error fetching wifiData:", error);
      }
    }
    handleWifiData();
  }, [props.wifiData]);
  useEffect(() => {
    function handleLocationData() {
      try {
        let dataL = props.locationData.link;
        console.log("178 qrcode", dataL);
        setLinkData(dataL);
      } catch (err) {
        console.error("Error fetching locationData:", err);
      }
    }
    handleLocationData();
  }, [props.locationData]);

  useEffect(() => {
    function handleSkypeData() {
      try {
        let newData = `skype:${props.skypeData.id}?${props.skypeData.type}`;

        setLinkData(newData);
      } catch (error) {
        console.error("Error fetching SkypeData:", error);
      }
    }
    handleSkypeData();
  }, [props.skypeData]);

  useEffect(() => {
    setLinkData("");
  }, [props.activeButton]);

  useEffect(() => {
    if (downloadType) {
      const qrCodeSvgElement = qrCodeRef.current;
      if (qrCodeSvgElement) {
        handleDownload(downloadType, qrCodeSvgElement);
        setDownloadType(null); // Reset the download type after processing
      }
    }
  }, [downloadType]);

  const handleUpdate = async (textDescription) => {
    try {
      let inp = checkInput(props);
      const updateCode = {
        title: textDescription,
        type: props.activeButton,
        link: linkData,
        input: inp,
      };
      updateQr(idFromURL, updateCode);
      setTimeout(() => {
        navigate("/View");
      }, 500);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const saveData = (textDescription) => {
    try {
      let inp = checkInput(props);
      const newData = {
        title: textDescription,
        type: props.activeButton,
        link: linkData,
        input: inp,
        ownerId: "",
      };
      createQrAPI(newData);
      setTimeout(() => {
        navigate("/View");
      }, 500);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <Card>
      <CardContent className="qr-card-content">
        <QRCode
          id="qr-picture"
          className="qr-code"
          value={linkData}
          ref={qrCodeRef}
        />
        {linkData && !qrData && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="container-btn-qr">
              <Button
                className="btn-qr"
                onClick={() => {
                  setDownloadType("pdf");
                }}
              >
                <BsFiletypePdf size={"2rem"} />
              </Button>
              <Button
                className="btn-qr"
                onClick={() => {
                  setDownloadType("png");
                }}
              >
                <BsFiletypePng size={"2rem"} />
              </Button>
              <Button
                className="btn-qr"
                onClick={() => {
                  setDownloadType("svg");
                }}
              >
                <BsFiletypeSvg size={"2rem"} />
              </Button>
            </div>
            <div>
              <PopUpModal
                saveData={saveData}
                setDownloadType={setDownloadType}
                isUpdating={isUpdating}
              />
            </div>
          </div>
        )}
        {isUpdating && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <PopUpModal
                saveData={saveData}
                setDownloadType={setDownloadType}
                isUpdating={isUpdating}
                handleUpdate={handleUpdate}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRcode;
