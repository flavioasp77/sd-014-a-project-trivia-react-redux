import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.props;
    if (ranking !== null) {
      ranking.sort((a, b) => (b.score - a.score));
      return (
        <main>
          <div data-testid="ranking-title">
            Ranking
          </div>
          <ul>
            { ranking.map(({ name, score, picture }, index) => (
              <li id={ index } key={ index }>
                <img style={ { height: '20px' } } src={ picture } alt="player" />
                {' '}
                <span data-testid={ `player-name-${index}` }>{ name }</span>
                {' '}
                <span data-testid={ `player-score-${index}` }>{ score }</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleClick }
          >
            Voltar para o início
          </button>
        </main>
      );
    }
    return (
      <main>
        <div data-testid="ranking-title">
          Ranking
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Voltar para o início
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  ranking: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

export default connect(mapStateToProps, null)(Ranking);
