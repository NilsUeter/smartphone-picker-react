import React, { Component } from "react";
import DevTools from "mobx-react-devtools";
import "./App.css";

import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import Content from "./Content.js";
import Footer from "./Footer.js";

import { observer } from "mobx-react";

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <DevTools />
        <Header />
        <Sidebar />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
