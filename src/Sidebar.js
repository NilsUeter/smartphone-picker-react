import React, { Component } from "react";
import { observer } from "mobx-react";
import FilterBox from "./FilterBox";
import ToggleSwitch from "./ToggleSwitch";
import TextSelect from "./TextSelect";
import TextField from "./TextField";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

import FilterStore from "./FilterStore.js";

const Range = Slider.Range;
const storageMarks = {
  0: {
    style: {
      color: "var(--text-color)"
    },
    label: "16"
  },
  1: {
    style: {
      color: "var(--text-color)"
    },
    label: "32"
  },
  2: {
    style: {
      color: "var(--text-color)"
    },
    label: "64"
  },
  3: {
    style: {
      color: "var(--text-color)"
    },
    label: "128"
  },
  4: {
    style: {
      color: "var(--text-color)"
    },
    label: "256"
  }
};

@observer
class Sidebar extends Component {
  getMinDate() {
    let monthsMin = 0;
    const start = new Date("2017-01");
    const min = new Date(FilterStore.release_minimum);

    if (!isNaN(min.getTime())) {
      monthsMin = (min.getFullYear() - start.getFullYear()) * 12;
      monthsMin -= start.getMonth();
      monthsMin += min.getMonth();
    }

    return monthsMin;
  }

