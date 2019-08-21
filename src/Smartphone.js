import React, { Component } from "react";

import FilterStore from "./FilterStore";
import SmartphoneStore from "./SmartphoneStore";
import amazonIcon from "./images/Amazon-Favicon-64x64.png";
import { observer } from "mobx-react";

@observer
class Smartphone extends Component {
  smartphoneHeight;
  imageContainerHeight;
  constructor(props) {
    super(props);
    this.state = { selectedModel: 0, selectedType: 0 };
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

  render() {
    const { price } = this.props.smartphone.models[
      this.state.selectedModel
    ].types[this.state.selectedType];
    return (
      <div className="smartphone" style={this.props.style}>
        <div className="img-container-container">
          <div className="smartphone-filtercriteria">
            {SmartphoneStore.getAttributeFromSmartphone(
              this.props.smartphone,
              FilterStore.filterType
            )}
          </div>
          <div
            className={
              "img-container " +
              (FilterStore.showBacksideDefault
                ? "img-container--backsideDefault"
                : "")
            }
            style={{
              height: this.imageContainerHeight
            }}
            onClick={e =>
              window.innerWidth < 600 && //only allow mobile devices to switch with click
              e.currentTarget.classList.toggle("img-container--is-flipped")
            }
          >
            <img
              style={
                FilterStore.scaleInput
                  ? {
                      height: this.smartphoneHeight
                    }
                  : {
                      height: (165 / 165) * 100 + "%"
                    }
              }
              className="qtip-img"
              onError={e => (e.target.alt = "No image")}
              src={
                FilterStore.emptySmartphones
                  ? "images/" + this.props.smartphone.imageLink + "_blank.png"
                  : "images/" + this.props.smartphone.imageLink + ".jpg"
              }
              alt=""
            />
            <img
              style={
                FilterStore.scaleInput
                  ? {
                      height: this.smartphoneHeight
                    }
                  : {
                      height: (165 / 165) * 100 + "%"
                    }
              }
              className="qtip-img qtip-img-backside"
              onError={e => (e.target.alt = "No image")}
              src={"images/" + this.props.smartphone.imageLink + "_back.jpg"}
              alt=""
            />
          </div>
        </div>
        <div className="smartphone-details">
          <div className="flexBetween" style={{ marginBottom: 8 }}>
            <span
              className="smartphone-name "
              title={this.props.smartphone.name}
            >
              {this.props.smartphone.brand + " " + this.props.smartphone.name}
            </span>
            <svg
              viewBox="0 0 940 940"
              height="18px"
              className={
                "smartphone-fav-star " +
                (FilterStore.selectedFavorites[
                  this.props.smartphone.brand + " " + this.props.smartphone.name
                ] != null
                  ? "smartphone-fav-star--clicked"
                  : "")
              }
              onClick={() => {
                FilterStore.toggleObjectAttribute(
                  "selectedFavorites",
                  this.props.smartphone.brand + " " + this.props.smartphone.name
                );
                FilterStore.updateURL();
              }}
            >
              <path
                d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8
		c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601
		c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z"
              />
            </svg>
          </div>

          <select
            className="smartphone-price-details"
            onChange={e => {
              this.setState({
                selectedModel: e.target.value.split(":")[0],
                selectedType: e.target.value.split(":")[1]
              });
            }}
          >
            {this.props.smartphone.models.map((model, modelIndex) =>
              model.types.map((type, typeIndex) => (
                <option
                  value={modelIndex + ":" + typeIndex}
                  key={type.link}
                  className="smartphone-price-item"
                >
                  {type.name +
                    " " +
                    model.memory +
                    "GB " +
                    model.storage +
                    "GB " +
                    (type.price ? type.price : "N/A") +
                    "€"}
                </option>
              ))
            )}
          </select>
          <div className="flexBetween">
            <span className="smartphone-release ">
              {this.props.smartphone.released}
            </span>
            <span>
              {this.props.smartphone.width +
                "*" +
                this.props.smartphone.length +
                " mm"}
            </span>
            <span>{this.props.smartphone.display + '"'}</span>
          </div>

          <div className="flexBetween">
            <span>
              <span>{this.props.smartphone.batterysize}mAh</span>
            </span>
          </div>
          <div className="flexBetween" />

          <details className="smartphone-totalscore">
            <summary style={{ padding: 2 }}>
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
              <p>{this.props.smartphone.cpu}</p>
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
          <div className="flexBetween">
            <span className="smartphone-price">{price ? price : "N/A"}€</span>
            {this.props.smartphone.models[this.state.selectedModel].types[
              this.state.selectedType
            ].link && (
              <div className="a-button a-button-primary">
                <a
                  className="a-link"
                  target="_blank"
                  rel="noreferrer noopener"
                  href={
                    this.props.smartphone.models[this.state.selectedModel]
                      .types[this.state.selectedType].link
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Smartphone;
