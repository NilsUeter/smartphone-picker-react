import React, { Component } from "react";
import { observer } from "mobx-react";
import "./Header.css";

import TextSelect from "./TextSelect";

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
        </div>
        <div className="main-menu">
          <div className="main-menu-text">
            <div className="navdiv">
              <ul>
                <li>
                  <a
                    className="main-menu-link"
                    href="https://blog.smartphone-picker.com/"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    className="main-menu-link"
                    href="mailto:admin@smartphone-picker.com"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a className="main-menu-link" href="sites/about.html">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div className="countryDiv">
              <ul>
                <li>
                  <a id="smartphoneCount" className="smartphoneCount">
                    {SmartphoneStore.listOfFilteredAndScoredObjects
                      ? SmartphoneStore.listOfFilteredAndScoredObjects.length
                      : 0}/
                    {SmartphoneStore.obj.smartphones
                      ? SmartphoneStore.obj.smartphones.length
                      : 0}
                  </a>
                </li>
                <li>
                  <TextSelect
                    name="country"
                    options={[["de", "GERMANY"], ["com", "UNITED STATES"]]}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
