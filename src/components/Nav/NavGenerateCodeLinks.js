import React, { useEffect, useState } from "react";
import {
  Link as LinkIcon,
  TextSnippet as TextSnippetIcon,
  Place as PlaceIcon,
  LocalPhone as LocalPhoneIcon,
  Sms as SmsIcon,
  WhatsApp as WhatsAppIcon,
  Wifi as WifiIcon,
  Event as EventIcon,
  Email,
} from "@mui/icons-material";
import { useParams } from "react-router";
import "./NavGenerateCode.css";
import { AiFillSkype } from "react-icons/ai";
import { BiLogoZoom } from "react-icons/bi";
import NavButton from "./NavButton";
import { InputGenerateCode } from "./InputGenerateCode";
import { getQr } from "../../services/RestApi";

const NavGenerateCodeLinks = (props) => {
  const [activeButton, setActiveButton] = useState("Link");
  const idFromURL = useParams().id;
  const [qrData, setQrData] = useState({});

  const getQrDataAPI = async () => {
    try {
      if (idFromURL) {
        const response = await getQr(idFromURL);
        const type = response.data.type;
        setQrData(response.data);
        props.activeButton(type);
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

  const handleNavigation = (componentName) => {
    setActiveButton(componentName);
    props.activeButton(componentName);
  };

  const setLinkData = (val) => {
    props.linkData(val);
  };
  const setTextData = (val) => {
    props.textData(val);
  };
  const setEmailData = (val) => {
    props.emailData(val);
  };
  const setPhoneData = (val) => {
    props.phoneData(val);
  };
  const setSmsData = (val) => {
    props.smsData(val);
  };
  const setWhatsAppData = (val) => {
    console.log("whatsApp 68 navGenerate", val);
    props.whatsAppData(val);
  };
  const setWifiData = (val) => {
    props.wifiData(val);
  };
  const setEventData = (val) => {
    props.eventData(val);
  };
  const setZoomData = (val) => {
    props.zoomData(val);
  };
  const setSkypeData = (val) => {
    props.skypeData(val);
  };
  const setLocationData = (val) => {
    props.locationData(val);
  };

  return (
    <div className="container-generate-links">
      <div className="nav-container">
        <div className="btn-list">
          <NavButton
            icon="icon"
            name="Link"
            handleNavigation={handleNavigation}
            activeButton={activeButton}
          >
            <LinkIcon />
          </NavButton>

          <NavButton
            icon="icon"
            name="Text"
            handleNavigation={handleNavigation}
            activeButton={activeButton}
          >
            <TextSnippetIcon />
          </NavButton>

          <NavButton
            icon="icon"
            name="Email"
            handleNavigation={handleNavigation}
            activeButton={activeButton}
          >
            <Email />
          </NavButton>

          <NavButton
            icon="icon"
            name="Location"
            handleNavigation={handleNavigation}
            activeButton={activeButton}
          >
            <PlaceIcon />
          </NavButton>

          <NavButton
            icon="icon"
            name="Phone"
            handleNavigation={handleNavigation}
            activeButton={activeButton}
          >
            <LocalPhoneIcon />
          </NavButton>

          <NavButton
            icon="icon"
            name="SMS"
            handleNavigation={handleNavigation}
            activeButton={activeButton}
          >
            <SmsIcon />
          </NavButton>
        </div>
        <div className="btn-list">
          <NavButton
            icon="icon"
            name="WhatsApp"
            handleNavigation={handleNavigation}
            activeButton={activeButton}
          >
            <WhatsAppIcon />
          </NavButton>

          <NavButton
            icon="icon"
            name="Skype"
            handleNavigation={handleNavigation}
            activeButton={activeButton}
          >
            <AiFillSkype style={{ fontSize: "25px" }} />
          </NavButton>

          <NavButton
            icon="icon"
            name="Zoom"
            handleNavigation={handleNavigation}
            activeButton={activeButton}
          >
            <BiLogoZoom style={{ fontSize: "25px" }} />
          </NavButton>

          <NavButton
            icon="icon"
            name="Wi-Fi"
            handleNavigation={handleNavigation}
            activeButton={activeButton}
          >
            <WifiIcon />
          </NavButton>

          <NavButton
            icon="icon"
            name="Event"
            handleNavigation={handleNavigation}
            activeButton={activeButton}
          >
            <EventIcon />
          </NavButton>
        </div>
      </div>
      <InputGenerateCode
        emailData={setEmailData}
        linkData={setLinkData}
        textData={setTextData}
        phoneData={setPhoneData}
        smsData={setSmsData}
        whatsAppData={setWhatsAppData}
        wifiData={setWifiData}
        activeButton={activeButton}
        eventData={setEventData}
        zoomData={setZoomData}
        skypeData={setSkypeData}
        locationData={setLocationData}
        qrData={qrData}
      />
    </div>
  );
};

export default NavGenerateCodeLinks;
