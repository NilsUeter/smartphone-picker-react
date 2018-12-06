import React, { Component } from "react";

import "./App.css";

import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
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
        <div className="sidebar-content-wrapper">
          <Sidebar />
          {!FilterStore.sidebarHidden && window.innerWidth < 500 ? (
            <div />
          ) : FilterStore.showAbout ? (
            <About />
          ) : (
            <Content />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
