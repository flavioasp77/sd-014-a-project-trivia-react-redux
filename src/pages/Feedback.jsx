import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import GoHomeButton from '../components/GoHomeButton';
import '../styles/Feedback.css';

class Feedback extends Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { score } = player;

    return (
      <>
        <Header score={ score } />
        <span data-testid="feedback-text">Mandou bem!</span>
        <Link className="btn-ranking" data-testid="btn-ranking" to="/rankings">
          VER RANKING
        </Link>
        <GoHomeButton testId="btn-play-again" />
      </>
    );
  }
}

export default Feedback;
