import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RenderRanking from '../components/RenderRanking';

export default class Ranking extends Component {
  render() {
    return (
      <>
        <h2 data-testid="ranking-title">
          Ranking
        </h2>
        <RenderRanking />
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Voltar ao início</button>
        </Link>
      </>
    );
  }
}
