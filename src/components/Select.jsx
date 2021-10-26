import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/settings.css';

export default class Select extends Component {
  render() {
    const { handleChange } = this.props;

    return (
      <>
        <label htmlFor="howMuch">
          Quantity:
          <select
            className="quantity-select"
            name="howMuch"
            id="howMuch"
            onChange={ handleChange }
          >
            <option name="howMuch" value="">Any</option>
            <option name="howMuch" value="5">5</option>
            <option name="howMuch" value="10">10</option>
            <option name="howMuch" value="15">15</option>
            <option name="howMuch" value="20">20</option>
          </select>
        </label>
        <label htmlFor="difficulty">
          Difficulty:
          <select
            className="difficulty-select"
            name="difficulty"
            id="difficulty"
            onChange={ handleChange }
          >
            <option name="difficulty" value="">Any</option>
            <option name="difficulty" value="easy">Easy</option>
            <option name="difficulty" value="medium">Medium</option>
            <option name="difficulty" value="hard">Hard</option>
          </select>
        </label>
        <label htmlFor="type">
          Type:
          <select
            className="type-select"
            name="type"
            id="type"
            onChange={ handleChange }
          >
            <option name="type" value="">Any</option>
            <option name="type" value="boolean">True / False</option>
            <option name="type" value="multiple">multiple choise</option>
          </select>
        </label>
      </>
    );
  }
}

Select.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
