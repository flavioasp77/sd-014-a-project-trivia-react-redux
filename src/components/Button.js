import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { label, onClick, emailValidation, dataTestid } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ emailValidation }
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
  emailValidation: PropTypes.func.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default Button;
