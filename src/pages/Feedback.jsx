import React, { Component } from 'react';
import Header from '../components/Header';
import PlayAgain from '../components/PlayAgain';
// import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const minimalAssertion = 3;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          { assertions >= minimalAssertion ? 'Mandou bem!' : 'Podia ser melhor...' }
        </div>
        <div data-testid="feedback-total-question">
          { assertions }
        </div>
        <div data-testid="feedback-total-score">
          { score }
        </div>
        <PlayAgain />
      </>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// export default connect(mapStateToProps)(Feedback);

export default Feedback;
