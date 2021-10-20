import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      id,
      label,
      type,
      name,
      value,
      onChange,
      className,
    } = this.props;
    return (
      <label htmlFor={ id }>
        { label }
        <input
          type={ type }
          name={ name }
          value={ value }
          id={ id }
          onChange={ onChange }
          className={ className }
        />
      </label>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default Input;
