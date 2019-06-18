import React, { Component } from "react";

import FilterStore from "./FilterStore";
import SmartphoneStore from "./SmartphoneStore";
import amazonIcon from "./images/Amazon-Favicon-64x64.png";
import chargingBattery from "./images/charging-battery.png";
import { observer } from "mobx-react";

@observer
class Smartphone extends Component {
  smartphoneHeight;
  imageContainerHeight;
  constructor(props) {
    super(props);
    let size = 450;

    const height = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    if (height < this.props.maxImgHeight + size) {
      this.imageContainerHeight = "calc((100vh - " + size + "px))";
      this.smartphoneHeight =
        "calc(calc(100vh - " +
        size +
        "px) * " +
        this.props.smartphone.length / 165 +
        ")";
    } else {
      this.imageContainerHeight = this.props.maxImgHeight + "px";
      this.smartphoneHeight =
        "calc(calc(" +
        this.props.maxImgHeight +
        "px) * " +
        this.props.smartphone.length / 165 +
        ")";
    }
  }

  getSmartphoneColorAbbreviation = () => {
    let abbreviation = "";
    const name = this.props.smartphone.types[FilterStore.country][
      this.props.smartphone.smallestPrice
    ].name;

    if (name.includes(" ")) {
      const index = name.indexOf(" ");
      abbreviation = name.split("")[0] + name.split("")[index + 1];
    } else {
      abbreviation = name.split("")[0];
    }

    return abbreviation.toUpperCase();
  };

  render() {
    return (
      <div className="smartphone">
        <div className="smartphone-filtercriteria">
          {SmartphoneStore.getAttributeFromSmartphone(
            this.props.smartphone,
            FilterStore.filterType
          )}
        </div>
        <div
          className="img-container"
          style={{
            height: this.imageContainerHeight
          }}
        >
          {FilterStore.scaleInput ? (
            <img
              style={{
                height: this.smartphoneHeight
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

        <div
          className={
            this.props.showDetails
              ? "smartphone-details"
              : "smartphone-details smartphone-details--hidden"
          }
        >
          <p className="smartphone-name " title={this.props.smartphone.name}>
            {this.props.smartphone.brand + " " + this.props.smartphone.name}
          </p>
          {this.props.showDetails && (
            <React.Fragment>
              <details className="smartphone-price-details">
                <summary className="smartphone-price-summary">
                  <span>
                    {
                      this.props.smartphone.types[FilterStore.country][
                        this.props.smartphone.smallestPrice
                      ].name
                    }
                  </span>
                  <span>{this.props.smartphone.memory}GB</span>
                  <span>{this.props.smartphone.storage}GB</span>
                  <span className="smartphone-price">
                    {
                      this.props.smartphone.types[FilterStore.country][
                        this.props.smartphone.smallestPrice
                      ].price
                    }
                    €
                  </span>
                </summary>
              </details>
              <div className="flexBetween">
                {" "}
                <span className="smartphone-release ">
                  {this.props.smartphone.released}
                </span>
                <span>
                  <span>{this.props.smartphone.batterysize} </span>
                  <img className="batteryIcon" alt="" src={chargingBattery} />
                </span>
              </div>

              <div className="flexBetween">
                <span>
                  {this.props.smartphone.width +
                    "*" +
                    this.props.smartphone.length +
                    " mm"}
                </span>
                <span>{this.props.smartphone.display + '"'}</span>
              </div>
              <div className="flexBetween" />

              <details className="smartphone-totalscore">
                <summary>
                  {this.props.smartphone.totalscore > 0 ? (
                    <span style={{ color: "var(--highlight-color)" }}>
                      {this.props.smartphone.totalscore} Points
                    </span>
                  ) : (
                    <span style={{ color: "var(--bad-color)" }}>
                      {this.props.smartphone.totalscore} Points
                    </span>
                  )}
                </summary>

                <div className="flexBetween">
                  <p className="">Design</p>
                  <p>{this.props.smartphone.design}</p>
                </div>
                <div className="flexBetween">
                  <p className="">Processor</p>
                  <p>{this.props.smartphone.processor}</p>
                </div>
                <div className="flexBetween">
                  <p className="">Software</p>
                  <p>{this.props.smartphone.updates}</p>
                </div>
                <div className="flexBetween">
                  <p className="">Camera</p>
                  <p>{this.props.smartphone.camera}</p>
                </div>
                <div className="flexBetween">
                  <p className="">Battery</p>
                  <p>{this.props.smartphone.battery}</p>
                </div>
                <hr className="horizontalRule " />
                <div className="flexBetween">
                  <p className="">Decay</p>
                  <p className="smartphone-decay ">
                    -
                    {Math.round(
                      SmartphoneStore.monthDiff(
                        new Date(this.props.smartphone.released),
                        new Date()
                      ) *
                        FilterStore.decayFactor *
                        10
                    ) / 10}
                  </p>
                </div>
              </details>
              <div className="wrapper ">
                <div className="a-button a-button-primary">
                  <a
                    className="a-link"
                    target="_blank"
                    rel="noreferrer noopener"
                    href={
                      this.props.smartphone.types[FilterStore.country][
                        this.props.smartphone.smallestPrice
                      ].link
                    }
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
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Smartphone;
