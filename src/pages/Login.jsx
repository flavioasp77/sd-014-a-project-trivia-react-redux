import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import login from '../actions';
import logo from '../trivia.png';

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

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleClick(e) {
    e.preventDefault();
    const { email } = this.state;
    const { history, loginDispatch } = this.props;
    loginDispatch(email);
    history.push('/play');
  }

  render() {
    const { name, email } = this.state;
    const EMAIL_REGEX = /.+@.+\..+/;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <input
            data-testid="input-gravatar-email"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <br />
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
          <br />
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ !EMAIL_REGEX.test(email) || !name }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configuração
            </button>
          </Link>
        </form>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email, name) => dispatch(login(email, name)),
});

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
