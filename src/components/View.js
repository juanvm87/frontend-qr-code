import React, { useState, useEffect } from "react";
import UserCard from "./common/UserCard";
import { Typography } from "@mui/material";
import { getAllOwnerQr } from "../services/RestApi";
import Header from "./common/Header";

export default function View() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getAllOwnerQr();
      setData(response.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Header letters={"QCL"} information={"QR Code List"} />
      {data
        .map((card) => {
          return (
            <div key={card._id}>
              <UserCard qrData={card} />
            </div>
          );
        })
        .reverse()}
    </div>
  );
}
