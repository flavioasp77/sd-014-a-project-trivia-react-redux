import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import GoHomeButton from '../components/GoHomeButton';
import '../styles/Feedback.css';

class Feedback extends Component {
  constructor() {
    super();
    this.showFeedbackMessage = this.showFeedbackMessage.bind(this);
  }

  showFeedbackMessage(assertions) {
    const QUESTIONS = 3;
    if (assertions < QUESTIONS) {
      return (
        <span data-testid="feedback-text">Podia ser melhor...</span>
      );
    }
    if (assertions >= QUESTIONS) {
      return (
        <span data-testid="feedback-text">Mandou bem!</span>
      );
    }
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = player;

    return (
      <>
        <Header score={ score } />
        {this.showFeedbackMessage(assertions)}
        <Link className="btn-ranking" data-testid="btn-ranking" to="/rankings">
          VER RANKING
        </Link>
        <GoHomeButton testId="btn-play-again" />
      </>
    );
  }
}

export default Feedback;
