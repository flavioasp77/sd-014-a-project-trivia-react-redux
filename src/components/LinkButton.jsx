import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class LinkButton extends Component {
  render() {
    const { route, name, testid } = this.props;
    return (
      <Link to={ route }>
        <button
          type="button"
          data-testid={ `btn-${testid}` }
        >
          { name }
        </button>
      </Link>
    );
  }
}

LinkButton.propTypes = {
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};
