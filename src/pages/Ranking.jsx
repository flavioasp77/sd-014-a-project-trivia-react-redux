import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    return (
      <>
        <h2 data-testid="ranking-title">
          Ranking
        </h2>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Voltar ao início</button>
        </Link>
      </>
    );
  }
}
