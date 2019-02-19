import React, { Component } from "react";

class TemplateDropDown extends Component {
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

export default TemplateDropDown;
