import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Questions from '../components/Questions';

class MainPage extends React.Component {
  constructor() {
    super();

    this.state = {
      infoUser: '',
    };
  }

  componentDidMount() {
    this.fetchAPIGravatar();
    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
  }

  emailGravatar(email) {
    const hash = md5(email).toString();
    return hash;
  }

  async fetchAPIGravatar() {
    const { email } = this.props;
    const hash = this.emailGravatar(email);
    const infoUser = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    this.setState({
      infoUser: infoUser.url,
    });
  }

  currentScore(score) {
    this.setState((previus) => ({ score: previus.score + score }));
    const localStor = JSON.parse(localStorage.getItem('state'));
    const { user } = localStor;
    const atualStore = {
      user: {
        ...user,
        score: user.score + score,
        assertions: user.assertions + 1,
      },
    };
    localStorage.setItem('state', JSON.stringify(atualStore));
  }

  render() {
    const { userName } = this.props;
    const { infoUser, score } = this.state;
    return (
      <>
        <header>
          <div data-testid="header-player-name">{userName}</div>
          <img
            data-testid="header-profile-picture"
            src={ infoUser }
            alt="gravatar"
          />
          <div data-testid="header-score">{score}</div>
        </header>
        <Questions />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.name,
  email: state.user.email,
  token: state.token.success,
});

MainPage.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MainPage);
