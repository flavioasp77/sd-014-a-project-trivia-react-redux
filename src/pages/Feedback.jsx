import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    const playerStorage = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = playerStorage.player;
    const ASSERTIONS_NUMBER = 3;
    const message = assertions >= ASSERTIONS_NUMBER ? 'Mandou bem!'
      : 'Podia ser melhor...';
    return (
      <>
        <Header />
        <h2 data-testid="feedback-text">{ message }</h2>
        <span>
          Sua pontuação:
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </span>
        <span>
          Número de acertos:
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </span>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </>
    );
  }
}
