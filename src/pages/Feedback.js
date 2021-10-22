import React, { Component } from 'react';
import Header from '../components/Header';
import PlayAgainBtn from '../components/PlayAgainBtn';

export default class Feedback extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <PlayAgainBtn />
      </div>
    );
  }
}
