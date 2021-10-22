import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { getToken, user as userAction } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      isEmailValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.tokenApi = this.tokenApi.bind(this);
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value },
      () => {
        const { email } = this.state;
        const enableEmail = this.validateEmail(email);
        this.setState({ isEmailValid: enableEmail });
      });
  }

  handleClick(event) {
    event.preventDefault();
    const { token } = this.props;
    const { history } = this.props;
    const { username, email } = this.state;
    const { user } = this.props;
    user(username, email);
    this.tokenApi();
    token(this.state);
    history.push('/Trivia');
  }

  async tokenApi() {
    const data = await fetch('https://opentdb.com/api_token.php?command=request');
    const jsonApi = await data.json();
    const { token } = jsonApi;
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { username, email, isEmailValid } = this.state;
    const minChar = 1;
    return (
      <div>
        <Input
          type="text"
          id="username"
          dataTestId="input-player-name"
          name={ username }
          onChange={ this.handleChange }
        />
        <Input
          type="email"
          id="email"
          dataTestId="input-gravatar-email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !(username.length >= minChar && isEmailValid) }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <Link
          to="/settings"
        >
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.func.isRequired,
  token: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  token: (token) => dispatch(getToken(token)),
  user: (username, email) => dispatch(userAction(username, email)),
});

export default connect(null, mapDispatchToProps)(Login);
