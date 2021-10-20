import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      id,
      value,
      className,
      onClick,
      disabled,
      dataTestId,
    } = this.props;
    return (
      <button
        type="button"
        className={ className }
        id={ id }
        onClick={ onClick }
        disabled={ disabled }
        data-testid={ dataTestId }
      >
        { value }
      </button>
    );
  }
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default Button;
