import React, { Component } from "react";
import { observer } from "mobx-react";

import TextSelect from "./TextSelect";

import FilterStore from "./FilterStore.js";
import ToggleSwitch from "./ToggleSwitch";
import TemplateDropDown from "./TemplateDropDown";

@observer
class Header extends Component {
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
          <div className="navdiv display-flex">
            <TemplateDropDown
              summary="Smartphones"
              details={[
                {
                  href: "/releases",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 448 512"
                    >
                      <path fill="currentColor" d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z" />
                    </svg>
                  ),
                  desc: "Smartphone timeline"
                },
                {
                  href: "justGood",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"
                      />
                    </svg>
                  ),
                  desc: "Just good smartphones"
                }
              ]}
            />
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
            <a href="/about" className="main-menu-link">
              {FilterStore.showAbout ? "Smartphones" : "About"}
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
