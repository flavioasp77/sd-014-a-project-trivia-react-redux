import React, { Component } from 'react';
import Header from '../components/Header';

class Score extends Component {
  constructor(props) {
    super(props);
    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar() {
    return null;
  }

  render() {
    return (
      <div>
        <p data-testid="feedback-text" />
        <Header />
      </div>
    );
  }
}

export default Score;
