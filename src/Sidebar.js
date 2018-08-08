import React, { Component } from "react";
import { observer } from "mobx-react";
import "./Sidebar.css";
import RatingStars from "./RatingStars";
import ToggleSwitch from "./ToggleSwitch";
import TextSelect from "./TextSelect";
import TextField from "./TextField";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

import FilterStore from "./FilterStore.js";

const Range = Slider.Range;

const storageMarks = {
  0: "16",
  1: "32",
  2: "64",
  3: "128",
  4: "256"
};

@observer
class Sidebar extends Component {
  getMinDate() {
    var monthsMin = 0;
    var start = new Date("2017-01");
    var min = new Date(FilterStore.release_minimum);

    if (!isNaN(min.getTime())) {
      monthsMin = (min.getFullYear() - start.getFullYear()) * 12;
      monthsMin -= start.getMonth();
      monthsMin += min.getMonth();
    }

    return monthsMin;
  }

  getMaxDate() {
    var monthsMax = 0;
    var start = new Date("2017-01");
    var max = new Date(FilterStore.release_maximum);

    if (!isNaN(max.getTime())) {
      monthsMax = (max.getFullYear() - start.getFullYear()) * 12;
      monthsMax -= start.getMonth();
      monthsMax += max.getMonth();
    }

    return monthsMax;
  }

  toggleAttribute = name => e => {
    e.preventDefault();

    FilterStore.toggleAttribute(name);
  };

  changeAttributeSlider = (first, second) => changeEvent => {
    FilterStore.changeAttribute(first, changeEvent[0]);
    FilterStore.changeAttribute(second, changeEvent[1]);
  };

  changeAttributeStorage = changeEvent => {
    FilterStore.changeAttribute("storage", 16 * Math.pow(2, changeEvent));
  };

  changeAttributeDateRange = changeEvent => {
    FilterStore.changeAttribute(
      "release_minimum",
      "201" +
        (7 + Math.floor(changeEvent[0] / 12)) +
        "-" +
        ("00" + ((changeEvent[0] % 12) + 1)).slice(-2)
    );

    FilterStore.changeAttribute(
      "release_maximum",
      "201" +
        (7 + Math.floor(changeEvent[1] / 12)) +
        "-" +
        ("00" + ((changeEvent[1] % 12) + 1)).slice(-2)
    );
  };

