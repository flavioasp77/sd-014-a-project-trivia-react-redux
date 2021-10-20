import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: '',
      // name: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    // const { email, name } = this.state;
    return (
      <form>
        <label htmlFor="email">
          <input />
        </label>
        <label htmlFor="name">
          <input />
        </label>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  // login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
