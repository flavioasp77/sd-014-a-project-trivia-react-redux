import React from 'react';

class Feedback extends React.Component {
  render() {
    const state = localStorage.getItem('state');
    const user = JSON.parse(state); const COMPARE_ASSERTIONS = 3;
    return (
      <header>
        {' '}
        <h1
          data-testid="feedback-text"
        >
          {' '}
          { user.player.assertions >= COMPARE_ASSERTIONS
            ? 'Mandou bem!' : 'Podia ser melhor...'}
          {' '}
        </h1>
        {' '}
      </header>);
  }
}

export default Feedback;
