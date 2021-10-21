import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const { disabled, onClick, testid, submit, value } = this.props;
    return (
      <button
        type={ submit ? 'submit' : 'button' }
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
  disabled: false,
  onClick: null,
  submit: true,
};

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  submit: PropTypes.string,
  testid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
