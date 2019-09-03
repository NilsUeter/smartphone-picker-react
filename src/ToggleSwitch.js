import React, { Component } from "react";
import { observer } from "mobx-react";

import Switch from "@material-ui/core/Switch";
import FilterStore from "./FilterStore.js";

@observer
class ToggleSwitch extends Component {
  render() {
    return (
      <Switch
        checked={FilterStore[this.props.name]}
        onChange={() => {
          FilterStore.toggleAttribute(this.props.name);
        }}
        color="primary"
      />
    );
  }
}

export default ToggleSwitch;
