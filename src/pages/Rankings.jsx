import React, { Component } from 'react';
import RankingCard from '../components/RankingCard';
import '../styles/Rankings.css';

class Rankings extends Component {
  render() {
    const rankings = JSON.parse(localStorage.getItem('rankings'));
    rankings.sort((a, b) => b.score - a.score); // Sort by score in descending order
    return (
      <>
        <h1 className="rankings-title">Rankings</h1>
        <div className="rankings-container">
          {rankings.map(({ name, picture, score }, index) => (
            <RankingCard
              key={ index }
              index={ index }
              name={ name }
              picture={ picture }
              score={ score }
            />
          ))}
        </div>
      </>
    );
  }
}

export default Rankings;
