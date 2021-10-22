import React, { Component } from 'react';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <QuestionCard />
      </div>
    );
  }
}
export default Game;
