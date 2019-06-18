import React, { Component } from "react";
import { observer } from "mobx-react";

import SmartphoneStore from "./SmartphoneStore.js";
import FilterStore from "./FilterStore.js";
import Smartphone from "./Smartphone.js";

@observer
class Content extends Component {
  render() {
    return (
      <div id="content" className="content">
        <div id="smartphones" className="smartphones">
          {SmartphoneStore.listOfFilteredAndScoredObjects.map(smartphone => (
            <Smartphone
              key={
                smartphone.brand +
                smartphone.name +
                smartphone.memory +
                smartphone.storage
              }
              smartphone={smartphone}
              showDetails={true}
              maxImgHeight={500}
              filterStore={FilterStore}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Content;
