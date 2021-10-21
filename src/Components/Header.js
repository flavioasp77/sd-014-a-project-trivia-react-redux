import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user: { name, img }, score } = this.props;
    return (
      <div>
        <h1 data-testid="header-player-name">
          { name }
        </h1>
        <img
          src={ img }
          alt="Avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score">
          { score }
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  score: state.score,
});

export default connect(mapStateToProps, null)(Header);
