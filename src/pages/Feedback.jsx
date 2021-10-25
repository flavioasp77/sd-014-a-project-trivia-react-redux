import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {},
    };
    this.handleClickRanking = this.handleClickRanking.bind(this);
    this.handleClickPlayAgain = this.handleClickPlayAgain.bind(this);
  }

  componentDidMount() {
    this.playerInfoStart();
  }

  playerInfoStart() {
    const player = JSON.parse(localStorage.getItem('state'));
    this.setState({
      player: player.player,
    });
  }

  handleClickRanking() {
    const { player } = this.state;
    const { history, hashImage } = this.props;
    const { score, name } = player;
    if (!localStorage.ranking) localStorage.ranking = JSON.stringify([]);
    const rankingParse = JSON.parse(localStorage.ranking);
    const updatedArray = [
      ...rankingParse,
      { name, score, picture: hashImage },
    ];
    const sortedArray = updatedArray.sort((cur, next) => next.score - cur.score);
    const sortedTopTenArray = this.grabTopTen(sortedArray);
    localStorage.ranking = JSON.stringify(sortedTopTenArray);
    history.push('/ranking');
  }

  grabTopTen(array) {
    const MAX_RANKING_QUANTITY = 10;
    while (array.length > MAX_RANKING_QUANTITY) {
      array.pop();
    }
    return array;
  }

  handleClickPlayAgain() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { player } = this.state;
    const QUESTIONS_THRESHOLD = 3;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          {player.assertions < QUESTIONS_THRESHOLD
            ? 'Podia ser melhor...'
            : 'Mandou bem!'}
        </h1>
        <br />
        <br />
        <span>Você acertou </span>
        <span data-testid="feedback-total-question">
          {player.assertions}
        </span>
        <span>questões!</span>
        <br />
        <span>Com um total de </span>
        <span data-testid="feedback-total-score">
          {player.score}
        </span>
        <span>Pontos!</span>
        <br />
        <button
          type="button"
          name="play-again"
          data-testid="btn-play-again"
          onClick={ this.handleClickPlayAgain }
        >
          Jogar novamente

        </button>
        <button
          type="button"
          name="ranking"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ver Ranking

        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  hashImage: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  hashImage: state.hashImage.hashImage,
});

export default connect(mapStateToProps)(Feedback);
