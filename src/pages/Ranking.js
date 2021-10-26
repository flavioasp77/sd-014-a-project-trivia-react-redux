import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RankingCard from '../components/RankingCard';
import '../css/ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    this.state = {
      localRanking,
    };
    this.handlePlayers = this.handlePlayers.bind(this);
  }

  handlePlayers() {
    const { localRanking } = this.state;
    const players = Object.keys(localRanking);
    players.sort((a, b) => localRanking[b].score - localRanking[a].score);
    return players.map((player, index) => (<RankingCard
      key={ index }
      index={ index }
      player={ localRanking[player] }
    />));
  }

  render() {
    const { history } = this.props;
    return (
      <div className="h-100 w-100 d-flex justify-content-center bg-light">
        <div className="d-flex flex-column min-w-75">
          <h2 data-testid="ranking-title" className="text-center py-3">Ranking</h2>
          <div className="h-75 overflow-auto mb-3">
            { this.handlePlayers() }
          </div>
          <button
            type="button"
            className="btn btn-success py-2"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
