import React from "react";

const MapFrame = ({ latitude, longitude }) => {
  return (
    <iframe
      title="map"
      className="iframe_"
      src={`//maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
    ></iframe>
  );
};

export default MapFrame;
