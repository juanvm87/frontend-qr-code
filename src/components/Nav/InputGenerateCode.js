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
import React, { useState } from "react";
import Map from "../Map/Map.js";
import "./NavGenerateCode.css";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { fi } from "date-fns/locale";

export const InputGenerateCode = (props) => {
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState({
    to: "",
    subject: "",
    text: "",
  });
  const [sms, setSms] = useState({ phone: "", text: " " });
  const [whatsApp, setWhatsApp] = useState({ phone: "", text: " " });
  const [wifi, setWifi] = useState({
    authentication: "",
    id: " ",
    password: "",
    hidden: false,
  });
  const [zoom, setZoom] = useState({ id: "", password: "" });
  const [skype, setSkype] = useState({ id: "", type: "" });
  const [networkType, setNetworkType] = useState("");
  const [location, setLocation] = useState({ lon: "", lat: "" });
  const [eventData, setEventData] = useState({
    title: "",
    location: "",
    startTime: "",
    endTime: "",
    reminder: 0, // Default to 0 for "Event Start"
    link: "",
    notes: "",
  });

  const handleformattedDate = (date) => {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
    const day = originalDate.getDate().toString().padStart(2, "0");
    const hours = originalDate.getHours().toString().padStart(2, "0");
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");
    const seconds = originalDate.getSeconds().toString().padStart(2, "0");

    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };
  const handlePhone = (newPhone) => {
    setPhone(newPhone);
    props.phoneData(newPhone);
  };

  const handleNetworkType = (event) => {
    setNetworkType(event.target.value);
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
            onChange={handleLinkChange}
            label="Link"
            variant="outlined"
          />
        </div>
      )}
      {props.activeButton === "Text" && (
        <div className="div-inputs">
          <h2>Text</h2>

          <TextField
            onChange={handleTextChange}
            label="Text"
            variant="outlined"
            multiline
            rows={6}
          />
        </div>
      )}
      {props.activeButton === "Email" && (
        <div className="div-inputs">
          <h2>Email</h2>
          <div className="div-sms">
            <div className="container-fields">
              <TextField
                sx={{ mr: 2 }}
                onChange={(event) => {
                  setEmail((prev) => ({ ...prev, to: event.target.value }));

                  handleEmailChange();
                }}
                className="text-fields"
                label="Email to"
                variant="outlined"
              />
              <TextField
                onChange={(event) => {
                  setEmail((prev) => ({
                    ...prev,
                    subject: event.target.value,
                  }));
                  handleEmailChange();
                }}
                className="text-fields"
                label="Subject"
                variant="outlined"
              />
            </div>
            <TextField
              onChange={(event) => {
                setEmail((prev) => ({ ...prev, text: event.target.value }));
                handleEmailChange();
              }}
              label="Text"
              variant="outlined"
              multiline
              rows={6}
              style={{ marginTop: "10px" }}
            />
          </div>
        </div>
      )}
      {props.activeButton === "Location" && (
        <div className="div-inputs">
          <h2>Location</h2>
          <Map locationData={handleLocationChange} />
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
              label="Text"
              variant="outlined"
              multiline
              rows={6}
              style={{ marginTop: "10px" }}
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
              rows={6}
              style={{ marginTop: "10px" }}
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
                defaultValue="call"
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
              className="text-field"
              label="Username"
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
              style={{ margin: "0 10px 0 0" }}
              label="Meeting Id"
              value={zoom.id}
              variant="outlined"
            />
            <TextField
              onChange={(event) => {
                handleZoomChange("password", event.target.value);
              }}
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
          <div className="container-fields">
            <FormControl
              sx={{ minWidth: "20%", margin: "0 10px 0 0" }}
              size="medium"
            >
              <InputLabel id="demo-select-small-label">Network Type</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={networkType}
                label="NetworkType"
                onChange={(value) => {
                  handleWifiChange("authentication", value.target.value);
                  handleNetworkType(value);
                }}
              >
                <MenuItem value={"WEP"}>WEP</MenuItem>
                <MenuItem value={"WPA"}>WPA/WPA2</MenuItem>
                <MenuItem value={"nopass"}>No encryption</MenuItem>
              </Select>
            </FormControl>
            <TextField
              onChange={(value) => {
                handleWifiChange("id", value.target.value);
              }}
              className="text-fields"
              label="Network Name (SSID)"
              variant="outlined"
            />
            <TextField
              onChange={(value) => {
                handleWifiChange("password", value.target.value);
              }}
              className="text-fields"
              label="Password"
              variant="outlined"
            />
          </div>
        </div>
      )}
      {props.activeButton === "Event" && (
        <div className="div-inputs">
          <h2>Event</h2>
          <div className="div-inputs-event">
            <div className="div-inputs-texfile">
              <TextField
                onChange={(e) => handleEventChange("title", e.target.value)}
                style={{ margin: "10px 10px 0px 0px", width: "270px" }}
                label="Event title"
                variant="outlined"
              />
              <TextField
                onChange={(e) => handleEventChange("location", e.target.value)}
                style={{ margin: "10px 10px 0px 0px", width: "270px" }}
                label="Location"
                variant="outlined"
              />
            </div>
            <div className="div-inputs-texfile">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimeField"]}>
                  <DateTimeField
                    onChange={(value) => {
                      if (value && value["$d"]) {
                        handleEventChange(
                          "startTime",
                          handleformattedDate(value["$d"])
                        );
                      }
                    }}
                    style={{ margin: "10px 10px 0px 0px", padding: "0px" }}
                    label="Start Event"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimeField"]}>
                  <DateTimeField
                    onChange={(value) => {
                      if (value && value["$d"]) {
                        handleEventChange(
                          "endTime",
                          handleformattedDate(value["$d"])
                        );
                      }
                    }}
                    style={{ margin: "10px 10px 0px 0px", padding: "0px" }}
                    label="End Event"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <TextField
              onChange={(event) => {
                handleEventChange("notes", event.target.value);
              }}
              style={{ minWidth: "100%", margin: "10px 10px 0px 0px" }}
              label="Notes"
              variant="outlined"
              multiline
              rows={4}
            />
          </div>
        </div>
      )}
    </>
  );
};
