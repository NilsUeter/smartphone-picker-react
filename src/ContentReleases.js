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
            <div key={month} className="smartphones-releases-container">
              <div className="smartphones-releases-month">
                {month.getMonth() + 1 + "-" + month.getFullYear()}
              </div>
              <div className="smartphones-in-month display-flex">
                {SmartphoneStore.listOfFilteredAndScoredObjects
                  .filter(
                    smartphone =>
                      smartphone.released ===
                      month.getFullYear() +
                        "-" +
                        (month.getMonth() < 10
                          ? `0${month.getMonth() + 1}` //append 0 in front of month to match smartphone.released format
                          : `${month.getMonth() + 1}`)
                  )
                  .map(smartphone => (
                    <Smartphone
                      key={smartphone.brand + smartphone.name}
                      smartphone={smartphone}
                      maxImgHeight={180}
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
