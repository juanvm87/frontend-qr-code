import React, { useState, useEffect } from "react";
import UserCard from "./common/UserCard";
import { Typography } from "@mui/material";
import { getAllOwnerQr } from "../services/RestApi";

export default function View() {
  const [data, setData] = useState([]);

  const fetchData = async (id) => {
    try {
      const response = await getAllOwnerQr(id);
      setData(response.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  //TODO change ownerId
  useEffect(() => {
    fetchData("3233");
  }, []);
  return (
    <div>
      <Typography
        variant="h5"
        fontWeight="bolder"
        sx={{ color: "gray", paddingLeft: 10 }}
      >
        QR Code List
      </Typography>
      {data.map((card) => {
        return (
          <div key={card._id}>
            <UserCard qrData={card} />
          </div>
        );
      })}
    </div>
  );
}
