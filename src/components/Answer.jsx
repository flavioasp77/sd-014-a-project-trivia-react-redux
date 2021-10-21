import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Answer extends Component {
  render() {
    const { answer, onClick } = this.props;
    const { text, className, testId } = answer;
    return (
      <button
        type="button"
        disabled={ false }
        className={ className }
        data-testid={ testId }
        name={ testId }
        onClick={ onClick }
      >
        { text }
      </button>
    );
  }
}

Answer.propTypes = {
  answer: PropTypes.shape({
    className: PropTypes.string,
    testId: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Answer;
