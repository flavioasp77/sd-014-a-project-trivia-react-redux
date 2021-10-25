import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const scoreFromLocalStorage = JSON.parse(localStorage.getItem('state'))
      .player.score;
    return (
      <>
        <Header score={ scoreFromLocalStorage } />
        <span data-testid="feedback-text">Mandou bem!</span>
      </>
    );
  }
}

export default Feedback;
