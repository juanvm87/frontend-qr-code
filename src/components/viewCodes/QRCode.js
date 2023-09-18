import React, { useEffect, useState, useRef } from "react";
import { Canvg } from "canvg";
import jsPDF from "jspdf";
import { Button, Card, CardContent, Container } from "@mui/material";
import QRCode from "react-qr-code";
import "./QRcode.css";
import { BsFiletypePdf, BsFiletypeSvg, BsFiletypePng } from "react-icons/bs";

const QRcode = (props) => {
  const [data, setData] = useState("");
  const [buttons, setbuttons] = useState(false);
  const [downloadType, setDownloadType] = useState(null);
  const qrCodeRef = useRef(null);
  useEffect(() => {
    function HandlerTextData() {
      try {
        setData(props.textData);
      } catch (error) {
        console.error("Error fetching textData:", error);
      }
    }
    HandlerTextData();
  }, [props.textData]);

  useEffect(() => {
    function HandleData() {
      try {
        setData("http://" + props.linkData);
        // setData(`WIFI:T:${authentication};S:${name};P:${password};H:${hidden};`);
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
        setData(edata);
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
        setData(edata);
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
        setData(phone);
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
        setData(smsData);
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
          setData(whatsAppData);
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
        const formattedStartDate = props.eventData.startTime;
        const formattedEndDate = props.eventData.endTime;

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

        setData(eventDataString22);
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
        setData(wifiData);
      } catch (error) {
        console.error("Error fetching wifiData:", error);
      }
    }
    handleWifiData();
  }, [props.wifiData]);
  useEffect(() => {
    function handleLocationData() {
      try {
        let dataL = props.locationData;

        setData(dataL);
      } catch (err) {
        console.error("Error fetching locationData:", err);
      }
    }
    handleLocationData();
  }, [props.locationData]);

  useEffect(() => {
    function handleSkypeData() {
      let newData;
      try {
        if (props.skypeData.type === "chat") {
          newData = props.skypeData.id
            ? `skype:${props.skypeData.id}?call`
            : "";
        } else {
          newData = props.skypeData.id
            ? `skype:${props.skypeData.id}?chat`
            : "";
        }
        setData(newData);
      } catch (error) {
        console.error("Error fetching SkypeData:", error);
      }
    }
    handleSkypeData();
  }, [props.skypeData]);
  useEffect(() => {
    setData("");
    setbuttons(false);
  }, [props.activeButton]);

  useEffect(() => {
    if (downloadType) {
      const qrCodeSvgElement = qrCodeRef.current;

      if (qrCodeSvgElement) {
        if (downloadType === "pdf") {
          const pdf = new jsPDF();
          const width = qrCodeSvgElement.offsetWidth;
          const height = qrCodeSvgElement.offsetHeight;

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.width = width;
          canvas.height = height;

          Canvg.from(context, qrCodeSvgElement.outerHTML).then((canvg) => {
            canvg.start();
            const svgData = canvas.toDataURL("image/svg+xml");
            pdf.addImage(svgData, "SVG", 10, 10, width, height);
            pdf.save("qrcode.pdf");
          });
        } else if (downloadType === "png") {
          // Handle PNG download
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const width = qrCodeSvgElement.offsetWidth;
          const height = qrCodeSvgElement.offsetHeight;

          canvas.width = width;
          canvas.height = height;

          Canvg.from(context, qrCodeSvgElement.outerHTML).then((canvg) => {
            canvg.start();
            const pngData = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = pngData;
            a.download = "qrcode.png";
            a.click();
          });
        } else if (downloadType === "svg") {
          // Handle SVG download
          const svgData = new XMLSerializer().serializeToString(
            qrCodeSvgElement
          );
          const blob = new Blob([svgData], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "qrcode.svg";
          a.click();
          URL.revokeObjectURL(url);
        }
        setDownloadType(null); // Reset the download type after processing
      }
    }
  }, [downloadType]);

  return (
    <Card>
      <CardContent className="qr-card-content">
        <QRCode
          id="qr-picture"
          className="qr-code"
          value={data}
          ref={qrCodeRef}
        />
        {data && (
          <Button
            onClick={() => {
              setDownloadType(null); // Reset download type
              setbuttons(true);
            }}
            className="btn-save"
            disabled={!data}
          >
            Save
          </Button>
        )}
        {buttons && (
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
        )}
      </CardContent>
    </Card>
  );
};

export default QRcode;