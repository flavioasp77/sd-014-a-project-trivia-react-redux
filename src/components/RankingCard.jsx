import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RankingCard extends Component {
  render() {
    const { name, score, hash, index } = this.props;
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div className="ranking-card">
        <img
          alt="Player Gravatar"
          className="ranking-profile-picture"
          src={ gravatar }
        />
        <h3 data-testid={ `player-name-${index}` }>
          Nome:
          {' '}
          {name}
        </h3>
        <h3 data-testid={ `player-score-${index}` }>
          Pontuação:
          {' '}
          {score}
        </h3>
      </div>
    );
  }
}

RankingCard.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RankingCard;
