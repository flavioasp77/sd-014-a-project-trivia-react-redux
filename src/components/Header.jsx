import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
    this.headerDisplay = this.headerDisplay.bind(this);
  }

  componentDidMount() {
    this.somaScore();
  }

  somaScore() {
    const player = JSON.parse(localStorage.getItem('state'));
    const { username } = player;
    this.setState({
      username,
    });
  }

  headerDisplay() {
    const { username } = this.state;
    const { score } = this.props;
    return (
      <>
        <h3 data-testid="header-player-name">{username}</h3>
        <img data-testid="header-profile-picture" src="idk" alt="Gravatar" />
        <h4 data-testid="header-score">{score}</h4>
      </>
    );
  }

  render() {
    return (
      <header>
        {/* { this.headerDisplay() } */}
        <this.headerDisplay />
      </header>
    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.questions.score,
});

export default connect(mapStateToProps)(Header);
