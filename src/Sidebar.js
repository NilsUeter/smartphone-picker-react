import React, { Component } from "react";
import { observer } from "mobx-react";
import FilterBox from "./FilterBox";
import ToggleSwitch from "./ToggleSwitch";
import TextSelect from "./TextSelect";
import TextField from "./TextField";
import MultiCheckBox from "./MultiCheckBox";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

import FilterStore from "./FilterStore.js";
import SmartphoneStore from "./SmartphoneStore.js";

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
  },
  5: {
    style: {
      color: "var(--text-color)"
    },
    label: "512"
  },
  6: {
    style: {
      color: "var(--text-color)"
    },
    label: "1024"
  }
};

@observer
class Sidebar extends Component {
  getMinDateinMonths(minDate) {
    let monthsMin = 0;
    const start = new Date("2017-01");
    const min = new Date(minDate);

    if (!isNaN(min.getTime())) {
      monthsMin = (min.getFullYear() - start.getFullYear()) * 12;
      monthsMin -= start.getMonth();
      monthsMin += min.getMonth();
    }

    return monthsMin;
  }

  getMaxDateInMonths(maxDate) {
    let monthsMax = 0;
    const start = new Date("2017-01");
    const max = new Date(maxDate);

    if (!isNaN(max.getTime())) {
      monthsMax = (max.getFullYear() - start.getFullYear()) * 12;
      monthsMax -= start.getMonth();
      monthsMax += max.getMonth();
    }

    return monthsMax;
  }

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

