import React, { Component } from "react";
import { observer } from "mobx-react";

import SmartphoneStore from "./SmartphoneStore.js";
import FilterStore from "./FilterStore.js";
import Smartphone from "./Smartphone.js";

@observer
class ContentReleases extends Component {
  createArrayOfMonths = () => {
    const monthArray = [];
    const dateMin = new Date(FilterStore.release_minimum);
    const dateMax = new Date(FilterStore.release_maximum);

    while (dateMin < dateMax) {
      dateMin.setMonth(dateMin.getMonth() + 1);
      monthArray.unshift(new Date(dateMin));
    }
    return monthArray;
  };

  render() {
    const monthArray = this.createArrayOfMonths();
    return (
      <div id="content" className="content">
        <div className="smartphones-releases">
          {monthArray.map(month => (
            <div
              key={month}
              className="smartphones-releases-container display-flex"
            >
              <div className="smartphones-releases-month">
                {month.toISOString().slice(0, 7)}
              </div>
              <div className="display-flex">
                {SmartphoneStore.listOfFilteredAndScoredObjects
                  .filter(
                    smartphone =>
                      smartphone.released === month.toISOString().slice(0, 7)
                  )
                  .map(smartphone => (
                    <Smartphone
                      key={smartphone.brand + smartphone.name}
                      smartphone={smartphone}
                      maxImgHeight={300}
                      filterStore={FilterStore}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ContentReleases;
