import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.rankInfoStart = this.rankInfoStart.bind(this);
  }

  componentDidMount() {
    this.rankInfoStart();
  }

  rankInfoStart() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking,
    });
  }

  handleClick() {
    const { history } = this.props;
    history.replace('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="container-ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.map((rank, index) => (
          <li key={ index } className="ranking-list-item">
            <div className="ranking-order-picture">
              {`${index + 1}. `}
              <img src={ rank.picture } alt={ `Player rank: ${index}` } />
            </div>
            <div className="ranking-name-points">
              <h3 data-testid={ `player-name-${index}` }>{rank.name}</h3>
              <h4 data-testid={ `player-score-${index}` }>{rank.score}</h4>
            </div>
          </li>
        ))}
        <button
          type="submit"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Go Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Ranking;
