import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.state = {
      assertions: 0,
      score: 0,
    };
    this.sendToInitial = this.sendToInitial.bind(this);
    this.getAssertions = this.getAssertions.bind(this);
    this.sendToRanking = this.sendToRanking.bind(this);
  }

  componentDidMount() {
    this.getAssertions();
  }

  getAssertions() {
    const stateStorage = JSON.parse(localStorage.getItem('state'));
    this.setState({ assertions: stateStorage.player.assertions,
      score: stateStorage.player.score });
    console.log('con fe');
  }

  sendToInitial() {
    const { history } = this.props;
    history.push('/');
  }

  sendToRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.state;
    const minAssertionsAllowed = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
        {assertions >= minAssertionsAllowed ? <p>Mandou bem!</p>
          : <p>Podia ser melhor...</p>}
        <div>
          <p data-testid="feedback-total-question">{assertions}</p>
          <p data-testid="feedback-total-score">{score}</p>
        </div>
        <div>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.sendToInitial }
          >
            Jogar Novamente
          </button>
        </div>
        <div>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.sendToRanking }
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
