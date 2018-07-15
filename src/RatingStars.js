import React, { Component } from "react";
import { observer } from "mobx-react";
import "./RatingStars.css";

import FilterStore from "./FilterStore.js";

@observer
class RatingStars extends Component {
  render() {
    return (
      <div>
        <span className="rating">
          <input
            className="rating-input rating_updater"
            id={this.props.name + "input-1-5"}
            name={this.props.name + "-input-1"}
            value="5"
            type="radio"
            defaultChecked={FilterStore[this.props.name] === 5}
            onChange={changeEvent => {
              FilterStore.changeAttribute(
                this.props.name,
                changeEvent.target.value
              );
            }}
          />

          <label
            htmlFor={this.props.name + "input-1-5"}
            className="rating-star"
          />
          <input
            className="rating-input rating_updater"
            id={this.props.name + "input-1-4"}
            name={this.props.name + "-input-1"}
            value="4"
            type="radio"
            defaultChecked={FilterStore[this.props.name] === 4}
            onChange={changeEvent => {
              FilterStore.changeAttribute(
                this.props.name,
                changeEvent.target.value
              );
            }}
          />

          <label
            htmlFor={this.props.name + "input-1-4"}
            className="rating-star"
          />
          <input
            className="rating-input rating_updater"
            id={this.props.name + "input-1-3"}
            name={this.props.name + "-input-1"}
            value="3"
            type="radio"
            defaultChecked={FilterStore[this.props.name] === 3}
            onChange={changeEvent => {
              FilterStore.changeAttribute(
                this.props.name,
                changeEvent.target.value
              );
            }}
          />

          <label
            htmlFor={this.props.name + "input-1-3"}
            className="rating-star"
          />
          <input
            className="rating-input rating_updater"
            id={this.props.name + "input-1-2"}
            name={this.props.name + "-input-1"}
            value="2"
            type="radio"
            defaultChecked={FilterStore[this.props.name] === 2}
            onChange={changeEvent => {
              FilterStore.changeAttribute(
                this.props.name,
                changeEvent.target.value
              );
            }}
          />

          <label
            htmlFor={this.props.name + "input-1-2"}
            className="rating-star"
          />
          <input
            className="rating-input rating_updater"
            id={this.props.name + "input-1-1"}
            name={this.props.name + "-input-1"}
            value="1"
            type="radio"
            defaultChecked={FilterStore[this.props.name] === 1}
            onChange={changeEvent => {
              FilterStore.changeAttribute(
                this.props.name,
                changeEvent.target.value
              );
            }}
          />
          <label
            htmlFor={this.props.name + "input-1-1"}
            className="rating-star first-rating-star"
          />
        </span>
      </div>
    );
  }
}

export default RatingStars;
