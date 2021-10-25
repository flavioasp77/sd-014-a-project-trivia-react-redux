import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    let message = '';
    const NUMBERTHREE = 3;

    if (assertions < NUMBERTHREE) {
      message = 'Podia ser melhor...';
    } else {
      message = 'Mandou bem!';
    }

    return (
      <div>
        <Header />
        <h3>Resultados</h3>
        <p data-testid="feedback-text">{message}</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    assertions: state.userReducer.assertions,
  };
}

export default connect(mapStateToProps, null)(Feedback);
