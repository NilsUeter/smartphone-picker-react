import React, { Component } from "react";
import { observer } from "mobx-react";

import FilterStore from "./FilterStore.js";

@observer
class RatingStars extends Component {
  changeAttribute = e => {
    FilterStore.changeAttribute(this.props.name, e.target.value);
  };

  render() {
    return (
      <div className="rating-stars">
        <input
          className="rating-input"
          id={this.props.name + "input-1-5"}
          value="5"
          type="radio"
          checked={FilterStore[this.props.name] === "5"}
          onChange={this.changeAttribute}
        />
        <label
          htmlFor={this.props.name + "input-1-5"}
          className="rating-star"
        />
        <input
          className="rating-input"
          id={this.props.name + "input-1-4"}
          value="4"
          type="radio"
          checked={FilterStore[this.props.name] === "4"}
          onChange={this.changeAttribute}
        />
        <label
          htmlFor={this.props.name + "input-1-4"}
          className="rating-star"
        />
        <input
          className="rating-input"
          id={this.props.name + "input-1-3"}
          value="3"
          type="radio"
          checked={FilterStore[this.props.name] === "3"}
          onChange={this.changeAttribute}
        />
        <label
          htmlFor={this.props.name + "input-1-3"}
          className="rating-star"
        />
        <input
          className="rating-input"
          id={this.props.name + "input-1-2"}
          value="2"
          type="radio"
          checked={FilterStore[this.props.name] === "2"}
          onChange={this.changeAttribute}
        />
        <label
          htmlFor={this.props.name + "input-1-2"}
          className="rating-star"
        />
        <input
          className="rating-input"
          id={this.props.name + "input-1-1"}
          value="1"
          type="radio"
          checked={FilterStore[this.props.name] === "1"}
          onChange={this.changeAttribute}
        />
        <label
          htmlFor={this.props.name + "input-1-1"}
          className="rating-star first-rating-star"
        />
      </div>
    );
  }
}

export default RatingStars;
