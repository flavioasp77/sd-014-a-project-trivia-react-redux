import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import { MD5 } from 'crypto-js';
import {
  setUser as setUserAction, setTokenAPI as setTokenAPIAction,
} from '../actions/indexActions';
import { getArrayPlayers } from '../helpers';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.btnJogar = this.btnJogar.bind(this);
    this.setArrayPlayersLS = this.setArrayPlayersLS.bind(this);
  }

  setArrayPlayersLS(obj) {
    const arrayPlayers = getArrayPlayers();
    const OBJ = {
      name: obj.player.name,
      picture: `https://www.gravatar.com/avatar/${MD5(obj.gravatarEmail).toString()}`,
      score: obj.player.score,
    };
    if (arrayPlayers) {
      const newArray = [...arrayPlayers, OBJ];
      localStorage.setItem('ranking', JSON.stringify(newArray));
    } else {
      const newArray = [];
      newArray.push(OBJ);
      localStorage.setItem('ranking', JSON.stringify(newArray));
    }
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { history, setUser, setTokenAPI } = this.props;
    const { name, email } = this.state;
    const TIME = 2000;
    setUser({ name, email });
    setTokenAPI();
    const objLocal = { player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    } };
    this.setArrayPlayersLS(objLocal);
    localStorage.setItem('state', JSON.stringify(objLocal));
    setTimeout(() => history.push('/jogo'), TIME);
  }

  btnJogar() {
    const { name, email } = this.state;
    const stateBtn = email.length >= 1 && name.length >= 1;
    return stateBtn;
  }

  render() {
    const { name, email } = this.state;
    return (
      <main className="containner-login-main">
        <form className="card-login">
          <h3>Nome Do Jogador:</h3>
          <input
            className="input-login input-name"
            placeholder="Name:"
            value={ name }
            onChange={ this.handleInput }
            type="text"
            name="name"
            data-testid="input-player-name"
          />
          <h3>Email Do Gravatar:</h3>
          <input
            placeholder="Email:"
            className="input-login"
            value={ email }
            onChange={ this.handleInput }
            type="text"
            name="email"
            data-testid="input-gravatar-email"
          />
          <button
            className={ !this.btnJogar() ? 'btn-jogar-desab' : 'btn-jogar' }
            type="button"
            data-testid="btn-play"
            disabled={ !this.btnJogar() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <Link to="/settings">
            <button
              className="btn-config"
              data-testid="btn-settings"
              type="button"
            >
              configuração do jogo
            </button>
          </Link>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setUser: PropTypes.func.isRequired,
  setTokenAPI: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (payload) => dispatch(setUserAction(payload)),
  setTokenAPI: () => dispatch(setTokenAPIAction()),
});

export default connect(null, mapDispatchToProps)(Login);
