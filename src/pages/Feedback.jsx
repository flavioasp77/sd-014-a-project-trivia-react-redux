import React from 'react';
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
    const { score } = this.state;
    const NUMBER_OF_HITS = 3;
    return (score < NUMBER_OF_HITS) ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    const { name, score, pictureURL, assertions } = this.state;
    const questao = assertions === 1 ? 'questão' : 'questões';
    return (
      <>
        <Header name={ name } score={ score } pictureURL={ pictureURL } />
        <h1 data-testid="feedback-text">{ this.messageFeedback() }</h1>
        <br />
        <h2 data-testid="feedback-total-question">
          { `Você acertou ${assertions} ${questao}!` }
        </h2>
        <h2 data-testid="feedback-total-score">
          { `Um total de ${score} pontos.`}
        </h2>
      </>
    );
  }
}

export default Feedback;
