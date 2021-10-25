import React, { Component } from 'react';
import Header from '../components/Header';
import RankingCard from '../components/RankingCard';

class Rankings extends Component {
  render() {
    const rankings = JSON.parse(localStorage.getItem('rankings'));
    return (
      <>
        <Header />
        {rankings.map(({ name, picture, score }, index) => (
          <RankingCard
            key={ index }
            index={ index }
            name={ name }
            picture={ picture }
            score={ score }
          />
        ))}
      </>
    );
  }
}

export default Rankings;
