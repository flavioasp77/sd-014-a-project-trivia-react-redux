import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveUserInfoAction } from '../redux/actions';
import fetchToken from '../services/fetchToken';
import settingsIcon from '../assets/settings.svg';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      // assertions: 0,
      // score: 0,
      gravatarEmail: '',
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
    const { history, saveUserInfoToState } = this.props;

    fetchToken();
    saveUserInfoToState(this.state);

    history.push('/game');
  }

  render() {
    const { name, gravatarEmail } = this.state;
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
            name="gravatarEmail"
            placeholder="E-mail"
            value={ gravatarEmail }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ !(name && gravatarEmail) }
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

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  saveUserInfoToState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserInfoToState: (userinfo) => dispatch(saveUserInfoAction(userinfo)),
});

export default connect(null, mapDispatchToProps)(Login);
