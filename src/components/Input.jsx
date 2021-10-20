import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, id, dataTestId, value, onChange } = this.props;
    return (
      <input
        type={ type }
        id={ id }
        data-testid={ dataTestId }
        value={ value }
        onChange={ onChange }
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  dataTestId: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}.isRequired;

export default Input;
