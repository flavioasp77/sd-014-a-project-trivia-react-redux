import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  render() {
    const { htmlFor, label, testid, onChange, type, value } = this.props;
    return (
      <label htmlFor={ htmlFor }>
        { label }
        <input
          data-testid={ testid }
          id={ htmlFor }
          name={ htmlFor }
          onChange={ onChange }
          type={ type }
          value={ value }
        />
      </label>
    );
  }
}

Input.defaultProps = {
  value: undefined,
};

Input.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};
