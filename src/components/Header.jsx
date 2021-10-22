import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      gravatarImage: '',
    };
    this.getGravatarImage = this.getGravatarImage.bind(this);
  }

  componentDidMount() {
    this.getGravatarImage();
  }

  getGravatarImage() {
    const { gravatarEmail } = this.props;
    const person = md5(gravatarEmail).toString();
    const gravatarImage = `https://www.gravatar.com/avatar/${person}`;
    this.setState({ gravatarImage });
  }

  render() {
    const { username } = this.props;
    const { gravatarImage } = this.state;
    const state = localStorage.getItem('state');
    const { player: { score } } = JSON.parse(state);
    return (
      <header className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-center align-items-center">
          <img
            data-testid="header-profile-picture"
            src={ gravatarImage }
            className="rounded-circle"
            alt="personImage"
          />
          <h1 data-testid="header-player-name">{ username }</h1>
        </div>
        <h2 data-testid="header-score">{ score }</h2>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.user.gravatarEmail,
  username: state.user.username,
});

export default connect(mapStateToProps)(Header);
