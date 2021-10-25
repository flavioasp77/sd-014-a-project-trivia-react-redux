import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { readLocalStorage } from '../services/util';

class Feedback extends Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
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
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

export default Feedback;
