import React, { Component } from "react";
import { observer } from "mobx-react";
import "./TextField.css";

import FilterStore from "./FilterStore.js";

@observer
class TextField extends Component {
  changeAttribute = e => {
    FilterStore.changeAttribute(this.props.name, e.target.value);
  };

  render() {
    return (
      <input
        id={FilterStore[this.props.name]}
        name={FilterStore[this.props.name]}
        className={this.props.big ? "bigInput" : "smallInput"}
        size="2"
        type="text"
        pattern="[0-9]+([\.,-][0-9]+)?"
        value={FilterStore[this.props.name]}
        onChange={this.changeAttribute}
      />
    );
  }
}

export default TextField;
