import React, { useState } from "react";
import { observer } from "mobx-react";
import amazonIcon from "./images/Amazon-Favicon-64x64.png";
import { monthDiff, getAttributeFromSmartphone } from "./helperFunctions";

const Smartphone = observer(
  ({ smartphone, maxImgHeight, style, filterStore }) => {
    const [selectedModel, setSelectedModel] = useState(0);
    const [selectedType, setSelectedType] = useState(0);
    const { price, link } = smartphone.models[selectedModel].types[
      selectedType
    ];
    let height = (smartphone.length / 165) * 100 + "%";
    return (
      <div className="smartphone" style={style}>
        <div className="img-container-container">
          <div className="smartphone-filtercriteria">
            {getAttributeFromSmartphone(smartphone, filterStore.filterType)}
          </div>
          <div
            className={
              "img-container " +
              (filterStore.showBacksideDefault
                ? "img-container--backsideDefault"
                : "")
            }
            style={{
              height: maxImgHeight
            }}
            onClick={e =>
              window.innerWidth < 600 && //only allow mobile devices to switch with click
              e.currentTarget.classList.toggle("img-container--is-flipped")
            }
          >
            <img
              style={
                filterStore.scaleInput ? { height } : { height: 100 + "%" }
              }
              className="qtip-img qtip-img-backside"
              onError={e => (e.target.alt = "No image")}
              src={"images/" + smartphone.imageLink + "_back.jpg"}
              alt=""
            />
            <img
              style={
                filterStore.scaleInput
                  ? {
                      height: height
                    }
                  : {
                      height: (165 / 165) * 100 + "%"
                    }
              }
              className="qtip-img"
              onError={e => (e.target.alt = "No image")}
              src={
                filterStore.emptySmartphones
                  ? "images/" + smartphone.imageLink + "_blank.png"
                  : "images/" + smartphone.imageLink + ".jpg"
              }
              alt=""
            />
          </div>
        </div>
        <div className="smartphone-details">
          <div className="flexBetween" style={{ marginBottom: 8 }}>
            <span className="smartphone-name " title={smartphone.name}>
              {smartphone.brand + " " + smartphone.name}
            </span>
            <svg
              viewBox="0 0 940 940"
              height="18px"
              className={
                "smartphone-fav-star " +
                (filterStore.selectedFavorites[
                  smartphone.brand + " " + smartphone.name
                ] != null
                  ? "smartphone-fav-star--clicked"
                  : "")
              }
              onClick={() => {
                filterStore.toggleObjectAttribute(
                  "selectedFavorites",
                  smartphone.brand + " " + smartphone.name
                );
                filterStore.updateURL();
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
              setSelectedModel(e.target.value.split(":")[0]);
              setSelectedType(e.target.value.split(":")[1]);
            }}
          >
            {smartphone.models.map((model, modelIndex) =>
              model.types.map((type, typeIndex) => (
                <option
                  value={modelIndex + ":" + typeIndex}
                  key={type.name + model.memory + model.storage}
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
            <span className="smartphone-release ">{smartphone.released}</span>
            <span className="smartphone-width-length ">
              {smartphone.width + "*" + smartphone.length + " mm"}
            </span>
            <span>{smartphone.display + '"'}</span>
          </div>

          <div className="flexBetween">
            <span>
              <span>{smartphone.batterysize}mAh</span>
            </span>
          </div>
          <div className="flexBetween" />

          <details className="smartphone-totalscore">
            <summary style={{ padding: 2 }}>
              <span
                style={
                  smartphone.totalscore > 0
                    ? { color: "var(--highlight-color)" }
                    : { color: "var(--bad-color)" }
                }
              >
                {smartphone.totalscore} Points
              </span>
            </summary>

            <div className="flexBetween">
              <p className="">Design</p>
              <p>{smartphone.design}</p>
            </div>
            <div className="flexBetween">
              <p className="">Processor</p>
              <p>{smartphone.cpu}</p>
            </div>
            <div className="flexBetween">
              <p className="">Software</p>
              <p>{smartphone.updates}</p>
            </div>
            <div className="flexBetween">
              <p className="">Camera</p>
              <p>{smartphone.camera}</p>
            </div>
            <div className="flexBetween">
              <p className="">Battery</p>
              <p>{smartphone.battery}</p>
            </div>
            <hr className="horizontalRule " />
            <div className="flexBetween">
              <p className="">Decay</p>
              <p className="smartphone-decay ">
                -
                {Math.round(
                  monthDiff(new Date(smartphone.released), new Date()) *
                    filterStore.decayFactor *
                    10
                ) / 10}
              </p>
            </div>
          </details>
          <div className="flexBetween">
            <span className="smartphone-price">{price ? price : "N/A"}€</span>
            {link && (
              <div className="a-button a-button-primary">
                <a
                  className="a-link"
                  target="_blank"
                  rel="noreferrer noopener"
                  href={link}
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
);

export default Smartphone;
