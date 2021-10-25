import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, fetchAPIThunk } from '../actions';
import '../css/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { loginSave, tokenGame, history } = this.props;
    await loginSave(this.state);
    await tokenGame();
    history.push('/game');
  }

  handleSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="loginPage">
        <form className="formFlex" onSubmit={ this.handleClick }>
          <label className="labelFlex" htmlFor="name">
            Nome:
            <input
              className="inputFlex"
              type="text"
              id="name"
              name="name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label className="labelFlex" htmlFor="email">
            Email:
            <input
              className="inputFlex"
              type="email"
              id="email"
              name="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="playButton"
            type="submit"
            data-testid="btn-play"
            disabled={ !name || !email }
          >
            Jogar
          </button>
        </form>
        <button
          className="confgButton"
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleSettings }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginSave: PropTypes.func.isRequired,
  tokenGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginSave: (payload) => dispatch(login(payload)),
  tokenGame: () => dispatch(fetchAPIThunk()),
});

export default connect(null, mapDispatchToProps)(Login);
