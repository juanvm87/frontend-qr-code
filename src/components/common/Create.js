import React, { useEffect } from "react";
import { useState } from "react";

import "./Create.css";
import QRcode from "../../CreateComponents/QRCode";

import Header from "./Header";
import CarouselButtons from "../../CreateComponents/CarouselButtons";
import { InputGenerateCode } from "../../CreateComponents/InputGenerateCode";
import { useParams } from "react-router";
import { getQr } from "../../services/RestApi";
import { Box } from "@mui/material";

const Create = () => {
  const [linkData, setLinkData] = useState("");
  const [textData, setTextData] = useState("");
  const [emailData, setEmailData] = useState({});
  const [phoneData, setPhoneData] = useState("");
  const [smsData, setSmsData] = useState({});
  const [whatsAppData, setWhatsAppData] = useState({});
  const [wifiData, setWifiData] = useState({});
  const [zoomData, setZoomData] = useState({});
  const [activeButton, setActiveButton] = useState("Link");
  const [eventData, setEventData] = useState({});
  const [skypeData, setSkypeData] = useState({});
  const [locationData, setLocationData] = useState({});
  const idFromURL = useParams().id;
  const [qrData, setQrData] = useState({});

  const getQrDataAPI = async () => {
    try {
      if (idFromURL) {
        const response = await getQr(idFromURL);
        const type = response.data.type;
        setQrData(response.data);
        setActiveButton(type);
        if (type === "WhatsApp") {
          setWhatsAppData(response.data.input);
        }
        if (type === "Link") {
          setLinkData(response.data.input);
        }

        if (type === "Text") {
          setTextData(response.data.input);
        }

        if (type === "Email") {
          setEmailData(response.data.input);
        }

        if (type === "Location") {
          setLocationData(response.data.input);
        }

        if (type === "Phone") {
          setPhoneData(response.data.input);
        }

        if (type === "SMS") {
          setSmsData(response.data.input);
        }

        if (type === "Skype") {
          setSkypeData(response.data.input);
        }

        if (type === "Zoom") {
          setZoomData(response.data.input);
        }

        if (type === "Wi-Fi") {
          setWifiData(response.data.input);
        }

        if (type === "Event") {
          setEventData(response.data.input);
        }

        setActiveButton(type);
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

  return (
    <div>
      {!idFromURL && <Header letters={"CQ"} information={"Create QR"} />}
      {idFromURL && <Header letters={"UQ"} information={"Update QR"} />}

      <Box>
        <CarouselButtons
          activeButton={setActiveButton}
          selectedButton={activeButton}
        />
        <Box className="container-grcode">
          <InputGenerateCode
            linkData={setLinkData}
            textData={setTextData}
            emailData={setEmailData}
            phoneData={setPhoneData}
            activeButton={activeButton}
            smsData={setSmsData}
            whatsAppData={setWhatsAppData}
            wifiData={setWifiData}
            eventData={setEventData}
            zoomData={setZoomData}
            skypeData={setSkypeData}
            locationData={setLocationData}
            qrData={qrData}
          />

          <Box className="qr-code">
            <QRcode
              linkData={linkData}
              textData={textData}
              emailData={emailData}
              phoneData={phoneData}
              smsData={smsData}
              whatsAppData={whatsAppData}
              wifiData={wifiData}
              eventData={eventData}
              zoomData={zoomData}
              skypeData={skypeData}
              locationData={locationData}
              activeButton={activeButton}
              qrData={qrData}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Create;
