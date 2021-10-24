import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gravatarAPI from '../services/gravatarAPI';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: null,
    };
    this.setUserImage = this.setUserImage.bind(this);
  }

  async componentDidMount() {
    const { src } = this.state;
    const { player: { gravatarEmail } } = this.props;
    if (!src) {
      const userHash = gravatarAPI.convertEmail(gravatarEmail);
      await this.setUserImage(userHash);
    }
  }

  async setUserImage(hash) {
    const src = await gravatarAPI.fetchUserImage(hash);
    this.setState({
      src,
    });
  }

  render() {
    const { player: { name, score } } = this.props;
    const { src } = this.state;
    return (
      <div>
        <h2 data-testid="header-player-name">{ `Olá, ${name}` }</h2>
        { src && <img
          data-testid="header-profile-picture"
          src={ src }
          alt="userAvatar"
        /> }
        <p>
          Seu placar:&nbsp;
          <span data-testid="header-score">
            { score }
          </span>
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Header);
