import React from "react";
import { observer } from "mobx-react";
import FilterBox from "../FilterBox";
import ToggleSwitch from "../ToggleSwitch";
import TextSelect from "../TextSelect";

import Slider from "@material-ui/core/Slider";
import FilterStore from "../FilterStore.js";

const storageMarks = [
  {
    value: 0,
    label: "8",
  },
  {
    value: 1,
    label: "16",
  },
  {
    value: 2,
    label: "32",
  },
  {
    value: 3,
    label: "64",
  },
  {
    value: 4,
    label: "128",
  },
  {
    value: 5,
    label: "256",
  },
  {
    value: 6,
    label: "512",
  },
  {
    value: 7,
    label: "1024",
  },
];

export const Area3 = observer(() => {
  return (
    <FilterBox header="Personal Preferences">
      <p>Storage</p>
      <div className="storageSlider">
        <Slider
          marks={storageMarks}
          min={0}
          max={7}
          step={null}
          onChange={(e, value) =>
            FilterStore.changeAttribute("storage", 8 * Math.pow(2, value))
          }
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
            ["8", "IP X8 Immersion beyond 1m"],
          ]}
        />
      </div>
    </FilterBox>
  );
});
