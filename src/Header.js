import React, { Component } from "react";
import { observer } from "mobx-react";

import TextSelect from "./TextSelect";

import FilterStore from "./FilterStore.js";
import SmartphoneStore from "./SmartphoneStore.js";
import ToggleSwitch from "./ToggleSwitch";

@observer
class Header extends Component {
  toggleAttribute = name => e => {
    e.preventDefault();

    FilterStore.toggleAttribute(name);
  };

  render() {
    return (
      <header className="header">
        <div className="logo flex">
          <a className="logo-text" href="index.html">
            <span>smartphone-picker</span>
          </a>
          <TextSelect
            name="country"
            options={[["de", "GERMANY"]]}
            colorScheme="blue-white"
          />
          <ToggleSwitch name="lightmode" />
        </div>
        <div className="main-menu">
          <p id="smartphoneCount" className="smartphoneCount">
            {SmartphoneStore.listOfFilteredAndScoredObjects
              ? SmartphoneStore.listOfFilteredAndScoredObjects.length
              : 0}
            /{SmartphoneStore.obj.length ? SmartphoneStore.obj.length : 0}{" "}
            Phones
          </p>
          <div className="navdiv">
            <a
              className="main-menu-link"
              href="https://blog.smartphone-picker.com/"
            >
              Blog
            </a>
            <a
              className="main-menu-link"
              href="mailto:admin@smartphone-picker.com"
            >
              Contact
            </a>
            <a
              href="/"
              className="main-menu-link"
              onClick={this.toggleAttribute("showAbout")}
            >
              {FilterStore.showAbout ? "Smartphones" : "About"}
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
