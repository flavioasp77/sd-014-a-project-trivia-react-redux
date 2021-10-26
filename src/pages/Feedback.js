import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const MIN_SCORE = 3;
    return assertions < MIN_SCORE ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    const { assertions, score } = this.state;
    const { history } = this.props;
    return (
      <div className="w-100 h-100 row d-flex justify-content-center align-items-center">
        <div
          className="d-flex flex-column shadow p-3 mb-5
        bg-body rounded px-5 align-items-center col-md-8"
        >
          <Header />
          <p data-testid="feedback-text">{ this.feedbackMsg() }</p>
          <p className="text-center">
            <p className="h3">Acertos</p>
            <span data-testid="feedback-total-question" className="text-success h2">
              {assertions}
            </span>

          </p>
          <h3
            data-testid="feedback-total-score"
            className="border p-3 border-dark"
          >
            {score}

          </h3>
          <PlayAgainBtn />
          <button
            type="button"
            className="btn btn-warning px-5"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
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
