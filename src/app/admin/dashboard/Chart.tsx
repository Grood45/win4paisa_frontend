// components/HighchartsChart.js
"use client";
import React, { useEffect } from "react";
import Highcharts from "highcharts";

const Chart: React.FC = () => {
  useEffect(() => {
    // Highcharts configuration options
    // @ts-ignore
    const options:any = {
      chart: {
        type: "areaspline",
        backgroundColor: "none",
        color: "white",
      },
      title: {
        text: "Deposit and Withdraw  ",
        align: "left",
        style: {
          color: "white",
        },
      },
      subtitle: {
        text: 'Source: <a href="https://www.ssb.no/jord-skog-jakt-og-fiskeri/jakt" target="_blank">SSB</a>',
        align: "left",

        style: {
          color: "white",
        },
      },
      xAxis: {
        plotBands: [
          {
            // Highlight the two last years
            from: 2019,
            to: 2024,
          },
        ],

        labels: {
          style: {
            color: "white", // Set X-axis label text color to white
          },
        },
      },
      yAxis: {
        title: {
          text: "Amount",
          color: "white",
        },
        style: {
          color: "white",
        },
        labels: {
          style: {
            color: "white", // Set X-axis label text color to white
          },
        },
      },
      tooltip: {
        shared: true,
        headerFormat: "<b>Hunting season starting autumn {point.x}</b><br>",
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        
        series: {
          pointStart: 2010,
          dataLabels: {
            style: {
              color: 'white' // Set series name text color to white
            }
          }
        },
        areaspline: {
          fillOpacity: 0.5,
        },
      },
      series: [
        {
          name: "Deposit",
          data: [
            38000, 37300, 37892, 38564, 36770, 36026, 34978, 35657, 35620,
            35971, 36409, 36435, 34643, 34956, 33199, 31136, 30835, 31611,
            30666, 30319, 31766,
          ],
          color: "green", // Set the color for Deposit data
          dataLabels: {
            style: {
              color: "white", // Set series name text color to white
            },
          },
        },
        {
          name: "WithDraw",
          data: [
            22534, 23599, 24533, 25195, 25896, 27635, 29173, 32646, 35686,
            37709, 39143, 36829, 35031, 36202, 35140, 33718, 37773, 42556,
            43820, 46445, 50048,
          ],
          dataLabels: {
            style: {
              color: "white", // Set series name text color to white
            },
          },
          color: "red", // Set the color for Withdraw data
        },
      ],
    };

    // Render the chart using the 'container' div
     // @ts-ignore
    Highcharts.chart("container", options);
  }, []);

  return <div id="container" style={{ width: "100%", height: "100%" }}></div>;
};

export default Chart;
