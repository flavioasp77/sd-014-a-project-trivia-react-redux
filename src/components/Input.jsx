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
      dataTestId,
    } = this.props;

    return (
      <label htmlFor={ id }>
        <h5>{ label }</h5>
        <input
          type={ type }
          name={ name }
          value={ value }
          id={ id }
          onChange={ onChange }
          className={ className }
          data-testid={ dataTestId }
        />
      </label>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
