import React, { Component } from "react";

import "./App.css";

import Header from "./Header.js";
import SidebarContainer from "./SidebarContainer.js";
import Content from "./Content.js";
import ContentReleases from "./ContentReleases.js";
import ContentCharts from "./ContentCharts.js";
import About from "./About.js";

import FilterStore from "./FilterStore.js";

import { observer } from "mobx-react";
import SmartphoneStore from "./SmartphoneStore";

const NoResultsInfo = () => (
  <div className="no-results-container">
    <div className="no-results__header">No results</div>
    <div className="no-results__description">
      The filter criteria were probably too strict.
      <br />
      Remove some filters or click{" "}
      <span
        className="here-remove-filters"
        onClick={() =>
          document.getElementById("js_resetAllFiltersButton").click()
        }
      >
        here
      </span>{" "}
      to remove all filters.
    </div>
  </div>
);

const LoadingInfo = () => (
  <div className="no-results-container">
    <div className="loading-info__header">Loading phones...</div>
  </div>
);

@observer
class App extends Component {
  getContentWithURL = () => {
    let content = <Content />;
    switch (window.location.pathname) {
      case "/about":
        return;
      case "/releases":
        content = <ContentReleases />;
        break;
      case "/charts":
        content = <ContentCharts />;
        break;
      case "/justgood":
        FilterStore.design = "3";
        FilterStore.processor = "3";
        FilterStore.updates = "4";
        FilterStore.camera = "3";
        FilterStore.battery = "3";
        break;
      default:
        break;
    }

    if (SmartphoneStore.listOfFilteredAndScoredObjects.length < 1) {
      content = <NoResultsInfo />;
    }
    if (SmartphoneStore.hasLoaded === false) {
      content = <LoadingInfo />;
    }
    return !FilterStore.sidebarHidden && window.innerWidth < 600 ? (
      <div />
    ) : (
      content
    );
  };

  render() {
    return (
      <div
        className={
          "react-head " + (FilterStore.lightmode ? "lightmode" : "darkmode")
        }
      >
        <Header />
        <div style={{ display: "flex", overflow: "auto" }}>
          {window.location.pathname === "/about" ? (
            <About />
          ) : (
            <React.Fragment>
              <SidebarContainer />
              {this.getContentWithURL()}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;
