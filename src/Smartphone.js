import React, { Component } from "react";
import { observer } from "mobx-react";

import "./Smartphone.css";

import FilterStore from "./FilterStore";
import SmartphoneStore from "./SmartphoneStore";

@observer
class Smartphone extends Component {
  render() {
    return (
      <div>
        <div className="smartphone-filtercriteria">
          {SmartphoneStore.getAttributeFromSmartphone(
            this.props.smartphone,
            FilterStore.filterType
          )}
        </div>
        <div className="img-container">
          {FilterStore.scaleInput ? (
            <img
              style={{
                maxHeight: 0.27 * this.props.smartphone.length + "vh"
              }}
              className="qtip-img"
              src={"images/" + this.props.smartphone.imagelink}
              alt=""
              height="450"
            />
          ) : (
            <img
              style={{ maxHeight: 0.3 * 155 + "vh" }}
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
          <p className="smartphone-price rs">
            {
              this.props.smartphone.price[FilterStore.country][
                this.props.smartphone.smallestPrice
              ][0]
            }€
          </p>
          <p className="smartphone-size ls">
            {this.props.smartphone.width +
              "*" +
              this.props.smartphone.length +
              "mm"}
          </p>
          <div className="ls">
            <img className="icon" alt="" src="images/ram_icon.png" />
            <p className="smartphone-memory">{this.props.smartphone.memory}</p>
          </div>
          <div className="rs">
            <img className="icon" alt="" src="images/charging-battery.png" />
            <p className="smartphone-batterysize">
              {this.props.smartphone.batterysize}
            </p>
          </div>
          <div className="ls">
            <img className="icon" alt="" src="images/sd_storage.png" />
            <p className="smartphone-storage">
              {this.props.smartphone.storage}
            </p>
          </div>

          <p />
          <br />
          <p className="ls">Design</p>
          <p className="smartphone-design rs">{this.props.smartphone.design}</p>
          <p className="ls">Processor</p>
          <p className="smartphone-processor rs">
            {this.props.smartphone.processor}
          </p>
          <p className="ls">Software</p>
          <p className="smartphone-updates rs">
            {this.props.smartphone.updates}
          </p>
          <p className="ls">Camera</p>
          <p className="smartphone-camera rs">{this.props.smartphone.camera}</p>
          <p className="ls">Battery</p>
          <p className="smartphone-battery rs">
            {this.props.smartphone.battery}
          </p>
          <hr className="horizontalRule bs" />
          <p className="smartphone-totalscore rs">
            {this.props.smartphone.totalscore}
          </p>

          <div className="wrapper">
            <span className="a-button a-button-primary">
              <a
                className="a-link"
                target="_blank"
                href={
                  this.props.smartphone.amazon[FilterStore.country][
                    this.props.smartphone.smallestPrice
                  ][0]
                }
                rel="noopener"
              >
                <span className="a-button-inner">
                  <img
                    alt=""
                    src="images/Amazon-Favicon-64x64.png"
                    className="a-icon a-icon-shop-now"
                  />
                  <input
                    className="a-button-input"
                    type="submit"
                    value="Add to cart"
                  />
                  <span className="a-button-text">Shop Now</span>
                </span>
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Smartphone;
