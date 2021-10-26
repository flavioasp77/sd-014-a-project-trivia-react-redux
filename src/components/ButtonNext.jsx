import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonNext extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ onClick }
        className="btn btn-success"
      >
        Próxima Questão
      </button>
    );
  }
}

ButtonNext.propTypes = {
  onClick: PropTypes.func.isRequired,
};
