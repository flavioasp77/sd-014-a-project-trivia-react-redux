import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    return (
      <h2 data-testid="ranking-title">
        Ranking
      </h2>
    );
  }
}

export default connect(null, null)(Ranking);
