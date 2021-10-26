import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetScoreAction, saveUserInfoAction } from '../redux/actions';
import settingsIcon from '../assets/settings.svg';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    const { resetScoreState } = this.props;

    resetScoreState();
    localStorage.removeItem('state');
    localStorage.removeItem('token');
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleLogin() {
    const { history, saveUserInfoToState } = this.props;
    const { name, assertions, score, gravatarEmail } = this.state;
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    saveUserInfoToState(this.state);

    localStorage.setItem('state', JSON.stringify({ player: {
      name,
      assertions,
      score,
      gravatarEmail,
    } }));

    if (!ranking) localStorage.setItem('ranking', JSON.stringify([]));

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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  saveUserInfoToState: PropTypes.func.isRequired,
  resetScoreState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserInfoToState: (userinfo) => dispatch(saveUserInfoAction(userinfo)),
  resetScoreState: () => dispatch(resetScoreAction()),

});

export default connect(null, mapDispatchToProps)(Login);
