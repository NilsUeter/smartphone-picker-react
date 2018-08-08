import React, { Component } from "react";
import { observer } from "mobx-react";
import "./Content.css";

import SmartphoneStore from "./SmartphoneStore.js";
import FilterStore from "./FilterStore.js";
import Smartphone from "./Smartphone.js";

@observer
class Content extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  scrollHorizontally(e) {
    const delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));

    // TODO: Make Scrolling smooth
    this.myRef.current.scrollBy(delta * 55, 0);
    e.preventDefault();
  }

  render() {
    return (
      <div
        className="content"
        ref={this.myRef}
        onWheel={e => this.scrollHorizontally(e)}
      >
        <div className="smartphones">
          {SmartphoneStore.listOfFilteredAndScoredObjects.map(smartphone => (
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
