import React, { Component } from "react";
import { observer } from "mobx-react";

import FilterStore from "./FilterStore.js";

@observer
class ToggleSwitch extends Component {
  render() {
    return (
      <div
        id={this.props.name}
        className="iconSwitch"
        onClick={() => {
          FilterStore.toggleAttribute(this.props.name);
        }}
      >
        {this.props.icon}
      </div>
    );
  }
}

export default ToggleSwitch;
