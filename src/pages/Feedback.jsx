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

  render() {
    const { name, score, pictureURL } = this.state;
    return (
      <>
        <Header name={ name } score={ score } pictureURL={ pictureURL } />
        <p>Feedback message</p>
      </>
    );
  }
}

export default Feedback;
