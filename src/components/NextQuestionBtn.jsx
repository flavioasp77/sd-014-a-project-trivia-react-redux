import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NextQuestionBtn extends Component {
  render() {
    const { nextQuestion } = this.props;
    return (
      <div>
        <button
          data-testid="btn-next"
          type="button"
          onClick={ nextQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }
}

NextQuestionBtn.propTypes = {
  nextQuestion: PropTypes.func.isRequired,
};
