import React, { Component } from "react";
import { observer } from "mobx-react";

import FilterStore from "./FilterStore.js";
import SmartphoneStore from "./SmartphoneStore.js";
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
        <aside
          className={FilterStore.sidebarHidden ? "sidebar hidden" : "sidebar"}
        >
          <Sidebar toggleAttribute={this.toggleAttribute} />
        </aside>
        <button
          className={
            FilterStore.sidebarHidden ? "sidebar-button" : "sidebar-button"
          }
          onClick={this.toggleAttribute("sidebarHidden")}
        >
          <svg
            viewBox="0 0 22 21"
            style={{ height: 20, marginRight: 12, fill: "var(--just-white)" }}
          >
            <path d="M19.8490043,4.05480957 C18.2895154,5.73921712 16.3637795,7.72094727 14.0717967,10 C14.0717967,14.3344727 14.0717967,17.3344727 14.0717967,19 C14.0717967,21.498291 11.5630159,21.3812256 10.4968538,20.3779297 C9.43069169,19.3746338 8.66185639,18.5505371 7.86682655,17.6688232 C7.07179672,16.7871094 7.07179672,16.0102539 7.07179672,15.0843506 C7.07179672,14.4670817 7.07179672,12.7722982 7.07179672,10 C4.67798848,7.62166341 2.72038287,5.63993327 1.19897987,4.05480957 C-1.08312462,1.67712402 0.0865531157,3.55271368e-15 3.07179672,3.55271368e-15 L18.0717967,3.55271368e-15 C20.9239555,3.55271368e-15 22.1882377,1.52819824 19.8490043,4.05480957 Z M2.45972206,2 L9.07227089,9 L9.07227089,16.0726318 L12.0722709,19.0112305 L12.0722709,9 L18.8007865,2 L2.45972206,2 Z" />
          </svg>
          <span className="smartphoneCount">
            {SmartphoneStore.listOfFilteredAndScoredObjects.length +
              "/" +
              SmartphoneStore.obj.length}
          </span>
          <span>Phones</span>
        </button>
      </React.Fragment>
    );
  }
}

export default SidebarContainer;