  getMaxDate() {
    let monthsMax = 0;
    const start = new Date("2017-01");
    const max = new Date(FilterStore.release_maximum);

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
        <FilterBox header="Sorting Options">
          <p>Search phones</p>
          <div className={"searchQuery"}>
            <TextField name="searchQuery" big={true} />
          </div>
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
          <div className="flex">
            <TextSelect
              name="filterType"
              options={[
                ["price", "Price"],
                ["length", "Body-Size"],
                ["display", "Screen-Size"],
                ["totalscore", "Total Score"],
                ["released", "Release Date"]
              ]}
            />
            <svg
              id="sorting_order"
              className={
                FilterStore.isDescending
                  ? "sorting_order rotate-sorting-order"
                  : "sorting_order"
              }
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              height="22px"
              width="22px"
              alt="Submit"
              onClick={this.toggleAttribute("isDescending")}
            >
              <path d="M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z" />
            </svg>
          </div>
          <div className="flex">
            <p>Scale phones</p>
            <ToggleSwitch name="scaleInput" />
          </div>
          <div className="flex">
            <p>Empty phones</p>
            <ToggleSwitch name="emptySmartphones" />
          </div>
          <p>Release</p>
          <div className="sliderContainer">
            <div>
              <Range
                min={0}
                max={23}
                step={1}
                pushable={1}
                value={[this.getMinDate(), this.getMaxDate()]}
                onChange={this.changeAttributeDateRange}
                trackStyle={[{ backgroundColor: "var(--text-color)" }]}
                handleStyle={[
                  { border: "solid 2px var(--text-color)" },
                  { border: "solid 2px var(--text-color)" }
                ]}
              />
            </div>
            <div className="sliderSubBar">
              <TextField name="release_minimum" big={true} />
              <div className="filler" />
              <TextField name="release_maximum" big={true} />
            </div>
          </div>
        </FilterBox>
        <FilterBox header="Budget and Size">
          <p>Price</p>
          <div className="sliderContainer">
            <div>
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
                trackStyle={[{ backgroundColor: "var(--text-color)" }]}
                handleStyle={[
                  { border: "solid 2px var(--text-color)" },
                  { border: "solid 2px var(--text-color)" }
                ]}
              />
            </div>
            <div className="sliderSubBar">
              <TextField name="price_minimum_1" />
              <span className="prefix">€</span>
              <div className="filler" />
              <TextField name="price_maximum_1" />
              <span className="prefix">€</span>
            </div>
          </div>

          <p>Display</p>
          <div className="sliderContainer">
            <div>
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
                trackStyle={[{ backgroundColor: "var(--text-color)" }]}
                handleStyle={[
                  { border: "solid 2px var(--text-color)" },
                  { border: "solid 2px var(--text-color)" }
                ]}
              />
            </div>
            <div className="sliderSubBar">
              <TextField name="size_minimum_1" />
              <span className="prefix">"</span>
              <div className="filler" />
              <TextField name="size_maximum_1" />
              <span className="prefix">"</span>
            </div>
          </div>

          <p>Length</p>
          <div className="sliderContainer">
            <div>
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
                trackStyle={[{ backgroundColor: "var(--text-color)" }]}
                handleStyle={[
                  { border: "solid 2px var(--text-color)" },
                  { border: "solid 2px var(--text-color)" }
                ]}
              />
            </div>
            <div className="sliderSubBar">
              <TextField name="size_minimum_2" />
              <span className="prefix">mm</span>
              <div className="filler" />
              <TextField name="size_maximum_2" />
              <span className="prefix">mm</span>
            </div>
          </div>

          <p>Width</p>
          <div className="sliderContainer">
            <div>
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
                trackStyle={[{ backgroundColor: "var(--text-color)" }]}
                handleStyle={[
                  { border: "solid 2px var(--text-color)" },
                  { border: "solid 2px var(--text-color)" }
                ]}
              />
            </div>
            <div className="sliderSubBar">
              <TextField name="size_minimum_3" />
              <span className="prefix">mm</span>
              <div className="filler" />
              <TextField name="size_maximum_3" />
              <span className="prefix">mm</span>
            </div>
          </div>
        </FilterBox>
        <FilterBox header="Personal Preferences">
          <p>Storage</p>
          <div className="storageSlider">
            <Slider
              min={0}
              max={4}
              marks={storageMarks}
              step={null}
              onChange={this.changeAttributeStorage}
              trackStyle={[{ backgroundColor: "var(--text-color)" }]}
              handleStyle={[
                { border: "solid 2px var(--text-color)" },
                { border: "solid 2px var(--text-color)" }
              ]}
              activeDotStyle={{ border: "solid 2px var(--text-color)" }}
            />
          </div>
          <div className="flex">
            <p>Headphone-Jack</p>
            <ToggleSwitch name="headphoneJack" />
          </div>
          <div className="flex">
            <p>2 SIMS</p>
            <ToggleSwitch name="simCards" />
          </div>
          <div className="flex">
            <p>SD Slot</p>
            <ToggleSwitch name="sdSlot" />
          </div>
          <div className="flex">
            <p>No notch</p>
            <ToggleSwitch name="notch" />
          </div>
          <div className="flex">
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
        </FilterBox>
        <FilterBox header="Ratings" startClosed={true}>
          <p>Design</p>
          <Slider
            min={1}
            max={5}
            step={1}
            onChange={changeevent =>
              FilterStore.changeAttribute("design", changeevent)
            }
            trackStyle={[{ backgroundColor: "var(--text-color)" }]}
            handleStyle={[{ border: "solid 2px var(--text-color)" }]}
          />
          <p>Processor</p>
          <Slider
            min={1}
            max={5}
            step={1}
            onChange={changeevent =>
              FilterStore.changeAttribute("processor", changeevent)
            }
            trackStyle={[{ backgroundColor: "var(--text-color)" }]}
            handleStyle={[{ border: "solid 2px var(--text-color)" }]}
          />
          <p>Updates</p>
          <Slider
            min={1}
            max={5}
            step={1}
            onChange={changeevent =>
              FilterStore.changeAttribute("updates", changeevent)
            }
            trackStyle={[{ backgroundColor: "var(--text-color)" }]}
            handleStyle={[{ border: "solid 2px var(--text-color)" }]}
          />
          <p>Camera</p>
          <Slider
            min={1}
            max={5}
            step={1}
            onChange={changeevent =>
              FilterStore.changeAttribute("camera", changeevent)
            }
            trackStyle={[{ backgroundColor: "var(--text-color)" }]}
            handleStyle={[{ border: "solid 2px var(--text-color)" }]}
          />
          <p>Battery</p>
          <Slider
            min={1}
            max={5}
            step={1}
            onChange={changeevent =>
              FilterStore.changeAttribute("battery", changeevent)
            }
            trackStyle={[{ backgroundColor: "var(--text-color)" }]}
            handleStyle={[{ border: "solid 2px var(--text-color)" }]}
          />
        </FilterBox>
      </div>
    );
  }
}

export default Sidebar;
