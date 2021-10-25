import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getStateFromStorage } from '../services/localStorage';

export default class Feedback extends Component {
  render() {
    const stateStorage = getStateFromStorage();
    const { assertions, score } = stateStorage.player;
    const MIN_SCORE = 3;
    const { history } = this.props;
    return (
      <div>
        <Header />
        {assertions >= MIN_SCORE
          ? <p data-testid="feedback-text">Mandou bem!</p>
          : <p data-testid="feedback-text">Podia ser melhor...</p>}
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Voltar
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
