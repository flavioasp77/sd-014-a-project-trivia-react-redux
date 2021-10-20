import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { label, onClick, emailValidation } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ emailValidation }
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
};

export default Button;
