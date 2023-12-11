import React, { useEffect, useState, useRef, useContext } from "react";
import { Button, Card } from "@mui/material";
import QRCode from "react-qr-code";
import "./QRcode.css";
import { useParams } from "react-router";
import { BsFiletypePdf, BsFiletypeSvg, BsFiletypePng } from "react-icons/bs";
import { createQrAPI, updateQr } from "../services/RestApi";
import { checkInput } from "../components/helperFunction/checkInput";
import { PopUpModal } from "../components/common/PopUpModal";
import { handleformattedDate } from "../components/helperFunction/formatedDate";
import { handleDownload } from "../components/helperFunction/handleDownload";
import { useNavigate } from "react-router-dom";
import { MyHandleContext } from "../store/handleContext";

const QRcode = (props) => {
  const [linkData, setLinkData] = useState("");
  const [downloadType, setDownloadType] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [qrData, setQrData] = useState({});
  const { selected, setSelected } = useContext(MyHandleContext);
  const [isDynamic, setIsDynamic] = useState(false);
  const [dynamicLink, setDynamicLink] = useState("");
  const idFromURL = useParams().id;
  const qrCodeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLinkForDynamic = (link) => {
      props.qrLink(link);
    };

    if (props.qrLink !== undefined) {
      handleLinkForDynamic(linkData);
    }
  }, [linkData]);

  useEffect(() => {
    const handleDynamic = () => {
      setIsDynamic(true);
      setDynamicLink(props.dynamicLink);
    };
    if (props.dynamicLink !== undefined) {
      handleDynamic();
    }
  }, [props.dynamicLink]);

  useEffect(() => {
    const getQrDataAPI = async () => {
      try {
        if (idFromURL) {
          setIsUpdating(true);

          setQrData(props.qrData);
          setLinkData(props.qrData.link);
        } else {
          setIsUpdating(false);
          setQrData("");
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    getQrDataAPI();
  }, [props.qrData]);

  useEffect(() => {
    function handlerTextData() {
      try {
        setLinkData(props.textData);
      } catch (error) {
        console.error("Error fetching textData:", error);
      }
    }
    handlerTextData();
  }, [props.textData]);

  useEffect(() => {
    function handleLinkData() {
      try {
        setLinkData("https://" + props.linkData);
      } catch (error) {
        console.error("Error fetching linkData:", error);
      }
    }
    handleLinkData();
  }, [props.linkData]);

  useEffect(() => {
    function handleEmailData() {
      try {
        const edata = `mailto:${props.emailData.email}?subject=${props.emailData.subject}&body=${props.emailData.text}`;
        setLinkData(edata);
      } catch (error) {
        console.error("Error fetching emailData:", error);
      }
    }
    handleEmailData();
  }, [props.emailData]);

  useEffect(() => {
    function handleZoomData() {
      try {
        const idMeeting = props.zoomData.id;
        const password = props.zoomData.password;
        const edata = `https://zoom.us/j/${idMeeting}?pwd=${password}`;
        setLinkData(edata);
      } catch (error) {
        console.error("Error fetching emailData:", error);
      }
    }
    handleZoomData();
  }, [props.zoomData]);

  useEffect(() => {
    function handlePhoneData() {
      try {
        const phone = `TEL:${props.phoneData.phone}`;
        setLinkData(phone);
      } catch (error) {
        console.error("Error fetching phoneData:", error);
      }
    }
    handlePhoneData();
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
        if (isDynamic) {
          const encodedData = encodeURIComponent(eventDataString22);
          const dataUri = `data:text/calendar;charset=utf8,${encodedData}`;

          setLinkData(dataUri);
        } else {
          setLinkData(eventDataString22);
        }
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
        if (isDynamic) {
          const encodedData = encodeURIComponent(wifiData);
          const dataUri = `data:text/plain;charset=utf8,${encodedData}`;
          setLinkData(dataUri);
        } else {
          setLinkData(wifiData);
        }
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
      const id = idFromURL ? idFromURL : props.dinamicQrId;
      updateQr(id, updateCode);
      setSelected("View");
      setTimeout(() => {
        navigate("/view");
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
        isDynamic: false,
        ownerId: "",
      };
      createQrAPI(newData);
      setSelected("View");
      setTimeout(() => {
        navigate("/view");
      }, 500);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <Card className="qr-card">
      <QRCode
        size={200}
        id="qr-picture"
        className="qr-code-img"
        value={
          isDynamic || (qrData.isDynamic && isUpdating) ? dynamicLink : linkData
        }
        ref={qrCodeRef}
      />
      {linkData && !qrData && (
        <div className="container-save">
          <div className="container-btn-qr">
            <Button
              className="download-btn-qr"
              onClick={() => {
                setDownloadType("pdf");
              }}
            >
              <BsFiletypePdf className="file-type-download" />
            </Button>
            <Button
              className="download-btn-qr"
              onClick={() => {
                setDownloadType("png");
              }}
            >
              <BsFiletypePng className="file-type-download" />
            </Button>
            <Button
              className="download-btn-qr"
              onClick={() => {
                setDownloadType("svg");
              }}
            >
              <BsFiletypeSvg className="file-type-download" />
            </Button>
          </div>
          <div>
            <PopUpModal
              saveData={saveData}
              setDownloadType={setDownloadType}
              isUpdating={isUpdating}
              handleUpdate={handleUpdate}
              isDynamic={isDynamic}
            />
          </div>
        </div>
      )}
      {isUpdating && (
        <div className="updating-div">
          <PopUpModal
            saveData={saveData}
            setDownloadType={setDownloadType}
            isUpdating={isUpdating}
            handleUpdate={handleUpdate}
            isDynamic={qrData.isDynamic}
          />
        </div>
      )}
    </Card>
  );
};

export default QRcode;
