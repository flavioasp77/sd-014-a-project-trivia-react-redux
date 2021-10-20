import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchTokenApi } from '../services/triviaTokenApi';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    fetchTokenApi().then()
  }

  render() {
    const MIN_CHARACTER = 0;
    const { name, email } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            name="name"
            placeholder="Nome"
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            name="email"
            placeholder="E-mail"
          />
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-play"
            disabled={ name.length <= MIN_CHARACTER || email.length <= MIN_CHARACTER }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  push: PropTypes.string,
};

Login.defaultProps = {
  push: 'select',
};

export default Login;
