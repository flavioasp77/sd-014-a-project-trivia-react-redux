import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import triviaLogo from '../trivia.png';
import fetchTokenApi from '../services/triviaTokenApi';
import { userInfo as userInfoAction, scoreInfo } from '../actions';
import './login.css';

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

  async handleClick() {
    const { name, email } = this.state;
    const { userInfo, history, scoreActionInfo } = this.props;
    await fetchTokenApi();
    await userInfo(name, email);
    await history.push('/game');
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    const ranking = {
      ranking: [],
    };

    localStorage.state = JSON.stringify(player);

    // se não existir o ranking no localstorage, este é criado
    if (!localStorage.getItem('ranking')) {
      localStorage.ranking = JSON.stringify(ranking);
    }

    // zera a pontuação do usuário
    scoreActionInfo(0);
  }

  render() {
    const MIN_CHARACTER = 0;
    const { name, email } = this.state;
    return (
      <div>
        <form className="form-login">
          <img src={ triviaLogo } alt="Logo do App Trivia" className="trivia-logo" />
          <input
            className="input-login"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            name="name"
            placeholder="Nome"
          />
          <input
            className="input-login"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            name="email"
            placeholder="E-mail"
          />
          <button
            type="button"
            className={ name.length <= MIN_CHARACTER
              || email.length <= MIN_CHARACTER ? 'btn-login-game' : 'btn-login' }
            onClick={ this.handleClick }
            data-testid="btn-play"
            disabled={ name.length <= MIN_CHARACTER || email.length <= MIN_CHARACTER }
          >
            Jogar
          </button>
          <Link to="/settings">
            <button
              className="btn-login settings"
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  scoreActionInfo: PropTypes.func.isRequired,
  userInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userInfo: (name, email) => (
    dispatch(userInfoAction(name, email))),
  scoreActionInfo: (scoreNum) => dispatch(scoreInfo(scoreNum)),
});

export default connect(null, mapDispatchToProps)(Login);
