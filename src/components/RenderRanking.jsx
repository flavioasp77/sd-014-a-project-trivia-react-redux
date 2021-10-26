import React, { Component } from 'react';

export default class RenderRanking extends Component {
  render() {
    const playerRankings = JSON.parse(localStorage.getItem('ranking')).ranking;
    return (
      <>
        { playerRankings
          .sort((playerA, playerB) => playerB.score - playerA.score)
          .map((player, index) => (
            <div key={ index }>
              <span data-testid={ `player-name-${index}` }>{ player.name }</span>
              <span>
                - Pontos:
                {' '}
                <span data-testid={ `player-score-${index}` }>
                  { player.score }
                </span>
              </span>
            </div>
          )) }
      </>
    );
  }
}
