import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApiTokenThunk } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { setApiToken } = this.props;
    await setApiToken();
    const { token, history } = this.props;
    localStorage.setItem('token', token);
    history.push('/jogo');
  }

  render() {
    const { name, email } = this.state;
    return (
      <main>
        <label htmlFor="input-name">
          Nome:
          <input
            type="text"
            id="input-name"
            name="name"
            placeholder="insira seu nome"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-email">
          Email:
          <input
            type="email"
            id="input-email"
            name="email"
            placeholder="grupo2@trybe.com"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ !(name.length > 0 && email.length > 0) }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </main>
    );
  }
}

Login.propTypes = {
  setApiToken: PropTypes.func,
}.isRequired;

const mapDispachToProps = (dispatch) => ({
  setApiToken: () => dispatch(getApiTokenThunk()),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
});

export default connect(mapStateToProps, mapDispachToProps)(Login);
