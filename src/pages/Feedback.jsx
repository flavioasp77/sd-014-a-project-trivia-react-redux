import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.createRankingPlayer = this.createRankingPlayer.bind(this);
  }

  handleClick({ target }) {
    const { history } = this.props;
    const { innerText } = target;
    if (innerText === 'Jogar Novamente') history.push('/');
    if (innerText === 'Ver Ranking') history.push('/ranking');
    this.createRankingPlayer();
  }

  createRankingPlayer() {
    const { source } = this.props;
    const state = localStorage.getItem('state');
    const { player: { name, score } } = JSON.parse(state);
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const player = {
      name,
      score,
      picture: source,
    };
    localStorage.setItem('ranking', JSON.stringify([...ranking, player]));
    console.log([...ranking, player]);
  }

  render() {
    const { name, source } = this.props;
    const state = localStorage.getItem('state');
    const { player: { score, assertions } } = JSON.parse(state);
    const MIN_ANSWERS = 3;
    return (
      <div>
        <h1>Feedback</h1>
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
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-play-again"
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
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

export default connect(mapStateToProps, null)(Feedback);
