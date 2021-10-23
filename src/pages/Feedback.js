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
    const { userName, infoUser } = this.props;
    const state = localStorage.getItem('state');
    const { user: { score, assertions } } = JSON.parse(state);
    return (
      <div>
        <Header name={ userName } score={ score } source={ infoUser } />
        <span data-testid="feedback-text">
          { this.handleMenssage() }
        </span>
        <span data-testid="feedback-total-score">
          { score }
        </span>
        <span data-testid="feedback-total-question">
          { assertions }
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
  userName: propTypes.string.isRequired,
  infoUser: propTypes.string.isRequired,
};

export default connect(null, mapStateToProps)(Feedback);
