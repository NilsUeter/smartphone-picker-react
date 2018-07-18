import React, { Component } from "react";
import { observer } from "mobx-react";
import "./ToggleSwitch.css";

import FilterStore from "./FilterStore.js";

@observer
class ToggleSwitch extends Component {
  render() {
    return (
      <div>
        <input
          type="checkbox"
          id={this.props.name}
          className="cbx toggle-hidden rating_updater"
          checked={FilterStore[this.props.name]}
          onChange={() => {
            console.log(FilterStore[this.props.name]);
            FilterStore.toggleAttribute(this.props.name);
            console.log(FilterStore[this.props.name]);
          }}
        />
        <label htmlFor={this.props.name} className="lbl" />
      </div>
    );
  }
}

export default ToggleSwitch;
