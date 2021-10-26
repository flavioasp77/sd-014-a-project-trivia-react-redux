import PropTypes from 'prop-types';
import React, { Component } from 'react';

class RankingCard extends Component {
  trophy(idx) {
    const PODIUM = 3;
    const colors = ['first', 'second', 'third'];
    if (idx < PODIUM) {
      return <p className={ `${colors[idx]} mx-3` }><i className="fas fa-trophy" /></p>;
    }
    return <p className="mx-3"><i className="fas fa-medal" /></p>;
  }

  render() {
    const { player: { name, score }, index } = this.props;
    return (
      <div
        className="d-flex p-2 border m-1 align-items-center
      border-dark justify-content-between py-3 rounded"
      >
        { this.trophy(index) }
        <p data-testid={ ` player-name-${index}` }>{name}</p>
        <p
          className="fw-bold mx-2"
          data-testid={ ` player-score-${index}` }
        >
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
