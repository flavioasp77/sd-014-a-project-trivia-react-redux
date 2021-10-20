import React from 'react';
// import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../components/Input';
import { setUserData } from '../redux/actions';

class Login extends React.Component {
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
    const { dispatchPayload } = this.props;
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

Login.propTypes = {
  dispatchPayload: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchPayload: (payload) => dispatch(setUserData(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
