import React, { Component } from 'react';

export default class RenderRanking extends Component {
  render() {
    const playerRankings = JSON.parse(localStorage.getItem('ranking')).ranking;
    return (
      <ol>
        { playerRankings
          .sort((playerA, playerB) => playerB.score - playerA.score)
          .map((player, index) => (
            <li key={ index } className="user-ranking">
              <span
                data-testid={ `player-name-${index}` }
                className="user-name"
              >
                { player.name }
              </span>
              <span className="user-points">
                - Pontos:
                {' '}
                <span data-testid={ `player-score-${index}` }>
                  { player.score }
                </span>
              </span>
            </li>
          )) }
      </ol>
    );
  }
}
