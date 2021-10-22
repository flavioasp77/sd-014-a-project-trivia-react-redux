import React, { Component } from 'react';
import '../styles/Header.css';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <span data-testid="feedback-text">
          Mandou muito!
        </span>
      </>
    );
  }
}

export default Feedback;
