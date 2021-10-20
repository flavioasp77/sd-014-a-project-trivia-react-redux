// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login as loginAction } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nome: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { email, nome } = this.state;
    return (
      <form>
        <label htmlFor="email">
          {'Email: '}
          <input
            data-testid="input-gravatar-email"
            value={ email }
            name="email"
            type="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          {'Nome: '}
          <input
            data-testid="input-player-name"
            value={ nome }
            name="nome"
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/settings">
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !(email && nome) }
          >
            Jogar
          </button>
        </Link>
        <button type="button" data-testid="btn-settings">Configurações</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
// };

export default connect(null, mapDispatchToProps)(Login);
