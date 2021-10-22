import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export class Feedback extends Component {
  render() {
    const { assertions, score } = JSON.parse(localStorage.getItem('state')).player;
    const numFeedback = 3;
    const feedback = assertions >= numFeedback ? 'Mandou bem!' : 'Podia ser melhor...';
    const { history } = this.props;
    return (
      <main>
        <Header />
        <h4 data-testid="feedback-text">{feedback}</h4>
        <h4 data-testid="feedback-total-score">{score}</h4>
        <h4 data-testid="feedback-total-question">{assertions}</h4>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </main>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Feedback;
