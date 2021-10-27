import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';

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

Button.defaultProps = {
  isDisabled: false,
  onClick: null,
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default Button;
