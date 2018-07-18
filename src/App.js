import React, { Component } from "react";
import DevTools from "mobx-react-devtools";
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
          FilterStore.sidebarHidden ? "App hide-sidebar" : "App show-sidebar"
        }
      >
        <DevTools />
        <Header />
        <Sidebar />
        {FilterStore.showAbout ? <About /> : <Content />}

        <Footer />
      </div>
    );
  }
}

export default App;
