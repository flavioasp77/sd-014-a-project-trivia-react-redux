import React from 'react';
import Header from '../components/Header';

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.getScore = this.getScore.bind(this);
  }

  getScore() {
    const { assertions } = JSON.parse(localStorage.getItem('state'));
    const MIN_SCORE = 3;
    const goodScore = 'Mandou bem!';
    const badScore = 'Podia ser melhor...';
    return assertions < MIN_SCORE ? badScore : goodScore;
  }

  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{this.getScore()}</p>
      </div>
    );
  }
}

export default Score;
