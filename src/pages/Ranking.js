import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RankingCard from '../components/RankingCard';

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
    return players.map((player, index) => <RankingCard key={ index } index={ index } player={ localRanking[player] } />);
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>

        { this.handlePlayers() }
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

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
