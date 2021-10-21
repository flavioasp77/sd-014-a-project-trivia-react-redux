import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { label, onClick, isDisabled, dataTestid } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ isDisabled }
        data-testid={ dataTestid }
      >
        { label }
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default Button;
