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

    document.title = 'Trivia-Feedback';
  }

  componentDidMount() {
    this.cloneLocalStorageToState();
  }

  cloneLocalStorageToState() {
    const playerInfo = JSON.parse(localStorage.getItem('state'));
    const { player: { name, score, gravatarEmail, assertions } } = playerInfo;
    this.setState({
      name,
      score,
      pictureURL: getGravatar(gravatarEmail),
      assertions,
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
        <p data-testid="feedback-text">{ this.messageFeedback() }</p>
        <h1 data-testid="feedback-text">{ this.messageFeedback() }</h1>
        <br />
        <h2 data-testid="feedback-total-question">
          { `Você acertou ${assertions} ${plural}!` }
        </h2>
        <h2 data-testid="feedback-total-score">
          { `Um total de ${score} pontos.`}
        </h2>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
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
