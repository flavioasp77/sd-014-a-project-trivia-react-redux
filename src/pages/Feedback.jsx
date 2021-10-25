import React, { Component } from 'react';
import Header from '../components/Header';
// import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const minimalAssertion = 3;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          {assertions >= minimalAssertion ? 'Mandou bem!' : 'Podia ser melhor...' }
        </div>
      </>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// export default connect(mapStateToProps)(Feedback);

export default Feedback;
