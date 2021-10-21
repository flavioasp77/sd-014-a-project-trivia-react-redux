import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addLoginUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchGetToken = this.fetchGetToken.bind(this);

    this.state = {
      email: '',
      name: '',
    };
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  handleDisabled(name, email) {
    if (name && email) return false;
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userLogin } = this.props;
    this.fetchGetToken();
    userLogin(this.state);
  }

  async fetchGetToken() {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const responseJsonApi = await response.json();
      const { token } = responseJsonApi;
      localStorage.setItem('token', JSON.stringify(token));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              id="name"
              value={ name }
              name="name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              value={ email }
              name="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ this.handleDisabled(name, email) }
          >
            Jogar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (value) => dispatch(addLoginUser(value)),
});

export default connect(null, mapDispatchToProps)(Login);
