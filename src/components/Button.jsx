import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      value,
      className,
      onClick,
      dataTestId,
      disabled,
    } = this.props;
    return (
      <button
        type="button"
        className={ className }
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
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  className: '',
};

export default Button;
