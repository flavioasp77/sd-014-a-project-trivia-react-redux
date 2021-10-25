import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PlayAgain extends Component {
  render() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-play-again"
        >
          Jogar Novamente!
        </button>
      </Link>
    );
  }
}
