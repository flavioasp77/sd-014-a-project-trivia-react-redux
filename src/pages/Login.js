import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, questAPI } from '../actions';
import { fetchAPI } from '../services/tokenAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disableButton: true,
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
    this.enableButton();
  }

  async handleClick() {
    const { loginSave } = this.props;
    const token = await fetchAPI();
    localStorage.setItem('token', token);
    loginSave(this.state);
  }

  enableButton() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  }

  render() {
    const { name, email, disableButton } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disableButton }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
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

const mapDispatchToProps = (dispatch) => ({
  loginSave: (payload) => dispatch(login(payload)),
  getQuestions: () => dispatch(questAPI()),
});

Login.propTypes = {
  loginSave: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
