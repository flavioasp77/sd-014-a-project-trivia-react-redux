import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.getScore = this.getScore.bind(this);
  }

  getScore() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions } = player;
    const MIN_SCORE = 3;
    const goodScore = 'Mandou bem!';
    const badScore = 'Podia ser melhor...';
    return (assertions < MIN_SCORE) ? badScore : goodScore;
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = player;
    return (
      <>
        <Header />
        <div
          className="flex flex-col justify-center items-center
          w-100 h-screen border-2 border-gray-500 rounded-md"
        >
          <h1 className="text-3xl mb-5" data-testid="feedback-text">
            { this.getScore() }
          </h1>
          <h2 className="text-2xl mb-4">
            Acertos:
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </h2>
          <h2 className="text-2xl mb-4">
            Pontuação:
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
          </h2>
          <div className="flex">
            <Link to="/" className="m-2 p-4 rounded-md bg-gray-400 hover:bg-blue-400">
              <button type="button" data-testid="btn-play-again">
                Jogar novamente
              </button>
            </Link>
            <Link
              to="/ranking"
              className="m-2 p-4 rounded-md bg-gray-400 hover:bg-blue-400"
            >
              <button type="button" data-testid="btn-ranking">
                Ver Ranking
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Score;
