import React, { Component } from "react";
import { observer } from "mobx-react";

import TextSelect from "./TextSelect";

import FilterStore from "./FilterStore.js";
import SmartphoneStore from "./SmartphoneStore.js";

@observer
class Header extends Component {
  toggleAttribute = name => e => {
    e.preventDefault();

    FilterStore.toggleAttribute(name);
  };

  render() {
    return (
      <header className="box header">
        <div className="logo">
          <a className="logo-text" href="index.html">
            <span>smartphone-picker</span>
          </a>
          <TextSelect
            name="country"
            options={[["de", "GERMANY"]]}
            colorScheme="blue-white"
          />
        </div>
        <div className="main-menu">
          <div>
            <button
              className="show-sidebar-button"
              onClick={this.toggleAttribute("sidebarHidden")}
            >
              {FilterStore.sidebarHidden ? "Show" : "Hide"} Filters
            </button>
          </div>
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
          <div className="countryDiv">
            <p id="smartphoneCount" className="smartphoneCount">
              {SmartphoneStore.listOfFilteredAndScoredObjects
                ? SmartphoneStore.listOfFilteredAndScoredObjects.length
                : 0}
              /{SmartphoneStore.obj.length ? SmartphoneStore.obj.length : 0}
            </p>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
