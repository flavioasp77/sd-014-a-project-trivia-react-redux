import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { getSource } = this.props;
    const state = localStorage.getItem('state');
    const { player: { name, score, assertions } } = JSON.parse(state);
    return (
      <div>
        <Header name={ name } score={ score } source={ getSource } />
        <span data-testid="feedback-text">
          { assertions <= 2 ? 'Podia ser melhor...' : 'Mandou bem!'}
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
  getSource: state.user.infoUser,
});

Feedback.propTypes = {
  getSource: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
