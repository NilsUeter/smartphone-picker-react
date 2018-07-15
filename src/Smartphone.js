import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class Smartphone extends Component {
  render() {
    return (
      <div>
        <p>{this.props.smartphone.name}</p>
      </div>
    );
  }
}

export default Smartphone;
