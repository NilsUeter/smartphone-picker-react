import React, { Component } from "react";
import { observer } from "mobx-react";

import FilterStore from "./FilterStore.js";
import Sidebar from "./Sidebar.js";

@observer
class SidebarContainer extends Component {
  toggleAttribute = name => e => {
    e.preventDefault();

    FilterStore.toggleAttribute(name);
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={FilterStore.sidebarHidden ? "sidebar hidden" : "sidebar"}
        >
          <Sidebar toggleAttribute={this.toggleAttribute} />
        </div>
        <button
          className={
            FilterStore.sidebarHidden
              ? "sidebar-button show-sidebar-button"
              : "sidebar-button hide-sidebar-button"
          }
          onClick={this.toggleAttribute("sidebarHidden")}
        >
          {FilterStore.sidebarHidden ? "Show" : "Hide"} Filters
        </button>
      </React.Fragment>
    );
  }
}

export default SidebarContainer;
