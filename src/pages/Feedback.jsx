import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { readLocalStorage } from '../services/util';

class Feedback extends Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const ASSERTION = 3;
    const player = readLocalStorage('state');
    if (player.player.assertions < ASSERTION) {
      return (
        <>
          <p data-testid="feedback-text">Podia ser melhor...</p>
          <p data-testid="feedback-total-score">{ player.player.score }</p>
          <p data-testid="feedback-total-question">{ player.player.assertions }</p>
        </>
      );
    }
    if (player.player.assertions >= ASSERTION) {
      return (
        <>
          <p data-testid="feedback-text">Mandou bem!</p>
          <p data-testid="feedback-total-score">{ player.player.score }</p>
          <p data-testid="feedback-total-question">{ player.player.assertions }</p>
        </>
      );
    }
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        { this.feedbackMessage() }
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
