import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = ranking.sort((a, b) => (b.score - a.score));
    return (
      <main>
        <div data-testid="ranking-title">
          Ranking
        </div>
        { sortRanking.map(({ name, score, picture }, index) => (
          <ul key={ index }>
            <li><img src={ picture } alt="player" /></li>
            <li>{ name }</li>
            <li>{ score }</li>
          </ul>
        )) }
      </main>
    );
  }
}

export default Ranking;
