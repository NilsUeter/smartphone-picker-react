import React, { Component } from "react";

import FilterStore from "./FilterStore";
import SmartphoneStore from "./SmartphoneStore";
import amazonIcon from "./images/Amazon-Favicon-64x64.png";
import sdStorage from "./images/sd_storage.png";
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
      <div key={this.props.smartphone.name} className="smartphone">
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
              <div className="flex">
                <p className="smartphone-release ">
                  {this.props.smartphone.released}
                </p>

                <div className="flex smartphone-price-container">
                  <p className="smartphone-price">
                    {
                      this.props.smartphone.types[FilterStore.country][
                        this.props.smartphone.smallestPrice
                      ].price
                    }
                    €
                  </p>
                </div>
              </div>
              <p className="">&nbsp;</p>
              <div className="flex">
                <p className="smartphone-size ">
                  <span className="highlight-color">
                    {this.props.smartphone.width +
                      "*" +
                      this.props.smartphone.length}{" "}
                  </span>
                  mm
                </p>
                <p className="smartphone-display">
                  <span className="highlight-color">
                    {this.props.smartphone.display}
                  </span>
                  "
                </p>
              </div>
              <div className="flex">
                <div className="flex">
                  <p className="smartphone-memory">
                    <span className="highlight-color">
                      {this.props.smartphone.memory}{" "}
                    </span>
                    GB RAM
                  </p>
                </div>
                <div className="flex">
                  <span className="highlight-color">
                    {this.props.smartphone.storage}{" "}
                  </span>
                  GB <img className="icon" alt="" src={sdStorage} />
                </div>
              </div>
              <div className="">
                <span className="highlight-color">
                  {this.props.smartphone.batterysize}{" "}
                </span>
                <img className="icon" alt="" src={chargingBattery} />
              </div>

              <p className="">&nbsp;</p>
              <div className="flex">
                <p className="">Design</p>
                <p className="smartphone-design">
                  {this.props.smartphone.design}
                </p>
              </div>
              <div className="flex">
                <p className="">Processor</p>
                <p className="smartphone-processor ">
                  {this.props.smartphone.processor}
                </p>
              </div>
              <div className="flex">
                <p className="">Software</p>
                <p className="smartphone-updates ">
                  {this.props.smartphone.updates}
                </p>
              </div>
              <div className="flex">
                <p className="">Camera</p>
                <p className="smartphone-camera ">
                  {this.props.smartphone.camera}
                </p>
              </div>
              <div className="flex">
                <p className="">Battery</p>
                <p className="smartphone-battery ">
                  {this.props.smartphone.battery}
                </p>
              </div>
              <hr className="horizontalRule " />
              <p className="smartphone-totalscore">
                {this.props.smartphone.totalscore}
              </p>

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
