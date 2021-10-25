import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/login.css';
import { setInitialPlayerOfLS } from '../helpers/index';
import { setCategoriesAPI as setCategoriesAPIAction,
  setUser as setUserAction } from '../actions/userActions';
import { setTokenAPI as setTokenAPIAction } from '../actions/gameActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.btnJogar = this.btnJogar.bind(this);
  }

  componentDidMount() {
    const { setCategoriesAPI } = this.props;
    setCategoriesAPI();
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { history, setUser, setTokenAPI, chosedSettings } = this.props;
    const { name, email } = this.state;
    setUser({ name, email });
    await setTokenAPI(chosedSettings);
    setInitialPlayerOfLS({ name, email });
    history.push('/jogo');
  }

  btnJogar() {
    const { name, email } = this.state;
    const stateBtn = email.length >= 1 && name.length >= 1;
    return stateBtn;
  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <main className="containner-login-main">
        <img className="logo" src="/trivia.png" alt="d" />
        <form className="card-login">
          <h3>Nome Do Jogador:</h3>
          <input
            className="input-login input-name"
            placeholder="Name:"
            value={ name }
            onChange={ this.handleInput }
            type="text"
            name="name"
            data-testid="input-player-name"
          />
          <h3 className="text-email-gravatar">Email Do Gravatar:</h3>
          <input
            placeholder="Email:"
            className="input-login"
            value={ email }
            onChange={ this.handleInput }
            type="text"
            name="email"
            data-testid="input-gravatar-email"
          />
          <button
            className={ !this.btnJogar() ? 'btn-jogar-desab' : 'btn-jogar' }
            type="button"
            data-testid="btn-play"
            disabled={ !this.btnJogar() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <button
            className="btn-config"
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/settings') }
          >
            configuração do jogo
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setUser: PropTypes.func.isRequired,
  setTokenAPI: PropTypes.func.isRequired,
  setCategoriesAPI: PropTypes.func.isRequired,
  chosedSettings: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (payload) => dispatch(setUserAction(payload)),
  setTokenAPI: (payload) => dispatch(setTokenAPIAction(payload)),
  setCategoriesAPI: () => dispatch(setCategoriesAPIAction()),
});

const mapStateToProps = ({ settings: { chosedSettings } }) => ({
  chosedSettings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
