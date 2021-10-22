import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      gravatarImg: '',
    };
    this.getGravatarImg = this.getGravatarImg.bind(this);
  }

  componentDidMount() {
    this.getGravatarImg();
  }

  async getGravatarImg() {
    const { gravatarEmail } = this.props;
    const user = md5(gravatarEmail).toString();
    const gravatarImg = `https://www.gravatar.com/avatar/${user}`;
    this.setState({
      gravatarImg,
    });
  }

  render() {
    const { name, score } = this.props;
    const { gravatarImg } = this.state;

    return (
      <div>
        <img
          src={ gravatarImg }
          alt="userImage"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">
          { score }
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
