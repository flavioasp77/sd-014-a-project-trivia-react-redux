import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userName, userEmail, totalScore } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(userEmail).toString()}` }
          alt="profile"
        />
        <p data-testid="header-player-name">{userName}</p>
        <p data-testid="header-score">{totalScore}</p>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  totalScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.user.name,
  userEmail: state.user.email,
  totalScore: state.user.totalScore,
});

export default connect(mapStateToProps, null)(Header);
