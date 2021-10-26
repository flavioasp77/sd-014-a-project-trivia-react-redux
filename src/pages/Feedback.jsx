import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import getGravatar from '../helpers/getGravatar';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      score: 0,
      pictureURL: '',
      assertions: 0,
    };

    this.cloneLocalStorageToState = this.cloneLocalStorageToState.bind(this);
    this.messageFeedback = this.messageFeedback.bind(this);
    this.handleRanking = this.handleRanking.bind(this);

    document.title = 'Trivia-Feedback';
  }

  componentDidMount() {
    this.cloneLocalStorageToState();
  }

  handleRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { name, score, pictureURL } = this.state;
    const newRanking = [...ranking || [], { name, score, picture: pictureURL }];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  cloneLocalStorageToState() {
    const playerInfo = JSON.parse(localStorage.getItem('state'));
    const { player: { name, score, gravatarEmail, assertions } } = playerInfo;
    this.setState({
      name,
      score,
      pictureURL: getGravatar(gravatarEmail),
      assertions,
    }, () => {
      this.handleRanking();
    });
  }

  messageFeedback() {
    const { assertions } = this.state;
    const NUMBER_OF_HITS = 3;
    return (assertions < NUMBER_OF_HITS) ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    const { name, score, pictureURL, assertions } = this.state;
    const plural = assertions === 1 ? 'questão' : 'questões';
    return (
      <>
        <Header name={ name } score={ score } pictureURL={ pictureURL } />
        <h2 data-testid="feedback-text">{ this.messageFeedback() }</h2>
        <br />
        <h3>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          {plural}
          !
        </h3>
        <h3>
          Um total de
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
          {' '}
          pontos
        </h3>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
            className="big-button"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking
          </button>
        </Link>
      </>
    );
  }
}

export default Feedback;
