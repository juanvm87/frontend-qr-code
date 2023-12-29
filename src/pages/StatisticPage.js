import React, { useEffect, useRef, useState } from "react";
import "./StatistcPage.css";
import { Box, Card, CircularProgress, Stack } from "@mui/material";
import QRCode from "react-qr-code";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useParams } from "react-router-dom";
import { getQr, getQrStatistic } from "../services/RestApi";
import { handleformattedDateTime } from "../components/helperFunction/formatedDate";
import StatCard from "../components/common/StatCard";
import LineChart from "../components/common/LineChart";
import PieActiveArc from "../components/common/PieActiveArc";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Tab, Tabs } from "@material-ui/core";
import TableForm from "../components/common/TableForm";

const StatisticPage = () => {
  const [qrInfo, setQrInfo] = useState({});
  const [statisticData, setStatisticData] = useState({});
  const [isUpdating, setIsUpdating] = useState(true);
  const qrCodeRef = useRef(null);
  const param = useParams();
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    console.log("qrInfo-------->", qrInfo);
  };

  const countScanToday = (dataArray) => {
    const today = new Date().toISOString().split("T")[0];
    const todayObjects = dataArray.filter((obj) =>
      obj.createdAt.startsWith(today)
    );

    return todayObjects.length;
  };

  const handleBodyNumber = (data) => {
    return (
      <span className="hind-font caption-12 c-dashboardInfo__count">
        {data}
      </span>
    );
  };
  const handleLastScan = (data) => {
    if (data && Array.isArray(data) && data.length > 0) {
      const sortedData = data
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const lastScan = sortedData[0];
      const formattedDate = handleformattedDateTime(lastScan.createdAt);
      const s = (
        <h3
          className=""
          style={{ marginTop: "6px", lineHeight: "23px", color: "#323c43" }}
        >
          {lastScan.city} ({lastScan.country})
          <br />
          {formattedDate}
        </h3>
      );
      return s;
    } else {
      return "N/A";
    }
  };

  const fetchQrInfo = async () => {
    const replyQr = await getQr(param.id);
    setQrInfo(replyQr.data);
    if (replyQr && qrInfo) {
      const statistics = await getQrStatistic(replyQr.data._id);
      setStatisticData(statistics);
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchQrInfo();
  }, []);
  return (
    <>
      {isUpdating && (
        <Stack
          sx={{ color: "grey.500" }}
          spacing={2}
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="inherit" />
        </Stack>
      )}
      {!isUpdating && (
        <div className="container123">
          <div>
            <div className="profile-heading-info2">
              <div className="container-header2">
                <div className="box-info-search-info">
                  <QRCode
                    size={115}
                    id={qrInfo.pin}
                    className="qr-code-view"
                    value={`http://${window.location.hostname}:3000/dynamic-qr/${qrInfo._id}`}
                    ref={qrCodeRef}
                  />
                </div>
                <div className="container-qr-info">
                  <h2 className="h2-title">{qrInfo.title}</h2>
                  <h4 className="h4-type">{qrInfo.type}</h4>
                  <h4 className="h4-type">
                    Created: {handleformattedDateTime(qrInfo.createdAt)}
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <h4 className="h4-type" style={{ color: "#ffffff" }}>
                      User ID: {qrInfo.ownerId}
                    </h4>
                    <h4 className="h4-type" style={{ color: "#ffffff" }}>
                      QR pin: {qrInfo.pin}
                    </h4>
                  </div>
                </div>
              </div>
              <a
                className="openQr-icon"
                href={qrInfo.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <OpenInNewIcon fontSize="large" />
              </a>
            </div>
            {qrInfo.type === "customQr" && qrInfo.isFormDisplay && (
              <Tabs
                value={value}
                onChange={handleChangeTab}
                indicatorColor="primary"
              >
                <Tab label="Statistic" />
                <Tab label="Form Replies" />
              </Tabs>
            )}
          </div>
          {value === 0 && (
            <div className="container-charts">
              <div className="container-left3">
                <div
                  className="stat-cards"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <StatCard
                    title={"Scans Today"}
                    body={handleBodyNumber(countScanToday(statisticData.data))}
                  />
                  <StatCard
                    title={"Total Scans"}
                    body={handleBodyNumber(statisticData.data.length)}
                  />
                  <StatCard
                    title={"Last Scan"}
                    body={handleLastScan(statisticData.data)}
                  />
                </div>
                <Card className="chartLine-container">
                  <LineChart chartData={statisticData.data} />
                </Card>
              </div>
              <div className="container-right3">
                <PieActiveArc
                  title={"Cities"}
                  data={statisticData.data}
                  category="city"
                />
                <PieActiveArc
                  title={"Countries"}
                  data={statisticData.data}
                  category="country"
                />
              </div>
            </div>
          )}
          {value === 1 && (
            <div className="showForm-cotainer">
              <TableForm qrInfo={qrInfo} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StatisticPage;
