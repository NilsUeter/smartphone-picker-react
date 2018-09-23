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

  componentDidMount() {
    this.contentObject = document.getElementById("content");
    console.log(document.getElementById("content"));
    document
      .getElementById("content")
      .addEventListener("wheel", e => this.scrollHorizontally(e), {
        passive: true
      });
  }

  scrollHorizontally(e) {
    const delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));

    // TODO: Make Scrolling smooth
    this.contentObject.scrollBy(delta * 55, 0);
  }

  render() {
    return (
      <div id="content" className="content">
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
