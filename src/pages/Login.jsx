import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userInfo } from '../redux/actions';
import { fetchApiToken } from '../services';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gravatarEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { setUserInfo, history } = this.props;
    await fetchApiToken();
    history.push('/game');
    setUserInfo(this.state);
  }

  checkInputs() {
    const { name, gravatarEmail } = this.state;
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !name.length || !checkEmail.test(gravatarEmail);
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="gravatarEmail"
            value={ gravatarEmail }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ this.checkInputs() }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  setUserInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (payload) => dispatch(userInfo(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
