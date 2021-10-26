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
          <h2 data-testid="feedback-text" className="title">{ message }</h2>
          <span>
            <h4 className="score" data-testid="feedback-total-score">
              Sua pontuação:
              {' '}
              { score }
            </h4>
            <h4 className="assertions" data-testid="feedback-total-question">
              Número de acertos:
              {' '}
              { assertions }
            </h4>
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
