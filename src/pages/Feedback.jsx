import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import GoHomeButton from '../components/GoHomeButton';
import '../styles/Feedback.css';

class Feedback extends Component {
  constructor() {
    super();
    this.showFeedbackMessage = this.showFeedbackMessage.bind(this);
    this.showFeedbackScore = this.showFeedbackScore.bind(this);
  }

  showFeedbackMessage(assertions) {
    const QUESTIONS = 3;
    if (assertions < QUESTIONS) {
      return (
        <span className="feedback-text" data-testid="feedback-text">
          Podia ser melhor...
        </span>
      );
    }
    if (assertions >= QUESTIONS) {
      return (
        <span className="feedback-text" data-testid="feedback-text">
          Mandou bem!
        </span>
      );
    }
  }

  showFeedbackScore(score, assertions) {
    if (score === 0) {
      return (
        <div className="feedback-score">
          <span className="feedback-score" data-testid="feedback-total-question">
            Não acertou nenhuma pergunta

          </span>
          <p>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            pontos
          </p>
        </div>
      );
    }

    return (
      <div className="feedback-score">
        <p>
          Acertou
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          perguntas

        </p>
        <p>
          Um total de
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
          {' '}
          pontos
        </p>
      </div>);
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = player;

    return (
      <>
        <Header score={ score } />
        {this.showFeedbackMessage(assertions)}
        {this.showFeedbackScore(score, assertions)}
        <Link className="btn-ranking" data-testid="btn-ranking" to="/rankings">
          VER RANKING
        </Link>
        <GoHomeButton testId="btn-play-again" />
      </>
    );
  }
}

export default Feedback;
