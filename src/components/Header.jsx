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

  async getGravatarImage() {
    const { gravatarEmail } = this.props;
    const person = md5(gravatarEmail).toString();
    const gravatarImage = `https://www.gravatar.com/avatar/${person}`;
    this.setState({ gravatarImage });
  }

  render() {
    const { username } = this.props;
    const { gravatarImage } = this.state;
    return (
      <header>
        <h1 data-testid="header-player-name">{ username }</h1>
        <img
          data-testid="header-profile-picture"
          src={ gravatarImage }
          alt="personImage"
        />
        <h2 data-testid="header-score"> 0 </h2>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.user.gravatarEmail,
  username: state.user.username,
});

export default connect(mapStateToProps)(Header);
