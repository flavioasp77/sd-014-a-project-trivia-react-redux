import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  handleMenssage() {
    const { totalScore } = this.props;
    if (totalScore <= 2) {
      return <p>Podia ser melhor...</p>;
    }
    return <p>Mandou bem!</p>;
  }

  render() {
    const { totalScore, totalQuestion } = this.props;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          { this.handleMenssage() }
        </span>
        <span data-testid="feedback-total-score">
          { totalQuestion }
        </span>
        <span data-testid="feedback-total-question">
          { totalScore }
        </span>
        <Link to="/" type="button" data-testid="btn-play-again">
          Jogar novamente
        </Link>
        <Link to="/ranking" type="button" data-testid="btn-ranking">
          Ver Ranking
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalScore: state.game.points,
  totalQuestion: state.game.score,
});

Feedback.propTypes = {
  totalScore: propTypes.number.isRequired,
  totalQuestion: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