  render() {
    return (
      <div className={FilterStore.sidebarHidden ? "sidebar hidden" : "sidebar"}>
        <div className="filterBox">
          <div className="filterBox-Header bs">Sorting Options</div>
          <p>Filter Templates</p>
          <TextSelect
            name="filterTemplate"
            options={[
              ["", ""],
              ["justGood", "Good smartphones from all price ranges."],
              ["small", "Smartphones made for small hands."],
              ["big", "Smartphones made for freaky big hands."],
              ["cheap", "Smartphones for small budgets."]
            ]}
          />
          <p>Sort table by</p>
          <div>
            <TextSelect
              name="filterType"
              options={[
                ["price", "Price"],
                ["length", "Body-Size"],
                ["display", "Screen-Size"],
                ["totalscore", "Total Score"]
              ]}
            />
            <input
              type="image"
              src="images/sort_arrows.png"
              id="sorting_order"
              className={
                FilterStore.isDescending
                  ? "sorting_order rotate-sorting-order"
                  : "sorting_order"
              }
              height="22px"
              width="22px"
              alt="Submit"
              onClick={this.toggleAttribute("isDescending")}
            />
          </div>
          <p>Scale phones</p>
          <ToggleSwitch name="scaleInput" />
          <p>Empty phones</p>
          <ToggleSwitch name="emptySmartphones" />
          <p>Release</p>
          <div>
            <div className="sliderContainer">
              <Range
                min={0}
                max={23}
                step={1}
                pushable={1}
                value={[this.getMinDate(), this.getMaxDate()]}
                onChange={this.changeAttributeDateRange}
                trackStyle={[{ backgroundColor: "#12709e" }]}
                handleStyle={[
                  { border: "solid 2px #12709e" },
                  { border: "solid 2px #12709e" }
                ]}
              />
            </div>
            <div className="flexBox">
              <TextField name="release_minimum" big={true} />
              <div className="filler" />
              <TextField name="release_maximum" big={true} />
            </div>
          </div>
        </div>
        <div className="filterBox">
          <div className="filterBox-Header bs">Budget and Size</div>
          <p>Price</p>
          <div>
            <div className="sliderContainer">
              <Range
                min={0}
                max={1200}
                step={50}
                value={[
                  parseInt(FilterStore.price_minimum_1, 10)
                    ? parseInt(FilterStore.price_minimum_1, 10)
                    : 0,
                  parseInt(FilterStore.price_maximum_1, 10)
                    ? parseInt(FilterStore.price_maximum_1, 10)
                    : 0
                ]}
                pushable={50}
                onChange={this.changeAttributeSlider(
                  "price_minimum_1",
                  "price_maximum_1"
                )}
                trackStyle={[{ backgroundColor: "#12709e" }]}
                handleStyle={[
                  { border: "solid 2px #12709e" },
                  { border: "solid 2px #12709e" }
                ]}
              />
            </div>
            <div className="flexBox">
              <TextField name="price_minimum_1" />
              <span className="prefix">€</span>
              <div className="filler" />
              <TextField name="price_maximum_1" />
              <span className="prefix">€</span>
            </div>
          </div>

          <p>Display</p>
          <div>
            <div className="sliderContainer">
              <Range
                min={4.7}
                max={6.3}
                step={0.1}
                pushable={0.1}
                value={[
                  parseFloat(FilterStore.size_minimum_1)
                    ? parseFloat(FilterStore.size_minimum_1)
                    : 0,
                  parseFloat(FilterStore.size_maximum_1)
                    ? parseFloat(FilterStore.size_maximum_1)
                    : 0
                ]}
                onChange={this.changeAttributeSlider(
                  "size_minimum_1",
                  "size_maximum_1"
                )}
                trackStyle={[{ backgroundColor: "#12709e" }]}
                handleStyle={[
                  { border: "solid 2px #12709e" },
                  { border: "solid 2px #12709e" }
                ]}
              />
            </div>
            <div className="flexBox">
              <TextField name="size_minimum_1" />
              <span className="prefix">"</span>
              <div className="filler" />
              <TextField name="size_maximum_1" />
              <span className="prefix">"</span>
            </div>
          </div>

          <p>Length</p>
          <div>
            <div className="sliderContainer">
              <Range
                min={135}
                max={163}
                step={1}
                pushable={1}
                value={[
                  parseInt(FilterStore.size_minimum_2, 10)
                    ? parseInt(FilterStore.size_minimum_2, 10)
                    : 0,
                  parseInt(FilterStore.size_maximum_2, 10)
                    ? parseInt(FilterStore.size_maximum_2, 10)
                    : 0
                ]}
                onChange={this.changeAttributeSlider(
                  "size_minimum_2",
                  "size_maximum_2"
                )}
                trackStyle={[{ backgroundColor: "#12709e" }]}
                handleStyle={[
                  { border: "solid 2px #12709e" },
                  { border: "solid 2px #12709e" }
                ]}
              />
            </div>
            <div className="flexBox">
              <TextField name="size_minimum_2" />
              <span className="prefix">mm</span>
              <div className="filler" />
              <TextField name="size_maximum_2" />
              <span className="prefix">mm</span>
            </div>
          </div>

          <p>Width</p>
          <div>
            <div className="sliderContainer">
              <Range
                min={65}
                max={78}
                step={1}
                pushable={1}
                value={[
                  parseInt(FilterStore.size_minimum_3, 10)
                    ? parseInt(FilterStore.size_minimum_3, 10)
                    : 0,
                  parseInt(FilterStore.size_maximum_3, 10)
                    ? parseInt(FilterStore.size_maximum_3, 10)
                    : 0
                ]}
                onChange={this.changeAttributeSlider(
                  "size_minimum_3",
                  "size_maximum_3"
                )}
                trackStyle={[{ backgroundColor: "#12709e" }]}
                handleStyle={[
                  { border: "solid 2px #12709e" },
                  { border: "solid 2px #12709e" }
                ]}
              />
            </div>
            <div className="flexBox">
              <TextField name="size_minimum_3" />
              <span className="prefix">mm</span>
              <div className="filler" />
              <TextField name="size_maximum_3" />
              <span className="prefix">mm</span>
            </div>
          </div>
        </div>
        <div className="filterBox">
          <div className="filterBox-Header bs">Ratings</div>
          <p>Design</p>
          <RatingStars name="design" />
          <p>Processor</p>
          <RatingStars name="processor" />
          <p>Updates</p>
          <RatingStars name="updates" />
          <p>Camera</p>
          <RatingStars name="camera" />
          <p>Battery</p>
          <RatingStars name="battery" />
        </div>
        <div className="filterBox">
          <div className="filterBox-Header bs">Personal Preferences</div>
          <p>Storage</p>
          <div className="sliderContainer storageSlider">
            <Slider
              min={0}
              max={4}
              marks={storageMarks}
              step={null}
              onChange={this.changeAttributeStorage}
              trackStyle={[{ backgroundColor: "#12709e" }]}
              handleStyle={[
                { border: "solid 2px #12709e" },
                { border: "solid 2px #12709e" }
              ]}
              activeDotStyle={{ border: "solid 2px #12709e" }}
            />
          </div>
          <p>Headphone-Jack</p>
          <ToggleSwitch name="headphoneJack" />
          <p>2 SIMS</p>
          <ToggleSwitch name="simCards" />
          <p>SD Slot</p>
          <ToggleSwitch name="sdSlot" />
          <p>No notch</p>
          <ToggleSwitch name="notch" />
          <p>Waterproof</p>
          <TextSelect
            name="waterproof"
            options={[
              ["", ""],
              ["4", "IP X4 Splashing water"],
              ["7", "IP X7 Immersion up to 1m"],
              ["8", "IP X8 Immersion beyond 1m"]
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Sidebar;
