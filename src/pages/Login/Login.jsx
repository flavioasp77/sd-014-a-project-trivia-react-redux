import React from 'react';
import Input from '../../components/Input';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    dispatchPayload(this.state);
    this.setState({ redirect: '/trivia' });
  }

  render() {
    const { name, email } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <h1>THIS IS LOGIN</h1>
        <Input
          htmlFor="name"
          label="Nome"
          onChange={ this.handleChange }
          type="text"
          value={ name }
        />
        <Input
          htmlFor="email"
          label="E-mail"
          onChange={ this.handleChange }
          type="text"
          value={ email }
        />
      </form>
    );
  }
}
