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
    const { userEmail } = this.props;
    if (!src) {
      const userHash = gravatarAPI.convertEmail(userEmail);
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
    const { userName } = this.props;
    const { src } = this.state;
    return (
      <div>
        <h2 data-testid="header-user-name">{ `Olá, ${userName}` }</h2>
        { src && <img
          data-testid="header-profile-picture"
          src={ src }
          alt="userAvatar"
        /> }
        <p data-testid="header-score">Seu placar: 0</p>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userName: state.user.name,
});

export default connect(mapStateToProps)(Header);
