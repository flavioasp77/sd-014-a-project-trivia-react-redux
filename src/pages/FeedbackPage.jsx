import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetAll as resetAllAction } from '../redux/actions';

const SCORE_LIMIT = 3;

class FeedbackPage extends Component {
  renderScoreMessage(assertions) {
    return (assertions < SCORE_LIMIT ? 'Podia ser melhor...' : 'Mandou bem!');
  }

  render() {
    const { assertions, score, resetAll } = this.props;
    return (
      <div className="page">
        <Header />
        <div className="feedback-container rounded shadow mt-5 p-5">
          <h1 data-testid="feedback-text">Seu resultado</h1>
          <h3 data-testid="feedback-text">{this.renderScoreMessage(assertions)}</h3>

          <p>
            Score:
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
          </p>
          <p>
            Acertos:
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </p>

          <Link
            to="/"
            data-testid="btn-play-again"
            className="btn btn-success m-2"
            onClick={ () => resetAll() }
          >
            Jogar novamente

          </Link>
          <Link
            to="/ranking"
            data-testid="btn-ranking"
            className="btn btn-secondary m-2"
          >
            Ver Ranking

          </Link>

        </div>

      </div>
    );
  }
}

FeedbackPage.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  resetAll: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetAll: () => dispatch(resetAllAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPage);
