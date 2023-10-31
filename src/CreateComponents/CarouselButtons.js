import React from "react";
import styles from "./Carousel.module.css";
import linkIcon from "../components/Images/qrimages/link.png";
import textIcon from "../components/Images/qrimages/text.png";
import emailIcon from "../components/Images/qrimages/email.png";
import locationIcon from "../components/Images/qrimages/location.png";
import phoneIcon from "../components/Images/qrimages/phone.png";
import smsIcon from "../components/Images/qrimages/sms.png";
import whatsappIcon from "../components/Images/qrimages/whatsapp.png";
import skypeIcon from "../components/Images/qrimages/skype.png";
import zoomIcon from "../components/Images/qrimages/zoom.png";
import wifiIcon from "../components/Images/qrimages/wifi.png";
import eventIcon from "../components/Images/qrimages/event.png";
const CarouselButtons = (props) => {
  const buttonsData = [
    {
      id: 1,
      src: linkIcon,
      alt: "Link",
      label: "Link",
    },
    {
      id: 2,
      src: textIcon,
      alt: "Text",
      label: "Text",
    },
    {
      id: 3,
      src: emailIcon,
      alt: "Email",
      label: "Email",
    },
    {
      id: 4,
      src: locationIcon,
      alt: "Location",
      label: "Location",
    },
    {
      id: 5,
      src: phoneIcon,
      alt: "Phone",
      label: "Phone",
    },
    {
      id: 6,
      src: smsIcon,
      alt: "SMS",
      label: "SMS",
    },
    {
      id: 7,
      src: whatsappIcon,
      alt: "WhatsApp",
      label: "WhatsApp",
    },
    {
      id: 8,
      src: skypeIcon,
      alt: "Skype",
      label: "Skype",
    },
    {
      id: 9,
      src: zoomIcon,
      alt: "Zoom",
      label: "Zoom",
    },
    {
      id: 10,
      src: wifiIcon,
      alt: "Wi-Fi",
      label: "Wi-Fi",
    },
    {
      id: 11,
      src: eventIcon,
      alt: "Event",
      label: "Event",
    },
  ];
  const CustomButton = ({ src, alt, label }) => (
    <button
      onClick={() => {
        props.activeButton(label);
      }}
      className={styles.jss209}
      style={props.selectedButton === label ? { border: "5px solid blue" } : {}}
    >
      <div className={styles.jss211}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className={styles.jss213}>{label}</div>
    </button>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        inset: 0,
        overflow: "auto",
        overflowY: "hidden",
        marginTop: "17px",
        marginBottom: "-17px",
        scrollBehavior: "smooth",
      }}
    >
      <div className={styles.container}>
        {buttonsData.map((button) => (
          <CustomButton key={button.id} {...button} />
        ))}
      </div>
    </div>
  );
};

export default CarouselButtons;
