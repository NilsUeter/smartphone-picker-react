import React, { Component } from "react";
import { observer } from "mobx-react";
import "./TextField.css";

import FilterStore from "./FilterStore.js";

@observer
class TextField extends Component {
  render() {
    return (
      <input
        id={FilterStore[this.props.name]}
        name={FilterStore[this.props.name]}
        className="smallInput"
        size="2"
        type="text"
        value={FilterStore[this.props.name]}
        onChange={changeEvent => {
          FilterStore.changeAttribute(
            this.props.name,
            changeEvent.target.value
          );
        }}
      />
    );
  }
}

export default TextField;
