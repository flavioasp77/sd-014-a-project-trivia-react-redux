import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MainPage extends React.Component {
  componentDidMount() {
    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    return (
      <h2>Jogo</h2>
    );
  }
}

MainPage.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token.success,
});

export default connect(mapStateToProps)(MainPage);
