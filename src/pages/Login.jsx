import React from 'react';

class Login extends React.Component {
  render() {
    return(
      <main>
        <label htmlFor="input-name">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            id="input-name"
            />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            type="text"
            data-testid="input-gravatar-email"
            id="input-email"
            />
        </label>
      </main>
    );
  }
}

export default Login;
