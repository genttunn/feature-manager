import React, { useEffect, useState, useContext } from "react";
import { Chart } from "react-google-charts";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";
export default function QIBFeatureScatterplot({ data }) {
  const [formattedData, setFormattedData] = useState([]);
  const [positiveCount, setPositiveCount] = useState(0);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;
  useEffect(() => {
    data && formatDataForPlot(data);
  }, [data]);

  let formatDataForPlot = (rawData) => {
    let count = 0;
    let chartData = [
      [rawData[0][0], rawData[0][1], { type: "string", role: "style" }],
    ];
    for (var i = 1; i < rawData.length; i++) {
      let style = null;
      if (rawData[i][2] === 1) {
        style = "point { shape-type: triangle; fill-color: #a52714; }";
        count += 1;
      }
      let rowToPush = [rawData[i][0], rawData[i][1], style];
      chartData.push(rowToPush);
      setPositiveCount(count);
    }
    setFormattedData(chartData);
  };

  return (
    <span>
      {data !== null ? (
        <Chart
          height="75vh"
          chartType="ScatterChart"
          loader={<div>Loading Chart</div>}
          data={formattedData}
          options={{
            title: `${
              data.length - 1
            } data points  -  Positive plc_status ${Math.round(
              (positiveCount / (data.length - 1)) * 100
            )}% (Red: plc_status = 1)`,
            hAxis: { title: data[0][0] },
            vAxis: { title: data[0][1] },
            legend: "none",
            backgroundColor: "#ECEFF4",
          }}
        />
      ) : (
        <span style={{ color: theme.text }}>Choose QIB to start</span>
      )}
    </span>
  );
}
