import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Header from '../components/Header';
import RankingCard from '../components/RankingCard';

class Ranking extends Component {
  render() {
    return (
      <>
        <Header />
        <RankingCard />
      </>
    );
  }
}

// const mapStateToProps = (state) => ({
//   name: state.user.name,
//   score: state.user.score,
//   hash: state.user.hash,
// });

// export default connect(mapStateToProps)(Ranking);
export default Ranking;
