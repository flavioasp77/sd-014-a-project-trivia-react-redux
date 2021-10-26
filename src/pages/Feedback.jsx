import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    // const { currentScore } = this.props;
    const { assertions, score } = JSON.parse(localStorage.getItem('state')).player;
    const numbFeed = 3;
    const feedback = assertions >= numbFeed ? 'Mandou bem!'
      : 'Podia ser melhor...';
    return (
      <>
        <header>
          <Header />
        </header>
        <h1 data-testid="feedback-text">{feedback}</h1>
        <h2 data-testid="feedback-total-score">{score}</h2>
        {
          assertions === 0 ? (
            <span>
              Não acertou nenhuma pergunta
              <span data-testid="feedback-total-question">{assertions}</span>
            </span>
          ) : (
            <p>
              Acertou
              {' '}
              <span data-testid="feedback-total-question">{assertions}</span>
              {' '}
              Pergunta(s)
            </p>

          )
        }
      </>
    );
  }
}

Feedback.propTypes = {
  currentScore: PropTypes.number.isRequired,
};
export default Feedback;
