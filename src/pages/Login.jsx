import React from 'react';
import { connect } from 'react-redux';
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
    const { email, name } = this.state;
    const { history, loginDispatch } = this.props;
    loginDispatch(email, name);
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
