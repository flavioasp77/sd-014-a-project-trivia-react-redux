import PropTypes from 'prop-types';
import React, { Component } from 'react';

class NextBtn extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    // ainda tem que fazer essa rota direito.
    // verificar se ja foi feito em req anteriores
    history.push('/jogo');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.handleClick }
        style={ { order: 5 } }
      >
        Próxima
      </button>
    );
  }
}

NextBtn.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default NextBtn;
