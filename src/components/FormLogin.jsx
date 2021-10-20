import React from "react";

class FormLogin extends React.Component {
  render() {
    return (
    <section>
      <form>
          <input type="text" data-testid="input-player-name">Nome</input>
          <input type="email" data-testid="input-gravatar-email">Email</input>
          <button type="button" data-testid="btn-play">Jogar</button>
      </form>
    </section>
    );
  }
}

export default FormLogin;
