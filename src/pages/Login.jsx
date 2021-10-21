import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fetchToken from '../services/fetchToken';
import settingsIcon from '../assets/settings.svg';
// import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleLogin() {
    // const { history } = this.props;

    fetchToken();
    console.log('click');

    // history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    return (
      <main>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Nome"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            type="text"
            name="email"
            placeholder="E-mail"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ !(name && email) }
          onClick={ this.handleLogin }
          data-testid="btn-play"
        >
          Jogar
        </button>
        <Link to="/settings" role="button" data-testid="btn-settings">
          <img src={ settingsIcon } alt="Settings" />
        </Link>
      </main>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({ });

// export default connect(null, mapDispatchToProps)(Login);
export default Login;
