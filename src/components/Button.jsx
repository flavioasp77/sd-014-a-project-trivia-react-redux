import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const { disabled, testid, submit, value } = this.props;
    return (
      <button
        type={ submit ? 'submit' : 'button' }
        data-testid={ testid }
        disabled={ disabled }
      >
        { value }
      </button>
    );
  }
}

Button.defaultProps = {
  disabled: false,
  submit: true,
};

Button.propTypes = {
  disabled: PropTypes.bool,
  submit: PropTypes.string,
  testid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
