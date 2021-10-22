import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiGravatar } from '../services';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
    };
    this.gravatarAvatar = this.gravatarAvatar.bind(this);
  }

  componentDidMount() {
    this.gravatarAvatar();
  }

  async gravatarAvatar() {
    const { gravatarEmail } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const img = await fetchApiGravatar(hash);
    this.setState({
      src: img,
    });
  }

  render() {
    const { name } = this.props;
    const { src } = this.state;
    const score = 0;
    return (
      <div>
        <div>
          <img
            key={ name }
            data-testid="header-profile-picture"
            src={ src }
            alt={ `${name} avatar` }
          />
          <div>
            <h3 data-testid="header-player-name">{ name }</h3>
          </div>
        </div>
        <div>
          <h4 data-testid="header-score">
            Placar:&nbsp;
            { score }
          </h4>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
