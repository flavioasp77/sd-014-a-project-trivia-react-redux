import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { readLocalStorage } from '../services/util';
import { getScore } from '../actions';

class Feedback extends Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
    this.zerar = this.zerar.bind(this);
  }

  feedbackMessage() {
    const { email } = this.props;
    const ASSERTION = 3;
    const player = readLocalStorage('state');
    if (player[email].assertions < ASSERTION) {
      return (
        <>
          <p data-testid="feedback-text">Podia ser melhor...</p>
          <p data-testid="feedback-total-score">{ player[email].score }</p>
          <p data-testid="feedback-total-question">{ player[email].assertions }</p>
        </>
      );
    }
    if (player[email].assertions >= ASSERTION) {
      return (
        <>
          <p data-testid="feedback-text">Mandou bem!</p>
          <p data-testid="feedback-total-score">{ player[email].score }</p>
          <p data-testid="feedback-total-question">{ player[email].assertions }</p>
        </>
      );
    }
  }

  zerar() {
    const { sendScore } = this.props;
    sendScore(0);
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        { this.feedbackMessage() }
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.zerar }
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendScore: (ponto) => dispatch(getScore(ponto)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sendScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