  shareCurrentFilters = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "smartphone-picker",
          text: "Check out my filtered list of smartphones!",
          url: window.location.href
        })
        .then(() => console.log("Successful share"))
        .catch(error => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  render() {
    const { toggleAttribute } = this.props;
    return (
      <React.Fragment>
        <div className="sidebar-status-bar">
          <button
            id="js_resetAllFiltersButton"
            title="Reset all chosen filters."
            className="sidebar-status-buttons"
            onClick={() => FilterStore.resetFilters()}
          >
            <svg viewBox="0 0 24 24" height="24px">
              <path d="M 10 2 L 9 3 L 5 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 21.093063 5.9069372 22 7 22 L 17 22 C 18.093063 22 19 21.093063 19 20 L 19 5 L 20 5 L 20 3 L 19 3 L 18 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
            </svg>
          </button>
          <button
            title="Show backside"
            className="sidebar-status-buttons"
            onClick={() => {
              FilterStore.toggleAttribute("showBacksideDefault");
            }}
          >
            <svg
              x="0px"
              y="0px"
              height="24px"
              viewBox="0 0 492.217 492.217"
              fill=""
            >
              <g>
                <g>
                  <circle cx="202.486" cy="55.307" r="7.157" />
                  <circle cx="171.131" cy="55.308" r="13.041" />
                  <path d="M384.412,227.329h-12.314V46.147c0-23.667-19.186-42.854-42.854-42.854h-166.27c-23.667,0-42.854,19.188-42.854,42.854    v181.182h-12.317C48.361,227.329,0,275.688,0,335.132c0,59.44,48.36,107.804,107.803,107.804h92.546v33.246    c0,5.172,3.088,9.795,7.867,11.773c1.553,0.643,3.193,0.969,4.871,0.969c3.407,0,6.608-1.326,9.014-3.732l55.445-55.443    c2.407-2.406,3.731-5.607,3.731-9.012s-1.324-6.602-3.731-9.01l-55.445-55.445c-2.405-2.406-5.606-3.73-9.014-3.73    c-1.678,0-3.318,0.325-4.873,0.969c-4.777,1.979-7.865,6.603-7.865,11.773v33.246h-92.546c-34.963,0-63.407-28.443-63.407-63.406    c0-34.964,28.444-63.406,63.407-63.406h12.317v92.393c0,4.249,0.628,8.348,1.779,12.224h56.252v-11.049    c0-14.185,8.466-26.854,21.568-32.282c4.266-1.765,8.761-2.658,13.367-2.658c9.337,0,18.114,3.635,24.713,10.235l55.441,55.442    c3.197,3.197,5.691,6.908,7.42,10.941h28.582c23.668,0,42.854-19.188,42.854-42.854v-92.393h12.316    c34.963,0,63.408,28.442,63.408,63.406c0,34.963-28.445,63.406-63.408,63.406c-12.238,0-22.197,9.957-22.197,22.197    s9.959,22.199,22.197,22.199c59.443,0,107.805-48.361,107.805-107.804C492.217,275.688,443.857,227.329,384.412,227.329z     M169.466,30.613h29.413c13.638,0,24.694,11.056,24.694,24.695c0,13.638-11.057,24.695-24.694,24.695h-29.413    c-13.638,0-24.694-11.058-24.694-24.695C144.772,41.669,155.829,30.613,169.466,30.613z" />
                </g>
              </g>
            </svg>
          </button>
          <button
            title="Favorited smartphones."
            disabled={
              Object.keys(FilterStore.selectedFavorites).length < 1
                ? "disabled"
                : ""
            }
            className={
              "sidebar-fav-button" +
              (Object.keys(FilterStore.selectedFavorites).length
                ? " sidebar-fav-button--filled"
                : "")
            }
            onClick={() => {
              FilterStore.toggleAttribute("onlyShowFavedPhones");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 940 940"
              height="22px"
            >
              <path
                d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8
		c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601
		c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z"
              />
            </svg>
            <span className="fav-sidebar-counter">
              {Object.keys(FilterStore.selectedFavorites).length}
            </span>
          </button>
          <button
            title="Share link of current selection."
            className="sidebar-status-buttons status-button-share"
            onClick={() => this.shareCurrentFilters()}
          >
            <span className="smartphoneCount">
              {SmartphoneStore.listOfFilteredAndScoredObjects.length +
                "/" +
                SmartphoneStore.obj.length}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="24px"
            >
              <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z" />
            </svg>
          </button>
          <div className="clipboard-notifier">Copied to clipboard!</div>
        </div>
        <FilterBox header="Sorting Options">
          <label className="filterBoxLabel">
            Search phones
            <div className={"searchQuery"}>
              <TextField name="searchQuery" big={true} />
            </div>
          </label>
          <label className="filterBoxLabel">
            Sort table by
            <div className="flex">
              <TextSelect
                name="filterType"
                options={[
                  ["price", "Price"],
                  ["totalscore", "Total Score"],
                  ["length", "Body-Size"],
                  ["display", "Screen-Size"],
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
                onClick={toggleAttribute("isDescending")}
              >
                <path d="M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z" />
              </svg>
            </div>
          </label>
          <div className="flex">
            <p>Scale phones</p>
            <ToggleSwitch name="scaleInput" />
          </div>
          <div className="flex">
            <p>Empty phones</p>
            <ToggleSwitch name="emptySmartphones" />
          </div>
          <label className="filterBoxLabel">
            Release
            <div className="sliderContainer">
              <div>
                <Range
                  min={0}
                  max={this.getMaxDateInMonths(
                    new Date().toISOString().slice(0, 7)
                  )}
                  step={1}
                  pushable={1}
                  value={[
                    this.getMinDateinMonths(FilterStore.release_minimum),
                    this.getMaxDateInMonths(FilterStore.release_maximum)
                  ]}
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
          </label>
        </FilterBox>
        <FilterBox header="Budget and Size">
          <label className="filterBoxLabel">
            Price
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
          </label>
          <label className="filterBoxLabel">
            Display
            <div className="sliderContainer">
              <div>
                <Range
                  min={4.6}
                  max={7}
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
          </label>
          <label className="filterBoxLabel">
            Length
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
          </label>
          <label className="filterBoxLabel">
            Width
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
          </label>
        </FilterBox>
        <FilterBox header="Personal Preferences">
          <p>Storage</p>
          <div className="storageSlider">
            <Slider
              min={0}
              max={6}
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
            <label className="filterBoxLabel">Waterproof</label>
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
          <p>
            Decay Factor (
            <span style={{ color: "var(--bad-color)" }}>Subtract</span> points
            for old phones)
          </p>
          <Slider
            min={0}
            max={1}
            step={0.1}
            value={parseFloat(FilterStore.decayFactor)}
            onChange={changeevent =>
              FilterStore.changeAttribute("decayFactor", changeevent)
            }
            trackStyle={[{ backgroundColor: "var(--text-color)" }]}
            handleStyle={[{ border: "solid 2px var(--text-color)" }]}
          />
          <div className="sliderSubBar">
            <div className="filler" />
            <TextField name="decayFactor" />
            <label htmlFor="decayFactor" className="prefix">
              per Month
            </label>
          </div>
        </FilterBox>{" "}
        <FilterBox header="Brands" startClosed={true}>
          <MultiCheckBox
            name="selectedBrands"
            options={SmartphoneStore.getUniqueBrands()}
          />
        </FilterBox>
      </React.Fragment>
    );
  }
}

export default Sidebar;
