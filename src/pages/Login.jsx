// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTokenThunk, login as loginAction } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nome: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { userToken } = this.props;
    console.log(userToken);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userToken } = this.props;

    console.log(userToken);
  }

  render() {
    const { email, nome } = this.state;
    const { sendToken, login } = this.props;
    return (
      <form onSubmit={ () => sendToken() }>
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
        <Link
          to="/jogo"
          style={ !(email && nome) ? { pointerEvents: 'none' } : null }
        >
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !(email && nome) }
            onClick={ () => login() }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
  sendToken: () => dispatch(getTokenThunk()),
});

const mapStateToProps = (state) => ({
  userToken: state.tokenReducer.token,
});

Login.propTypes = {
  userToken: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
