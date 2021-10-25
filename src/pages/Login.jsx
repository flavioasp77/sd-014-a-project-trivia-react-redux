import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getTokenThunk, login as loginAction } from '../actions';
import { writeLocalStorage } from '../services/util';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      click: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, name } = this.state;
    const { sendToken, login } = this.props;
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    writeLocalStorage('state', state);
    login(email, name);

    sendToken();
    this.setState({ click: true });
  }

  render() {
    const { email, name, click } = this.state;
    const { userToken } = this.props;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="email">
          {'Email: '}
          <input
            data-testid="input-gravatar-email"
            value={ email }
            name="email"
            type="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          {'Nome: '}
          <input
            data-testid="input-player-name"
            value={ name }
            name="name"
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !(email && name) }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
        { click && userToken && <Redirect to="/jogo" /> }
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email, name) => dispatch(loginAction(email, name)),
  sendToken: () => dispatch(getTokenThunk()),
});

const mapStateToProps = (state) => ({
  userToken: state.token.token,
});

Login.propTypes = {
  userToken: PropTypes.string.isRequired,
  sendToken: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
