import React, { Component } from "react";

import "./App.css";
import "react-virtualized/styles.css";

import Header from "./Header.js";
import SidebarContainer from "./SidebarContainer.js";
import Content from "./Content.js";
import ContentReleases from "./ContentReleases.js";
import About from "./About.js";
import Footer from "./Footer.js";

import FilterStore from "./FilterStore.js";

import { observer } from "mobx-react";

@observer
class App extends Component {
  getContentWithURL = () => {
    let content = <Content />;
    switch (window.location.pathname) {
      case "/about":
        return <About />;
      case "/releases":
        content = <ContentReleases />;
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

    return !FilterStore.sidebarHidden && window.innerWidth < 500 ? (
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
        <main className="sidebar-content-wrapper">
          <SidebarContainer />
          {this.getContentWithURL()}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
