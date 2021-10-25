import React, { Component } from 'react';
import LinkButton from '../components/LinkButton';

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
    this.getRanking = this.getRanking.bind(this);
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const storageRanking = JSON.parse(localStorage.getItem('ranking'));
    const storageState = JSON.parse(localStorage.getItem('state'));
    const { name, img, score } = storageState.player;
    const ranking = storageRanking || [];
    const newPlayer = { name, img, score };
    ranking.push(newPlayer);
    ranking.sort((a, b) => {
      const ONE = 1;
      if (a.name < b.name) {
        return -ONE;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    ranking.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(ranking));
    this.setState({
      ranking,
    });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div data-testid="ranking-title">
        <div>
          { ranking.map(({ name, score, img }, index) => (
            <div key={ index }>
              <img src={ img } alt={ name } />
              <p data-testid={ `player-name-${index}` }>{ name }</p>
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </div>
          ))}
        </div>
        <LinkButton route="/" testid="go-home" name="Jogar novamente" />
      </div>
    );
  }
}
