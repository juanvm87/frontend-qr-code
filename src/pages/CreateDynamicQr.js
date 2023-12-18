import React, { useEffect, useState } from "react";
import "../components/common/Create.css";
import QRcode from "../CreateComponents/QRCode";
import Header from "../components/common/Header";
import CarouselButtons from "../CreateComponents/CarouselButtons";
import { InputGenerateCode } from "../CreateComponents/InputGenerateCode";
import { useParams } from "react-router";
import { createQrAPI, getQr, updateQr } from "../services/RestApi";
import { Box } from "@mui/material";

const CreateDynamicQr = () => {
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
  const [isDynamic, setIsDinamic] = useState(false);
  const [dynamicLink, setDynamicLink] = useState("");
  const [dynamicId, setDynamicId] = useState("");
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);
  const [dynamicInput, setDynamicInput] = useState({});
  const [qrLink, setQrLink] = useState("");

  const handleQrLink = (value) => {
    setQrLink(value);
  };
  const updateDynamic = async (valueId) => {
    try {
      const updateCode = {
        title: "",
        type: activeButton,
        link: qrLink ? qrLink : `http://${window.location.origin}/login`,
        input: dynamicInput,
      };
      let id = dynamicId ? dynamicId : valueId;
      await updateQr(id, updateCode);
    } catch (error) {
      console.log(error);
    }
  };
  const generateDynamicQr = async () => {
    try {
      setIsDinamic(true);

      const dynamicQr = {
        title: "",
        type: "Link",
        link: `http:${window.location.origin}/login`,
        input: { link: "" },
        isDynamic: true,
        ownerId: "",
      };
      const reply = await createQrAPI(dynamicQr);

      setDynamicId(reply.data._id);
      const newDynamicLink = `${window.location.origin}/dynamic-qr/${reply.data._id}`;
      setDynamicLink(newDynamicLink);

      updateDynamic(reply.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isGeneratingQr && isDynamic && !idFromURL && dynamicId) {
      updateDynamic();
    }
  }, [dynamicInput && qrLink]);

  useEffect(() => {
    if (isGeneratingQr && !isDynamic && !idFromURL) {
      generateDynamicQr();
    }
  }, [isGeneratingQr]);

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
      {!idFromURL && (
        <Header letters={"CDQ"} information={"Create Dynamic QR"} />
      )}
      {idFromURL && <Header letters={"UQ"} information={"Update QR"} />}

      <Box className="box-container">
        <CarouselButtons
          activeButton={setActiveButton}
          selectedButton={activeButton}
          isDynamic={isDynamic}
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
            isGeneratingQr={setIsGeneratingQr}
            dynamicInput={setDynamicInput}
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
              dynamicLink={dynamicLink}
              qrLink={handleQrLink}
              dinamicQrId={dynamicId}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateDynamicQr;
