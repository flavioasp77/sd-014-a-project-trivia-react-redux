import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './feedback.css';

export default class Feedback extends Component {
  render() {
    const playerStorage = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = playerStorage.player;
    const ASSERTIONS_NUMBER = 3;
    const message = assertions >= ASSERTIONS_NUMBER ? 'Mandou bem!'
      : 'Podia ser melhor...';
    return (
      <section>
        <Header />
        <div className="feedback">
          <h2 data-testid="feedback-text">{ message }</h2>
          <span className="score">
            Sua pontuação:
            {' '}
            <span data-testid="feedback-total-score" className="score">{ score }</span>
          </span>
          <span className="assertions">
            Número de acertos:
            {' '}
            <span
              data-testid="feedback-total-question"
              className="assertions"
            >
              { assertions }
            </span>
          </span>
          <div className="buttons-feedback">
            <Link to="/">
              <button
                className="btn-feedback"
                type="button"
                data-testid="btn-play-again"
              >
                Jogar novamente
              </button>
            </Link>
            <Link to="/ranking">
              <button
                type="button"
                className="btn-feedback"
                data-testid="btn-ranking"
              >
                Ver Ranking
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
