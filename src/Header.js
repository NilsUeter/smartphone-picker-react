import React, { Component } from "react";
import { observer } from "mobx-react";
import "./Header.css";

import TextSelect from "./TextSelect";

import FilterStore from "./FilterStore.js";
import SmartphoneStore from "./SmartphoneStore.js";

@observer
class Header extends Component {
  render() {
    return (
      <header className="box header">
        <div className="logo">
          <a className="logo-text" href="index.html">
            <span>smartphone-picker</span>
          </a>
          <TextSelect
            name="country"
            options={[["de", "GERMANY"], ["com", "UNITED STATES"]]}
          />
        </div>
        <div className="main-menu">
          <div>
            <button
              className="show-sidebar"
              onClick={() => {
                FilterStore.toggleAttribute("sidebarHidden");
              }}
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
            <a className="main-menu-link" href="sites/about.html">
              About
            </a>
          </div>
          <div className="countryDiv">
            <a id="smartphoneCount" className="smartphoneCount">
              {SmartphoneStore.listOfFilteredAndScoredObjects
                ? SmartphoneStore.listOfFilteredAndScoredObjects.length
                : 0}/
              {SmartphoneStore.obj.smartphones
                ? SmartphoneStore.obj.smartphones.length
                : 0}
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
