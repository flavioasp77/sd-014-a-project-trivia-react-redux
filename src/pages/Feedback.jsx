import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { currentScore } = this.props;
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    const numbFeed = 3;
    const feedback = assertions >= numbFeed ? 'Mandou bem!'
      : 'Podia ser melhor...';
    return (
      <>
        <header>
          <Header />
        </header>
        <h1 data-testid="feedback-text">{feedback}</h1>
        <h2 data-testid="feedback-total-question">
          {assertions}
        </h2>
        <h2 data-testid="feedback-total-score">{currentScore}</h2>

      </>
    );
  }
}
Feedback.propTypes = {
  currentScore: PropTypes.number.isRequired,
};
export default Feedback;
