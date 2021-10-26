import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { rankingAction, scoreAction } from '../redux/actions';

class Feedback extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.createRankingPlayer = this.createRankingPlayer.bind(this);
  }

  createRankingPlayer() {
    const { source, attRankingState } = this.props;

    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const state = JSON.parse(localStorage.getItem('state'));

    if (ranking === null || state === null) {
      return <p>Error G-07</p>;
    }

    const { player: { name, score } } = state;
    const player = {
      name,
      score,
      picture: source,
    };

    attRankingState([...ranking, player]);
    localStorage.setItem('ranking', JSON.stringify([...ranking, player]));
  }

  handleClick({ target }) {
    const { history, resetScoreGlobal } = this.props;
    const { innerText } = target;
    if (innerText === 'Jogar Novamente' || innerText === 'Volte ao Início') {
      history.push('/');
    } else if (innerText === 'Ver Ranking') history.push('/ranking');

    this.createRankingPlayer();
    resetScoreGlobal(0);
  }

  render() {
    const { name, source } = this.props;
    const state = JSON.parse(localStorage.getItem('state'));

    if (state === null) {
      return (
        <button type="button" onClick={ this.handleClick }>
          Volte ao Início
        </button>
      );
    }

    const { player: { score, assertions } } = state;
    const MIN_ANSWERS = 3;
    return (
      <>
        <Header name={ name } score={ score } source={ source } />
        <main>
          <p data-testid="feedback-text">
            {assertions < MIN_ANSWERS ? 'Podia ser melhor...' : 'Mandou bem!'}
          </p>
          <p data-testid="feedback-total-score">{ score }</p>
          {
            assertions === 0 ? (
              <p>
                Não acertou nenhuma pergunta
                <span hidden data-testid="feedback-total-question">{assertions}</span>
              </p>
            ) : (
              <p>
                Acertou
                {' '}
                <span data-testid="feedback-total-question">{assertions}</span>
                {' '}
                Pergunta(s)
              </p>
            )
          }
        </main>
        <button type="button" onClick={ this.handleClick } data-testid="btn-play-again">
          Jogar Novamente
        </button>
        <button type="button" onClick={ this.handleClick } data-testid="btn-ranking">
          Ver Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  attRankingState: PropTypes.func.isRequired,
  resetScoreGlobal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  source: state.player.source.url,
});

const mapDispatchToProps = (dispatch) => ({
  resetScoreGlobal: (score) => dispatch(scoreAction(score)),
  attRankingState: (ranking) => dispatch(rankingAction(ranking)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
