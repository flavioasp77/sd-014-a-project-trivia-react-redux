import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FeedbackHeader from '../components/FeedbackHeader';

class Feedback extends Component {
  render() {
    return (
      <main>
        <FeedbackHeader />
        <div data-testid="feedback-text">
          Feedback!
        </div>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
          >
            Jogar de novo!
          </button>
        </Link>

      </main>
    );
  }
}

export default Feedback;
