import React, { Component } from "react";
import { observer } from "mobx-react";

import FilterStore from "./FilterStore.js";

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
            <input
              type="checkbox"
              onChange={() => this.toggleSelectAll()}
              checked={
                FilterStore[this.props.name].length ===
                this.props.options.length
              }
              style={{
                width: "auto",
                alignSelf: "center",
                marginRight: "8px"
              }}
            />
            Select All
          </label>
        </div>
        <div className="multiCheckboxContainer">
          {this.props.options.map(option => (
            <div key={option} className="flex">
              <label className="filterBoxLabel">
                <input
                  type="checkbox"
                  onChange={() => this.changeMultiSelection(option)}
                  checked={FilterStore[this.props.name].indexOf(option) !== -1}
                  style={{
                    width: "auto",
                    alignSelf: "center",
                    marginRight: "8px"
                  }}
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
