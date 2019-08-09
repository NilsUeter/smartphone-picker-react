import React, { Component } from "react";
import { observer } from "mobx-react";

import SmartphoneStore from "./SmartphoneStore.js";
import FilterStore from "./FilterStore.js";
import Smartphone from "./Smartphone.js";

@observer
class Content extends Component {
  render() {
    return (
      <main id="smartphones" className="smartphones">
        {SmartphoneStore.listOfFilteredAndScoredObjects.map(smartphone => (
          <Smartphone
            key={
              smartphone.brand +
              smartphone.name +
              smartphone.memory +
              smartphone.storage
            }
            smartphone={smartphone}
            maxImgHeight={450}
            filterStore={FilterStore}
          />
        ))}
      </main>
    );
  }
}

export default Content;
