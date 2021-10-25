import PropTypes from 'prop-types';
import React, { Component } from 'react';

class RankingCard extends Component {
  render() {
    const { player: { name, score }, index } = this.props;
    return (
      <div>
        <p data-testid={ ` player-name-${index}` }>{name}</p>
        <p data-testid={ ` player-score-${index}` }>
          {score}
          {' '}
        </p>
      </div>
    );
  }
}

RankingCard.propTypes = {
  index: PropTypes.number.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};

export default RankingCard;
