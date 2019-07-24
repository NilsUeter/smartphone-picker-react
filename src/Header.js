import React, { Component } from "react";
import { observer } from "mobx-react";

import TextSelect from "./TextSelect";

import FilterStore from "./FilterStore.js";
import IconSwitch from "./IconSwitch";
import TemplateDropDown from "./TemplateDropDown";

@observer
class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="logo flex">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAAORJREFUWEftjkEOgkAQBHmL+k1j4sc1MdMtKRlpXU5KJ3UAtoqd9u0b3eF4un1D6eNbiieUPj4Fz5frg/lP5vB76ePrfkBWLzA/nFDaywXWoO/pQ0pp21+AB7v3pf3wBToYSD1B30tDDKSeoO+lIQZST9D30hADqSfoe2mIgdQT9L00xEDqCfpeGmIg9QR9Lw0xkHqCvpeGGEg9Qd9LQwyknqDvpSEGUk/Q99IQA6kn6HtpiIHUE/S9NMRA6gn6HkN67t6XtuqJzve6g9370ra/QEppH3ui9OeWDr2jtO0u8Kebpjtt39HxDQn2FwAAAABJRU5ErkJggg=="
            alt="logo"
            style={{ marginRight: 8 }}
          />

          <label style={{ flex: 1 }}>
            <a className="logo-text" href="index.html">
              <span>smartphone-picker</span>
            </a>
            <TextSelect
              name="country"
              options={[["de", "GERMANY"]]}
              colorScheme="blue-white"
            />
          </label>
          <IconSwitch
            name="lightmode"
            icon={
              <svg
                className="nightmode-switch"
                viewBox="0 0 1000 1000"
                height="28px"
              >
                <title>Toggle nightmode</title>
                <g>
                  <path d="M500,10C229.4,10,10,229.4,10,500s219.4,490,490,490s490-219.4,490-490S770.6,10,500,10z M387.5,728C250,634.6,217.9,452.6,315.8,321.6c83.5-111.8,234.5-150.1,362.5-100.9c-56.3,14.6-107.8,47.1-144.3,95.9C450,428.9,477.6,584.9,595.4,665c51.3,34.8,111.1,49.5,169.3,45.8C660.6,797,504.8,807.8,387.5,728z" />
                </g>
              </svg>
            }
          />
        </div>
        <div className="main-menu">
          <TemplateDropDown
            summary="Smartphones"
            details={[
              {
                href: "/home" + FilterStore.currentQuery,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 320 512"
                  >
                    <path
                      fill="currentColor"
                      d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"
                    />
                  </svg>
                ),
                desc: "Side by side comparison"
              },
              {
                href: "/releases" + FilterStore.currentQuery,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z"
                    />
                  </svg>
                ),
                desc: "Smartphone timeline"
              },
              {
                href: "justGood" + FilterStore.currentQuery,
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
      </header>
    );
  }
}

export default Header;
