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
      <header className="header">
        <div className="d-flex align-items-center">
          <img
            src={ gravatarImg }
            alt="userImage"
            data-testid="header-profile-picture"
            className="rounded-circle me-3"
          />
          <h4 data-testid="header-player-name">{ name }</h4>

        </div>

        <h4>
          Score:
          {' '}
          <span data-testid="header-score">{ score }</span>
        </h4>
      </header>
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
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
