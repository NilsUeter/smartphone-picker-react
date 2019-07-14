import React, { Component } from "react";
import { observer } from "mobx-react";

import FilterStore from "./FilterStore.js";

@observer
class TextSelect extends Component {
  changeAttribute = e => {
    FilterStore.changeAttribute(this.props.name, e.target.value);
  };

  render() {
    return (
      <select
        id={this.props.name}
        className={"textSelect " + this.props.colorScheme}
        value={FilterStore[this.props.name]}
        onChange={this.changeAttribute}
        style={{ alignSelf: "center", flex: "1" }}
      >
        >
        {this.props.options.map(smartphone => (
          <option key={smartphone[0]} value={smartphone[0]}>
            {smartphone[1]}
          </option>
        ))}
      </select>
    );
  }
}

export default TextSelect;
