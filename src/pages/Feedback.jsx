import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FeedbackHeader from '../components/FeedbackHeader';
import '../utils/localstorage';

const magicNumber = 3;
class Feedback extends Component {
  render() {
    const { player: { assertions } } = localStorage.getObj('state');
    const message = assertions < magicNumber ? 'Podia ser melhor...' : 'Mandou bem!';
    return (
      <main>
        <FeedbackHeader />
        <div data-testid="feedback-text">
          { message }
        </div>
        <Link to="/login">
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
