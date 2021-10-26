import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <>
        <header>
          <Header />
        </header>
        <div data-testid="feedback-text">FEEDBACK</div>
      </>
    );
  }
}

export default Feedback;
