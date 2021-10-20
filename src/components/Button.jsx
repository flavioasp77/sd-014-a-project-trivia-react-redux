import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { name, dataTestId } = this.props;
    return (
      <button
        data-testid={ dataTestId }
        type="button"
      >
        { name }
      </button>
    );
  }
}

Button.propTypes = {
  name: PropTypes.string,
  dataTestId: PropTypes.string,
}.isRequired;

export default Button;
