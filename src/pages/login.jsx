import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import '../App.css';
import { getToken } from '../services/triviaAPI';

import fetchGravatarAPI from '../services/gravatarAPI';
import { setPlayer as setPlayerAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyInfo = this.verifyInfo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  verifyInfo() {
    const { email, name } = this.state;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (validEmail.test(email) && name) return false;

    return true;
  }

  async handleClick() {
    const { history, setPlayer } = this.props;
    const { email, name } = this.state;
    const token = await getToken();
    const stateObj = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    localStorage.setItem('state', JSON.stringify(stateObj));
    localStorage.setItem('token', JSON.stringify(token));
    const emailHash = md5(email).toString();
    const img = await fetchGravatarAPI(emailHash);
    setPlayer(name, img);
    history.push('/trivia');
  }

  render() {
    const { email, name } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ!
          </p>
          <form>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                name="name"
                id="name"
                value={ name }
                data-testid="input-player-name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                id="email"
                value={ email }
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
              disabled={ this.verifyInfo() }
            >
              Jogar
            </button>
          </form>
          <Link to="/settings">
            <button type="button" data-testid="btn-settings">
              Configurações Teste
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  setPlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setPlayer: (name, img) => dispatch(setPlayerAction(name, img)),
});

export default connect(null, mapDispatchToProps)(Login);
