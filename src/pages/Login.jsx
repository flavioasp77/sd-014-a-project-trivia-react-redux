import PropTypes from 'prop-types';
import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getToken } from '../services/triviaAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.playBTNClick = this.playBTNClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async playBTNClick() {
    const { email, userName } = this.state;
    const player = {
      player: {
        name: userName,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    const { history } = this.props;
    const resultTriviaAPI = await getToken();
    localStorage.state = JSON.stringify(player);
    localStorage.token = JSON.stringify(resultTriviaAPI.token);
    history.push('/trivia');
  }

  render() {
    const { userName, email } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              type="text"
              name="userName"
              id="input-player-name"
              data-testid="input-player-name"
              value={ userName }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            E-mail:
            <input
              type="text"
              name="email"
              id="input-gravatar-email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.playBTNClick }
            data-testid="btn-play"
            disabled={ !(userName) || !(email) }
          >
            Jogar
          </button>
        </form>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
// const mapsStateToProps = (state) => {
// //
// };

// const mapDispatchToProps = (dispatch) => {
//   //
// };
export default (Login);
