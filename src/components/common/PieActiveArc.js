import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography, Stack, Card } from "@mui/material";
import "../../pages/StatistcPage.css";

const PieActiveArc = (props) => {
  const { data, category, title } = props;
  const [identifier, setIdentifier] = useState(null);
  const [id, setId] = useState(undefined);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Parse the data and count occurrences of each category
    const categoryCount = data.reduce((acc, item) => {
      const categoryValue = item[category];
      acc[categoryValue] = (acc[categoryValue] || 0) + 1;
      return acc;
    }, {});

    // Sort the categories based on occurrences in descending order
    const sortedCategories = Object.keys(categoryCount).sort(
      (a, b) => categoryCount[b] - categoryCount[a]
    );

    // Select the top 3 categories
    const top3Categories = sortedCategories.slice(0, 3);

    const top3 = top3Categories.map((categoryValue) => ({
      label: categoryValue,
      value: categoryCount[categoryValue],
    }));

    console.log(category + "------", sortedCategories);
    const others = {
      label: "Others",
      value: sortedCategories.length - 3,
    };
    // Set the chart data state
    if (sortedCategories.length > 3) {
      top3.push(others);
    }
    setChartData(top3);
  }, [data, category]);

  const handleClick = (event, itemIdentifier, item) => {
    setId(item.id);
    setIdentifier(itemIdentifier);
  };

  return (
    <Card className="pie-card">
      <h3>{title}</h3>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <PieChart
          series={[
            {
              data: chartData,
            },
          ]}
          onClick={handleClick}
          width={400}
          height={200}
          margin={{ right: 200 }}
        />
      </Stack>
    </Card>
  );
};

export default PieActiveArc;
