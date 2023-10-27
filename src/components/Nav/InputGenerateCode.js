import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import React, { useEffect, useState } from "react";
import Map from "../Map/Map.js";
import "./NavGenerateCode.css";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";

export const InputGenerateCode = (props) => {
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState({
    to: "",
    subject: "",
    text: "",
  });
  const [location, setLocation] = useState({});
  const [sms, setSms] = useState({ phone: "", text: " " });
  const [whatsApp, setWhatsApp] = useState({ phone: "", text: " " });
  const [wifi, setWifi] = useState({
    authentication: "",
    id: "",
    password: "",
    hidden: false,
  });
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [zoom, setZoom] = useState({ id: "", password: "" });
  const [skype, setSkype] = useState({ id: "", type: "call" });
  const [eventData, setEventData] = useState({
    title: "",
    location: "",
    startTime: "",
    endTime: "",
    notes: "",
  });

  useEffect(() => {
    const getQrData = () => {
      if (props.qrData.type === "Link") {
        setLink(props.qrData.input.link);
      }
      if (props.qrData.type === "Text") {
        setText(props.qrData.input.text);
      }
      if (props.qrData.type === "Email") {
        setEmail({
          to: props.qrData.input.email,
          subject: props.qrData.input.subject,
          text: props.qrData.input.text,
        });
      }
      if (props.qrData.type === "Location") {
        setLocation(props.qrData.input);
      }
      if (props.qrData.type === "Phone") {
        setPhone(props.qrData.input.phone);
      }
      if (props.qrData.type === "SMS") {
        setSms({
          phone: props.qrData.input.phone,
          text: props.qrData.input.text,
        });
      }
      if (props.qrData.type === "WhatsApp") {
        setWhatsApp({
          phone: props.qrData.input.phone,
          text: props.qrData.input.text,
        });
      }
      if (props.qrData.type === "Skype") {
        setSkype({ id: props.qrData.input.id, type: props.qrData.input.type });
      }
      if (props.qrData.type === "Zoom") {
        setZoom({
          id: props.qrData.input.idMeeting,
          password: props.qrData.input.password,
        });
      }
      if (props.qrData.type === "Wi-Fi") {
        setWifi({
          authentication: props.qrData.input.authentication,
          id: props.qrData.input.id,
          password: props.qrData.input.password,
        });
      }
      if (props.qrData.type === "Event") {
        setEventData({
          title: props.qrData.input.title,
          location: props.qrData.input.location,
          startTime: props.qrData.input.startTime,
          endTime: props.qrData.input.endTime,
          notes: props.qrData.input.notes,
        });
      }
    };
    getQrData();
  }, [props.qrData]);

  const handlePhone = (newPhone) => {
    setPhone(newPhone);
    props.phoneData(newPhone);
  };

  const handleLinkChange = (event) => {
    const value = event.target.value;
    setLink(value);
    props.linkData(value);
  };
  const handleTextChange = (event) => {
    const value = event.target.value;
    setText(value);
    props.textData(value);
  };
  //validarte the email
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleEmailChange = () => {
    if (isValidEmail(email.to)) {
      props.emailData(email);
    }
  };

  const handleSmsChange = (field, value) => {
    let newData = { ...sms, [field]: value };
    setSms(newData);
    if (sms.phone.length > 6) {
      props.smsData(newData);
    }
  };

  const handleWhatsAppChange = (field, value) => {
    let newData = { ...whatsApp, [field]: value };
    setWhatsApp(newData);
    if (whatsApp.phone.length > 6) {
      props.whatsAppData(newData);
    }
  };

  const handleZoomChange = (field, value) => {
    const newData = { ...zoom, [field]: value };
    setZoom(newData);
    props.zoomData(newData);
  };
  const handleSkypeChange = (field, value) => {
    let newData = { ...skype, [field]: value };
    setSkype(newData);

    props.skypeData(newData);
  };

  const handleWifiChange = (field, value) => {
    let newData = { ...wifi, [field]: value };
    setWifi(newData);
    props.wifiData(newData);
    if (value === "no_password") {
      setIsEncrypted(true);
    } else {
      setIsEncrypted(false);
    }
  };

  const handleEventChange = (field, value) => {
    let newData = { ...eventData, [field]: value };
    setEventData(newData);
    props.eventData(newData);
  };
  const handleLocationChange = (value) => {
    props.locationData(value);
  };

  return (
    <>
      {props.activeButton === "Link" && (
        <div className="div-inputs">
          <h2>Link</h2>
          <TextField
            value={link}
            onChange={handleLinkChange}
            label="Link"
            variant="outlined"
            inputProps={{ maxLength: 100 }}
          />
        </div>
      )}
      {props.activeButton === "Text" && (
        <div className="div-inputs">
          <h2>Text</h2>

          <TextField
            value={text}
            onChange={handleTextChange}
            label="Text"
            variant="outlined"
            multiline
            rows={6}
            inputProps={{ maxLength: 400 }}
          />
        </div>
      )}
      {props.activeButton === "Email" && (
        <div className="div-inputs">
          <h2>Email</h2>
          <div className="div-email">
            <div className="container-fields-email">
              <TextField
                onChange={(event) => {
                  setEmail((prev) => ({ ...prev, to: event.target.value }));

                  handleEmailChange();
                }}
                value={email.to}
                label="Email to"
                variant="outlined"
                inputProps={{ maxLength: 50 }}
                sx={{ m: 1 }}
              />
              <TextField
                value={email.subject}
                onChange={(event) => {
                  setEmail((prev) => ({
                    ...prev,
                    subject: event.target.value,
                  }));
                  handleEmailChange();
                }}
                label="Subject"
                variant="outlined"
                inputProps={{ maxLength: 50 }}
                sx={{ m: 1 }}
              />
            </div>
            <TextField
              onChange={(event) => {
                setEmail((prev) => ({ ...prev, text: event.target.value }));
                handleEmailChange();
              }}
              label="Text"
              value={email.text}
              variant="outlined"
              multiline
              rows={6}
              inputProps={{ maxLength: 300 }}
              sx={{ m: 1 }}
            />
          </div>
        </div>
      )}
      {props.activeButton === "Location" && (
        <div className="div-inputs">
          <h2>Location</h2>
          <Map locationData={handleLocationChange} updateData={location} />
        </div>
      )}
      {props.activeButton === "Phone" && (
        <div className="div-inputs">
          <h2>Phone</h2>
          <MuiTelInput
            value={phone}
            onChange={handlePhone}
            defaultCountry="IN"
          />
        </div>
      )}
      {props.activeButton === "SMS" && (
        <div className="div-inputs">
          <h2>SMS</h2>
          <div className="div-sms">
            <MuiTelInput
              value={sms.phone}
              onChange={(value) => {
                handleSmsChange("phone", value);
              }}
              defaultCountry="IN"
            />
            <TextField
              onChange={(event) => {
                handleSmsChange("text", event.target.value);
              }}
              value={sms.text}
              label="Text"
              variant="outlined"
              multiline
              rows={6}
              style={{ marginTop: "10px" }}
              inputProps={{ maxLength: 350 }}
            />
          </div>
        </div>
      )}
      {props.activeButton === "WhatsApp" && (
        <div className="div-inputs">
          <h2>WhatsApp</h2>
          <div className="div-sms">
            <MuiTelInput
              value={whatsApp.phone}
              onChange={(value) => {
                handleWhatsAppChange("phone", value);
              }}
              defaultCountry="IN"
            />
            <TextField
              label="Text"
              variant="outlined"
              multiline
              value={whatsApp.text}
              rows={6}
              style={{ marginTop: "10px" }}
              inputProps={{ maxLength: 350 }}
              onChange={(event) => {
                handleWhatsAppChange("text", event.target.value);
              }}
            />
          </div>
        </div>
      )}
      {props.activeButton === "Skype" && (
        <div className="div-inputs">
          <h2>Skype</h2>
          <div className="dic-imput-skype">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={skype.type || "call"}
                name="radio-buttons-group"
                row
              >
                <FormControlLabel
                  onChange={(event) => {
                    handleSkypeChange("type", event.target.value);
                  }}
                  value="call"
                  control={<Radio />}
                  label="Call"
                />
                <FormControlLabel
                  onChange={(event) => {
                    handleSkypeChange("type", event.target.value);
                  }}
                  value="chat"
                  control={<Radio />}
                  label="Chat"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              onChange={(event) => {
                handleSkypeChange("id", event.target.value);
              }}
              inputProps={{ maxLength: 50 }}
              className="text-field"
              label="Username"
              value={skype.id}
              variant="outlined"
            />
          </div>
        </div>
      )}
      {props.activeButton === "Zoom" && (
        <div className="div-inputs">
          <h2>Zoom</h2>
          <div className="container-fields">
            <TextField
              onChange={(event) => {
                handleZoomChange("id", event.target.value);
              }}
              inputProps={{ maxLength: 100 }}
              style={{ margin: "0 10px 0 0" }}
              label="Meeting Id"
              value={zoom.id}
              variant="outlined"
            />
            <TextField
              onChange={(event) => {
                handleZoomChange("password", event.target.value);
              }}
              inputProps={{ maxLength: 100 }}
              label="Password"
              value={zoom.password}
              variant="outlined"
            />
          </div>
        </div>
      )}
      {props.activeButton === "Wi-Fi" && (
        <div className="div-inputs">
          <h2>Wi-Fi</h2>
          <div className="container-fields-wifi">
            <FormControl sx={{ minWidth: "40%", margin: "5px" }}>
              <InputLabel id="demo-select-small-label">Network Type</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={wifi.authentication}
                label="NetworkType"
                onChange={(value) => {
                  handleWifiChange("authentication", value.target.value);
                }}
              >
                <MenuItem value={"WEP"}>WEP</MenuItem>
                <MenuItem value={"WPA"}>WPA/WPA2</MenuItem>
                <MenuItem value={"no_password"}>No encryption</MenuItem>
              </Select>
            </FormControl>
            <div className="wifi-div-textFields">
              <TextField
                onChange={(value) => {
                  handleWifiChange("id", value.target.value);
                }}
                value={wifi.id}
                sx={{ margin: "5px" }}
                className="text-fields"
                label="Network Name (SSID)"
                variant="outlined"
                inputProps={{ maxLength: 100 }}
              />
              <TextField
                onChange={(value) => {
                  handleWifiChange("password", value.target.value);
                }}
                disabled={isEncrypted}
                value={wifi.password}
                className="text-fields"
                label="Password"
                variant="outlined"
                sx={{ margin: "5px" }}
                inputProps={{ maxLength: 100 }}
              />
            </div>
          </div>
        </div>
      )}
      {props.activeButton === "Event" && (
        <div className="div-inputs">
          <h2>Event</h2>
          <div className="div-inputs-event">
            <div className="div-inputs-texfile-event">
              <TextField
                className="event-title"
                value={eventData.title}
                onChange={(e) => handleEventChange("title", e.target.value)}
                style={{ margin: "5px", width: "270px" }}
                label="Event title"
                variant="outlined"
                inputProps={{ maxLength: 100 }}
              />
              <TextField
                value={eventData.location}
                onChange={(e) => handleEventChange("location", e.target.value)}
                style={{ margin: "5px", width: "270px" }}
                label="Location"
                variant="outlined"
                inputProps={{ maxLength: 100 }}
              />
            </div>
            <div className="div-inputs-texfile-event">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ margin: "5px ", width: "270px" }}
                  components={["DateTimeField"]}
                >
                  <DateTimeField
                    className="dateTime-event"
                    onChange={(value) => {
                      if (value && value["$d"]) {
                        handleEventChange("startTime", value["$d"]);
                      }
                    }}
                    label="Start Event"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{ margin: "5px ", width: "270px" }}
                  components={["DateTimeField"]}
                >
                  <DateTimeField
                    className="dateTime-event"
                    onChange={(value) => {
                      if (value && value["$d"]) {
                        handleEventChange("endTime", value["$d"]);
                      }
                    }}
                    label="End Event"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <TextField
              onChange={(event) => {
                handleEventChange("notes", event.target.value);
              }}
              style={{ minWidth: "100%", margin: "5px" }}
              label="Notes"
              variant="outlined"
              multiline
              rows={4}
              inputProps={{ maxLength: 300 }}
              value={eventData.notes}
            />
          </div>
        </div>
      )}
    </>
  );
};
