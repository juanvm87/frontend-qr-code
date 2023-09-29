import React from "react";
import { useState } from "react";

import "./Create.css";
import QRcode from "./viewCodes/QRCode";
import NavGenerateCodeLinks from "./Nav/NavGenerateCodeLinks";

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
  const [locationData, setLocationData] = useState("");

  return (
    <div className="container-grcode">
      <div className="container-div">
        <div className="nav-generate">
          <NavGenerateCodeLinks
            linkData={setLinkData}
            textData={setTextData}
            emailData={setEmailData}
            phoneData={setPhoneData}
            activeButton={setActiveButton}
            smsData={setSmsData}
            whatsAppData={setWhatsAppData}
            wifiData={setWifiData}
            eventData={setEventData}
            zoomData={setZoomData}
            skypeData={setSkypeData}
            locationData={setLocationData}
          />
        </div>
        <div className="qr-code">
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
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
