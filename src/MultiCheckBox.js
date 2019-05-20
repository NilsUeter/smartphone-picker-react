import React, { Component } from "react";
import { observer } from "mobx-react";

import FilterStore from "./FilterStore.js";

@observer
class MultiCheckBox extends Component {
  changeMultiSelection = option => {
    FilterStore.toggleArrayAttribute(this.props.name, option);
  };

  render() {
    return (
      <div className="multiCheckboxContainer">
        {this.props.options.map(option => (
          <div key={option} className="flex">
            <input
              type="checkbox"
              onChange={() => this.changeMultiSelection(option)}
              checked={FilterStore[this.props.name].indexOf(option) !== -1}
              style={{ width: "auto", alignSelf: "center" }}
            />
            <p style={{ padding: "2px 8px" }}>{option}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default MultiCheckBox;
