import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

const LOW_SCORE_MESSAGE = 'Podia ser melhor...';
const HIGH_SCORE_MESSAGE = 'Mandou bem!';
const HIGH_SCORE_THRESHOLD = 3;

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    return (
      <main>
        <Header />
        <h1 data-testid="feedback-text">
          { assertions >= HIGH_SCORE_THRESHOLD ? HIGH_SCORE_MESSAGE : LOW_SCORE_MESSAGE }
        </h1>
        <Footer />
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
