import React, { Component } from "react";
import { observer } from "mobx-react";

import FilterStore from "./FilterStore.js";

@observer
class TextField extends Component {
  changeAttribute = e => {
    FilterStore.changeAttribute(this.props.name, e.target.value);
  };

  render() {
    return (
      <input
        id={this.props.name}
        className={this.props.big ? "bigInput" : "smallInput"}
        size="2"
        type="text"
        value={FilterStore[this.props.name]}
        onChange={this.changeAttribute}
        autoComplete="new-password"
      />
    );
  }
}

export default TextField;
