import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Header from '../Components/Header';

class Feedback extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
      </div>
    );
  }
}

export default connect(null, null)(Feedback);
