import React, { Component } from "react";

import "./App.css";
import "react-virtualized/styles.css";

import Header from "./Header.js";
import SidebarContainer from "./SidebarContainer.js";
import Content from "./Content.js";
import About from "./About.js";
import Footer from "./Footer.js";

import FilterStore from "./FilterStore.js";

import { observer } from "mobx-react";

@observer
class App extends Component {
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
          {!FilterStore.sidebarHidden && window.innerWidth < 500 ? (
            <div />
          ) : FilterStore.showAbout ? (
            <About />
          ) : (
            <Content />
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
