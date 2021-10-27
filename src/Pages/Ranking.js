import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetScore } from '../Redux/actions';

class Ranking extends Component {
  redirectToHome = (history) => {
    const { resetStateScore } = this.props;
    resetStateScore();
    history.push('/');
  }

  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <main>
        <h2 data-testid="ranking-title">
          Ranking
        </h2>
        <ul>
          {ranking.map((player, index) => (
            <li key={ index }>
              <img src={ player.picture } alt="player gravatar" />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.redirectToHome(history) }
        >
          Jogar Novamente
        </button>
      </main>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  resetStateScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetStateScore: () => { dispatch(resetScore()); },
});

export default connect(null, mapDispatchToProps)(Ranking);
