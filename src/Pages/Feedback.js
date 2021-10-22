import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../Components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.assertionsPoints = this.assertionsPoints.bind(this);
  }

  assertionsPoints() {
    const getAssertions = JSON.parse(localStorage.getItem('state'));
    const { player } = getAssertions;
    const { assertions } = player;
    const THREE_HITS = 3;

    if (assertions < THREE_HITS) {
      return ('Podia ser melhor...');
    }
    return ('Mandou bem!');
  }

  render() {
    const { history } = this.props;
    const getAssertions = JSON.parse(localStorage.getItem('state'));
    const { player } = getAssertions;
    // console.log(player);
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{ this.assertionsPoints() }</h1>
        <h2 data-testid="feedback-total-score">
          { player.score }
        </h2>
        <h3 data-testid="feedback-total-question">
          { player.assertions }
          {' '}
          acertos
        </h3>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, null)(Feedback);
