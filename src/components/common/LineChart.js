import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { handleformattedDate } from "../helperFunction/formatedDate";
import "chartjs-adapter-date-fns";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
const LineChart = (props) => {
  const { chartData } = props;

  const getDates = (data) => {
    const dates = data.map(
      (dataPoint) => handleformattedDate(dataPoint.createdAt).split(" ")[0]
    );
    return dates;
  };
  const handlelineChartDate = (data) => {
    const arrayDates = getDates(data);
    return [...new Set(arrayDates)];
  };
  const handleTotalDates = (data) => {
    const arrayDates = getDates(data);
    var elementCounts = arrayDates.reduce(
      (count, item) => ((count[item] = count[item] + 1 || 1), count),
      {}
    );

    console.log(elementCounts);
    return elementCounts;
  };
  const handleMaxScanInDay = () => {
    const totalForDates = handleTotalDates(chartData);
    const valuesArray = Object.values(totalForDates);
    return Math.max(...valuesArray);
  };

  const data = {
    labels: handlelineChartDate(chartData), // date 1,date 2, date 3

    datasets: [
      {
        label: "Scans Date",
        data: handleTotalDates(chartData),
        backgroundColor: "aqua",
        borderColor: "rgba(75,192,192,1)",
        pointBorderColor: "aqua",
        fill: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      y: {
        min: 0,
        max: handleMaxScanInDay() + 2,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <>
      {!chartData && <p>No Data</p>}

      {chartData && (
        <div>
          <h2 style={{ textAlign: "center" }}>Scaned Dates</h2>
          <Line data={data} options={options} />
        </div>
      )}
    </>
  );
};

export default LineChart;
