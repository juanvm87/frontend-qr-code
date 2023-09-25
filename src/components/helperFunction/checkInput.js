import React from "react";

export const checkInput = (props) => {
  if (props.activeButton === "Link") {
    return { link: props.linkData };
  }
  if (props.activeButton === "Text") {
    return { text: props.textData };
  }
  if (props.activeButton === "Email") {
    return {
      email: props.emailData.to,
      subject: props.emailData.subject,
      text: props.emailData.text,
    };
  }
  if (props.activeButton === "Zoom") {
    return {
      idMeeting: props.zoomData.id,
      password: props.zoomData.password,
    };
  }
  if (props.activeButton === "Location") {
    let link = props.locationData;
    // Use the URLSearchParams function to retrieve URL parameters
    const urlParams = new URLSearchParams(new URL(link).search);

    // Extract the values of latitude and longitude from the parameters
    const lat = urlParams.get("q").split(",")[0];
    const long = urlParams.get("q").split(",")[1];

    return {
      latitude: lat,
      longitude: long,
    };
  }
  if (props.activeButton === "Phone") {
    return { phone: props.phoneData };
  }
  if (props.activeButton === "SMS") {
    return {
      phone: props.smsData.phone,
      text: props.smsData.text,
    };
  }
  if (props.activeButton === "WhatsApp") {
    return {
      phone: props.whatsAppData.phone,
      text: props.whatsAppData.text,
    };
  }
  if (props.activeButton === "Event") {
    return {
      title: props.eventData.title,
      notes: props.eventData.notes,
      setartDate: props.eventData.startTime,
      endDate: props.eventData.endTime,
      location: props.eventData.location,
    };
  }
  if (props.activeButton === "Wi-Fi") {
    return {
      id: props.wifiData.id,
      password: props.wifiData.password,
      authentication: props.wifiData.authentication,
    };
  }
  if (props.activeButton === "Skype") {
    return {
      id: props.skypeData.id,
      skypeType: props.skypeData.type,
    };
  }
};
