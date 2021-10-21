import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginPlayer as loginAction } from '../redux/actions';

const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const NAME_PATTERN = /\w+/;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { redirect, loginPlayer } = this.props;
    loginPlayer(this.state);
    redirect('/game');
  }

  disableButton({ name, gravatarEmail }) {
    return !(EMAIL_PATTERN.test(gravatarEmail) && NAME_PATTERN.test(name));
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <form>

        <input
          type="text"
          placeholder="Nome"
          value={ name }
          data-testid="input-player-name"
          onChange={ ({ target: { value } }) => this.setState({ name: value }) }
        />
        <input
          type="text"
          placeholder="Email"
          value={ gravatarEmail }
          data-testid="input-gravatar-email"
          onChange={ ({ target: { value } }) => this.setState({ gravatarEmail: value }) }
        />

        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.disableButton(this.state) }
          onClick={ this.handleClick }
        >
          Jogar
        </button>

      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginPlayer: (player) => dispatch(loginAction(player)),
});

Login.propTypes = {
  loginPlayer: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
