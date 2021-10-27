import PropTypes from 'prop-types';
import React from 'react';
import { getRankFromStorage } from '../services/localStorage';
import { getGravatarEmailUrl } from '../services/APIrequests';

class Rank extends React.Component {
  render() {
    const { history } = this.props;
    const rank = getRankFromStorage().sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Rank</h1>
        <div>
          {
            rank.map((elemento, index) => (
              <div key={ index }>
                <p data-testid={ `player-name-${index}` }>{ elemento.name }</p>
                <p data-testid={ `player-score-${index}` }>{ elemento.score }</p>
                <img
                  src={
                    getGravatarEmailUrl + elemento.picture
                  }
                  alt={ elemento.name }
                />
              </div>
            ))
          }
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Rank.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Rank;
