import React, { Component } from "react";
import { observer } from "mobx-react";
import "./Sidebar.css";
import RatingStars from "./RatingStars";
import FilterElement from "./FilterElement";
import ToggleSwitch from "./ToggleSwitch";

@observer
class Sidebar extends Component {
  render() {
    return (
      <div className="box sidebar">
        <div className="filterBox">
          <div className="filterBox-Header">Sorting Options</div>
          <p>Scale phones</p>
          <ToggleSwitch />
        </div>
        <div className="filterBox">
          <div className="filterBox-Header">Budget and Size</div>
          <FilterElement />
        </div>
        <div className="filterBox">
          <div className="filterBox-Header">Ratings</div>
          <RatingStars name="design" />
          <RatingStars name="processor" />
          <RatingStars name="updates" />
          <RatingStars name="camera" />
          <RatingStars name="battery" />
        </div>
        <div className="filterBox">
          <div className="filterBox-Header">Personal Preferences</div>
          <p>Headphone-Jack</p>
          <ToggleSwitch />
          <p>2 SIMS</p>
          <ToggleSwitch />
          <p>SD Slot</p>
          <ToggleSwitch />
          <p>No notch</p>
          <ToggleSwitch />
        </div>
      </div>
    );
  }
}

export default Sidebar;
