import React, { Component } from 'react'

class RankingCard extends Component {
  render() {
    const { player:{name,assertions,score}, index } = this.props;
    return (
      <div>
        <p data-testid={` player-name-${index}`}>{name} </p>
        <p data-testid={` player-score-${index}`}>{score} </p>
      </div>
    )
  }
}

export default RankingCard;
