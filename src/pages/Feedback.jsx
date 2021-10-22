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
    const { player: { name, score, gravatarEmail } } = playerInfo;
    this.setState({
      name,
      score,
      pictureURL: getGravatar(gravatarEmail),
    });
  }

  messageFeedback() {
    const { score } = this.state;
    const NUMBER_OF_HITS = 3;
    return (score < NUMBER_OF_HITS) ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    const { name, score, pictureURL } = this.state;
    return (
      <>
        <Header name={ name } score={ score } pictureURL={ pictureURL } />
        <p data-testid="feedback-text">{ this.messageFeedback() }</p>
      </>
    );
  }
}

export default Feedback;
