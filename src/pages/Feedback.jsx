import React, { Component } from 'react';
import Header from '../components/Header';
// import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          FeedBacks
        </div>
      </>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// export default connect(mapStateToProps)(Feedback);

export default Feedback;
