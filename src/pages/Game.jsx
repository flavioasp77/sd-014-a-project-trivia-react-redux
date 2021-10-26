import React, { Component } from 'react';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <>
        <header>
          <Header />
        </header>
        <main>
          <Questions />
        </main>
      </>
    );
  }
}

export default Game;
