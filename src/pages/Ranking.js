import React, { Component } from 'react';
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
    players.sort((a, b) =>  localRanking[b].score - localRanking[a].score);
    return players.map((player, index) => <RankingCard key={index} index={ index } player={ localRanking[player] } />);
  }

  render() {
    return (
      <div>
        <h2>Ranking</h2>
        { this.handlePlayers() }
      </div>
    );
  }
}

export default Ranking;
