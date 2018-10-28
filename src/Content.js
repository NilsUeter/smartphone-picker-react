import React, { Component } from "react";
import { observer } from "mobx-react";

import SmartphoneStore from "./SmartphoneStore.js";
import FilterStore from "./FilterStore.js";
import Smartphone from "./Smartphone.js";

@observer
class Content extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.contentObject = document.getElementById("content");
    document
      .getElementById("content")
      .addEventListener("wheel", e => this.scrollHorizontally(e), {
        passive: true
      });
  }

  scrollHorizontally(e) {
    const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

    // TODO: Make Scrolling smooth
    this.contentObject.scrollBy(delta * -40, 0);
  }

  render() {
    return (
      <div id="content" className="content">
        <div className="smartphones">
          {SmartphoneStore.listOfFilteredAndScoredObjects.map(smartphone => (
            <Smartphone
              id={smartphone}
              smartphone={smartphone}
              filterStore={FilterStore}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Content;
