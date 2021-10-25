import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const scoreFromLocalStorage = JSON.parse(localStorage.getItem('state'))
      .player.score;
    return (
      <>
        <Header score={ scoreFromLocalStorage } />
        <span data-testid="feedback-text">Mandou bem!</span>
        <Link to="/rankings">
          <button data-testid="btn-ranking" type="button">
            VER RANKING
          </button>
        </Link>
      </>
    );
  }
}

export default Feedback;
