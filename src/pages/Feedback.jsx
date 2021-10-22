import React, { Component } from 'react';
import Header from '../components/Header';

export class Feedback extends Component {
  render() {
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    const numFeedback = 3;
    const feedback = assertions >= numFeedback ? 'Mandou bem!' : 'Podia ser melhor...';
    return (
      <main>
        <Header />
        <h4 data-testid="feedback-text">{feedback}</h4>
      </main>
    );
  }
}

export default Feedback;
