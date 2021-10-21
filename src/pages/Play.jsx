import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';

class Play extends Component {
  render() {
    const { data } = this.props;
    const { response_code: code, results } = data;

    if (code !== 0) return <div>Token expirado!</div>;

    return (
      <div>
        <h1>Play</h1>
        <Header />
        <Question data={ results[0] } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

Play.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Play);
