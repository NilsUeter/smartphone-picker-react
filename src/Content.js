import React, { Component } from "react";
import { observer } from "mobx-react";

import SmartphoneStore from "./SmartphoneStore.js";
import Smartphone from "./Smartphone.js";

@observer
class Content extends Component {
  render() {
    return (
      <div className="box content">
        {console.log(SmartphoneStore.listOfFilteredObjects)}
        {SmartphoneStore.listOfFilteredObjects.map(smartphone => (
          <div key={smartphone.name} className="">
            <Smartphone id={smartphone} smartphone={smartphone} />
          </div>
        ))}
        {console.log("aaas")}
      </div>
    );
  }
}

export default Content;
