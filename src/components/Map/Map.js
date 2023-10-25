import React, { useEffect, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import "./Map.css";
import MapFrame from "./MapFrame"; // Import the MapFrame component
import SearchIcon from "@mui/icons-material/Search";

const Map = (props) => {
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    const fetchupdateData = () => {
      setLocation(props.updateData.place);
      setLatitude(props.updateData.latitude);
      setLongitude(props.updateData.longitude);
    };
    fetchupdateData();
  }, [props.updateData]);
  useEffect(() => {
    const handleData = () => {
      const data =
        longitude && latitude
          ? `http://maps.google.com/maps?q=${latitude},${longitude}`
          : "";
      props.locationData({ link: data, place: location });
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
            sx={{ margin: "5px" }}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={handleEnter}
            label="Location"
            variant="outlined"
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={getReference}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <TextField
            sx={{ margin: "5px" }}
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
            sx={{ margin: "5px" }}
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
      </div>

      <MapFrame latitude={latitude} longitude={longitude} />

      <br />
    </>
  );
};

export default Map;
