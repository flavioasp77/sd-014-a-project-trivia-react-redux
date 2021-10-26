import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/ranking.css';

export class Ranking extends Component {
  render() {
    const arrayPlayers = JSON.parse(localStorage.getItem('ranking'));
    arrayPlayers.sort((a, b) => b.score - a.score);
    const { history } = this.props;
    const podio = 3;
    return (
      <main className="main-containner-ranking">
        <h2 data-testid="ranking-title">Ranking</h2>
        <div className="containner-btn">
          <button
            className="btn-ranking"
            onClick={ () => history.push('/') }
            type="button"
            data-testid="btn-go-home"
          >
            Voltar
          </button>
        </div>
        <div className="containner-podio">
          { arrayPlayers.slice(0, podio).map((i, position) => (
            <div className="podio-space" key={ position }>
              <img
                className={ `img-gravatar${position}` }
                src={ i.picture }
                alt="gravatar"
              />
              <p data-testid={ `player-name-${position}` }>{i.name}</p>
              <div className={ `position${position}` }>
                <p data-testid={ `player-score-${position}` }>{ i.score }</p>
                <div className={ `img-podio${position}` } />
              </div>
            </div>
          )) }
        </div>
        <section className="containner-raking-geral">
          {arrayPlayers.slice(podio).map((item, index) => (
            <div className="card-podio" key={ index + podio }>
              <img src={ item.picture } alt="raking" />
              <div className="infor-player-containner">
                <h3 data-testid={ `player-name-${index + podio}` }>{item.name}</h3>
                <span data-testid={ `player-score-${index + podio}` }>{item.score}</span>
              </div>
            </div>
          ))}
        </section>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
