import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/RankingCard.css';

class RankingCard extends Component {
  render() {
    const { index, name, picture, score } = this.props;
    const gravatar = `https://www.gravatar.com/avatar/${picture}`;
    return (
      <div className="ranking-card">
        <img alt="Player Gravatar" className="ranking-picture" src={ gravatar } />
        <p className="ranking-text">
          <span data-testid={ `player-name-${index}` }>{name}</span>
          {' '}
          -
          {' '}
          <span data-testid={ `player-score-${index}` }>{score}</span>
          {' '}
          pontos
        </p>
      </div>
    );
  }
}

RankingCard.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RankingCard;
