import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RankingPerson from '../components/RankingPerson';
import { getRankingFromLocalStorage } from '../services/localStorage';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.goToPageHome = this.goToPageHome.bind(this);
  }

  goToPageHome() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = getRankingFromLocalStorage();
    ranking.sort((a, b) => b.score - a.score);
    console.log(ranking);
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goToPageHome }
        >
          Tela Inicial
        </button>
        { ranking.map((player, index) => (<RankingPerson
          key={ index }
          index={ index }
          username={ player.name }
          gravatarEmail={ player.gravatarEmail }
          score={ player.score }
        />)) }
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
