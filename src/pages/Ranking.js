import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.replace('/');
  }

  render() {
    return (
      <main>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <button
          type="submit"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Início
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
