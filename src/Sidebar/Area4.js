import React from "react";
import { observer } from "mobx-react";
import FilterBox from "../FilterBox";
import TextField from "../TextField";

import Slider from "@material-ui/core/Slider";
import FilterStore from "../FilterStore.js";

export const Area4 = observer(() => {
  return (
    <FilterBox header="Ratings" startClosed={true}>
      <p>Design</p>
      <Slider
        min={1}
        max={5}
        step={1}
        onChange={(e, value) => FilterStore.changeAttribute("design", value)}
      />
      <p>Processor</p>
      <Slider
        min={1}
        max={5}
        step={1}
        onChange={(e, value) => FilterStore.changeAttribute("processor", value)}
      />
      <p>Updates</p>
      <Slider
        min={1}
        max={5}
        step={1}
        onChange={(e, value) => FilterStore.changeAttribute("updates", value)}
      />
      <p>Camera</p>
      <Slider
        min={1}
        max={5}
        step={1}
        onChange={(e, value) => FilterStore.changeAttribute("camera", value)}
      />
      <p>Battery</p>
      <Slider
        min={1}
        max={5}
        step={1}
        onChange={(e, value) => FilterStore.changeAttribute("battery", value)}
      />
      <p>
        Decay Factor (
        <span style={{ color: "var(--bad-color)" }}>Subtract</span> points for
        old phones)
      </p>
      <Slider
        min={0}
        max={1}
        step={0.1}
        value={parseFloat(FilterStore.decayFactor)}
        onChange={(e, value) =>
          FilterStore.changeAttribute("decayFactor", value)
        }
      />
      <div className="sliderSubBar">
        <div className="filler" />
        <TextField name="decayFactor" />
        <label htmlFor="decayFactor" className="prefix">
          per Month
        </label>
      </div>
    </FilterBox>
  );
});
