import PropTypes from 'prop-types';
import React, { Component } from 'react';

class NextBtn extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ handleClick }
        style={ { order: 5 } }
      >
        Próxima
      </button>
    );
  }
}

NextBtn.propTypes = {
  handleClick: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default NextBtn;
