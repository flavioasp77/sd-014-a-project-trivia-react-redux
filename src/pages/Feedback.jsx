import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { getStorage } from '../services/triviaAPI';

class FeedBack extends React.Component {
  render() {
    const { player: { assertions, score } } = getStorage();
    const { history } = this.props;
    const NUMBER_3 = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions >= NUMBER_3
            ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
        <p>
          Acertos:
          <span data-testid="feedback-total-question">{assertions}</span>
        </p>
        <p>
          Pontuação:
          <span data-testid="feedback-total-score">{score}</span>
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
          <span role="img" aria-label="trophy"> &#127942; </span>
        </button>
      </div>
    );
  }
}

export default FeedBack;

FeedBack.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
