import React, { Component } from "react";
import { observer } from "mobx-react";
import "./TextSelect.css";

import FilterStore from "./FilterStore.js";

@observer
class TextSelect extends Component {
  render() {
    return (
      <label>
        <select
          id={this.props.name}
          className={"textSelect " + this.props.colorScheme}
          value={FilterStore[this.props.name]}
          onChange={changeEvent => {
            FilterStore.changeAttribute(
              this.props.name,
              changeEvent.target.value
            );
          }}
        >
          {this.props.options.map(smartphone => (
            <option key={smartphone[0]} value={smartphone[0]}>
              {smartphone[1]}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

export default TextSelect;
