import React, { Component } from "react";
import { observer } from "mobx-react";
import ToggleSwitch from "./ToggleSwitch";

@observer
class FilterElement extends Component {
  render() {
    return (
      <div className="filterElement">
        {this.props.name}
        <ToggleSwitch />
        <div />
      </div>
    );
  }
}

export default FilterElement;
