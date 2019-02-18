import React, { Component } from "react";
import { observer } from "mobx-react";

import FilterStore from "./FilterStore.js";

@observer
class TextField extends Component {
  changeAttribute = e => {
    FilterStore.changeAttribute(this.props.name, e.target.value);
  };

  render() {
    return (
      <details className="filter-drop-down__container">
        <summary className="filter__summary">{this.props.summary}</summary>
        <div className="filter-drop-down">
          {this.props.details.map(detail => {
            return (
              <div className="filter-drop-down__element" key={detail.href}>
                <a className="filter-drop-down__link" href={detail.href}>
                  {detail.icon}
                  <span className="filter-drop-down__span">{detail.desc}</span>
                </a>
              </div>
            );
          })}
        </div>
      </details>
    );
  }
}

export default TextField;
