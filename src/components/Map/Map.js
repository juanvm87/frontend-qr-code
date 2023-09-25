import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import "./Map.css";
import MapFrame from "./MapFrame"; // Import the MapFrame component
import SearchIcon from "@mui/icons-material/Search";
const Map = (props) => {
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    const handleData = () => {
      props.locationData(
        longitude && latitude
          ? `http://maps.google.com/maps?q=${latitude},${longitude}`
          : ""
      );
    };
    handleData();
  }, [latitude, longitude]);

  const getReference = async (e) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data[0]) {
        setLatitude(response.data[0]?.lat || 0);
        setLongitude(response.data[0]?.lon || 0);
      } else {
        console.error("No data found in the response.");
      }
    } catch (error) {
      console.error("Error In get all referrals-->", error);
    }
  };
  const handleEnter = async (event) => {
    if (event.key === "Enter") {
      await getReference();
    }
  };

  return (
    <>
      <div className="container-location">
        <div className="text-field-map">
          <TextField
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={handleEnter}
            label="Location"
            variant="outlined"
            autoComplete="off"
          />
          <Button className="btn-map" title="Generate" onClick={getReference}>
            <SearchIcon />
          </Button>
        </div>

        <TextField
          onChange={(event) => {
            setLatitude(event.target.value);
          }}
          value={latitude}
          label="latitude"
          className="text-field-map"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          onChange={(event) => {
            setLongitude(event.target.value);
          }}
          value={longitude}
          label="longitude"
          className="text-field-map"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <MapFrame latitude={latitude} longitude={longitude} />

      <br />
    </>
  );
};

export default Map;
