import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      id,
      value,
      className,
      onClick,
    } = this.props;
    return (
      <button
        type="button"
        className={ className }
        id={ id }
        onClick={ onClick }
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
};

export default Button;
