import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';

class Play extends Component {
  render() {
    const { data } = this.props;
    const { response_code: responseCode, results } = data;

    if (responseCode !== 0) return <div>Token expirado!</div>;

    return (
      <div>
        <Header />
        <QuestionCard data={ results[0] } />
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
