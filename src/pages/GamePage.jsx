import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Questions from '../components/Questions';

class GamePage extends Component {
  render() {
    const { isFetching } = this.props;

    return (
      <div>
        <Header />
        { !isFetching && <Questions /> }
      </div>
    );
  }
}

GamePage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.game.isFetching,
});

export default connect(mapStateToProps, null)(GamePage);
