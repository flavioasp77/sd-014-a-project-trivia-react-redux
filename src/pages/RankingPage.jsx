import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { localGetItem } from '../utils/localStorageAPI';
import { resetAll as resetAllAction } from '../redux/actions';
import Header from '../components/Header';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };

    this.getRanking = this.getRanking.bind(this);
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    this.setState({ ranking: localGetItem('ranking') });
  }

  render() {
    const { ranking } = this.state;
    const { resetAll } = this.props;
    return (
      <div className="page">
        <div className="ranking-container rounded shadow">
          <h1 data-testid="ranking-title" className="text-success">Ranking</h1>
          { ranking.map(({ name, score, picture }, index) => (
            <div key={ index } className="ranking-item">
              <span>{index + 1}</span>
              <img src={ picture } alt="avatar" className="rounded-circle" />
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <span data-testid={ `player-score-${index}` }>{score}</span>
            </div>
          ))}
          <Link
            to="/"
            data-testid="btn-go-home"
            className="btn btn-primary mt-3"
            onClick={ () => resetAll() }
          >
            Jogar novamente
          </Link>
        </div>

      </div>
    );
  }
}

Ranking.propTypes = {
  resetAll: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetAll: () => dispatch(resetAllAction()),
});

export default connect(null, mapDispatchToProps)(Ranking);
