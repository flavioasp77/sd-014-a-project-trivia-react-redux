import React, { Component } from 'react';
import LinkButton from '../components/LinkButton';

export default class Ranking extends Component {
  render() {
    return (
      <div data-testid="ranking-title">
        <LinkButton route="/" testid="go-home" name="Jogar novamente" />
      </div>
    );
  }
}
