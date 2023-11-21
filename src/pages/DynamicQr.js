import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { addStatistic, getQrLink } from "../services/RestApi";
import "./DynamicQr.css";
import { Box, Card, Typography } from "@mui/material";
import { getIPInfo } from "../services/RestApi";

const DynamicQr = () => {
  const idFromURL = useParams().id;
  const navigateTo = useNavigate();
  const [isText, setIsText] = useState(false);
  const [qr, setQr] = useState({});

  const ip_location = async (qrId) => {
    const reply = await getIPInfo();
    const newLocation = {
      qrId: qrId,
      city: reply.city,
      region: reply.region,
      country: reply.country,
      loc: reply.loc,
      timezone: reply.timezone,
    };
    return newLocation;
  };

  const add_Statistic = async (loc) => {
    const statisticAdded = await addStatistic(loc);
    console.log("------------29 statisticAdded", statisticAdded);
  };

  useEffect(() => {
    if (idFromURL) {
      const retrieveData = async () => {
        try {
          //TODO check if is null or QR not exist
          const response = await getQrLink(idFromURL);

          const ip_info = ip_location(idFromURL);
          add_Statistic(ip_info);

          console.log(response);
          setTimeout(() => {
            if (response.data.type === "Text") {
              setQr(response.data);
              setIsText(true);
            } else {
              window.location.href = response.data.link;
            }
          }, 5000);
        } catch (error) {
          console.error("Error fetching QR code data:", error);
        }
      };

      retrieveData();
    } else {
      navigateTo("/login");
    }
  }, []);

  return (
    <>
      {!isText && (
        <div className="container-dynamic">
          <h1>
            <span class="let1">R</span>
            <span class="let2">e</span>
            <span class="let3">d</span>
            <span class="let4">i</span>
            <span class="let5">r</span>
            <span class="let6">e</span>
            <span class="let7">c</span>
            <span class="let8">t</span>
            <span class="let9">i</span>
            <span class="let10">n</span>
            <span class="let11">g</span>
          </h1>
        </div>
      )}
      {isText && (
        <Box className="qr-box-details">
          <Card className="qr-details-card">
            <Box className="text-details" style={{ wordWrap: "break-word" }}>
              <Box sx={{ padding: "30px" }}>
                <Typography variant="h3">{qr.title}</Typography>
                <div className="type-tag">
                  <Typography className="type-tag-letters" variant="subtitle2">
                    {qr.type}
                  </Typography>
                </div>
                <div className="qr-details-content">
                  <p>{qr.link}</p>
                </div>
              </Box>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};

export default DynamicQr;
