import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FeedbackHeader from '../components/FeedbackHeader';
import '../utils/localstorage';

const magicNumber = 3;
class Feedback extends Component {
  render() {
    const { player: { assertions, score } } = localStorage.getObj('state');
    const message = assertions < magicNumber ? 'Podia ser melhor...' : 'Mandou bem!';
    return (
      <main>
        <FeedbackHeader />
        <div data-testid="feedback-text">
          { message }
        </div>
        <div>
          <h2 data-testid="feedback-total-score">{ score }</h2>
          <h2 data-testid="feedback-total-question">{ assertions }</h2>
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>

      </main>
    );
  }
}

export default Feedback;
