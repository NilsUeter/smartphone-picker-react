import React, { Component } from "react";
import { observer } from "mobx-react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

import SmartphoneStore from "./SmartphoneStore.js";
import FilterStore from "./FilterStore.js";
import Smartphone from "./Smartphone.js";

const theme = {
  axis: {
    textColor: "#eee",
    fontSize: "28px",
    tickColor: "#eee"
  },
  grid: {
    stroke: "#888",
    strokeWidth: 1
  }
};

@observer
class ContentCharts extends Component {
  render() {
    const data = getData(SmartphoneStore.listOfFilteredAndScoredObjects);
    return (
      <main className="smartphones-charts">
        <ResponsiveScatterPlot
          data={data}
          nodeSize={16}
          margin={{ top: 40, right: 90, bottom: 90, left: 90 }}
          xScale={{ type: "time", format: "%Y-%m", precision: "month" }}
          xFormat="time:%Y-%m"
          yScale={{ type: "linear", min: "auto", max: "auto" }}
          yFormat={function(e) {
            return e + " cm";
          }}
          tooltip={phone => {
            return (
              <span className="chart-tooltip">{phone.node.data.name}</span>
            );
          }}
          onClick={() => {}}
          blendMode="multiply"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: "%b %d",
            tickValues: "every 1 month"
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "size",
            legendPosition: "middle",
            legendOffset: -60
          }}
          theme={theme}
        />
      </main>
    );
  }
}

function getData(filteredObjects) {
  if (!filteredObjects) {
    return [];
  }
  const correctDataStructure = filteredObjects.map(phone => {
    return {
      id: phone.brand + " " + phone.name,
      data: [
        {
          x: phone.released,
          y: phone.length,
          name: phone.brand + " " + phone.name
        }
      ]
    };
  });
  return correctDataStructure;
}

export default ContentCharts;
