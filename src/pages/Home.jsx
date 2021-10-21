import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Login } from '../components';

export default class Home extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <header>
          <h1>Trybe Trivia</h1>
        </header>
        <Login redirect={ history.push } />
        <Link to="/settings" data-testid="btn-settings">Configurações</Link>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
