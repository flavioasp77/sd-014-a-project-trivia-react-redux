import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      assertions: 0,
      score: 0,
    };
  }

  componentDidMount() {
    this.updateState();
  }

  updateState() {
    const { score, assertions } = JSON.parse(localStorage.getItem('state')).player;
    this.setState({
      score,
      assertions,
    });
  }

  render() {
    const { assertions, score } = this.state;
    return (
      <div data-testid="feedback-text">
        <Header />
        <h3 data-testid="feedback-total-question">
          {assertions}
        </h3>
        <h3 data-testid="feedback-total-score">{score}</h3>
      </div>
    );
  }
}

export default Feedback;
