import React from 'react';
import Header from '../components/Header';
import getGravatar from '../helpers/getGravatar';
import '../styles/Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      score: 0,
      pictureURL: '',
    };

    this.cloneLocalStorageToState = this.cloneLocalStorageToState.bind(this);

    document.title = 'Trivia-Game';
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
        <p>Game</p>
      </>
    );
  }
}

export default Game;
