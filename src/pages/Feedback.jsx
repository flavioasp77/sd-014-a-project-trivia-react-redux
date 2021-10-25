import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">Bão?</h3>
      </div>
    );
  }
}

export default Feedback;
