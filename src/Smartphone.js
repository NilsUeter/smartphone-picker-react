import React, { Component } from "react";
import { observer } from "mobx-react";

import "./Smartphone.css";

import FilterStore from "./FilterStore.js";

@observer
class Smartphone extends Component {
  render() {
    return (
      <div>
        <div className="img-container">
          {FilterStore.scaleInput ? (
            <img
              style={{
                maxHeight:
                  this.props.filterStore.scale * this.props.smartphone.length +
                  "px"
              }}
              className="qtip-img"
              src={"images/" + this.props.smartphone.imagelink}
              alt=""
              height="450"
            />
          ) : (
            <img
              style={{}}
              className="qtip-img"
              src={"images/" + this.props.smartphone.imagelink}
              alt=""
              height="450"
            />
          )}
        </div>
        <div className="smartphone-details">
          <p className="smartphone-name bs">
            {this.props.smartphone.brand + " " + this.props.smartphone.name}
          </p>
          <p className="smartphone-display ls">
            {this.props.smartphone.display + '"'}
          </p>
          <p className="smartphone-price rs">{"price"}</p>
          <p className="smartphone-size ls">
            {this.props.smartphone.width +
              "*" +
              this.props.smartphone.length +
              "mm"}
          </p>
          <p className="smartphone-memory ls">{this.props.smartphone.memory}</p>
          <p className="smartphone-batterysize rs">
            {this.props.smartphone.batterysize}
          </p>
          <p className="smartphone-storage ls">
            {this.props.smartphone.storage}
          </p>
          <p />
          <p className="smartphone-design rs">{this.props.smartphone.design}</p>
          <p className="smartphone-processor rs">
            {this.props.smartphone.processor}
          </p>
          <p className="smartphone-updates rs">
            {this.props.smartphone.updates}
          </p>
          <p className="smartphone-camera rs">{this.props.smartphone.camera}</p>
          <p className="smartphone-battery rs">
            {this.props.smartphone.battery}
          </p>
          <hr className="horizontalRule bs" />
          <p className="smartphone-totalscore rs">
            {this.props.smartphone.totalscore}
          </p>
        </div>
      </div>
    );
  }
}

export default Smartphone;
