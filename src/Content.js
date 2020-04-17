import React, { Component } from "react";
import { observer } from "mobx-react";

import SmartphoneStore from "./SmartphoneStore.js";
import FilterStore from "./FilterStore.js";
import Smartphone from "./Smartphone.js";

@observer
class Content extends Component {
  render() {
    const maxImgHeight = window.innerWidth < 600 ? 250 : 450;
    return (
      <main id="smartphones" className="smartphones">
        {SmartphoneStore.listOfFilteredAndScoredObjects.map((phone) => (
          <Smartphone
            key={phone.id}
            smartphone={phone}
            maxImgHeight={maxImgHeight}
            filterStore={FilterStore}
          />
        ))}
      </main>
    );
  }
}

export default Content;
