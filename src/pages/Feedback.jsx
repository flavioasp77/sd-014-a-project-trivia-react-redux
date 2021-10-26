import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { readLocalStorage } from '../services/util';
import { getScore } from '../actions';
import '../style/feedback.css';

class Feedback extends Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
    this.zerar = this.zerar.bind(this);
  }

  feedbackMessage() {
    const ASSERTION = 3;
    const player = readLocalStorage('state');
    if (player.player.assertions < ASSERTION) {
      return (
        <>
          <p data-testid="feedback-text">Podia ser melhor...</p>
          <p data-testid="feedback-total-score">{ `Pontos Totais: ${player.player.score}` }</p>
          <p data-testid="feedback-total-question">{ `Acertos: ${player.player.assertions}` }</p>
        </>
      );
    }
    if (player.player.assertions >= ASSERTION) {
      return (
        <>
          <p data-testid="feedback-text">Mandou bem!</p>
          <p data-testid="feedback-total-score">{ `Pontos Totais: ${player.player.score}` }</p>
          <p data-testid="feedback-total-question">{ `Acertos: ${player.player.assertions}` }</p>
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
      <div data-testid="feedback-text" className="feedback">
        <Header />
        <div className="feedback-container">
          <div className="cont2">
            { this.feedbackMessage() }
            <Link to="/">
              <button
                type="button"
                data-testid="btn-play-again"
                onClick={ this.zerar }
                className="jogarNVM"
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
        </div>
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sendScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
