import React from "react";
import { observer } from "mobx-react";
import ToggleSwitch from "../ToggleSwitch";
import FilterBox from "../FilterBox";
import TextSelect from "../TextSelect";
import TextField from "../TextField";

import Slider from "@material-ui/core/Slider";
import FilterStore from "../FilterStore.js";

const changeAttributeDateSlider = (e, value) => {
  FilterStore.changeAttribute(
    "release_minimum",
    "201" +
      (7 + Math.floor(value[0] / 12)) +
      "-" +
      ("00" + ((value[0] % 12) + 1)).slice(-2)
  );

  FilterStore.changeAttribute(
    "release_maximum",
    "201" +
      (7 + Math.floor(value[1] / 12)) +
      "-" +
      ("00" + ((value[1] % 12) + 1)).slice(-2)
  );
};

const getMinDateinMonths = minDate => {
  let monthsMin = 0;
  const start = new Date("2017-01");
  const min = new Date(minDate);

  if (!isNaN(min.getTime())) {
    monthsMin = (min.getFullYear() - start.getFullYear()) * 12;
    monthsMin -= start.getMonth();
    monthsMin += min.getMonth();
  }

  return monthsMin;
};

const getMaxDateInMonths = maxDate => {
  let monthsMax = 0;
  const start = new Date("2017-01");
  const max = new Date(maxDate);

  if (!isNaN(max.getTime())) {
    monthsMax = (max.getFullYear() - start.getFullYear()) * 12;
    monthsMax -= start.getMonth();
    monthsMax += max.getMonth();
  }

  return monthsMax;
};

export const Area1 = observer(() => {
  return (
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
            onClick={() => FilterStore.toggleAttribute("isDescending")}
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
            <Slider
              min={0}
              max={getMaxDateInMonths(new Date().toISOString().slice(0, 7))}
              step={1}
              pushable={1}
              value={[
                getMinDateinMonths(FilterStore.release_minimum),
                getMaxDateInMonths(FilterStore.release_maximum)
              ]}
              onChange={changeAttributeDateSlider}
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
  );
});
