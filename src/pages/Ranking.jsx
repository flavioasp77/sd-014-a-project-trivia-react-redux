import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getRanking } from '../services/triviaAPI';

class Ranking extends Component {
  render() {
    const ranking = getRanking();
    const { history } = this.props;
    return (
      <>
        <div data-testid="ranking-title">
          Página Ranking
        </div>
        <div>
          {ranking.sort((a, b) => b.score - a.score).map((player, i) => (
            <div key={ i }>
              <div data-testid={ `player-name-${i}` }>
                { player.name }
              </div>
              <div data-testid={ `player-score-${i}` }>
                { player.score }
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Início
          </button>
        </div>
      </>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
