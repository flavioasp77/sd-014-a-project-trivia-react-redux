import React from 'react';
import Header from '../components/Header';
import { getStorage } from '../services/triviaAPI';

class FeedBack extends React.Component {
  render() {
    const { player: { assertions } } = getStorage();
    const NUMBER_3 = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions >= NUMBER_3
            ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
      </div>
    );
  }
}

export default FeedBack;
