import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SelectInput extends Component {
  render() {
    const { id, title, handler, options } = this.props;
    return (
      <label htmlFor={ id } className="m-4">
        {title}
        :
        <select name={ id } id={ id } className="form-select" onChange={ handler }>
          {options.map(({ value, name }, index) => (
            <option
              key={ index }
              value={ value }
            >
              {' '}
              {name}
            </option>
          ))}

        </select>
      </label>
    );
  }
}

SelectInput.propTypes = {
  handler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};
