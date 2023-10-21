import React, { useState } from "react";
import Typography from "@mui/material/Typography";

export const TextWithSeeMore = ({ text, maxChars = 100 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Typography variant="body1">
      {text.length > maxChars && !expanded ? (
        <>
          {text.slice(0, maxChars)}
          <span>...</span>
          <span
            style={{ color: "gray", cursor: "pointer" }}
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
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={toggleExpanded}
          >
            See less
          </span>
        </>
      )}
    </Typography>
  );
};
