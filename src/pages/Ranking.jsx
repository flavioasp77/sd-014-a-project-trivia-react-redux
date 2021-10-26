import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    document.title = 'Trivia-Ranking';
  }

  render() {
    const rankingList = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    return (
      <>
        <section data-testid="ranking-list-section">
          <h1 data-testid="ranking-title">Lista de Ranking</h1>
          <ul>
            {rankingList.map((player, index) => (
              <li key={ index }>
                <img
                  src={ player.picture }
                  alt="Imagem do seu avatar"
                  data-testid="header-profile-picture"
                />
                <h3 data-testid={ `player-name-${index}` }>{player.name}</h3>
                <h4 data-testid={ `player-score-${index}` }>{player.score}</h4>
              </li>))}
          </ul>
        </section>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Ir ao Início
          </button>
        </Link>
      </>
    );
  }
}

export default Ranking;
