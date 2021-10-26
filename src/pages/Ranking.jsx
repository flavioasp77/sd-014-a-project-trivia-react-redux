import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/" role="button" data-testid="btn-go-home">
          Home
        </Link>
      </main>
    );
  }
}

export default Ranking;
