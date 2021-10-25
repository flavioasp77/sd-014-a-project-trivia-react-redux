import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <p data-testid="feedback-text">Parabéns</p>
      </>
    );
  }
}

export default Feedback;
