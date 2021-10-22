import React from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
