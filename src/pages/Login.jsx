import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginAction, questionsAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkInputsData = this.checkInputsData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.checkInputsData());
  }

  async requestQuestions() {
    const { saveQuestions } = this.props;
    const response1 = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response1.json();
    //  console.log(json);
    const response2 = await fetch(`https://opentdb.com/api.php?amount=5&token=${json.token}`);
    const questions = await response2.json();
    //  console.log(questions);
    if (questions.response_code === 0) {
      localStorage.setItem('token', json.token);
      saveQuestions(questions.results);
      return true;
    }
    return false;
  }

  async handleClick() {
    const { email, name } = this.state;
    const { sendLogin } = this.props;

    const data = {
      email,
      name,
    };
    const response = await this.requestQuestions();

    if (response) {
      sendLogin(data);
    } else {
      console.error('Clique em jogar novamente. Erro no servidor.');
    }
  }

  checkInputsData() {
    let notAllow = 0;
    const { email, name } = this.state;
    const emailArroba = email.split('@');
    if (name.trim() !== '') {
      notAllow += 1;
    }
    if (emailArroba.length === 2 && emailArroba[1].includes('.com')) {
      notAllow += 1;
    }
    if (notAllow === 2) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { name, email, disabled } = this.state;
    return (
      <section>
        <label htmlFor="input-name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            id="input-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-email">
          Email:
          <input
            type="text"
            data-testid="input-gravatar-email"
            id="input-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings" data-testid="btn-settings">Configurações</Link>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendLogin: (data) => dispatch(loginAction(data)),
    saveQuestions: (data) => dispatch(questionsAction(data)),
  };
}

Login.propTypes = {
  sendLogin: PropTypes.func.isRequired,
  saveQuestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
