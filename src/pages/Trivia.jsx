import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Trivia extends Component {
  render() {
    return (
      <div>
        <div className="top-banner">Slumdog Milionaire by Group 10</div>
        <div className="bg-questions">
          <Header />
          <Questions />
        </div>
      </div>
    );
  }
}

export default Trivia;
