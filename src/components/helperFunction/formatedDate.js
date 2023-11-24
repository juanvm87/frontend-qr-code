import React from "react";

export const handleformattedDate = (date) => {
  const originalDate = new Date(date);
  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
  const day = originalDate.getDate().toString().padStart(2, "0");
  const hours = originalDate.getHours().toString().padStart(2, "0");
  const minutes = originalDate.getMinutes().toString().padStart(2, "0");
  const seconds = originalDate.getSeconds().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};
