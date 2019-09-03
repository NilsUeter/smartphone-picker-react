import React, { Component } from "react";
import { observer } from "mobx-react";

import FilterStore from "./FilterStore.js";
import Checkbox from "@material-ui/core/Checkbox";

@observer
class MultiCheckBox extends Component {
  changeMultiSelection = option => {
    FilterStore.toggleArrayAttribute(this.props.name, option);
  };

  toggleSelectAll = () => {
    // pessimistic toggle
    if (FilterStore[this.props.name].length > 0) {
      FilterStore[this.props.name] = [];
    } else {
      FilterStore[this.props.name] = this.props.options;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="flex" style={{ marginBottom: "8px" }}>
          <label className="filterBoxLabel">
            <Checkbox
              className="overwrite-material-checkbox"
              color="primary"
              checked={
                FilterStore[this.props.name].length ===
                this.props.options.length
              }
              onChange={() => this.toggleSelectAll()}
            />
            Select All
          </label>
        </div>
        <div className="multiCheckboxContainer">
          {this.props.options.map(option => (
            <div key={option} className="flex">
              <label className="filterBoxLabel">
                <Checkbox
                  className="overwrite-material-checkbox"
                  color="primary"
                  checked={FilterStore[this.props.name].indexOf(option) !== -1}
                  onChange={() => this.changeMultiSelection(option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default MultiCheckBox;
