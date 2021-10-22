import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const { className, disabled, onClick, testid, submit, value } = this.props;
    return (
      <button
        type={ submit ? 'submit' : 'button' }
        className={ className }
        data-testid={ testid }
        disabled={ disabled }
        onClick={ onClick }
      >
        { value }
      </button>
    );
  }
}

Button.defaultProps = {
  className: '',
  disabled: false,
  onClick: null,
  submit: true,
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  submit: PropTypes.bool,
  testid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
