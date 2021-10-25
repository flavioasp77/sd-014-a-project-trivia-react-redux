import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import GoHomeButton from '../components/GoHomeButton';
import '../styles/Feedback.css';

class Feedback extends Component {
  feedbackText(assertions) {
    const MIN_QUESTIONS = 3;

    return assertions < MIN_QUESTIONS ? (
      <span className="feedback-text" data-testid="feedback-text">
        Podia ser melhor...
      </span>
    ) : (
      <span className="feedback-text" data-testid="feedback-text">
        Mandou bem!
      </span>
    );
  }

  feedbackTotalQuestion(assertions) {
    return (
      <span>
        Você acertou
        {' '}
        <span data-testid="feedback-total-question">{assertions}</span>
        {' '}
        questões!
      </span>
    );
  }

  feedbackTotalScore(score) {
    return (
      <span>
        Um total de
        {' '}
        <span data-testid="feedback-total-score">{score}</span>
        {' '}
        pontos
      </span>
    );
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = player;

    return (
      <>
        <Header score={ score } />
        {this.feedbackText(assertions)}
        <div className="feedback-total">
          {this.feedbackTotalQuestion(assertions)}
          {this.feedbackTotalScore(score)}
        </div>
        <Link className="btn-ranking" data-testid="btn-ranking" to="/rankings">
          VER RANKING
        </Link>
        <GoHomeButton testId="btn-play-again" />
      </>
    );
  }
}

export default Feedback;
