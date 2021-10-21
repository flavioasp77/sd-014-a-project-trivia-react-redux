import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

export default class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>TRIVIA</h1>
        <Questions />
      </div>
    );
  }
}
