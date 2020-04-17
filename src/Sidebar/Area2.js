import React from "react";
import { observer } from "mobx-react";
import FilterBox from "../FilterBox";
import TextField from "../TextField";

import Slider from "@material-ui/core/Slider";
import ToggleSwitch from "../ToggleSwitch";
import FilterStore from "../FilterStore.js";

const changeAttributeSlider = (first, second) => (e, value) => {
  FilterStore.changeAttribute(first, value[0]);
  FilterStore.changeAttribute(second, value[1]);
};

export const Area2 = observer(() => {
  return (
    <FilterBox header="Budget and Size">
      <label className="filterBoxLabel">
        Price
        <div className="sliderContainer" style={{ marginBottom: 0 }}>
          <div>
            <Slider
              min={0}
              max={1200}
              step={50}
              value={[
                parseInt(FilterStore.price_minimum_1, 10)
                  ? parseInt(FilterStore.price_minimum_1, 10)
                  : 0,
                parseInt(FilterStore.price_maximum_1, 10)
                  ? parseInt(FilterStore.price_maximum_1, 10)
                  : 0,
              ]}
              pushable={50}
              onChange={changeAttributeSlider(
                "price_minimum_1",
                "price_maximum_1"
              )}
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
      <div className="flex" style={{ marginBottom: 16 }}>
        <p>Show phones without prices</p>
        <ToggleSwitch name="showPhonesWithoutPrices" />
      </div>
      <label className="filterBoxLabel">
        Display
        <div className="sliderContainer">
          <div>
            <Slider
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
                  : 0,
              ]}
              onChange={changeAttributeSlider(
                "size_minimum_1",
                "size_maximum_1"
              )}
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
            <Slider
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
                  : 0,
              ]}
              onChange={changeAttributeSlider(
                "size_minimum_2",
                "size_maximum_2"
              )}
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
            <Slider
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
                  : 0,
              ]}
              onChange={changeAttributeSlider(
                "size_minimum_3",
                "size_maximum_3"
              )}
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
  );
});
