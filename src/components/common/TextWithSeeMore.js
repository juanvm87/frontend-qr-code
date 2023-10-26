import React, { useState } from "react";
import Typography from "@mui/material/Typography";

export const TextWithSeeMore = ({ title, text, maxChars = 100 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Typography variant="h5">
      <span style={{ fontWeight: "bold" }}>{title}</span>
      <br />
      {text.length > maxChars && !expanded ? (
        <>
          {text.slice(0, maxChars)}
          <span>...</span>
          <span
            style={{ color: "rgb(68 151 237)", cursor: "pointer" }}
            onClick={toggleExpanded}
          >
            See more
          </span>
        </>
      ) : (
        text
      )}
      {expanded && (
        <>
          {text.slice(maxChars)}
          <br />
          <span
            style={{ color: "#8bc5f8", cursor: "pointer" }}
            onClick={toggleExpanded}
          >
            See less
          </span>
        </>
      )}
    </Typography>
  );
};
