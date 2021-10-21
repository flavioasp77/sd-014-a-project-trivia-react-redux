import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Trivia extends Component {
  render() {
    return (
      <div>
        <div className="top-banner">Slumdog Milionaire by Group 10</div>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default Trivia;
