import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const rankingList = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    return (
      <>
        <section>
          <h1 data-testid="ranking-title">Lista de Ranking</h1>
          {rankingList.map((player, index) => (
            <React.Fragment key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${player.picture}` }
                alt="Imagem do seu avatar"
                data-testid="header-profile-picture"
              />
              <h3 data-testid={ `player-name-${index}` }>{player.name}</h3>
              <h4 data-testid={ `player-score-${index}` }>{player.score}</h4>
            </React.Fragment>))}
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
