import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  setUser as setUserAction, setTokenAPI as setTokenAPIAction,
} from '../actions/indexActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    setTimeout(() => history.push('/jogo'), TIME);
  }

  render() {
    const { name, email } = this.state;
    return (
      <main>
        <h3>Nome Do Jogador:</h3>
        <input
          value={ name }
          onChange={ this.handleInput }
          type="text"
          name="name"
          data-testid="input-player-name"
        />
        <h3>Email Do Gravatar:</h3>
        <input
          value={ email }
          onChange={ this.handleInput }
          type="text"
          name="email"
          data-testid="input-gravatar-email"
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ email.length <= 1 || name.length <= 1 }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            configuração do jogo
          </button>
        </Link>
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
