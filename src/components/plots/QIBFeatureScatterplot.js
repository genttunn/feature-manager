import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function QIBFeatureScatterplot({ width, height, data }) {
  const [formattedData, setFormattedData] = useState([]);
  const [positiveCount, setPositiveCount] = useState(0);
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
      if (rawData[i][2] == 1) {
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
          height={height}
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
            backgroundColor:'#ECEFF4'
          }}
        />
      ) : (
        <span>Choose QIB to start</span>
      )}
    </span>
  );
}

// let mockData = [
//   ["original_firstorder_Energy", "original_firstorder_Entropy", "plc_status"],
//   [26261900000.0, 4.14067, 0],
//   [2590220000.0, 5.42717, 1],
//   [5346520000.0, 4.56143, 0],
//   [5141600000.0, 5.62142, 1],
//   [3591020000.0, 5.56104, 1],
//   [19307000000.0, 5.53878, 1],
//   [16162800000.0, 3.76077, 0],
//   [12530000000.0, 5.81302, 1],
//   [5003880000.0, 4.27481, 0],
//   [4669760000.0, 5.08005, 0],
// ];
