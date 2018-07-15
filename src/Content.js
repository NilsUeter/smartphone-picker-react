import React, { Component } from "react";
import { observer } from "mobx-react";
import "./Content.css";

import SmartphoneStore from "./SmartphoneStore.js";
import FilterStore from "./FilterStore.js";
import Smartphone from "./Smartphone.js";

@observer
class Content extends Component {
  render() {
    return (
      <div className="content">
        <div className="smartphones">
          {SmartphoneStore.listOfFilteredObjects.map(smartphone => (
            <div key={smartphone.name} className="smartphone">
              <Smartphone
                id={smartphone}
                smartphone={smartphone}
                filterStore={FilterStore}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Content;
