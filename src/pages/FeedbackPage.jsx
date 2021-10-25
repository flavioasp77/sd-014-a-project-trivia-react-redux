import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

const SCORE_LIMIT = 3;

class FeedbackPage extends Component {
  renderScoreMessage(assertions) {
    return (assertions < SCORE_LIMIT ? 'Podia ser melhor...' : 'Mandou bem!');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <Link to="/ranking" data-testid="btn-ranking">Ver Ranking</Link>

        <h3 data-testid="feedback-text">{this.renderScoreMessage(assertions)}</h3>

        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>

      </div>
    );
  }
}

FeedbackPage.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(FeedbackPage);
