import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class Footer extends Component {
  render() {
    return <footer className="box footer" />;
  }
}

export default Footer;
