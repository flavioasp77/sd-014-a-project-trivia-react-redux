import React, { Component } from 'react';
import MD5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export default class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      score: 0,
      picture: '',
      loading: true,
    };

    this.rankingFetcher = this.rankingFetcher.bind(this);
    this.rankingSetter = this.rankingSetter.bind(this);
    this.playerFetcher = this.playerFetcher.bind(this);
  }

  componentDidMount() {
    this.playerFetcher();
  }

  rankingSetter() {
    const { name, score, picture } = this.state;
    const player = { name, score, picture };
    const triviaRanking = JSON.parse(localStorage.getItem('ranking'));
    if (triviaRanking === null) {
      localStorage.setItem('ranking', JSON.stringify([player]));
    } else if (triviaRanking) {
      triviaRanking.push(player);
      const sortedRankings = triviaRanking
        .map((p) => p)
        .sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(sortedRankings));
    }

    this.setState({
      loading: false,
    });
  }

  rankingFetcher() {
    const localRankings = JSON.parse(localStorage.getItem('ranking'));
    const rankList = localRankings.map((player, index) => {
      const { name, score, picture } = player;
      return (
        <li className="flex space-x-10" key={ index }>
          <img className="rounded-full h-12 w-12" src={ picture } alt="Gravatar Fail" />
          <p data-testid={ `player-name-${index}` }>{name}</p>
          <p data-testid={ `player-score-${index}` }>{score}</p>
        </li>
      );
    });

    return (
      <ol>
        { rankList }
      </ol>
    );
  }

  playerFetcher() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { username, score, gravatarEmail } = player;
    const hash = MD5(gravatarEmail).toString();
    const gravatarConverter = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      name: username,
      score,
      picture: gravatarConverter,
    }, () => this.rankingSetter());
  }

  render() {
    const { loading } = this.state;
    return (
      <div
        className="flex flex-col justify-center items-center
        w-screen h-screen border-2 border-gray-500 rounded-md"
      >
        <span className="text-3xl" data-testid="ranking-title">Ranking</span>
        { loading ? <Loading /> : <this.rankingFetcher /> }
        <Link to="/" className="m-5 p-4 rounded-md bg-gray-400 hover:bg-blue-400">
          <button type="button" data-testid="btn-go-home">
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}
