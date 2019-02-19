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
                {month.getMonth() === 0 // if month is january show year
                  ? month.toISOString().slice(0, 7)
                  : month.toISOString().slice(5, 7)}
              </div>
              <div className="smartphones-in-month display-flex">
                {SmartphoneStore.listOfFilteredAndScoredObjects
                  .filter(
                    smartphone =>
                      smartphone.released === month.toISOString().slice(0, 7)
                  )
                  .map(smartphone => (
                    <Smartphone
                      key={smartphone.brand + smartphone.name}
                      smartphone={smartphone}
                      maxImgHeight={200}
                      showDetails={false}
                      filterStore={FilterStore}
                    />
                  ))}
              </div>
            </div>
          ))}
          <div className="timeline-top-border" />
          <div className="timeline-bottom-border" />
        </div>
      </div>
    );
  }
}

export default ContentReleases;
