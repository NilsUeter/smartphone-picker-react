import React, { Component } from "react";
import { observer } from "mobx-react";
import "./ToggleSwitch.css";

@observer
class ToggleSwitch extends Component {
  render() {
    return (
      <div>
        <input
          type="checkbox"
          id="scaleInput"
          className="cbx hidden rating_updater"
          defaultChecked="checked"
        />
        <label htmlFor="scaleInput" className="lbl" />
      </div>
    );
  }
}

export default ToggleSwitch;
