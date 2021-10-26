import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../utils/localstorage';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Página de login
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
