import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" role="button" data-testid="btn-go-home">
          Home
        </Link>
        {' '}

        {' '}
        <Link to="/ranking" role="button" data-testid="btn-ranking">
          Ranking
        </Link>
      </>
    );
  }
}

export default Game;
