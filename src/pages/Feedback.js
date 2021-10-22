import React, { Component } from 'react';
import Header from '../components/Header';
import PlayAgainBtn from '../components/PlayAgainBtn';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      assertions: 0,
      score: 0,
    };
  this.feedbackMsg = this.feedbackMsg.bind(this);
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

  feedbackMsg() {
    const { assertions } = this.state;
    const MIN_SCORE= 3;
    return assertions < MIN_SCORE ? 'Podia ser melhor...' : 'Mandou bem!';
  }


  render() {
    const { assertions, score } = this.state;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ this.feedbackMsg() }</p>
        <h3 data-testid="feedback-total-question">
          {assertions}
        </h3>
        <h3 data-testid="feedback-total-score">{score}</h3>
        <PlayAgainBtn />
      </div>
    );
  }
}

export default Feedback;
