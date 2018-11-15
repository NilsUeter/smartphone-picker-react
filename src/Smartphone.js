import React, { Component } from "react";
import { observer } from "mobx-react";

import FilterStore from "./FilterStore";
import SmartphoneStore from "./SmartphoneStore";
import amazonIcon from "./images/Amazon-Favicon-64x64.png";
import sdStorage from "./images/sd_storage.png";
import chargingBattery from "./images/charging-battery.png";

@observer
class Smartphone extends Component {
  render() {
    return (
      <div key={this.props.smartphone.name} className="smartphone">
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
                height:
                  "calc(calc(100vh - 510px) * " +
                  this.props.smartphone.length / 165 +
                  ")"
              }}
              className="qtip-img"
              src={
                FilterStore.emptySmartphones
                  ? "images/" + this.props.smartphone.imagelink + "_blank.png"
                  : "images/" + this.props.smartphone.imagelink + ".jpg"
              }
              alt=""
            />
          ) : (
            <img
              style={{
                height: (165 / 165) * 100 + "%"
              }}
              className="qtip-img"
              src={
                FilterStore.emptySmartphones
                  ? "images/" + this.props.smartphone.imagelink + "_blank.png"
                  : "images/" + this.props.smartphone.imagelink + ".jpg"
              }
              alt=""
            />
          )}
        </div>
        <div className="smartphone-details">
          <p className="smartphone-name bs" title={this.props.smartphone.name}>
            {this.props.smartphone.brand + " " + this.props.smartphone.name}
          </p>

          <p className="smartphone-release ls">
            {this.props.smartphone.released}
          </p>

          <p className="smartphone-price rs">
            {
              this.props.smartphone.types[FilterStore.country][
                this.props.smartphone.smallestPrice
              ].price
            }
            €
          </p>
          <p className="bs">&nbsp;</p>
          <p className="smartphone-size ls">
            <span className="highlight-color">
              {this.props.smartphone.width + "*" + this.props.smartphone.length}{" "}
            </span>
            mm
          </p>
          <p className="smartphone-display rs">
            <span className="highlight-color">
              {this.props.smartphone.display}
            </span>
            "
          </p>

          <div className="ls">
            <p className="smartphone-memory rs">
              <span className="highlight-color">
                {this.props.smartphone.memory}{" "}
              </span>
              GB RAM
            </p>
          </div>
          <div className="rs">
            <p className="smartphone-storage rs">
              <span className="highlight-color">
                {this.props.smartphone.storage}{" "}
              </span>
              GB{" "}
            </p>
            <img className="icon" alt="" src={sdStorage} />
          </div>

          <div className="ls">
            <p className="smartphone-batterysize rs">
              <span className="highlight-color">
                {this.props.smartphone.batterysize}{" "}
              </span>
            </p>
            <img className="icon" alt="" src={chargingBattery} />
          </div>

          <p className="bs">&nbsp;</p>
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

          <div className="wrapper bs">
            <div className="a-button a-button-primary">
              <a
                className="a-link"
                target="_blank"
                href={
                  this.props.smartphone.types[FilterStore.country][
                    this.props.smartphone.smallestPrice
                  ].link
                }
                rel="noopener"
              >
                <span className="a-button-inner">
                  <img
                    alt=""
                    src={amazonIcon}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Smartphone;
